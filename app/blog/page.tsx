import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { blogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog – Intelligent AI Systems | AI, SEO & Business Insights',
  description:
    'Practical insights on AI, SEO, and digital strategy for Australian businesses. Learn how intelligent systems can transform your operations and online visibility.',
  keywords:
    'AI blog Australia, SEO tips, business automation, AI search optimisation, intelligent systems, digital strategy',
  openGraph: {
    title: 'Blog – Intelligent AI Systems | AI, SEO & Business Insights',
    description:
      'Practical insights on AI, SEO, and digital strategy for Australian businesses.',
    url: 'https://intelligentaisystem.com/blog',
    type: 'website',
  },
  alternates: {
    canonical: 'https://intelligentaisystem.com/blog',
  },
}

export default function BlogIndexPage() {
  return (
    <div className="min-h-[100dvh] pb-24">
      {/* Hero */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-tech-baby-blue rounded-full blur-3xl opacity-10" />
        <div className="max-w-4xl mx-auto relative">
          <h1 className="text-5xl md:text-6xl font-bold text-tech-white mb-6">
            Insights & Ideas
          </h1>
          <p className="text-xl text-tech-platinum max-w-2xl mx-auto leading-relaxed">
            Practical guides on AI, SEO, and intelligent systems for businesses
            ready to operate faster and smarter.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-tech-gray border border-tech-baby-blue/20 rounded-2xl overflow-hidden smooth-transition hover:border-tech-baby-blue hover:shadow-glow-sm flex flex-col"
              >
                {/* Card top accent */}
                <div className="h-1 bg-gradient-to-r from-tech-baby-blue-dark via-tech-baby-blue to-tech-baby-blue-light" />

                <div className="p-8 flex flex-col flex-1">
                  {/* Category badge */}
                  <span className="inline-block self-start px-3 py-1 bg-tech-baby-blue/10 border border-tech-baby-blue/30 text-tech-white rounded-full text-xs font-semibold mb-4">
                    {post.category}
                  </span>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-tech-white mb-3 leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-tech-baby-blue smooth-transition"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  {/* Description */}
                  <p className="text-tech-platinum text-sm leading-relaxed mb-6 flex-1">
                    {post.description}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4 text-xs text-tech-platinum">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.publishedAt).toLocaleDateString('en-AU', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTime}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-tech-baby-blue text-sm font-semibold hover:text-tech-baby-blue-light smooth-transition group"
                    >
                      Read more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-tech-white mb-6">
            Ready to Implement AI in Your Business?
          </h2>
          <p className="text-tech-platinum mb-8">
            We build intelligent systems for Australian businesses, from
            AI-integrated websites to full automation workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-tech-baby-blue text-tech-black rounded-lg font-semibold text-lg smooth-transition hover:bg-tech-baby-blue-light hover:shadow-glow"
            >
              Explore Our Services
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 border-2 border-tech-baby-blue text-tech-white rounded-lg font-semibold text-lg smooth-transition hover:bg-tech-baby-blue hover:text-tech-black"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
