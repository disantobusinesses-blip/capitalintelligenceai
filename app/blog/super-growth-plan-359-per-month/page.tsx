import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, CheckCircle } from 'lucide-react'
import QuotePopupButton from '@/components/QuotePopupButton'

export const metadata: Metadata = {
  title: 'Super Growth Plan: Accelerated SEO for $359/month | Capital Intelligence Group',
  description:
    'The Super Growth Plan expands your content footprint faster with broader keyword coverage and more monthly articles. Ideal for businesses ready to seriously compete.',
  alternates: { canonical: 'https://intelligentaisystem.com/blog/super-growth-plan-359-per-month' },
}

export default function SuperGrowthPlanPage() {
  return (
    <article className="min-h-[100dvh] bg-[#F8F7F4] pb-24 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Back */}
        <div className="pt-10 pb-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#6B6560] text-sm hover:text-[#1A1A1A] smooth-transition">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>

        {/* Header */}
        <header className="mb-10">
          <span className="inline-block px-3 py-1 bg-[#F8F7F4] border border-ias-brown-dark text-ias-brown-dark rounded-full text-xs font-semibold mb-4">
            Website Growth
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight mb-4 text-balance">
            Super Growth Plan: Accelerated SEO Content Coverage,{' '}
            <span className="line-through text-ias-brown-muted">$499 AUD</span>{' '}
            <span className="text-ias-brown-dark">On Sale Now: $359/month</span>{' '}
            <span className="inline-block bg-ias-brown-dark text-white text-sm font-semibold px-2 py-0.5 rounded-full align-middle">28% off</span>
          </h1>
          <div className="flex items-center gap-4 text-sm text-[#6B6560]">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> 10 Mar 2026</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 7 min read</span>
          </div>
        </header>

        {/* Plan comparison */}
        <div className="bg-white border border-[#E8E4DF] rounded-[10px] p-6 mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-ias-brown-dark mb-4">SEO Growth Plans</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-[#E8E4DF] pb-3">
              <div>
                <span className="text-[#6B6560]">Google Growth Plan</span>
                <span className="ml-2 text-xs text-ias-brown-muted">4 blogs / month</span>
              </div>
              <span className="text-[#1A1A1A] font-semibold">$199 / month</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-[#E8E4DF] pb-3">
              <div>
                <span className="text-ias-brown-dark font-semibold">Super Growth Plan</span>
                <span className="ml-2 text-xs text-ias-brown-muted">8 blogs / month</span>
              </div>
              <div className="text-right">
                <span className="line-through text-ias-brown-muted text-xs mr-1">$499</span>
                <span className="text-ias-brown-dark font-bold text-base">$359 / month</span>
                <span className="ml-1.5 bg-ias-brown-dark text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">28% off</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div>
                <span className="text-[#6B6560]">Market Authority Plan</span>
                <span className="ml-2 text-xs text-ias-brown-muted">12 blogs / month</span>
              </div>
              <span className="text-[#1A1A1A] font-semibold">$799 / month</span>
            </div>
          </div>
          <p className="text-xs text-[#6B6560] mt-4 border-t border-[#E8E4DF] pt-3">Typical SEO agencies charge $1,000 – $3,000+ per month for equivalent work.</p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-[#6B6560] leading-relaxed">
          <p>
            When the foundational tier is producing results but you want to accelerate faster, the Super Growth Plan expands your monthly content output to 8 SEO-optimised articles and increases keyword coverage to capture a broader share of search traffic. At <span className="line-through">$499</span> <strong className="text-[#1A1A1A]">$359 per month</strong> (on sale now, 28% off), you are getting a volume and depth of SEO work that would cost $1,500 to $2,500 per month at a traditional content marketing agency.
          </p>

          <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4">What Makes This Plan Different</h2>
          <p>
            The Super Growth Plan is built for businesses that want to move faster than the baseline. More articles means more keywords, more entry points, and a faster compounding curve. Google rewards websites that publish consistently, and this plan keeps the frequency high enough to signal authority in your niche.
          </p>

          <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4">What Is Included</h2>
          <ul className="space-y-3 mt-4">
            {[
              '8 SEO-optimised blog articles published every month',
              'Expanded monthly keyword research with competitive gap analysis',
              'Deep on-page optimisation across new and existing pages',
              'Internal linking strategy to strengthen site architecture',
              'Technical SEO audits and fixes',
              'Detailed monthly reporting with keyword movement tracking',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-ias-brown-dark flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4">The Compounding Effect</h2>
          <p>
            Each article we publish is a new door into your website. One article might rank for a handful of keywords. Eight articles per month compounds to cover hundreds of keyword variations. Over six to twelve months, businesses on the Super Growth Plan typically see their organic traffic multiply as their content library grows and gains authority.
          </p>
          <p>
            This is the same mechanism that generates results like 1.21M impressions and 11.2K clicks: consistent, structured content output over time.
          </p>

          <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4">Who This Plan Is For</h2>
          <p>
            The Super Growth Plan suits growing businesses, competitive service industries, and any business that wants to outpace competitors in search results within a realistic timeframe. It is the mid-tier of our growth stack, more powerful than the entry plan, less intensive than full market domination.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-white border border-[#E8E4DF] rounded-[10px] p-8 text-center">
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Ready to accelerate your SEO growth?</h3>
          <p className="text-[#6B6560] text-sm mb-1">
            <span className="line-through text-ias-brown-muted">$499 AUD</span>{' '}
            <strong className="text-[#1A1A1A]">$359/month</strong>, on sale now. No lock-in contracts.
          </p>
          <p className="text-xs text-ias-brown-dark font-semibold mb-6">Save 28%, limited time pricing</p>
          <QuotePopupButton
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#1A1A1A] text-white rounded-full font-bold smooth-transition hover:bg-[#2D2D2D] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
          >
            Get Started
          </QuotePopupButton>
        </div>

      </div>
    </article>
  )
}
