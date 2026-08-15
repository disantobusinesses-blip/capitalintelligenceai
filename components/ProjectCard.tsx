'use client'

import { Check, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import BrowserFrame from '@/components/ui/browser-frame'
import Disclosure from '@/components/ui/disclosure'
import { domainFromUrl } from '@/lib/domain'

interface Project {
  id: number
  title: string
  industry: string
  description: string
  image: string | null
  url?: string
  color: string
  features: string[]
  /** A style/descriptive line shown under the ticked features, without a checkmark. */
  additionalNote?: string
}

/** Branded gradient placeholder shown when a static screenshot isn't available or fails to load */
function ProjectPlaceholder({ title, color, url }: { title: string; color: string; url?: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3"
      style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}DD 100%)` }}
    >
      <span className="text-white text-lg font-bold tracking-wide text-center px-4">{title}</span>
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

/**
 * A single project card.
 *
 * Collapsed by default at every breakpoint: screenshot, category, name, a
 * two-line description and the two actions. The full bullet list sits behind
 * the "What we built" disclosure, because rendering every bullet expanded made
 * each card several screens tall on mobile.
 */
export default function ProjectCard({ project }: { project: Project }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div className="flex h-full flex-col bg-white border border-[#E8E4DF] rounded-[10px] overflow-hidden smooth-transition hover:border-ias-brown-dark hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="p-3 pb-0">
        <BrowserFrame domain={project.url ? domainFromUrl(project.url) : project.title}>
          {project.image && !imgFailed ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.image}
              alt={`${project.title} website screenshot`}
              loading="lazy"
              width={640}
              height={400}
              className="absolute inset-0 w-full h-full object-cover object-top"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <ProjectPlaceholder title={project.title} color={project.color} url={project.url} />
          )}
        </BrowserFrame>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <span className="inline-block self-start px-2.5 py-1 bg-[#F8F7F4] border border-[#E8E4DF] text-[#1A1A1A] rounded-full text-[11px] font-semibold mb-2.5">
          {project.industry}
        </span>
        <h3 className="text-[17px] md:text-lg font-bold text-[#1A1A1A] mb-1.5 text-balance">{project.title}</h3>
        {/* Clamped to two lines: the full description stays in the DOM for
            crawlers and screen readers, it is only visually truncated. */}
        <p className="text-[#6B6560] text-[13px] leading-relaxed line-clamp-2">{project.description}</p>

        {/* Actions pinned to the card's base so a grid of cards keeps its
            buttons on one line regardless of description length. */}
        <div className="mt-auto pt-4">
          <div className="flex items-center gap-2">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-[13px] smooth-transition hover:bg-[#2D2D2D]"
              >
                View Project
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-3.5 py-2 border border-[#E8E4DF] text-[#1A1A1A] rounded-[6px] font-semibold text-[13px]">
                Coming Soon
              </span>
            )}
          </div>

          <div className="mt-3 border-t border-[#E8E4DF] pt-3">
            <Disclosure
              label="What we built"
              triggerClassName="text-[13px] font-semibold text-ias-brown-dark hover:text-ias-brown-mid"
              meta={
                <span className="text-[11px] font-normal text-[#6B6560]">
                  {project.features.length}
                </span>
              }
            >
              <ul className="space-y-1.5 pt-3">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[12.5px] leading-relaxed text-[#6B6560]">
                    <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    {feature}
                  </li>
                ))}
              </ul>
              {project.additionalNote && (
                <p className="mt-2.5 text-[12.5px] italic text-[#9E684C]">{project.additionalNote}</p>
              )}
            </Disclosure>
          </div>
        </div>
      </div>
    </div>
  )
}
