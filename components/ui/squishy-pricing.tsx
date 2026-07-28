'use client'

import Link from 'next/link'
import { motion, MotionConfig, type Transition, type Variants } from 'framer-motion'
import { Check, Globe, Package, Zap, type LucideIcon } from 'lucide-react'
import { display, body } from '@/lib/fonts'
import QuotePopupButton from '@/components/QuotePopupButton'

/**
 * The /services website-package cards. Carries the full package detail
 * (page range, inherited-tier pointer, feature checklist, bonus box and both
 * CTAs) on top of a squish/morph interaction.
 *
 * Card tones come from the --ias-brown-* variables in globals.css, so
 * retoning the set is a one-place edit there rather than a change here.
 */

const SPRING: Transition = { type: 'spring', stiffness: 260, damping: 18, mass: 0.6 }

/* The card squishes and its corners round off. The SVG shapes below inherit
   these variant names from the card, so one gesture drives the whole card. */
const cardVariants: Variants = {
  rest: { scale: 1, borderRadius: 10 },
  squish: { scale: 0.98, borderRadius: 34 },
}

/* Two blobs with an identical command sequence (M, C, C, C, C, Z) so the path
   can be interpolated between them. */
const BLOB_REST =
  'M 40 104 C 40 62, 82 38, 122 50 C 162 62, 182 100, 160 140 C 138 180, 78 182, 54 152 C 30 122, 40 146, 40 104 Z'
const BLOB_SQUISH =
  'M 28 116 C 34 68, 92 26, 132 46 C 172 66, 192 108, 166 152 C 140 196, 68 194, 44 158 C 20 122, 22 164, 28 116 Z'

/* Radius only, no scale: this rides on the layer that clips the SVG, which
   already sits inside the scaling card. The card itself can't be the clipper
   or it would cut off the "Most Popular" badge overhanging its top edge. */
const clipVariants: Variants = {
  rest: { borderRadius: 10 },
  squish: { borderRadius: 34 },
}

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

export type SquishyTone = 'dark' | 'mid' | 'light'

/* Icons are referenced by key rather than passed in directly: /services is a
   Server Component and a component function cannot cross the server/client
   boundary as a prop. */
export type SquishyIcon = 'globe' | 'zap' | 'package'

const ICONS: Record<SquishyIcon, LucideIcon> = { globe: Globe, zap: Zap, package: Package }

export interface SquishyPlan {
  key: string
  icon: SquishyIcon
  name: string
  price: string
  period: string
  badge: string | null
  description: string
  pages: string
  inheritsFrom: string | null
  features: string[]
  bonus: string
  cta: string
  highlight: boolean
  tone: SquishyTone
}

interface Palette {
  background: string
  shape: string
  text: string
  muted: string
  feature: string
  check: string
  divider: string
  includesBox: string
  includesTitle: string
  includesBody: string
  outlineBtn: string
  solidBtn: string
  ring: string
}

/* Foreground colours are picked per tone rather than shared: white clears AA
   on the two darker browns (12.2:1 and 5.8:1) but manages only 2.4:1 on the
   lightest, which therefore takes dark ink instead (6.9:1). The tick icons
   follow the same logic against the 3:1 bar for graphical objects. */
const PALETTES: Record<SquishyTone, Palette> = {
  dark: {
    background: 'var(--ias-brown-dark)',
    shape: 'fill-white/10',
    text: 'text-white',
    muted: 'text-white/65',
    feature: 'text-white/90',
    check: 'text-green-400',
    divider: 'border-white/15',
    includesBox: 'bg-white/10 border-white/15',
    includesTitle: 'text-white',
    includesBody: 'text-white/70',
    outlineBtn: 'border border-white/30 text-white hover:bg-white/10',
    solidBtn: 'bg-white text-[#4A2F23] hover:bg-white/90',
    ring: 'ring-2 ring-[#2E1B12]',
  },
  mid: {
    background: 'var(--ias-brown-mid)',
    shape: 'fill-white/10',
    text: 'text-white',
    muted: 'text-white/70',
    feature: 'text-white/90',
    check: 'text-green-400',
    divider: 'border-white/15',
    includesBox: 'bg-white/10 border-white/15',
    includesTitle: 'text-white',
    includesBody: 'text-white/75',
    outlineBtn: 'border border-white/30 text-white hover:bg-white/10',
    solidBtn: 'bg-white text-[#8B5A3C] hover:bg-white/90',
    ring: 'ring-2 ring-[#2E1B12]',
  },
  light: {
    background: 'var(--ias-brown-light)',
    shape: 'fill-white/25',
    text: 'text-[#2E1B12]',
    muted: 'text-[#2E1B12]/75',
    feature: 'text-[#2E1B12]',
    check: 'text-green-800',
    divider: 'border-[#2E1B12]/20',
    includesBox: 'bg-[#2E1B12]/10 border-[#2E1B12]/15',
    includesTitle: 'text-[#2E1B12]',
    includesBody: 'text-[#2E1B12]/75',
    outlineBtn: 'border border-[#2E1B12]/40 text-[#2E1B12] hover:bg-[#2E1B12]/10',
    solidBtn: 'bg-[#2E1B12] text-white hover:bg-[#1F120B]',
    ring: 'ring-2 ring-[#2E1B12]',
  },
}

