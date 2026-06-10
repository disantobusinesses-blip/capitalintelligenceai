import Link from 'next/link'
import { Rocket } from 'lucide-react'
import TemplateCard from '@/components/TemplateCard'
import { TEMPLATES } from '@/lib/templates'

export default function LaunchTemplatesSection() {
  return (
    <section id="launch" className="bg-[#F8F7F4] py-[100px] px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#1A1A1A] text-[13px] font-semibold tracking-[1.5px] uppercase mb-3">
            Ready-Made Templates
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1A1A1A] mb-4">
            Launch Your Site within 24–48 Hours
          </h2>
          <p className="text-[#5A5A5A] max-w-2xl mx-auto">
            Choose from six professionally designed industry templates. We customise it with
            your branding, content, and services — live within 24–48 hours of onboarding.
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
            className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white font-bold px-10 py-4 rounded-[6px] text-lg hover:bg-[#2D2D2D] transition-colors duration-200"
          >
            <Rocket className="w-5 h-5" />
            Launch My Site
          </Link>
        </div>
      </div>
    </section>
  )
}
