import type { Metadata } from 'next'
import { Check, Globe, Package, Shield, TrendingUp, Zap, X } from 'lucide-react'
import QuotePopupButton from '@/components/QuotePopupButton'

export const metadata: Metadata = {
  title: 'Our Services – Intelligent AI Systems',
  description:
    'Website packages and hosting from Intelligent AI Systems — landing pages, multi-page websites, and fully bespoke cinematic sites, plus secure monthly hosting.',
  keywords:
    'landing page design, custom website, multi-page website, cinematic website, website hosting Australia, AI website builder',
  openGraph: {
    title: 'Our Services – Intelligent AI Systems',
    description:
      'Landing pages, multi-page websites, cinematic sites, and secure hosting — everything a local business needs to launch online.',
    url: 'https://intelligentaisystem.com/services',
    type: 'website',
  },
}

/* ─── Website Packages ──────────────────────────────────────────────────── */
const websitePackages = [
  {
    key: 'landing-starter',
    icon: Globe,
    name: 'Landing Page Starter',
    price: '$599–$999',
    period: 'one-off',
    badge: null,
    description: 'A high-converting single-page website built to turn visitors into leads.',
    features: [
      'Custom single-page design',
      'Mobile responsive layout',
      'Contact form, map & social links',
      'SEO meta setup',
      'Fast loading & SSL',
    ],
    highlight: false,
    cta: 'Get a Quote',
  },
  {
    key: 'landing-premium',
    icon: Zap,
    name: 'Landing Page Premium',
    price: '$1,000–$1,999',
    period: 'one-off',
    badge: 'Most Popular',
    description: 'A premium single-page experience with cinematic motion and an immersive layout.',
    features: [
      'Everything in Starter',
      'Cinematic scroll animations',
      'Premium immersive layout',
      'Google Analytics setup',
      'Booking / consultation button wired',
    ],
    highlight: true,
    cta: 'Get a Quote',
  },
  {
    key: 'multipage',
    icon: Package,
    name: 'Multi-Page Website',
    price: '$1,999–$5,999',
    period: 'one-off',
    badge: null,
    description: 'A complete multi-page website tailored to your brand and built to convert.',
    features: [
      'Custom multi-page design (up to 10 pages)',
      'Mobile responsive & fast loading',
      'Contact forms, map & social links',
      'Analytics dashboard setup',
      'SEO + AI search indexing',
    ],
    highlight: false,
    cta: 'Get a Quote',
  },
  {
    key: 'cinematic',
    icon: TrendingUp,
    name: 'Cinematic Website',
    price: '$3,499–$10,000',
    period: 'one-off',
    badge: null,
    description: 'A flagship, fully bespoke site with full cinematic scroll and immersive media.',
    features: [
      'Everything in Multi-Page',
      'Full cinematic scroll experience',
      'Immersive full-viewport video & image sections',
      'Premium custom animations',
      'Priority build & support',
    ],
    highlight: false,
    cta: 'Get a Quote',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-[100dvh] bg-[#F8F7F4] pb-24 pt-[74px]">

      {/* Hero */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#5C3D2E] text-[13px] font-semibold tracking-[1.5px] uppercase mb-3">
            Everything We Offer
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-6 leading-tight">
            Our Services
          </h1>
          <p className="text-xl text-[#6B6560] max-w-2xl mx-auto">
            From a single high-converting landing page to a fully bespoke cinematic site — plus the hosting to keep it live and secure. Here&apos;s everything we do.
          </p>
        </div>
      </section>

      {/* ── Website Packages ──────────────────────────────────────────────── */}
      <section className="py-16 px-6" style={{ borderTop: '1px solid #E8E4DF' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10">
            <p className="text-[#5C3D2E] text-[13px] font-semibold tracking-[1.5px] uppercase mb-2">
              Website Packages
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">
              Websites That Convert
            </h2>
            <p className="text-[#6B6560] text-base max-w-[560px]">
              From a single high-converting landing page to a fully bespoke cinematic site — choose the build that fits your business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {websitePackages.map((plan) => {
              const Icon = plan.icon
              return (
                <div
                  key={plan.key}
                  className={`relative bg-white rounded-[10px] p-7 flex flex-col transition-shadow duration-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] ${
                    plan.highlight
                      ? 'border-2 border-[#1A1A1A]'
                      : 'border border-[#E8E4DF]'
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white text-[11px] font-bold px-4 py-1 rounded-full whitespace-nowrap">
                      {plan.badge}
                    </span>
                  )}
                  <div className="mb-4">
                    <Icon className="w-7 h-7 text-[#5C3D2E]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[17px] font-bold text-[#1A1A1A] mb-1">{plan.name}</h3>
                  <div className="mb-0.5">
                    <p className="text-[22px] font-bold text-[#5C3D2E]">
                      {plan.price}
                      <span className="text-[10px] font-normal text-[#9E9790] ml-1">+ GST</span>
                      <span className="text-[13px] font-normal text-[#9E9790] ml-1">{plan.period}</span>
                    </p>
                  </div>
                  <p className="text-sm text-[#6B6560] mb-5 leading-relaxed mt-2">{plan.description}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <QuotePopupButton
                    className={`w-full text-center font-semibold py-3 rounded-[6px] transition-colors duration-200 text-sm block ${
                      plan.highlight
                        ? 'bg-[#1A1A1A] text-white hover:bg-[#2D2D2D]'
                        : 'border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                    }`}
                  >
                    {plan.cta}
                  </QuotePopupButton>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Website Hosting ──────────────────────────────────────────────── */}
      <section className="py-16 px-6" style={{ borderTop: '1px solid #E8E4DF' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10">
            <p className="text-[#5C3D2E] text-[13px] font-semibold tracking-[1.5px] uppercase mb-2">
              Website Hosting
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">
              Keep Your Site Live &amp; Secure
            </h2>
            <p className="text-[#6B6560] text-base max-w-[560px]">
              Every website we build runs on a monthly hosting plan. Choose hosting only, or add a monthly update to keep your content fresh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Hosting Only */}
            <div
              className="bg-white rounded-[10px] p-7 flex flex-col"
              style={{ border: '1px solid #E8E4DF' }}
            >
              <div className="mb-4">
                <Shield className="w-7 h-7 text-[#5C3D2E]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-1">Hosting Only</h3>
              <p className="text-[22px] font-bold text-[#5C3D2E] mb-5">
                $59
                <span className="text-[10px] font-normal text-[#9E9790] ml-1">+ GST</span>
                <span className="text-[13px] font-normal text-[#9E9790] ml-1">/month</span>
              </p>
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">Includes</p>
              <ul className="space-y-2 mb-5">
                {['Secure Vercel hosting', 'SSL certificate', 'Uptime monitoring'].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2 mt-auto">Does not include</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#9E9790]">
                  <X className="w-4 h-4 text-[#9E9790] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  Monthly updates
                </li>
              </ul>
            </div>

            {/* Hosting + Updates */}
            <div
              className="bg-white rounded-[10px] p-7 flex flex-col"
              style={{ border: '2px solid #1A1A1A' }}
            >
              <div className="mb-4">
                <Shield className="w-7 h-7 text-[#5C3D2E]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-1">Hosting + Updates</h3>
              <p className="text-[22px] font-bold text-[#5C3D2E] mb-5">
                $99
                <span className="text-[10px] font-normal text-[#9E9790] ml-1">+ GST</span>
                <span className="text-[13px] font-normal text-[#9E9790] ml-1">/month</span>
              </p>
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">Includes</p>
              <ul className="space-y-2">
                {[
                  'Secure Vercel hosting',
                  'SSL certificate',
                  'Uptime monitoring',
                  '1 minor content or design update per month',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Not Sure Where to Start?</h2>
          <p className="text-[#6B6560] mb-8">
            Tell us about your business and we&apos;ll recommend the right combination of services to get you results.
          </p>
          <QuotePopupButton
            className="inline-block px-8 py-4 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-base transition-colors duration-200 hover:bg-[#2D2D2D]"
          >
            Get a Free Quote
          </QuotePopupButton>
        </div>
      </section>
    </div>
  )
}
