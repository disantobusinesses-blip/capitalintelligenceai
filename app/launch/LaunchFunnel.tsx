'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Cormorant_Garamond } from 'next/font/google'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CreditCard,
  Globe,
  Loader2,
  MapPin,
  PenLine,
  TrendingUp,
  Upload,
  X,
} from 'lucide-react'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})

// Brand accent (dark leather brown) — matches the rest of the site.
const ACCENT = '#5C3D2E'

type PathKey = 'website' | 'google' | 'leads' | 'seo'

const PATHS: { key: PathKey; label: string; sub: string; Icon: typeof Globe }[] = [
  { key: 'website', label: 'I want a website', sub: 'Launch a site that converts', Icon: Globe },
  {
    key: 'google',
    label: 'I want a Google Business Profile',
    sub: 'Get found on Google Maps',
    Icon: MapPin,
  },
  { key: 'leads', label: 'I want more leads', sub: 'A pipeline that fills itself', Icon: TrendingUp },
  { key: 'seo', label: 'I want SEO blogs', sub: 'Rank and grow on autopilot', Icon: PenLine },
]

const PATH_ORDER: PathKey[] = ['website', 'google', 'leads', 'seo']
const PATH_LABEL: Record<PathKey, string> = {
  website: 'Website',
  google: 'Google Business Profile',
  leads: 'More Leads',
  seo: 'SEO Blogs',
}

type StepKey =
  | 'website-type'
  | 'website-industry'
  | 'website-goal'
  | 'website-logo'
  | 'website-plan'
  | 'biz-name'
  | 'google-suburb'
  | 'google-existing'
  | 'leads-industry'
  | 'leads-volume'
  | 'leads-challenge'
  | 'seo-topics'
  | 'seo-plan'
  | 'contact'

interface Step {
  key: StepKey
  group: string
}

const WEBSITE_TYPES = ['Landing Page', 'Full Website', 'Custom Build']
const WEBSITE_INDUSTRIES = [
  'Trades',
  'Health & Fitness',
  'Real Estate',
  'Hospitality',
  'Professional Services',
  'Other',
]
const WEBSITE_GOALS = ['Get More Leads', 'Sell Products', 'Build Credibility']

const WEBSITE_PLANS = [
  {
    id: 'landing' as const,
    label: 'Landing Page',
    price: '$599',
    blurb: 'One high-converting page, live fast.',
    customOption: 'landing-starter',
  },
  {
    id: 'full' as const,
    label: 'Full Site',
    price: '$1,999',
    blurb: 'Multi-section site built to scale.',
    customOption: 'landing-premium',
  },
  {
    id: 'custom' as const,
    label: 'Custom',
    price: 'Book a Call',
    blurb: 'Tailored scope, tailored quote.',
    customOption: null,
  },
]

const HOSTING_OPTIONS = [
  { id: 'basic' as const, label: 'Hosting Only', price: '$59/mo' },
  { id: 'updates' as const, label: 'Hosting + Updates', price: '$99/mo' },
]

const LEAD_VOLUMES = ['Under 50', '50–200', '200+']
const GOOGLE_EXISTING = ['Yes', 'No', 'Not Sure']

