import { Check, X } from 'lucide-react'

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
        <X className="w-3.5 h-3.5 text-[#9E9790]" strokeWidth={3} />
      </span>
    )
  }
  return <span className="text-[13px] font-semibold text-[#1A1A1A]">{value}</span>
}

/**
 * Foundation / Growth / Bespoke feature comparison table. Shared between
 * /services and /projects so the ✓ / ✗ styling matches on both pages.
 */
/** Column order matches FeatureRow.values. */
const PACKAGES = ['Foundation', 'Growth', 'Bespoke'] as const

export default function FeatureTable({ rows }: { rows: FeatureRow[] }) {
  return (
    <>
      {/* Mobile: one block per package. A 4-column table can't fit 390px without
          a horizontal scroller that hides the Growth and Bespoke columns, which
          defeats the point of a comparison, so below `md` the same data is
          pivoted into stacked per-package lists. */}
      <div className="flex flex-col gap-4 md:hidden">
        {PACKAGES.map((pkg, col) => (
          <div key={pkg} className="rounded-[10px] border border-[#E8E4DF] bg-white overflow-hidden">
            <p className="px-4 py-3 text-sm font-semibold text-[#1A1A1A] bg-[#FAF9F7] border-b border-[#E8E4DF]">
              {pkg}
            </p>
            <ul className="divide-y divide-[#E8E4DF]">
              {rows.map((row) => (
                <li key={row.label} className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-[13.5px] leading-snug text-[#1A1A1A]">{row.label}</span>
                  <span className="flex-shrink-0">
                    <Cell value={row.values[col]} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Desktop keeps the real table: side-by-side columns are the clearest
          way to compare once there is room for them. */}
      <div className="hidden md:block overflow-x-auto rounded-[10px] border border-[#E8E4DF] bg-white">
      <table className="w-full min-w-[560px] border-collapse">
        <thead>
          <tr className="border-b border-[#E8E4DF]">
            <th className="text-left px-5 py-3.5 text-sm font-semibold text-[#1A1A1A]">Feature</th>
            <th className="text-center px-5 py-3.5 text-sm font-semibold text-[#1A1A1A]">Foundation</th>
            <th className="text-center px-5 py-3.5 text-sm font-semibold text-[#1A1A1A]">Growth</th>
            <th className="text-center px-5 py-3.5 text-sm font-semibold text-[#1A1A1A]">Bespoke</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 1 ? 'bg-[#FAF9F7]' : undefined}>
              <td className="text-left px-5 py-3 text-sm text-[#1A1A1A] border-t border-[#E8E4DF]">
                {row.label}
              </td>
              {row.values.map((value, idx) => (
                <td key={idx} className="text-center px-5 py-3 border-t border-[#E8E4DF]">
                  <Cell value={value} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  )
}
