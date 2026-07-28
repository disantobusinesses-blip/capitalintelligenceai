import Link from 'next/link'
import { ArrowRight, ExternalLink, ImageOff } from 'lucide-react'
import { display, body } from '@/lib/fonts'
import PortfolioCardImage from '@/components/PortfolioCardImage'

interface LiveProject {
  title: string
  result: string
  image: string
  /** Omitted when the live URL hasn't been confirmed, card renders without a link. */
  url?: string
  placeholder?: false
}

interface PlaceholderProject {
  title: string
  placeholderNote: string
  placeholder: true
}

type PortfolioProject = LiveProject | PlaceholderProject

// Real client projects, screenshots and links pulled from the /projects page.
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
    title: 'Onyx Global',
    result: 'Fintech card platform website.',
    image: '/projects/onyx-global.jpg',
    url: 'https://onyxglobal.com.au',
  },
  {
    title: 'Estética Sydney',
    result: 'Beauty and aesthetics business website.',
    image: '/projects/estetica-sydney.jpg',
    url: 'https://esteticasydney.com/',
  },
  {
    title: 'Certi Sustainability',
    result: 'ESD and building compliance consultancy website.',
    image: '/projects/certi-sustainability.jpg',
    url: 'https://www.certisustainability.com/',
  },
]

export default function PortfolioStrip() {
  return (
    <section
      id="portfolio"
      className={`${body.className} scroll-mt-[120px] bg-[#F8F7F4] pt-[64px] pb-[80px] px-6 border-t border-[#E8E4DF]`}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[#C9A07A] text-[13px] font-semibold tracking-[1.5px] uppercase">
              Proof of Work
            </p>
            <h2 className={`${display.className} text-[32px] md:text-[42px] font-semibold text-[#3D2817] mt-3`}>
              Real Projects. Real Businesses.
            </h2>
          </div>
          <Link
            href="/projects"
            className="flex-shrink-0 inline-flex items-center gap-2 border border-[#3D2817] text-[#3D2817] font-semibold px-5 py-2.5 rounded-[6px] hover:bg-[#3D2817] hover:text-white transition-colors duration-200"
          >
            View All Work
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_PROJECTS.map((project) =>
            project.placeholder ? (
              <div
                key={project.title}
                className="block bg-white border border-[#E8E4DF] rounded-[10px] overflow-hidden"
              >
                <div className="relative aspect-video bg-[#F0EDE7] border-b border-[#E8E4DF] flex flex-col items-center justify-center gap-2 px-6 text-center">
                  <ImageOff className="w-6 h-6 text-[#9E9790]" strokeWidth={1.5} />
                  <span className="text-[#9E9790] text-xs font-medium leading-relaxed">
                    [PLACEHOLDER: {project.placeholderNote}]
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-[#3D2817] font-semibold text-lg mb-1.5">{project.title}</h3>
                  <span className="inline-flex items-center gap-1.5 text-[#9E9790] text-sm font-semibold">
                    Coming Soon
                  </span>
                </div>
              </div>
            ) : (
              (() => {
                const Wrapper = project.url ? 'a' : 'div'
                return (
                  <Wrapper
                    key={project.title}
                    {...(project.url
                      ? { href: project.url, target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="group block bg-white border border-[#E8E4DF] rounded-[10px] overflow-hidden hover:border-[#C9A07A] transition-colors duration-200"
                  >
                    <div className="relative aspect-video bg-[#F0EDE7] overflow-hidden border-b border-[#E8E4DF]">
                      <PortfolioCardImage
                        src={project.image}
                        alt={`${project.title} website screenshot`}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-[#3D2817] font-semibold text-lg mb-1.5">{project.title}</h3>
                      <p className="text-[#6B6560] text-sm leading-relaxed mb-4">{project.result}</p>
                      {project.url && (
                        <span className="inline-flex items-center gap-1.5 text-[#C9A07A] text-sm font-semibold group-hover:gap-2.5 transition-all duration-200">
                          View Live Site
                          <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </Wrapper>
                )
              })()
            )
          )}
        </div>
      </div>
    </section>
  )
}
