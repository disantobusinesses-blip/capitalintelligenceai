import type { Metadata } from 'next'
import ProjectCard from '@/components/ProjectCard'
import QuotePopupButton from '@/components/QuotePopupButton'
import FeatureTable, { FeatureRow } from '@/components/FeatureTable'

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
  { label: 'Contact form / lead capture', values: [true, true, true] },
  { label: 'CRO-focused copywriting', values: [false, true, true] },
  { label: 'Google Ads conversion tracking', values: [false, true, true] },
  { label: 'Custom integrations (booking, payments, etc.)', values: [false, false, true] },
  { label: 'Dedicated launch support', values: [false, false, true] },
]

// Examples for the Foundation package ($1,999) — linked from /services#foundation.
const foundationProjects: Project[] = [
  {
    id: 0,
    title: 'Tamar Cabinets PTY LTD',
    industry: 'Cabinetry & Joinery',
    description: 'Bespoke cabinetry and joinery website for a Melbourne-based craftsman. Modern design showcasing their handcrafted kitchen and furniture work with a premium aesthetic.',
    image: '/projects/tamar-cabinets.jpg',
    url: 'https://tamarcabinets.com.au',
    color: '#E8A54B',
    features: ['Mobile responsive', 'SEO optimised', 'Contact form', 'Portfolio showcase'],
  },
  {
    id: 1,
    title: 'Your Coach Plus',
    industry: 'Health & Fitness',
    description: 'Personal training landing page built to convert visitors into clients, showcasing coaching services with a clean modern design and seamless contact integration.',
    image: '/projects/yourcoachplus.png',
    url: 'https://yourcoachplus.com.au',
    color: '#2D5016',
    features: ['Mobile responsive', 'SEO optimised', 'Contact form', 'Lead capture (PT landing page)'],
  },
  {
    id: 2,
    title: 'Senator Developments',
    industry: 'Property Development',
    description: 'Professional property development website showcasing residential and commercial projects across Australia, with a modern design built to attract buyers and investors.',
    image: '/projects/senator-developments.png',
    url: 'https://senatordevelopments.com.au',
    color: '#2C3E50',
    features: ['Mobile responsive', 'SEO optimised', 'Contact form', 'Project showcase'],
  },
  {
    id: 3,
    title: 'Lumière Skin Studio',
    industry: 'Skincare & Beauty',
    description: 'Skincare & beauty studio landing page with a Fresha booking button linked to the client\'s existing profile, custom domain, and mobile-responsive design.',
    image: '/templates/skincare.png',
    url: 'https://demo2.intelligentaisystem.com',
    color: '#B08968',
    features: ['Mobile responsive', 'SEO optimised', 'Contact form', 'Fresha booking integration'],
  },
  {
    id: 4,
    title: 'Certi Sustainability',
    industry: 'ESD & Building Compliance',
    description: 'Consultancy website for an ESD and building compliance specialist, built to establish credibility and generate enquiries.',
    image: '/projects/certi-sustainability.jpg',
    url: 'https://www.certisustainability.com/',
    color: '#2F5233',
    features: ['Mobile responsive', 'SEO optimised', 'Contact form'],
  },
]

// Examples for the Growth package ($2,999) — linked from /services#growth.
const growthProjects: Project[] = [
  {
    id: 0,
    title: 'Live Demo Website',
    industry: 'Cinematic Scroll Demo',
    // TODO: swap this description/image for an embedded video walkthrough once one is recorded.
    description: 'A cinematic full-scroll build with immersive video and image sections. Video walkthrough coming soon — for now, open the live demo below.',
    image: null,
    url: 'https://demo1.intelligentaisystem.com/',
    color: '#2C2A27',
    features: ['Cinematic scroll animations', 'Immersive full-viewport sections', 'Mobile responsive', 'CRO-focused copywriting'],
  },
  {
    id: 1,
    title: 'Estética Sydney',
    industry: 'Beauty & Aesthetics',
    description: 'Beauty and aesthetics business website built to convert visitors into bookings, with a polished, conversion-focused layout.',
    image: '/projects/estetica-sydney.jpg',
    url: 'https://esteticasydney.com/',
    color: '#8A5A44',
    features: [
      'Mobile responsive',
      'SEO optimised',
      'Contact form',
      'CRO-focused copywriting',
      'Google Ads conversion tracking',
      'Ongoing SEO blog content (4 posts/month)',
    ],
  },
  {
    id: 2,
    title: 'EAY Electrical',
    industry: 'Electrical Services',
    description: 'Professional electrical services website for residential and commercial clients across Australia. Modern design with service showcase and contact integration.',
    image: '/projects/eay-electrical.png',
    url: 'https://www.eayelectrical.com.au',
    color: '#1A3A5C',
    features: [
      'Mobile responsive',
      'SEO optimised',
      'Contact form',
      'CRO-focused copywriting',
      'Google Ads conversion tracking',
      'Ongoing SEO blog content (4 posts/month)',
    ],
  },
  {
    id: 3,
    title: 'Reborn Physiques',
    industry: 'Health & Fitness',
    description: 'Custom fitness and physique coaching website built to convert visitors into clients, with service showcases and seamless contact integration.',
    image: '/projects/rebornphysiques.png',
    url: 'https://rebornphysiques.com',
    color: '#1A1A1A',
    features: [
      'Mobile responsive',
      'SEO optimised',
      'Contact form',
      'CRO-focused copywriting',
      'Google Ads conversion tracking',
      'Stripe checkout integration',
      'Ongoing SEO blog content (4 posts/month)',
    ],
  },
]

// Examples for the Bespoke package ($6,999) — linked from /services#bespoke.
const bespokeProjects: Project[] = [
  {
    id: 0,
    // TODO: confirm a client-facing title/description for this build — placeholder copy below.
    title: 'Bespoke Platform Build',
    industry: 'Custom Platform',
    description: 'A fully custom, multi-page platform build with bespoke integrations, showcasing what our Bespoke tier delivers.',
    image: null,
    url: 'https://ias-build.vercel.app',
    color: '#4C3A78',
    features: [
      'Mobile responsive',
      'SEO optimised',
      'Contact form',
      'CRO-focused copywriting',
      'Google Ads conversion tracking',
      'Custom integrations',
      'Dedicated launch support',
    ],
  },
  {
    id: 1,
    title: 'Onyx Global',
    industry: 'FinTech',
    description: 'Fintech card platform website built for a global card issuing business, with a custom design suited to a financial services audience.',
    image: '/projects/onyx-global.jpg',
    url: 'https://onyxglobal.com.au',
    color: '#0F172A',
    features: [
      'Mobile responsive',
      'SEO optimised',
      'Contact form',
      'CRO-focused copywriting',
      'Google Ads conversion tracking',
      'Custom integrations',
      'Dedicated launch support',
    ],
    additionalNote: 'Fintech-grade design',
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
            Our Projects
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
            <p className="text-[#5C3D2E] text-lg font-semibold tracking-[1.5px] uppercase mb-2">
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
            <p className="text-[#5C3D2E] text-lg font-semibold tracking-[1.5px] uppercase mb-2">
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
            <p className="text-[#5C3D2E] text-lg font-semibold tracking-[1.5px] uppercase mb-2">
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
            <p className="text-[#5C3D2E] text-lg font-semibold tracking-[1.5px] uppercase mb-2">
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
