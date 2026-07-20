import Link from 'next/link'
import { ScanSearch, Target, Layers } from 'lucide-react'
import { display, body } from '@/lib/fonts'

const POINTS = [
  {
    icon: ScanSearch,
    title: 'Audited, Not Guessed',
    body: 'Every client site runs through automated AI-powered technical audits — SEO health, Core Web Vitals, on-page scoring — before and after launch.',
    link: null as { label: string; href: string } | null,
  },
  {
    icon: Target,
    title: 'The Engine Behind Our Own Growth',
    body: "Our in-house lead intelligence engine sources and qualifies local business leads at scale. It's the same system behind our own growth — and available to B2B clients who sell to other businesses.",
    link: { label: 'See how it works', href: '/services/b2b-crm-ai-platform' },
  },
  {
    icon: Layers,
    title: 'Enterprise-Grade Stack',
    body: 'Built on the same production stack as our enterprise builds — Next.js, Supabase, Vercel — no templated agency toolkit.',
    link: null,
  },
]

export default function WhyIntelligentAISystem() {
  return (
    <section className={`${body.className} bg-white py-[80px] px-6 border-t border-[#E8E4DF]`}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-[#C9A07A] text-[13px] font-semibold tracking-[1.5px] uppercase">
            Why Intelligent AI System
          </p>
          <h2 className={`${display.className} text-[32px] md:text-[42px] font-semibold text-[#3D2817] mt-3 text-balance`}>
            Built Different From a Templated Agency
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {POINTS.map((point) => {
            const Icon = point.icon
            return (
              <div key={point.title} className="flex flex-col bg-[#F8F7F4] border border-[#E8E4DF] rounded-[10px] p-8">
                <div className="w-11 h-11 bg-white rounded-[6px] flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-[#C9A07A]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[#3D2817] font-semibold text-lg mb-3">{point.title}</h3>
                <p className="text-[#6B6560] text-sm leading-relaxed">{point.body}</p>
                {point.link && (
                  <Link
                    href={point.link.href}
                    className="mt-4 text-sm font-semibold text-[#C9A07A] hover:text-[#B98D64] underline underline-offset-2"
                  >
                    {point.link.label}
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