function BGComponent({ shape }: { shape: string }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 200 200"
      // Maps the viewBox straight onto the card box. The shapes stretch with
      // the card rather than zooming out of it on taller cards.
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <motion.path className={shape} variants={blobVariants} transition={SPRING} d={BLOB_REST} />
      <motion.circle className={shape} variants={circleVariants} transition={SPRING} cx={168} cy={36} r={26} />
      <motion.rect
        className={shape}
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

function PricingCard({ plan }: { plan: SquishyPlan }) {
  const p = PALETTES[plan.tone]
  const Icon = ICONS[plan.icon]

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
      style={{ background: p.background }}
      className={`relative flex w-full select-none flex-col rounded-[10px] p-6 ${
        plan.highlight ? `${p.ring} shadow-[0_10px_36px_rgba(46,27,18,0.25)]` : ''
      }`}
    >
      <motion.div
        variants={clipVariants}
        transition={SPRING}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <BGComponent shape={p.shape} />
      </motion.div>

      {plan.badge && (
        <span
          className={`${body.className} absolute -top-3.5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#2E1B12] px-4 py-1 text-[11px] font-bold text-white`}
        >
          {plan.badge}
        </span>
      )}

      <div className="relative z-10 flex flex-1 flex-col">
        <Icon className={`mb-3 h-6 w-6 ${p.text}`} strokeWidth={1.5} />

        <h3 className={`${display.className} mb-0.5 text-[21px] font-semibold uppercase tracking-wide ${p.text}`}>
          {plan.name}
        </h3>

        <p className={`${display.className} mb-2.5 text-[26px] font-semibold ${p.text}`}>
          {plan.price}
          <span className={`${body.className} ml-1 text-[10px] font-normal ${p.muted}`}>+ GST</span>
          <span className={`${body.className} ml-1 text-[12px] font-normal ${p.muted}`}>{plan.period}</span>
        </p>

        <p className={`${body.className} mb-3 text-[13px] leading-relaxed ${p.muted}`}>{plan.description}</p>

        <p className={`${body.className} mb-3 border-b pb-3 text-xs font-semibold ${p.divider} ${p.feature}`}>
          {plan.pages}
        </p>

        {plan.inheritsFrom && (
          <p className={`${body.className} mb-2 text-[11px] italic ${p.muted}`}>
            Everything in {plan.inheritsFrom}, plus:
          </p>
        )}

        <ul className="mb-4 flex-1 space-y-1.5">
          {plan.features.map((f) => (
            <li key={f} className={`${body.className} flex items-start gap-2 text-[13px] ${p.feature}`}>
              <Check className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${p.check}`} strokeWidth={2.5} />
              {f}
            </li>
          ))}
        </ul>

        <div className={`mb-4 rounded-[6px] border px-3 py-2.5 ${p.includesBox}`}>
          <p className={`${body.className} mb-0.5 text-[11px] font-semibold ${p.includesTitle}`}>Includes</p>
          <p className={`${body.className} text-[11px] leading-relaxed ${p.includesBody}`}>{plan.bonus}</p>
        </div>

        <Link
          href={`/projects#${plan.key}`}
          className={`${body.className} mb-2 block w-full rounded-[6px] py-2.5 text-center text-[13px] font-semibold transition-colors duration-200 ${p.outlineBtn}`}
        >
          See Examples
        </Link>
        <QuotePopupButton
          className={`${body.className} block w-full rounded-[6px] py-2.5 text-center text-[13px] font-semibold transition-colors duration-200 ${p.solidBtn}`}
        >
          {plan.cta}
        </QuotePopupButton>
      </div>
    </motion.div>
  )
}

export default function SquishyPricing({ plans }: { plans: SquishyPlan[] }) {
  return (
    // Honours prefers-reduced-motion: transform animations are dropped for
    // users who ask for less motion, the layout is unaffected.
    <MotionConfig reducedMotion="user">
      {/* Single full-width column on mobile, 3 columns from md: up. */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.key} plan={plan} />
        ))}
      </div>
    </MotionConfig>
  )
}
