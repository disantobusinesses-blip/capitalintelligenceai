import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Google Growth Plan — Foundational SEO for $199/month | Capital Intelligence Group',
  description:
    'Our Google Growth Plan delivers consistent SEO content, keyword targeting, and technical optimisation every month for $199 — a fraction of what traditional agencies charge.',
  alternates: { canonical: 'https://intelligentaisystem.com/blog/google-growth-plan-199-per-month' },
}

export default function GoogleGrowthPlanPage() {
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
            Google Growth Plan — Foundational SEO for $199 Per Month
          </h1>
          <div className="flex items-center gap-4 text-sm text-tech-platinum">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> 10 Mar 2026</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 6 min read</span>
          </div>
        </header>

        {/* Pricing comparison banner */}
        <div className="bg-tech-gray border border-tech-baby-blue/30 rounded-2xl p-6 mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-tech-baby-blue mb-4">SEO Pricing Comparison</p>
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
              <span className="text-tech-baby-blue font-semibold">Google Growth Plan</span>
              <span className="text-tech-baby-blue font-bold text-base">$199 / month</span>
            </div>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-tech-platinum leading-relaxed">
          <p>
            Most SEO agencies charge between $1,000 and $3,000 per month before they even write your first piece of content. Our Google Growth Plan delivers consistent, AI-assisted SEO growth for $199 per month — covering everything a business needs to start appearing in more searches and building organic traffic over time.
          </p>

          <h2 className="text-2xl font-bold text-tech-white mt-10 mb-4">What Is the Google Growth Plan?</h2>
          <p>
            The Google Growth Plan is our entry-level monthly SEO service, designed for businesses that are just beginning their organic search journey or that want to maintain a steady flow of new content without a large agency retainer. It covers foundational keyword research, regular blog content, and ongoing technical monitoring to keep your site healthy and growing.
          </p>

          <h2 className="text-2xl font-bold text-tech-white mt-10 mb-4">What Is Included</h2>
          <ul className="space-y-3 mt-4">
            {[
              'Monthly keyword research targeting searches relevant to your business',
              'Regular SEO-optimised blog articles published to your website',
              'On-page optimisation for new and existing content',
              'Technical SEO monitoring and basic fixes',
              'Monthly progress report with traffic and ranking updates',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-tech-baby-blue flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-tech-white mt-10 mb-4">Why AI Makes This Possible at $199</h2>
          <p>
            Traditional agencies have large teams, high overheads, and manual workflows that push their prices well beyond what most small businesses can justify. We use intelligent AI systems to research keywords, draft content, and optimise pages at a fraction of the time it would take a traditional team. That cost saving is passed directly to our clients.
          </p>
          <p>
            The content produced is not generic AI filler. It is researched, reviewed, and aligned with your specific business, location, and target audience before it goes live on your site.
          </p>

          <h2 className="text-2xl font-bold text-tech-white mt-10 mb-4">Who This Plan Is For</h2>
          <p>
            The Google Growth Plan is ideal for small businesses, tradespeople, local service providers, and startups that want to build a visible online presence without committing to a large monthly budget. It is the starting point for long-term organic growth.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-tech-gray border border-tech-baby-blue/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-tech-white mb-3">Ready to start growing your search traffic?</h3>
          <p className="text-tech-platinum text-sm mb-6">Get started with the Google Growth Plan for $199/month. No lock-in contracts.</p>
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
