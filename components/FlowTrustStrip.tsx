import { FLOW_PRICING_TIERS, FLOW_PRICING_GST_NOTE } from '@/lib/pricing'

function GoogleG({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

function Star({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FBBF24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2l2.9 6.3 6.8.9-5 4.7 1.2 6.8L12 17.6l-5.9 3.1 1.2-6.8-5-4.7 6.8-.9L12 2z" />
    </svg>
  )
}

/**
 * Google 5.0 star rating badge — five gold stars, a 5.0 rating and the Google
 * mark. No review count is shown (we don't store an aggregate), so nothing is
 * fabricated. `dark` flips the text colours for dark backgrounds.
 */
export function GoogleRatingBadge({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${dark ? 'text-white' : 'text-[#1A1A1A]'}`}
      aria-label="Rated 5.0 out of 5 on Google"
    >
      <GoogleG />
      <span className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} />
        ))}
      </span>
      <span className="text-[13px] font-bold">5.0</span>
      <span className={`text-[12px] ${dark ? 'text-white/70' : 'text-[#6B6560]'}`}>Rated on Google</span>
    </span>
  )
}

/**
 * Combined social-proof + pricing strip shown at every step of the quote /
 * launch flow. `dark` adapts colours for dark backgrounds.
 */
export default function FlowTrustStrip({ dark = false }: { dark?: boolean }) {
  const border = dark ? 'border-white/15' : 'border-[#E8E4DF]'
  const tierName = dark ? 'text-white' : 'text-[#1A1A1A]'
  const tierRange = dark ? 'text-white/70' : 'text-[#6B6560]'
  const note = dark ? 'text-white/50' : 'text-[#9E9790]'

  return (
    <div className={`flex flex-col items-center gap-2 rounded-xl border ${border} ${dark ? 'bg-white/5' : 'bg-[#F8F7F4]'} px-4 py-3`}>
      <GoogleRatingBadge dark={dark} />
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        {FLOW_PRICING_TIERS.map((tier) => (
          <span key={tier.name} className="text-[12px] whitespace-nowrap">
            <span className={`font-semibold ${tierName}`}>{tier.name}</span>{' '}
            <span className={tierRange}>{tier.range}</span>
          </span>
        ))}
      </div>
      <span className={`text-[11px] ${note}`}>{FLOW_PRICING_GST_NOTE}</span>
    </div>
  )
}
