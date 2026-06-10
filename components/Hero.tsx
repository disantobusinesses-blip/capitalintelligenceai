'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { CheckCircle, Send, CalendarDays, Clock, Check, ExternalLink } from 'lucide-react'
import { format, addDays, isSunday, isSaturday, isToday, isBefore, startOfDay } from 'date-fns'

const SERVICE_OPTIONS = [
  { id: 'website-build', label: 'Website Build' },
  { id: 'b2b-ai-platform', label: 'B2B AI Platform' },
  { id: 'google-profile-setup', label: 'Google Profile Setup' },
]

// Format 24h time to 12h display
function formatTimeDisplay(time: string): string {
  const [hour, minute] = time.split(':').map(Number)
  const h = hour % 12 === 0 ? 12 : hour % 12
  const period = hour < 12 ? 'AM' : 'PM'
  return `${h}:${minute.toString().padStart(2, '0')} ${period}`
}

// Generate dates for next 30 days (excluding Sundays)
function generateAvailableDates(): Date[] {
  const dates: Date[] = []
  const today = startOfDay(new Date())
  
  for (let i = 0; i < 45 && dates.length < 30; i++) {
    const date = addDays(today, i)
    // Skip Sundays
    if (!isSunday(date)) {
      // Skip today if it's past business hours (5pm for weekdays, 12pm for Saturday)
      if (isToday(date)) {
        const now = new Date()
        const currentHour = now.getHours()
        const isSat = isSaturday(date)
        const endHour = isSat ? 12 : 17
        if (currentHour >= endHour) continue
      }
      dates.push(date)
    }
  }
  return dates
}

interface BookingResult {
  date: string
  time: string
  services: string[]
  calendarLink: string | null
}

// Validate Australian phone number: 04XX XXX XXX (10 digits) or +61 XXX XXX XXX (12 chars with +61)
function isValidAustralianPhone(phone: string): boolean {
  // Remove all spaces
  const cleaned = phone.replace(/\s/g, '')
  
  // Check for 04 format: exactly 10 digits starting with 04
  if (/^04\d{8}$/.test(cleaned)) {
    return true
  }
  
  // Check for +61 format: +61 followed by 9 digits (total 12 chars)
  if (/^\+61\d{9}$/.test(cleaned)) {
    return true
  }
  
  return false
}

