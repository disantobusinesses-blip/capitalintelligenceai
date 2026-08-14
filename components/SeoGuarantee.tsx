'use client'

import { ShieldCheck, CheckCircle } from 'lucide-react'

const disclaimerItems = [
  'Applies to clients on a monthly SEO plan for 90 consecutive days',
  'Guarantee covers improvement in keyword rankings for agreed target terms',
  'Results may vary based on industry competition and starting position',
  'Free additional month of SEO service if targets are not met',
]

export default function SeoGuarantee() {
  return (
    <section className="bg-white py-[80px] px-6">
      <div
        className="max-w-[760px] mx-auto rounded-[12px] p-12 text-center"
        style={{
          border: '1px solid #E8E4DF',
          margin: '0 auto',
        }}
      >
        {/* Shield Icon */}
        <div className="flex justify-center mb-6">
          <ShieldCheck className="w-12 h-12 text-ias-brown-dark" strokeWidth={1.5} />
        </div>

        {/* Heading */}
        <h2 className="text-[32px] font-extrabold text-[#1A1A1A] mb-6">
          90-Day Ranking Guarantee
        </h2>

        {/* Body text */}
        <p className="text-[#6B6560] text-base leading-relaxed mb-8 max-w-[560px] mx-auto">
          We&apos;re so confident in our SEO process that we back it with a 90-day ranking guarantee. 
          If we don&apos;t improve your Google rankings within 90 days, we&apos;ll give you an extra month free, no questions asked.
        </p>

        {/* Disclaimer checklist */}
        <div className="text-left space-y-3 max-w-[480px] mx-auto">
          {disclaimerItems.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-[13px] text-[#6B6560] leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
