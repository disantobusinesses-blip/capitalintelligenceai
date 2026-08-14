import type { Metadata } from 'next'
import ProjectCard from '@/components/ProjectCard'
import QuotePopupButton from '@/components/QuotePopupButton'
import FeatureTable, { FeatureRow } from '@/components/FeatureTable'
import TypingEffect from '@/components/ui/typing-effect'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Our Projects – Intelligent AI Systems | Portfolio',
  description: 'Explore IAS\'s portfolio of websites built for businesses across Australia, electrical, fitness, property, fintech, and more.',
  keywords: 'web design portfolio, AI projects, website examples Australia, IAS projects, Intelligent AI Systems portfolio',
  alternates: {
    canonical: 'https://intelligentaisystem.com/projects',
  },
  openGraph: {
    title: 'Our Projects – Intelligent AI Systems',
    description: 'Intelligent systems implemented across diverse industries.',
    url: 'https://intelligentaisystem.com/projects',
    type: 'website',
  },
}

interface Project {
  id: number
  title: string
  industry: string
  description: string
  image: string | null
  url: string
  color: string
  features: string[]
  additionalNote?: string
}

const FEATURE_ROWS: FeatureRow[] = [
  { label: 'Mobile responsive', values: [true, true, true] },
  { label: 'SEO optimised', values: [true, true, true] },
  { label: 'Lead capture (form, SMS or booking link)', values: [true, true, true] },
  { label: 'CRO-focused copywriting', values: [false, true, true] },
  { label: 'Custom integrations (booking, payments, etc.)', values: [false, false, true] },
  { label: 'Dedicated launch support', values: [false, false, true] },
]

// Card bullets are deliberately project-specific. The tier-level lines
// (mobile responsive, SEO, lead capture, CRO copy, integrations, launch
// support) live in the comparison table above and are not repeated here.

// Examples for the Foundation package ($1,999) — linked from /services#foundation.
const foundationProjects: Project[] = [
  {
    id: 0,
    title: 'Tamar Cabinets PTY LTD',
    industry: 'Cabinetry & Joinery',
    description: 'A 30-year-old Braybrook joinery shop with a strong Instagram following and nowhere to send a serious enquiry. We built a single-page showcase around their own footage, with a one-tap quote email that arrives pre-filled and ready to reply to.',
    image: '/projects/tamar-cabinets.jpg',
    url: 'https://tamarcabinets.com.au',
    color: '#E8A54B',
    features: [
      'Video-led project showcase: Kew, Ivanhoe East, Keilor East',
      'Gallery split into kitchens, bathrooms, wardrobes and living',
      'Quote email pre-filled with subject and body',
      'Google review section and workshop map embed',
      'Instagram feed as live portfolio overflow',
      'Categories project photos',
    ],
  },
  {
    id: 1,
    title: 'Senator Developments',
    industry: 'Renovations & Carpentry',
    description: 'A renovation builder whose leads come from the phone, not from forms. Every CTA is a tap: SMS with the message already written, direct call, or WhatsApp. The work sells itself through a hero slider and three on-site project videos.',
    image: '/projects/senator-developments.png',
    url: 'https://senatordevelopments.com.au',
    color: '#2C3E50',
    features: [
      'SMS-to-quote with pre-filled message body',
      'Click-to-call and WhatsApp handoff',
      'Hero slider plus three project videos',
      'Animated counters: 10+ years, 65+ projects',
      'Six service cards across domestic, commercial and industrial',
    ],
  },
  {
    id: 2,
    title: 'Lumière Skin Studio (DEMO ONLY)',
    industry: 'Skincare & Beauty',
    description: 'A concept build showing what Foundation looks like for a booking-led studio: single page, treatment menu, and a Fresha button wired to a live profile on a custom domain.',
    image: '/templates/skincare.png',
    url: 'https://demo2.intelligentaisystem.com',
    color: '#B08968',
    features: [
      'Fresha booking integration on a live profile',
      'Custom subdomain deployment',
      'Treatment menu and studio gallery layout',
      'Built as a Foundation concept, not a client site',
    ],
  },
  {
    id: 3,
    title: 'Certi Sustainability',
    industry: 'ESD & Building Compliance',
    description: 'ESD consultants competing on turnaround, not brand. The page is built around proof: eight report types written in the exact language councils use, the councils they lodge with, and a three-step path that keeps the enquiry to a single email.',
    image: '/projects/certi-sustainability.jpg',
    url: 'https://www.certisustainability.com/',
    color: '#2F5233',
    features: [
      'Eight report types mapped to council terminology: Section J, NatHERS, BESS, WSUD, CSMP, WMP, SDA, ESD',
      'Council logo marquee covering City of Melbourne, Stonnington, Banyule, Whitehorse and Manningham',
      'Google review ticker with named verified reviewers',
      'Counters: 24 to 48 hour turnaround, 1000+ projects delivered',
      'Plans-by-email intake, no form friction',
    ],
  },
]

