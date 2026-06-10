import type { Metadata } from 'next'
import Link from 'next/link'
import { Rocket } from 'lucide-react'
import TemplateCard from '@/components/TemplateCard'
import Footer from '@/components/Footer'
import { TEMPLATES, GLOBAL_ADDONS_DISCLAIMER } from '@/lib/templates'

export const metadata: Metadata = {
  title: 'Website Templates from $850 | Intelligent AI Systems',
  description:
    'Browse professionally designed industry website templates — construction, skincare, fitness, hospitality, and legal. Live within 24–48 hours from $850 + GST.',
}

export default function TemplatesPage() {
  return (
    <>
      <main className="min-h-screen bg-[#F8F7F4] text-[#1A1A1A] pt-[120px] pb-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#1A1A1A] text-[13px] font-semibold tracking-[1.5px] uppercase mb-3">
              Template Gallery
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
              Launch Your Site within 24–48 Hours
            </h1>
            <p className="text-[#5A5A5A] max-w-2xl mx-auto">
              Professionally designed industry templates, customised with your branding and
              content. Templates from $850 + GST with hosting from $59/mo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((t) => (
              <TemplateCard key={t.id} template={t} />
            ))}
          </div>

          <p className="text-center text-[#8A8A8A] text-[13px] leading-relaxed max-w-3xl mx-auto mt-10">
            {GLOBAL_ADDONS_DISCLAIMER}
          </p>

          <div className="flex justify-center mt-12">
            <Link
              href="/launch"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white font-bold px-10 py-4 rounded-[6px] text-lg hover:bg-[#2D2D2D] transition-colors duration-200"
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
