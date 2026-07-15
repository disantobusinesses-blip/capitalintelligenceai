import { Instagram, TrendingUp, PenLine, Check } from 'lucide-react'
import { display, body } from '@/lib/fonts'
import QuotePopupButton from '@/components/QuotePopupButton'

const SEO_TIERS = [
  { label: '4 blogs/mo', price: '$99' },
  { label: '8 blogs/mo', price: '$179' },
  { label: '12 blogs/mo', price: '$249' },
]

const SOCIAL_INCLUDES = ['Content calendar & scheduling', 'Reels, posts & stories', 'Monthly growth reporting']
const B2B_INCLUDES = ['Curated, ready-to-contact lead lists', 'Custom lead platforms built for your team', 'Sales-ready contact data']

export default function BeyondWebsite() {
  return (
    <section className={`${body.className} bg-[#F8F7F4] py-[80px] px-6 border-t border-[#E8E4DF]`}>
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-[#C9A07A] text-[13px] font-semibold tracking-[1.5px] uppercase">
            More Than a Website
          </p>
          <h2 className={`${display.className} text-[32px] md:text-[42px] font-semibold text-[#3D2817] mt-3 text-balance`}>
            We Build Websites. Then We Help You Grow.
          </h2>
          <p className="text-[#6B6560] text-[16px] mt-4 text-balance">
            Most agencies disappear after launch. We don&apos;t.
          </p>
        </div>

        {/* Three equal-weight cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card A — Instagram & Social Growth */}
          <div className="flex flex-col bg-white border border-[#E8E4DF] rounded-[10px] p-8">
            <div className="w-11 h-11 bg-[#F8F7F4] rounded-[6px] flex items-center justify-center mb-5">
              <Instagram className="w-5 h-5 text-[#C9A07A]" strokeWidth={1.5} />
            </div>
            <h3 className="text-[#3D2817] font-semibold text-lg mb-3">
              Instagram &amp; Social Growth Management
            </h3>
            <p className="text-[#6B6560] text-sm leading-relaxed mb-5">
              We manage and grow your social presence using the same systems behind Onyx
              Global&apos;s results.
            </p>
            <ul className="flex flex-col gap-2.5 mt-auto">
              {SOCIAL_INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#6B6560]">
                  <Check className="w-4 h-4 text-[#C9A07A] flex-shrink-0 mt-0.5" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card B — B2B Lead Generation */}
          <div className="flex flex-col bg-white border border-[#E8E4DF] rounded-[10px] p-8">
            <div className="w-11 h-11 bg-[#F8F7F4] rounded-[6px] flex items-center justify-center mb-5">
              <TrendingUp className="w-5 h-5 text-[#C9A07A]" strokeWidth={1.5} />
            </div>
            <h3 className="text-[#3D2817] font-semibold text-lg mb-3">B2B Lead Generation</h3>
            <p className="text-[#6B6560] text-sm leading-relaxed mb-5">
              Selling to other businesses? We supply qualified leads — a ready list, or a fully
              custom lead platform built for your sales team.
            </p>
            <ul className="flex flex-col gap-2.5 mb-6">
              {B2B_INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#6B6560]">
                  <Check className="w-4 h-4 text-[#C9A07A] flex-shrink-0 mt-0.5" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
            <QuotePopupButton
              service="B2B AI Platform"
              className="mt-auto self-start border border-[#C9A07A] text-[#3D2817] font-semibold px-5 py-2.5 rounded-[6px] text-sm hover:bg-[#C9A07A] transition-colors duration-200"
            >
              Enquire for Pricing
            </QuotePopupButton>
          </div>

          {/* Card C — SEO Blog Content */}
          <div className="flex flex-col bg-white border border-[#E8E4DF] rounded-[10px] p-8">
            <div className="w-11 h-11 bg-[#F8F7F4] rounded-[6px] flex items-center justify-center mb-5">
              <PenLine className="w-5 h-5 text-[#C9A07A]" strokeWidth={1.5} />
            </div>
            <h3 className="text-[#3D2817] font-semibold text-lg mb-3">SEO Blog Content</h3>
            <p className="text-[#6B6560] text-sm leading-relaxed mb-5">
              Multiple AI agents continuously research, write, and track SEO content for your
              site. Want a specific topic covered?{' '}
              <a
                href="mailto:sales@intelligentaisystem.com"
                className="text-[#C9A07A] underline underline-offset-2 hover:text-[#B98D64]"
              >
                Just email us
              </a>
              .
            </p>

            {/* Pricing tiers */}
            <div className="flex flex-col gap-2 mb-5">
              {SEO_TIERS.map((tier) => (
                <div
                  key={tier.label}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-[6px] border border-[#E8E4DF]"
                >
                  <span className="text-[#3D2817] text-sm font-medium">{tier.label}</span>
                  <span className="text-[#C9A07A] text-sm font-semibold">{tier.price}</span>
                </div>
              ))}
            </div>

            {/* Real result callout */}
            <blockquote className="border-l-2 border-[#C9A07A] pl-4 mt-auto">
              <p className="text-[#6B6560] text-xs italic leading-relaxed">
                An EV charger installation blog we wrote for EAY Electrical generated an enquiry
                that became a $10,000+ apartment block installation. Most content takes 3+ months
                to gain traction — Google limits visibility on new domains while trust builds.
              </p>
              <p className="text-[#9E9790] text-xs italic leading-relaxed mt-2">
                [PLACEHOLDER: screenshot of the EAY blog post or the resulting enquiry/traffic
                data — pending upload]
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
