import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  const { data } = await supabase
    .from('capitalintelligence_posts')
    .select('id, slug, title, description, published_at, last_modified, reading_time, category, content, published')
    .eq('slug', slug)
    .single()
  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post || !post.published) return {}
  return {
    title: `${post.title} | IAS Blog`,
    description: post.description,
    alternates: {
      canonical: `https://intelligentaisystem.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://intelligentaisystem.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.last_modified,
      authors: ['Intelligent AI Systems'],
      siteName: 'Intelligent AI Systems',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function DynamicBlogPost({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post || !post.published) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.published_at,
    dateModified: post.last_modified,
    author: {
      '@type': 'Organization',
      name: 'Intelligent AI Systems',
      url: 'https://intelligentaisystem.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Intelligent AI Systems',
      url: 'https://intelligentaisystem.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://intelligentaisystem.com/images/is-logo.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://intelligentaisystem.com/blog/${post.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-[100dvh] bg-[#F8F7F4] pb-24">
        {/* Back link */}
        <div className="pt-10 px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#6B6560] hover:text-[#1A1A1A] smooth-transition text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>

        {/* Article */}
        <article className="py-12 px-6">
          <div className="max-w-3xl mx-auto">

            {/* Header */}
            <header className="mb-12">
              <span className="inline-block px-3 py-1 bg-[#F8F7F4] border border-[#E8E4DF] text-[#1A1A1A] rounded-full text-xs font-semibold mb-4">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-6">
                {post.title}
              </h1>
              <p className="text-lg text-[#6B6560] leading-relaxed mb-6">
                {post.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-[#6B6560] border-t border-[#E8E4DF] pt-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.published_at).toLocaleDateString('en-AU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.reading_time}
                </span>
                <span>By Intelligent AI Systems</span>
              </div>
            </header>

            {/* Body — HTML content from Supabase */}
            <div
              className="prose-custom space-y-8 text-[#6B6560] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </div>
    </>
  )
}
