'use client'

import Link from 'next/link'
import { Rocket } from 'lucide-react'
import { motion } from 'framer-motion'

const HERO_HEADLINE = 'Get Found on Google. Get Recommended by AI.'

// ─── Higgsfield assets ────────────────────────────────────────────────────────
// Once Higgsfield MCP is authenticated, replace these with the generated URLs:
//   HF_VIDEO_SRC  – 6-second cinematic loop (aerial Melbourne CBD, .mp4)
//   HF_POSTER_SRC – matching still frame used as poster + mobile fallback
const HF_VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_3D9LlkxvjfIpyy2OuCRHQyhsybu/hf_20260615_031513_4b7e5c29-2a17-4030-8862-fe6f8728649c.mp4'
const HF_POSTER_SRC = ''
// ─────────────────────────────────────────────────────────────────────────────

// SVG fractalNoise grain texture — base64 encoded, tiled at opacity 0.035
const NOISE_DATA_URI =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyMDAnIGhlaWdodD0nMjAwJz48ZmlsdGVyIGlkPSduJz48ZmVUdXJidWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMC43NScgbnVtT2N0YXZlcz0nNCcgc3RpdGNoVGlsZXM9J3N0aXRjaCcvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCUyM24pJy8+PC9zdmc+'

const trustBadges = [
  'First SEO Blog Free',
  'No Lock-In Contracts',
  '90-Day Ranking Guarantee',
]

export default function HeroIntro() {
  return (
    <section
      className="relative min-h-screen pt-[100px] pb-[60px] px-6 mt-[74px] overflow-hidden bg-[#0A0A0A]"
    >
      {/* ── Video background (desktop) ─────────────────────────────────────── */}
      {/* Hidden on mobile to save bandwidth — poster image renders instead   */}
      {HF_VIDEO_SRC && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={HF_POSTER_SRC || undefined}
          aria-hidden="true"
          className="absolute inset-0 z-0 object-cover hidden md:block"
          style={{ width: '100%', height: '100vh' }}
        >
          <source src={HF_VIDEO_SRC} type="video/mp4" />
        </video>
      )}

      {/* ── Poster / mobile fallback image ─────────────────────────────────── */}
      {HF_POSTER_SRC && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={HF_POSTER_SRC}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 z-0 object-cover${HF_VIDEO_SRC ? ' md:hidden' : ''}`}
          style={{ width: '100%', height: '100vh' }}
        />
      )}

      {/* ── Dark overlay ───────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* ── Film-grain noise overlay ───────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: `url("${NOISE_DATA_URI}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.035,
          mixBlendMode: 'overlay',
        }}
      />

      {/* ── Hero content ───────────────────────────────────────────────────── */}
      <div className="relative z-20 max-w-[1200px] mx-auto">
        <div className="max-w-[760px] space-y-6">
          {/* Label */}
          <p className="text-amber-400 text-[13px] font-semibold tracking-[1.5px] uppercase">
            AI-Powered Web Agency
          </p>

          {/* Headline */}
          <h1 className="text-[36px] md:text-[52px] leading-[1.15] font-extrabold text-white text-balance">
            {HERO_HEADLINE}
          </h1>

          {/* Subheadline */}
          <p className="text-[18px] text-white/80 mt-4 max-w-[520px]">
            We build websites that rank on Google and get recommended by AI assistants like ChatGPT and Gemini, using SEO and GEO (Generative Engine Optimisation) to grow your business from every direction.{' '}
            <span className="font-semibold text-amber-300">Remote-first. Globally delivered.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            {/* Primary CTA */}
            <div className="relative inline-flex self-start w-full sm:w-auto pb-4">
              <Link
                href="/launch"
                className="relative w-full sm:w-auto bg-white text-[#1A1A1A] font-bold px-8 py-4 rounded-[6px] text-base shadow-lg hover:bg-white/90 transition-colors duration-200 flex items-center justify-center gap-2"
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
              className="border-2 border-white text-white font-semibold px-6 py-3 rounded-[6px] hover:bg-white hover:text-[#1A1A1A] transition-all duration-200 inline-block text-center w-full sm:w-auto"
            >
              View Our Work
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 pt-2">
            {trustBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-[13px] text-white/70">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
