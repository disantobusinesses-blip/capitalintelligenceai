import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import BlogFilter from '@/components/BlogFilter'

export const metadata: Metadata = {
  title: 'AI & SEO Blog | Intelligent AI Systems',
  description: 'Practical guides on AI, SEO, and website growth for Australian businesses. Tips on local search, AI automation, and digital marketing.',
  alternates: {
    canonical: 'https://intelligentaisystem.com/blog',
  },
  openGraph: {
    title: 'AI & SEO Blog | Intelligent AI Systems',
    description: 'Practical guides on AI, SEO, and website growth for Australian businesses.',
    url: 'https://intelligentaisystem.com/blog',
    type: 'website',
  },
}

export const revalidate = 60

export default async function BlogIndexPage() {
  const { data: posts } = await supabase
    .from('capitalintelligence_posts')
    .select('id, slug, title, description, published_at, last_modified, reading_time, category, content, published')
    .eq('published', true)
    .order('published_at', { ascending: false })

  const allPosts = posts ?? []

  // Build category list dynamically, keeping 'All' first
  const categorySet = new Set(allPosts.map((p) => p.category))
  const categories = ['All', ...Array.from(categorySet)]

  return (
    <div className="min-h-[100dvh] bg-[#F8F7F4] pb-24 pt-[74px]">
      {/* Hero */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            Insights & Ideas
          </h1>
          <p className="text-lg text-[#6B6560] max-w-2xl mx-auto">
            Practical guides on AI, SEO, and website growth for businesses ready to scale.
          </p>
        </div>
      </section>

      <BlogFilter posts={allPosts} categories={categories} />
    </div>
  )
}
