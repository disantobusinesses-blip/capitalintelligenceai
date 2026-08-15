import type { Metadata } from 'next'
import Link from 'next/link'
import { Bot, Check, FileText, Instagram, Shield } from 'lucide-react'
import QuotePopupButton from '@/components/QuotePopupButton'
import FeatureTable, { FeatureRow } from '@/components/FeatureTable'
import SquishyPricing, { type SquishyIcon, type SquishyTone } from '@/components/ui/squishy-pricing'
import FadeRiseText from '@/components/ui/fade-rise-text'
import OngoingServicePanel from '@/components/OngoingServicePanel'

export const metadata: Metadata = {
  title: 'Our Services – Intelligent AI Systems',
  description:
    'Fixed-price website packages and hosting from IAS, Foundation, Growth, and Bespoke builds plus secure monthly hosting for Australian businesses.',
  keywords:
    'fixed price website, custom website Australia, website packages, website hosting Australia, AI website builder',
  alternates: {
    canonical: 'https://intelligentaisystem.com/services',
  },
  openGraph: {
    title: 'Our Services – Intelligent AI Systems',
    description:
      'Foundation, Growth, and Bespoke website packages, fixed prices, custom builds, no templates, plus secure hosting.',
    url: 'https://intelligentaisystem.com/services',
    type: 'website',
  },
}

export const revalidate = 60

/* ─── Website Packages ──────────────────────────────────────────────────── */
// Full comparison table (unchanged) — still the single source of truth. The
// pricing cards below derive their per-tier checklists from this data rather
// than hardcoding a second copy, so the two can never drift out of sync.
const SERVICES_FEATURE_ROWS: FeatureRow[] = [
  { label: 'Pages', values: ['1–3', '5–8', '10+'] },
  { label: 'Mobile responsive', values: [true, true, true] },
  { label: 'SEO foundations', values: [true, true, true] },
  { label: 'Contact form / lead capture', values: [true, true, true] },
  { label: 'Google Analytics tracking', values: [true, true, true] },
  { label: 'Full Website SEO Audit, Quarterly, 4x/year', values: [true, true, true] },
  { label: 'Google Search Console tracking', values: [false, true, true] },
  { label: 'Google Business Profile setup', values: [false, true, true] },
  { label: 'CRO-focused copywriting', values: [false, true, true] },
  { label: 'Custom integrations', values: [false, false, true] },
  { label: 'Dedicated launch support', values: [false, false, true] },
  { label: 'Free SEO blog content', values: ['1 month (4 posts)', '2 months (8 posts)', '3 months (12 posts)'] },
]

// Boolean feature rows only (Pages and Free SEO blog content are surfaced
// elsewhere on each card, not as checklist items).
const BOOLEAN_FEATURE_ROWS = SERVICES_FEATURE_ROWS.filter(
  (r) => r.label !== 'Pages' && r.label !== 'Free SEO blog content'
)

// Each tier is a strict superset of the one before it (verified), so a card
// only needs to list what's NEW at that tier, plus a pointer to what it
// inherits. Foundation = everything it includes. Growth/Bespoke = only the
// rows that flip from false to true at that tier.
const foundationFeatures = BOOLEAN_FEATURE_ROWS.filter((r) => r.values[0] === true).map((r) => r.label)
const growthAddedFeatures = BOOLEAN_FEATURE_ROWS.filter((r) => r.values[1] === true && r.values[0] === false).map((r) => r.label)
const bespokeAddedFeatures = BOOLEAN_FEATURE_ROWS.filter((r) => r.values[2] === true && r.values[1] === false).map((r) => r.label)

const websitePackages = [
  {
    key: 'foundation',
    icon: 'globe' as SquishyIcon,
    name: 'Foundation',
    price: '$1,999',
    period: 'one-off',
    badge: null,
    description: 'A mobile-responsive site built to get a small business found and trusted online.',
    pages: '1–3 pages',
    tone: 'dark' as SquishyTone,
    inheritsFrom: null as string | null,
    features: foundationFeatures,
    bonus: '1 free month of our 4 Blogs/Month plan, $99 value, free',
    cta: 'Get Started',
    highlight: false,
  },
  {
    key: 'growth',
    icon: 'zap' as SquishyIcon,
    name: 'Growth',
    price: '$2,999',
    period: 'one-off',
    badge: 'Most Popular',
    description: 'A conversion-focused build for businesses ready to turn traffic into leads.',
    pages: '5–8 pages',
    tone: 'mid' as SquishyTone,
    inheritsFrom: 'Foundation' as string | null,
    features: growthAddedFeatures,
    bonus: '2 free months of our 4 Blogs/Month plan (8 posts total), $198 value, free',
    cta: 'Get Started',
    highlight: true,
  },
  {
    key: 'bespoke',
    icon: 'package' as SquishyIcon,
    name: 'Bespoke',
    price: '$6,999',
    period: 'one-off',
    badge: null,
    description: 'A fully custom build with integrations and dedicated support through launch.',
    pages: '10+ pages',
    tone: 'light' as SquishyTone,
    inheritsFrom: 'Growth' as string | null,
    features: bespokeAddedFeatures,
    bonus: '3 free months of our 4 Blogs/Month plan (12 posts total), $297 value, free',
    cta: 'Get Started',
    highlight: false,
  },
]

