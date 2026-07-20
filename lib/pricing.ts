// Headline pricing tiers shown as social proof throughout the quote / launch
// flow (popup, /launch, and the Secure Your Spot deposit page). Keep these in
// sync with /services and lib/templates.ts.
export interface FlowPricingTier {
  name: string
  range: string
}

export const FLOW_PRICING_TIERS: FlowPricingTier[] = [
  { name: 'Foundation', range: '$1,999' },
  { name: 'Growth', range: '$2,999' },
  { name: 'Bespoke', range: '$6,999' },
]

// Single +GST note rendered once next to the tiers.
export const FLOW_PRICING_GST_NOTE = 'All prices + GST'
