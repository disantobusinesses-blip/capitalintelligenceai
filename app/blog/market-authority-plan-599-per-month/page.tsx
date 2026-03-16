import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Market Authority Plan — Maximum SEO Growth for $599/month | Capital Intelligence Group',
  description:
    'For businesses that want to dominate their niche, the Market Authority Plan delivers high-volume content and deep keyword coverage at 80% less than typical SEO agencies.',
  alternates: { canonical: 'https://intelligentaisystem.com/blog/market-authority-plan-599-per-month' },
}

export default function MarketAuthorityPlanPage() {
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
            Market Authority Plan — Maximum SEO Growth for $599 Per Month
          </h1>
          <div className="flex items-center gap-4 text-sm text-tech-platinum">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> 10 Mar 2026</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 8 min read</span>
          </div>
        </header>

        {/* Comparison table */}
        <div className="bg-tech-gray border border-tech-baby-blue/30 rounded-2xl p-6 mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-tech-baby-blue mb-4">What Others Charge vs What We Charge</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-tech-baby-blue/10 pb-3">
              <span className="text-tech-platinum">Typical SEO Agencies</span>
              <span className="text-tech-white font-semibold">$1,000 – $3,000+ / month</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-tech-baby-blue/10 pb-3">
              <span className="text-tech-platinum">Content Marketing Agencies</span>
              <span className="text-tech-white font-semibold">$800 – $2,500+ / month</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-tech-baby-blue font-semibold">Market Authority Plan</span>
              <span className="text-tech-baby-blue font-bold text-base">$599 / month</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-tech-baby-blue/10 bg-tech-baby-blue/5 rounded-lg p-3">
            <p className="text-xs text-tech-white font-semibold">Key Difference</p>
            <p className="text-xs text-tech-platinum mt-1">Most agencies charge $1k–$3k per month. We use AI-assisted SEO systems to deliver consistent content growth at a fraction of the cost.</p>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-tech-platinum leading-relaxed">
          <p>
            The Market Authority Plan is the highest tier of our SEO growth stack. It is designed for businesses that are serious about owning their category in search results — not just appearing occasionally, but consistently ranking across a wide range of relevant keywords and establishing genuine topical authority with Google.
          </p>

          <h2 className="text-2xl font-bold text-tech-white mt-10 mb-4">What Is Market Authority?</h2>
          <p>
            Google does not just rank individual pages — it rewards websites that demonstrate deep, consistent expertise across a subject. A business that publishes high-quality content on dozens of related topics in their industry is seen as an authority. That authority translates directly into higher rankings, more visibility, and more organic traffic without paying for ads.
          </p>
          <p>
            The Market Authority Plan is built to systematically build that authority over time through structured content publishing, strategic keyword targeting, and technical excellence.
          </p>

          <h2 className="text-2xl font-bold text-tech-white mt-10 mb-4">What Is Included</h2>
          <ul className="space-y-3 mt-4">
            {[
              'Maximum monthly content output — high-volume SEO articles published regularly',
              'Comprehensive keyword research covering broad, mid, and long-tail opportunities',
              'Full topical authority mapping across your industry',
              'Advanced on-page and technical SEO optimisation',
              'Internal linking architecture to maximise page authority distribution',
              'Competitor content gap analysis and strategic targeting',
              'Full monthly reporting with traffic, rankings, and ROI visibility',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-tech-baby-blue flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-tech-white mt-10 mb-4">Why This Still Costs 80% Less Than an Agency</h2>
          <p>
            A traditional SEO agency delivering this volume of work would charge $2,500 to $5,000 per month. Our AI-assisted systems handle the research, drafting, and optimisation workflows at a fraction of the manual cost — without sacrificing quality or strategy. Every piece of content is reviewed, refined, and aligned to your business before it goes live.
          </p>
          <p>
            The result is enterprise-level SEO output at a price accessible to growing businesses.
          </p>

          <h2 className="text-2xl font-bold text-tech-white mt-10 mb-4">Who This Plan Is For</h2>
          <p>
            The Market Authority Plan is for businesses that are ready to invest in serious, sustained organic growth. It suits established businesses looking to dominate a competitive local or national market, as well as ambitious startups that want to build long-term search visibility from the ground up.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-tech-gray border border-tech-baby-blue/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-tech-white mb-3">Ready to become the authority in your market?</h3>
          <p className="text-tech-platinum text-sm mb-6">Start the Market Authority Plan for $599/month. No lock-in contracts.</p>
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
