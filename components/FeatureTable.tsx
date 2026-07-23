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
export default function FeatureTable({ rows }: { rows: FeatureRow[] }) {
  return (
    <div className="overflow-x-auto rounded-[10px] border border-[#E8E4DF] bg-white">
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
  )
}