const SEO_PLANS = [
  { id: 'google-growth', label: 'Google Growth', price: '$199/mo', blurb: '4 blogs / month' },
  { id: 'super-growth', label: 'Super Growth', price: '$359/mo', blurb: '8 blogs / month' },
  { id: 'market-authority', label: 'Market Authority', price: '$799/mo', blurb: '12 blogs / month' },
]

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LaunchFunnel() {
  const [view, setView] = useState<'intro' | 'paths' | 'step' | 'complete'>('intro')
  const [selectedPaths, setSelectedPaths] = useState<PathKey[]>([])
  const [stepIndex, setStepIndex] = useState(0)

  // Website answers
  const [websiteType, setWebsiteType] = useState<string | null>(null)
  const [websiteIndustry, setWebsiteIndustry] = useState<string | null>(null)
  const [websiteGoal, setWebsiteGoal] = useState<string | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [websitePlan, setWebsitePlan] = useState<'landing' | 'full' | 'custom' | null>(null)
  const [websiteHosting, setWebsiteHosting] = useState<'basic' | 'updates' | null>(null)
  const [goLiveDate, setGoLiveDate] = useState<string | null>(null)

  // Shared
  const [businessName, setBusinessName] = useState('')

  // Google
  const [googleSuburb, setGoogleSuburb] = useState('')
  const [googleExisting, setGoogleExisting] = useState<string | null>(null)

  // Leads
  const [leadsIndustry, setLeadsIndustry] = useState('')
  const [leadsVolume, setLeadsVolume] = useState<string | null>(null)
  const [leadsChallenge, setLeadsChallenge] = useState('')

  // SEO
  const [seoTopics, setSeoTopics] = useState('')
  const [seoPlan, setSeoPlan] = useState<string | null>(null)

  // Contact
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const dates = useMemo(getAvailableDates, [])

  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [view, stepIndex])

  // Build the ordered list of question steps based on the selected paths.
  const steps = useMemo<Step[]>(() => {
    const list: Step[] = []
    const hasBiz = () => list.some((s) => s.key === 'biz-name')

    if (selectedPaths.includes('website')) {
      ;(['website-type', 'website-industry', 'website-goal', 'website-logo', 'website-plan'] as StepKey[]).forEach(
        (key) => list.push({ key, group: PATH_LABEL.website })
      )
    }
    if (selectedPaths.includes('google')) {
      if (!hasBiz()) list.push({ key: 'biz-name', group: PATH_LABEL.google })
      list.push({ key: 'google-suburb', group: PATH_LABEL.google })
      list.push({ key: 'google-existing', group: PATH_LABEL.google })
    }
    if (selectedPaths.includes('leads')) {
      ;(['leads-industry', 'leads-volume', 'leads-challenge'] as StepKey[]).forEach((key) =>
        list.push({ key, group: PATH_LABEL.leads })
      )
    }
    if (selectedPaths.includes('seo')) {
      if (!hasBiz()) list.push({ key: 'biz-name', group: PATH_LABEL.seo })
      list.push({ key: 'seo-topics', group: PATH_LABEL.seo })
      list.push({ key: 'seo-plan', group: PATH_LABEL.seo })
    }
    list.push({ key: 'contact', group: 'Your details' })
    return list
  }, [selectedPaths])

  const current = steps[stepIndex]

  // Website Stripe is available for the Landing / Full plans (deposit + hosting).
  const websiteStripeEligible =
    selectedPaths.includes('website') &&
    (websitePlan === 'landing' || websitePlan === 'full') &&
    Boolean(websiteHosting) &&
    Boolean(goLiveDate)

  function togglePath(key: PathKey) {
    setSelectedPaths((prev) =>
      prev.includes(key)
        ? prev.filter((p) => p !== key)
        : PATH_ORDER.filter((p) => p === key || prev.includes(p))
    )
  }

  function canContinue(): boolean {
    if (!current) return false
    switch (current.key) {
      case 'website-type':
        return websiteType !== null
      case 'website-industry':
        return websiteIndustry !== null
      case 'website-goal':
        return websiteGoal !== null
      case 'website-logo':
        return true // optional
      case 'website-plan':
        if (websitePlan === 'custom') return true
        return websitePlan !== null && Boolean(websiteHosting) && Boolean(goLiveDate)
      case 'biz-name':
        return businessName.trim().length > 0
      case 'google-suburb':
        return googleSuburb.trim().length > 0
      case 'google-existing':
        return googleExisting !== null
      case 'leads-industry':
        return leadsIndustry.trim().length > 0
      case 'leads-volume':
        return leadsVolume !== null
      case 'leads-challenge':
        return leadsChallenge.trim().length > 0
      case 'seo-topics':
        return seoTopics.trim().length > 0
      case 'seo-plan':
        return seoPlan !== null
      case 'contact':
        return (
          contactName.trim().length > 0 &&
          EMAIL_RE.test(contactEmail.trim()) &&
          contactPhone.trim().length > 0
        )
      default:
        return false
    }
  }

  function buildEnquiryPayload() {
    return {
      paths: selectedPaths.map((p) => PATH_LABEL[p]),
      website: selectedPaths.includes('website')
        ? {
            type: websiteType ?? undefined,
            industry: websiteIndustry ?? undefined,
            goal: websiteGoal ?? undefined,
            plan: WEBSITE_PLANS.find((p) => p.id === websitePlan)?.label,
            hosting: HOSTING_OPTIONS.find((h) => h.id === websiteHosting)?.label,
            goLiveDate: goLiveDate ?? undefined,
            hasLogo: Boolean(logoFile),
          }
        : null,
      google: selectedPaths.includes('google')
        ? { businessName: businessName.trim(), suburb: googleSuburb.trim(), existing: googleExisting ?? undefined }
        : null,
      leads: selectedPaths.includes('leads')
        ? { industry: leadsIndustry.trim(), volume: leadsVolume ?? undefined, challenge: leadsChallenge.trim() }
        : null,
      seo: selectedPaths.includes('seo')
        ? {
            businessName: businessName.trim(),
            topics: seoTopics.trim(),
            plan: SEO_PLANS.find((p) => p.id === seoPlan)?.label,
          }
        : null,
      contact: { name: contactName.trim(), email: contactEmail.trim(), phone: contactPhone.trim() },
    }
  }

  async function finish() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/launch/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildEnquiryPayload()),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data.message || 'Something went wrong. Please try again.')
      }
      setView('complete')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCheckout() {
    if (!websiteStripeEligible) return
    setLoading(true)
    setError(null)
    try {
      const customOption =
        websitePlan === 'landing' ? 'landing-starter' : 'landing-premium'
      const res = await fetch('/api/launch/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteType: 'custom',
          customOption,
          hostingPlan: websiteHosting,
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

  function handleContinue() {
    if (!canContinue() || loading) return
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1)
    } else {
      finish()
    }
  }

  function handleBack() {
    setError(null)
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1)
    } else {
      setView('paths')
    }
  }

  // Progress fraction across the whole flow.
  const progress =
    view === 'intro'
      ? 0
      : view === 'paths'
        ? 0.08
        : view === 'complete'
          ? 1
          : (stepIndex + 1) / (steps.length + 1)

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && view === 'step') {
      const target = e.target as HTMLElement
      // Allow Enter to advance, but not inside the multiline-free text inputs already handled.
      if (target.tagName !== 'TEXTAREA') {
        e.preventDefault()
        handleContinue()
      }
    }
  }

  return (
    <div
      ref={scrollRef}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[60] overflow-y-auto bg-[#F8F7F4] text-[#1A1A1A]"
    >
      {/* Progress bar */}
      <div className="fixed top-0 inset-x-0 z-[70] h-[3px] bg-[#E8E4DF]">
        <div
          className="h-full bg-[#5C3D2E] transition-[width] duration-500 ease-out"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      {/* Exit to site */}
      <Link
        href="/"
        aria-label="Exit"
        className="fixed top-4 right-4 z-[70] flex items-center gap-1.5 rounded-full border border-[#E8E4DF] bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#5A5A5A] hover:text-[#1A1A1A] hover:border-[#5C3D2E] transition-colors duration-200"
      >
        <X className="w-3.5 h-3.5" />
        Exit
      </Link>

      {/* ---------------- INTRO ---------------- */}
      {view === 'intro' && (
        <section className="relative min-h-full flex items-center justify-center px-5 py-24">
          {/* Higgsfield hero slot — swap src for a generated cinematic image */}
          <img
            id="hf-hero"
            src="/templates/apex-premium.jpeg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 z-0 bg-[#F8F7F4]/90" />
          <div className="relative z-10 max-w-2xl text-center">
            <p className="text-[11px] font-semibold tracking-[2px] uppercase text-[#5C3D2E] mb-4">
              Launch My Site
            </p>
            <h1
              className={`${display.className} text-4xl md:text-6xl font-semibold leading-[1.05] text-balance mb-5`}
            >
              Let&apos;s build something remarkable.
            </h1>
            <p className="text-[#5A5A5A] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Tell us what you need — we&apos;ll handle the rest.
            </p>
            <button
              type="button"
              onClick={() => setView('paths')}
              className="inline-flex items-center justify-center gap-2 rounded-[6px] bg-[#5C3D2E] px-9 py-4 text-base font-bold text-white shadow-[0_8px_24px_rgba(92,61,46,0.25)] transition-all duration-200 hover:bg-[#4a3024] hover:-translate-y-0.5"
            >
              Begin
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* ---------------- PATH SELECTION ---------------- */}
      {view === 'paths' && (
        <section className="min-h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center px-5 py-24">
            <div className="w-full max-w-3xl">
              <h2 className={`${display.className} text-center text-3xl md:text-5xl font-semibold mb-3 text-balance`}>
                What are you looking for?
              </h2>
              <p className="text-center text-[#8A8A8A] text-sm mb-8">
                Choose as many as you like.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {PATHS.map(({ key, label, sub, Icon }) => {
                  const selected = selectedPaths.includes(key)
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => togglePath(key)}
                      aria-pressed={selected}
                      className={`group relative min-h-[96px] rounded-2xl border bg-white p-5 text-left transition-all duration-200 ${
                        selected
                          ? 'border-[#5C3D2E] scale-[1.03] shadow-[0_10px_30px_rgba(92,61,46,0.15)]'
                          : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <Icon className="w-6 h-6 text-[#5C3D2E]" />
                        {selected && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5C3D2E]">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-base font-bold">{label}</h3>
                      <p className="text-[#8A8A8A] text-sm">{sub}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          <FooterNav
            onBack={() => setView('intro')}
            onContinue={() => {
              setStepIndex(0)
              setView('step')
            }}
            canContinue={selectedPaths.length > 0}
            helper={selectedPaths.length === 0 ? 'Select at least one to continue.' : null}
          />
        </section>
      )}

      {/* ---------------- QUESTION STEPS ---------------- */}
      {view === 'step' && current && (
        <section className="min-h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center px-5 py-24">
            <div className="w-full max-w-2xl">
              <p className="text-center text-[11px] font-semibold tracking-[2px] uppercase text-[#5C3D2E] mb-3">
                {current.group}
              </p>

              {/* WEBSITE */}
              {current.key === 'website-type' && (
                <QuestionChoices
                  title="What type of site?"
                  options={WEBSITE_TYPES}
                  value={websiteType}
                  onChange={setWebsiteType}
                />
              )}
              {current.key === 'website-industry' && (
                <QuestionChoices
                  title="What industry are you in?"
                  options={WEBSITE_INDUSTRIES}
                  value={websiteIndustry}
                  onChange={setWebsiteIndustry}
                  columns
                />
              )}
              {current.key === 'website-goal' && (
                <QuestionChoices
                  title="What's your website goal?"
                  options={WEBSITE_GOALS}
                  value={websiteGoal}
                  onChange={setWebsiteGoal}
                />
              )}
              {current.key === 'website-logo' && (
                <div>
                  <h2 className={`${display.className} text-center text-3xl md:text-5xl font-semibold mb-6 text-balance`}>
                    Drop your logo
                  </h2>
                  <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-[#E8E4DF] bg-white p-8 text-center transition-colors duration-200 hover:border-[#5C3D2E]">
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
                    />
                    <Upload className="mx-auto mb-3 h-7 w-7 text-[#5C3D2E]" />
                    {logoFile ? (
                      <span className="font-semibold text-[#1A1A1A]">{logoFile.name}</span>
                    ) : (
                      <span className="text-[#8A8A8A]">
                        Tap to upload (PNG, JPG, SVG). Optional — you can send it later.
                      </span>
                    )}
                  </label>
                </div>
              )}
              {current.key === 'website-plan' && (
                <div>
                  {/* Higgsfield plan banner slot */}
                  <div className="relative mb-6 h-28 overflow-hidden rounded-2xl">
                    <img
                      id="hf-plan"
                      src="/templates/hospitality.png"
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#1A1A1A]/55" />
                    <div className="relative z-10 flex h-full items-center justify-center px-4">
                      <h2 className={`${display.className} text-2xl md:text-4xl font-semibold text-white text-center text-balance`}>
                        Choose your plan
                      </h2>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {WEBSITE_PLANS.map((plan) => {
                      const selected = websitePlan === plan.id
                      return (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => {
                            setWebsitePlan(plan.id)
                            if (plan.id === 'custom') {
                              setWebsiteHosting(null)
                              setGoLiveDate(null)
                            }
                          }}
                          aria-pressed={selected}
                          className={`rounded-2xl border bg-white p-5 text-left transition-all duration-200 ${
                            selected
                              ? 'border-[#5C3D2E] scale-[1.03] shadow-[0_10px_30px_rgba(92,61,46,0.15)]'
                              : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold">{plan.label}</span>
                            {selected && <CheckCircle2 className="h-4 w-4" style={{ color: ACCENT }} />}
                          </div>
                          <span className="mt-1 block text-lg font-bold text-[#5C3D2E]">{plan.price}</span>
                          <span className="mt-1 block text-xs text-[#8A8A8A]">{plan.blurb}</span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Hosting + go-live for the deposit-based plans */}
                  {(websitePlan === 'landing' || websitePlan === 'full') && (
                    <div className="mt-6 space-y-5">
                      <div>
                        <p className="mb-2 text-sm font-semibold">Choose your hosting plan</p>
                        <div className="grid grid-cols-2 gap-3">
                          {HOSTING_OPTIONS.map((h) => {
                            const selected = websiteHosting === h.id
                            return (
                              <button
                                key={h.id}
                                type="button"
                                onClick={() => setWebsiteHosting(h.id)}
                                aria-pressed={selected}
                                className={`rounded-xl border bg-white px-4 py-3 text-left transition-all duration-200 ${
                                  selected
                                    ? 'border-[#5C3D2E] ring-2 ring-[#5C3D2E]'
                                    : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                                }`}
                              >
                                <span className="block text-sm font-bold">{h.label}</span>
                                <span className="block text-sm font-semibold text-[#5A5A5A]">{h.price}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-sm font-semibold">Pick your go-live date</p>
                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                          {dates.map((d) => {
                            const iso = toISODate(d)
                            const selected = goLiveDate === iso
                            return (
                              <button
                                key={iso}
                                type="button"
                                onClick={() => setGoLiveDate(iso)}
                                className={`rounded-lg border bg-white px-1 py-2 text-center transition-all duration-200 ${
                                  selected
                                    ? 'border-[#5C3D2E] ring-2 ring-[#5C3D2E]'
                                    : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                                }`}
                              >
                                <span className="block text-[10px] font-semibold uppercase">
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
                    </div>
                  )}

                  {websitePlan === 'custom' && (
                    <p className="mt-5 text-center text-sm text-[#8A8A8A]">
                      No problem — we&apos;ll book a call to scope your custom build. Just add your
                      details next.
                    </p>
                  )}
                </div>
              )}

              {/* SHARED BUSINESS NAME */}
              {current.key === 'biz-name' && (
                <QuestionText
                  title="What's your business name?"
                  value={businessName}
                  onChange={setBusinessName}
                  placeholder="e.g. Apex Built Co"
                />
              )}

              {/* GOOGLE */}
              {current.key === 'google-suburb' && (
                <QuestionText
                  title="What suburb or area do you operate in?"
                  value={googleSuburb}
                  onChange={setGoogleSuburb}
                  placeholder="e.g. Moonee Ponds, VIC"
                />
              )}
              {current.key === 'google-existing' && (
                <QuestionChoices
                  title="Do you have an existing Google profile?"
                  options={GOOGLE_EXISTING}
                  value={googleExisting}
                  onChange={setGoogleExisting}
                />
              )}

              {/* LEADS */}
              {current.key === 'leads-industry' && (
                <QuestionText
                  title="What industry are you targeting?"
                  value={leadsIndustry}
                  onChange={setLeadsIndustry}
                  placeholder="e.g. Commercial electricians"
                />
              )}
              {current.key === 'leads-volume' && (
                <QuestionChoices
                  title="How many leads do you need per month?"
                  options={LEAD_VOLUMES}
                  value={leadsVolume}
                  onChange={setLeadsVolume}
                />
              )}
              {current.key === 'leads-challenge' && (
                <QuestionText
                  title="What's your biggest growth challenge?"
                  value={leadsChallenge}
                  onChange={setLeadsChallenge}
                  placeholder="Tell us what's holding growth back"
                  multiline
                />
              )}

              {/* SEO */}
              {current.key === 'seo-topics' && (
                <QuestionText
                  title="What topics should we write about?"
                  value={seoTopics}
                  onChange={setSeoTopics}
                  placeholder="e.g. Solar maintenance, energy savings, tips"
                  multiline
                />
              )}
              {current.key === 'seo-plan' && (
                <div>
                  <h2 className={`${display.className} text-center text-3xl md:text-5xl font-semibold mb-6 text-balance`}>
                    Which plan suits you?
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {SEO_PLANS.map((plan) => {
                      const selected = seoPlan === plan.id
                      return (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setSeoPlan(plan.id)}
                          aria-pressed={selected}
                          className={`rounded-2xl border bg-white p-5 text-left transition-all duration-200 ${
                            selected
                              ? 'border-[#5C3D2E] scale-[1.03] shadow-[0_10px_30px_rgba(92,61,46,0.15)]'
                              : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold">{plan.label}</span>
                            {selected && <CheckCircle2 className="h-4 w-4" style={{ color: ACCENT }} />}
                          </div>
                          <span className="mt-1 block text-lg font-bold text-[#5C3D2E]">{plan.price}</span>
                          <span className="mt-1 block text-xs text-[#8A8A8A]">{plan.blurb}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* CONTACT */}
              {current.key === 'contact' && (
                <div>
                  <h2 className={`${display.className} text-center text-3xl md:text-5xl font-semibold mb-6 text-balance`}>
                    How can we reach you?
                  </h2>
                  <div className="mx-auto max-w-md space-y-3">
                    <Field
                      label="Name"
                      value={contactName}
                      onChange={setContactName}
                      placeholder="Your full name"
                      autoFocus
                    />
                    <Field
                      label="Email"
                      type="email"
                      value={contactEmail}
                      onChange={setContactEmail}
                      placeholder="you@business.com"
                    />
                    <Field
                      label="Phone"
                      type="tel"
                      value={contactPhone}
                      onChange={setContactPhone}
                      placeholder="04xx xxx xxx"
                    />
                  </div>
                </div>
              )}

              {error && <p className="mt-5 text-center text-sm text-red-600">{error}</p>}
            </div>
          </div>

          <FooterNav
            onBack={handleBack}
            onContinue={handleContinue}
            canContinue={canContinue()}
            loading={loading}
            continueLabel={stepIndex === steps.length - 1 ? 'Finish' : 'Continue'}
          />
        </section>
      )}

      {/* ---------------- COMPLETE ---------------- */}
      {view === 'complete' && (
        <section className="min-h-full flex items-center justify-center px-5 py-24">
          <div className="w-full max-w-lg">
            {websiteStripeEligible ? (
              <div className="rounded-2xl border border-[#E8E4DF] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <h2 className={`${display.className} text-3xl font-semibold mb-1`}>Your order</h2>
                <p className="mb-5 text-sm text-[#8A8A8A]">Review and secure your build.</p>
                <ul className="space-y-3 text-sm text-[#5A5A5A]">
                  <SummaryRow label="Plan" value={WEBSITE_PLANS.find((p) => p.id === websitePlan)?.label ?? ''} />
                  {websiteType && <SummaryRow label="Site type" value={websiteType} />}
                  {websiteIndustry && <SummaryRow label="Industry" value={websiteIndustry} />}
                  {websiteGoal && <SummaryRow label="Goal" value={websiteGoal} />}
                  <SummaryRow
                    label="Hosting"
                    value={HOSTING_OPTIONS.find((h) => h.id === websiteHosting)?.label ?? ''}
                  />
                  <SummaryRow
                    label="Go live"
                    value={
                      goLiveDate
                        ? new Date(`${goLiveDate}T00:00:00`).toLocaleDateString('en-AU', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                          })
                        : ''
                    }
                  />
                  <li className="flex justify-between gap-4 border-t border-[#E8E4DF] pt-3">
                    <span>Due today (deposit)</span>
                    <span className="font-bold text-[#1A1A1A]">$200</span>
                  </li>
                </ul>
                <p className="mt-4 text-xs leading-relaxed text-[#8A8A8A]">
                  You&apos;ll be charged the $200 deposit plus your first month of hosting in one
                  secure Stripe checkout. The remaining balance is invoiced before go live.
                </p>
                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={loading}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-[#5C3D2E] px-8 py-4 font-bold text-white transition-colors duration-200 hover:bg-[#4a3024] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Redirecting to Stripe…
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" />
                      Complete My Order
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center">
                <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C3D2E]">
                  <Check className="h-8 w-8 text-white" />
                </span>
                <h2 className={`${display.className} text-4xl md:text-5xl font-semibold mb-3 text-balance`}>
                  We&apos;ll be in touch within 1 hour.
                </h2>
                <p className="mx-auto max-w-md text-[#5A5A5A] leading-relaxed">
                  Thanks{contactName ? `, ${contactName.split(' ')[0]}` : ''} — your enquiry is in.
                  Our team will reach out shortly to get you moving.
                </p>
                <Link
                  href="/"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-[6px] border border-[#1A1A1A]/20 px-7 py-3 font-semibold text-[#1A1A1A] transition-colors duration-200 hover:bg-[#1A1A1A]/5"
                >
                  Back to site
                </Link>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}

/* ---------------- Reusable pieces ---------------- */

function FooterNav({
  onBack,
  onContinue,
  canContinue,
  helper,
  loading,
  continueLabel = 'Continue',
}: {
  onBack: () => void
  onContinue: () => void
  canContinue: boolean
  helper?: string | null
  loading?: boolean
  continueLabel?: string
}) {
  return (
    <div className="sticky bottom-0 z-20 border-t border-[#E8E4DF] bg-[#F8F7F4]/95 px-5 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8A8A8A] transition-colors duration-200 hover:text-[#1A1A1A]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="flex items-center gap-3">
          {helper && <span className="hidden text-sm text-[#8A8A8A] sm:inline">{helper}</span>}
          <button
            type="button"
            onClick={onContinue}
            disabled={!canContinue || loading}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[6px] bg-[#5C3D2E] px-8 py-3 font-bold text-white transition-all duration-200 hover:bg-[#4a3024] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                {continueLabel}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

const headingClass =
  'text-center text-3xl md:text-5xl font-semibold mb-6 text-balance'

function QuestionChoices({
  title,
  options,
  value,
  onChange,
  columns,
}: {
  title: string
  options: string[]
  value: string | null
  onChange: (v: string) => void
  columns?: boolean
}) {
  return (
    <div>
      <h2 className={`${display.className} ${headingClass}`}>{title}</h2>
      <div className={columns ? 'grid gap-3 sm:grid-cols-2' : 'mx-auto flex max-w-md flex-col gap-3'}>
        {options.map((opt) => {
          const selected = value === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={selected}
              className={`flex min-h-[56px] items-center justify-between rounded-xl border bg-white px-5 py-3.5 text-left font-semibold transition-all duration-200 ${
                selected
                  ? 'border-[#5C3D2E] scale-[1.02] shadow-[0_8px_24px_rgba(92,61,46,0.14)]'
                  : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
              }`}
            >
              {opt}
              {selected && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5C3D2E]">
                  <Check className="h-3 w-3 text-white" />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function QuestionText({
  title,
  value,
  onChange,
  placeholder,
  multiline,
}: {
  title: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  multiline?: boolean
}) {
  return (
    <div>
      <h2 className={`${display.className} ${headingClass}`}>{title}</h2>
      <div className="mx-auto max-w-md">
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={4}
            autoFocus
            className="w-full resize-none rounded-xl border border-[#E8E4DF] bg-white px-4 py-3 text-base outline-none transition-colors duration-200 focus:border-[#5C3D2E]"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            autoFocus
            className="w-full rounded-xl border border-[#E8E4DF] bg-white px-4 py-4 text-center text-lg outline-none transition-colors duration-200 focus:border-[#5C3D2E]"
          />
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  autoFocus,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  autoFocus?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-[#5A5A5A]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full rounded-xl border border-[#E8E4DF] bg-white px-4 py-3.5 text-base outline-none transition-colors duration-200 focus:border-[#5C3D2E]"
      />
    </label>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex justify-between gap-4">
      <span>{label}</span>
      <span className="text-right font-semibold text-[#1A1A1A]">{value}</span>
    </li>
  )
}
