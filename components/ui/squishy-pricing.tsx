'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  MotionConfig,
  useAnimationControls,
  useInView,
  useReducedMotion,
  type Transition,
  type Variants,
} from 'framer-motion'
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

/* The three tones form a deliberate tonal ladder: Foundation #473126, Growth
   #724935, Bespoke #9E684C. All three take white text, measured at 12.10:1,
   7.72:1 and 4.63:1 respectively, so every card clears AA for normal text.
   The ladder is the reason opacity budgets differ per tone: the two darker
   cards have contrast headroom to spare and can mute secondary rows, while
   Bespoke has only 0.13 above the 4.5 threshold and must stay at full white. */
const PALETTES: Record<SquishyTone, Palette> = {
  dark: {
    background: 'var(--ias-brown-dark)',
    shape: 'fill-white/5 sm:fill-white/10',
    text: 'text-white',
    muted: 'text-white/65',
    feature: 'text-white/90',
    check: 'text-green-400',
    divider: 'border-white/15',
    includesBox: 'bg-white/10 border-white/15',
    includesTitle: 'text-white',
    includesBody: 'text-white/70',
    outlineBtn: 'border border-white/30 text-white hover:bg-white/10',
    solidBtn: 'bg-white text-ias-brown-dark hover:bg-white/90',
    ring: 'ring-2 ring-[#2E1B12]',
  },
  mid: {
    background: 'var(--ias-brown-mid)',
    shape: 'fill-white/5 sm:fill-white/10',
    text: 'text-white',
    muted: 'text-white/70',
    feature: 'text-white/90',
    check: 'text-green-400',
    divider: 'border-white/15',
    includesBox: 'bg-white/10 border-white/15',
    includesTitle: 'text-white',
    /* /75 measured 4.18:1 against this box's lightened background. */
    includesBody: 'text-white/90',
    outlineBtn: 'border border-white/30 text-white hover:bg-white/10',
    solidBtn: 'bg-white text-ias-brown-mid hover:bg-white/90',
    ring: 'ring-2 ring-[#2E1B12]',
  },
  light: {
    /* Pure white on this brown measures 4.63:1, which clears AA for normal
       text. It is also the ONLY foreground that does: cream #F8F7F4 drops to
       4.32:1 and dark ink #2E1B12 to 3.54:1, both failing. So the muted and
       feature rows below stay at full-strength white rather than the /70 and
       /90 opacities the two darker cards use, since any tint lands under 4.5.

       The same 0.13 margin is why `includesBox` darkens rather than lightens.
       A white veil raises the box's own luminance, which cuts the white text on
       it to 3.51:1 — the tint only has to come from the background side to do
       identical damage. `bg-black/15` moves the box the other way, to 5.99:1. */
    background: 'var(--ias-brown-light)',
    shape: 'fill-white/10 sm:fill-white/20',
    text: 'text-white',
    muted: 'text-white',
    feature: 'text-white',
    check: 'text-white',
    divider: 'border-white/25',
    includesBox: 'bg-black/15 border-white/30',
    includesTitle: 'text-white',
    includesBody: 'text-white',
    outlineBtn: 'border border-white/50 text-white hover:bg-white/15',
    solidBtn: 'bg-white text-[#7A4E36] hover:bg-white/90',
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

function PricingCard({ plan, index }: { plan: SquishyPlan; index: number }) {
  const p = PALETTES[plan.tone]
  const Icon = ICONS[plan.icon]
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  // Not `once`, so the squish replays each time the card is scrolled back over.
  const inView = useInView(ref, { amount: 0.4 })
  const controls = useAnimationControls()

  /* iPhones and other touch devices have no hover, so scrolling a card into
     view plays the squish on its own. Staggered by column so the three don't
     pulse in unison on desktop, where they enter the viewport together. */
  useEffect(() => {
    if (!inView || reduceMotion) return
    let cancelled = false
    ;(async () => {
      await new Promise((r) => setTimeout(r, index * 130))
      if (cancelled) return
      await controls.start('squish')
      if (cancelled) return
      await controls.start('rest')
    })()
    return () => {
      cancelled = true
    }
  }, [inView, reduceMotion, controls, index])

  return (
    <motion.div
      ref={ref}
      initial="rest"
      // Driven by the in-view pulse above; the gesture props below take over
      // whenever the user actually interacts and hand back to this on release.
      animate={controls}
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
          className={`${body.className} mb-2 block w-full rounded-[6px] py-3 text-center sm:py-2.5 text-[13px] font-semibold transition-colors duration-200 ${p.outlineBtn}`}
        >
          See Examples
        </Link>
        <QuotePopupButton
          className={`${body.className} block w-full rounded-[6px] py-3 text-center text-[13px] font-semibold transition-colors duration-200 sm:py-2.5 ${p.solidBtn}`}
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
        {plans.map((plan, i) => (
          <PricingCard key={plan.key} plan={plan} index={i} />
        ))}
      </div>
    </MotionConfig>
  )
}
