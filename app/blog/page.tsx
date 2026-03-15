import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
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
      <section className="py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-tech-white mb-4">
            Insights & Ideas
          </h1>
          <p className="text-lg text-tech-platinum max-w-2xl mx-auto">
            Practical guides on AI, SEO, and intelligent systems for businesses ready to grow.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="bg-tech-gray border border-tech-baby-blue/20 rounded-xl overflow-hidden smooth-transition hover:border-tech-baby-blue hover:shadow-glow-sm flex flex-col h-full p-6">
                  {/* Category badge */}
                  <span className="inline-block self-start px-3 py-1 bg-tech-baby-blue/10 border border-tech-baby-blue/30 text-tech-white rounded-full text-xs font-semibold mb-3">
                    {post.category}
                  </span>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-tech-white mb-3 leading-snug group-hover:text-tech-baby-blue smooth-transition">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-tech-platinum text-sm leading-relaxed mb-4 flex-1">
                    {post.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-tech-platinum border-t border-tech-baby-blue/10 pt-4">
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
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
