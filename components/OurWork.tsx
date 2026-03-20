'use client'

import { useState } from 'react'

const projects = [
  {
    id: 1,
    name: 'EAY Electrical',
    industry: 'Trades',
    metric: 'Ranked page 1 Google',
    link: '/projects',
  },
  {
    id: 2,
    name: 'Coming Soon',
    industry: 'Professional Services',
    metric: '',
    link: '/projects',
  },
  {
    id: 3,
    name: 'Coming Soon',
    industry: 'Local Business',
    metric: '',
    link: '/projects',
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

        {/* Project Cards */}
        <div className="grid md:grid-cols-3 gap-8">
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
              {/* Screenshot placeholder */}
              <div
                className="h-[200px] bg-[#E8E4DF] flex items-center justify-center"
              >
                <span className="text-[#6B6560] text-sm font-medium">Screenshot Coming Soon</span>
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
                  className="text-[#5C3D2E] font-semibold text-sm hover:underline transition-colors duration-200"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
