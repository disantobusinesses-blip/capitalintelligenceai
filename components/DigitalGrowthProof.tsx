import { ImageOff } from 'lucide-react'
import { display, body } from '@/lib/fonts'
import CountUp from '@/components/CountUp'

/** Shared placeholder tile for the client-account screenshots that are pending upload. */
function ScreenshotPlaceholder({ note }: { note: string }) {
  return (
    <div className="mt-6 aspect-[16/10] rounded-[8px] bg-[#F0EDE7] border border-[#E8E4DF] flex flex-col items-center justify-center gap-2 px-5 text-center">
      <ImageOff className="w-5 h-5 text-[#9E9790]" strokeWidth={1.5} />
      <span className="text-[#9E9790] text-xs font-medium leading-relaxed">[PLACEHOLDER: {note}]</span>
    </div>
  )
}

export default function DigitalGrowthProof() {
  return (
    <section className={`${body.className} bg-white py-[80px] px-6 border-t border-[#E8E4DF]`}>
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-[#C9A07A] text-[13px] font-semibold tracking-[1.5px] uppercase">
            Results, Not Promises
          </p>
          <h2 className={`${display.className} text-[32px] md:text-[42px] font-semibold text-[#3D2817] mt-3 text-balance`}>
            We Don&apos;t Just Build Websites. We Grow Them.
          </h2>
          <p className="text-[#6B6560] text-[16px] mt-4">
            Real numbers from real client accounts — not stock case studies.
          </p>
        </div>

        {/* Three stat columns */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Column 1 — Social Reach (view count + platform both pending) */}
          <div className="flex flex-col bg-[#F8F7F4] border border-[#E8E4DF] rounded-[10px] p-8">
            <p className="text-[#C9A07A] text-[12px] font-semibold tracking-[1.2px] uppercase">
              Social Reach
            </p>
            <p className={`${display.className} text-[40px] md:text-[48px] font-semibold text-[#9E9790] leading-none mt-3`}>
              [view count]
            </p>
            <p className="text-[#6B6560] text-sm leading-relaxed mt-4">
              <span className="text-[#9E9790] italic">[PLATFORM: CONFIRM — Instagram or TikTok]</span>{' '}
              views in 30 days for Onyx Global — managed end-to-end by our team.
            </p>
            <p className="text-[#9E9790] text-xs italic leading-relaxed mt-2">
              [PLACEHOLDER: final view count — 422K / 575K / 1M / 2M confirmed, 1.3M / 2.5M pending re-upload]
            </p>
            <ScreenshotPlaceholder note="dashboard screenshot" />
          </div>

          {/* Column 2 — Search Growth (confirmed: 892 clicks, 59.4K impressions) */}
          <div className="flex flex-col bg-[#F8F7F4] border border-[#E8E4DF] rounded-[10px] p-8">
            <p className="text-[#C9A07A] text-[12px] font-semibold tracking-[1.2px] uppercase">
              Search Growth
            </p>
            <div className="flex items-end gap-6 mt-3">
              <div>
                <CountUp
                  end={892}
                  className={`${display.className} block text-[40px] md:text-[48px] font-semibold text-[#3D2817] leading-none`}
                />
                <span className="text-[#9E9790] text-xs font-medium uppercase tracking-wide">Clicks</span>
              </div>
              <div>
                <CountUp
                  end={59.4}
                  decimals={1}
                  suffix="K"
                  className={`${display.className} block text-[40px] md:text-[48px] font-semibold text-[#3D2817] leading-none`}
                />
                <span className="text-[#9E9790] text-xs font-medium uppercase tracking-wide">Impressions</span>
              </div>
            </div>
            <p className="text-[#6B6560] text-sm leading-relaxed mt-4">
              Organic Search Console growth for{' '}
              <span className="text-[#9E9790] italic">[PLACEHOLDER: CLIENT NAME — confirm]</span> over 5
              weeks — the slow-build SEO curve, not overnight traffic.
            </p>
            <ScreenshotPlaceholder note="GSC screenshot" />
          </div>

          {/* Column 3 — Get Mentioned By AI (confirmed: 84 sessions) */}
          <div className="flex flex-col bg-[#F8F7F4] border border-[#E8E4DF] rounded-[10px] p-8">
            <p className="text-[#C9A07A] text-[12px] font-semibold tracking-[1.2px] uppercase">
              Get Mentioned By AI
            </p>
            <div className="mt-3">
              <CountUp
                end={84}
                className={`${display.className} block text-[40px] md:text-[48px] font-semibold text-[#3D2817] leading-none`}
              />
              <span className="text-[#9E9790] text-xs font-medium uppercase tracking-wide">Sessions</span>
            </div>
            <p className="text-[#6B6560] text-sm leading-relaxed mt-4">
              Real sessions sourced from ChatGPT for{' '}
              <span className="text-[#9E9790] italic">[PLACEHOLDER: CLIENT NAME — confirm]</span> — proof
              our GEO work shows up where AI assistants send traffic.
            </p>
            <ScreenshotPlaceholder note="GA4 screenshot" />
          </div>
        </div>
      </div>
    </section>
  )
}
