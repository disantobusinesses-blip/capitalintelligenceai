import { display, body } from '@/lib/fonts'
import CountUp from '@/components/CountUp'
import GrowthProofImage from '@/components/GrowthProofImage'

// All four confirmed 30-day view-count snapshots, highest to lowest.
const SOCIAL_REACH_SNAPSHOTS = [
  { src: '/proof/social-reach-2m-views.jpg', label: '2.0M views' },
  { src: '/proof/social-reach-1m-views.jpg', label: '1.0M views' },
  { src: '/proof/social-reach-575k-views.jpg', label: '575.3K views' },
  { src: '/proof/social-reach-422k-views.jpg', label: '422.0K views' },
]

export default function DigitalGrowthProof() {
  return (
    <section className={`${body.className} bg-white py-[80px] px-6 border-t border-[#E8E4DF]`}>
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-ias-brown-mid text-[13px] font-semibold tracking-[1.5px] uppercase">
            Results, Not Promises
          </p>
          <h2 className={`${display.className} text-[32px] md:text-[42px] font-semibold text-[#3D2817] mt-3 text-balance`}>
            We Don&apos;t Just Build Websites. We Grow Them.
          </h2>
          <p className="text-[#6B6560] text-[16px] mt-4">
            Real numbers from real client accounts, not stock case studies.
          </p>
        </div>

        {/* Three stat columns */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {/* Column 1, Social Reach (Instagram, client results) */}
          <div className="flex flex-col bg-[#F8F7F4] border border-[#E8E4DF] rounded-[10px] p-8">
            <p className="text-ias-brown-mid text-[12px] font-semibold tracking-[1.2px] uppercase">
              Social Reach
            </p>
            <CountUp
              end={2.0}
              decimals={1}
              suffix="M"
              className={`${body.className} block text-[40px] md:text-[48px] font-bold text-[#3D2817] leading-none mt-3`}
            />
            <p className="text-[#6B6560] text-sm leading-relaxed mt-4">
              Client results for Instagram, views in 30 days, managed end-to-end by our team.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {SOCIAL_REACH_SNAPSHOTS.map((snapshot) => (
                <div key={snapshot.src}>
                  <GrowthProofImage
                    src={snapshot.src}
                    alt={`Professional dashboard showing ${snapshot.label} in the last 30 days`}
                    aspectClassName="aspect-[3/2]"
                    wrapperClassName=""
                    fit="contain"
                    sizes="(max-width: 768px) 50vw, 16vw"
                  />
                  <p className="text-[#9E9790] text-xs font-medium text-center mt-1.5">{snapshot.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2, Search Growth (confirmed: 892 clicks, 59.4K impressions) */}
          <div className="flex flex-col bg-[#F8F7F4] border border-[#E8E4DF] rounded-[10px] p-8">
            <p className="text-ias-brown-mid text-[12px] font-semibold tracking-[1.2px] uppercase">
              Search Growth
            </p>
            <div className="flex items-end gap-6 mt-3">
              <div>
                <CountUp
                  end={892}
                  className={`${body.className} block text-[40px] md:text-[48px] font-bold text-[#3D2817] leading-none`}
                />
                <span className="text-[#9E9790] text-xs font-medium uppercase tracking-wide">Clicks</span>
              </div>
              <div>
                <CountUp
                  end={59.4}
                  decimals={1}
                  suffix="K"
                  className={`${body.className} block text-[40px] md:text-[48px] font-bold text-[#3D2817] leading-none`}
                />
                <span className="text-[#9E9790] text-xs font-medium uppercase tracking-wide">Impressions</span>
              </div>
            </div>
            <p className="text-[#6B6560] text-sm leading-relaxed mt-4">
              Organic Search Console growth for a client over 5 weeks, the slow-build SEO
              curve, not overnight traffic.
            </p>
            <GrowthProofImage
              src="/proof/gsc-search-console.jpg"
              alt="Google Search Console performance report showing 892 total clicks and 59.4K total impressions"
              aspectClassName="aspect-[970/553]"
            />
          </div>

          {/* Column 3, Get Mentioned By AI (confirmed: 84 sessions) */}
          <div className="flex flex-col bg-[#F8F7F4] border border-[#E8E4DF] rounded-[10px] p-8">
            <p className="text-ias-brown-mid text-[12px] font-semibold tracking-[1.2px] uppercase">
              Get Mentioned By AI
            </p>
            <div className="mt-3">
              <CountUp
                end={84}
                className={`${body.className} block text-[40px] md:text-[48px] font-bold text-[#3D2817] leading-none`}
              />
              <span className="text-[#9E9790] text-xs font-medium uppercase tracking-wide">Sessions</span>
            </div>
            <p className="text-[#6B6560] text-sm leading-relaxed mt-4">
              Real sessions sourced from ChatGPT for a client, proof our GEO work shows up
              where AI assistants send traffic.
            </p>
            <GrowthProofImage
              src="/proof/ai-referral-ga4.png"
              alt="Google Analytics 4 session source report showing chatgpt.com referral sessions"
              aspectClassName="aspect-[1080/1350]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
