import type { Metadata } from 'next'
import Image from 'next/image'

import { display, body } from '@/lib/fonts'
import QuotePopupButton from '@/components/QuotePopupButton'
import AboutProcess from '@/components/about/AboutProcess'
import AboutStats from '@/components/about/AboutStats'
import AboutClientCarousel from '@/components/about/AboutClientCarousel'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'About IAS – Melbourne Web Design Studio | Built Different',
  description:
    'IAS is a Melbourne-based web design and development studio, built and run by its founder, Stefano. Premium, fast, technically sound websites at a fixed price.',
  keywords:
    'about IAS, Stefano, Melbourne web design studio, web development Melbourne, technical SEO, fixed price websites',
  alternates: {
    canonical: 'https://intelligentaisystem.com/about',
  },
  openGraph: {
    title: 'About IAS – Melbourne Web Design Studio',
    description:
      'A Melbourne-based web design and development studio, built and run by its founder, Stefano.',
    url: 'https://intelligentaisystem.com/about',
    type: 'website',
  },
}

const FOUNDER_PHOTO = '/images/founder-stefano.png'

export default function AboutPage() {
  return (
    <main className={`${body.className} min-h-[100dvh] bg-[#F8F7F4] pb-24 pt-[74px]`}>
      {/* SECTION 1 — Hero. Split layout: copy left, founder photo right, stacked
          on mobile with the photo second so the headline still leads. */}
      <section className="px-6 pt-[64px] pb-[72px] md:pt-[80px]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h1
              className={`${display.className} text-[52px] leading-[0.95] font-bold tracking-[-0.01em] text-ias-brown-dark text-balance uppercase md:text-[76px]`}
            >
              Built Different
            </h1>
            <p className="mt-6 max-w-[520px] text-[18px] leading-relaxed text-ias-brown-muted text-pretty md:text-[20px]">
              IAS is a Melbourne-based web design and development studio, built and run by its
              founder, Stefano.
            </p>
            <QuotePopupButton className="mt-9 w-full rounded-[6px] bg-ias-brown-dark px-9 py-4 text-center text-base font-bold text-white transition-colors duration-200 hover:bg-ias-brown-mid sm:w-auto">
              Request Quote/Call
            </QuotePopupButton>
          </div>

          {/* The frame takes its height from the photo's own ratio rather than
              forcing a fixed aspect box, so the portrait is never cropped. */}
          <div className="relative mx-auto w-full max-w-[440px] md:mx-0">
            <div className="relative overflow-hidden rounded-[10px] border border-[#E8E4DF] bg-white">
              {FOUNDER_PHOTO ? (
                <Image
                  src={FOUNDER_PHOTO}
                  alt="Stefano, founder of IAS"
                  width={1080}
                  height={1080}
                  priority
                  sizes="(max-width: 768px) 90vw, 440px"
                  className="block h-auto w-full"
                />
              ) : (
                <div className="flex aspect-square w-full items-center justify-center bg-ias-brown-dark/[0.04]">
                  <span className="text-[13px] font-medium tracking-[0.08em] text-ias-brown-muted uppercase">
                    Founder photo
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Founder story */}
      <section className="border-t border-[#E8E4DF] bg-white px-6 py-[72px] md:py-[88px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-[760px]">
            <h2
              className={`${display.className} text-[36px] leading-tight font-semibold text-ias-brown-dark text-balance md:text-[48px]`}
            >
              Meet Stefano
            </h2>
            <div className="mt-8 flex flex-col gap-5 text-[17px] leading-relaxed text-ias-brown-muted">
              <p>
                Most agencies sell slow builds, generic templates, and SEO as an afterthought, at
                agency prices. IAS exists to do it properly instead — and I oversee every build
                personally, from first draft to final launch.
              </p>
              {/* The studio's method, given the page's one accent treatment so it
                  reads as the takeaway rather than another paragraph. */}
              <p className="mt-1 border-l-2 border-ias-brown-mid pl-6 text-[19px] leading-relaxed font-medium text-ias-brown-dark md:text-[21px]">
                Every website is built through an AI-accelerated workflow that compresses design,
                development, and technical SEO into days, not months, without cutting quality.
              </p>
            </div>
            <p className="mt-10 text-sm text-ias-brown-muted">ABN: 38 693 023 371</p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Process */}
      <section className="border-t border-[#E8E4DF] px-6 py-[72px] md:py-[88px]">
        <div className="mx-auto max-w-[1200px]">
          <h2
            className={`${display.className} mb-12 max-w-[620px] text-[36px] leading-tight font-semibold text-ias-brown-dark text-balance md:mb-16 md:text-[48px]`}
          >
            How IAS Builds Different
          </h2>
          <AboutProcess />
        </div>
      </section>

      {/* SECTION 4 — Stats */}
      <section className="border-t border-[#E8E4DF] bg-white px-6 py-[72px] md:py-[88px]">
        <div className="mx-auto max-w-[1200px]">
          <AboutStats />
        </div>
      </section>

      {/* SECTION 5 — Client proof */}
      <section className="border-t border-[#E8E4DF] px-6 py-[72px] md:py-[88px]">
        <div className="mx-auto max-w-[1200px]">
          <h2
            className={`${display.className} mb-4 max-w-[620px] text-[36px] leading-tight font-semibold text-ias-brown-dark text-balance md:text-[48px]`}
          >
            Real Businesses, Built Different
          </h2>
          <p className="mb-10 max-w-[660px] text-[17px] leading-relaxed text-ias-brown-muted text-pretty">
            Trades, fitness, beauty, professional services, property, and fintech.
          </p>
          <AboutClientCarousel />
        </div>
      </section>

      {/* SECTION 6 — CTA */}
      <section className="border-t border-[#E8E4DF] px-6 py-[72px] md:py-[88px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-[620px]">
            <h2
              className={`${display.className} text-[36px] leading-tight font-semibold text-ias-brown-dark text-balance md:text-[48px]`}
            >
              Ready to Build Different?
            </h2>
            <p className="mt-5 mb-9 text-[17px] leading-relaxed text-ias-brown-muted text-pretty">
              Book a free 15-minute consultation and see what IAS can build for your business.
            </p>
            <QuotePopupButton className="w-full rounded-[6px] bg-ias-brown-dark px-9 py-4 text-center text-base font-bold text-white transition-colors duration-200 hover:bg-ias-brown-mid sm:w-auto">
              Request Quote/Call
            </QuotePopupButton>
          </div>
        </div>
      </section>
    </main>
  )
}
