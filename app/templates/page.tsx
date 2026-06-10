import type { Metadata } from 'next'
import Link from 'next/link'
import { Rocket } from 'lucide-react'
import TemplateCard from '@/components/TemplateCard'
import Footer from '@/components/Footer'
import { TEMPLATES } from '@/lib/templates'

export const metadata: Metadata = {
  title: 'Website Templates from $750 | Intelligent AI Systems',
  description:
    'Browse six professionally designed industry website templates — construction, skincare, fitness, real estate, hospitality, and legal. Live in 24 hours from $750.',
}

export default function TemplatesPage() {
  return (
    <>
      <main className="min-h-screen bg-[#0a0a0a] text-white pt-[120px] pb-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-400 text-[13px] font-semibold tracking-[1.5px] uppercase mb-3">
              Template Gallery
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
              Launch Your Site in 24 Hours
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Six professionally designed industry templates, customised with your branding and
              content. Every template is $750 with hosting from $59/mo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((t) => (
              <TemplateCard key={t.id} template={t} />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link
              href="/launch"
              className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold px-10 py-4 rounded-[6px] text-lg hover:bg-emerald-600 transition-colors duration-200"
            >
              <Rocket className="w-5 h-5" />
              Launch My Site
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
