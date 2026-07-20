'use client'

import Link from 'next/link'
import { display, body } from '@/lib/fonts'
import QuotePopupButton from '@/components/QuotePopupButton'

const HERO_SUBHEAD =
  'No templates, no shortcuts — every site backed by the same AI-driven audits and optimization we run on our own systems.'

// Real Google review — same quote already used in the site's testimonials.
const REVIEW_QUOTE =
  'The experience was incredible. Optimized my businesses presence on Google and helped with growth and insight overall.'
const REVIEW_AUTHOR = 'Dylan M.'

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#FBBF24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l2.9 6.3 6.8.9-5 4.7 1.2 6.8L12 17.6l-5.9 3.1 1.2-6.8-5-4.7 6.8-.9L12 2z" />
    </svg>
  )
}

export default function HeroIntro() {
  return (
    <section
      id="hero"
      className={`${body.className} relative bg-[#F8F7F4] pt-[100px] pb-[80px] px-6 mt-[74px]`}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-[760px]">
          {/* Headline — bold serif caps statement */}
          <h1
            className={`${display.className} text-[52px] md:text-[80px] leading-[0.95] font-bold uppercase tracking-[-0.01em] text-[#3D2817]`}
          >
            Built Different.
          </h1>

          {/* Supporting line (normal weight) */}
          <p className="text-[18px] md:text-[20px] text-[#6B6560] mt-6 max-w-[600px] leading-relaxed">
            {HERO_SUBHEAD}
          </p>

          {/* Compact pricing teaser → links through to the full /services pricing */}
          <p className="text-[15px] text-[#3D2817] font-semibold mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Packages from $1,999</span>
            <span className="text-[#C9A07A]" aria-hidden="true">|</span>
            <Link
              href="/services"
              className="text-[#5C3D2E] underline underline-offset-4 decoration-[#C9A07A]/50 hover:decoration-[#C9A07A] transition-colors duration-200"
            >
              View packages
            </Link>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 mt-9">
            <QuotePopupButton className="w-full sm:w-auto bg-[#C9A07A] text-[#3D2817] font-bold px-9 py-4 rounded-[6px] text-base text-center hover:bg-[#B98D64] transition-colors duration-200">
              Request Quote/Call
            </QuotePopupButton>

            <a
              href="#portfolio"
              className="text-[#6B6560] hover:text-[#C9A07A] font-medium text-[15px] underline underline-offset-4 decoration-[#C9A07A]/40 hover:decoration-[#C9A07A] transition-colors duration-200 text-center sm:text-left"
            >
              See Our Work
            </a>
          </div>

          {/* Single review snippet, reinforcing trust at the point of decision */}
          <div className="flex items-start gap-2.5 mt-6 max-w-[420px]">
            <div className="flex items-center gap-0.5 pt-0.5 flex-shrink-0">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <p className="text-[#6B6560] text-[13px] leading-snug">
              &ldquo;{REVIEW_QUOTE}&rdquo; <span className="text-[#3D2817] font-semibold">— {REVIEW_AUTHOR}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
