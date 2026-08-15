import type { ReactNode } from 'react'

/** The pricing tier ladder. Each tier owns one tone of the brown system. */
export type Tier = 'foundation' | 'growth' | 'bespoke'

/* Tier -> surface colour, matching the pricing cards in squishy-pricing.tsx.
   All three take pure white text: 12.10:1, 7.72:1 and 4.63:1 respectively.
   Bespoke clears AA by only 0.13, so its white must never carry an opacity
   tint (text-white/90 would already fail). Hence `text-white` throughout
   rather than a muted variant on the eyebrow. */
const TIER_SURFACE: Record<Tier, string> = {
  foundation: 'bg-ias-brown-dark',
  growth: 'bg-ias-brown-mid',
  bespoke: 'bg-ias-brown-light',
}

interface TierSectionHeaderProps {
  tier: Tier
  /** Small uppercase label, e.g. "Bespoke Examples". */
  eyebrow: string
  /** The section's real heading. */
  title: string
  children?: ReactNode
}

/**
 * Sticky heading for the per-tier project sections on /projects.
 *
 * Sticks to the top of the viewport while the user scrolls that tier's cards,
 * so the tier being viewed is always identifiable. `top` clears the fixed
 * navbar. The parent <section> establishes the sticky containment: because
 * `position: sticky` only travels within its own scroll container, the bar
 * releases naturally at the section boundary and the next tier takes over
 * without any scroll listener.
 */
export default function TierSectionHeader({ tier, eyebrow, title, children }: TierSectionHeaderProps) {
  return (
    <div className={`sticky top-[64px] z-20 -mx-6 mb-8 px-6 py-3 md:py-4 ${TIER_SURFACE[tier]} md:static md:mx-0 md:mb-10 md:rounded-[8px]`}>
      <p className="text-[12px] font-semibold uppercase tracking-[1.5px] text-white md:text-[13px]">
        {eyebrow}
      </p>
      <h2 className="mt-1 text-[19px] font-bold leading-tight text-balance text-white md:mt-2 md:text-[32px]">
        {title}
      </h2>
      {children}
    </div>
  )
}
