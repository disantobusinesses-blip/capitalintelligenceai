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
  ExternalLink,
  Globe,
  Loader2,
  MapPin,
  PenLine,
  TrendingUp,
  Upload,
  X,
} from 'lucide-react'
import { TEMPLATES, GST_NOTE } from '@/lib/templates'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})

// Brand accent (dark leather brown) — matches the rest of the site.
const ACCENT = '#5C3D2E'

// Higgsfield cinematic image slots. Drop a generated image URL into the matching
// constant (or set the src on the <img> with the given id) to enable each visual.
// Left empty so the flow keeps its light look until visuals are added.
//   hf-launch-hero -> opening screen background
//   hf-plan        -> wide banner above the template/pricing cards
const HF_LAUNCH_HERO_SRC = ''
const HF_PLAN_SRC = ''
const HF_FALLBACK_GRADIENT = 'linear-gradient(135deg, #0A0A0A 0%, #1A1208 100%)'

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
  | 'website-templates'
  | 'website-industry'
  | 'website-goal'
  | 'website-logo'
  | 'website-date'
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

type WebsiteChoice = 'landing' | 'custom' | 'template'

const WEBSITE_CHOICES: { id: WebsiteChoice; label: string; price: string; blurb: string }[] = [
  {
    id: 'landing',
    label: 'Landing Page',
    price: 'from $599',
    blurb: 'One high-converting page, live fast.',
  },
  {
    id: 'custom',
    label: 'Full Custom Website',
    price: 'Custom quote',
    blurb: 'Bespoke multi-page build, scoped to you.',
  },
  {
    id: 'template',
    label: 'Templates',
    price: 'from $850',
    blurb: 'Pick a proven, ready-to-launch design.',
  },
]

