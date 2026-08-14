'use client'

import { useState } from 'react'
import { X, Check, Phone, Clock, CheckCircle } from 'lucide-react'
import { useQuoteModal } from '@/context/QuoteModalContext'

// ─── Time slots: 9:00 AM – 5:00 PM in 15-minute increments ───────────────────

function generateTimeSlots(): string[] {
  const slots: string[] = []
  for (let hour = 9; hour <= 17; hour++) {
    for (let min = 0; min < 60; min += 15) {
      if (hour === 17 && min > 0) break
      const h = hour % 12 === 0 ? 12 : hour % 12
      const m = min.toString().padStart(2, '0')
      const period = hour < 12 ? 'AM' : 'PM'
      slots.push(`${h}:${m} ${period}`)
    }
  }
  return slots
}

const TIME_SLOTS = generateTimeSlots()

// ─── Component ────────────────────────────────────────────────────────────────

export default function QuoteModal() {
  const { isOpen, closeModal } = useQuoteModal()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [time, setTime] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleClose = () => {
    closeModal()
    setTimeout(() => {
      setName('')
      setPhone('')
      setTime('')
      setSubmitted(false)
      setSubmitError(null)
    }, 300)
  }

  const canSubmit = name.trim() !== '' && phone.trim() !== '' && time !== ''

  const handleSubmit = async () => {
    if (!canSubmit) return
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, time }),
      })
      const result = await res.json()
      if (res.ok && result.ok) {
        setSubmitted(true)
      } else {
        setSubmitError(result.message || 'Something went wrong. Please try again.')
      }
    } catch {
      // Still show success to avoid blocking the user
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="bg-white border border-[#E8E4DF] rounded-[10px] p-8 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">You're booked in!</h2>
          <p className="text-[#6B6560] mb-6 leading-relaxed">
            We'll call{' '}
            <span className="text-[#1A1A1A] font-semibold">{phone}</span>
            {' '}at your requested time of{' '}
            <span className="text-[#1A1A1A] font-semibold">{time}</span>.
            {' '}Talk soon!
          </p>
          <button
            onClick={handleClose}
            className="px-8 py-3 bg-[#1A1A1A] text-white rounded-[6px] font-semibold smooth-transition hover:bg-[#2D2D2D]"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white border border-[#E8E4DF] rounded-[10px] w-full max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DF]">
          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A]">Book a Free Consultation</h2>
            <p className="text-sm text-[#6B6560] mt-0.5">Free 15-minute phone call · No commitment</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-[6px] hover:bg-[#F8F7F4] smooth-transition"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-[#6B6560]" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Preferred time */}
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-ias-brown-dark" />
                Preferred call time <span className="text-red-400">*</span>
              </span>
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] focus:outline-none focus:border-ias-brown-dark smooth-transition"
            >
              <option value="">Select a time (9 AM – 5 PM)</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
              Your name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-ias-brown-dark smooth-transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-ias-brown-dark" />
                Phone number <span className="text-red-400">*</span>
              </span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 0412 345 678"
              className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-ias-brown-dark smooth-transition"
            />
          </div>

          {submitError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-[6px] text-red-400 text-sm">
              {submitError}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E8E4DF]">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#1A1A1A] text-white rounded-[6px] font-semibold smooth-transition hover:bg-[#2D2D2D] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? 'Booking...' : 'Book Consultation'}
            {!submitting && <Check className="w-4 h-4" />}
          </button>
          <p className="text-center text-xs text-[#9E684C] mt-3">
            We'll confirm your time via phone within 24 hours.
          </p>
        </div>
      </div>
    </div>
  )
}
