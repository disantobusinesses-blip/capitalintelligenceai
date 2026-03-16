import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'

export default function ProvenResults() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-tech-white mb-2">Proven Results</p>
          <h2 className="text-3xl md:text-4xl font-bold text-tech-white text-balance mb-4">
            Our websites generate real, measurable results
          </h2>
          <p className="text-tech-platinum text-lg max-w-2xl mx-auto">
            See the actual performance data from our recent client projects
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-tech-black/60 border border-tech-baby-blue/20 rounded-xl p-4 text-center">
            <p className="text-2xl md:text-3xl font-bold text-tech-baby-blue mb-1">1.21M</p>
            <p className="text-tech-platinum text-xs md:text-sm">Google Impressions</p>
          </div>
          <div className="bg-tech-black/60 border border-tech-baby-blue/20 rounded-xl p-4 text-center">
            <p className="text-2xl md:text-3xl font-bold text-tech-baby-blue mb-1">11.2K</p>
            <p className="text-tech-platinum text-xs md:text-sm">Organic Clicks</p>
          </div>
          <div className="bg-tech-black/60 border border-tech-baby-blue/20 rounded-xl p-4 text-center">
            <p className="text-2xl md:text-3xl font-bold text-tech-baby-blue mb-1">100%</p>
            <p className="text-tech-platinum text-xs md:text-sm">Organic Growth</p>
          </div>
          <div className="bg-tech-black/60 border border-tech-baby-blue/20 rounded-xl p-4 text-center">
            <p className="text-2xl md:text-3xl font-bold text-tech-baby-blue mb-1">3 mo</p>
            <p className="text-tech-platinum text-xs md:text-sm">To Visibility</p>
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
