import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'

const post = {
  slug: 'newsletter-signup-email-marketing-benefits',
  title: 'Why a Newsletter Signup Is the Most Valuable Marketing Asset Your Website Can Have',
  description:
    'Your email list is the one marketing channel you fully own. A newsletter signup on your website builds a direct line to your best prospects and customers, keeping your business top of mind long after they leave your site.',
  publishedAt: '2026-03-09',
  lastModified: '2026-03-09',
  readingTime: '7 min read',
  category: 'Email Marketing',
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
    'newsletter signup website, email list building, email marketing small business Australia, Mailchimp website integration, email marketing ROI, build email list, email newsletter business growth, direct marketing channel',
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

export default function BlogPostNewsletterSignup() {
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
                  Social media platforms can change their algorithms overnight. Paid ad costs
                  can spike. SEO rankings can shift. But your email list is an asset you own
                  outright. No platform can take it away, no algorithm can suppress it, and no
                  budget increase is required to reach the people on it. That is why, for
                  businesses thinking about long-term customer relationships, building an email
                  list through a newsletter signup is one of the smartest investments you can
                  make in your website.
                </p>
                <p className="mt-4">
                  Email marketing consistently delivers some of the highest returns of any
                  digital marketing channel. Industry research has placed average email marketing
                  ROI at many multiples of cost, particularly for service businesses where even
                  one retained customer or repeat booking can represent significant revenue.
                  The reason is that email reaches people who have already opted in; they want
                  to hear from you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4">
                  Why Email Beats Social Media for Customer Retention
                </h2>
                <p>
                  Social media posts reach a fraction of your followers. Organic reach on
                  Facebook for business pages has declined significantly over the past decade
                  as the platform has prioritised paid content. Instagram and LinkedIn show
                  similar patterns. The people who follow you on social media may never see
                  most of what you post.
                </p>
                <p className="mt-4">
                  Email is different. When you send a newsletter to your list, it arrives
                  in every subscriber&apos;s inbox. They may not open every email, but the
                  delivery is direct and personal in a way that social media never achieves.
                  The subscriber made an active choice to hear from you, which means the
                  relationship is fundamentally more intentional.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4">
                  Turning One-Time Visitors Into Long-Term Customers
                </h2>
                <p>
                  Most website visitors are not ready to buy on their first visit. They are
                  researching, comparing, or just starting to think about a problem you can
                  solve. Without a way to stay connected, the majority of those visitors will
                  leave and never return. A newsletter signup changes that dynamic.
                </p>
                <p className="mt-4">
                  When a visitor subscribes, they are inviting you into their inbox. With
                  a well-structured email sequence, you can stay visible to that person over
                  the weeks and months they are making their decision. You can demonstrate
                  expertise, share helpful information, and position your business as the
                  obvious choice, all before they ever make direct contact.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4">
                  Automated Welcome Sequences Do the Work for You
                </h2>
                <p>
                  A newsletter signup integrated with the right email platform does more than
                  just collect addresses. It can trigger an automated welcome sequence that
                  immediately delivers value to new subscribers, such as a guide, a special offer,
                  a series of helpful tips, or an introduction to your services. That sequence
                  runs automatically for every new subscriber, building the relationship from
                  day one without any ongoing manual effort.
                </p>
                <p className="mt-4">
                  Platforms like Mailchimp, ConvertKit, and SendGrid make this kind of
                  automation straightforward to set up. Once configured, the system handles
                  new subscriber onboarding, re-engagement campaigns, and promotional sends
                  with minimal manual involvement. The list keeps building and the relationship
                  keeps developing while you focus on running your business.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4">
                  The Compounding Value of a Growing List
                </h2>
                <p>
                  An email list grows in value as it grows in size. Early on, even a small
                  list of highly engaged subscribers can drive meaningful revenue. A hundred
                  local subscribers who are genuinely interested in your services might
                  represent dozens of potential bookings. At a thousand subscribers, a single
                  promotional email can generate a week&apos;s worth of enquiries.
                </p>
                <p className="mt-4">
                  The businesses that understand this start building their list from day one,
                  before they need it. By the time they are ready to run a promotion, launch
                  a new service, or fill a quiet period in the calendar, they have an audience
                  already waiting. That is the compounding advantage of starting early.
                </p>
                <ul className="list-none mt-6 space-y-3">
                  {[
                    'Direct access to an audience that already knows and trusts your business',
                    'Automated sequences that nurture leads and convert subscribers over time',
                    'A marketing channel unaffected by social media algorithm changes',
                    'Ability to segment subscribers and personalise communications at scale',
                    'Owned data: your list is your asset, not a rented audience on someone else\'s platform',
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
                  What Makes a Good Newsletter Signup on Your Website
                </h2>
                <p>
                  A newsletter signup works best when it is positioned correctly and gives
                  visitors a clear reason to subscribe. Generic &ldquo;sign up for updates&rdquo; copy
                  rarely converts well. The signup should communicate specific value: what will
                  they receive, how often, and why should they care?
                </p>
                <p className="mt-4">
                  Placement matters too. A signup embedded in a relevant page section,
                  such as after a useful blog post, alongside a service description, or at a natural
                  pause point, performs better than a pop-up that interrupts the browsing
                  experience. The goal is to make subscribing feel like the natural next step
                  for someone who has found your content valuable.
                </p>
              </section>

              {/* CTA */}
              <section className="mt-14 bg-white border border-[#E8E4DF] rounded-[10px] p-8">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
                  Start Building Your Email List Today
                </h2>
                <p className="mb-6">
                  We set up newsletter signup integrations that connect your website to your
                  chosen email platform and include automated welcome sequences to start building
                  relationships with new subscribers from day one.
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
                      href="/blog/how-blogs-generate-millions-of-website-visits"
                      className="text-ias-brown-dark hover:text-ias-brown-dark smooth-transition font-medium"
                    >
                      How Blogs Can Generate Millions of Website Visits →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog/ai-chatbots-automation-more-leads"
                      className="text-ias-brown-dark hover:text-ias-brown-dark smooth-transition font-medium"
                    >
                      How AI Chatbots and Automation Can Turn Website Traffic Into More Leads →
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