const WEBSITE_INDUSTRIES = [
  'Trades',
  'Health & Fitness',
  'Real Estate',
  'Hospitality',
  'Professional Services',
  'Other',
]
const WEBSITE_GOALS = ['Get More Leads', 'Sell Products', 'Build Credibility']

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
  const [websiteChoice, setWebsiteChoice] = useState<WebsiteChoice | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [selectedTier, setSelectedTier] = useState<'basic' | 'premium' | null>(null)
  const [websiteIndustry, setWebsiteIndustry] = useState<string | null>(null)
  const [websiteGoal, setWebsiteGoal] = useState<string | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
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
      const push = (key: StepKey) => list.push({ key, group: PATH_LABEL.website })
      push('website-type')
      if (websiteChoice === 'template') {
        // The template already implies an industry, so skip the industry question.
        push('website-templates')
        push('website-logo')
        push('website-date')
      } else if (websiteChoice === 'landing') {
        push('website-industry')
        push('website-goal')
        push('website-logo')
        push('website-date')
      } else if (websiteChoice === 'custom') {
        // Full custom builds are quote-only — no instant deposit/date.
        push('website-industry')
        push('website-goal')
        push('website-logo')
      }
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
  }, [selectedPaths, websiteChoice])

  const current = steps[stepIndex]

  // Stripe deposit applies to Landing Page and Template builds. Full custom
  // websites are quote-only. Hosting is billed later, on go-live.
  const websiteStripeEligible =
    selectedPaths.includes('website') &&
    (websiteChoice === 'landing' ||
      (websiteChoice === 'template' && Boolean(selectedTemplate))) &&
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
        return websiteChoice !== null
      case 'website-templates': {
        if (!selectedTemplate) return false
        const tpl = TEMPLATES.find((t) => t.id === selectedTemplate)
        // Templates with multiple tiers (e.g. Basic / Premium) require a choice.
        if (tpl?.tiers && tpl.tiers.length > 1) return selectedTier !== null
        return true
      }
      case 'website-industry':
        return websiteIndustry !== null
      case 'website-goal':
        return websiteGoal !== null
      case 'website-logo':
        return true // optional
      case 'website-date':
        return Boolean(goLiveDate)
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

  function templateLabel(): string | undefined {
    if (!selectedTemplate) return undefined
    const tpl = TEMPLATES.find((t) => t.id === selectedTemplate)
    if (!tpl) return undefined
    const tier =
      tpl.tiers && tpl.tiers.length > 1
        ? tpl.tiers.find((t) => t.id === selectedTier)
        : undefined
    return tier
      ? `${tpl.businessName} (${tpl.industry}) — ${tier.label}`
      : `${tpl.businessName} (${tpl.industry})`
  }

  function buildEnquiryPayload() {
    return {
      paths: selectedPaths.map((p) => PATH_LABEL[p]),
      website: selectedPaths.includes('website')
        ? {
            choice: WEBSITE_CHOICES.find((c) => c.id === websiteChoice)?.label,
            template: templateLabel(),
            industry: websiteIndustry ?? undefined,
            goal: websiteGoal ?? undefined,
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
      const payload =
        websiteChoice === 'template'
          ? {
              siteType: 'template',
              templateId: selectedTemplate,
              tier: selectedTier ?? undefined,
              goLiveDate,
            }
          : {
              siteType: 'custom',
              customOption: 'landing-starter',
              goLiveDate,
            }
      const res = await fetch('/api/launch/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
        aria-label="Exit and return to homepage"
        className="fixed top-4 right-4 z-[70] inline-flex items-center gap-2 rounded-full border border-[#1A1A1A]/15 bg-white px-4 py-2.5 text-sm font-bold text-[#1A1A1A] shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-colors duration-200"
      >
        <X className="w-5 h-5" />
        Exit
      </Link>

      {/* ---------------- INTRO ---------------- */}
      {view === 'intro' && (
        <section className="relative min-h-full flex items-center justify-center overflow-hidden px-5 py-24 bg-[#F8F7F4]">
          {/* Higgsfield launch hero background — full-bleed cinematic image with dark overlay. */}
          {HF_LAUNCH_HERO_SRC && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                id="hf-launch-hero"
                src={HF_LAUNCH_HERO_SRC || '/placeholder.svg'}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 z-0 h-full w-full object-cover"
                style={{ background: HF_FALLBACK_GRADIENT }}
              />
              <div className="absolute inset-0 z-0 bg-black/60" />
            </>
          )}
          <div className="relative z-10 max-w-2xl text-center">
            <p
              className={`text-[11px] font-semibold tracking-[2px] uppercase mb-4 ${
                HF_LAUNCH_HERO_SRC ? 'text-[#D8B894]' : 'text-[#5C3D2E]'
              }`}
            >
              Launch My Site
            </p>
            <h1
              className={`${display.className} text-4xl md:text-6xl font-semibold leading-[1.05] text-balance mb-5 ${
                HF_LAUNCH_HERO_SRC ? 'text-white' : ''
              }`}
            >
              Let&apos;s build something remarkable.
            </h1>
            <p
              className={`text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto ${
                HF_LAUNCH_HERO_SRC ? 'text-white/80' : 'text-[#5A5A5A]'
              }`}
            >
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
                      className={`group relative rounded-2xl border bg-white p-4 md:p-5 text-left transition-all duration-200 ${
                        selected
                          ? 'border-[#5C3D2E] scale-[1.03] shadow-[0_10px_30px_rgba(92,61,46,0.15)]'
                          : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#5C3D2E] flex-shrink-0" />
                          <h3 className="text-[15px] md:text-base font-bold leading-snug">{label}</h3>
                        </div>
                        {selected && (
                          <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#5C3D2E]">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-[13px] md:text-sm text-[#8A8A8A]">{sub}</p>
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
          <div className="flex-1 flex items-center justify-center px-5 pt-24 pb-40">
            <div className="w-full max-w-2xl">
              <p className="text-center text-[11px] font-semibold tracking-[2px] uppercase text-[#5C3D2E] mb-3">
                {current.group}
              </p>

              {/* WEBSITE */}
              {current.key === 'website-type' && (
                <div>
                  <h2 className={`${display.className} text-center text-3xl md:text-5xl font-semibold mb-6 text-balance`}>
                    What kind of website?
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {WEBSITE_CHOICES.map((choice) => {
                      const selected = websiteChoice === choice.id
                      return (
                        <button
                          key={choice.id}
                          type="button"
                          onClick={() => {
                            setWebsiteChoice(choice.id)
                            // Reset downstream answers when switching choice.
                            if (choice.id !== 'template') {
                              setSelectedTemplate(null)
                              setSelectedTier(null)
                            }
                            if (choice.id === 'custom') setGoLiveDate(null)
                          }}
                          aria-pressed={selected}
                          className={`rounded-2xl border bg-white p-4 md:p-5 text-left transition-all duration-200 ${
                            selected
                              ? 'border-[#5C3D2E] scale-[1.03] shadow-[0_10px_30px_rgba(92,61,46,0.15)]'
                              : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[15px] md:text-base font-bold leading-snug">{choice.label}</span>
                            {selected && <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} />}
                          </div>
                          <span className="mt-1 block text-base md:text-lg font-bold text-[#5C3D2E]">{choice.price}</span>
                          <span className="mt-1 block text-sm md:text-xs text-[#8A8A8A]">{choice.blurb}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
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
              {current.key === 'website-templates' && (
                <div>
                  {/* Higgsfield plan banner — cinematic wide strip above the pricing cards. */}
                  {HF_PLAN_SRC && (
                    <div
                      className="relative mb-6 w-full overflow-hidden rounded-2xl"
                      style={{ height: 200, background: HF_FALLBACK_GRADIENT }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        id="hf-plan"
                        src={HF_PLAN_SRC || '/placeholder.svg'}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60" />
                      <div className="relative z-10 flex h-full items-center justify-center px-4">
                        <h2 className={`${display.className} text-3xl md:text-5xl font-semibold text-white text-center text-balance`}>
                          Choose a template
                        </h2>
                      </div>
                    </div>
                  )}
                  {!HF_PLAN_SRC && (
                    <h2 className={`${display.className} text-center text-3xl md:text-5xl font-semibold mb-2 text-balance`}>
                      Choose a template
                    </h2>
                  )}
                  <p className="mb-6 text-center text-sm text-[#8A8A8A]">
                    Tap a design to select it, or preview the live demo. All prices {GST_NOTE}.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {TEMPLATES.map((tpl) => {
                      const selected = selectedTemplate === tpl.id
                      const hasTiers = Boolean(tpl.tiers && tpl.tiers.length > 1)
                      return (
                        <div
                          key={tpl.id}
                          className={`overflow-hidden rounded-2xl border bg-white transition-all duration-200 ${
                            selected
                              ? 'border-[#5C3D2E] shadow-[0_10px_30px_rgba(92,61,46,0.15)]'
                              : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedTemplate(tpl.id)
                              setSelectedTier(hasTiers ? (tpl.tiers![0].id as 'basic' | 'premium') : null)
                            }}
                            aria-pressed={selected}
                            className="block w-full text-left"
                          >
                            <div className="relative aspect-[16/10] overflow-hidden bg-[#EDE9E4]">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={tpl.screenshot || '/placeholder.svg'}
                                alt={`${tpl.businessName} template preview`}
                                className="h-full w-full object-cover object-top"
                              />
                              {selected && (
                                <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#5C3D2E]">
                                  <Check className="h-3.5 w-3.5 text-white" />
                                </span>
                              )}
                            </div>
                            <div className="p-4">
                              <p className="text-[11px] font-semibold uppercase tracking-[1px] text-[#8A8A8A]">
                                {tpl.industry}
                              </p>
                              <p className="font-bold text-[#1A1A1A]">{tpl.businessName}</p>
                              <p className="mt-1 text-sm font-bold text-[#5C3D2E]">
                                {hasTiers
                                  ? `From $${tpl.tiers![0].price} ${GST_NOTE}`
                                  : `$${tpl.price} ${GST_NOTE}`}
                              </p>
                            </div>
                          </button>

                          {/* Tier picker for templates with Basic / Premium options */}
                          {selected && hasTiers && (
                            <div className="grid grid-cols-2 gap-2 px-4 pb-4">
                              {tpl.tiers!.map((t) => {
                                const tierSelected = selectedTier === t.id
                                return (
                                  <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => setSelectedTier(t.id as 'basic' | 'premium')}
                                    aria-pressed={tierSelected}
                                    className={`rounded-xl border px-3 py-2 text-left transition-all duration-200 ${
                                      tierSelected
                                        ? 'border-[#5C3D2E] ring-2 ring-[#5C3D2E]'
                                        : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                                    }`}
                                  >
                                    <span className="block text-xs font-bold">{t.label}</span>
                                    <span className="block text-xs font-semibold text-[#5A5A5A]">
                                      ${t.price} {GST_NOTE}
                                    </span>
                                  </button>
                                )
                              })}
                            </div>
                          )}

                          <a
                            href={
                              selected && hasTiers
                                ? (tpl.tiers!.find((t) => t.id === selectedTier)?.demoUrl ?? tpl.demoUrl)
                                : tpl.demoUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 border-t border-[#E8E4DF] px-4 py-3 text-xs font-semibold text-[#5C3D2E] transition-colors duration-200 hover:bg-[#5C3D2E]/5"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            View live demo
                          </a>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              {current.key === 'website-date' && (
                <div>
                  <h2 className={`${display.className} text-center text-3xl md:text-5xl font-semibold mb-2 text-balance`}>
                    Pick your go-live date
                  </h2>
                  <p className="mb-6 text-center text-sm text-[#8A8A8A]">
                    Hosting is billed separately once your site goes live — nothing extra today.
                  </p>
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
                  <SummaryRow
                    label="Build"
                    value={WEBSITE_CHOICES.find((c) => c.id === websiteChoice)?.label ?? ''}
                  />
                  {templateLabel() && <SummaryRow label="Template" value={templateLabel()!} />}
                  {websiteIndustry && <SummaryRow label="Industry" value={websiteIndustry} />}
                  {websiteGoal && <SummaryRow label="Goal" value={websiteGoal} />}
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
                  You&apos;ll be charged the $200 deposit today in a secure Stripe checkout. The
                  remaining build balance and your hosting plan are invoiced once your site goes
                  live.
                </p>
                {/* Deposit incentive (messaging only — no Stripe coupon applied). */}
                <div className="mt-4 rounded-[6px] bg-[#FFF4E5] border border-[#F0C36D] px-4 py-3 text-sm font-semibold text-[#8A5A00]">
                  Pay your deposit today and receive 10% off your final build invoice.
                </div>
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
