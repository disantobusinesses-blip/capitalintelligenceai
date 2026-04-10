import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Globe, Package, MapPin, Shield, TrendingUp, Zap, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Services – Intelligent AI Systems',
  description:
    'Explore all services offered by Intelligent AI Systems — from SEO content packages and Google Business Profile setup to landing pages and full custom websites.',
  keywords:
    'SEO packages Australia, Google Business Profile setup, landing page design, custom website, AI website builder, local SEO',
  openGraph: {
    title: 'Our Services – Intelligent AI Systems',
    description:
      'SEO plans, Google Business Profile setup, landing pages, and custom websites — everything a local business needs to grow online.',
    url: 'https://intelligentaisystem.com/services',
    type: 'website',
  },
}

/* ─── SEO Plans ─────────────────────────────────────────────────────────── */
const seoPlans = [
  {
    key: 'website-hosting',
    icon: Shield,
    name: 'Website Hosting',
    price: 'A$99',
    period: '/month',
    badge: null,
    description: 'Essential hosting and maintenance to keep your site running smoothly and securely.',
    features: [
      'Website hosting',
      'Website maintenance',
      'Security updates',
      'Monthly backups',
      'Up to 1hr tech support/month',
    ],
    highlight: false,
    cta: 'Get Started',
  },
  {
    key: 'google-growth',
    icon: TrendingUp,
    name: 'Google Growth',
    price: 'A$199',
    period: '/month',
    badge: 'Most Popular',
    description: 'Start ranking on Google with consistent monthly content and keyword strategy.',
    features: [
      'Everything in Website Hosting',
      '4 SEO-optimised blog articles/month',
      'Monthly keyword research',
      'On-page optimisation',
      'AI search indexing (ChatGPT, Gemini, Perplexity)',
      'Monthly performance report',
    ],
    highlight: true,
    cta: 'Start Growing',
  },
  {
    key: 'super-growth',
    icon: Zap,
    name: 'Super Growth',
    price: 'A$359',
    period: '/month',
    badge: 'Best Value',
    description: 'Double the content output to accelerate your rankings and drive serious organic traffic.',
    features: [
      'Everything in Google Growth',
      '8 SEO-optimised blog articles/month',
      'Expanded keyword research',
      'Internal linking strategy',
      'Deep on-page optimisation',
      'Detailed monthly reporting',
    ],
    highlight: false,
    cta: 'Supercharge Growth',
  },
  {
    key: 'market-authority',
    icon: Zap,
    name: 'Market Authority',
    price: 'A$799',
    period: '/month',
    badge: 'Ultimate',
    description: 'Maximum content output, technical SEO, and dedicated strategy to make you the industry leader.',
    features: [
      'Free website included',
      '12 SEO-optimised blog articles/month',
      'Technical SEO audits',
      'Keyword strategy sessions',
      'Competitor analysis',
      'Google Business Profile optimisation',
      'Dedicated account manager',
    ],
    highlight: false,
    cta: 'Dominate Your Market',
  },
]