// Examples for the Growth package ($2,999) — linked from /services#growth.
const growthProjects: Project[] = [
  {
    id: 0,
    title: 'Estética Socials Sydney',
    industry: 'Social Media Management',
    description: 'Andrea runs one shoot day a month for women\'s brands across Sydney. The site sells the result rather than the service: a dedicated Results page carrying real campaign numbers, autoplaying reels from recent shoots, and a blog publishing four SEO posts a month.',
    image: '/projects/estetica-sydney-v2.png',
    url: 'https://esteticasydney.com/',
    color: '#8A5A44',
    features: [
      'Seven-page structure with a standalone Results page',
      'Live campaign metrics: +228.8% reach, +267.6% engagement, 187K reel plays',
      'Autoplaying reel grid from recent client shoots',
      'Database-backed blog, 4 posts per month',
      'Consultation-first enquiry with a one business day response promise',
      'Custom animations',
    ],
  },
  {
    id: 1,
    title: 'EAY Electrical',
    industry: 'Electrical Services',
    description: 'A licensed electrician competing for “electrician melbourne” across two halves of Melbourne. Video hero, a dedicated service-area page for northern and southern suburbs, a quote form that captures the job type upfront, and an emergency block that puts call and SMS one tap away.',
    image: '/projects/eay-electrical.png',
    url: 'https://www.eayelectrical.com.au',
    color: '#1A3A5C',
    features: [
      'Dedicated /where-we-service suburb landing page',
      'Quote form with service-type qualification',
      '24/7 emergency callout block, call and SMS',
      'Video hero and ten-image work gallery with SEO alt text',
      'Supabase-backed blog, 4 posts per month',
    ],
  },
  {
    id: 2,
    title: 'Reborn Physiques',
    industry: 'Health & Fitness',
    description: 'Eren sells one 12-week program two ways, and the site handles both. Stripe runs weekly billing at $99 or a discounted $949 upfront, and an application form filters out the wrong clients before they reach his inbox.',
    image: '/projects/rebornphysiques.png',
    url: 'https://rebornphysiques.com',
    color: '#1A1A1A',
    features: [
      'Stripe checkout: recurring weekly and discounted upfront',
      'Application-gated consultation funnel',
      'Eight pages including Results, Why Us and FAQ',
      'Goal and service qualification on the contact form',
      'Database-backed blog, 4 posts per month',
    ],
  },
]

