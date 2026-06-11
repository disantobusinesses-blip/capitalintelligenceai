import Link from 'next/link'
import { ArrowRight, Check, Palette, Rocket } from 'lucide-react'

const TEMPLATE_POINTS = [
  'Professionally designed industry templates',
  'Customised with your branding & content',
  'Live within 24–48 hours',
]

const CUSTOM_POINTS = [
  'Custom landing page or full website',
  'Tailored design built around your business',
  'Book a free consultation to scope it out',
]

export default function PathChooser() {
  return (
    <section id="launch" className="bg-[#F8F7F4] pt-[40px] pb-[100px] px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-10">
          <p className="text-[#1A1A1A] text-[13px] font-semibold tracking-[1.5px] uppercase mb-3">
            Get Started
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1A1A1A] mb-4">
            Choose how you&apos;d like to start
          </h2>
          <p className="text-[#5A5A5A] max-w-2xl mx-auto">
            Two simple paths — pick a ready-made template and go live fast, or have us build
            something custom for your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Path 1 — Template */}
          <div className="flex flex-col rounded-2xl bg-white border border-[#E8E4DF] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-12 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center">
                <Rocket className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-2xl font-extrabold text-[#1A1A1A]">Pick a Template</h3>
                <p className="text-[#5C3D2E] font-semibold text-sm">
                  From $850 +GST · Live in 24–48 hrs
                </p>
              </div>
            </div>
            <ul className="space-y-2.5 mb-8 flex-1">
              {TEMPLATE_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2 text-[15px] text-[#5A5A5A]">
                  <Check className="w-4 h-4 mt-1 shrink-0 text-[#1A1A1A]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/launch?type=template"
              className="inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-white font-bold px-6 py-4 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200"
            >
              Pick a Template
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Path 2 — Custom */}
          <div className="flex flex-col rounded-2xl bg-white border border-[#E8E4DF] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-12 rounded-full bg-[#5C3D2E] text-white flex items-center justify-center">
                <Palette className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-2xl font-extrabold text-[#1A1A1A]">Custom Landing Page or Site</h3>
                <p className="text-[#5C3D2E] font-semibold text-sm">
                  From $1,999 · Tailored to your business
                </p>
              </div>
            </div>
            <ul className="space-y-2.5 mb-8 flex-1">
              {CUSTOM_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2 text-[15px] text-[#5A5A5A]">
                  <Check className="w-4 h-4 mt-1 shrink-0 text-[#1A1A1A]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/launch?type=custom"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold px-6 py-4 rounded-[6px] hover:bg-[#1A1A1A] hover:text-white transition-colors duration-200"
            >
              Build Something Custom
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <p className="text-center text-[#8A8A8A] text-sm mt-8">
          Just browsing?{' '}
          <Link href="/templates" className="font-semibold text-[#1A1A1A] underline">
            View all templates
          </Link>
        </p>
      </div>
    </section>
  )
}