/* ─── SEO Blog Content Add-On ───────────────────────────────────────────── */
const blogTiers = [
  {
    key: 'blog-4',
    name: '4 Blogs / Month',
    price: '$99',
    description: 'A steady drip of SEO content to keep your site fresh and climbing in search.',
    features: ['4 SEO-optimised blog posts/mo', 'Keyword research included', 'Published directly to your site'],
    highlight: false,
  },
  {
    key: 'blog-8',
    name: '8 Blogs / Month',
    price: '$179',
    description: 'Double the content velocity for businesses serious about organic growth.',
    features: ['8 SEO-optimised blog posts/mo', 'Keyword research included', 'Published directly to your site'],
    highlight: true,
  },
  {
    key: 'blog-12',
    name: '12 Blogs / Month',
    price: '$249',
    description: 'Maximum content output for the fastest path to search visibility.',
    features: ['12 SEO-optimised blog posts/mo', 'Keyword research included', 'Published directly to your site'],
    highlight: false,
  },
]

/* ─── Instagram & Social Growth ─────────────────────────────────────────── */
const SOCIAL_INCLUDES = [
  {
    title: 'Content Calendar & Scheduling',
    description: 'A planned month of content, scheduled and published for you so posting never slips.',
  },
  {
    title: 'Reels, Posts & Stories',
    description: 'Short-form video and static content produced in your brand voice, built for reach.',
  },
  {
    title: 'Monthly Growth Reporting',
    description: 'Clear reporting on follower growth, reach, and engagement, so you can see what is working.',
  },
]

/* ─── B2B Lead Generation & AI CRM ──────────────────────────────────────── */
const B2B_INCLUDES = [
  'AI trained on your industry and target market',
  'Private lead scraping engine built for your niche',
  'Dedicated lead database, your data only',
  'Full CRM pipeline management system',
  'Automated lead tracking and follow-up workflows',
  'Curated, ready-to-contact lead lists',
  'Custom onboarding and system walkthrough',
  'Ongoing hosting and system management',
]

