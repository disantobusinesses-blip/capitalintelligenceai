import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing – Websites from $599 AUD | IAS Intelligent AI Systems',
  description: 'Transparent pricing for professional websites and AI integrations. Landing pages from $599 AUD, full website packages starting at $1,999 AUD. Monthly plans from $119 AUD/month.',
  keywords: 'website pricing Australia, landing page cost, web design price, AI integration cost, monthly website plan, IAS pricing',
  openGraph: {
    title: 'Pricing – Websites from $599 AUD | IAS',
    description: 'Landing pages from $599 AUD. Full website packages from $1,999 AUD. Monthly maintenance from $119 AUD/month.',
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
    priceAUD: 'Starting at $1,999+ AUD',
    priceUSD: 'Starting at $1,299+ USD',
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
    priceAUD: 'Starting at $119 AUD/month+',
    priceUSD: 'Starting at $77 USD/month+',
    description: 'Essential hosting and maintenance to keep your site running smoothly.',
    features: [
      'Website Hosting',
      'Website Maintenance',
      'Security Updates',
      'Monthly Backups',
      'Tech Support',
    ],
  },
  {
    name: 'SEO & AI Visibility',
    priceAUD: 'Starting at $149 AUD/month+',
    priceUSD: 'Starting at $97 USD/month+',
    description: 'Get found on Google and featured in AI-powered search engines.',
    features: [
      'Google Search Optimisation',
      'AI Search Engine Indexing (ChatGPT, Gemini, Perplexity)',
      'Structured Data / Schema Markup',
      'Monthly SEO Reports',
      'Content Strategy Guidance',
    ],
    featured: true,
  },
  {
    name: 'AI Systems Integration',
    priceAUD: 'Custom pricing',
    priceUSD: 'Custom pricing',
    description: 'Automate your business with intelligent AI tools.',
    features: [
      '24/7 AI Chat Support',
      'Automated Email Responder',
      'Phone Call Transcript Generator',
      'Custom AI Workflows',
      'Business Process Automation',
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-[100dvh]">
      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-tech-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-tech-platinum mb-4">
            Professional websites and AI systems for Australian businesses.
          </p>
          <p className="text-2xl font-bold text-tech-baby-blue">
            Websites starting from $599 AUD
          </p>
        </div>
      </section>

      {/* One-time Packages */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-tech-white text-center mb-4">
            One-Time Website Packages
          </h2>
          <p className="text-tech-platinum text-center mb-12">
            Pay once, own your website. No lock-in contracts.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {oneTimePrices.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative bg-tech-gray rounded-2xl p-8 ${
                  pkg.featured
                    ? 'border-2 border-tech-baby-blue shadow-glow'
                    : 'border border-tech-baby-blue/20'
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-tech-baby-blue text-tech-black rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-tech-white mb-2">{pkg.name}</h3>
                <p className="text-tech-platinum mb-4">{pkg.description}</p>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-tech-baby-blue">{pkg.priceAUD}</span>
                </div>
                <p className="text-sm text-tech-platinum mb-6">{pkg.priceUSD}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-tech-baby-blue flex-shrink-0 mt-0.5" />
                      <span className="text-tech-white text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/"
                  className={`block w-full py-3 rounded-lg font-semibold text-center smooth-transition ${
                    pkg.featured
                      ? 'bg-tech-baby-blue text-tech-black hover:bg-tech-baby-blue-light'
                      : 'border-2 border-tech-baby-blue text-tech-baby-blue hover:bg-tech-baby-blue hover:text-tech-black'
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
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-tech-white text-center mb-4">
            Monthly Support Plans
          </h2>
          <p className="text-tech-platinum text-center mb-12">
            Keep your website running and growing every month.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {monthlyPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-tech-gray rounded-2xl p-8 ${
                  plan.featured
                    ? 'border-2 border-tech-baby-blue shadow-glow'
                    : 'border border-tech-baby-blue/20'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-tech-baby-blue text-tech-black rounded-full text-sm font-semibold">
                    Recommended
                  </div>
                )}
                <h3 className="text-xl font-bold text-tech-white mb-2">{plan.name}</h3>
                <p className="text-tech-platinum text-sm mb-4">{plan.description}</p>
                <div className="mb-1">
                  <span className="text-xl font-bold text-tech-baby-blue">{plan.priceAUD}</span>
                </div>
                <p className="text-xs text-tech-platinum mb-6">{plan.priceUSD}</p>
                <ul className="space-y-2 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-tech-baby-blue flex-shrink-0 mt-0.5" />
                      <span className="text-tech-white text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/"
                  className="block w-full py-3 rounded-lg font-semibold text-center border-2 border-tech-baby-blue text-tech-baby-blue hover:bg-tech-baby-blue hover:text-tech-black smooth-transition"
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
          <h2 className="text-3xl font-bold text-tech-white mb-6">Have Questions?</h2>
          <p className="text-tech-platinum mb-8">
            All prices are in Australian Dollars (AUD) unless otherwise stated. USD prices are approximate.
            Get in touch with our team for a custom quote tailored to your business needs.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-tech-baby-blue text-tech-black rounded-lg font-semibold text-lg smooth-transition hover:bg-tech-baby-blue-light"
          >
            Talk to Our Team
          </Link>
        </div>
      </section>
    </div>
  )
}