// Examples for the Bespoke package ($6,999) — linked from /services#bespoke.
const bespokeProjects: Project[] = [
  {
    id: 0,
    title: 'Azzura Consulting',
    industry: 'Business Strategy & Advisory',
    description: 'A senior advisory practice where the first step is a conversation, not a form fill. Thirteen pages across six service lines, anchored by a purpose-built Bottleneck Audit: a five-minute interactive diagnostic that qualifies the visitor and gives them a reason to return. Enquiries route through Microsoft Graph into the client\'s Microsoft 365 inbox, and the News section is database-backed so it can be updated without touching code.',
    image: '/projects/azzura-consulting.png',
    url: 'https://www.azzuraconsulting.com.au/',
    color: '#1E4B7B',
    features: [
      'Custom Bottleneck Audit diagnostic tool, 5-minute assessment',
      'Six individual service pages under a services hub',
      'Microsoft Graph API email routing to Microsoft 365',
      'Database-backed News section, client-editable',
      'Service-of-interest qualification on the enquiry form',
      'Reviews page and founder profile',
    ],
  },
  {
    id: 1,
    title: 'Onyx Global',
    industry: 'FinTech',
    description: 'A pre-launch Australian travel card and digital wallet. Before launch the site has one job, waitlist volume, so every path leads to signup: a three-tier card comparison with pricing deliberately withheld, an affiliate page for referral acquisition, and a blog building search presence ahead of the November launch.',
    image: '/projects/onyx-global-v2.png',
    url: 'https://onyxglobal.com.au',
    color: '#0F172A',
    features: [
      'Waitlist capture into database',
      'Three-tier card comparison: Global, Black, Reserve',
      'Affiliate and referral program page',
      'Pre-launch blog and SEO groundwork across 8 pages',
      'Dark fintech UI with custom card renders',
    ],
    additionalNote: 'Fintech-grade design',
  },
  {
    id: 2,
    title: 'Live Demo Website',
    industry: 'Cinematic Scroll Reference',
    description: 'The motion standard every Bespoke build is designed to. Full-viewport scroll sections, pinned image sequences, a horizontal project rail and an embedded film reel, all running at 60fps on mobile.',
    image: '/projects/CinematicScrollDemo.png',
    url: 'https://demo1.intelligentaisystem.com/',
    color: '#2C2A27',
    features: [
      'Scroll-pinned full-viewport sections',
      'Horizontal project rail and embedded film reel',
      'Smooth scroll with scroll-triggered stat counters',
      'Built as the Bespoke motion reference, not a client site',
    ],
  },
]

/** Horizontal-scroll row of project cards, snap-scrolling, fixed card width. */
function ProjectRow({ projects }: { projects: Project[] }) {
  return (
    <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scroll-smooth">
      {projects.map((project) => (
        <div key={project.id} className="flex-shrink-0 snap-start w-[280px] sm:w-[340px]">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <div className="min-h-[100dvh] bg-[#F8F7F4] pb-24 pt-[74px]">
      {/* Hero */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-6">
            <TypingEffect texts={['Our Projects']} typingSpeed={55} loop={false} />
          </h1>
          <p className="text-xl text-[#6B6560] max-w-2xl mx-auto">
            Intelligent systems implemented across diverse industries.
            See how we have helped businesses operate smoother, faster, and smarter.
          </p>
        </div>
      </section>

      {/* Feature comparison */}
      <section className="py-16 px-6" style={{ borderTop: '1px solid #E8E4DF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-ias-brown-dark text-lg font-semibold tracking-[1.5px] uppercase mb-2">
              Compare Packages
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A]">
              What Each Package Includes
            </h2>
          </div>
          <FeatureTable rows={FEATURE_ROWS} />
        </div>
      </section>

      {/* Foundation examples */}
      <section id="foundation" className="py-16 px-6 scroll-mt-24" style={{ borderTop: '1px solid #E8E4DF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-ias-brown-dark text-lg font-semibold tracking-[1.5px] uppercase mb-2">
              Foundation Examples
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A]">
              Real Sites Built on the Foundation Package
            </h2>
          </div>
          <ProjectRow projects={foundationProjects} />
        </div>
      </section>

      {/* Growth examples */}
      <section id="growth" className="py-16 px-6 scroll-mt-24" style={{ borderTop: '1px solid #E8E4DF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-ias-brown-dark text-lg font-semibold tracking-[1.5px] uppercase mb-2">
              Growth Examples
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A]">
              Real Sites Built on the Growth Package
            </h2>
          </div>
          <ProjectRow projects={growthProjects} />
        </div>
      </section>

      {/* Bespoke examples */}
      <section id="bespoke" className="py-16 px-6 scroll-mt-24" style={{ borderTop: '1px solid #E8E4DF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-ias-brown-dark text-lg font-semibold tracking-[1.5px] uppercase mb-2">
              Bespoke Examples
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A]">
              Real Sites Built on the Bespoke Package
            </h2>
          </div>
          <ProjectRow projects={bespokeProjects} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Want to Be Our Next Project?</h2>
          <p className="text-[#6B6560] mb-8">
            Let us build an intelligent system tailored to your business needs.
          </p>
          <QuotePopupButton
            className="inline-block px-8 py-4 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-lg smooth-transition hover:bg-[#2D2D2D] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
          >
            Get Started
          </QuotePopupButton>
        </div>
      </section>
    </div>
  )
}
