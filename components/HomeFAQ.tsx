import { ChevronDown } from 'lucide-react'
import { display, body } from '@/lib/fonts'

const FAQS = [
  {
    q: 'How long does a website build take?',
    a: "Landing pages and templates are live within 24–48 hours. Custom multi-page websites typically take around 10–15 business days depending on scope, you'll get a clear timeline before any work begins.",
  },
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
          <p className="text-[#C9A07A] text-[13px] font-semibold tracking-[1.5px] uppercase">
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
              className="group bg-[#F8F7F4] border border-[#E8E4DF] rounded-[10px] px-6 py-1 open:border-[#C9A07A]"
            >
              <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none text-[#3D2817] font-medium text-[16px]">
                {item.q}
                <ChevronDown className="w-4 h-4 text-[#C9A07A] flex-shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="text-[#6B6560] text-sm leading-relaxed pb-5">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
