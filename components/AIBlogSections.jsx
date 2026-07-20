const samplePosts = [
  {
    slug: 'how-blogs-generate-millions-of-website-visits',
    category: 'SEO Strategy',
    title: 'How Blogs Generate Millions of Website Visits',
    excerpt:
      'Discover why consistent, keyword-targeted blog content is one of the highest-ROI marketing channels available to small businesses today.',
  },
  {
    slug: 'how-ai-can-boost-seo',
    category: 'AI & Search',
    title: 'How AI Can Boost Your SEO in 2026',
    excerpt:
      'From generative search to ChatGPT recommendations — learn how AI is reshaping the way customers find local businesses online.',
  },
  {
    slug: 'how-ai-improves-local-seo-google-business-profile',
    category: 'Local SEO',
    title: 'How AI Improves Local SEO & Your Google Business Profile',
    excerpt:
      'AI-optimised content signals to Google exactly what your business does and where it operates, driving more foot traffic and calls.',
  },
]

const trustPoints = [
  { label: 'Published weekly — automatically' },
  { label: 'Every post SEO & GEO optimised' },
  { label: 'Indexed by Google and AI assistants' },
  { label: 'Up to 144 blogs per year included' },
]

const services = [
  { label: 'B2B AI Acquisition', href: '/services/b2b-crm-ai-platform' },
  { label: 'Website Creation', href: '/services' },
  { label: 'SEO Blog Content', href: '/services' },
  { label: 'Google Profile Setup', href: '/services/google-business-profile' },
]

export default function AIBlogSections() {
  return (
    <section
      className="py-[80px] px-6"
      style={{ borderBottom: '1px solid #E8E4DF' }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Services quick-links */}
        <div className="flex flex-wrap gap-3 mb-10">
          {services.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#E8E4DF] rounded-full text-[13px] font-semibold text-[#1A1A1A] hover:border-[#5C3D2E] hover:text-[#5C3D2E] transition-colors duration-200"
            >
              {s.label}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>

        {/* Header + Real Results image side by side */}
        <div className="flex flex-col md:flex-row gap-10 items-start mb-14">

          {/* Left: text + trust points */}
          <div className="flex-1">
            <p className="text-[#5C3D2E] text-[13px] font-semibold tracking-[1.5px] uppercase mb-3">
              AI-Powered Content Engine
            </p>
            <h2 className="text-[32px] md:text-[44px] font-extrabold text-[#1A1A1A] leading-[1.15] mb-4">
              We Write the Blogs.<br className="hidden md:block" /> You Get the Traffic.
            </h2>
            <p className="text-[18px] text-[#6B6560] max-w-[560px] mb-8">
              Our AI publishes SEO-optimised blog posts for your business every week —
              so Google and AI assistants like ChatGPT always have something new to recommend.
            </p>

            {/* Trust points */}
            <div className="flex flex-col gap-3">
              {trustPoints.map((point) => (
                <div key={point.label} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[14px] text-[#6B6560]">{point.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Real Results image box */}
          <div
            className="flex-shrink-0 w-full md:w-[440px] rounded-[12px] overflow-hidden"
            style={{ border: '1px solid #E8E4DF' }}
          >
            <div
              className="px-4 py-2 text-[12px] font-semibold tracking-[1.2px] uppercase text-[#5C3D2E]"
              style={{ borderBottom: '1px solid #E8E4DF', background: '#F8F7F4' }}
            >
              Real Results
            </div>
            <img
              src="/images/impressionsSEO.jpg"
              alt="Real SEO impressions results"
              width={800}
              height={600}
              className="w-full h-auto block"
            />
          </div>

        </div>

        {/* Sample blog cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {samplePosts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-[#F8F7F4] rounded-[10px] p-6 flex flex-col transition-all duration-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]"
              style={{ border: '1px solid #E8E4DF' }}
            >
              {/* Category badge */}
              <span className="inline-block text-[11px] font-semibold text-[#5C3D2E] tracking-[1px] uppercase mb-3">
                {post.category}
              </span>

              {/* Title */}
              <h3 className="text-[17px] font-bold text-[#1A1A1A] leading-snug mb-3 group-hover:text-[#5C3D2E] transition-colors duration-200">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-[14px] text-[#6B6560] leading-relaxed flex-1">
                {post.excerpt}
              </p>

              {/* Read more */}
              <div className="mt-5 flex items-center gap-1.5 text-[13px] font-semibold text-[#1A1A1A] group-hover:text-[#5C3D2E] transition-colors duration-200">
                Read article
                <svg className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 border-2 border-[#1A1A1A] text-[#1A1A1A] font-semibold px-6 py-3 rounded-[6px] hover:bg-[#1A1A1A] hover:text-white transition-all duration-200 text-[15px]"
          >
            Browse All AI Blog Posts
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
