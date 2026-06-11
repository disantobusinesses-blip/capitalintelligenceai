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
import { useGetStartedModal } from '@/context/GetStartedModalContext'
import {
  TEMPLATES,
  HOSTING_PLANS,
  TemplateTier,
  DEPOSIT_AMOUNT,
  GST_NOTE,
  CUSTOM_SITE_OPTIONS,
  CustomSiteOption,
} from '@/lib/templates'

// Each step keeps the compact 1-2-3 indicator at the top.
const STEPS = [
  { title: 'Your Site' },
  { title: 'Schedule' },
  { title: 'Checkout' },
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

  const { openModal: openQuoteForm } = useGetStartedModal()

  const template = TEMPLATES.find((t) => t.id === selectedTemplate)
  const hosting = HOSTING_PLANS.find((p) => p.id === selectedHosting)
  // Resolve the active tier (defaults to first tier when a tiered template is chosen).
  const tier =
    template?.tiers?.find((t) => t.id === selectedTier) ?? template?.tiers?.[0] ?? null
  const templatePrice = tier?.price ?? template?.price ?? 0

  // Resolve the active custom build option and which path it follows.
  const customOption: CustomSiteOption | null =
    CUSTOM_SITE_OPTIONS.find((o) => o.id === selectedCustomOption) ?? null
  const isCustomDeposit = siteType === 'custom' && customOption?.flow === 'deposit'
  const isCustomQuote = siteType === 'custom' && customOption?.flow === 'quote'

  // The Stripe path runs through hosting → date → payment. Template builds and
  // custom landing pages (Starter / Premium) both follow it. Multi-page custom
  // sites need a tailored quote, so they branch off to the quote request form.
  const canProceedStep1 =
    (siteType === 'template' && Boolean(selectedTemplate && selectedHosting)) ||
    (isCustomDeposit && Boolean(selectedHosting))
  const canProceedStep2 = Boolean(goLiveDate)

  // Summary values shared by the payment step for both template and custom builds.
  const buildName =
    siteType === 'custom'
      ? (customOption?.label ?? '')
      : template
        ? `${template.businessName} (${template.industry})`
        : ''
  const buildPriceLabel =
    siteType === 'custom'
      ? (customOption?.range ?? '')
      : `$${templatePrice.toLocaleString()} ${GST_NOTE}`

  function selectSiteType(type: SiteType) {
    setSiteType(type)
    setSelectedTemplate(null)
    setSelectedTier(null)
    setSelectedCustomOption(null)
    setSelectedHosting(null)
  }

  async function handleCheckout() {
    const validTemplate =
      siteType === 'template' && Boolean(selectedTemplate && selectedHosting)
    const validCustom = isCustomDeposit && Boolean(selectedHosting)
    if ((!validTemplate && !validCustom) || !goLiveDate || !termsAccepted) return
    setLoading(true)
    setError(null)
    try {
      const body =
        siteType === 'template'
          ? {
              siteType: 'template',
              templateId: selectedTemplate,
              tier: tier?.id ?? null,
              hostingPlan: selectedHosting,
              goLiveDate,
            }
          : {
              siteType: 'custom',
              customOption: selectedCustomOption,
              hostingPlan: selectedHosting,
              goLiveDate,
            }
      const res = await fetch('/api/launch/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
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

  // The sticky action bar (with Back / Continue) drives the Stripe path —
  // template builds and custom landing pages.
  const showActionBar =
    (step === 0 && (siteType === 'template' || isCustomDeposit)) || step === 1
  const actionHelper =
    step === 1
      ? canProceedStep2
        ? null
        : 'Select a go live date to continue.'
      : canProceedStep1
        ? null
        : siteType === 'custom'
          ? 'Choose a hosting plan to continue.'
          : 'Select a template and a hosting plan to continue.'

  // Hosting plan picker — shared by the template flow and the custom landing
  // page flow so both choose hosting before checkout.
  function renderHostingPicker() {
    return (
      <div className="max-w-2xl mx-auto">
        <p className="text-center text-sm font-semibold text-[#1A1A1A] mb-1">
          Choose your hosting plan (required)
        </p>
        <p className="text-center text-[#8A8A8A] text-xs mb-3">
          Keeps your site fast, secure &amp; online.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {HOSTING_PLANS.map((plan) => {
            const isSelected = selectedHosting === plan.id
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedHosting(plan.id)}
                aria-pressed={isSelected}
                className={`rounded-xl border bg-white px-4 py-3 text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-[#5C3D2E] ring-2 ring-[#5C3D2E]'
                    : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-sm">{plan.label}</span>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: ACCENT }} />
                  )}
                </div>
                <span className="block mt-0.5 text-[#5A5A5A] text-sm font-semibold">
                  {plan.price}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <main
      className={`min-h-screen bg-[#F8F7F4] text-[#1A1A1A] pt-[76px] px-4 sm:px-6 ${
        showActionBar ? 'pb-44 sm:pb-32' : 'pb-28'
      }`}
    >
      <div className="max-w-[1040px] mx-auto">
        {/* Compact one-time hero — shown small at the very top, never inside steps */}
        <div className="text-center mb-5 md:mb-7">
          <p className="text-[#1A1A1A] text-[11px] font-semibold tracking-[1.5px] uppercase mb-1">
            Launch My Site
          </p>
          <h1 className="text-base md:text-lg font-bold leading-tight">
            Launch your site in 24–48 hours
          </h1>
        </div>

        {/* Compact step indicator — small, unobtrusive 1-2-3 at the top */}
        <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
          {STEPS.map((stepInfo, i) => (
            <div key={stepInfo.title} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors duration-200 ${
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
                  className={`text-[12px] font-semibold ${
                    i === step ? 'text-[#1A1A1A]' : 'text-[#8A8A8A]'
                  } ${i === step ? 'inline' : 'hidden sm:inline'}`}
                >
                  {stepInfo.title}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span className="w-5 sm:w-8 h-px bg-[#E8E4DF]" />
              )}
            </div>
          ))}
        </div>

        {/* Selection area */}
        <div>
          {/* Step 1: Site type */}
          {step === 0 && !siteType && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
                What kind of site?
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => selectSiteType('template')}
                  className="rounded-2xl bg-white border border-[#E8E4DF] hover:border-[#5C3D2E] p-5 text-left transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                >
                  <Rocket className="w-6 h-6 text-[#1A1A1A] mb-2" />
                  <h3 className="text-lg font-extrabold mb-1">Template Site</h3>
                  <p className="text-[#5A5A5A] text-sm">From $850 · Live in 24–48h</p>
                </button>
                <button
                  type="button"
                  onClick={() => selectSiteType('custom')}
                  className="rounded-2xl bg-white border border-[#E8E4DF] hover:border-[#5C3D2E] p-5 text-left transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                >
                  <Palette className="w-6 h-6 text-[#1A1A1A] mb-2" />
                  <h3 className="text-lg font-extrabold mb-1">Custom Build</h3>
                  <p className="text-[#5A5A5A] text-sm">From $599 · Tailored to you</p>
                </button>
              </div>
            </div>
          )}

          {/* Step 1 (template): pick a template, then choose a hosting plan */}
          {step === 0 && siteType === 'template' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-center mb-3">
                  Pick a template
                </h2>
                {/* Mobile: tight horizontal carousel. Desktop: compact grid. */}
                <div className="flex gap-3 overflow-x-auto pb-3 px-1 snap-x snap-mandatory [scrollbar-width:thin] sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 sm:overflow-visible sm:pb-0 sm:px-0">
                  {TEMPLATES.map((t) => (
                    <div
                      key={t.id}
                      className="snap-center shrink-0 w-[62vw] max-w-[240px] sm:w-auto sm:max-w-none sm:shrink"
                    >
                      <TemplateCard
                        template={t}
                        selectable
                        compact
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
                <p className="text-center text-[#8A8A8A] text-xs mt-1 sm:hidden">
                  Swipe for more →
                </p>
              </div>

              {/* Dedicated hosting plan selection */}
              {renderHostingPicker()}
            </div>
          )}

          {/* Step 1 (custom): pick a build option.
              Landing pages (Starter / Premium) continue to hosting → Stripe.
              Multi-page sites branch off to a tailored quote request. */}
          {step === 0 && siteType === 'custom' && (
            <div className="space-y-6">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
                  What custom build?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {CUSTOM_SITE_OPTIONS.map((option) => {
                    const isSelected = selectedCustomOption === option.id
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          setSelectedCustomOption(option.id)
                          // Hosting only applies to the landing page (deposit) path.
                          if (option.flow !== 'deposit') setSelectedHosting(null)
                        }}
                        aria-pressed={isSelected}
                        className={`rounded-xl border bg-white px-4 py-4 text-left transition-all duration-200 ${
                          isSelected
                            ? 'border-[#5C3D2E] ring-2 ring-[#5C3D2E]'
                            : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-extrabold text-sm">{option.label}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: ACCENT }} />
                          )}
                        </div>
                        <span className="block mt-1 text-[#5A5A5A] text-sm font-semibold">
                          {option.range}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Landing page path: choose hosting, then continue to checkout. */}
              {isCustomDeposit && renderHostingPicker()}

              {/* Multi-page path: scope it out with a tailored quote. */}
              {isCustomQuote && (
                <div className="max-w-2xl mx-auto rounded-xl bg-white border border-[#E8E4DF] p-5 sm:p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <h3 className="text-base sm:text-lg font-bold mb-1">Let&apos;s scope it out</h3>
                  <p className="text-[#5A5A5A] text-sm mb-4">
                    Book a free 15-min consultation for a tailored quote.
                  </p>
                  <button
                    type="button"
                    onClick={() => openQuoteForm()}
                    className="inline-flex items-center justify-center gap-2 font-bold px-6 py-3 rounded-[6px] bg-[#1A1A1A] text-white hover:bg-[#2D2D2D] transition-colors duration-200"
                  >
                    Get a Quote
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Inline Back button only when the sticky action bar is hidden. */}
              {!isCustomDeposit && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setSiteType(null)}
                    className="inline-flex items-center gap-2 border border-[#1A1A1A]/30 text-[#1A1A1A] font-semibold px-5 py-2.5 rounded-[6px] hover:bg-[#1A1A1A]/5 transition-colors duration-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Go Live Date Picker */}
          {step === 1 && (
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-2 justify-center mb-4">
                <CalendarDays className="w-5 h-5 text-[#1A1A1A]" />
                <h2 className="text-xl md:text-2xl font-bold">Pick your go-live date</h2>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {dates.map((d) => {
                  const iso = toISODate(d)
                  const isSelected = goLiveDate === iso
                  return (
                    <button
                      key={iso}
                      type="button"
                      onClick={() => setGoLiveDate(iso)}
                      className={`rounded-lg border px-1 py-2.5 text-center transition-all duration-200 ${
                        isSelected
                          ? 'border-[#5C3D2E] ring-2 ring-[#5C3D2E] bg-white text-[#1A1A1A]'
                          : 'border-[#E8E4DF] bg-white text-[#1A1A1A] hover:border-[#5C3D2E]'
                      }`}
                    >
                      <span className="block text-[10px] uppercase font-semibold">
                        {d.toLocaleDateString('en-AU', { weekday: 'short' })}
                      </span>
                      <span className="block text-base font-bold">{d.getDate()}</span>
                      <span className="block text-[10px]">
                        {d.toLocaleDateString('en-AU', { month: 'short' })}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 3: Payment — template builds and custom landing pages */}
          {step === 2 && hosting && goLiveDate && (template || isCustomDeposit) && (
            <div className="max-w-lg mx-auto">
              <div className="rounded-2xl bg-white border border-[#E8E4DF] p-5 sm:p-6 space-y-4 text-[#1A1A1A] shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#1A1A1A]" />
                  Secure your build
                </h2>
                <ul className="text-sm text-[#5A5A5A] space-y-3">
                  <li className="flex justify-between gap-4">
                    <span>{siteType === 'custom' ? 'Custom build' : 'Template'}</span>
                    <span className="text-[#1A1A1A] font-semibold text-right">
                      {buildName}
                    </span>
                  </li>
                  {siteType !== 'custom' && tier && template?.tiers && template.tiers.length > 1 && (
                    <li className="flex justify-between gap-4">
                      <span>Package</span>
                      <span className="text-[#1A1A1A] font-semibold text-right">{tier.label}</span>
                    </li>
                  )}
                  <li className="flex justify-between gap-4">
                    <span>Website build</span>
                    <span className="text-[#1A1A1A] font-semibold text-right">
                      {buildPriceLabel}
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
              <div className="flex justify-start mt-5">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 border border-[#1A1A1A]/30 text-[#1A1A1A] font-semibold px-5 py-2.5 rounded-[6px] hover:bg-[#1A1A1A]/5 transition-colors duration-200"
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
        <div className="fixed bottom-0 inset-x-0 z-40 border-t border-[#E8E4DF] bg-white/95 backdrop-blur px-4 sm:px-6 pt-3 pb-20 sm:pb-4 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
          <div className="max-w-[1040px] mx-auto flex items-center gap-3 justify-between">
            {actionHelper ? (
              <p className="hidden sm:block text-[#8A8A8A] text-sm">{actionHelper}</p>
            ) : (
              <p className="hidden sm:block text-[#1A1A1A] text-sm font-semibold">
                All set — click Continue
              </p>
            )}
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => (step === 1 ? setStep(0) : setSiteType(null))}
                className="inline-flex items-center justify-center gap-2 border border-[#1A1A1A]/30 text-[#1A1A1A] font-semibold px-5 py-3 rounded-[6px] hover:bg-[#1A1A1A]/5 transition-colors duration-200"
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
