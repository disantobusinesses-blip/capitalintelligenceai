'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, CreditCard, Loader2, Palette, Rocket } from 'lucide-react'
import TemplateCard from '@/components/TemplateCard'
import {
  TEMPLATES,
  HOSTING_PLANS,
  HostingPlan,
  DEPOSIT_AMOUNT,
  CUSTOM_BUDGET_OPTIONS,
  CustomBudget,
} from '@/lib/templates'

const STEPS = ['Choose Your Site', 'Go Live Date', 'Payment']

type SiteType = 'template' | 'custom'

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

export default function LaunchFlow() {
  const [step, setStep] = useState(0)
  const [siteType, setSiteType] = useState<SiteType | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [selectedBudget, setSelectedBudget] = useState<CustomBudget | null>(null)
  const [selectedHosting, setSelectedHosting] = useState<HostingPlan['id'] | null>(null)
  const [goLiveDate, setGoLiveDate] = useState<string | null>(null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const dates = useMemo(getAvailableDates, [])

  const template = TEMPLATES.find((t) => t.id === selectedTemplate)
  const hosting = HOSTING_PLANS.find((p) => p.id === selectedHosting)

  const canProceedStep1 =
    siteType === 'custom'
      ? Boolean(selectedBudget && selectedHosting)
      : Boolean(selectedTemplate && selectedHosting)
  const canProceedStep2 = Boolean(goLiveDate)

  function selectSiteType(type: SiteType) {
    setSiteType(type)
    setSelectedTemplate(null)
    setSelectedBudget(null)
    setSelectedHosting(null)
  }

  async function handleCheckout() {
    if (!siteType || !selectedHosting || !goLiveDate || !termsAccepted) return
    if (siteType === 'template' && !selectedTemplate) return
    if (siteType === 'custom' && !selectedBudget) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/launch/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteType,
          templateId: selectedTemplate,
          budget: selectedBudget,
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

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-[120px] pb-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-emerald-400 text-[13px] font-semibold tracking-[1.5px] uppercase mb-3">
            Launch My Site
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Launch Your Site in 24 Hours
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Pick a professionally designed template, choose your go live date, and pay a $
            {DEPOSIT_AMOUNT} deposit to secure your build.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-12">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2 md:gap-4">
              <div className="flex items-center gap-2">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    i === step
                      ? 'bg-emerald-500 text-white'
                      : i < step
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-white/10 text-zinc-400'
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`hidden sm:inline text-sm font-semibold ${
                    i === step ? 'text-white' : 'text-zinc-500'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && <span className="w-6 md:w-10 h-px bg-white/20" />}
            </div>
          ))}
        </div>

        {/* Step 1: Site type, then template gallery or custom budget */}
        {step === 0 && !siteType && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-center mb-6">
              What kind of site do you need?
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <button
                type="button"
                onClick={() => selectSiteType('template')}
                className="rounded-xl bg-[#141414] border border-white/10 hover:border-emerald-400 p-8 text-left transition-all duration-200"
              >
                <Rocket className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-2xl font-extrabold mb-2">Template Site</h3>
                <p className="text-zinc-400">From $750, live in 24hrs</p>
              </button>
              <button
                type="button"
                onClick={() => selectSiteType('custom')}
                className="rounded-xl bg-[#141414] border border-white/10 hover:border-emerald-400 p-8 text-left transition-all duration-200"
              >
                <Palette className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-2xl font-extrabold mb-2">Custom Site</h3>
                <p className="text-zinc-400">From $1,999, tailored to your business</p>
              </button>
            </div>
          </div>
        )}

        {step === 0 && siteType === 'template' && (
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEMPLATES.map((t) => (
                <TemplateCard
                  key={t.id}
                  template={t}
                  selectable
                  selected={selectedTemplate === t.id}
                  selectedHosting={selectedTemplate === t.id ? selectedHosting : null}
                  onSelect={(id) => {
                    if (selectedTemplate !== id) {
                      setSelectedTemplate(id)
                      setSelectedHosting(null)
                    }
                  }}
                  onSelectHosting={(_, hostingId) => setSelectedHosting(hostingId)}
                />
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-10">
              <button
                onClick={() => setSiteType(null)}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-4 rounded-[6px] hover:bg-white/10 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={() => setStep(1)}
                disabled={!canProceedStep1}
                className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold px-8 py-4 rounded-[6px] hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {!canProceedStep1 && (
              <p className="text-center text-zinc-500 text-sm mt-3">
                Select a template and a hosting plan to continue.
              </p>
            )}
          </div>
        )}

        {step === 0 && siteType === 'custom' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-center mb-6">
              What&apos;s your budget for your custom site?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {CUSTOM_BUDGET_OPTIONS.map((budget) => (
                <button
                  key={budget}
                  type="button"
                  onClick={() => setSelectedBudget(budget)}
                  className={`rounded-xl border px-4 py-6 text-lg font-bold transition-colors duration-200 ${
                    selectedBudget === budget
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-[#141414] border-white/10 text-zinc-300 hover:border-white/40'
                  }`}
                >
                  {budget}
                </button>
              ))}
            </div>
            <h2 className="text-xl font-bold text-center mt-10 mb-4">Choose your hosting plan</h2>
            <div className="grid grid-cols-2 gap-4">
              {HOSTING_PLANS.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedHosting(plan.id)}
                  className={`rounded-xl border px-4 py-5 font-semibold transition-colors duration-200 ${
                    selectedHosting === plan.id
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-[#141414] border-white/10 text-zinc-300 hover:border-white/40'
                  }`}
                >
                  {plan.label} {plan.price}
                </button>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-10">
              <button
                onClick={() => setSiteType(null)}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-4 rounded-[6px] hover:bg-white/10 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={() => setStep(1)}
                disabled={!canProceedStep1}
                className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold px-8 py-4 rounded-[6px] hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {!canProceedStep1 && (
              <p className="text-center text-zinc-500 text-sm mt-3">
                Select a budget range and a hosting plan to continue.
              </p>
            )}
          </div>
        )}

        {/* Step 2: Go Live Date Picker */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 justify-center mb-6">
              <CalendarDays className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold">Choose your preferred go live date</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
              {dates.map((d) => {
                const iso = toISODate(d)
                const isSelected = goLiveDate === iso
                return (
                  <button
                    key={iso}
                    type="button"
                    onClick={() => setGoLiveDate(iso)}
                    className={`rounded-lg border px-2 py-3 text-center transition-colors duration-200 ${
                      isSelected
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-white/15 bg-[#141414] text-zinc-300 hover:border-white/40'
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
            <div className="flex justify-between mt-10">
              <button
                onClick={() => setStep(0)}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-[6px] hover:bg-white/10 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={!canProceedStep2}
                className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold px-8 py-3 rounded-[6px] hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 2 &&
          hosting &&
          goLiveDate &&
          (siteType === 'custom' ? selectedBudget : template) && (
          <div className="max-w-lg mx-auto">
            <div className="rounded-xl bg-[#F8F7F4] border border-black/10 p-6 space-y-4 text-[#1A1A1A]">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                Secure your build
              </h2>
              <ul className="text-sm text-[#4A4540] space-y-2">
                {siteType === 'custom' ? (
                  <>
                    <li className="flex justify-between">
                      <span>Site type</span>
                      <span className="text-[#1A1A1A] font-semibold">Custom Site</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Budget range</span>
                      <span className="text-[#1A1A1A] font-semibold">{selectedBudget}</span>
                    </li>
                  </>
                ) : (
                  template && (
                    <>
                      <li className="flex justify-between">
                        <span>Template</span>
                        <span className="text-[#1A1A1A] font-semibold">
                          {template.businessName} ({template.industry})
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Website build</span>
                        <span className="text-[#1A1A1A] font-semibold">${template.price}</span>
                      </li>
                    </>
                  )
                )}
                <li className="flex justify-between">
                  <span>Hosting plan</span>
                  <span className="text-[#1A1A1A] font-semibold">
                    {hosting.label} — {hosting.price}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Go live date</span>
                  <span className="text-[#1A1A1A] font-semibold">
                    {new Date(`${goLiveDate}T00:00:00`).toLocaleDateString('en-AU', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </li>
                <li className="flex justify-between border-t border-black/10 pt-3">
                  <span>Due today (deposit)</span>
                  <span className="text-emerald-600 font-bold">${DEPOSIT_AMOUNT}</span>
                </li>
              </ul>
              <p className="text-xs text-[#6B6560]">
                You&apos;ll be charged the ${DEPOSIT_AMOUNT} deposit plus your first month of
                hosting in one secure Stripe checkout. The remaining build balance is invoiced
                before go live.
              </p>

              <label className="flex items-start gap-3 text-sm text-[#4A4540] cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-emerald-500"
                />
                <span>
                  I understand that the ${DEPOSIT_AMOUNT} deposit is non-refundable once the
                  website has been delivered and approved. If Capital Intelligence Group fails
                  to deliver, the deposit will be refunded in full.
                </span>
              </label>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                onClick={handleCheckout}
                disabled={!termsAccepted || loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold px-8 py-4 rounded-[6px] hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
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
            <div className="flex justify-start mt-6">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-[6px] hover:bg-white/10 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
