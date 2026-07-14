import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { display, body } from '@/lib/fonts'

interface PortfolioProject {
  title: string
  result: string
  image: string
  url: string
}

// Real client projects — screenshots and links pulled from the /projects page.
const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    title: 'EAY Electrical',
    result: 'Residential & commercial electrical services website.',
    image: '/projects/eay-electrical.png',
    url: 'https://www.eayelectrical.com.au',
  },
  {
    title: 'Senator Developments',
    result: 'Property development site showcasing projects to buyers & investors.',
    image: '/projects/senator-developments.png',
    url: 'https://senatordevelopments.com.au',
  },
  {
    title: 'Reborn Physiques',
    result: 'Fitness coaching site built to convert visitors into clients.',
    image: '/projects/rebornphysiques.png',
    url: 'https://rebornphysiques.com',
  },
  {
    title: 'Your Coach Plus',
    result: 'Personal training landing page with integrated lead capture.',
    image: '/projects/yourcoachplus.png',
    url: 'https://yourcoachplus.com.au',
  },
  {
    title: 'My AI Bank',
    result: 'AI-powered banking platform with personalised financial tools.',
    image: '/projects/myaibank.png',
    url: 'https://myaibank.ai',
  },
  {
    title: 'Tamar Cabinets',
    result: 'Bespoke cabinetry & joinery portfolio site.',
    image: '/projects/tamar-cabinets.jpg',
    url: 'https://tamarcabinets.com.au',
  },
]

export default function PortfolioStrip() {
  return (
    <section
      id="portfolio"
      className={`${body.className} scroll-mt-[120px] bg-[#0A0A0A] pt-[64px] pb-[80px] px-6 border-t border-white/10`}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12 max-w-2xl">
          <p className="text-[#C9A07A] text-[13px] font-semibold tracking-[1.5px] uppercase">
            Proof of Work
          </p>
          <h2 className={`${display.className} text-[32px] md:text-[42px] font-semibold text-white mt-3`}>
            Real Projects. Real Businesses.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_PROJECTS.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white/[0.03] border border-white/10 rounded-[10px] overflow-hidden hover:border-[#C9A07A]/60 transition-colors duration-200"
            >
              <div className="relative aspect-video bg-white/5 overflow-hidden border-b border-white/10">
                <Image
                  src={project.image}
                  alt={`${project.title} website screenshot`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-white font-semibold text-lg mb-1.5">{project.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{project.result}</p>
                <span className="inline-flex items-center gap-1.5 text-[#C9A07A] text-sm font-semibold group-hover:gap-2.5 transition-all duration-200">
                  View Live Site
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
