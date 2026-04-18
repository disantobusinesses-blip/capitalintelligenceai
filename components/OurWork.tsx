'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'

const projects = [
  {
    id: 1,
    name: 'EAY Electrical',
    industry: 'Trades',
    metric: 'Ranked page 1 Google',
    link: 'https://www.eayelectrical.com.au',
    image: '/projects/eay-electrical.png',
    imageAlt: 'EAY Electrical website screenshot',
    color: '#1A3A5C',
  },
  {
    id: 2,
    name: 'My AI Bank',
    industry: 'FinTech',
    metric: 'AI-powered banking platform',
    link: 'https://myaibank.ai',
    image: '/projects/myaibank.png',
    imageAlt: 'My AI Bank website screenshot',
    color: '#0F172A',
  },
  {
    id: 3,
    name: 'Reborn Physiques',
    industry: 'Health & Fitness',
    metric: 'Custom fitness website',
    link: 'https://rebornphysiques.com',
    image: '/projects/rebornphysiques.png',
    imageAlt: 'Reborn Physiques website screenshot',
    color: '#1A1A1A',
  },
  {
    id: 4,
    name: 'Your Coach Plus',
    industry: 'Health & Fitness',
    metric: 'PT landing page',
    link: 'https://yourcoachplus.com.au',
    image: '/projects/yourcoachplus.png',
    imageAlt: 'Your Coach Plus website screenshot',
    color: '#2D5016',
  },
]

/** Branded gradient placeholder shown when a static screenshot isn't available or fails to load */
function ProjectPlaceholder({ name, color, link }: { name: string; color: string; link: string }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3"
      style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}DD 100%)` }}
    >
      <span className="text-white text-lg font-bold tracking-wide">{name}</span>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur text-white text-xs font-medium rounded-full hover:bg-white/25 transition-colors"
      >
        Visit Live Site
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  )
}

export default function OurWork() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set())

  return (
    <section id="our-work" className="bg-white py-[80px] px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">Our Work</h2>
          <p className="text-[18px] text-[#6B6560]">Real websites. Real results.</p>
        </div>

        {/* Project Cards — 3 columns max, centred */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1140px] mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-[10px] overflow-hidden bg-white transition-all duration-200 hover:-translate-y-1"
              style={{
                boxShadow: hoveredId === project.id
                  ? '0 8px 32px rgba(0,0,0,0.14)'
                  : '0 2px 12px rgba(0,0,0,0.08)',
              }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Screenshot or branded placeholder */}
              <div className="h-[200px] bg-[#E8E4DF] overflow-hidden">
                {project.image && !failedImages.has(project.id) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                    onError={() => setFailedImages(prev => new Set([...prev, project.id]))}
                  />
                ) : (
                  <ProjectPlaceholder name={project.name} color={project.color} link={project.link} />
                )}
              </div>

              {/* Card content */}
              <div className="bg-white p-5">
                <h3 className="font-bold text-[#1A1A1A] text-base mb-2">{project.name}</h3>
                <span className="inline-block bg-[#F8F7F4] text-[#5C3D2E] text-[12px] font-medium px-3 py-1 rounded-full mb-3">
                  {project.industry}
                </span>
                {project.metric && (
                  <p className="text-[#1A1A1A] text-sm font-semibold mb-3">{project.metric}</p>
                )}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C3D2E] font-semibold text-sm hover:underline transition-colors duration-200"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-center text-[#9E9790] text-sm mt-8 italic">
          Other projects may not be shown yet.
        </p>
      </div>
    </section>
  )
}
