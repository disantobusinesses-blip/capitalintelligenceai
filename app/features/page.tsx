import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Check,
  CreditCard,
  Gauge,
  MapPin,
  MessageSquare,
  PenLine,
  Images,
} from 'lucide-react'
import { display, body } from '@/lib/fonts'
import FadeRiseText from '@/components/ui/fade-rise-text'
import QuotePopupButton from '@/components/QuotePopupButton'

export const metadata: Metadata = {
  title: 'Website Features & AI Add-Ons | Intelligent AI Systems',
  description:
    'Every feature we build into client websites: lead capture and enquiry flows, booking and payment integrations, galleries and social proof, local SEO, and the AI content engine behind our monthly blog plans.',
  keywords:
    'website features, AI add-ons, lead capture, booking integration, Stripe payments, local SEO, schema markup, SEO blog content, Melbourne web design',
  alternates: {
    canonical: 'https://intelligentaisystem.com/features',
  },
  openGraph: {
    title: 'Website Features & AI Add-Ons | Intelligent AI Systems',
    description:
      'The full catalogue of capabilities we build into client websites, from enquiry flows and payment integrations to local SEO and the AI content engine.',
    url: 'https://intelligentaisystem.com/features',
    type: 'website',
  },
}

export const revalidate = 60

/* Every capability listed here is one we have actually shipped on a client
   build. The examples name the project it ran on so the page stays checkable
   rather than aspirational. Pricing deliberately lives on /services only, so
   the two pages never drift out of sync. */

interface Feature {
  name: string
  detail: string
  /** The client build this shipped on, shown as evidence. */
  seenOn?: string
}

interface FeatureGroup {
  id: string
  icon: typeof MessageSquare
  eyebrow: string
  title: string
  intro: string
  features: Feature[]
}

const FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: 'lead-capture',
    icon: MessageSquare,
    eyebrow: 'Enquiries',
    title: 'Lead Capture & Enquiry Flow',
    intro:
      'How a visitor turns into an enquiry. We pick the path that matches how you actually win work, rather than dropping a generic contact form on every build.',
    features: [
      {
        name: 'Qualifying enquiry forms',
        detail:
          'Forms that capture the job type, service of interest or budget upfront, so an enquiry arrives ready to quote instead of needing three emails first.',
        seenOn: 'EAY Electrical, Azzura Consulting',
      },
      {
        name: 'Tap-to-call, SMS and WhatsApp',
        detail:
          'For trades and phone-led businesses, every call to action is one tap: a direct call, or an SMS that arrives with the message already written.',
        seenOn: 'EAY Electrical',
      },
      {
        name: 'Pre-filled quote emails',
        detail:
          'A one-tap email intake that opens with the subject and body already filled in. No form friction, and the enquiry lands in a normal inbox ready to reply to.',
        seenOn: 'Tamar Cabinets, Certi Sustainability',
      },
      {
        name: 'Consultation booking with live availability',
        detail:
          'A booking flow that reads real calendar availability, shows only free slots, and sends a confirmation with a calendar invite attached.',
        seenOn: 'This site',
      },
      {
        name: 'Application-gated funnels',
        detail:
          'Where the wrong enquiry costs you time, an application step filters people before they reach your inbox.',
        seenOn: 'Reborn Physiques',
      },
      {
        name: 'Waitlist and newsletter capture',
        detail:
          'Email capture straight into your database for pre-launch waitlists or an ongoing list you can market to later.',
        seenOn: 'Onyx Global',
      },
    ],
  },
  {
    id: 'ai-content',
    icon: PenLine,
    eyebrow: 'AI Add-Ons',
    title: 'AI Content Engine',
    intro:
      'The part of the build that keeps working after launch. Our AI workflow researches, writes and publishes SEO content straight to your site on a monthly schedule.',
    features: [
      {
        name: 'Database-backed blog',
        detail:
          'Posts live in a database rather than being hardcoded, so new content publishes to your site without a developer touching the code.',
        seenOn: 'EAY Electrical, Estética Socials Sydney, Reborn Physiques',
      },
      {
        name: 'Monthly SEO post schedule',
        detail:
          'Four, eight or twelve posts a month depending on the plan, each targeting keywords your customers actually search, with the research done before anything is written.',
      },
      {
        name: 'AI-accelerated build workflow',
        detail:
          'Design, development and technical SEO run through one AI-assisted process, which is how a full build lands in days rather than months without cutting quality.',
      },
      {
        name: 'Client-editable content sections',
        detail:
          'News, project and gallery sections wired to the database so your team can update them without a change request.',
        seenOn: 'Azzura Consulting',
      },
    ],
  },
  {
    id: 'search-visibility',
    icon: MapPin,
    eyebrow: 'Getting Found',
    title: 'Search Visibility & Local SEO',
    intro:
      'Everything that decides whether you show up when someone searches for what you do, in the suburb you do it in.',
    features: [
      {
        name: 'Technical SEO foundations',
        detail:
          'Clean heading structure, crawlable markup, sitemaps, canonical tags and meta data set correctly at build time rather than bolted on later.',
      },
      {
        name: 'Structured data and schema markup',
        detail:
          'Business, service and FAQ schema so search engines and AI answer engines can read what you do, where you are and what you charge.',
      },
      {
        name: 'Google Business Profile setup',
        detail:
          'Profile built and optimised for local search, including cover imagery, a keyword-rich description and a review QR code your customers can scan in person.',
      },
      {
        name: 'Service-area landing pages',
        detail:
          'Dedicated pages for the suburbs you actually service, which is what gets you into local results beyond your own postcode.',
        seenOn: 'EAY Electrical',
      },
      {
        name: 'Search Console and Analytics tracking',
        detail:
          'Both wired up from day one, so impressions, rankings and traffic are measurable instead of guessed at.',
      },
    ],
  },
  {
    id: 'showcase',
    icon: Images,
    eyebrow: 'Proof',
    title: 'Media, Galleries & Social Proof',
    intro:
      'For most of our clients the work sells itself, provided the site actually shows it. These are the components that do that job.',
    features: [
      {
        name: 'Video heroes',
        detail:
          'Your own footage running as the first thing a visitor sees, compressed properly so it does not cost you load speed.',
        seenOn: 'EAY Electrical, Tamar Cabinets',
      },
      {
        name: 'Categorised project galleries',
        detail:
          'Work split into the categories customers actually browse by, with SEO alt text on every image so the gallery earns search traffic too.',
        seenOn: 'Tamar Cabinets, EAY Electrical',
      },
      {
        name: 'Autoplaying reel grids and social feeds',
        detail:
          'Recent Instagram or campaign video pulled onto the site, so your portfolio stays current without anyone rebuilding a page.',
        seenOn: 'Estética Socials Sydney, Tamar Cabinets',
      },
      {
        name: 'Google review tickers',
        detail:
          'Real named reviews surfaced on the page, pulled from your actual profile rather than typed out as static quotes.',
        seenOn: 'Certi Sustainability',
      },
      {
        name: 'Animated counters and credibility strips',
        detail:
          'Years in trade, projects delivered, turnaround times and client logos, presented as a scannable proof band.',
        seenOn: 'Certi Sustainability',
      },
      {
        name: 'Dedicated results pages',
        detail:
          'A standalone page carrying real numbers from real campaigns, for businesses whose results are the strongest thing they have to sell.',
        seenOn: 'Estética Socials Sydney, Reborn Physiques',
      },
    ],
  },
  {
    id: 'integrations',
    icon: CreditCard,
    eyebrow: 'Integrations',
    title: 'Payments, Bookings & Custom Tools',
    intro:
      'Where a site stops being a brochure and starts doing actual work. These are the integrations we build at the Bespoke level.',
    features: [
      {
        name: 'Stripe checkout',
        detail:
          'Recurring subscriptions, one-off payments, deposits and discounted upfront options, all taken on your own site.',
        seenOn: 'Reborn Physiques',
      },
      {
        name: 'Booking platform integration',
        detail:
          'Your existing booking system, such as Fresha, wired into the site so customers book in a couple of taps instead of being handed off to a third-party page.',
      },
      {
        name: 'Email routing into your inbox',
        detail:
          'Enquiries delivered through Microsoft Graph into Microsoft 365, or into whatever mail system your team already lives in.',
        seenOn: 'Azzura Consulting',
      },
      {
        name: 'Custom diagnostic tools',
        detail:
          'Purpose-built interactive assessments that qualify a visitor and give them a reason to come back, such as a five-minute audit that scores their business.',
        seenOn: 'Azzura Consulting',
      },
      {
        name: 'Affiliate and referral pages',
        detail:
          'A structured referral path for businesses that grow through partners rather than paid traffic.',
        seenOn: 'Onyx Global',
      },
    ],
  },
  {
    id: 'foundations',
    icon: Gauge,
    eyebrow: 'Foundations',
    title: 'Performance, Hosting & Care',
    intro:
      'The parts nobody asks for by name but everybody notices when they are missing. Included on every build we ship.',
    features: [
      {
        name: 'Built for speed',
        detail:
          'Pages that load in under three seconds on mobile data, because a slow site loses the customer before they ever see your name.',
      },
      {
        name: 'Mobile-first responsive layouts',
        detail:
          'Designed for the phone first, since that is where the overwhelming majority of local searches happen.',
      },
      {
        name: 'Secure hosting and monitoring',
        detail:
          'Vercel hosting with an SSL certificate and uptime monitoring, so the site stays live and stays fast.',
      },
      {
        name: 'Ongoing care plans',
        detail:
          'Monthly maintenance covering updates and a content refresh, so the site keeps evolving instead of ageing from the day it launches.',
      },
    ],
  },
]

