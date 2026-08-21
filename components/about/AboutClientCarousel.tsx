import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import DragCarousel from '@/components/ui/drag-carousel'
import { display } from '@/lib/fonts'

/**
 * Client proof rail. Images are the existing portfolio screenshots already
 * shipped in /public/projects, so this stays in sync with the projects page
 * rather than introducing a second set of assets.
 */
const CLIENTS = [
  { name: 'EAY Electrical', industry: 'Electrical trade', image: '/projects/eay-electrical.png' },
  { name: 'Reborn Physiques', industry: 'Fitness', image: '/projects/rebornphysiques.png' },
  { name: 'Estética Sydney', industry: 'Beauty', image: '/projects/estetica-sydney-v2.png' },
  { name: 'Onyx Global', industry: 'Fintech', image: '/projects/onyx-global-v2.png' },
  {
    name: 'Azzura Consulting',
    industry: 'Professional services',
    image: '/projects/azzura-consulting.png',
  },
  { name: 'Tamar Cabinets', industry: 'Joinery', image: '/projects/tamar-cabinets.jpg' },
  {
    name: 'Certi Sustainability',
    industry: 'Sustainability',
    image: '/projects/certi-sustainability.jpg',
  },
  {
    name: 'Senator Developments',
    industry: 'Property development',
    image: '/projects/senator-developments.png',
  },
]

export default function AboutClientCarousel() {
  return (
    <DragCarousel label="IAS client work">
      {CLIENTS.map((client) => (
        // Card widths leave the next card partly visible at every breakpoint,
        // so the rail always reads as draggable without needing an affordance.
        <article
          key={client.name}
          className="w-[78%] shrink-0 snap-start sm:w-[48%] lg:w-[31%]"
        >
          <div className="overflow-hidden rounded-[10px] border border-[#E8E4DF] bg-white">
            <div className="relative aspect-[4/3] bg-[#F8F7F4]">
              <Image
                src={client.image}
                alt={`${client.name} website built by IAS`}
                fill
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 48vw, 31vw"
                className="object-cover object-top"
              />
            </div>
            <div className="px-5 py-4">
              <h3 className="text-[16px] font-semibold text-[#1A1A1A]">{client.name}</h3>
              <p className="mt-1 text-[13px] text-ias-brown-muted">{client.industry}</p>
            </div>
          </div>
        </article>
      ))}

      {/* Closing card: deliberately unlike the named cards — no screenshot, no
          client name, just the count and a way through to the full portfolio. */}
      <article className="w-[78%] shrink-0 snap-start sm:w-[48%] lg:w-[31%]">
        <Link
          href="/projects"
          className="group flex h-full flex-col items-start justify-center gap-3 rounded-[10px] border border-dashed border-ias-brown-mid/40 bg-ias-brown-dark/[0.03] px-7 py-10 transition-colors duration-200 hover:border-ias-brown-mid hover:bg-ias-brown-dark/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ias-brown-mid/50"
        >
          <span className={`${display.className} text-[40px] leading-none font-semibold text-ias-brown-dark`}>
            + Many More
          </span>
          <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-ias-brown-mid">
            View the full portfolio
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </span>
        </Link>
      </article>
    </DragCarousel>
  )
}
