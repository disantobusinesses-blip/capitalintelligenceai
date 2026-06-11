import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Globe, Package, MapPin, Shield, TrendingUp, Zap, ArrowRight, Bot, X } from 'lucide-react'

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
      '1 Monthly content update',
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
      '4 blogs. Everything from Website Hosting +',
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
      '8 blogs. Everything from Google Growth +',
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
      '12 blogs. Everything from Super Growth +',
      'Technical SEO audits',
      'Keyword strategy sessions',
      'Competitor analysis',
      'Priority support',
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
                  <a
                    href="mailto:sales@intelligentaisystem.com?subject=Get%20a%20Free%20Quote&body=Hello%20IAS%2C%20requesting%20a%20quote%20for%20the%20following%3A%20"
                    className={`w-full text-center font-semibold py-3 rounded-[6px] transition-colors duration-200 text-sm block ${
                      plan.highlight
                        ? 'bg-[#1A1A1A] text-white hover:bg-[#2D2D2D]'
                        : 'border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                    }`}
                  >
                    {plan.cta}
                  </a>
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
                    <div>
                      <p className="text-[22px] font-bold text-[#1A1A1A]">
                        {service.price}
                        <span className="text-[10px] font-normal text-[#9E9790] ml-1">+ GST</span>
                        <span className="text-[13px] font-normal text-[#9E9790] ml-1">{service.priceNote}</span>
                      </p>
                    </div>
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

      {/* ── B2B Custom Platform ──────────────────────────────────────────── */}
      <section className="py-16 px-6" style={{ borderTop: '1px solid #E8E4DF' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10">
            <p className="text-[#5C3D2E] text-[13px] font-semibold tracking-[1.5px] uppercase mb-2">
              B2B Solutions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">
              Custom-Built for Your Business
            </h2>
            <p className="text-[#6B6560] text-base max-w-[560px]">
              Enterprise-grade AI systems built exclusively around your industry, niche, and sales process — no generic tools, no shared databases.
            </p>
          </div>

          <div
            className="bg-white rounded-[10px] p-7 md:p-10 transition-shadow duration-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
            style={{ border: '1px solid #E8E4DF' }}
          >
            {/* Top row */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              {/* Left */}
              <div className="md:w-80 flex-shrink-0">
                <div className="flex items-center gap-3 mb-3">
                  <Bot className="w-6 h-6 text-[#5C3D2E]" strokeWidth={1.5} />
                  <span className="text-xs font-semibold text-[#5C3D2E] uppercase tracking-widest">
                    B2B AI Platform
                  </span>
                </div>
                <h3 className="text-[22px] font-bold text-[#1A1A1A] mb-3 leading-snug">
                  B2B Custom CRM AI Acquisition Platform
                </h3>

                {/* Custom Pricing */}
                <div>
                  <p className="text-[22px] font-bold text-[#1A1A1A]">
                    Custom Pricing
                    <span className="text-[10px] font-normal text-[#9E9790] ml-1">+ GST</span>
                    <span className="text-[13px] font-normal text-[#9E9790] ml-1">— discovery call required</span>
                  </p>
                </div>

                {/* Market value anchor */}
                <div className="mt-3 bg-[#F8F7F4] rounded-[6px] px-4 py-3" style={{ border: '1px solid #E8E4DF' }}>
                  <p className="text-[11px] font-semibold text-[#5C3D2E] uppercase tracking-widest mb-1">Market Value</p>
                  <p className="text-[15px] font-bold text-[#1A1A1A]">$5,000 – $35,000</p>
                  <p className="text-[12px] text-[#9E9790] mt-0.5">depending on lead volume and acquisition value</p>
                </div>

                {/* Key terms */}
                <ul className="mt-4 space-y-1.5">
                  <li className="flex items-start gap-2 text-[13px] text-[#6B6560]">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    $2,000 deposit to begin · balance on completion
                  </li>
                  <li className="flex items-start gap-2 text-[13px] text-[#6B6560]">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    10–15 day build timeline
                  </li>
                  <li className="flex items-start gap-2 text-[13px] text-[#6B6560]">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    Guaranteed results or full money back
                  </li>
                  <li className="flex items-start gap-2 text-[13px] text-[#6B6560]">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    Hosted & maintained on a monthly plan
                  </li>
                </ul>

                <Link
                  href="/services/b2b-crm-ai-platform"
                  className="inline-flex items-center gap-1.5 mt-6 text-[13px] font-semibold text-[#5C3D2E] hover:underline underline-offset-2 transition-colors duration-150"
                >
                  See full details
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Right */}
              <div className="flex-1">
                <p className="text-[#6B6560] text-[15px] leading-relaxed mb-6">
                  A fully private, custom-built AI-powered CRM and customer acquisition system designed exclusively for B2B businesses. The platform uses AI to automatically scrape and surface qualified leads from your target market, stores them in a dedicated database, and manages your entire acquisition pipeline — built specifically around your industry, your niche, and your sales process. No generic tools. No shared databases. A system built only for your business.
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-8">
                  {[
                    'AI trained specifically on your industry and target market',
                    'Private lead scraping and storage — your data, your system',
                    'Full CRM pipeline management',
                    'Automated lead tracking and follow-up workflows',
                    'Built exclusively for your business — competitors cannot access the same system',
                    'Ongoing hosting and system management included',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:sales@intelligentaisystem.com?subject=B2B%20CRM%20AI%20Platform%20-%20Discovery%20Call&body=Hello%2C%20I%27d%20like%20to%20book%20a%20discovery%20call%20for%20the%20B2B%20Custom%20CRM%20AI%20Acquisition%20Platform."
                  className="inline-block px-7 py-3 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-sm transition-colors duration-200 hover:bg-[#2D2D2D]"
                >
                  Book a Discovery Call
                </a>
              </div>
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
          <a
            href="mailto:sales@intelligentaisystem.com?subject=Get%20a%20Free%20Quote&body=Hello%20IAS%2C%20requesting%20a%20quote%20for%20the%20following%3A%20"
            className="inline-block px-8 py-4 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-base transition-colors duration-200 hover:bg-[#2D2D2D]"
          >
            Get a Free Quote
          </a>
        </div>
      </section>
    </div>
  )
}
