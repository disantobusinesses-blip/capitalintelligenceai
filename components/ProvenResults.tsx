import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ProvenResults() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-tech-white mb-3">
            Why Our Websites Are Proven to Perform
          </h2>
          <p className="text-tech-platinum text-lg">
            Real results from real websites we build
          </p>
        </div>
        
        <Link 
          href="/blog/how-blogs-generate-millions-of-website-visits"
          className="group block bg-tech-gray border border-tech-baby-blue/20 rounded-xl overflow-hidden smooth-transition hover:border-tech-baby-blue hover:shadow-glow-sm"
        >
          <div className="relative aspect-video overflow-hidden">
            <Image
              src="/images/seo-growth-website.jpg"
              alt="SEO performance showing 11.2K clicks and 1.21M impressions with growth chart"
              fill
              className="object-cover smooth-transition group-hover:scale-105"
            />
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-tech-white font-semibold">See How Blogs Generate Millions of Website Visits</p>
              <p className="text-tech-platinum text-sm mt-1">Read the full case study</p>
            </div>
            <ArrowRight className="w-5 h-5 text-tech-baby-blue group-hover:translate-x-1 smooth-transition" />
          </div>
        </Link>
      </div>
    </section>
  )
}