function FeatureGroupSection({ group }: { group: FeatureGroup }) {
  const Icon = group.icon

  return (
    <section
      id={group.id}
      className="scroll-mt-24 border-t border-[#E8E4DF] px-6 py-12 md:py-16"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 max-w-[680px]">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[6px] bg-[#F3EFE9]">
            <Icon className="h-5 w-5 text-ias-brown-dark" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-ias-brown-dark">
            {group.eyebrow}
          </p>
          <h2 className="mt-2 text-[26px] font-bold text-balance text-[#1A1A1A] md:text-[32px]">
            {group.title}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#6B6560] md:text-base">
            {group.intro}
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {group.features.map((feature) => (
            <li
              key={feature.name}
              className="flex flex-col rounded-[10px] border border-[#E8E4DF] bg-white p-6"
            >
              <div className="mb-2 flex items-start gap-2.5">
                <Check
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <h3 className="text-[15px] font-semibold leading-snug text-[#1A1A1A]">
                  {feature.name}
                </h3>
              </div>
              <p className="text-[13.5px] leading-relaxed text-[#6B6560]">{feature.detail}</p>
              {feature.seenOn && (
                <p className="mt-3 text-[12px] italic text-ias-brown-muted">
                  Built for {feature.seenOn}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function FeaturesPage() {
  return (
    <main className={`${body.className} min-h-[100dvh] bg-[#F8F7F4] pb-bottom-nav pt-[74px]`}>
      {/* Hero */}
      <section className="px-6 pt-10 pb-8 text-center md:pt-14 md:pb-10">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-[1.5px] text-ias-brown-dark">
            What We Build
          </p>
          <h1
            className={`${display.className} mb-4 text-[36px] font-semibold leading-tight text-[#1A1A1A] md:text-[52px]`}
          >
            <FadeRiseText text="Website Features & AI Add-Ons" />
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#6B6560] md:text-lg">
            Every capability below is one we have already shipped on a client build, and most name
            the project it ran on. Features get combined into the Foundation, Growth and Bespoke
            packages, so use this page to work out what you need and{' '}
            <Link
              href="/services"
              className="font-semibold text-ias-brown-dark underline underline-offset-2 hover:text-ias-brown-mid"
            >
              the services page
            </Link>{' '}
            to see what it costs.
          </p>
        </div>
      </section>

      {/* Jump links. Plain anchors to the section ids below, no JS state. */}
      <nav aria-label="Feature categories" className="px-6 pb-10">
        <ul className="mx-auto flex max-w-[1200px] flex-wrap justify-center gap-2.5">
          {FEATURE_GROUPS.map((group) => (
            <li key={group.id}>
              <a
                href={`#${group.id}`}
                className="inline-flex items-center rounded-full border border-[#E8E4DF] bg-white px-4 py-2 text-[13px] font-medium text-[#1A1A1A] transition-colors duration-200 hover:border-ias-brown-dark hover:text-ias-brown-dark"
              >
                {group.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {FEATURE_GROUPS.map((group) => (
        <FeatureGroupSection key={group.id} group={group} />
      ))}

      {/* Where features sit against the packages, without repeating the prices */}
      <section className="border-t border-[#E8E4DF] px-6 py-12 md:py-16">
        <div className="mx-auto max-w-[800px]">
          <div className="rounded-[10px] border border-[#E8E4DF] bg-white p-7 md:p-9">
            <div className="mb-4 flex items-center gap-2.5">
              <BarChart3 className="h-5 w-5 text-ias-brown-dark" strokeWidth={1.5} aria-hidden="true" />
              <h2 className="text-[20px] font-bold text-[#1A1A1A] md:text-[24px]">
                How features map to packages
              </h2>
            </div>
            <p className="mb-5 text-[15px] leading-relaxed text-[#6B6560]">
              The foundations, lead capture and search visibility items are on every build we ship.
              The heavier integrations, custom tools and payment flows are where the Bespoke tier
              earns its price. If you are not sure which tier covers what you need, the comparison
              table on the services page lays it out line by line.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-[6px] border border-[#1A1A1A] px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition-colors duration-200 hover:bg-[#1A1A1A] hover:text-white"
            >
              Compare packages and pricing
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-14 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-[26px] font-bold text-[#1A1A1A] md:text-3xl">
            Not sure which of these you actually need?
          </h2>
          <p className="mb-8 text-[#6B6560]">
            Tell us what your business does and how you currently win work. We will tell you which
            of these features would move the needle, and which would just be decoration.
          </p>
          <QuotePopupButton className="inline-block rounded-[6px] bg-ias-brown-dark px-8 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-ias-brown-mid">
            Request Quote/Call
          </QuotePopupButton>
        </div>
      </section>
    </main>
  )
}