export default function Hero() {
  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  
  // Calendar state
  const [showCalendar, setShowCalendar] = useState(false)
  const [availableDates] = useState<Date[]>(() => generateAvailableDates())
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  
  // Submission state
  const [consultStatus, setConsultStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [consultError, setConsultError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null)
  
  const calendarRef = useRef<HTMLDivElement>(null)

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setShowCalendar(false)
      }
    }
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showCalendar])

  // Fetch available time slots when date changes
  const fetchAvailability = useCallback(async (date: Date) => {
    setLoadingSlots(true)
    setAvailableSlots([])
    setBookedSlots([])
    setSelectedTime('')
    
    try {
      const dateStr = format(date, 'yyyy-MM-dd')
      const response = await fetch(`/api/calendar/availability?date=${dateStr}`)
      const data = await response.json()
      
      setAvailableSlots(data.availableSlots || [])
      setBookedSlots(data.bookedSlots || [])
    } catch (error) {
      console.error('Failed to fetch availability:', error)
      // Fallback to showing all slots
      const isSat = isSaturday(date)
      const endHour = isSat ? 12 : 17
      const slots: string[] = []
      for (let hour = 9; hour < endHour; hour++) {
        for (let min = 0; min < 60; min += 15) {
          slots.push(`${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`)
        }
      }
      setAvailableSlots(slots)
    } finally {
      setLoadingSlots(false)
    }
  }, [])

  useEffect(() => {
    if (selectedDate) {
      fetchAvailability(selectedDate)
    }
  }, [selectedDate, fetchAvailability])

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(s => s !== serviceId)
        : [...prev, serviceId]
    )
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setShowCalendar(false)
  }

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate phone number
    if (!isValidAustralianPhone(phone)) {
      setPhoneError('Phone number invalid. Use 04XX XXX XXX or +61 XXX XXX XXX format.')
      return
    }
    setPhoneError('')
    
    if (!name.trim() || !email.trim() || !phone.trim() || !selectedDate || !selectedTime || selectedServices.length === 0) return

    setConsultStatus('submitting')
    setConsultError('')

    try {
      const serviceLabels = selectedServices.map(id => 
        SERVICE_OPTIONS.find(s => s.id === id)?.label || id
      )
      
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: selectedTime,
          services: serviceLabels,
        }),
      })
      
      const result = await response.json()
      
      if (response.ok && result.ok) {
        setConsultStatus('success')
        setBookingResult(result.booking)
        // Fire Google Ads conversion tracking
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {'send_to': 'AW-17950129824/ZA2zCPTNlrkcEKD9pO9C'})
        }
        // Clear form
        setName('')
        setEmail('')
        setPhone('')
        setSelectedDate(null)
        setSelectedTime('')
        setSelectedServices([])
      } else {
        setConsultStatus('error')
        setConsultError(result.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setConsultStatus('error')
      setConsultError('Something went wrong. Please try again.')
    }
  }

  const canSubmit = name.trim() && email.trim() && phone.trim() && selectedDate && selectedTime && selectedServices.length > 0 && !phoneError

  return (
    <section
      id="quote"
      className="bg-[#F8F7F4] pt-[40px] pb-[80px] px-6"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-[560px] mx-auto">
          {/* Free Consultation Booking */}
          <div
            id="consultation"
            className="bg-white rounded-[12px] p-6 md:p-8 scroll-mt-24"
            style={{ border: '1px solid #E8E4DF', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
          >
            {consultStatus === 'success' && bookingResult ? (
              <div className="flex flex-col items-center gap-4 py-6">
                <CheckCircle className="w-12 h-12 text-green-500" />
                <p className="text-[#1A1A1A] font-bold text-xl text-center">You&apos;re booked in!</p>
                
                <div className="w-full bg-[#F8F7F4] rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B6560]">Date:</span>
                    <span className="font-semibold text-[#1A1A1A]">{bookingResult.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6560]">Time:</span>
                    <span className="font-semibold text-[#1A1A1A]">{bookingResult.time} AEST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6560]">Duration:</span>
                    <span className="font-semibold text-[#1A1A1A]">15 minutes</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-[#6B6560]">Services:</span>
                    <span className="font-semibold text-[#1A1A1A] text-right">{bookingResult.services.join(', ')}</span>
                  </div>
                </div>

                {bookingResult.calendarLink && (
                  <a
                    href={bookingResult.calendarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#5C3D2E] hover:underline text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Add to Google Calendar
                  </a>
                )}

                <p className="text-[#6B6560] text-sm text-center">
                  A confirmation email has been sent. We&apos;ll call you at your scheduled time!
                </p>
                
                <button
                  onClick={() => {
                    setConsultStatus('idle')
                    setBookingResult(null)
                  }}
                  className="text-sm text-[#5C3D2E] hover:underline"
                >
                  Book another consultation
                </button>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-4">
                <div>
                  <p className="text-[#1A1A1A] font-bold text-lg mb-1">Book a Free Consultation</p>
                  <p className="text-[#6B6560] text-sm">Free 15-minute phone call · No commitment</p>
                </div>

                {/* Date picker */}
                <div className="relative" ref={calendarRef}>
                  <button
                    type="button"
                    onClick={() => setShowCalendar((v) => !v)}
                    className="w-full px-4 py-3 border border-[#E8E4DF] rounded-[6px] text-sm text-left flex items-center gap-2 focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200"
                  >
                    <CalendarDays className="w-4 h-4 text-[#9E9790] flex-shrink-0" />
                    <span className={selectedDate ? 'text-[#1A1A1A]' : 'text-[#9E9790]'}>
                      {selectedDate ? format(selectedDate, 'EEEE, d MMMM yyyy') : 'Select a date'}
                    </span>
                  </button>
                  
                  {showCalendar && (
                    <div className="absolute left-0 right-0 z-50 mt-1 bg-white rounded-lg shadow-xl border border-[#E8E4DF] p-4 max-h-[300px] overflow-y-auto">
                      <p className="text-xs text-[#9E9790] mb-2">Mon–Fri 9am–5pm, Sat 9am–12pm AEST</p>
                      <div className="grid grid-cols-2 gap-2">
                        {availableDates.map((date) => {
                          const isSelected = selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                          const isPast = isBefore(date, startOfDay(new Date()))
                          
                          return (
                            <button
                              key={date.toISOString()}
                              type="button"
                              disabled={isPast}
                              onClick={() => handleDateSelect(date)}
                              className={`px-3 py-2 text-xs rounded-md text-left transition-colors ${
                                isSelected
                                  ? 'bg-[#1A1A1A] text-white'
                                  : isPast
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-[#F8F7F4] text-[#1A1A1A] hover:bg-[#E8E4DF]'
                              }`}
                            >
                              <span className="font-medium">{format(date, 'EEE')}</span>
                              <span className="block text-[10px] opacity-75">{format(date, 'd MMM')}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Time slots */}
                {selectedDate && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-[#9E9790]" />
                      <span className="text-sm text-[#6B6560]">Select a time slot</span>
                    </div>
                    
                    {loadingSlots ? (
                      <div className="flex items-center justify-center py-4">
                        <div className="w-5 h-5 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 gap-2 max-h-[150px] overflow-y-auto">
                        {[...availableSlots, ...bookedSlots].sort().map((slot) => {
                          const isBooked = bookedSlots.includes(slot)
                          const isSelected = selectedTime === slot
                          
                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={isBooked}
                              onClick={() => setSelectedTime(slot)}
                              className={`px-2 py-1.5 text-xs rounded transition-colors ${
                                isSelected
                                  ? 'bg-[#1A1A1A] text-white'
                                  : isBooked
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                                  : 'bg-[#F8F7F4] text-[#1A1A1A] hover:bg-[#E8E4DF]'
                              }`}
                            >
                              {formatTimeDisplay(slot)}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Form fields */}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name *"
                  required
                  className="w-full px-4 py-3 border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200 text-sm"
                />
                
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address *"
                  required
                  className="w-full px-4 py-3 border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200 text-sm"
                />
                
                <div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                      if (phoneError) setPhoneError('')
                    }}
                    placeholder="Phone Number * (04XX XXX XXX or +61 XXX XXX XXX)"
                    required
                    className={`w-full px-4 py-3 border rounded-[6px] text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none transition-colors duration-200 text-sm ${
                      phoneError ? 'border-red-400 focus:border-red-400' : 'border-[#E8E4DF] focus:border-[#1A1A1A]'
                    }`}
                  />
                  {phoneError && (
                    <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                  )}
                </div>

                {/* What do you need - Multi select */}
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                    What do you need? <span className="text-red-400">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleService(service.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                          selectedServices.includes(service.id)
                            ? 'bg-[#1A1A1A] text-white'
                            : 'bg-[#F8F7F4] text-[#1A1A1A] border border-[#E8E4DF] hover:border-[#5C3D2E]'
                        }`}
                      >
                        {selectedServices.includes(service.id) && (
                          <Check className="w-3 h-3" />
                        )}
                        {service.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={consultStatus === 'submitting' || !canSubmit}
                  className="w-full bg-[#1A1A1A] text-white font-semibold py-3 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {consultStatus === 'submitting' ? 'Booking…' : (
                    <>Book My Free Consultation <Send className="w-4 h-4" /></>
                  )}
                </button>

                {consultStatus === 'error' && (
                  <p className="text-red-500 text-xs">{consultError}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
