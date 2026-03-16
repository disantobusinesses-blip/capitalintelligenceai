import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'

export default function ProvenResults() {
  return (
    <section className="py-10 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-tech-baby-blue mb-2">Proven Results</p>
          <h2 className="text-2xl md:text-3xl font-bold text-tech-white text-balance">
            Why our websites are proven to perform
          </h2>
        </div>

        {/* Stat pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-tech-black/60 border border-tech-baby-blue/20 rounded-full px-4 py-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-tech-baby-blue" />
            <span className="text-tech-white text-sm font-semibold">1.21M Impressions</span>
          </div>
          <div className="flex items-center gap-2 bg-tech-black/60 border border-tech-baby-blue/20 rounded-full px-4 py-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-tech-baby-blue" />
            <span className="text-tech-white text-sm font-semibold">11.2K Clicks</span>
          </div>
          <div className="flex items-center gap-2 bg-tech-black/60 border border-tech-baby-blue/20 rounded-full px-4 py-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-tech-baby-blue" />
            <span className="text-tech-white text-sm font-semibold">100% Organic Growth</span>
          </div>
        </div>

        {/* Image card linking to blog */}
        <Link
          href="/blog/how-blogs-generate-millions-of-website-visits"
          className="group block bg-tech-black/60 border border-tech-baby-blue/20 rounded-2xl overflow-hidden smooth-transition hover:border-tech-baby-blue hover:shadow-glow-sm"
        >
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <Image
              src="/images/seo-growth-website.jpg"
              alt="Google Search Console showing 11.2K clicks and 1.21M impressions with upward growth chart"
              fill
              className="object-cover smooth-transition group-hover:scale-[1.02]"
            />
          </div>
          <div className="px-5 py-4 flex items-center justify-between">
            <p className="text-tech-white text-sm font-semibold">
              How blogs generate millions of website visits
            </p>
            <div className="flex items-center gap-1 text-tech-baby-blue text-sm font-semibold flex-shrink-0 ml-4">
              Read more
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 smooth-transition" />
            </div>
          </div>
        </Link>

      </div>
    </section>
  )
}
