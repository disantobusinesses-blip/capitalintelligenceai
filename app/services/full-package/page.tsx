'use client'

import Link from 'next/link'
import { ArrowLeft, Check, Package } from 'lucide-react'
import QuotePopupButton from '@/components/QuotePopupButton'

const features = [
  'Custom multi-page design (up to 10 pages)',
  'Mobile responsive & fast loading',
  'Contact forms, map & social links included',
  'Google Analytics dashboard setup',
  'SEO + AI search indexing (ChatGPT, Gemini, Perplexity)',
  'Ongoing maintenance options available',
  '5 free SEO-optimised blog articles included',
  'Professional copywriting & content strategy',
  'Domain & hosting setup assistance',
  'Launch support & handover notes',
]

export default function FullPackageService() {
  return (
    <main className="min-h-[100dvh] bg-[#F8F7F4] pt-[74px]">
      {/* Header */}
      <header className="py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/services"
            className="flex items-center gap-2 text-[#6B6560] hover:text-[#1A1A1A] transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Services
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[6px] bg-[#F8F7F4] border border-[#E8E4DF] flex items-center justify-center">
              <Package className="w-5 h-5 text-[#5C3D2E]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1A1A1A]">Intelligent AI Systems</h3>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#5C3D2E] text-[13px] font-semibold tracking-[1.5px] uppercase mb-3">
            Web Design
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-6 leading-tight">
            Custom Website
          </h1>
          <p className="text-xl text-[#6B6560] mb-8 leading-relaxed max-w-2xl mx-auto">
            A fully custom-built website tailored to your brand and business goals — designed to convert visitors into leads and rank on Google from day one.
          </p>
          {/* Price range */}
          <div
            className="inline-block bg-white rounded-[10px] px-8 py-6 text-center"
            style={{ border: '1px solid #E8E4DF' }}
          >
            <p className="text-[13px] font-semibold text-[#9E9790] uppercase tracking-widest mb-1">Price range</p>
            <p className="text-[40px] font-extrabold text-[#1A1A1A] leading-none">A$1,999 – A$5,999 <span className="text-[12px] font-normal text-[#9E9790]">+ GST</span></p>
            <p className="text-[13px] text-[#9E9790] mt-2">one-time · custom quote upon request</p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-6" style={{ borderTop: '1px solid #E8E4DF' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3 text-center">What&apos;s Included</h2>
          <p className="text-[#6B6560] text-center mb-10 text-base">
            Every custom website comes with everything you need to launch and grow online.
          </p>
          <div className="bg-white rounded-[10px] p-8" style={{ border: '1px solid #E8E4DF' }}>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-[#1A1A1A] text-[15px]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SEO Blogs Highlight */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1A1A1A] rounded-[10px] p-10 text-center">
            <p className="text-[13px] font-semibold text-[#9E9790] uppercase tracking-widest mb-3">Bonus Included</p>
            <p className="text-[52px] font-extrabold text-white leading-none mb-2">5</p>
            <p className="text-[18px] font-semibold text-white mb-3">Free SEO-Optimised Blog Articles</p>
            <p className="text-[#9E9790] text-base max-w-xl mx-auto">
              Every custom website package includes 5 professionally written, SEO-optimised blog articles to give your Google rankings a head start from the moment you launch.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
            Ready to Get a Custom Quote?
          </h2>
          <p className="text-[#6B6560] mb-8 text-base">
            Tell us about your business and we&apos;ll put together a tailored proposal — no obligation.
          </p>
          <QuotePopupButton
            service="Custom Website"
            className="inline-block px-8 py-4 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-base transition-colors duration-200 hover:bg-[#2D2D2D]"
          >
            Get a Free Quote
          </QuotePopupButton>
        </div>
      </section>
    </main>
  )
}
