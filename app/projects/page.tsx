import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

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
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/EAY%20site-7S7pX8I1Dmy6mqs88OqeeR0avSRFuH.jpg',
    url: 'https://www.eayelectrical.com.au',
    features: ['Responsive design', 'Service showcase', 'Contact form', 'SEO optimised', 'Fast loading'],
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    industry: 'Retail',
    description: 'Complete digital transformation with AI-powered inventory management and customer analytics.',
    image: null,
    features: ['AI inventory management', 'Customer analytics', 'Payment integration', 'Order tracking', 'Mobile-first design'],
  },
  {
    id: 3,
    title: 'Healthcare Portal',
    industry: 'Healthcare',
    description: 'Secure patient management system with intelligent appointment scheduling and telemedicine integration.',
    image: null,
    features: ['Patient management', 'Appointment scheduling', 'Telemedicine', 'Secure data handling', 'HIPAA compliance'],
  },
  {
    id: 4,
    title: 'FinTech Dashboard',
    industry: 'Finance',
    description: 'Real-time financial analytics platform with automated reporting and predictive insights.',
    image: null,
    features: ['Real-time analytics', 'Automated reports', 'Predictive insights', 'Multi-currency support', 'Data visualisation'],
  },
  {
    id: 5,
    title: 'Property Management',
    industry: 'Real Estate',
    description: 'Intelligent property listing and tenant management system with automated workflows.',
    image: null,
    features: ['Property listings', 'Tenant management', 'Automated workflows', 'Document handling', 'Payment processing'],
  },
  {
    id: 6,
    title: 'Manufacturing ERP',
    industry: 'Manufacturing',
    description: 'End-to-end production tracking with AI-driven quality control and supply chain optimization.',
    image: null,
    features: ['Production tracking', 'Quality control', 'Supply chain AI', 'Inventory management', 'Reporting dashboards'],
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-[100dvh] pb-24">
      {/* Hero */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tech-baby-blue rounded-full blur-3xl opacity-10" />
        <div className="max-w-4xl mx-auto relative">
          <h1 className="text-5xl md:text-6xl font-bold text-tech-white mb-6">
            Our Projects
          </h1>
          <p className="text-xl text-tech-platinum max-w-2xl mx-auto">
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
              <div
                key={project.id}
                className="bg-tech-gray border border-tech-baby-blue/20 rounded-2xl overflow-hidden smooth-transition hover:border-tech-baby-blue hover:shadow-glow-sm"
              >
                {/* Project Image */}
                <div className="aspect-video bg-gradient-tech relative overflow-hidden">
                  {project.image ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-tech-black/20" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-tech">
                      <div className="absolute inset-0 bg-tech-baby-blue/10" />
                      <span className="relative z-10 text-tech-white text-xl font-semibold">{project.title}</span>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-tech-baby-blue to-transparent opacity-50" />
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-tech-baby-blue/10 border border-tech-baby-blue/30 text-tech-white rounded-full text-xs font-semibold mb-3">
                    {project.industry}
                  </span>
                  <h3 className="text-xl font-bold text-tech-white mb-2">{project.title}</h3>
                  <p className="text-tech-platinum text-sm mb-4 leading-relaxed">{project.description}</p>
                  
                  {/* Features */}
                  <ul className="space-y-1 mb-4">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-tech-platinum">
                        <div className="w-1 h-1 bg-tech-baby-blue rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-tech-baby-blue text-tech-black rounded-lg font-semibold text-sm smooth-transition hover:bg-tech-baby-blue-light hover:shadow-glow-sm"
                    >
                      View Project
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-4 py-2 border border-tech-baby-blue/30 text-tech-white rounded-lg font-semibold text-sm">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-tech-white mb-6">Want to Be Our Next Project?</h2>
          <p className="text-tech-platinum mb-8">
            Let us build an intelligent system tailored to your business needs.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-tech-baby-blue text-tech-black rounded-lg font-semibold text-lg smooth-transition hover:bg-tech-baby-blue-light hover:shadow-glow"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}
