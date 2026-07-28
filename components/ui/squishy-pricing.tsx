'use client'

import Link from 'next/link'
import { motion, MotionConfig, type Transition, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { display, body } from '@/lib/fonts'
import QuotePopupButton from '@/components/QuotePopupButton'
import type { QuoteService } from '@/context/QuotePopupContext'

/**
 * Homepage pricing teaser. Deliberately shows headline price + one line per
 * package only — /services keeps the full comparison cards with feature lists
 * and the "Everything in X, plus" pattern. This is the hook, that page is the
 * detail.
 */

const SPRING: Transition = { type: 'spring', stiffness: 260, damping: 18, mass: 0.6 }

/* The card squishes and its corners round off. Children below inherit these
   variant names from the card, so hovering (desktop) or tapping (touch)
   drives the whole composition from one gesture. */
const cardVariants: Variants = {
  rest: { scale: 1, borderRadius: 16 },
  squish: { scale: 0.97, borderRadius: 44 },
}

/* Two blobs with an identical command sequence (M, C, C, C, C, Z) so the path
   can be interpolated between them. */
const BLOB_REST =
  'M 40 104 C 40 62, 82 38, 122 50 C 162 62, 182 100, 160 140 C 138 180, 78 182, 54 152 C 30 122, 40 146, 40 104 Z'
const BLOB_SQUISH =
  'M 28 116 C 34 68, 92 26, 132 46 C 172 66, 192 108, 166 152 C 140 196, 68 194, 44 158 C 20 122, 22 164, 28 116 Z'

const blobVariants: Variants = {
  rest: { d: BLOB_REST },
  squish: { d: BLOB_SQUISH },
}

const circleVariants: Variants = {
  rest: { cx: 168, cy: 36, r: 26 },
  squish: { cx: 146, cy: 58, r: 44 },
}

const squareVariants: Variants = {
  rest: { x: 8, y: 150, width: 44, height: 44, rx: 10, rotate: 0 },
  squish: { x: 22, y: 130, width: 58, height: 58, rx: 28, rotate: 22 },
}

interface Tier {
  /** Pre-selects the matching option in the site-wide quote popup. */
  service: QuoteService
  label: string
  price: string
  subLabel: string
  description: string
  cta: string
  /** Reads the logo tone from globals.css rather than hardcoding the hex. */
  background: string
  /** Fill for the morphing shapes, kept low-opacity so they read as texture. */
  shapeClass: string
  /** Foreground classes are per-tier: white clears AA on the two darker
      tones (12.2:1 and 5.8:1) but only manages 2.4:1 on the lightest, which
      therefore takes dark ink instead (6.9:1). */
  textClass: string
  mutedClass: string
  ctaClass: string
}

const TIERS: Tier[] = [
  {
    service: 'Foundation',
    label: 'Foundation',
    price: '$1,999',
    subLabel: '+GST one-off',
    description: '1–3 pages, built to get a small business found and trusted online.',
    cta: 'Request Quote/Call',
    background: 'var(--ias-brown-dark)',
    shapeClass: 'fill-white/10',
    textClass: 'text-white',
    mutedClass: 'text-white/70',
    ctaClass: 'bg-white text-[#4A2F23] hover:bg-white/90',
  },
  {
    service: 'Growth',
    label: 'Growth',
    price: '$2,999',
    subLabel: '+GST one-off',
    description: '5–8 pages, conversion-focused build to turn traffic into leads.',
    cta: 'Request Quote/Call',
    background: 'var(--ias-brown-mid)',
    shapeClass: 'fill-white/10',
    textClass: 'text-white',
    mutedClass: 'text-white/75',
    ctaClass: 'bg-white text-[#8B5A3C] hover:bg-white/90',
  },
  {
    service: 'Bespoke',
    label: 'Bespoke',
    price: '$6,999',
    subLabel: '+GST one-off',
    description: '10+ pages, fully custom build with dedicated launch support.',
    cta: 'Request Quote/Call',
    background: 'var(--ias-brown-light)',
    shapeClass: 'fill-white/25',
    textClass: 'text-[#2E1B12]',
    mutedClass: 'text-[#2E1B12]/80',
    ctaClass: 'bg-[#2E1B12] text-white hover:bg-[#1F120B]',
  },
]

function BGComponent({ shapeClass }: { shapeClass: string }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <motion.path className={shapeClass} variants={blobVariants} transition={SPRING} d={BLOB_REST} />
      <motion.circle className={shapeClass} variants={circleVariants} transition={SPRING} cx={168} cy={36} r={26} />
      <motion.rect
        className={shapeClass}
        variants={squareVariants}
        transition={SPRING}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        x={8}
        y={150}
        width={44}
        height={44}
        rx={10}
      />
    </svg>
  )
}

function PricingCard({ tier }: { tier: Tier }) {
  return (
    <motion.div
      initial="rest"
      animate="rest"
      // whileHover never fires on touch devices, so whileTap mirrors it
      // exactly, giving phones the same squish/morph as a desktop hover.
      whileHover="squish"
      whileTap="squish"
      variants={cardVariants}
      transition={SPRING}
      style={{ background: tier.background }}
      className="relative flex min-h-[320px] select-none flex-col overflow-hidden rounded-2xl p-8"
    >
      <BGComponent shapeClass={tier.shapeClass} />

      <div className="relative z-10 flex h-full flex-1 flex-col">
        <p className={`text-[13px] font-semibold uppercase tracking-[1.5px] ${tier.mutedClass}`}>
          {tier.label}
        </p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className={`${display.className} text-[44px] font-semibold leading-none ${tier.textClass}`}>
            {tier.price}
          </span>
          <span className={`text-[12px] font-medium ${tier.mutedClass}`}>{tier.subLabel}</span>
        </div>

        <p className={`mt-4 text-[14px] leading-relaxed ${tier.mutedClass}`}>{tier.description}</p>

        <div className="flex-1" />

        <QuotePopupButton
          service={tier.service}
          className={`mt-6 w-full rounded-[8px] py-3 text-[14px] font-semibold transition-colors duration-200 ${tier.ctaClass}`}
        >
          {tier.cta}
        </QuotePopupButton>
      </div>
    </motion.div>
  )
}

export default function SquishyPricing() {
  return (
    // Honours prefers-reduced-motion: transform animations are dropped for
    // users who ask for less motion, the layout is unaffected.
    <MotionConfig reducedMotion="user">
      <section className={`${body.className} bg-[#0A0A0A] px-6 py-[80px]`}>
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-[#C9A07A]">
              Fixed-Price Packages
            </p>
            <h2
              className={`${display.className} mt-3 text-balance text-[32px] font-semibold text-white md:text-[42px]`}
            >
              Know What It Costs Before You Enquire.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TIERS.map((tier) => (
              <PricingCard key={tier.label} tier={tier} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#C9A07A] transition-all duration-200 hover:gap-3 hover:text-[#DDB894]"
            >
              See full package details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
