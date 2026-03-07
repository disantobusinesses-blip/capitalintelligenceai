export interface BlogPost {
  slug: string
  title: string
  description: string
  publishedAt: string
  lastModified: string
  readingTime: string
  category: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-ai-can-boost-seo',
    title: 'How AI Can Boost SEO and AI Search Engine Optimisation for Modern Businesses',
    description:
      'Learn how AI transforms traditional SEO — from keyword clustering and content planning to technical audits and AI search visibility. A practical guide for Australian businesses ready to scale their organic presence.',
    publishedAt: '2026-03-07',
    lastModified: '2026-03-07',
    readingTime: '9 min read',
    category: 'SEO & AI Search',
  },
  {
    slug: 'how-ai-can-boost-business-performance',
    title: 'How AI Can Boost Business Performance, Save Time, and Increase Revenue',
    description:
      'Discover how AI tools can automate admin, accelerate lead generation, improve customer service, and drive revenue growth for your business. A practical breakdown for founders and operators.',
    publishedAt: '2026-03-07',
    lastModified: '2026-03-07',
    readingTime: '10 min read',
    category: 'Business & AI',
  },
]
