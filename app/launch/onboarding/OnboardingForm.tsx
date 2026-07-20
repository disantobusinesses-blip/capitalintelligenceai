'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Loader2, Upload } from 'lucide-react'
import { TEMPLATES, HOSTING_PLANS, CUSTOM_SITE_OPTIONS } from '@/lib/templates'

const INDUSTRIES = [
  'Construction',
  'Skincare & Beauty',
  'Fitness',
  'Real Estate',
  'Hospitality',
  'Legal',
  'Trades & Services',
  'Retail',
  'Health & Medical',
  'Other',
]

const inputClass =
  'w-full bg-white border border-[#E8E4DF] rounded-[6px] px-4 py-3 text-[#1A1A1A] placeholder-[#8A8A8A] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200'

function OnboardingContent() {
  const params = useSearchParams()
  const templateId = params.get('template') ?? ''
  const tierId = params.get('tier') ?? ''
  const hostingId = params.get('hosting') ?? ''
  const goLiveDate = params.get('goLiveDate') ?? ''

  const template = TEMPLATES.find((t) => t.id === templateId)
  const customBuild = CUSTOM_SITE_OPTIONS.find((o) => o.id === templateId)
  const hosting = HOSTING_PLANS.find((p) => p.id === hostingId)
  const tier =
    template?.tiers && template.tiers.length > 1
      ? template.tiers.find((t) => t.id === tierId)
      : undefined
  const templateLabel = template
    ? tier
      ? `${template.businessName} (${template.industry}), ${tier.label}`
      : `${template.businessName} (${template.industry})`
    : customBuild
      ? `${customBuild.label} (${customBuild.range})`
      : templateId

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [logoName, setLogoName] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const formData = new FormData(e.currentTarget)
      formData.set('template', templateLabel)
      formData.set('goLiveDate', goLiveDate)
      formData.set(
        'hostingPlan',
        hosting ? `${hosting.label}, ${hosting.price}` : hostingId
      )
      const res = await fetch('/api/launch/onboarding', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data.message || 'Submission failed. Please try again.')
      }
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#F8F7F4] text-[#1A1A1A] flex items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full text-center">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-[#1A1A1A]/10 border border-[#1A1A1A]/20 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-[#1A1A1A]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">You&apos;re all set! 🎉</h1>
          <p className="text-[#5A5A5A] text-lg mb-6 leading-relaxed">
            Your onboarding details have been sent to our team. We&apos;ll start building your
            site right away and be in touch shortly to confirm everything before your go live
            date{goLiveDate ? ` (${goLiveDate})` : ''}.
          </p>
          <p className="text-[#8A8A8A] text-sm mb-10">
            A team member will email you from sales@intelligentaisystem.com within 24 hours.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#1A1A1A] text-white font-bold px-8 py-4 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-[#1A1A1A] pt-[84px] pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[#1A1A1A] text-[13px] font-semibold tracking-[1.5px] uppercase mb-3">
            Step 4, Onboarding
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            Payment received, let&apos;s build your site
          </h1>
          <p className="text-[#5A5A5A]">
            Tell us about your business so we can launch your site on time.
          </p>
        </div>

        {(template || customBuild || hosting || goLiveDate) && (
          <div className="rounded-xl bg-white border border-[#E8E4DF] p-5 mb-8 text-sm text-[#5A5A5A] space-y-1 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            {(template || customBuild) && (
              <p>
                <span className="text-[#8A8A8A]">{customBuild ? 'Build:' : 'Template:'}</span>{' '}
                <span className="font-semibold text-[#1A1A1A]">{templateLabel}</span>
              </p>
            )}
            {hosting && (
              <p>
                <span className="text-[#8A8A8A]">Hosting plan:</span>{' '}
                <span className="font-semibold text-[#1A1A1A]">
                  {hosting.label}, {hosting.price}
                </span>
              </p>
            )}
            {goLiveDate && (
              <p>
                <span className="text-[#8A8A8A]">Go live date:</span>{' '}
                <span className="font-semibold text-[#1A1A1A]">{goLiveDate}</span>
              </p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold mb-1.5">
                Full Name *
              </label>
              <input id="fullName" name="fullName" required className={inputClass} placeholder="Jane Smith" />
            </div>
            <div>
              <label htmlFor="businessName" className="block text-sm font-semibold mb-1.5">
                Business Name *
              </label>
              <input id="businessName" name="businessName" required className={inputClass} placeholder="Your Business Pty Ltd" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-1.5">
                Email *
              </label>
              <input id="email" name="email" type="email" required className={inputClass} placeholder="you@business.com.au" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold mb-1.5">
                Phone *
              </label>
              <input id="phone" name="phone" type="tel" required className={inputClass} placeholder="04xx xxx xxx" />
            </div>
            <div>
              <label htmlFor="abn" className="block text-sm font-semibold mb-1.5">
                ABN
              </label>
              <input id="abn" name="abn" className={inputClass} placeholder="xx xxx xxx xxx" />
            </div>
            <div>
              <label htmlFor="industry" className="block text-sm font-semibold mb-1.5">
                Industry *
              </label>
              <select id="industry" name="industry" required className={inputClass} defaultValue="">
                <option value="" disabled>
                  Select your industry
                </option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="colours" className="block text-sm font-semibold mb-1.5">
              Preferred Colours
            </label>
            <input id="colours" name="colours" className={inputClass} placeholder="e.g. Navy blue, white, gold accents" />
          </div>

          <div>
            <label htmlFor="logo" className="block text-sm font-semibold mb-1.5">
              Logo Upload
            </label>
            <label className="flex items-center gap-3 w-full bg-white border border-dashed border-[#C9C4BD] rounded-[6px] px-4 py-4 cursor-pointer hover:border-[#1A1A1A] transition-colors duration-200">
              <Upload className="w-5 h-5 text-[#8A8A8A]" />
              <span className="text-sm text-[#5A5A5A]">
                {logoName ?? 'Click to upload your logo (PNG, JPG or SVG, max 5MB)'}
              </span>
              <input
                id="logo"
                name="logo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setLogoName(e.target.files?.[0]?.name ?? null)}
              />
            </label>
          </div>

          <div>
            <label htmlFor="tagline" className="block text-sm font-semibold mb-1.5">
              Tagline
            </label>
            <input id="tagline" name="tagline" className={inputClass} placeholder="Your business slogan or tagline" />
          </div>

          <div>
            <label htmlFor="services" className="block text-sm font-semibold mb-1.5">
              List of Services *
            </label>
            <textarea
              id="services"
              name="services"
              required
              rows={4}
              className={inputClass}
              placeholder="List the services you want featured on your website (one per line)"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-semibold mb-1.5">
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              className={inputClass}
              placeholder="Anything else we should know, existing website, social links, opening hours…"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-white font-bold px-8 py-4 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting…
              </>
            ) : (
              'Submit Onboarding Details'
            )}
          </button>
          <p className="text-xs text-[#8A8A8A] text-center">
            Reminder: your $200 deposit becomes non-refundable once this form is submitted.
          </p>
        </form>
      </div>
    </main>
  )
}

export default function OnboardingForm() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F8F7F4] text-[#1A1A1A] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#1A1A1A]" />
        </main>
      }
    >
      <OnboardingContent />
    </Suspense>
  )
}
