'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { X, Send, CheckCircle, User, Mail, Phone, MessageSquare } from 'lucide-react'
import { useQuotePopup, QuoteService } from '@/context/QuotePopupContext'
import { trackConversion, CONVERSION_LEAD } from '@/lib/trackConversion'
import FlowTrustStrip from '@/components/FlowTrustStrip'

const SERVICE_OPTIONS: QuoteService[] = [
  'Landing Page',
  'Custom Website',
  'Cinematic Custom Website',
  'B2B AI Platform',
  'Google Business Profile',
  'Other',
]

export default function QuotePopup() {
  const router = useRouter()
  const pathname = usePathname()
  const { isOpen, preselectedService, openPopup, closePopup } = useQuotePopup()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState<QuoteService | ''>('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Slide-in/out animation state. `render` keeps the panel mounted long enough
  // to animate out; `slideIn` drives the transform.
  const [render, setRender] = useState(false)
  const [slideIn, setSlideIn] = useState(false)

  // Drive the slide animation from the open state.
  useEffect(() => {
    if (isOpen) {
      setRender(true)
      const t = setTimeout(() => setSlideIn(true), 20)
      return () => clearTimeout(t)
    }
    setSlideIn(false)
    const t = setTimeout(() => setRender(false), 300)
    return () => clearTimeout(t)
  }, [isOpen])

  // Keep the dropdown in sync when a button opens the popup with a preselection.
  useEffect(() => {
    if (isOpen) {
      setService(preselectedService)
    }
  }, [isOpen, preselectedService])

  // When the panel is closed, show a small launcher tab anchored to the bottom
  // edge. Clicking it slides the quote form up. (The popup no longer auto-opens.)
  if (!render) {
    // The immersive /launch funnel manages its own UI — no launcher there.
    if (pathname === '/launch') return null
    return (
      <button
        type="button"
        onClick={() => openPopup()}
        aria-label="Get a free quote"
        className="fixed z-[60] bottom-5 right-4 sm:right-6 inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] text-white pl-4 pr-5 py-3 text-sm font-semibold shadow-[0_8px_28px_rgba(0,0,0,0.28)] hover:bg-[#2D2D2D] hover:-translate-y-0.5 transition-all duration-200"
      >
        <Send className="w-4 h-4" />
        Get a Free Quote
      </button>
    )
  }

  // Only Name, Email and Phone are required — the business description is
  // optional so it never blocks a submission.
  const canSubmit =
    name.trim() !== '' && email.trim() !== '' && phone.trim() !== ''

  const handleClose = () => {
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
        // Show the in-popup confirmation immediately as a fallback in case the
        // redirect is blocked — the visitor always sees a "thanks".
        setSubmitted(true)
        // CRITICAL: fire the Google Ads conversion right here in the success
        // callback — BEFORE any redirect — so it is never gated behind the
        // deposit step or a page navigation. The redirect to the deposit page
        // only runs once the conversion beacon has been sent (or times out).
        const query = service ? `?service=${encodeURIComponent(service)}` : ''
        trackConversion(CONVERSION_LEAD, () => {
          closePopup()
          router.push(`/secure-spot${query}`)
        })
      } else {
        setSubmitError(result.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('An error occurred. Please try again or email sales@intelligentaisystem.com.')
    } finally {
      setSubmitting(false)
    }
  }

  // Non-interrupting bottom sheet: no full-screen backdrop, so the visitor can
  // keep browsing and dismiss whenever they like. Slides up from the bottom,
  // anchored bottom-right on desktop and full-width on mobile.
  const shellClass =
    'fixed z-[70] inset-x-0 bottom-0 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-full sm:max-w-md ' +
    `transition-transform duration-300 ease-out ${slideIn ? 'translate-y-0' : 'translate-y-[calc(100%+2rem)]'}`

  const cardClass =
    'bg-white border border-[#E8E4DF] rounded-t-2xl sm:rounded-2xl shadow-[0_-8px_40px_rgba(0,0,0,0.18)] sm:shadow-[0_12px_48px_rgba(0,0,0,0.20)] max-h-[85vh] overflow-y-auto'

  // ── Success state ───────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className={shellClass} role="dialog" aria-label="Quote request sent">
        <div className={`${cardClass} p-7 text-center relative`}>
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-2 rounded-lg hover:bg-[#F8F7F4] smooth-transition"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-[#6B6560]" />
          </button>
          <div className="w-16 h-16 bg-green-500/15 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            Thanks — we&apos;ll be in touch within 1 hour
          </h2>
          <p className="text-[#6B6560] mb-5 leading-relaxed text-sm">
            Your request is in. A member of our team will reach out shortly to get you a free quote.
          </p>
          <div className="mb-6">
            <FlowTrustStrip />
          </div>
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
    <div className={shellClass} role="dialog" aria-label="Get a free quote">
      <div className={cardClass}>
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-[#E8E4DF] sticky top-0 bg-white rounded-t-2xl z-10">
          <div>
            <h2 className="text-lg font-bold text-[#1A1A1A]">Get a Free Quote — No Commitment</h2>
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

        {/* Pricing + Google rating social proof */}
        <div className="px-5 pt-4">
          <FlowTrustStrip />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
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
                Tell us about your business{' '}
                <span className="font-normal text-[#9E9790]">(optional)</span>
              </span>
            </label>
            <textarea
              id="qp-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What does your business do, and what are you looking to achieve?"
              rows={3}
              className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200 resize-none"
            />
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
