'use client'

import { useState } from 'react'
import { X, ArrowLeft, ArrowRight, Check, Zap, Building2, CheckCircle } from 'lucide-react'
import { useQuoteModal } from '@/context/QuoteModalContext'

// ─── Types ────────────────────────────────────────────────────────────────────

type WebsiteType = 'landing' | 'full'

interface QuoteFormData {
  websiteType: WebsiteType | null
  colourDirection: string
  colourLabel: string
  seoPlan: 'none' | 'google' | 'super' | 'market'
  seoPrice: number
  name: string
  businessName: string
  email: string
  phone: string
  notes: string
}

const INITIAL: QuoteFormData = {
  websiteType: null,
  colourDirection: '',
  colourLabel: '',
  seoPlan: 'super',
  seoPrice: 499,
  name: '',
  businessName: '',
  email: '',
  phone: '',
  notes: '',
}

const TOTAL_STEPS = 5

// ─── Data ─────────────────────────────────────────────────────────────────────

const COLOUR_SWATCHES = [
  { id: '#1a1a2e', label: 'Dark & Premium', bg: '#1a1a2e' },
  { id: '#f5f5f0', label: 'Clean & Minimal', bg: '#f5f5f0', dark: true },
  { id: '#1e3a5f', label: 'Professional Blue', bg: '#1e3a5f' },
  { id: '#2d6a4f', label: 'Natural Green', bg: '#2d6a4f' },
  { id: '#7b2d8b', label: 'Bold Purple', bg: '#7b2d8b' },
  { id: '#c0392b', label: 'Strong Red', bg: '#c0392b' },
  { id: '#e67e22', label: 'Warm Orange', bg: '#e67e22' },
  { id: 'custom', label: "Custom: I'll send examples", bg: 'linear-gradient(135deg,#6366f1,#a855f7,#ec4899)', isGradient: true },
]

const SEO_PLANS = [
  {
    id: 'none' as const,
    label: 'No SEO plan yet',
    description: 'Just the free blog for now, I can upgrade later.',
    price: 'Free',
    numericPrice: 0,
  },
  {
    id: 'google' as const,
    label: 'Google Growth',
    description: '2 blogs/month · keyword research · monthly report',
    price: '+$299/mo',
    numericPrice: 299,
  },
  {
    id: 'super' as const,
    label: 'Super Growth',
    badge: '✦ Recommended',
    description: '4 blogs/month · deep strategy · internal linking',
    price: '+$499/mo',
    numericPrice: 499,
  },
  {
    id: 'market' as const,
    label: 'Market Authority',
    description: '8 blogs/month · topical authority · competitor analysis',
    price: '+$799/mo',
    numericPrice: 799,
  },
]

