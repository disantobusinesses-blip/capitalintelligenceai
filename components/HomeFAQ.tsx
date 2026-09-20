import { ChevronDown } from 'lucide-react'
import { display, body } from '@/lib/fonts'

const FAQS = [
  {
    q: "Do I own the website once it's built?",
    a: 'Yes. Once your invoice is paid in full, you own the final website built for you. We retain ownership of our own pre-existing tools, templates, and methodologies used to build it, but the finished site is yours.',
  },
  {
    q: 'What if I need changes after launch?',
    a: "Most agencies disappear after handover, we don't. Ongoing maintenance and update plans are available so your site keeps evolving as your business does.",
  },
  {
    q: 'Do you handle hosting?',
    a: 'Yes. We offer hosting plans billed separately once your site goes live, and can set up your domain and hosting for you as part of your build.',
  },
  {
    q: 'Do you only work with Melbourne businesses?',
    a: "We're based in Melbourne, but we're remote-first and work with businesses across Australia and internationally.",
  },
  {
    q: "Why isn't my new website ranking on Google yet?",
    a: "Google's own team has confirmed new websites lack the trust signals, such as backlinks, user engagement history and content depth, that older domains have built up. Their systems make assumptions about where a new site belongs until enough data accumulates. This is a natural process, not a penalty.",
  },
  {
    q: 'How long does it actually take for a new website to rank?',
    a: "A 2025 study by Ahrefs analysing over 1 million newly published pages found only 1.74% reached Google's top 10 within a year, and the average page holding the number 1 position was around 5 years old. For most Australian small businesses this means 3 to 6 months for lower competition keywords, such as suburb based searches, and 6 to 12 months for more competitive terms.",
  },
  {
    q: "Does your 90-day guarantee mean I'll be on page 1 by then?",
    a: 'The 90-day guarantee applies only to clients on a monthly SEO blog content plan and covers measurable improvement in keyword rankings, not guaranteed page 1 placement. Full page 1 rankings for competitive terms genuinely take longer than 90 days industry wide. What you should see within 90 days is upward movement: more keywords tracked, better positions, and growing impressions in Search Console.',
  },
  {
    q: 'What speeds up the process?',
    a: 'Consistent content publication, solid technical SEO (speed, mobile experience, structured data), and genuine backlinks all accelerate the timeline. Sites that publish regularly move faster than sites that launch and go static.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
}

export default function HomeFAQ() {
  return (
    <section id="faq" className={`${body.className} bg-white py-[80px] px-6 border-t border-[#E8E4DF]`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-ias-brown-mid text-[13px] font-semibold tracking-[1.5px] uppercase">
            FAQ
          </p>
          <h2 className={`${display.className} text-[32px] md:text-[42px] font-semibold text-[#3D2817] mt-3`}>
            Common Questions
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group bg-[#F8F7F4] border border-[#E8E4DF] rounded-[10px] px-6 py-1 open:border-ias-brown-mid"
            >
              <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none text-[#3D2817] font-medium text-[16px]">
                {item.q}
                <ChevronDown className="w-4 h-4 text-ias-brown-mid flex-shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="text-[#6B6560] text-sm leading-relaxed pb-5">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
