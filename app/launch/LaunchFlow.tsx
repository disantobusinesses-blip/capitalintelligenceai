'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Loader2,
  Palette,
  Rocket,
} from 'lucide-react'
import TemplateCard from '@/components/TemplateCard'
import {
  TEMPLATES,
  HOSTING_PLANS,
  TemplateTier,
  DEPOSIT_AMOUNT,
  GST_NOTE,
  GLOBAL_ADDONS_DISCLAIMER,
  CUSTOM_SITE_OPTIONS,
  CustomSiteOption,
} from '@/lib/templates'

// Each step keeps the 1-2-3 indicator, with a short subheading describing its purpose.
const STEPS = [
  { title: 'Your Site', sub: 'Choose your site' },
  { title: 'Schedule', sub: 'Pick a date' },
  { title: 'Checkout', sub: 'Secure your build' },
]

// Brand accent (dark brown leather) used to highlight active selections.
const ACCENT = '#5C3D2E'

type SiteType = 'template' | 'custom'

interface LaunchFlowProps {
  initialTemplateId?: string | null
  initialTier?: TemplateTier['id'] | null
  initialSiteType?: SiteType | null
}

function getAvailableDates(): Date[] {
  const dates: Date[] = []
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  for (let i = 0; i < 14; i++) {
    const d = new Date(tomorrow)
    d.setDate(tomorrow.getDate() + i)
    dates.push(d)
  }
  return dates
}