export default function ServicesPage() {
  return (
    <main className="min-h-[100dvh] bg-[#F8F7F4] pb-bottom-nav pt-[74px]">

      {/* Hero, kept compact so the pricing cards sit within the first
          viewport (or a single short scroll) on both desktop and mobile. */}
      <section className="pt-8 pb-6 md:pt-10 md:pb-8 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-ias-brown-dark text-[13px] font-semibold tracking-[1.5px] uppercase mb-2">
            Everything We Offer
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-3 leading-tight">
            <FadeRiseText text="Our Services" />
          </h1>
          <p className="text-base md:text-lg text-[#6B6560] max-w-2xl mx-auto">
            Fixed-price website packages and hosting to keep your site live and secure, here&apos;s everything we do.
          </p>
        </div>
      </section>

      {/* ── Website Packages ──────────────────────────────────────────────── */}
      {/* scroll-mt-24 clears the 68px fixed header so anchored jumps from the
          nav dropdown do not land underneath it. */}
      <section id="website-packages" className="pt-4 pb-14 px-6 scroll-mt-24" style={{ borderTop: '1px solid #E8E4DF' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-6">
            <p className="text-ias-brown-dark text-[13px] font-semibold tracking-[1.5px] uppercase mb-2">
              Website Packages
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-3">
              Websites That Convert
            </h2>
            <p className="text-[#6B6560] text-base max-w-[560px] mb-4">
              Three fixed-price packages, choose the build that fits your business.
            </p>
            <p className="text-[#1A1A1A] text-sm font-medium max-w-[640px] bg-[#F3EFE9] border border-[#E8E4DF] rounded-[6px] px-4 py-3">
              Most Australian agencies charge $5,000–$25,000+ for a custom-built website. Our packages start at $1,999, same custom build, no templates, no agency overhead.
            </p>
          </div>

          <SquishyPricing plans={websitePackages} />

          {/* Feature comparison table */}
          <div className="mt-10">
            <FeatureTable rows={SERVICES_FEATURE_ROWS} />
          </div>

          {/* Flat text card, deliberately not styled as a pricing card. Opens
              the Request Quote/Call chooser rather than linking to another
              service page. */}
          <div className="mt-8 text-center">
            <p className="text-[#6B6560] text-sm">
              Need something bigger?{' '}
              <QuotePopupButton
                className="text-[#1A1A1A] font-semibold underline underline-offset-2 hover:text-ias-brown-dark"
              >
                Custom builds &amp; platforms, from $7,000, request a quote
              </QuotePopupButton>
            </p>
          </div>
        </div>
      </section>

      {/* ── Ongoing Services ─────────────────────────────────────────────────
          These four were previously four full-height stacked sections, so a
          visitor scrolled through every hosting, blog, social and B2B price
          before reaching the closing CTA. Grouped into one collapsible list
          they read as a menu instead, and each panel keeps its original anchor
          id so the existing deep links from the navbar and footer still work. */}
      <section className="py-10 px-6 md:py-16" style={{ borderTop: '1px solid #E8E4DF' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-6 md:mb-8">
            <p className="text-ias-brown-dark text-[13px] font-semibold tracking-[1.5px] uppercase mb-2">
              Ongoing Services
            </p>
            <h2 className="text-[26px] md:text-4xl font-bold text-[#1A1A1A] text-balance">
              Keep Growing After Launch
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <OngoingServicePanel
              id="hosting"
              eyebrow="Website Hosting"
              title="Keep Your Site Live & Secure"
              summary="Every website we build runs on a monthly hosting plan. Choose minor maintenance, or a monthly content refresh."
              priceHint="from $59/mo"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Hosting + Minor Maintenance */}
            <div
              className="bg-white rounded-[10px] p-7 flex flex-col"
              style={{ border: '1px solid #E8E4DF' }}
            >
              <div className="mb-4">
                <Shield className="w-7 h-7 text-ias-brown-dark" strokeWidth={1.5} />
              </div>
              <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-1">Hosting + Minor Maintenance</h3>
              <p className="text-[22px] font-bold text-ias-brown-dark mb-5">
                $59
                <span className="text-[10px] font-normal text-ias-brown-muted ml-1">+ GST</span>
                <span className="text-[13px] font-normal text-ias-brown-muted ml-1">/month</span>
              </p>
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">Includes</p>
              <ul className="space-y-2">
                {[
                  'Secure Vercel hosting',
                  'SSL certificate',
                  'Uptime monitoring',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Hosting + Content Refresh */}
            <div
              className="bg-white rounded-[10px] p-7 flex flex-col"
              style={{ border: '2px solid #1A1A1A' }}
            >
              <div className="mb-4">
                <Shield className="w-7 h-7 text-ias-brown-dark" strokeWidth={1.5} />
              </div>
              <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-1">Hosting + Content Refresh</h3>
              <p className="text-[22px] font-bold text-ias-brown-dark mb-5">
                $99
                <span className="text-[10px] font-normal text-ias-brown-muted ml-1">+ GST</span>
                <span className="text-[13px] font-normal text-ias-brown-muted ml-1">/month</span>
              </p>
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">Includes</p>
              <ul className="space-y-2">
                {[
                  'Secure Vercel hosting',
                  'SSL certificate',
                  'Uptime monitoring',
                  '1 monthly content batch, reviews, testimonials, project/portfolio photos, up to 10 items, no rollover',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

              <p className="text-[#6B6560] text-sm mt-6 max-w-[720px]">
                Major changes (new fonts, sitewide colour/style, new pages, new integrations) billed at $99+GST/hour, rounded up to the next full hour.
              </p>
            </OngoingServicePanel>

            <OngoingServicePanel
              id="seo-blog-content"
              eyebrow="SEO Blog Content"
              title="Grow Your Organic Traffic Every Month"
              summary="Ongoing SEO-optimised blog posts published straight to your site, written to build search visibility over time."
              priceHint="3 plans"
            >
              {/* pt-4 clears the -top-3.5 "Most Popular" badge on the middle card,
                  which would otherwise be clipped by the panel's overflow-hidden. */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            {blogTiers.map((tier) => (
              <div
                key={tier.key}
                className={`relative bg-white rounded-[10px] p-7 flex flex-col transition-shadow duration-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] ${
                  tier.highlight ? 'border-2 border-[#1A1A1A]' : 'border border-[#E8E4DF]'
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white text-[11px] font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    Most Popular
                  </span>
                )}
                <div className="mb-4">
                  <FileText className="w-7 h-7 text-ias-brown-dark" strokeWidth={1.5} />
                </div>
                <h3 className="text-[17px] font-bold text-[#1A1A1A] mb-1">{tier.name}</h3>
                <p className="text-[22px] font-bold text-ias-brown-dark mb-0.5">
                  {tier.price}
                  <span className="text-[10px] font-normal text-ias-brown-muted ml-1">+ GST</span>
                  <span className="text-[13px] font-normal text-ias-brown-muted ml-1">/month</span>
                </p>
                <p className="text-sm text-[#6B6560] mb-5 leading-relaxed mt-2">{tier.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <QuotePopupButton
                  className={`w-full text-center font-semibold py-3 rounded-[6px] transition-colors duration-200 text-sm block ${
                    tier.highlight
                      ? 'bg-[#1A1A1A] text-white hover:bg-[#2D2D2D]'
                      : 'border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                  }`}
                >
                  Get a Quote
                </QuotePopupButton>
              </div>
            ))}
              </div>
            </OngoingServicePanel>

            {/* Folded in from the retired standalone "Other Services" page so
                every service lives on this one route. */}
            <OngoingServicePanel
              id="social-growth"
              eyebrow="Instagram & Social Growth"
              title="Social Presence, Managed End to End"
              summary="We manage and grow your social presence using the same systems behind our clients' results."
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOCIAL_INCLUDES.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-[10px] p-7 flex flex-col"
                style={{ border: '1px solid #E8E4DF' }}
              >
                <div className="mb-4">
                  <Instagram className="w-7 h-7 text-ias-brown-dark" strokeWidth={1.5} />
                </div>
                <h3 className="text-[17px] font-bold text-[#1A1A1A] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6B6560] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

              <div className="mt-8">
                <QuotePopupButton
                  className="inline-block px-7 py-3.5 bg-ias-brown-dark text-white rounded-[6px] font-semibold text-sm transition-colors duration-200 hover:bg-ias-brown-mid"
                >
                  Enquire About Social Growth
                </QuotePopupButton>
              </div>
            </OngoingServicePanel>

            {/* Summary of the B2B platform. The full detail page still exists at
                /services/b2b-crm-ai-platform and is linked inside, it is just no
                longer a top-level nav item. */}
            <OngoingServicePanel
              id="b2b"
              eyebrow="B2B Lead Generation"
              title="Custom CRM & AI Acquisition Platform"
              summary="A fully private, AI-powered CRM and lead acquisition system built around your industry and sales process."
              priceHint="Custom"
            >
              <p className="text-[#6B6560] text-base max-w-[640px] mb-6">
                Selling to other businesses? We build a fully private, AI-powered CRM and lead
                acquisition system around your industry and sales process. No generic tools, no
                shared databases.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* What's inside */}
            <div
              className="lg:col-span-2 bg-white rounded-[10px] p-7"
              style={{ border: '1px solid #E8E4DF' }}
            >
              <div className="mb-4">
                <Bot className="w-7 h-7 text-ias-brown-dark" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold text-[#1A1A1A] mb-3">What&apos;s included</p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {B2B_INCLUDES.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing / guarantee */}
            <div
              className="bg-white rounded-[10px] p-7 flex flex-col"
              style={{ border: '1px solid #E8E4DF' }}
            >
              <p className="text-[12px] font-semibold text-ias-brown-muted uppercase tracking-widest mb-1">
                Pricing
              </p>
              <p className="text-[24px] font-extrabold text-[#1A1A1A] leading-none mb-1">
                Custom
                <span className="text-[11px] font-normal text-ias-brown-muted ml-1">+ GST</span>
              </p>
              <p className="text-[13px] text-ias-brown-muted mb-5">
                $2,000 deposit to begin, 10 to 15 day build, balance on completion.
              </p>

              <div className="bg-[#F3EFE9] border border-[#E8E4DF] rounded-[6px] px-4 py-3 mb-5">
                <p className="text-[11px] font-semibold text-ias-brown-dark uppercase tracking-widest mb-0.5">
                  Our Guarantee
                </p>
                <p className="text-sm font-bold text-[#1A1A1A]">Results or full refund</p>
              </div>

              <QuotePopupButton
                service="B2B AI Platform"
                className="w-full text-center px-6 py-3.5 bg-ias-brown-dark text-white rounded-[6px] font-semibold text-sm transition-colors duration-200 hover:bg-ias-brown-mid block"
              >
                Book a Discovery Call
              </QuotePopupButton>

              <Link
                href="/services/b2b-crm-ai-platform"
                className="mt-3 text-center text-sm font-semibold text-ias-brown-dark underline underline-offset-2 hover:text-ias-brown-mid"
              >
                See full platform details
              </Link>
            </div>
              </div>
            </OngoingServicePanel>
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
            className="inline-block px-8 py-4 bg-ias-brown-dark text-white rounded-[6px] font-semibold text-base transition-colors duration-200 hover:bg-ias-brown-mid"
          >
            Request Quote/Call
          </QuotePopupButton>
        </div>
      </section>
    </main>
  )
}