/* ─── One-off Services ───────────────────────────────────────────────────── */
const oneOffServices = [
  {
    href: '/services/google-business-profile',
    icon: MapPin,
    eyebrow: 'Local Visibility',
    name: 'Google Business Profile Setup',
    price: 'A$299',
    priceNote: 'one-time',
    description:
      "We get your Google Business Profile set up and connected to your website, ready to collect reviews from customers. A fully optimised profile is one of the strongest trust signals a local business can have — it's often the first thing a potential lead checks before making a call.",
    features: [
      'Full GBP setup or optimisation',
      'Business category & service configuration',
      'Professionally written business description',
      'Review QR code + SMS & email templates',
      '1 professional cover image supplied',
      'Handover notes for self-management',
    ],
    addon: 'Optional ongoing management — A$79/month',
  },
  {
    href: '/services/landing-page',
    icon: Globe,
    eyebrow: 'Web Design',
    name: 'Landing Page',
    price: 'A$599',
    priceNote: 'one-time',
    description:
      'A high-converting single-page website built to turn visitors into leads. Fast, mobile-ready, and SEO-optimised from day one.',
    features: [
      'Custom single-page design',
      'Mobile responsive layout',
      'Contact form, map & social links included',
      'Google Analytics setup',
      'SEO meta setup',
      'Fast loading & SSL',
    ],
    addon: null,
  },
  {
    href: '/services/full-package',
    icon: Package,
    eyebrow: 'Web Design',
    name: 'Custom Website',
    price: 'Custom quote',
    priceNote: 'upon request',
    description:
      'A complete multi-page website tailored to your brand, with ongoing maintenance and digital strategy built in.',
    features: [
      'Custom multi-page design (up to 10 pages)',
      'Mobile responsive & fast loading',
      'Contact forms, map & social links included',
      'Analytics dashboard setup',
      'SEO + AI search indexing',
      'Ongoing maintenance options available',
    ],
    addon: null,
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-[100dvh] bg-[#F8F7F4] pb-24">

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
            From SEO content plans that get you ranking, to websites that convert and a Google profile that builds instant trust — here&apos;s everything we do.
          </p>
        </div>
      </section>

      {/* ── SEO Packages ────────────────────────────────────────────────── */}
      <section className="py-16 px-6" style={{ borderTop: '1px solid #E8E4DF' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10">
            <p className="text-[#5C3D2E] text-[13px] font-semibold tracking-[1.5px] uppercase mb-2">
              SEO Packages
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">
              Get Found on Google — Every Month
            </h2>
            <p className="text-[#6B6560] text-base max-w-[560px]">
              AI-powered blog content published weekly so Google and AI assistants always have something fresh to recommend.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {seoPlans.map((plan) => {
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
                  <p className="text-[22px] font-bold text-[#5C3D2E] mb-0.5">
                    {plan.price}
                    <span className="text-[13px] font-normal text-[#9E9790] ml-1">{plan.period}</span>
                  </p>
                  <p className="text-sm text-[#6B6560] mb-5 leading-relaxed mt-2">{plan.description}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/"
                    className={`w-full text-center font-semibold py-3 rounded-[6px] transition-colors duration-200 text-sm block ${
                      plan.highlight
                        ? 'bg-[#1A1A1A] text-white hover:bg-[#2D2D2D]'
                        : 'border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── One-off Services ─────────────────────────────────────────────── */}
      <section className="py-16 px-6" style={{ borderTop: '1px solid #E8E4DF' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10">
            <p className="text-[#5C3D2E] text-[13px] font-semibold tracking-[1.5px] uppercase mb-2">
              One-off Services
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">
              Build Your Online Foundation
            </h2>
            <p className="text-[#6B6560] text-base max-w-[560px]">
              Everything you need to establish a credible, lead-generating online presence — done once, done right.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {oneOffServices.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.name}
                  className="bg-white rounded-[10px] p-7 flex flex-col md:flex-row gap-8 transition-shadow duration-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                  style={{ border: '1px solid #E8E4DF' }}
                >
                  {/* Left */}
                  <div className="md:w-72 flex-shrink-0">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-6 h-6 text-[#5C3D2E]" strokeWidth={1.5} />
                      <span className="text-xs font-semibold text-[#5C3D2E] uppercase tracking-widest">
                        {service.eyebrow}
                      </span>
                    </div>
                    <h3 className="text-[20px] font-bold text-[#1A1A1A] mb-2 leading-snug">{service.name}</h3>
                    <p className="text-[22px] font-bold text-[#1A1A1A]">
                      {service.price}
                      <span className="text-[13px] font-normal text-[#9E9790] ml-1">{service.priceNote}</span>
                    </p>
                    {service.addon && (
                      <p className="text-[12px] text-[#9E9790] mt-1">{service.addon}</p>
                    )}
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-1.5 mt-5 text-[13px] font-semibold text-[#5C3D2E] hover:underline underline-offset-2 transition-colors duration-150"
                    >
                      See full details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Right */}
                  <div className="flex-1">
                    <p className="text-[#6B6560] text-[15px] leading-relaxed mb-5">{service.description}</p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
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
          <a
            href="mailto:sales@intelligentaisystem.com?subject=Get%20a%20Free%20Quote&body=Hi%2C%20I%27d%20like%20to%20get%20a%20free%20quote%20for%20your%20services.%20Please%20get%20in%20touch%20with%20me."
            className="inline-block px-8 py-4 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-base transition-colors duration-200 hover:bg-[#2D2D2D]"
          >
            Get a Free Quote
          </a>
        </div>
      </section>
    </div>
  )
}
