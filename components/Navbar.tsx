'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useQuotePopup } from '@/context/QuotePopupContext'
import RichNavigationMenu, { type NavEntry } from '@/components/ui/rich-navigation-menu'

/**
 * Five top-level routes only. "Other Services" was retired as a nav item and
 * its content now lives in anchored sections on /services, so every dropdown
 * target below is a real route or a real section id on the destination page.
 */
const navEntries: NavEntry[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    columns: [
      {
        heading: 'Company',
        items: [
          { label: 'Who We Are', href: '/about', description: 'Melbourne based, serving clients globally.' },
          { label: 'Our Projects', href: '/projects', description: 'Sites we have built and shipped.' },
          { label: 'Contact Us', href: '/contact', description: 'Questions, quotes, and next steps.' },
        ],
      },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    columns: [
      {
        heading: 'Build',
        items: [
          { label: 'Website Packages', href: '/services#website-packages', description: 'Foundation, Growth, and Bespoke, fixed prices.' },
          { label: 'Website Hosting', href: '/services#hosting', description: 'Keep your site live, secure, and monitored.' },
          { label: 'Google Business Profile', href: '/services/google-business-profile', description: 'Get found in local Google search.' },
        ],
      },
      {
        heading: 'Grow',
        items: [
          { label: 'SEO Blog Content', href: '/services#seo-blog-content', description: 'Ongoing posts that build search visibility.' },
          { label: 'Instagram & Social Growth', href: '/services#social-growth', description: 'Content, scheduling, and monthly reporting.' },
          { label: 'B2B Lead Generation', href: '/services#b2b', description: 'Private AI CRM and acquisition platform.' },
        ],
      },
    ],
    feature: {
      title: 'Not sure where to start?',
      body: 'Tell us about your business and we will recommend the right mix of services.',
      href: '/contact',
      cta: 'Get in touch',
    },
  },
  {
    label: 'Projects',
    href: '/projects',
    columns: [
      {
        heading: 'By Package',
        items: [
          { label: 'Foundation Builds', href: '/projects#foundation', description: 'Compact sites, 1 to 3 pages.' },
          { label: 'Growth Builds', href: '/projects#growth', description: 'Conversion focused, 5 to 8 pages.' },
          { label: 'Bespoke Builds', href: '/projects#bespoke', description: 'Fully custom, 10+ pages.' },
        ],
      },
    ],
  },
  {
    label: 'Blog',
    href: '/blog',
    columns: [
      {
        heading: 'Reading',
        items: [
          { label: 'All Articles', href: '/blog', description: 'Everything we have published on AI and SEO.' },
          { label: 'Google Growth Plan', href: '/blog/google-growth-plan-199-per-month', description: 'What $199 per month covers.' },
          { label: 'Super Growth Plan', href: '/blog/super-growth-plan-359-per-month', description: 'Our most popular SEO plan.' },
          { label: 'Market Authority Plan', href: '/blog/market-authority-plan-599-per-month', description: 'For businesses going all in on search.' },
        ],
      },
    ],
  },
]

export default function Navbar() {
  const { openPopup } = useQuotePopup()

  return (
    <header
      style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.08)' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white h-[68px] flex items-center"
    >
      <div className="max-w-[1200px] mx-auto px-6 w-full flex items-center justify-between">
        {/* LEFT: Logo */}
        <Link href="/" aria-label="Home" className="flex items-center flex-shrink-0">
          <Image
            src="/ias-logo.png"
            alt="Intelligent AI Systems"
            width={48}
            height={48}
            loading="eager"
            fetchPriority="high"
            className="h-12 w-auto rounded object-cover"
          />
        </Link>

        {/* CENTER: Nav links with dropdown panels (desktop). Mobile uses the
            floating bottom pill nav instead, so this is hidden under md. */}
        <div className="hidden md:block">
          <RichNavigationMenu entries={navEntries} />
        </div>

        {/* RIGHT: CTAs */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => openPopup()}
            className="bg-ias-brown-dark text-white text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-[6px] hover:bg-ias-brown-mid transition-colors duration-200 whitespace-nowrap"
          >
            Request Quote/Call
          </button>
        </div>
      </div>
    </header>
  )
}
