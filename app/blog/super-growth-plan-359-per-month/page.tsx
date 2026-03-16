import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Super Growth Plan — Accelerated SEO for $359/month | Capital Intelligence Group',
  description:
    'The Super Growth Plan expands your content footprint faster with broader keyword coverage and more monthly articles. Ideal for businesses ready to seriously compete.',
  alternates: { canonical: 'https://intelligentaisystem.com/blog/super-growth-plan-359-per-month' },
}

export default function SuperGrowthPlanPage() {
  return (
    <article className="min-h-[100dvh] pb-24 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Back */}
        <div className="pt-10 pb-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-tech-platinum text-sm hover:text-tech-white smooth-transition">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>

        {/* Header */}
        <header className="mb-10">
          <span className="inline-block px-3 py-1 bg-tech-baby-blue/20 border border-tech-baby-blue/50 text-tech-baby-blue rounded-full text-xs font-semibold mb-4">
            Website Growth
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-tech-white leading-tight mb-4 text-balance">
            Super Growth Plan — Accelerated SEO Content Coverage for $359 Per Month
          </h1>
          <div className="flex items-center gap-4 text-sm text-tech-platinum">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> 10 Mar 2026</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 7 min read</span>
          </div>
        </header>

        {/* Plan comparison */}
        <div className="bg-tech-gray border border-tech-baby-blue/30 rounded-2xl p-6 mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-tech-baby-blue mb-4">SEO Growth Plans</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-tech-baby-blue/10 pb-3">
              <span className="text-tech-platinum">Google Growth Plan</span>
              <span className="text-tech-white font-semibold">$199 / month</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-tech-baby-blue/10 pb-3">
              <span className="text-tech-baby-blue font-semibold">Super Growth Plan</span>
              <span className="text-tech-baby-blue font-bold text-base">$359 / month</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-tech-platinum">Market Authority Plan</span>
              <span className="text-tech-white font-semibold">$599 / month</span>
            </div>
          </div>
          <p className="text-xs text-tech-platinum mt-4 border-t border-tech-baby-blue/10 pt-3">Typical SEO agencies charge $1,000 – $3,000+ per month for equivalent work.</p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-tech-platinum leading-relaxed">
          <p>
            When the foundational tier is producing results but you want to accelerate faster, the Super Growth Plan expands your monthly content output and keyword coverage to capture a broader share of search traffic. At $359 per month, you are getting a volume and depth of SEO work that would cost $1,500 to $2,500 per month at a traditional content marketing agency.
          </p>

          <h2 className="text-2xl font-bold text-tech-white mt-10 mb-4">What Makes This Plan Different</h2>
          <p>
            The Super Growth Plan is built for businesses that want to move faster than the baseline. More articles means more keywords, more entry points, and a faster compounding curve. Google rewards websites that publish consistently — and this plan keeps the frequency high enough to signal authority in your niche.
          </p>

          <h2 className="text-2xl font-bold text-tech-white mt-10 mb-4">What Is Included</h2>
          <ul className="space-y-3 mt-4">
            {[
              'Expanded monthly keyword research with competitive gap analysis',
              'Higher volume of SEO-optimised blog articles per month',
              'Deep on-page optimisation across new and existing pages',
              'Internal linking strategy to strengthen site architecture',
              'Technical SEO audits and fixes',
              'Detailed monthly reporting with keyword movement tracking',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-tech-baby-blue flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-tech-white mt-10 mb-4">The Compounding Effect</h2>
          <p>
            Each article we publish is a new door into your website. One article might rank for a handful of keywords. Ten articles compound to cover dozens. Over six to twelve months, businesses on the Super Growth Plan typically see their organic traffic multiply as their content library grows and gains authority.
          </p>
          <p>
            This is the same mechanism that generates results like 1.21M impressions and 11.2K clicks — consistent, structured content output over time.
          </p>

          <h2 className="text-2xl font-bold text-tech-white mt-10 mb-4">Who This Plan Is For</h2>
          <p>
            The Super Growth Plan suits growing businesses, competitive service industries, and any business that wants to outpace competitors in search results within a realistic timeframe. It is the mid-tier of our growth stack — more powerful than the entry plan, less intensive than full market domination.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-tech-gray border border-tech-baby-blue/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-tech-white mb-3">Ready to accelerate your SEO growth?</h3>
          <p className="text-tech-platinum text-sm mb-6">Start the Super Growth Plan for $359/month. No lock-in contracts.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-tech-baby-blue text-tech-black rounded-full font-bold smooth-transition hover:bg-tech-baby-blue-light hover:shadow-glow"
          >
            Get Started
          </Link>
        </div>

      </div>
    </article>
  )
}
