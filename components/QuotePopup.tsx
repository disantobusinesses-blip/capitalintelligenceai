'use client'

import { useEffect, useState } from 'react'
import { X, Send, CheckCircle, User, Mail, Phone, MessageSquare } from 'lucide-react'
import { useQuotePopup, QuoteService } from '@/context/QuotePopupContext'

// Session-storage key used to ensure the time-delayed popup only appears once
// per browser session (after it has been auto-shown or dismissed).
const SESSION_KEY = 'iasQuotePopupSeen'
const AUTO_OPEN_DELAY_MS = 10_000
const MIN_MESSAGE_LENGTH = 20

const SERVICE_OPTIONS: QuoteService[] = [
  'Landing Page',
  'Custom Website',
  'Cinematic Custom Website',
  'B2B AI Platform',
  'Google Business Profile',
  'Other',
]

export default function QuotePopup() {
  const { isOpen, preselectedService, openPopup, closePopup } = useQuotePopup()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState<QuoteService | ''>('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // ── Time-delayed auto-open (once per session) ──────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(SESSION_KEY)) return

    const timer = setTimeout(() => {
      // Don't interrupt if the visitor already opened it via a button.
      if (!sessionStorage.getItem(SESSION_KEY)) {
        sessionStorage.setItem(SESSION_KEY, '1')
        openPopup()
      }
    }, AUTO_OPEN_DELAY_MS)

    return () => clearTimeout(timer)
  }, [openPopup])

  // Keep the dropdown in sync when a button opens the popup with a preselection.
  useEffect(() => {
    if (isOpen) {
      setService(preselectedService)
    }
  }, [isOpen, preselectedService])

  if (!isOpen) return null

  const messageLength = message.trim().length
  const canSubmit =
    name.trim() !== '' &&
    email.trim() !== '' &&
    phone.trim() !== '' &&
    messageLength >= MIN_MESSAGE_LENGTH

  const markSeen = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_KEY, '1')
    }
  }

  const handleClose = () => {
    // Dismissing also suppresses the popup for the rest of the session.
    markSeen()
    closePopup()
    setTimeout(() => {
      if (submitted) {
        setName('')
        setEmail('')
        setPhone('')
        setService('')
        setMessage('')
        setSubmitted(false)
      }
      setSubmitError(null)
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || submitting) return
    setSubmitting(true)
    setSubmitError(null)
    markSeen()
    try {
      const res = await fetch('/api/quote-popup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          service: service || 'Not specified',
          message: message.trim(),
        }),
      })
      const result = await res.json()
      if (res.ok && result.ok) {
        setSubmitted(true)
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', { send_to: 'AW-17950129824/0hYECPfNlrkcEKD9pO9C' })
        }
      } else {
        setSubmitError(result.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('An error occurred. Please try again or email sales@intelligentaisystem.com.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Success state ───────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="bg-white border border-[#E8E4DF] rounded-2xl p-8 max-w-lg w-full text-center relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[#F8F7F4] smooth-transition"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-[#6B6560]" />
          </button>
          <div className="w-20 h-20 bg-green-500/15 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            Thanks — we&apos;ll be in touch within 1 hour
          </h2>
          <p className="text-[#6B6560] mb-6 leading-relaxed">
            Your request is in. A member of our team will reach out shortly to get you a free quote.
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
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white border border-[#E8E4DF] rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#E8E4DF] sticky top-0 bg-white rounded-t-2xl z-10">
          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A]">Get a Free Quote — No Commitment</h2>
            <p className="text-sm text-[#6B6560] mt-0.5">Tell us what you need. We respond within 1 hour.</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 -mr-1 -mt-1 hover:bg-[#F8F7F4] rounded-lg smooth-transition shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-[#6B6560]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="qp-name" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#5C3D2E]" />
                Name <span className="text-red-400">*</span>
              </span>
            </label>
            <input
              id="qp-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
              className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="qp-email" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[#5C3D2E]" />
                Email <span className="text-red-400">*</span>
              </span>
            </label>
            <input
              id="qp-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="qp-phone" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#5C3D2E]" />
                Phone <span className="text-red-400">*</span>
              </span>
            </label>
            <input
              id="qp-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0412 345 678"
              required
              className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200"
            />
          </div>

          {/* Service */}
          <div>
            <label htmlFor="qp-service" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
              What service do you need?
            </label>
            <select
              id="qp-service"
              value={service}
              onChange={(e) => setService(e.target.value as QuoteService | '')}
              className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200 cursor-pointer"
            >
              <option value="">Select a service…</option>
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="qp-message" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#5C3D2E]" />
                Tell us about your business <span className="text-red-400">*</span>
              </span>
            </label>
            <textarea
              id="qp-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What does your business do, and what are you looking to achieve?"
              rows={4}
              required
              className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200 resize-none"
            />
            <p
              className={`mt-1 text-xs ${
                messageLength >= MIN_MESSAGE_LENGTH ? 'text-green-600' : 'text-[#9E9790]'
              }`}
            >
              {messageLength >= MIN_MESSAGE_LENGTH
                ? `${messageLength} characters`
                : `${messageLength}/${MIN_MESSAGE_LENGTH} characters minimum`}
            </p>
          </div>

          {submitError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {submitError}
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#1A1A1A] text-white rounded-lg font-semibold smooth-transition hover:bg-[#2D2D2D] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? (
              'Sending...'
            ) : (
              <>
                Get My Free Quote
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-[#9E9790]">We respond within 1 hour.</p>
        </form>
      </div>
    </div>
  )
}
