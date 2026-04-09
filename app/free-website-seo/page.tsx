import type { Metadata } from 'next'
import { CheckCircle, ArrowRight } from 'lucide-react'
import SeoLeadForm from './SeoLeadForm'

export const metadata: Metadata = {
  title: 'Free Website Build with SEO Package | Capital Intelligence Group',
  description:
    'Get a professionally built website at no cost when you sign up to our SEO packages. Melbourne AI web agency.',
  openGraph: {
    title: 'Free Website Build with SEO Package | Capital Intelligence Group',
    description:
      'Get a professionally built website at no cost when you sign up to our SEO packages. Melbourne AI web agency.',
    url: 'https://intelligentaisystem.com/free-website-seo',
    type: 'website',
  },
}

const plans = [
  {
    name: 'Google Growth Plan',
    price: '$199/month',
    highlight: false,
    features: [
      'Free professional website build',
      '4 SEO-optimised blogs/month',
      'Monthly keyword research',
      'On-page optimisation',
      'Monthly performance report',
      'AI search indexing (ChatGPT, Gemini)',
    ],
  },
  {
    name: 'Super Growth Plan',
    price: '$359/month',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Free professional website build',
      '8 SEO-optimised blogs/month',
      'Expanded keyword research',
      'Internal linking strategy',
      'Deep on-page optimisation',
      'Priority support',
      'Detailed monthly reporting',
    ],
  },
  {
    name: 'Google Authority Plan',
    price: '$799/month',
    highlight: false,
    features: [
      'Free professional website build',
      '12 SEO-optimised blogs/month',
      'Full topical authority mapping',
      'Advanced technical SEO',
      'Competitor gap analysis',
      'Priority support',
      'Strategy planning sessions',
    ],
  },
]

const steps = [
  {
    num: '01',
    title: 'Choose your SEO plan',
    desc: 'Pick the Google Growth, Super Growth, or Authority plan that fits your goals.',
  },
  {
    num: '02',
    title: 'We build your website free',
    desc: 'Our team designs and builds your professional website at no extra cost.',
  },
  {
    num: '03',
    title: 'Your site goes live within 7 days',
    desc: 'We launch it, set up SEO foundations, and start publishing your content.',
  },
]

const trust = [
  'Melbourne-based agency',
  'Websites live in 7 days',
  'No lock-in contracts',
  'AI-powered SEO content',
]

export default function FreeWebsiteSeoPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-[68px]">

      {/* ── Hero ── */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#2563EB] mb-4">
            Limited Spots Available
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Get a Free Professional Website<br className="hidden md:block" /> With Your SEO Plan
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            We build your website at no cost when you choose a monthly SEO package. Designed,
            launched, and managed for you.
          </p>
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            Claim Your Free Website <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <div className="border-y border-white/10 py-4 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-[#94A3B8]">
          {trust.map(t => (
            <span key={t} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#2563EB] flex-shrink-0" /> {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── How it works ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-[#94A3B8]">Three simple steps to your free website and SEO growth.</p>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {steps.map(s => (
            <div key={s.num} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="text-4xl font-black text-[#2563EB] mb-4">{s.num}</div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Plan cards ── */}
      <section className="py-16 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What&apos;s Included</h2>
          <p className="text-[#94A3B8]">Every plan comes with a free professional website build.</p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-7 flex flex-col ${
                plan.highlight
                  ? 'bg-[#2563EB] border-2 border-[#2563EB]'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-[#2563EB] rounded-full text-xs font-bold whitespace-nowrap">
                  {plan.badge}
                </div>
              )}
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <div className="text-3xl font-black mb-5">{plan.price}</div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        plan.highlight ? 'text-white' : 'text-[#2563EB]'
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#lead-form"
                className={`block w-full py-3 rounded-lg font-semibold text-center text-sm transition-colors ${
                  plan.highlight
                    ? 'bg-white text-[#2563EB] hover:bg-[#EFF6FF]'
                    : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white'
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── Lead capture form ── */}
      <section id="lead-form" className="py-20 px-6">
        <div className="max-w-lg mx-auto">
          <SeoLeadForm />
        </div>
      </section>

    </main>
  )
}
