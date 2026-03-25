import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import OpenQuoteModalButton from '@/components/OpenQuoteModalButton'

export const metadata: Metadata = {
  title: 'Pricing – Premium Web & AI Solutions | IAS Intelligent AI Systems',
  description: 'Transparent pricing for premium websites and AI integrations. Flexible packages tailored to your business needs, with monthly support plans available.',
  keywords: 'website pricing Australia, landing page cost, web design price, AI integration cost, monthly website plan, IAS pricing',
  openGraph: {
    title: 'Pricing – Premium Web & AI Solutions | IAS',
    description: 'Flexible packages for premium websites and AI integrations. Tailored to your business needs, with monthly support plans available.',
    url: 'https://intelligentaisystem.com/pricing',
    type: 'website',
  },
}

const oneTimePrices = [
  {
    name: 'Landing Page',
    priceAUD: '$599 – $1,499 AUD',
    priceUSD: '$389 – $974 USD',
    description: 'A professional single-page website to establish your online presence.',
    features: [
      'Custom single-page design',
      'Mobile responsive',
      'SEO optimised',
      'Contact form',
      'Fast loading',
      'SSL certificate',
      'Google Analytics setup',
      '1 month of support',
    ],
  },
  {
    name: 'Website + Full Package',
    priceAUD: 'Custom price upon request',
    priceUSD: 'Custom price upon request',
    description: 'A complete multi-page website with ongoing digital strategy and support.',
    features: [
      'Custom multi-page design (up to 10 pages)',
      'Mobile responsive',
      'Advanced SEO setup',
      'Contact forms & integrations',
      'Analytics dashboard',
      'SSL certificate',
      'Domain setup assistance',
      'Monthly support plan included',
    ],
    featured: true,
  },
]

