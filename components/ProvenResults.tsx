'use client'

export default function ProvenResults() {
  return (
    <section className="bg-[#1A1A1A] py-[60px] px-4">
      <div className="max-w-[1200px] mx-auto">
        {/*
          1 col on xs, 2 cols on sm, 4 cols on md+.
          Each cell is a flex column so its content is always vertically centred,
          giving equal visual weight regardless of how many lines each stat has.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">

          {/* STAT 1: Pricing vs Traditional Agencies */}
          <div className="flex flex-col items-center justify-center text-center px-6 py-8 relative
                          border-b border-[#2D2D2D] sm:border-b sm:border-r
                          md:border-b-0 md:border-r md:last:border-r-0">
            <div className="mb-1">
              <span className="text-[14px] text-[#9E684C] line-through">$2,000–$5,000/mo</span>
            </div>
            <p className="text-[34px] font-extrabold text-white leading-tight">
              $199–$799<span className="text-[16px] font-bold">/mo</span>
            </p>
            <p className="text-[13px] text-[#9E684C] mt-2">vs Traditional Agencies</p>
          </div>

          {/* STAT 2: SEO Blogs */}
          <div className="flex flex-col items-center justify-center text-center px-6 py-8 relative
                          border-b border-[#2D2D2D]
                          sm:border-r-0 sm:border-b
                          md:border-b-0 md:border-r">
            <p className="text-[13px] font-semibold text-[#9E684C] uppercase tracking-widest mb-1">Up to</p>
            <p className="text-[42px] font-extrabold text-white leading-none">144</p>
            <p className="text-[13px] text-[#9E684C] mt-2">SEO Blogs Published Per Year by AI trained on your business</p>
          </div>

          {/* STAT 3: 24/7 Support */}
          <div className="flex flex-col items-center justify-center text-center px-6 py-8 relative
                          border-b border-[#2D2D2D] sm:border-b sm:border-r
                          md:border-b-0 md:border-r">
            <p className="text-[42px] font-extrabold text-white leading-none">24/7</p>
            <p className="text-[13px] text-[#9E684C] mt-2">Support, Always On, Always Available</p>
          </div>

          {/* STAT 4: 90-Day Guarantee */}
          <div className="flex flex-col items-center justify-center text-center px-6 py-8">
            <p className="text-[42px] font-extrabold text-white leading-none">90-Day</p>
            <p className="text-[13px] text-[#9E684C] mt-2 flex items-center justify-center gap-1.5">
              Ranking Guarantee
              <span className="text-green-400 text-[16px]">✓</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
