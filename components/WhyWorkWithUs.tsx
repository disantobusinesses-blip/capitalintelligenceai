import { Users, Handshake, Wallet } from 'lucide-react'
import { display, body } from '@/lib/fonts'

const POINTS = [
  { icon: Users, label: 'Direct Access' },
  { icon: Handshake, label: 'No Middlemen' },
  { icon: Wallet, label: 'Small by Design' },
]

export default function WhyWorkWithUs() {
  return (
    <section className={`${body.className} bg-white py-[80px] px-6 border-t border-[#E8E4DF]`}>
      <div className="max-w-[800px] mx-auto text-center">
        <p className="text-ias-brown-mid text-[13px] font-semibold tracking-[1.5px] uppercase">
          Why Work With Us
        </p>
        <h2 className={`${display.className} text-[32px] md:text-[42px] font-semibold text-[#3D2817] mt-3 text-balance`}>
          A Small Team. Not a Big Agency Markup.
        </h2>
        <p className="text-[#6B6560] text-[16px] md:text-[18px] leading-relaxed mt-5 max-w-[620px] mx-auto">
          We&apos;re intentionally small, no bloated overhead, no account managers passing your
          project between departments. You get direct access to the people building your site, at
          a fraction of what larger agencies charge for the same quality.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {POINTS.map((point) => {
            const Icon = point.icon
            return (
              <div
                key={point.label}
                className="flex items-center gap-2.5 bg-[#F8F7F4] border border-[#E8E4DF] rounded-full px-5 py-3"
              >
                <Icon className="w-4 h-4 text-ias-brown-mid" strokeWidth={1.75} />
                <span className="text-[#3D2817] text-sm font-semibold">{point.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
