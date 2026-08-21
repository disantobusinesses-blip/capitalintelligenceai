import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'

const post = {
  slug: 'gallery-portfolio-website-benefits',
  title: 'Why a Gallery or Portfolio Section on Your Website Wins More Clients and Builds Instant Trust',
  description:
    'Visual proof of your work is one of the most powerful selling tools a business has. A well-built gallery or portfolio section on your website converts browsers into enquiries by showing exactly what you are capable of.',
  publishedAt: '2026-03-09',
  lastModified: '2026-03-09',
  readingTime: '7 min read',
  category: 'Website Growth',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  image: 'https://intelligentaisystem.com/ias-logo.png',
  headline: post.title,
  description: post.description,
  datePublished: post.publishedAt,
  dateModified: post.lastModified,
  author: {
    '@type': 'Organization',
    name: 'Capital Intelligence Group',
    url: 'https://intelligentaisystem.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Intelligent AI Systems',
    url: 'https://intelligentaisystem.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://intelligentaisystem.com/ias-logo.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://intelligentaisystem.com/blog/${post.slug}`,
  },
}

export const metadata: Metadata = {
  title: `${post.title} | IAS Blog`,
  description: post.description,
  keywords:
    'website gallery, portfolio website, showcase work online, trades portfolio website, creative portfolio, business portfolio Australia, website visual proof, case studies website, before and after website',
  alternates: {
    canonical: `https://intelligentaisystem.com/blog/${post.slug}`,
  },
  openGraph: {
    title: post.title,
    description: post.description,
    url: `https://intelligentaisystem.com/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.lastModified,
    authors: ['Intelligent AI Systems'],
    siteName: 'Intelligent AI Systems',
  },
  twitter: {
    card: 'summary_large_image',
    title: post.title,
    description: post.description,
  },
}

export default function BlogPostGalleryPortfolio() {
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
                  {new Date(post.publishedAt).toLocaleDateString('en-AU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readingTime}
                </span>
                <span>By Intelligent AI Systems</span>
              </div>
            </header>

            {/* Body */}
            <div className="space-y-8 text-[#6B6560] leading-relaxed">

              <section>
                <p className="text-lg leading-relaxed">
                  When a potential customer arrives on your website, they are making a judgement
                  about whether to trust you. Words help, but images do the heavy lifting. A
                  well-built gallery or portfolio section lets your work speak for itself, and
                  in most cases, that is more persuasive than anything you could write about
                  yourself.
                </p>
                <p className="mt-4">
                  For trades, creative professionals, service businesses, and anyone whose work
                  produces a visible result, a gallery or portfolio is not an optional extra.
                  It is one of the most commercially important features a website can have. The
                  question is not whether to include one, but how to build it so it actually
                  converts visitors into enquiries.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4">
                  The Psychology of Visual Proof
                </h2>
                <p>
                  People make decisions based on what they can see, not just what they are told.
                  A builder can say they do quality work, but showing ten completed projects with
                  clean finishes, happy clients, and before-and-after comparisons is far more
                  convincing. Visual evidence bypasses the natural scepticism that text-based
                  claims trigger.
                </p>
                <p className="mt-4">
                  Research in consumer behaviour consistently shows that images increase
                  engagement, time on page, and conversion rates across industries. When a
                  visitor can see your actual work, they are making a much more informed and
                  emotionally confident decision about whether to contact you. That reduces
                  hesitation and shortens the sales cycle.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4">
                  Who Benefits Most from a Gallery or Portfolio Section
                </h2>
                <p>
                  Almost any business that produces a tangible result benefits from showcasing
                  it visually. The businesses that see the biggest impact tend to be:
                </p>
                <ul className="list-none mt-6 space-y-3">
                  {[
                    'Tradespeople (builders, electricians, plumbers, landscapers, painters) where before and after results are compelling',
                    'Creative and design professionals: photographers, graphic designers, interior designers, and architects',
                    'Hospitality and food businesses: restaurants, caterers, and event spaces where atmosphere and presentation matter',
                    'Healthcare and wellness providers: clinics and therapists who want to show their space and environment',
                    'Any service business with case studies, completed projects, or client work to showcase',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-ias-brown-dark rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4">
                  What Makes a Portfolio Section Actually Work
                </h2>
                <p>
                  Not all gallery sections are equal. A poorly built gallery that is slow to load,
                  hard to navigate, or lacking context can actually hurt conversion by
                  frustrating visitors or failing to communicate the story behind the work.
                  A well-built portfolio section has several key properties.
                </p>
                <p className="mt-4">
                  It loads fast, even with high-resolution images, through proper image
                  optimisation and lazy loading. It organises work into categories so visitors
                  can quickly find examples relevant to their situation. It includes enough
                  context, including a brief description, a location, and the type of project, to make the
                  images meaningful rather than just decorative. And it works just as well on
                  mobile as it does on desktop, because a large proportion of visitors will be
                  browsing on their phone.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4">
                  Portfolio Sections Support SEO as Well as Conversion
                </h2>
                <p>
                  A gallery or portfolio does not just help with conversion; it also supports
                  your search engine visibility. Images with descriptive file names and alt text
                  contribute to your overall SEO. Portfolio pages that include location
                  information and project type descriptions can rank for relevant local searches.
                </p>
                <p className="mt-4">
                  For example, a plumber in Brisbane who has a portfolio page titled
                  &ldquo;Bathroom Renovation Projects – Brisbane&rdquo; with images, descriptions, and
                  suburb names is giving search engines a strong signal of relevance for those
                  searches. Over time, well-structured portfolio pages can become significant
                  traffic drivers in their own right.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4">
                  Building Trust Before the First Conversation
                </h2>
                <p>
                  Perhaps the most commercially valuable function of a portfolio is the trust it
                  builds before any direct contact. When a potential customer has already browsed
                  fifteen examples of your work, seen the quality, understood your style, and felt
                  confident in your capabilities, the first conversation is not a sales call.
                  It is a confirmation call. They have already decided they want to work with you.
                </p>
                <p className="mt-4">
                  That shift from cold enquiry to warm enquiry changes everything about the
                  sales process. Close rates are higher. Negotiation on price is less intense.
                  Clients are more likely to proceed quickly because they have done their
                  research and already feel confident. A gallery or portfolio section is one
                  of the most effective tools for creating that outcome.
                </p>
              </section>

              {/* CTA */}
              <section className="mt-14 bg-white border border-[#E8E4DF] rounded-[10px] p-8">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
                  Showcase Your Work With a Professional Gallery
                </h2>
                <p className="mb-6">
                  We build gallery and portfolio sections that load fast, look stunning on any
                  device, and are designed to turn project showcases into enquiries. Give
                  potential clients the visual proof they need to choose you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/"
                    className="px-6 py-3 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-center smooth-transition hover:bg-[#2D2D2D] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                  >
                    Explore Our Services
                  </Link>
                  <Link
                    href="/features"
                    className="px-6 py-3 border-2 border-[#1A1A1A] text-[#1A1A1A] rounded-[6px] font-semibold text-center smooth-transition hover:bg-[#1A1A1A] hover:text-white"
                  >
                    View All Features
                  </Link>
                </div>
              </section>

              {/* Internal links */}
              <section className="mt-10 pt-8 border-t border-[#E8E4DF]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Related Reading</h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/blog/how-ai-can-boost-seo"
                      className="text-ias-brown-dark hover:text-ias-brown-dark smooth-transition font-medium"
                    >
                      How AI Can Boost SEO and AI Search Engine Optimisation →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog/how-ai-improves-local-seo-google-business-profile"
                      className="text-ias-brown-dark hover:text-ias-brown-dark smooth-transition font-medium"
                    >
                      How AI Can Improve Local SEO and Google Business Profile Rankings →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog/how-ai-can-boost-business-performance"
                      className="text-ias-brown-dark hover:text-ias-brown-dark smooth-transition font-medium"
                    >
                      How AI Can Boost Business Performance, Save Time, and Increase Revenue →
                    </Link>
                  </li>
                </ul>
              </section>

            </div>
          </div>
        </article>
      </div>
    </>
  )
}
