'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Zap, TrendingUp, Globe, Shield, ChevronDown, ChevronUp } from 'lucide-react'

const AUD_USD = 0.64

const plans = [
  {
    key: 'landing_page',
    name: 'Landing Page',
    description: 'A premium, high-converting landing page built to capture leads and grow your business.',
    aud: 1499,
    badge: null,
    recurring: false,
    icon: Globe,
    features: [
      'Custom Next.js design',
      'Mobile-first responsive',
      'Lead capture form',
      'SEO-optimised structure',
      'Google Analytics integration',
      'Fast delivery (5–7 days)',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    key: 'website_care',
    name: 'Website Hosting',
    description: 'We handle updates, security, performance, and monitoring so you can focus on your business.',
    aud: 99,
    badge: null,
    recurring: true,
    icon: Shield,
    features: [
      'Monthly content updates',
      'Security monitoring',
      'Performance optimisation',
      'Uptime monitoring',
      'Priority email support',
      'Monthly report',
    ],
    cta: 'Start Plan',
    highlight: false,
  },
  {
    key: 'google_growth',
    name: 'Google Growth',
    description: 'Build long-term search traffic with 4 high-quality, keyword-targeted SEO blog posts every month.',
    aud: 199,
    badge: 'Most Popular',
    recurring: true,
    icon: TrendingUp,
    features: [
      '4 SEO blog posts/month',
      'Keyword research included',
      'Internal linking strategy',
      'Performance tracking',
      'Monthly ranking report',
    ],
    cta: 'Start Growing',
    highlight: true,
  },
  {
    key: 'super_growth',
    name: 'Super Growth',
    description: 'Double the output — 8 SEO blogs per month to dominate Google and drive serious organic traffic.',
    aud: 359,
    badge: 'Best Value',
    recurring: true,
    icon: Zap,
    features: [
      '8 SEO blog posts/month',
      'Keyword research included',
      'Content calendar',
      'Internal linking strategy',
      'Monthly ranking report',
    ],
    cta: 'Supercharge Growth',
    highlight: false,
  },
  {
    key: 'market_authority',
    name: 'Market Authority',
    description: 'Maximum content output, technical SEO, and dedicated strategy to make you the industry leader.',
    aud: 799,
    badge: 'Ultimate',
    recurring: true,
    icon: Zap,
    features: [
      'Free website included',
      '12 SEO blog posts/month',
      'Technical SEO audits',
      'Keyword strategy sessions',
      'Competitor analysis',
      'Google Business optimisation',
      'Dedicated account manager',
    ],
    cta: 'Dominate Your Market',
    highlight: false,
  },
]

const faqs = [
  { q: 'How does Stripe checkout work?', a: "You'll be taken to Stripe's secure hosted checkout. We accept all major credit cards, Apple Pay, and Google Pay." },
  { q: 'Can I cancel my monthly plan anytime?', a: 'Yes — all monthly plans can be cancelled at any time with no lock-in contracts or cancellation fees.' },
  { q: 'Are prices in AUD?', a: 'Yes, all prices are in Australian Dollars (AUD). Use the toggle to see approximate USD pricing.' },
  { q: 'What happens after I purchase a landing page?', a: "We'll email you within 24 hours to kick off your project with a brief onboarding form and discovery call." },
  { q: 'Do you offer custom packages?', a: 'Absolutely. Contact us for enterprise or custom builds — we tailor every solution to your specific goals.' },
]

export default function PricingPage() {
  const [currency, setCurrency] = useState<'AUD' | 'USD'>('AUD')
  const [loading, setLoading] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const fmt = (aud: number) =>
    currency === 'AUD'
      ? `A$${aud.toLocaleString()}`
      : `US$${Math.round(aud * AUD_USD).toLocaleString()}`

  const handleCheckout = async (planKey: string) => {
    setLoading(planKey)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planKey, currency }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else alert('Something went wrong. Please try again.')
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-28 pb-20">
      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 text-center mb-16">
        <p className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-3">Transparent Pricing</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
          What Can We Build For You?
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-8">
          Choose the service that fits your business
        </p>
        <div className="inline-flex rounded-full border border-zinc-700 overflow-hidden">
          {(['AUD', 'USD'] as const).map((cur) => (
            <button
              key={cur}
              onClick={() => setCurrency(cur)}
              className={`px-6 py-2 text-sm font-semibold transition-colors ${
                currency === cur ? 'bg-white text-black' : 'bg-transparent text-zinc-400 hover:text-white'
              }`}
            >
              {cur}
            </button>
          ))}
        </div>
      </div>

      {/* Plan Cards */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {plans.map((plan) => {
          const Icon = plan.icon
          return (
            <div
              key={plan.key}
              className={`relative flex flex-col rounded-2xl p-6 border transition-all ${
                plan.highlight
                  ? 'border-emerald-500/60 bg-emerald-950/30'
                  : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-600'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  {plan.badge}
                </span>
              )}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-base">{plan.name}</h3>
              </div>
              <p className="text-zinc-400 text-sm mb-5 leading-relaxed">{plan.description}</p>
              <div className="mb-5">
                <span className="text-3xl font-bold">{fmt(plan.aud)}</span>
                <span className="text-zinc-500 text-sm ml-1">
                  {plan.recurring ? '/month' : ' one-time'}
                </span>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(plan.key)}
                disabled={loading === plan.key}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  plan.highlight
                    ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                    : 'bg-white text-black hover:bg-zinc-100'
                }`}
              >
                {loading === plan.key ? 'Redirecting...' : plan.cta}
              </button>
            </div>
          )
        })}
      </div>

      {/* Trust Bar */}
      <div className="max-w-4xl mx-auto px-4 mb-20">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: 'Australian Businesses', value: '30+' },
            { label: 'Avg. Ranking Result', value: 'Top 3' },
            { label: 'Client Satisfaction', value: '100%' },
            { label: 'Secure Payments via', value: 'Stripe' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-zinc-500 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-zinc-800 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium hover:bg-zinc-800/50 transition-colors"
              >
                {faq.q}
                {openFaq === i ? (
                  <ChevronUp className="w-4 h-4 text-zinc-500 shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0 ml-2" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-zinc-400 leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-zinc-500 text-sm mt-10">
          Need something custom?{' '}
          <Link href="/contact" className="text-white underline hover:text-emerald-400 transition-colors">
            Contact us
          </Link>
        </p>
      </div>
    </main>
  )
}
