'use client'

export default function ProvenResults() {
  return (
    <section className="bg-[#1A1A1A] py-[60px] px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">

          {/* STAT 1: Pricing vs Traditional Agencies */}
          <div className="text-center px-6 py-4 relative">
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[#5C3D2E]" />
            {/* Crossed-out traditional price */}
            <p className="text-[15px] text-[#9E9790] line-through leading-tight">$2,000–$5,000/mo</p>
            {/* Our price */}
            <p className="text-[36px] font-extrabold text-white leading-tight mt-1">$299–$799<span className="text-[18px] font-bold">/mo</span></p>
            <p className="text-[13px] text-[#9E9790] mt-2">vs Traditional Agencies</p>
          </div>

          {/* STAT 2: SEO Blogs */}
          <div className="text-center px-6 py-4 relative">
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[#5C3D2E]" />
            <p className="text-[42px] font-extrabold text-white leading-none">100</p>
            <p className="text-[14px] text-[#9E9790] mt-2">SEO Blogs Published Per Year</p>
          </div>

          {/* STAT 3: 24/7 Support */}
          <div className="text-center px-6 py-4 relative">
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[#5C3D2E]" />
            <p className="text-[42px] font-extrabold text-white leading-none">24/7</p>
            <p className="text-[14px] text-[#9E9790] mt-2">Support — Always On, Always Available</p>
          </div>

          {/* STAT 4: 90-Day Guarantee */}
          <div className="text-center px-6 py-4">
            <p className="text-[42px] font-extrabold text-white leading-none">90-Day</p>
            <p className="text-[14px] text-[#9E9790] mt-2">Ranking Guarantee — Blogs Free Until You Rank</p>
          </div>

        </div>
      </div>
    </section>
  )
}
