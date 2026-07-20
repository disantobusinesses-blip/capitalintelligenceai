'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  X,
  Send,
  CheckCircle,
  User,
  Mail,
  Phone,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  FileText,
  CalendarClock,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'
import { useQuotePopup, QuoteService } from '@/context/QuotePopupContext'
import { trackConversion, CONVERSION_LEAD } from '@/lib/trackConversion'
import FlowTrustStrip from '@/components/FlowTrustStrip'
import ConsultationBooking from '@/components/ConsultationBooking'

const SERVICE_OPTIONS: QuoteService[] = [
  'Foundation',
  'Growth',
  'Bespoke',
  'Custom Build / Platform',
  'SEO Blog Content',
  'Google Business Profile',
  'B2B AI Platform',
  'Other',
]

// Optional add-ons shown in the collapsed "Interested in add-ons?" section.
// Purely additive to the quote request, never required to submit.
const ADDON_OPTIONS = [
  'SEO Blog Content',
  'Instagram & Social Growth Management',
  'B2B Lead Generation',
] as const
type AddonOption = (typeof ADDON_OPTIONS)[number]

const BLOG_TIER_OPTIONS = [
  '4 blogs/mo ($99)',
  '8 blogs/mo ($179)',
  '12 blogs/mo ($249)',
] as const
type BlogTier = (typeof BLOG_TIER_OPTIONS)[number]

// Display-only price labels shown next to each service checkbox. These mirror
// the packages on /services, they do not affect the `value` sent on submit or
// the preselection logic used elsewhere on the site.
const SERVICE_PRICE_LABEL: Record<QuoteService, string | null> = {
  Foundation: '$1,999',
  Growth: '$2,999',
  Bespoke: '$6,999',
  'Custom Build / Platform': 'from $7,000',
  'SEO Blog Content': 'from $99/mo',
  'Google Business Profile': 'from $299',
  'B2B AI Platform': 'Custom pricing',
  Other: null,
}

