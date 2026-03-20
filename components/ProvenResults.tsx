'use client'

export default function ProvenResults() {
  const stats = [
    { number: '+1.2M', label: 'Monthly Impressions Generated' },
    { number: '+11.2K', label: 'Organic Clicks to Client Sites' },
    { number: '85%', label: 'Average Lead Increase Year 1' },
    { number: '3x', label: 'ROI vs Paid Ads' },
  ]

  return (
    <section className="bg-[#1A1A1A] py-[60px] px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center px-6 py-4 relative"
            >
              {/* Vertical divider (desktop only, not after last) */}
              {index < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[#5C3D2E]" />
              )}
              <p className="text-[42px] font-extrabold text-white leading-none">{stat.number}</p>
              <p className="text-[14px] text-[#9E9790] mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
