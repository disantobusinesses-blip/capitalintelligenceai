import type { Metadata } from 'next'
import { display, body } from '@/lib/fonts'
import FadeRiseText from '@/components/ui/fade-rise-text'
import QuotePopupButton from '@/components/QuotePopupButton'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'About IAS – Melbourne Web Design Studio | Built Different',
  description:
    'IAS is a Melbourne-based web design and development studio, built and run by its founder, Stefano. Premium, fast, technically sound websites at a fixed price.',
  keywords:
    'about IAS, Stefano, Melbourne web design studio, web development Melbourne, technical SEO, fixed price websites',
  alternates: {
    canonical: 'https://intelligentaisystem.com/about',
  },
  openGraph: {
    title: 'About IAS – Melbourne Web Design Studio',
    description:
      'A Melbourne-based web design and development studio, built and run by its founder, Stefano.',
    url: 'https://intelligentaisystem.com/about',
    type: 'website',
  },
}

/* The three things that actually distinguish an IAS build, pulled straight
   from the studio's positioning rather than generic agency values. */
const APPROACH = [
  {
    title: 'A Real Technical Foundation',
    description:
      'Every website starts with a real technical foundation, not a template with your logo dropped in. Structured data, correct heading hierarchy, fast load times, and SEO built in from day one. Not sold as an add-on afterward.',
  },
  {
    title: 'Three Fixed-Price Packages',
    description:
      'Foundation, Growth, and Bespoke. No vague quotes, no scope creep, no surprises on the invoice.',
  },
  {
    title: 'Real Results, Not Promises',
    description:
      'Every site IAS builds is designed to rank, load fast, and convert, backed by genuine client outcomes across Melbourne and beyond.',
  },
]

/* Clients already featured across the portfolio and testimonials. */
const CLIENTS = [
  'EAY Electrical',
  'Reborn Physiques',
  'Estética Sydney',
  'Onyx Global',
  'Azzura Consulting',
  'Tamar Cabinets',
  'Certi Sustainability',
  'Senator Developments',
]

export default function AboutPage() {
  return (
    <main className={`${body.className} min-h-[100dvh] bg-[#F8F7F4] pb-24 pt-[74px]`}>
      {/* Hero */}
      <section className="pt-[80px] pb-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[760px]">
            <h1
              className={`${display.className} text-[52px] md:text-[80px] leading-[0.95] font-bold uppercase tracking-[-0.01em] text-[#3D2817] text-balance`}
            >
              <FadeRiseText text="Built Different" />
            </h1>
            <p className="text-[18px] md:text-[20px] text-[#6B6560] mt-6 max-w-[620px] leading-relaxed text-pretty">
              IAS is a Melbourne-based web design and development studio, built and run by its
              founder, Stefano.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-white py-[80px] px-6 border-t border-[#E8E4DF]">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[760px]">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#1A1A1A] leading-tight mb-8 text-balance">
              Meet Stefano
            </h2>
            <div className="flex flex-col gap-5 text-[17px] text-[#6B6560] leading-relaxed">
              <p>
                I started IAS to fix a problem I kept seeing: businesses paying traditional agency
                prices for slow builds, generic templates, and SEO treated as an afterthought.
              </p>
              <p>
                IAS runs differently. Every website is built using an AI-accelerated workflow,
                design, development, and technical SEO handled in a fraction of the time a
                traditional agency takes, without cutting corners on quality. I&apos;m directly
                involved in every build, from the first consultation through to the site going live.
              </p>
              {/* The studio's core promise, given visual weight as the one
                  signature element on the page. */}
              <p className="text-[19px] md:text-[21px] text-[#3D2817] font-semibold leading-relaxed border-l-2 border-ias-brown-mid pl-6 mt-1">
                The result is simple: premium, fast, technically sound websites at a fixed price,
                delivered in days, not months.
              </p>
            </div>
            <p className="text-sm text-[#6B6560] mt-10">ABN: 38 693 023 371</p>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-[80px] px-6 border-t border-[#E8E4DF]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#1A1A1A] leading-tight mb-12 max-w-[620px] text-balance">
            How IAS Builds Different
          </h2>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {APPROACH.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-[10px] p-7 border border-[#E8E4DF] smooth-transition hover:border-ias-brown-dark hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              >
                <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-3 text-balance">
                  {item.title}
                </h3>
                <p className="text-[15px] text-[#6B6560] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="bg-white py-[80px] px-6 border-t border-[#E8E4DF]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#1A1A1A] leading-tight mb-6 max-w-[620px] text-balance">
            Real Businesses, Built Different
          </h2>
          <p className="text-[17px] text-[#6B6560] leading-relaxed max-w-[720px] text-pretty">
            IAS has built and grown websites for businesses across trades, fitness, beauty,
            professional services, and fintech.
          </p>
          <ul className="flex flex-wrap gap-3 mt-8">
            {CLIENTS.map((client) => (
              <li
                key={client}
                className="text-[14px] font-semibold text-[#3D2817] bg-[#F8F7F4] border border-[#E8E4DF] rounded-[6px] px-4 py-2.5"
              >
                {client}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[80px] px-6 border-t border-[#E8E4DF]">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[620px]">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#1A1A1A] leading-tight mb-5 text-balance">
              Ready to Build Different?
            </h2>
            <p className="text-[17px] text-[#6B6560] leading-relaxed mb-9 text-pretty">
              Book a free 15-minute consultation and see what IAS can build for your business.
            </p>
            <QuotePopupButton className="w-full sm:w-auto inline-block bg-ias-brown-mid text-white font-bold px-9 py-4 rounded-[6px] text-base text-center hover:bg-ias-brown-dark transition-colors duration-200">
              Request Quote/Call
            </QuotePopupButton>
          </div>
        </div>
      </section>
    </main>
  )
}