export default function QuotePopup() {
  const router = useRouter()
  const pathname = usePathname()
  const { isOpen, preselectedService, openPopup, closePopup } = useQuotePopup()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [services, setServices] = useState<QuoteService[]>([])
  const [message, setMessage] = useState('')
  const [addonsOpen, setAddonsOpen] = useState(false)
  const [selectedAddons, setSelectedAddons] = useState<AddonOption[]>([])
  const [blogTier, setBlogTier] = useState<BlogTier | ''>('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  // 'choose' shows the two-option chooser; 'form' shows the quote request form;
  // 'call' shows the 15-minute consultation booking in-panel. Opening with a
  // preselected service skips straight to 'form'.
  const [view, setView] = useState<'choose' | 'form' | 'call'>('choose')

  const toggleAddon = (addon: AddonOption) => {
    const isSelected = selectedAddons.includes(addon)
    if (isSelected) {
      setSelectedAddons(selectedAddons.filter((a) => a !== addon))
      if (addon === 'SEO Blog Content') setBlogTier('')
    } else {
      setSelectedAddons([...selectedAddons, addon])
    }
  }

  const toggleService = (opt: QuoteService) => {
    setServices((prev) => (prev.includes(opt) ? prev.filter((s) => s !== opt) : [...prev, opt]))
  }

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

  // Keep the selection in sync when a button opens the popup with a preselection.
  // A preselected service means the visitor already picked a package, so jump
  // straight to the form; otherwise show the quote-or-call chooser first.
  useEffect(() => {
    if (isOpen) {
      setServices(preselectedService ? [preselectedService] : [])
      setView(preselectedService ? 'form' : 'choose')
    }
  }, [isOpen, preselectedService])

  // "Book a Call" opens the exact same 15-minute consultation booking flow
  // (components/ConsultationBooking, posting to /api/consultation) right inside
  // this panel, no second booking flow, no navigating away.
  const goToBooking = () => setView('call')

  // When the panel is closed, show a small launcher tab anchored to the bottom
  // edge. On mobile it sits above the pill nav so the two never overlap; on
  // desktop (where the pill nav is hidden) it drops back to the corner.
  if (!render) {
    // The immersive /launch funnel manages its own UI, no launcher there.
    if (pathname === '/launch') return null
    return (
      <button
        type="button"
        onClick={() => openPopup()}
        aria-label="Request a quote or call"
        className="fixed z-[60] bottom-24 right-4 sm:bottom-5 sm:right-6 inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] text-white pl-4 pr-5 py-3 text-sm font-semibold shadow-[0_8px_28px_rgba(0,0,0,0.28)] hover:bg-[#2D2D2D] hover:-translate-y-0.5 transition-all duration-200"
      >
        <Send className="w-4 h-4" />
        Request Quote/Call
      </button>
    )
  }

  // Only Name, Email and Phone are required, the business description is
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
        setServices([])
        setMessage('')
        setAddonsOpen(false)
        setSelectedAddons([])
        setBlogTier('')
        setSubmitted(false)
      }
      setSubmitError(null)
      setView('choose')
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
          service: services.length ? services.join(', ') : 'Not specified',
          message: message.trim(),
          addons: selectedAddons,
          blogTier: selectedAddons.includes('SEO Blog Content') ? blogTier || undefined : undefined,
        }),
      })
      const result = await res.json()
      if (res.ok && result.ok) {
        // Show the in-popup confirmation immediately as a fallback in case the
        // redirect is blocked, the visitor always sees a "thanks".
        setSubmitted(true)
        // CRITICAL: fire the Google Ads conversion right here in the success
        // callback, BEFORE any redirect, so it is never gated behind the
        // deposit step or a page navigation. The redirect to the deposit page
        // only runs once the conversion beacon has been sent (or times out).
        const query = services.length ? `?service=${encodeURIComponent(services.join(', '))}` : ''
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
            Thanks, we&apos;ll be in touch within 1 hour
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

  // ── Chooser: get a quote vs book a call ─────────────────────────────────────
  if (view === 'choose') {
    return (
      <div className={shellClass} role="dialog" aria-label="Request a quote or a call">
        <div className={cardClass}>
          {/* Premium header with brand accent bar */}
          <div className="relative sticky top-0 z-10 rounded-t-2xl bg-gradient-to-br from-[#1A1A1A] to-[#2D2317] px-6 pt-6 pb-5">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-white/80" />
            </button>
            <p className="text-[#C9A07A] text-[12px] font-semibold tracking-[1.5px] uppercase">
              Let&apos;s talk
            </p>
            <h2 className="text-xl font-bold text-white mt-1">How can we help?</h2>
            <p className="text-white/70 text-sm mt-1">Two easy ways to start, both free, no commitment.</p>
          </div>

          <div className="p-5 space-y-3">
            {/* Option 1, Quote */}
            <button
              type="button"
              onClick={() => setView('form')}
              className="group w-full flex items-center gap-4 rounded-xl border border-[#E8E4DF] bg-white p-4 text-left transition-all duration-200 hover:border-[#5C3D2E] hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)]"
            >
              <span className="flex-shrink-0 w-11 h-11 rounded-full bg-[#F3EFE9] flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#5C3D2E]" strokeWidth={1.75} />
              </span>
              <span className="flex-1">
                <span className="block font-bold text-[#1A1A1A]">Get a Quote</span>
                <span className="block text-sm text-[#6B6560] mt-0.5">
                  Tell us about your project and get a tailored quote within 1 hour.
                </span>
              </span>
              <ArrowRight className="w-5 h-5 text-[#9E9790] group-hover:text-[#5C3D2E] group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Option 2, Book a Call (reuses existing 15-min consultation booking) */}
            <button
              type="button"
              onClick={goToBooking}
              className="group w-full flex items-center gap-4 rounded-xl border border-[#E8E4DF] bg-white p-4 text-left transition-all duration-200 hover:border-[#5C3D2E] hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)]"
            >
              <span className="flex-shrink-0 w-11 h-11 rounded-full bg-[#F3EFE9] flex items-center justify-center">
                <CalendarClock className="w-5 h-5 text-[#5C3D2E]" strokeWidth={1.75} />
              </span>
              <span className="flex-1">
                <span className="block font-bold text-[#1A1A1A]">Book a Call</span>
                <span className="block text-sm text-[#6B6560] mt-0.5">
                  Grab a free 15-minute phone consultation at a time that suits you.
                </span>
              </span>
              <ArrowRight className="w-5 h-5 text-[#9E9790] group-hover:text-[#5C3D2E] group-hover:translate-x-0.5 transition-all" />
            </button>

            <div className="pt-1">
              <FlowTrustStrip />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Book a Call: the 15-minute consultation booking, in-panel ───────────────
  if (view === 'call') {
    return (
      <div className={shellClass} role="dialog" aria-label="Book a 15-minute call">
        <div className={cardClass}>
          {/* Premium header with brand accent + back to the chooser */}
          <div className="relative sticky top-0 z-10 rounded-t-2xl bg-gradient-to-br from-[#1A1A1A] to-[#2D2317] px-6 pt-5 pb-5">
            <button
              onClick={() => setView('choose')}
              className="absolute top-4 left-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Back to options"
            >
              <ArrowLeft className="w-5 h-5 text-white/80" />
            </button>
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-white/80" />
            </button>
            <div className="text-center px-6">
              <p className="text-[#C9A07A] text-[12px] font-semibold tracking-[1.5px] uppercase">
                Book a Call
              </p>
              <h2 className="text-xl font-bold text-white mt-1">Free 15-Minute Consultation</h2>
              <p className="text-white/70 text-sm mt-1">Pick a time that suits you, no commitment.</p>
            </div>
          </div>

          <div className="p-5">
            <ConsultationBooking showHeading={false} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={shellClass} role="dialog" aria-label="Get a free quote">
      <div className={cardClass}>
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-[#E8E4DF] sticky top-0 bg-white rounded-t-2xl z-10">
          <div className="flex items-start gap-2.5">
            {!preselectedService && (
              <button
                type="button"
                onClick={() => setView('choose')}
                className="mt-0.5 p-1 -ml-1 rounded-md hover:bg-[#F8F7F4] transition-colors flex-shrink-0"
                aria-label="Back to options"
              >
                <ArrowLeft className="w-4 h-4 text-[#6B6560]" />
              </button>
            )}
            <div>
              <h2 className="text-lg font-bold text-[#1A1A1A]">Get a Free Quote, No Commitment</h2>
              <p className="text-sm text-[#6B6560] mt-0.5">Tell us what you need. We respond within 1 hour.</p>
            </div>
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
          <p className="text-center text-[11px] text-[#9E9790] mt-2 leading-relaxed">
            *All websites require a separate monthly hosting plan (from $59/mo) to stay live
            online, not included in the one-off build price above.
          </p>
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

          {/* Service (multi-select) */}
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
              What service do you need?{' '}
              <span className="font-normal text-[#9E9790]">(select all that apply)</span>
            </label>
            <div className="border border-[#E8E4DF] rounded-lg p-3 space-y-2">
              {SERVICE_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2.5 text-sm text-[#1A1A1A] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={services.includes(opt)}
                    onChange={() => toggleService(opt)}
                    className="w-4 h-4 rounded border-[#E8E4DF] text-[#5C3D2E] focus:ring-[#5C3D2E] cursor-pointer"
                  />
                  <span>
                    {opt}
                    {SERVICE_PRICE_LABEL[opt] && (
                      <span className="text-[#9E9790]">, {SERVICE_PRICE_LABEL[opt]}</span>
                    )}
                  </span>
                </label>
              ))}
            </div>
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

          {/* Add-ons, optional, collapsed by default. Never blocks submission. */}
          <div className="border border-[#E8E4DF] rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setAddonsOpen((v) => !v)}
              aria-expanded={addonsOpen}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-[#1A1A1A] hover:bg-[#F8F7F4] transition-colors duration-200"
            >
              Interested in add-ons? (optional)
              {addonsOpen ? (
                <ChevronUp className="w-4 h-4 text-[#6B6560]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#6B6560]" />
              )}
            </button>

            {addonsOpen && (
              <div className="px-4 pb-4 pt-1 space-y-3 border-t border-[#E8E4DF]">
                {ADDON_OPTIONS.map((addon) => (
                  <div key={addon}>
                    <label className="flex items-center gap-2.5 text-sm text-[#1A1A1A] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAddons.includes(addon)}
                        onChange={() => toggleAddon(addon)}
                        className="w-4 h-4 rounded border-[#E8E4DF] text-[#5C3D2E] focus:ring-[#5C3D2E] cursor-pointer"
                      />
                      {addon}
                    </label>

                    {addon === 'SEO Blog Content' && selectedAddons.includes('SEO Blog Content') && (
                      <div className="ml-6 mt-2 space-y-1.5">
                        {BLOG_TIER_OPTIONS.map((tier) => (
                          <label
                            key={tier}
                            className="flex items-center gap-2.5 text-sm text-[#6B6560] cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="qp-blog-tier"
                              value={tier}
                              checked={blogTier === tier}
                              onChange={() => setBlogTier(tier)}
                              className="w-4 h-4 border-[#E8E4DF] text-[#5C3D2E] focus:ring-[#5C3D2E] cursor-pointer"
                            />
                            {tier}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
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
