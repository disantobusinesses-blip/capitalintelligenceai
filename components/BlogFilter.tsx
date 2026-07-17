'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Calendar, Clock } from 'lucide-react'
import type { BlogPost } from '@/lib/supabase-types'

interface Props {
  posts: BlogPost[]
  categories: string[]
}

export default function BlogFilter({ posts, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Category Filters */}
      <section className="px-6 pb-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold smooth-transition border ${
                  activeCategory === cat
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-transparent text-[#6B6560] border-[#E8E4DF] hover:border-[#5C3D2E] hover:text-[#1A1A1A]'
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
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="bg-white border border-[#E8E4DF] rounded-[6px] overflow-hidden smooth-transition hover:border-[#5C3D2E] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col h-full p-6">
                  {/* Category badge */}
                  <span
                    className={`inline-block self-start px-3 py-1 rounded-full text-xs font-semibold mb-3 border ${
                      post.category === 'Website Growth'
                        ? 'bg-[#F8F7F4] border-[#5C3D2E] text-[#5C3D2E]'
                        : 'bg-[#F8F7F4] border-[#E8E4DF] text-[#1A1A1A]'
                    }`}
                  >
                    {post.category}
                  </span>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 leading-snug group-hover:text-[#5C3D2E] smooth-transition">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-[#6B6560] text-sm leading-relaxed mb-4 flex-1">
                    {post.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-[#6B6560] border-t border-[#E8E4DF] pt-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.published_at).toLocaleDateString('en-AU', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.reading_time}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
