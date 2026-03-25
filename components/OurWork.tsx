'use client'

import { useState } from 'react'

const projects = [
  {
    id: 1,
    name: 'EAY Electrical',
    industry: 'Trades',
    metric: 'Ranked page 1 Google',
    link: 'https://www.eayelectrical.com.au',
    image: 'https://image.thum.io/get/width/1266/crop/574/https://www.eayelectrical.com.au',
    imageAlt: 'EAY Electrical website screenshot',
  },
  {
    id: 2,
    name: 'My AI Bank',
    industry: 'FinTech',
    metric: 'AI-powered banking platform',
    link: 'https://myaibank.ai',
    image: 'https://image.thum.io/get/width/1266/crop/574/https://myaibank.ai',
    imageAlt: 'My AI Bank website screenshot',
  },
]

export default function OurWork() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="our-work" className="bg-white py-[80px] px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">Our Work</h2>
          <p className="text-[18px] text-[#6B6560]">Real websites. Real results.</p>
        </div>

        {/* Project Cards — 2 columns max, centred */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-[760px] mx-auto">
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
              {/* Screenshot */}
              <div className="h-[200px] bg-[#E8E4DF] overflow-hidden">
                {project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#F8F7F4]">
                    <span className="text-[#6B6560] text-sm font-medium">Screenshot Coming Soon</span>
                  </div>
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
