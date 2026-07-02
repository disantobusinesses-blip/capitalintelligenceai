'use client'

import Link from 'next/link'
import { Rocket } from 'lucide-react'
import { motion } from 'framer-motion'

const HERO_HEADLINE = 'Get Found on Google. Get Recommended by AI.'


const trustBadges = [
  'First SEO Blog Free',
  'No Lock-In Contracts',
  '90-Day Ranking Guarantee',
]

export default function HeroIntro() {
  return (
    <section
      className="relative min-h-screen pt-[100px] pb-[60px] px-6 mt-[74px] overflow-hidden bg-[#F8F7F4]"
    >
      {/* ── Hero content ───────────────────────────────────────────────────── */}
      <div className="relative max-w-[1200px] mx-auto">
        <div className="max-w-[760px] space-y-6">
          {/* Label */}
          <p className="text-[#5C3D2E] text-[13px] font-semibold tracking-[1.5px] uppercase">
            AI-Powered Web Agency
          </p>

          {/* Headline */}
          <h1 className="text-[36px] md:text-[52px] leading-[1.15] font-extrabold text-[#1A1A1A] text-balance">
            {HERO_HEADLINE}
          </h1>

          {/* Subheadline */}
          <p className="text-[18px] text-[#6B6560] mt-4 max-w-[520px]">
            We build websites that rank on Google and get recommended by AI assistants like ChatGPT and Gemini, using SEO and GEO (Generative Engine Optimisation) to grow your business from every direction.{' '}
            <span className="font-semibold text-[#1A1A1A]">Remote-first. Globally delivered.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            {/* Primary CTA */}
            <div className="relative inline-flex self-start w-full sm:w-auto pb-4">
              <Link
                href="/launch"
                className="relative w-full sm:w-auto bg-[#1A1A1A] text-white font-bold px-8 py-4 rounded-[6px] text-base shadow-lg hover:bg-[#2D2D2D] transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Launch My Site
              </Link>
              {/* Animated hand-drawn loop */}
              <motion.svg
                className="absolute -bottom-1 left-0 w-full overflow-visible pointer-events-none"
                viewBox="0 0 300 18"
                height="18"
                preserveAspectRatio="none"
                initial="hidden"
                animate="visible"
              >
                <motion.path
                  d="M 6 10 Q 75 2, 150 10 Q 225 18, 294 10"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="3"
                  strokeLinecap="round"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                      pathLength: 1,
                      opacity: 1,
                      transition: {
                        pathLength: { duration: 2, ease: [0.43, 0.13, 0.23, 0.96], repeat: Infinity, repeatDelay: 4 },
                        opacity: { duration: 0.4 },
                      },
                    },
                  }}
                />
              </motion.svg>
            </div>
            {/* Secondary CTA */}
            <a
              href="#our-work"
              className="border-2 border-[#1A1A1A] text-[#1A1A1A] font-semibold px-6 py-3 rounded-[6px] hover:bg-[#1A1A1A] hover:text-white transition-all duration-200 inline-block text-center w-full sm:w-auto"
            >
              View Our Work
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 pt-2">
            {trustBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-[13px] text-[#6B6560]">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
