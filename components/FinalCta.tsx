'use client'

import Link from 'next/link'

export default function FinalCta() {
  return (
    <section className="bg-[#1A1A1A] py-[100px] px-6 text-center">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[48px] font-extrabold text-white leading-tight mb-4">
          Ready to Get Found on Google?
        </h2>
        <p className="text-[18px] text-[#9E9790] mt-4 mb-10 max-w-xl mx-auto">
          Join businesses across Australia, the US, the UK, and Singapore getting more leads every month with AI-powered SEO websites.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#consultation"
            className="bg-white text-[#1A1A1A] font-bold px-8 py-[14px] rounded-[6px] hover:bg-[#F8F7F4] transition-colors duration-200 text-base"
          >
            Get a Free Quote
          </Link>
          <Link
            href="/services"
            className="border-2 border-white text-white font-bold px-8 py-[14px] rounded-[6px] hover:bg-white hover:text-[#1A1A1A] transition-all duration-200 text-base"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  )
}