function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default function LaunchFlow({
  initialTemplateId = null,
  initialTier = null,
  initialSiteType = null,
}: LaunchFlowProps) {
  const hasInitialTemplate = Boolean(
    initialTemplateId && TEMPLATES.some((t) => t.id === initialTemplateId)
  )
  const [step, setStep] = useState(0)
  const [siteType, setSiteType] = useState<SiteType | null>(
    hasInitialTemplate ? 'template' : initialSiteType
  )
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(
    hasInitialTemplate ? initialTemplateId : null
  )
  const [selectedTier, setSelectedTier] = useState<TemplateTier['id'] | null>(
    hasInitialTemplate ? initialTier : null
  )
  const [selectedCustomOption, setSelectedCustomOption] = useState<CustomSiteOption['id'] | null>(
    null
  )
  const [selectedHosting, setSelectedHosting] = useState<string | null>(null)
  const [goLiveDate, setGoLiveDate] = useState<string | null>(null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Always land at the very top of the next step so the heading is the first thing
  // a visitor sees — never the bottom of the previous section.
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step, siteType])

  const dates = useMemo(getAvailableDates, [])

  const template = TEMPLATES.find((t) => t.id === selectedTemplate)
  const hosting = HOSTING_PLANS.find((p) => p.id === selectedHosting)
  // Resolve the active tier (defaults to first tier when a tiered template is chosen).
  const tier =
    template?.tiers?.find((t) => t.id === selectedTier) ?? template?.tiers?.[0] ?? null
  const templatePrice = tier?.price ?? template?.price ?? 0

  // The template path is the only path that flows through hosting → date → payment.
  // Custom builds need a quote, so they branch off to a consultation booking.
  const canProceedStep1 = Boolean(selectedTemplate && selectedHosting)
  const canProceedStep2 = Boolean(goLiveDate)

  function selectSiteType(type: SiteType) {
    setSiteType(type)
    setSelectedTemplate(null)
    setSelectedTier(null)
    setSelectedCustomOption(null)
    setSelectedHosting(null)
  }

  async function handleCheckout() {
    if (
      siteType !== 'template' ||
      !selectedTemplate ||
      !selectedHosting ||
      !goLiveDate ||
      !termsAccepted
    )
      return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/launch/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteType: 'template',
          templateId: selectedTemplate,
          tier: tier?.id ?? null,
          hostingPlan: selectedHosting,
          goLiveDate,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Unable to start checkout. Please try again.')
      }
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  // The sticky action bar (with Back / Continue) only drives the template path.
  const showActionBar = (step === 0 && siteType === 'template') || step === 1
  const actionHelper =
    step === 1
      ? canProceedStep2
        ? null
        : 'Select a go live date to continue.'
      : canProceedStep1
        ? null
        : 'Select a template and a hosting plan to continue.'

  return (
    <main
      className={`min-h-screen bg-[#F8F7F4] text-[#1A1A1A] pt-[84px] px-6 ${
        showActionBar ? 'pb-60 sm:pb-48' : 'pb-28'
      }`}
    >
      <div className="max-w-[1040px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[#1A1A1A] text-[13px] font-semibold tracking-[1.5px] uppercase mb-4">
            Launch My Site
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight">
            Launch Your Site within 24–48 Hours
          </h1>
          <p className="text-[#5A5A5A] text-lg max-w-xl mx-auto leading-relaxed">
            Pick a professionally designed template, choose your go live date, and pay a $
            {DEPOSIT_AMOUNT} deposit to secure your build.
          </p>
        </div>

        {/* Step indicator with a short subheading describing each step */}
        <div className="flex items-start justify-center gap-3 md:gap-6 mb-14 md:mb-16">
          {STEPS.map((stepInfo, i) => (
            <div key={stepInfo.title} className="flex items-start gap-3 md:gap-6">
              <div className="flex flex-col items-center text-center max-w-[120px]">
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-200 ${
                    i === step
                      ? 'bg-[#1A1A1A] text-white'
                      : i < step
                        ? 'bg-[#1A1A1A]/15 text-[#1A1A1A]'
                        : 'bg-[#E8E4DF] text-[#5A5A5A]'
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`mt-2 text-sm font-semibold ${
                    i === step ? 'text-[#1A1A1A]' : 'text-[#8A8A8A]'
                  }`}
                >
                  {stepInfo.title}
                </span>
                <span className="hidden sm:block mt-0.5 text-[12px] text-[#8A8A8A] leading-snug">
                  {stepInfo.sub}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span className="hidden sm:block w-8 md:w-14 h-px bg-[#E8E4DF] mt-[18px]" />
              )}
            </div>
          ))}
        </div>

        {/* Selection area */}
        <div>
          {/* Step 1: Site type */}
          {step === 0 && !siteType && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">
                What kind of site do you need?
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                <button
                  type="button"
                  onClick={() => selectSiteType('template')}
                  className="rounded-2xl bg-white border border-[#E8E4DF] hover:border-[#5C3D2E] p-8 md:p-10 text-left transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                >
                  <Rocket className="w-9 h-9 text-[#1A1A1A] mb-5" />
                  <h3 className="text-2xl font-extrabold mb-3">Template Site</h3>
                  <p className="text-[#5A5A5A] leading-relaxed">
                    From $850 {GST_NOTE} · Live in 24–48 hours
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => selectSiteType('custom')}
                  className="rounded-2xl bg-white border border-[#E8E4DF] hover:border-[#5C3D2E] p-8 md:p-10 text-left transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                >
                  <Palette className="w-9 h-9 text-[#1A1A1A] mb-5" />
                  <h3 className="text-2xl font-extrabold mb-3">Custom Landing Page or Site</h3>
                  <p className="text-[#5A5A5A] leading-relaxed">
                    From $599 {GST_NOTE} · Tailored to your business
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Step 1 (template): pick a template, then choose a hosting plan */}
          {step === 0 && siteType === 'template' && (
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-center mb-2">Choose your template</h2>
                <p className="text-center text-[#5A5A5A] mb-8">
                  Tap a design to select it, then pick your hosting plan below.
                </p>
                {/* Mobile: horizontal slider. Desktop: grid. */}
                <div className="flex gap-5 overflow-x-auto pb-4 px-1 snap-x snap-mandatory [scrollbar-width:thin] sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-7 sm:overflow-visible sm:pb-0 sm:px-0">
                  {TEMPLATES.map((t) => (
                    <div
                      key={t.id}
                      className="snap-center shrink-0 w-[85vw] max-w-[340px] sm:w-auto sm:max-w-none sm:shrink"
                    >
                      <TemplateCard
                        template={t}
                        selectable
                        selected={selectedTemplate === t.id}
                        selectedTier={selectedTemplate === t.id ? selectedTier : null}
                        onSelect={(id) => {
                          if (selectedTemplate !== id) {
                            setSelectedTemplate(id)
                            setSelectedTier(null)
                          }
                        }}
                        onSelectTier={(id, tierId) => {
                          setSelectedTemplate(id)
                          setSelectedTier(tierId)
                        }}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-center text-[#8A8A8A] text-sm mt-3 sm:hidden">
                  Swipe to see more templates →
                </p>
              </div>

              {/* Dedicated hosting plan selection */}
              <div className="max-w-2xl mx-auto">
                <p className="text-center text-sm font-semibold text-[#1A1A1A] mb-1">
                  Choose your hosting plan (required)
                </p>
                <p className="text-center text-[#8A8A8A] text-sm mb-6">
                  Keeps your site fast, secure, and online.
                </p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {HOSTING_PLANS.map((plan) => {
                    const isSelected = selectedHosting === plan.id
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedHosting(plan.id)}
                        aria-pressed={isSelected}
                        className={`rounded-2xl border bg-white px-6 py-6 text-left transition-all duration-200 ${
                          isSelected
                            ? 'border-[#5C3D2E] ring-2 ring-[#5C3D2E] shadow-[0_4px_18px_rgba(92,61,46,0.18)]'
                            : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-bold text-lg">{plan.label}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: ACCENT }} />
                          )}
                        </div>
                        <span className="block mt-1 text-[#5A5A5A] font-semibold">
                          {plan.price}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <p className="text-center text-[#8A8A8A] text-[13px] leading-relaxed max-w-2xl mx-auto">
                {GLOBAL_ADDONS_DISCLAIMER}
              </p>
            </div>
          )}

          {/* Step 1 (custom): pick a build size, then book a consultation for a quote */}
          {step === 0 && siteType === 'custom' && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-2">
                What kind of custom build do you need?
              </h2>
              <p className="text-center text-[#5A5A5A] mb-8">
                Custom pricing is tailored to your business, so we&apos;ll quote it on a quick call.
              </p>
              <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
                {CUSTOM_SITE_OPTIONS.map((option) => {
                  const isSelected = selectedCustomOption === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedCustomOption(option.id)}
                      aria-pressed={isSelected}
                      className={`rounded-2xl border bg-white px-6 py-8 text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-[#5C3D2E] ring-2 ring-[#5C3D2E] shadow-[0_4px_18px_rgba(92,61,46,0.18)]'
                          : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-extrabold text-xl">{option.label}</span>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: ACCENT }} />
                        )}
                      </div>
                      <span className="block mt-2 text-[#5A5A5A] font-semibold">{option.range}</span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-10 rounded-2xl bg-white border border-[#E8E4DF] p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <h3 className="text-xl font-bold mb-2">Let&apos;s scope it together</h3>
                <p className="text-[#5A5A5A] leading-relaxed mb-6">
                  Book a free 15-minute consultation and we&apos;ll prepare a tailored quote for your
                  {selectedCustomOption === 'multipage'
                    ? ' multi-page site'
                    : selectedCustomOption === 'landing'
                      ? ' landing page'
                      : ' custom build'}
                  .
                </p>
                <a
                  href={`/#consultation${selectedCustomOption ? `?build=${selectedCustomOption}` : ''}`}
                  aria-disabled={!selectedCustomOption}
                  className={`inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-[6px] transition-colors duration-200 ${
                    selectedCustomOption
                      ? 'bg-[#1A1A1A] text-white hover:bg-[#2D2D2D]'
                      : 'bg-[#1A1A1A]/30 text-white pointer-events-none'
                  }`}
                >
                  Book a Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </a>
                {!selectedCustomOption && (
                  <p className="text-[#8A8A8A] text-sm mt-3">
                    Select a build option above to continue.
                  </p>
                )}
              </div>

              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={() => setSiteType(null)}
                  className="inline-flex items-center gap-2 border border-[#1A1A1A]/30 text-[#1A1A1A] font-semibold px-6 py-3 rounded-[6px] hover:bg-[#1A1A1A]/5 transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Go Live Date Picker */}
          {step === 1 && (
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-2 justify-center mb-3">
                <CalendarDays className="w-5 h-5 text-[#1A1A1A]" />
                <h2 className="text-2xl font-bold">Choose your preferred go live date</h2>
              </div>
              <p className="text-center text-[#5A5A5A] mb-8">
                We&apos;ll have your site ready to go live on this day.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-3">
                {dates.map((d) => {
                  const iso = toISODate(d)
                  const isSelected = goLiveDate === iso
                  return (
                    <button
                      key={iso}
                      type="button"
                      onClick={() => setGoLiveDate(iso)}
                      className={`rounded-xl border px-2 py-4 text-center transition-all duration-200 ${
                        isSelected
                          ? 'border-[#5C3D2E] ring-2 ring-[#5C3D2E] bg-white text-[#1A1A1A]'
                          : 'border-[#E8E4DF] bg-white text-[#1A1A1A] hover:border-[#5C3D2E]'
                      }`}
                    >
                      <span className="block text-[11px] uppercase font-semibold">
                        {d.toLocaleDateString('en-AU', { weekday: 'short' })}
                      </span>
                      <span className="block text-lg font-bold">{d.getDate()}</span>
                      <span className="block text-[11px]">
                        {d.toLocaleDateString('en-AU', { month: 'short' })}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 3: Payment (template path only) */}
          {step === 2 && hosting && goLiveDate && template && (
            <div className="max-w-lg mx-auto">
              <div className="rounded-2xl bg-white border border-[#E8E4DF] p-8 space-y-5 text-[#1A1A1A] shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#1A1A1A]" />
                  Secure your build
                </h2>
                <ul className="text-sm text-[#5A5A5A] space-y-3">
                  <li className="flex justify-between gap-4">
                    <span>Template</span>
                    <span className="text-[#1A1A1A] font-semibold text-right">
                      {template.businessName} ({template.industry})
                    </span>
                  </li>
                  {tier && template.tiers && template.tiers.length > 1 && (
                    <li className="flex justify-between gap-4">
                      <span>Package</span>
                      <span className="text-[#1A1A1A] font-semibold text-right">{tier.label}</span>
                    </li>
                  )}
                  <li className="flex justify-between gap-4">
                    <span>Website build</span>
                    <span className="text-[#1A1A1A] font-semibold text-right">
                      ${templatePrice.toLocaleString()} {GST_NOTE}
                    </span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>Hosting plan</span>
                    <span className="text-[#1A1A1A] font-semibold text-right">
                      {hosting.label} — {hosting.price}
                    </span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>Go live date</span>
                    <span className="text-[#1A1A1A] font-semibold text-right">
                      {new Date(`${goLiveDate}T00:00:00`).toLocaleDateString('en-AU', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </li>
                  <li className="flex justify-between gap-4 border-t border-[#E8E4DF] pt-4">
                    <span>Due today (deposit)</span>
                    <span className="text-[#1A1A1A] font-bold">${DEPOSIT_AMOUNT}</span>
                  </li>
                </ul>
                <p className="text-xs text-[#8A8A8A] leading-relaxed">
                  You&apos;ll be charged the ${DEPOSIT_AMOUNT} deposit plus your first month of
                  hosting in one secure Stripe checkout. We collect your email and phone at checkout
                  so we can confirm your build. The remaining build balance is invoiced before go
                  live.
                </p>

                <label className="flex items-start gap-3 text-sm text-[#5A5A5A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#5C3D2E]"
                  />
                  <span>
                    I understand that the ${DEPOSIT_AMOUNT} deposit is non-refundable once the
                    website has been delivered and approved. If Capital Intelligence Group fails to
                    deliver, the deposit will be refunded in full.
                  </span>
                </label>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                  onClick={handleCheckout}
                  disabled={!termsAccepted || loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-white font-bold px-8 py-4 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Redirecting to Stripe…
                    </>
                  ) : (
                    <>Pay ${DEPOSIT_AMOUNT} Deposit + Hosting</>
                  )}
                </button>
              </div>
              <div className="flex justify-start mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 border border-[#1A1A1A]/30 text-[#1A1A1A] font-semibold px-6 py-3 rounded-[6px] hover:bg-[#1A1A1A]/5 transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky action bar — keeps Back / Continue in view on the template selection steps. */}
      {showActionBar && (
        <div className="fixed bottom-0 inset-x-0 z-40 border-t border-[#E8E4DF] bg-white/95 backdrop-blur px-6 pt-4 pb-24 sm:pb-4 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
          <div className="max-w-[1040px] mx-auto flex flex-col sm:flex-row items-center gap-3 sm:justify-between">
            {actionHelper ? (
              <p className="text-[#8A8A8A] text-sm text-center sm:text-left order-2 sm:order-1">
                {actionHelper}
              </p>
            ) : (
              <p className="text-[#1A1A1A] text-sm font-semibold text-center sm:text-left order-2 sm:order-1">
                All set — click Continue
              </p>
            )}
            <div className="flex gap-3 order-1 sm:order-2 w-full sm:w-auto">
              <button
                onClick={() => (step === 1 ? setStep(0) : setSiteType(null))}
                className="inline-flex items-center justify-center gap-2 border border-[#1A1A1A]/30 text-[#1A1A1A] font-semibold px-6 py-3 rounded-[6px] hover:bg-[#1A1A1A]/5 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={() => setStep(step === 1 ? 2 : 1)}
                disabled={step === 1 ? !canProceedStep2 : !canProceedStep1}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-white font-bold px-8 py-3 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
