'use client'

import { MessageSquare, Code2, Search, TrendingUp } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Get a Free Quote',
    description: 'Tell us about your business. We respond within 1 hour.',
  },
  {
    number: '02',
    icon: Code2,
    title: 'We Build Your Website',
    description: 'Custom designed, SEO-optimised, and ready to rank',
  },
  {
    number: '03',
    icon: Search,
    title: 'We Start Your SEO Plan',
    description: 'Monthly blogs, keyword targeting, and AI search indexing',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'You Get More Leads',
    description: 'Watch your Google rankings and leads grow every month',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-[#F8F7F4] py-[80px] px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">How It Works</h2>
          <p className="text-[18px] text-[#6B6560]">From quote to Google rankings in 4 simple steps</p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-0 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[36px] left-[12.5%] right-[12.5%] h-px bg-[#5C3D2E] opacity-30" />

          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative flex flex-col items-center text-center px-4 mb-10 md:mb-0">
                {/* Icon circle */}
                <div className="relative z-10 w-[72px] h-[72px] bg-white rounded-full flex items-center justify-center mb-4 border-2 border-[#E8E4DF] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                  <Icon className="w-7 h-7 text-[#5C3D2E]" strokeWidth={1.5} />
                </div>

                {/* Step number */}
                <p className="text-[48px] font-extrabold text-[#E8E4DF] leading-none mb-2 -mt-2">{step.number}</p>

                {/* Title */}
                <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-2">{step.title}</h3>

                {/* Description */}
                <p className="text-[#6B6560] text-sm leading-relaxed max-w-[200px]">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
