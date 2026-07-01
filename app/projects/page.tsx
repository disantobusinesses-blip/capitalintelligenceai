import type { Metadata } from 'next'
import ProjectCard from '@/components/ProjectCard'
import QuotePopupButton from '@/components/QuotePopupButton'

export const metadata: Metadata = {
  title: 'Our Projects – Intelligent AI Systems | Portfolio',
  description: 'Explore IAS\'s portfolio of websites built for businesses across Australia — electrical, fitness, property, fintech, and more.',
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

const projects = [
  {
    id: 0,
    title: 'Tamar Cabinets PTY LTD',
    industry: 'Cabinetry & Joinery',
    description: 'Bespoke cabinetry and joinery website for a Melbourne-based craftsman. Modern design showcasing their handcrafted kitchen and furniture work with a premium aesthetic.',
    image: '/projects/tamar-cabinets.jpg',
    url: 'https://tamarcabinets.com.au',
    color: '#E8A54B',
    features: ['Modern design', 'Portfolio showcase', 'Mobile responsive', 'Contact form', 'SEO optimised'],
  },
  {
    id: 1,
    title: 'Live Demo Website',
    industry: 'Landing Page Demo',
    description: 'See what a premium landing page looks like before you commit. This live demo showcases our design quality, mobile responsiveness, and conversion-focused layout.',
    image: '/projects/live-demo.jpg',
    url: 'https://demo.intelligentaisystem.com',
    color: '#2C2A27',
    features: ['Live preview', 'Mobile responsive', 'Modern design', 'Conversion focused', 'Fast loading'],
  },
  {
    id: 2,
    title: 'EAY Electrical',
    industry: 'Electrical Services',
    description: 'Professional electrical services website for residential and commercial clients across Australia. Modern design with service showcase and contact integration.',
    image: '/projects/eay-electrical.png',
    url: 'https://www.eayelectrical.com.au',
    color: '#1A3A5C',
    features: ['Responsive design', 'Service showcase', 'Contact form', 'SEO optimised', 'Fast loading'],
  },
  {
    id: 3,
    title: 'My AI Bank',
    industry: 'FinTech',
    description: 'AI-powered banking platform delivering intelligent financial tools and personalised banking experiences.',
    image: '/projects/myaibank.png',
    url: 'https://myaibank.ai',
    color: '#0F172A',
    features: ['AI-powered tools', 'Personalised banking', 'Intelligent insights', 'Secure platform', 'Modern UX'],
  },
  {
    id: 4,
    title: 'Reborn Physiques',
    industry: 'Health & Fitness',
    description: 'Custom fitness and physique coaching website built to convert visitors into clients, with service showcases and seamless contact integration.',
    image: '/projects/rebornphysiques.png',
    url: 'https://rebornphysiques.com',
    color: '#1A1A1A',
    features: ['Custom modern design', 'Mobile responsive', 'Service showcase', 'Contact form', 'SEO optimised'],
  },
  {
    id: 5,
    title: 'Your Coach Plus',
    industry: 'Health & Fitness',
    description: 'Personal training landing page built to convert visitors into clients, showcasing coaching services with a clean modern design and seamless contact integration.',
    image: '/projects/yourcoachplus.png',
    url: 'https://yourcoachplus.com.au',
    color: '#2D5016',
    features: ['PT landing page', 'Mobile responsive', 'Lead capture', 'Contact form', 'SEO optimised'],
  },
  {
    id: 6,
    title: 'Senator Developments',
    industry: 'Property Development',
    description: 'Professional property development website showcasing residential and commercial projects across Australia, with a modern design built to attract buyers and investors.',
    image: '/projects/senator-developments.png',
    url: 'https://senatordevelopments.com.au',
    color: '#2C3E50',
    features: ['Modern design', 'Project showcase', 'Mobile responsive', 'Contact form', 'SEO optimised'],
  },
]

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

      {/* Projects Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
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