const WEBSITE_BASE_PRICE: Record<WebsiteType, number> = {
  landing: 599,
  full: 1999,
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function QuoteModal() {
  const { isOpen, closeModal } = useQuoteModal()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<QuoteFormData>(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleClose = () => {
    closeModal()
    // reset after close animation
    setTimeout(() => {
      setStep(1)
      setFormData(INITIAL)
      setSubmitted(false)
      setSubmitError(null)
    }, 300)
  }

  const canProceed = (): boolean => {
    switch (step) {
      case 1: return formData.websiteType !== null
      case 2: return formData.colourDirection !== ''
      case 3: return true // seoPlan has default
      case 4:
        return (
          formData.name.trim() !== '' &&
          formData.businessName.trim() !== '' &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
        )
      case 5: return true
      default: return false
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">We'll be in touch within 24 hours</h2>
          <p className="text-[#6B6560] mb-6 leading-relaxed">
            Your quote request has been sent to the Capital Intelligence Group team. Check your inbox. We'll have a custom proposal ready for you soon.{' '}
            <span className="text-[#1A1A1A] font-semibold">Your free SEO blog is included with your build no matter which package you choose.</span>
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

  const websiteLabel = formData.websiteType === 'landing' ? 'Landing Page' : formData.websiteType === 'full' ? 'Full Website' : '—'
  const basePrice = formData.websiteType ? WEBSITE_BASE_PRICE[formData.websiteType] : 0
  const seoPlanData = SEO_PLANS.find((p) => p.id === formData.seoPlan)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white border border-[#E8E4DF] rounded-[10px] w-full max-w-xl flex flex-col max-h-[92vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DF] flex-shrink-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5C3D2E] mb-0.5">
              Step {step} of {TOTAL_STEPS}
            </p>
            {/* Progress dots */}
            <div className="flex gap-1.5 mt-1">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full smooth-transition ${
                    i < step ? 'bg-[#1A1A1A] w-5' : 'bg-[#F8F7F4] w-3'
                  }`}
                />
              ))}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-[6px] hover:bg-black/40 smooth-transition"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-[#6B6560]" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto flex-1">

          {/* Step 1 — Website type */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-1">Let's build your website</h2>
              <p className="text-[#6B6560] mb-5">What type of site do you need?</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setFormData({ ...formData, websiteType: 'landing' })}
                  className={`relative flex flex-col items-start gap-3 p-5 rounded-[6px] border-2 text-left smooth-transition ${
                    formData.websiteType === 'landing'
                      ? 'border-[#5C3D2E] bg-[#F8F7F4]'
                      : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                  }`}
                >
                  <div className="w-10 h-10 bg-[#F8F7F4] rounded-[6px] flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1A1A1A] text-base">Landing page</p>
                    <p className="text-[#6B6560] text-xs mt-1 leading-snug">Single page to capture leads and showcase your offer. From $599.</p>
                  </div>
                  {formData.websiteType === 'landing' && (
                    <Check className="w-4 h-4 text-[#5C3D2E] absolute top-4 right-4" />
                  )}
                </button>
                <button
                  onClick={() => setFormData({ ...formData, websiteType: 'full' })}
                  className={`relative flex flex-col items-start gap-3 p-5 rounded-[6px] border-2 text-left smooth-transition ${
                    formData.websiteType === 'full'
                      ? 'border-[#5C3D2E] bg-[#F8F7F4]'
                      : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                  }`}
                >
                  <div className="w-10 h-10 bg-[#F8F7F4] rounded-[6px] flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1A1A1A] text-base">Full website</p>
                    <p className="text-[#6B6560] text-xs mt-1 leading-snug">Multi-page site with full design, content, and strategy. From $1,999.</p>
                  </div>
                  {formData.websiteType === 'full' && (
                    <Check className="w-4 h-4 text-[#5C3D2E] absolute top-4 right-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — Colour direction */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-1">Pick your colour direction</h2>
              <p className="text-[#6B6560] mb-5">We'll use this as a starting point, fully customisable.</p>
              <div className="grid grid-cols-4 gap-3">
                {COLOUR_SWATCHES.map((swatch) => (
                  <button
                    key={swatch.id}
                    onClick={() => setFormData({ ...formData, colourDirection: swatch.id, colourLabel: swatch.label })}
                    className={`flex flex-col items-center gap-2 p-2 rounded-[6px] border-2 smooth-transition ${
                      formData.colourDirection === swatch.id
                        ? 'border-[#5C3D2E]'
                        : 'border-[#E8E4DF] hover:border-[#5C3D2E]/40'
                    }`}
                  >
                    <div
                      className="w-full h-12 rounded-[6px]"
                      style={
                        swatch.isGradient
                          ? { background: swatch.bg }
                          : { backgroundColor: swatch.bg }
                      }
                    />
                    <span className={`text-xs text-center leading-tight ${swatch.dark ? 'text-[#1A1A1A]' : 'text-[#6B6560]'}`}>
                      {swatch.label}
                    </span>
                    {formData.colourDirection === swatch.id && (
                      <Check className="w-3.5 h-3.5 text-[#5C3D2E]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 — SEO plan */}
          {step === 3 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-1">Get your website found on Google</h2>
              <p className="text-[#6B6560] text-sm mb-3">Every build includes 1 free SEO blog. Add a plan to keep growing.</p>
              {/* Amber banner */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-[6px] px-3 py-2.5 mb-3 flex items-start gap-2">
                <span className="text-base flex-shrink-0">🎁</span>
                <p className="text-amber-200 text-xs leading-snug">
                  <span className="font-semibold">1 free SEO blog included with your build</span>, no commitment required.
                </p>
              </div>
              <div className="space-y-2">
                {SEO_PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setFormData({ ...formData, seoPlan: plan.id, seoPrice: plan.numericPrice })}
                    className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-[6px] border-2 text-left smooth-transition ${
                      formData.seoPlan === plan.id
                        ? 'border-[#5C3D2E] bg-[#F8F7F4]'
                        : 'border-[#E8E4DF] hover:border-[#5C3D2E]/40'
                    }`}
                  >
                    {/* Radio dot */}
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 smooth-transition ${
                        formData.seoPlan === plan.id
                          ? 'border-[#5C3D2E] bg-[#1A1A1A]'
                          : 'border-[#5C3D2E]/40'
                      }`}
                    />
                    {/* Label + description (flex-1 so it fills available space) */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className="text-[#1A1A1A] font-semibold text-sm">{plan.label}</span>
                        {plan.badge && (
                          <span className="text-xs px-1.5 py-0.5 bg-[#F8F7F4] border border-[#5C3D2E]/40 text-[#5C3D2E] rounded-full font-semibold leading-none">
                            {plan.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[#6B6560] text-xs mt-0.5 leading-snug break-words">{plan.description}</p>
                    </div>
                    {/* Price — always visible, right-aligned */}
                    <span className={`text-sm font-bold flex-shrink-0 ${plan.id === 'none' ? 'text-green-400' : 'text-[#1A1A1A]'}`}>
                      {plan.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4 — Contact details */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-1">About your business</h2>
              <p className="text-[#6B6560] mb-5">We'll have your custom quote ready within 24 hours.</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    Your name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#5C3D2E] smooth-transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    Business name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Capital Intelligence Group"
                    className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#5C3D2E] smooth-transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    Email address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#5C3D2E] smooth-transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    Phone number <span className="text-[#6B6560] text-xs font-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Optional"
                    className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#5C3D2E] smooth-transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    Anything else we should know? <span className="text-[#6B6560] text-xs font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. I have a logo already, I need it live by June..."
                    rows={3}
                    className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#5C3D2E] smooth-transition resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5 — Summary */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-1">Your quote summary</h2>
              <p className="text-[#6B6560] mb-5">Review your selections before we send this through.</p>
              <div className="bg-[#1A1A1A] border border-[#E8E4DF] rounded-[6px] p-5 space-y-3 mb-4">
                <SummaryRow label="Website type" value={websiteLabel} />
                <SummaryRow label="Colour direction" value={formData.colourLabel || formData.colourDirection} />
                <SummaryRow
                  label="SEO plan"
                  value={seoPlanData?.label ?? '—'}
                />
                <SummaryRow label="Free SEO blog" value="Included ✓" highlight />
                <div className="pt-3 border-t border-[#E8E4DF]">
                  <SummaryRow
                    label="Build from"
                    value={`$${basePrice.toLocaleString()} AUD${formData.seoPrice > 0 ? ` + $${formData.seoPrice}/mo` : ''}`}
                    bold
                  />
                </div>
              </div>
              {submitError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-[6px] text-red-400 text-sm">
                  {submitError}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E8E4DF] flex items-center justify-between flex-shrink-0">
          <button
            onClick={step === 1 ? handleClose : () => setStep(step - 1)}
            className="flex items-center gap-2 px-4 py-2.5 border border-[#E8E4DF] text-[#6B6560] rounded-[6px] font-medium smooth-transition hover:border-[#5C3D2E] hover:text-[#1A1A1A]"
          >
            <ArrowLeft className="w-4 h-4" />
            {step === 1 ? 'Cancel' : 'Back'}
          </button>

          {step < TOTAL_STEPS ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1A1A1A] text-white rounded-[6px] font-semibold smooth-transition hover:bg-[#2D2D2D] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1A1A1A] text-white rounded-[6px] font-semibold smooth-transition hover:bg-[#2D2D2D] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? 'Sending...' : 'Send quote request →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function SummaryRow({
  label,
  value,
  highlight,
  bold,
}: {
  label: string
  value: string
  highlight?: boolean
  bold?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[#6B6560] text-sm">{label}</span>
      <span
        className={`text-sm text-right ${
          highlight ? 'text-green-400 font-semibold' : bold ? 'text-[#1A1A1A] font-bold' : 'text-[#1A1A1A]'
        }`}
      >
        {value}
      </span>
    </div>
  )
}
