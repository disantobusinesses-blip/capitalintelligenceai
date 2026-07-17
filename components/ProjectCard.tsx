'use client'

import { ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface Project {
  id: number
  title: string
  industry: string
  description: string
  image: string | null
  url?: string
  color: string
  features: string[]
}

/** Branded gradient placeholder shown when a static screenshot isn't available or fails to load */
function ProjectPlaceholder({ title, color, url }: { title: string; color: string; url?: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3"
      style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}DD 100%)` }}
    >
      <span className="text-white text-xl font-bold tracking-wide">{title}</span>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur text-white text-xs font-medium rounded-full hover:bg-white/25 transition-colors"
        >
          Visit Live Site
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  )
}

export default function ProjectCard({ project }: { project: Project }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div className="bg-white border border-[#E8E4DF] rounded-[10px] overflow-hidden smooth-transition hover:border-[#5C3D2E] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      {/* Project Image or Placeholder */}
      <div className="aspect-video bg-[#E8E4DF] relative overflow-hidden">
        {project.image && !imgFailed ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              width={640}
              height={360}
              className="absolute inset-0 w-full h-full object-cover object-top"
              onError={() => setImgFailed(true)}
            />
            <div className="absolute inset-0 bg-[#1A1A1A]/20" />
          </>
        ) : (
          <ProjectPlaceholder title={project.title} color={project.color} url={project.url} />
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
  )
}
