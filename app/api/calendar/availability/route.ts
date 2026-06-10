import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { TIMEZONE, melbourneWallTimeToUTC } from '@/lib/timezone'

// Business hours configuration
const BUSINESS_HOURS: Record<number, { start: number; end: number } | null> = {
  0: null, // Sunday - blocked
  1: { start: 9, end: 17 }, // Monday 9am-5pm
  2: { start: 9, end: 17 }, // Tuesday
  3: { start: 9, end: 17 }, // Wednesday
  4: { start: 9, end: 17 }, // Thursday
  5: { start: 9, end: 17 }, // Friday
  6: { start: 9, end: 12 }, // Saturday 9am-12pm
}

function getGoogleAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  let privateKey = process.env.GOOGLE_PRIVATE_KEY
  const calendarId = process.env.GOOGLE_CALENDAR_ID

  if (!email || !privateKey || !calendarId) {
    throw new Error('Google Calendar credentials not configured')
  }

  // Handle various formats the private key might be stored in
  // Remove surrounding quotes if present (JSON-encoded value)
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1)
  }
  // Replace escaped newlines with actual newlines
  privateKey = privateKey.replace(/\\n/g, '\n')

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: privateKey,
    },
    scopes: [
      'https://www.googleapis.com/auth/calendar.readonly',
      'https://www.googleapis.com/auth/calendar.events',
    ],
  })

  return { auth, calendarId }
}

function generateTimeSlots(date: Date, hours: { start: number; end: number }): string[] {
  const slots: string[] = []
  for (let hour = hours.start; hour < hours.end; hour++) {
    for (let min = 0; min < 60; min += 15) {
      const h = hour.toString().padStart(2, '0')
      const m = min.toString().padStart(2, '0')
      slots.push(`${h}:${m}`)
    }
  }
  return slots
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const dateStr = searchParams.get('date')

  if (!dateStr) {
    return NextResponse.json({ error: 'Date parameter required' }, { status: 400 })
  }

  // Parse the date. Use UTC noon of the calendar date so the day-of-week
  // is stable regardless of the server's local timezone.
  const [yr, mo, dy] = dateStr.split('T')[0].split('-').map(Number)
  const date = new Date(Date.UTC(yr, mo - 1, dy, 12, 0, 0))
  const dayOfWeek = date.getUTCDay()
  const hours = BUSINESS_HOURS[dayOfWeek]

  // Check if it's a business day
  if (!hours) {
    return NextResponse.json({ 
      availableSlots: [],
      message: 'No availability on this day'
    })
  }

  try {
    const { auth, calendarId } = getGoogleAuth()
    const calendar = google.calendar({ version: 'v3', auth })

    // Get start and end of the selected day as Melbourne wall-clock times,
    // converted to correct UTC instants for the Google Calendar query.
    const startOfDay = melbourneWallTimeToUTC(dateStr, hours.start, 0)
    const endOfDay = melbourneWallTimeToUTC(dateStr, hours.end, 0)

    // Fetch events for the day
    const eventsResponse = await calendar.events.list({
      calendarId,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      timeZone: TIMEZONE,
    })

    const events = eventsResponse.data.items || []

    // Generate all possible time slots for the day
    const allSlots = generateTimeSlots(date, hours)

    // Filter out booked slots
    const bookedTimes = new Set<string>()
    
    for (const event of events) {
      if (event.start?.dateTime) {
        const eventStart = new Date(event.start.dateTime)
        const eventEnd = event.end?.dateTime ? new Date(event.end.dateTime) : new Date(eventStart.getTime() + 15 * 60000)
        
        // Mark all 15-minute slots that overlap with this event as booked
        for (const slot of allSlots) {
          const [slotHour, slotMin] = slot.split(':').map(Number)
          const slotStart = melbourneWallTimeToUTC(dateStr, slotHour, slotMin)
          const slotEnd = new Date(slotStart.getTime() + 15 * 60000)

          // Check if slot overlaps with event
          if (slotStart < eventEnd && slotEnd > eventStart) {
            bookedTimes.add(slot)
          }
        }
      }
    }

    // Also block slots in the past. Compare actual UTC instants so "today"
    // and past-slot detection are correct regardless of server timezone.
    const now = new Date()
    // Determine "today" in Melbourne to compare against the selected date.
    const melbourneTodayStr = new Intl.DateTimeFormat('en-CA', {
      timeZone: TIMEZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(now)
    const selectedDateStr = dateStr.split('T')[0]
    const isToday = selectedDateStr === melbourneTodayStr
    
    if (isToday) {
      for (const slot of allSlots) {
        const [slotHour, slotMin] = slot.split(':').map(Number)
        const slotTime = melbourneWallTimeToUTC(dateStr, slotHour, slotMin)
        
        if (slotTime <= now) {
          bookedTimes.add(slot)
        }
      }
    }

    const availableSlots = allSlots.filter(slot => !bookedTimes.has(slot))

    return NextResponse.json({ 
      availableSlots,
      bookedSlots: Array.from(bookedTimes),
      allSlots,
    })
  } catch (error) {
    console.error('Calendar API error:', error)
    
    // Fallback: return all slots if calendar API fails
    const allSlots = generateTimeSlots(date, hours)
    return NextResponse.json({ 
      availableSlots: allSlots,
      bookedSlots: [],
      allSlots,
      fallback: true,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
