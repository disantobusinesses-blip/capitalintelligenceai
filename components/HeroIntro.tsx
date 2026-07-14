'use client'

import { display, body } from '@/lib/fonts'
import QuotePopupButton from '@/components/QuotePopupButton'

const HERO_HEADLINE = "Your Website Shouldn't Look Like Everyone Else's."
const HERO_SUBHEAD =
  'Custom-built, SEO-optimised websites for Melbourne businesses — backed by real client results, not templates.'

export default function HeroIntro() {
  return (
    <section
      id="hero"
      className={`${body.className} relative bg-[#0A0A0A] pt-[100px] pb-[80px] px-6 mt-[74px]`}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-[760px]">
          {/* Headline */}
          <h1
            className={`${display.className} text-[40px] md:text-[64px] leading-[1.1] font-semibold text-white text-balance`}
          >
            {HERO_HEADLINE}
          </h1>

          {/* Subheadline */}
          <p className="text-[18px] md:text-[20px] text-white/70 mt-6 max-w-[560px] leading-relaxed">
            {HERO_SUBHEAD}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 mt-10">
            <QuotePopupButton className="w-full sm:w-auto bg-[#C9A07A] text-[#0A0A0A] font-bold px-9 py-4 rounded-[6px] text-base text-center hover:bg-[#D9B491] transition-colors duration-200">
              Get a Free Quote
            </QuotePopupButton>

            <a
              href="#portfolio"
              className="text-white/60 hover:text-[#C9A07A] font-medium text-[15px] underline underline-offset-4 decoration-white/25 hover:decoration-[#C9A07A] transition-colors duration-200 text-center sm:text-left"
            >
              See Our Work
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
