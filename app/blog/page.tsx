'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Calendar, Clock } from 'lucide-react'
import { blogPosts } from '@/lib/blog'

const ALL_CATEGORIES = ['All', 'Website Growth', 'SEO & AI Search', 'Local SEO', 'Lead Generation', 'Business & AI', 'Digital Marketing', 'Email Marketing', 'Blogging & SEO']

export default function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory)

  return (
    <div className="min-h-[100dvh] pb-24">
      {/* Hero */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-tech-white mb-4">
            Insights & Ideas
          </h1>
          <p className="text-lg text-tech-platinum max-w-2xl mx-auto">
            Practical guides on AI, SEO, and website growth for businesses ready to scale.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="px-6 pb-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold smooth-transition border ${
                  activeCategory === cat
                    ? 'bg-tech-baby-blue text-tech-black border-tech-baby-blue'
                    : 'bg-transparent text-tech-platinum border-tech-baby-blue/30 hover:border-tech-baby-blue hover:text-tech-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-4 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="bg-tech-gray border border-tech-baby-blue/20 rounded-xl overflow-hidden smooth-transition hover:border-tech-baby-blue hover:shadow-glow-sm flex flex-col h-full p-6">
                  {/* Category badge */}
                  <span className={`inline-block self-start px-3 py-1 rounded-full text-xs font-semibold mb-3 border ${
                    post.category === 'Website Growth'
                      ? 'bg-tech-baby-blue/20 border-tech-baby-blue/50 text-tech-baby-blue'
                      : 'bg-tech-baby-blue/10 border-tech-baby-blue/30 text-tech-white'
                  }`}>
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
