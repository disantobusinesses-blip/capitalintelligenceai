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
    title: 'My AI Bank',
    industry: 'FinTech',
    description: 'AI-powered banking platform delivering intelligent financial tools and personalised banking experiences.',
    image: 'https://image.thum.io/get/width/1200/crop/630/noanimate/https://myaibank.ai',
    url: 'https://myaibank.ai',
    features: ['AI-powered tools', 'Personalised banking', 'Intelligent insights', 'Secure platform', 'Modern UX'],
  },
  {
    id: 3,
    title: 'Reborn Physiques',
    industry: 'Health & Fitness',
    description: 'Custom fitness and physique coaching website built to convert visitors into clients, with service showcases and seamless contact integration.',
    image: 'https://image.thum.io/get/width/1200/crop/630/noanimate/https://rebornphysiques.com',
    url: 'https://rebornphysiques.com',
    features: ['Custom modern design', 'Mobile responsive', 'Service showcase', 'Contact form', 'SEO optimised'],
  },
  {
    id: 4,
    title: 'TBA',
    industry: 'TBA',
    description: 'Details to be announced.',
    image: null,
    features: [],
  },
  {
    id: 5,
    title: 'TBA',
    industry: 'TBA',
    description: 'Details to be announced.',
    image: null,
    features: [],
  },
  {
    id: 6,
    title: 'TBA',
    industry: 'TBA',
    description: 'Details to be announced.',
    image: null,
    features: [],
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
              <div
                key={project.id}
                className="bg-white border border-[#E8E4DF] rounded-[10px] overflow-hidden smooth-transition hover:border-[#5C3D2E] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              >
                {/* Project Image */}
                <div className="aspect-video bg-[#E8E4DF] relative overflow-hidden">
                  {project.image ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-[#1A1A1A]/20" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#E8E4DF]">
                      <div className="absolute inset-0 bg-[#E8E4DF]" />
                      <span className="relative z-10 text-[#6B6560] text-xl font-semibold">{project.title}</span>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#5C3D2E] to-transparent opacity-50" />
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-[#F8F7F4] border border-[#E8E4DF] text-[#1A1A1A] rounded-full text-xs font-semibold mb-3">
                    {project.industry}
                  </span>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{project.title}</h3>
                  <p className="text-[#6B6560] text-sm mb-4 leading-relaxed">{project.description}</p>
                  
                  {/* Features */}
                  <ul className="space-y-1 mb-4">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-[#6B6560]">
                        <div className="w-1 h-1 bg-[#5C3D2E] rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-sm smooth-transition hover:bg-[#2D2D2D] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                    >
                      View Project
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-4 py-2 border border-[#E8E4DF] text-[#1A1A1A] rounded-[6px] font-semibold text-sm">
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
