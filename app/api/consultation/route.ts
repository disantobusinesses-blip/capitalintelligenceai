import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { google } from 'googleapis'

const TIMEZONE = 'Australia/Melbourne'

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function getGoogleAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const calendarId = process.env.GOOGLE_CALENDAR_ID

  if (!email || !privateKey || !calendarId) {
    return null
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
  })

  return { auth, calendarId }
}

interface ConsultationBody {
  name: string
  email: string
  phone: string
  date: string // ISO date string like "2025-01-15"
  time: string // 24h format like "14:30"
  services: string[] // Array of selected services
}

export async function POST(request: NextRequest) {
  let body: ConsultationBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 })
  }

  // Validation
  if (!body.name?.trim()) {
    return NextResponse.json({ ok: false, message: 'Name is required.' }, { status: 400 })
  }
  if (!body.email?.trim()) {
    return NextResponse.json({ ok: false, message: 'Email is required.' }, { status: 400 })
  }
  if (!body.phone?.trim()) {
    return NextResponse.json({ ok: false, message: 'Phone number is required.' }, { status: 400 })
  }
  if (!body.date?.trim()) {
    return NextResponse.json({ ok: false, message: 'Date is required.' }, { status: 400 })
  }
  if (!body.time?.trim()) {
    return NextResponse.json({ ok: false, message: 'Time is required.' }, { status: 400 })
  }
  if (!body.services || body.services.length === 0) {
    return NextResponse.json({ ok: false, message: 'Please select at least one service.' }, { status: 400 })
  }

  const servicesText = body.services.join(', ')
  
  // Parse the date and time
  const [hour, minute] = body.time.split(':').map(Number)
  const startDateTime = new Date(body.date)
  startDateTime.setHours(hour, minute, 0, 0)
  
  const endDateTime = new Date(startDateTime.getTime() + 15 * 60000) // 15 minutes later

  // Format for display
  const displayDate = startDateTime.toLocaleDateString('en-AU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: TIMEZONE,
  })
  const displayTime = startDateTime.toLocaleTimeString('en-AU', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: TIMEZONE,
  })

  let calendarEventLink: string | null = null
  let calendarEventId: string | null = null

  // Create Google Calendar Event
  const googleAuth = getGoogleAuth()
  if (googleAuth) {
    try {
      const calendar = google.calendar({ version: 'v3', auth: googleAuth.auth })
      
      const event = {
        summary: `IAS Consultation - ${body.name}`,
        description: `Free 15-minute consultation call

Client Details:
- Name: ${body.name}
- Email: ${body.email}
- Phone: ${body.phone}
- Services Interested In: ${servicesText}

Please call the client at the scheduled time.`,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: TIMEZONE,
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: TIMEZONE,
        },
        attendees: [
          { email: body.email, displayName: body.name },
          { email: 'sales@intelligentaisystem.com' },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 60 },
            { method: 'popup', minutes: 15 },
          ],
        },
        conferenceData: {
          createRequest: {
            requestId: `ias-${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      }

      const response = await calendar.events.insert({
        calendarId: googleAuth.calendarId,
        requestBody: event,
        sendUpdates: 'all', // Send email invites to attendees
        conferenceDataVersion: 1,
      })

      calendarEventId = response.data.id || null
      calendarEventLink = response.data.htmlLink || null
      
      console.log('Calendar event created:', calendarEventId)
    } catch (error) {
      console.error('Failed to create calendar event:', error)
      // Continue without calendar event - still book the consultation
    }
  } else {
    console.warn('Google Calendar not configured - consultation logged only')
  }

  // Send email notification
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env
  
  if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && SMTP_FROM) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })

      // Email to sales team
      const salesHtmlBody = `
        <h2>New Consultation Booking — ${esc(body.name)}</h2>
        <h3>Booking Details</h3>
        <ul>
          <li><strong>Date:</strong> ${esc(displayDate)}</li>
          <li><strong>Time:</strong> ${esc(displayTime)} AEST</li>
          <li><strong>Duration:</strong> 15 minutes</li>
        </ul>
        <h3>Client Details</h3>
        <ul>
          <li><strong>Name:</strong> ${esc(body.name)}</li>
          <li><strong>Email:</strong> ${esc(body.email)}</li>
          <li><strong>Phone:</strong> ${esc(body.phone)}</li>
          <li><strong>Services Interested In:</strong> ${esc(servicesText)}</li>
        </ul>
        ${calendarEventLink ? `<p><a href="${calendarEventLink}">View in Google Calendar</a></p>` : ''}
        <p>Please call the client at their scheduled time.</p>
      `

      await transporter.sendMail({
        from: SMTP_FROM,
        to: 'sales@intelligentaisystem.com',
        subject: `New Consultation Booking — ${body.name} — ${displayDate} at ${displayTime}`,
        html: salesHtmlBody,
      })

      // Confirmation email to customer
      const customerHtmlBody = `
        <h2>Your Consultation is Booked!</h2>
        <p>Hi ${esc(body.name)},</p>
        <p>Thank you for booking a free consultation with Intelligent AI Systems. Here are your booking details:</p>
        <h3>Booking Summary</h3>
        <ul>
          <li><strong>Date:</strong> ${esc(displayDate)}</li>
          <li><strong>Time:</strong> ${esc(displayTime)} AEST</li>
          <li><strong>Duration:</strong> 15 minutes</li>
          <li><strong>Services:</strong> ${esc(servicesText)}</li>
        </ul>
        ${calendarEventLink ? `<p><strong>Add to your calendar:</strong> <a href="${calendarEventLink}">Google Calendar Link</a></p>` : ''}
        <p>We'll call you at <strong>${esc(body.phone)}</strong> at the scheduled time.</p>
        <p>If you need to reschedule, please reply to this email or call us at 03 7051 0100.</p>
        <br>
        <p>Best regards,<br>The IAS Team<br>Intelligent AI Systems</p>
      `

      await transporter.sendMail({
        from: SMTP_FROM,
        to: body.email,
        subject: `Your IAS Consultation is Confirmed — ${displayDate} at ${displayTime}`,
        html: customerHtmlBody,
      })

    } catch (err) {
      console.error('Email send failed:', err)
      // Still return success so user is not blocked
    }
  } else {
    console.error('SMTP not configured — consultation logged only')
  }

  return NextResponse.json({ 
    ok: true,
    booking: {
      date: displayDate,
      time: displayTime,
      services: body.services,
      calendarLink: calendarEventLink,
    }
  })
}
