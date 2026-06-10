import TemplateCard from '@/components/TemplateCard'
import { TEMPLATES } from '@/lib/templates'

export default function LaunchTemplatesSection() {
  return (
    <section id="launch" className="bg-[#F8F7F4] pt-[40px] pb-[100px] px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10">
          <p className="text-[#1A1A1A] text-[13px] font-semibold tracking-[1.5px] uppercase mb-3">
            Ready-Made Templates
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1A1A1A] mb-4">
            Launch Your Site within 24–48 Hours
          </h2>
          <p className="text-[#5A5A5A] max-w-2xl mx-auto">
            Choose a professionally designed industry template. We customise it with your
            branding, content, and services — live within 24–48 hours of onboarding. Pick one to
            start your build instantly.
          </p>
        </div>
      </div>

      {/* Horizontal scroll keeps the section compact */}
      <div className="max-w-[1200px] mx-auto">
        <div
          className="flex gap-6 overflow-x-auto pb-4 px-1 snap-x snap-mandatory [scrollbar-width:thin]"
          role="list"
          aria-label="Ready-made website templates"
        >
          {TEMPLATES.map((t) => (
            <div
              key={t.id}
              role="listitem"
              className="snap-start shrink-0 w-[300px] sm:w-[340px]"
            >
              <TemplateCard template={t} startFlow />
            </div>
          ))}
        </div>
        <p className="text-center text-[#8A8A8A] text-sm mt-4 sm:hidden">
          Swipe to see more templates →
        </p>
      </div>
    </section>
  )
}