const monthlyPlans = [
  {
    name: 'Website Care',
    badge: null as string | null,
    badgeStyle: '',
    priceAUD: '$119 AUD/month',
    priceUSD: '$77 USD/month',
    subLabel: 'Includes 1 free SEO blog on signup',
    description: 'Essential hosting and maintenance to keep your site running smoothly.',
    features: [
      'Website hosting',
      'Website maintenance',
      'Security updates',
      'Monthly backups',
      'Up to 1hr tech support/month',
    ],
    featured: false,
    bestValue: false,
  },
  {
    name: 'Google Growth',
    badge: 'Most popular',
    badgeStyle: 'bg-green-500 text-white',
    priceAUD: '$299 AUD/month',
    priceUSD: '$194 USD/month',
    subLabel: '4 blogs/month · Website Care included',
    description: 'Start ranking on Google with consistent monthly content.',
    features: [
      'Everything in Website Care',
      '4 SEO-optimised blog articles/month',
      'Monthly keyword research',
      'On-page optimisation',
      'Monthly performance report',
      'AI search indexing (ChatGPT, Gemini, Perplexity)',
    ],
    featured: false,
    bestValue: true,
  },
  {
    name: 'Super Growth',
    badge: 'Recommended',
    badgeStyle: 'bg-[#1A1A1A] text-white',
    priceAUD: '$359 AUD/month',
    originalPriceAUD: '$499 AUD/month',
    saleLabel: '28% off',
    priceUSD: '$234 USD/month',
    subLabel: '8 blogs/month · Website Care included',
    description: 'Accelerate your rankings with double the content and deeper strategy.',
    features: [
      'Everything in Google Growth',
      '8 SEO-optimised blog articles/month',
      'Expanded keyword research',
      'Internal linking strategy',
      'Deep on-page optimisation',
      'Detailed monthly reporting',
    ],
    featured: true,
    bestValue: false,
  },
  {
    name: 'Market Authority',
    badge: null as string | null,
    badgeStyle: '',
    priceAUD: '$799 AUD/month',
    priceUSD: '$519 USD/month',
    subLabel: '12 blogs/month · Website Care included',
    description: 'Dominate your niche and own the first page of Google.',
    features: [
      'Everything in Super Growth',
      '12 SEO-optimised blog articles/month',
      'Full topical authority mapping',
      'Advanced technical SEO',
      'Competitor gap analysis',
      'Priority support and reporting',
    ],
    featured: false,
    bestValue: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-[100dvh] bg-[#F8F7F4]">
      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-[#6B6560] mb-4">
            Professional websites and AI systems for Australian businesses.
          </p>
          <p className="text-2xl font-bold text-[#1A1A1A] mb-8">
            Websites starting from $599 AUD
          </p>
          <OpenQuoteModalButton className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-lg smooth-transition hover:bg-[#2D2D2D]">
            Get Started →
          </OpenQuoteModalButton>
        </div>
      </section>

      {/* One-time Packages */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1A1A1A] text-center mb-4">
            One-Time Website Packages
          </h2>
          <p className="text-[#6B6560] text-center mb-12">
            Pay once, own your website. No lock-in contracts.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {oneTimePrices.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative bg-white rounded-[10px] p-8 ${
                  pkg.featured
                    ? 'border-2 border-[#1A1A1A] shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
                    : 'border border-[#E8E4DF]'
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#1A1A1A] text-white rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">{pkg.name}</h3>
                <p className="text-[#6B6560] mb-4">{pkg.description}</p>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-[#1A1A1A]">{pkg.priceAUD}</span>
                </div>
                <p className="text-sm text-[#6B6560] mb-6">{pkg.priceUSD}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#1A1A1A] flex-shrink-0 mt-0.5" />
                      <span className="text-[#1A1A1A] text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/"
                  className={`block w-full py-3 rounded-[6px] font-semibold text-center smooth-transition ${
                    pkg.featured
                      ? 'bg-[#1A1A1A] text-white hover:bg-[#2D2D2D]'
                      : 'border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Plans */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1A1A1A] text-center mb-4">
            Monthly Support Plans: Keep Growing Every Month
          </h2>
          <p className="text-[#6B6560] text-center mb-8">
            Keep your website running and growing every month.
          </p>

          {/* Amber callout banner */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-[10px] px-6 py-4 mb-10 flex items-start gap-3 max-w-4xl mx-auto">
            <span className="text-2xl flex-shrink-0">🎁</span>
            <p className="text-black leading-snug">
              <span className="font-semibold">Every website build includes 1 free SEO blog</span>. See real Google results before committing to a plan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {monthlyPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-[10px] p-6 flex flex-col ${
                  plan.featured
                    ? 'border-2 border-[#1A1A1A] shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
                    : 'border border-[#E8E4DF]'
                }`}
              >
                {plan.badge && (
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${plan.badgeStyle}`}>
                    {plan.badge}
                  </div>
                )}
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{plan.name}</h3>
                <p className="text-[#6B6560] text-xs mb-3 leading-snug">{plan.description}</p>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {plan.originalPriceAUD && (
                    <span className="text-xs line-through text-[#9E9790]">{plan.originalPriceAUD}</span>
                  )}
                  <span className="text-xl font-bold text-[#1A1A1A]">{plan.priceAUD}</span>
                  {plan.saleLabel && (
                    <span className="text-xs px-2 py-0.5 bg-[#5C3D2E] text-white rounded-full font-semibold">
                      {plan.saleLabel}
                    </span>
                  )}
                  {plan.bestValue && (
                    <span className="text-xs px-2 py-0.5 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full font-semibold">
                      Best value
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6B6560] mb-1">{plan.priceUSD}</p>
                <p className="text-xs text-[#5C3D2E] font-semibold mb-4">{plan.subLabel}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1A1A1A] flex-shrink-0 mt-0.5" />
                      <span className="text-[#1A1A1A] text-xs">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/"
                  className={`block w-full py-2.5 rounded-[6px] font-semibold text-center text-sm smooth-transition ${
                    plan.featured
                      ? 'bg-[#1A1A1A] text-white hover:bg-[#2D2D2D]'
                      : 'border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Note */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Have Questions?</h2>
          <p className="text-[#6B6560] mb-8">
            All prices are in Australian Dollars (AUD) unless otherwise stated. USD prices are approximate.
            Get in touch with our team for a custom quote tailored to your business needs.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-lg smooth-transition hover:bg-[#2D2D2D]"
          >
            Talk to Our Team
          </Link>
        </div>
      </section>
    </div>
  )
}
