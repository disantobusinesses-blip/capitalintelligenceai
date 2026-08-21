import Link from 'next/link'
import { ArrowRight, Palette, Rocket } from 'lucide-react'

const CUSTOM_TIERS = [
  { label: 'Landing Pages', price: '$599 to $1,999 +GST' },
  { label: 'Custom Websites', price: '$1,999 to $5,999 +GST' },
  { label: 'Cinematic Custom Website Design', price: '$3,499 to $10,000 +GST' },
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
            Two simple paths, pick a ready-made template and go live fast, or have us build
            something custom for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {/* Path 1, Template */}
          <div className="flex flex-col rounded-2xl bg-white border border-[#E8E4DF] p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-12 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center shrink-0">
                <Rocket className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-[#1A1A1A]">Pick a Template</h3>
                <p className="text-ias-brown-dark font-semibold text-sm">
                  From $850 +GST · Live in 24–48 hrs
                </p>
              </div>
            </div>
            <Link
              href="/services"
              className="mt-auto inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-white font-bold px-6 py-4 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200"
            >
              Pick a Template
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Path 2, Custom */}
          <div className="flex flex-col rounded-2xl bg-white border border-[#E8E4DF] p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-12 h-12 rounded-full bg-ias-brown-dark text-white flex items-center justify-center shrink-0">
                <Palette className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-[#1A1A1A]">
                  Custom Landing Page or Site
                </h3>
                <p className="text-ias-brown-dark font-semibold text-sm">Tailored to your business</p>
              </div>
            </div>
            {/* Three pricing tiers, full-width rows that always stay inside the card */}
            <div className="space-y-2 mb-6">
              {CUSTOM_TIERS.map((tier) => (
                <div
                  key={tier.label}
                  className="flex items-center justify-between gap-3 rounded-lg bg-[#F8F7F4] border border-[#E8E4DF] px-3 py-2"
                >
                  <span className="text-[13px] font-semibold text-[#1A1A1A] leading-tight">
                    {tier.label}
                  </span>
                  <span className="text-[13px] font-bold text-ias-brown-dark text-right">
                    {tier.price}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/services"
              className="mt-auto inline-flex items-center justify-center gap-2 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold px-6 py-4 rounded-[6px] hover:bg-[#1A1A1A] hover:text-white transition-colors duration-200"
            >
              Build Something Custom
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <p className="text-center text-[#8A8A8A] text-sm mt-8">
          Just browsing?{' '}
          <Link href="/projects" className="font-semibold text-[#1A1A1A] underline">
            View all projects
          </Link>
        </p>
      </div>
    </section>
  )
}
