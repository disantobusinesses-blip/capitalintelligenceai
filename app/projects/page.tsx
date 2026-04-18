import type { Metadata } from 'next'
import ProjectCard from '@/components/ProjectCard'

export const metadata: Metadata = {
  title: 'Our Projects – Intelligent AI Systems | Portfolio',
  description: 'Explore our portfolio of intelligent systems and websites built for businesses across Australia. From electrical services to e-commerce, healthcare, and finance.',
  keywords: 'web design portfolio, AI projects, website examples Australia, IAS projects, Intelligent AI Systems portfolio',
  openGraph: {
    title: 'Our Projects – Intelligent AI Systems',
    description: 'Intelligent systems implemented across diverse industries.',
    url: 'https://intelligentaisystem.com/projects',
    type: 'website',
  },
}

const projects = [
  {
    id: 1,
    title: 'EAY Electrical',
    industry: 'Electrical Services',
    description: 'Professional electrical services website for residential and commercial clients across Australia. Modern design with service showcase and contact integration.',
    image: '/projects/eay-electrical.png',
    url: 'https://www.eayelectrical.com.au',
    color: '#1A3A5C',
    features: ['Responsive design', 'Service showcase', 'Contact form', 'SEO optimised', 'Fast loading'],
  },
  {
    id: 2,
    title: 'My AI Bank',
    industry: 'FinTech',
    description: 'AI-powered banking platform delivering intelligent financial tools and personalised banking experiences.',
    image: '/projects/myaibank.png',
    url: 'https://myaibank.ai',
    color: '#0F172A',
    features: ['AI-powered tools', 'Personalised banking', 'Intelligent insights', 'Secure platform', 'Modern UX'],
  },
  {
    id: 3,
    title: 'Reborn Physiques',
    industry: 'Health & Fitness',
    description: 'Custom fitness and physique coaching website built to convert visitors into clients, with service showcases and seamless contact integration.',
    image: '/projects/rebornphysiques.png',
    url: 'https://rebornphysiques.com',
    color: '#1A1A1A',
    features: ['Custom modern design', 'Mobile responsive', 'Service showcase', 'Contact form', 'SEO optimised'],
  },
  {
    id: 4,
    title: 'Your Coach Plus',
    industry: 'Health & Fitness',
    description: 'Personal training landing page built to convert visitors into clients, showcasing coaching services with a clean modern design and seamless contact integration.',
    image: '/projects/yourcoachplus.png',
    url: 'https://yourcoachplus.com.au',
    color: '#2D5016',
    features: ['PT landing page', 'Mobile responsive', 'Lead capture', 'Contact form', 'SEO optimised'],
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-[100dvh] bg-[#F8F7F4] pb-24">
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
          <a
            href="mailto:sales@intelligentaisystem.com?subject=Get%20a%20Free%20Quote&body=Hello%20IAS%2C%20requesting%20a%20quote%20for%20the%20following%3A%20"
            className="inline-block px-8 py-4 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-lg smooth-transition hover:bg-[#2D2D2D] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  )
}
