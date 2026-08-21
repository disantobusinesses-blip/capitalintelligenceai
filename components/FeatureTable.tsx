import { Check, X } from 'lucide-react'
import FadeSlideTabs, { type FadeSlideTab } from '@/components/ui/fade-slide-tabs'

/** true = included (✓), false = not included (✗), string = a literal value (e.g. "1–3", "2 months (8 posts)"). */
export type FeatureValue = boolean | string

export interface FeatureRow {
  label: string
  values: [FeatureValue, FeatureValue, FeatureValue]
}

function Cell({ value }: { value: FeatureValue }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 mx-auto">
        <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#F0EDE8] mx-auto">
        <X className="w-3.5 h-3.5 text-ias-brown-muted" strokeWidth={3} />
      </span>
    )
  }
  return <span className="text-[13px] font-semibold text-[#1A1A1A]">{value}</span>
}

/** Column order matches FeatureRow.values, and the tier ladder's tone order. */
const PACKAGES = [
  { name: 'Foundation', indicatorClass: 'bg-ias-brown-dark' },
  { name: 'Growth', indicatorClass: 'bg-ias-brown-mid' },
  { name: 'Bespoke', indicatorClass: 'bg-ias-brown-light' },
] as const

/** One package's feature list, as label/value rows. */
function PackagePanel({ rows, col }: { rows: FeatureRow[]; col: number }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#E8E4DF] bg-white">
      <ul className="divide-y divide-[#E8E4DF]">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center justify-between gap-4 px-4 py-3 md:px-5">
            <span className="text-[13.5px] leading-snug text-[#1A1A1A] md:text-sm">{row.label}</span>
            <span className="flex-shrink-0">
              <Cell value={row.values[col]} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Foundation / Growth / Bespoke feature comparison, shared between /services
 * and /projects.
 *
 * Tabbed at every breakpoint rather than stacked. Stacking all three lists ran
 * to roughly nine screens on a 375px viewport before the user reached anything
 * else on the page, and a 4-column table cannot fit that width without a
 * horizontal scroller that hides the very columns being compared.
 *
 * Defaults to Growth, the Most Popular tier, so the tab that opens is the one
 * most visitors want.
 */
export default function FeatureTable({ rows }: { rows: FeatureRow[] }) {
  const tabs: FadeSlideTab[] = PACKAGES.map((pkg, col) => ({
    id: pkg.name.toLowerCase(),
    label: pkg.name,
    indicatorClass: pkg.indicatorClass,
    content: <PackagePanel rows={rows} col={col} />,
  }))

  return <FadeSlideTabs tabs={tabs} defaultTabId="growth" label="Compare packages" />
}
