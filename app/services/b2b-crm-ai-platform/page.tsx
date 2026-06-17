import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Check, Bot, Database, Target, Workflow, Lock, Server } from 'lucide-react'
import QuotePopupButton from '@/components/QuotePopupButton'

export const metadata: Metadata = {
  title: 'B2B Custom CRM AI Acquisition Platform – Intelligent AI Systems',
  description:
    'A fully private, custom-built AI-powered CRM and customer acquisition system designed exclusively for B2B businesses. AI lead scraping, pipeline management, and automated follow-up — built only for your business.',
  keywords:
    'B2B CRM AI, custom CRM platform, AI lead acquisition, B2B lead generation, custom AI system, CRM pipeline management',
  openGraph: {
    title: 'B2B Custom CRM AI Acquisition Platform – Intelligent AI Systems',
    description:
      'Private, AI-powered CRM and lead acquisition system built exclusively for your B2B business — your data, your system, guaranteed results.',
    url: 'https://intelligentaisystem.com/services/b2b-crm-ai-platform',
    type: 'website',
  },
}

const features = [
  {
    icon: Bot,
    title: 'AI Trained on Your Market',
    description: 'The AI is configured and trained specifically on your industry, target market, and ideal customer profile — not a generic model.',
  },
  {
    icon: Database,
    title: 'Private Lead Database',
    description: 'All scraped leads are stored in your own dedicated database. Your data stays yours — never shared, never accessible to competitors.',
  },
  {
    icon: Target,
    title: 'Qualified Lead Acquisition',
    description: 'The platform automatically surfaces qualified leads from your target market and feeds them directly into your CRM pipeline.',
  },
  {
    icon: Workflow,
    title: 'Automated Follow-Up Workflows',
    description: 'Set and forget follow-up sequences that keep your pipeline active — leads are tracked and nurtured automatically.',
  },
  {
    icon: Lock,
    title: 'Exclusively Yours',
    description: 'No two clients get the same system. Your platform is built around your business only — competitors cannot access the same tool.',
  },
  {
    icon: Server,
    title: 'Hosted & Managed',
    description: 'We host and maintain the entire system on a monthly plan so you can focus on closing deals, not managing infrastructure.',
  },
]

const included = [
  'AI trained specifically on your industry and target market',
  'Private lead scraping engine built for your niche',
  'Dedicated lead storage database — your data only',
  'Full CRM pipeline management system',
  'Automated lead tracking and follow-up workflows',
  'Custom onboarding and system walkthrough',
  'Built exclusively for your business',
  'Ongoing hosting and system management',
  'Ongoing updates and optimisations',
  'Direct support from your build team',
]

export default function B2BCrmAiPlatformPage() {
  return (
    <div className="min-h-[100dvh] bg-[#F8F7F4] pb-24 pt-[74px]">
      {/* Header */}
      <header className="py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/services"
            className="flex items-center gap-2 text-[#6B6560] hover:text-[#1A1A1A] transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Services
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[6px] bg-[#F8F7F4] border border-[#E8E4DF] flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#5C3D2E]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1A1A1A]">Intelligent AI Systems</h3>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#5C3D2E] text-[13px] font-semibold tracking-[1.5px] uppercase mb-3">
            B2B AI Platform
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6 leading-tight">
            B2B Custom CRM AI<br className="hidden md:block" /> Acquisition Platform
          </h1>
          <p className="text-[18px] text-[#6B6560] mb-10 leading-relaxed max-w-2xl mx-auto">
            A fully private, custom-built AI-powered CRM and customer acquisition system designed exclusively for B2B businesses. No generic tools. No shared databases. A system built only for your business.
          </p>

          {/* Pricing & Value Anchor */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <div
              className="bg-white rounded-[10px] px-8 py-6 text-center"
              style={{ border: '1px solid #E8E4DF' }}
            >
              <p className="text-[12px] font-semibold text-[#9E9790] uppercase tracking-widest mb-1">Pricing</p>
              <p className="text-[28px] font-extrabold text-[#1A1A1A] leading-none">Custom Pricing <span className="text-[12px] font-normal text-[#9E9790]">+ GST</span></p>
              <p className="text-[13px] text-[#9E9790] mt-2">Book a discovery call to get your quote</p>
            </div>
            <div
              className="bg-[#F8F7F4] rounded-[10px] px-8 py-6 text-center"
              style={{ border: '1px solid #E8E4DF' }}
            >
              <p className="text-[12px] font-semibold text-[#5C3D2E] uppercase tracking-widest mb-1">Market Value</p>
              <p className="text-[28px] font-extrabold text-[#1A1A1A] leading-none">$5,000 – $35,000</p>
              <p className="text-[13px] text-[#9E9790] mt-2">depending on lead volume & acquisition value</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Details Banner */}
      <section className="px-6" style={{ borderTop: '1px solid #E8E4DF', borderBottom: '1px solid #E8E4DF' }}>
        <div className="max-w-[1200px] mx-auto py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-[11px] font-semibold text-[#9E9790] uppercase tracking-widest mb-1">Deposit to Begin</p>
              <p className="text-[20px] font-bold text-[#1A1A1A]">$2,000</p>
              <p className="text-[12px] text-[#9E9790]">balance due on completion</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#9E9790] uppercase tracking-widest mb-1">Build Timeline</p>
              <p className="text-[20px] font-bold text-[#1A1A1A]">10–15 Days</p>
              <p className="text-[12px] text-[#9E9790]">depending on complexity</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#9E9790] uppercase tracking-widest mb-1">Guarantee</p>
              <p className="text-[20px] font-bold text-[#1A1A1A]">Results or Refund</p>
              <p className="text-[12px] text-[#9E9790]">full money back guarantee</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#9E9790] uppercase tracking-widest mb-1">After Launch</p>
              <p className="text-[20px] font-bold text-[#1A1A1A]">Monthly Plan</p>
              <p className="text-[12px] text-[#9E9790]">hosting & system management</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3 text-center">How It Works For You</h2>
          <p className="text-[#6B6560] text-center mb-10 text-base max-w-xl mx-auto">
            Every platform is built from scratch around your business. Here&apos;s what&apos;s inside every build.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="bg-white border border-[#E8E4DF] rounded-[10px] p-6 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-shadow duration-200"
                >
                  <div className="w-11 h-11 bg-[#F8F7F4] rounded-[6px] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#5C3D2E]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[17px] font-bold text-[#1A1A1A] mb-2">{feature.title}</h3>
                  <p className="text-[#6B6560] text-sm leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-6" style={{ borderTop: '1px solid #E8E4DF' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3 text-center">What&apos;s Included</h2>
          <p className="text-[#6B6560] text-center mb-10 text-base">
            Every build includes everything below — no hidden extras, no upsells after signing.
          </p>
          <div className="bg-white rounded-[10px] p-8" style={{ border: '1px solid #E8E4DF' }}>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-[#1A1A1A] text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Guarantee Callout */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1A1A1A] rounded-[10px] p-10 text-center">
            <p className="text-[13px] font-semibold text-[#9E9790] uppercase tracking-widest mb-3">Our Guarantee</p>
            <p className="text-[38px] md:text-[48px] font-extrabold text-white leading-none mb-3">
              Results or Full Refund
            </p>
            <p className="text-[#9E9790] text-base max-w-xl mx-auto">
              We stand behind every platform we build. If your system doesn&apos;t deliver qualified leads from your target market, you get your money back — no questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
            Ready to Build Your AI Acquisition System?
          </h2>
          <p className="text-[#6B6560] mb-3 text-base">
            Book a discovery call and we&apos;ll map out exactly how the platform will be built for your business.
          </p>
          <p className="text-[13px] text-[#9E9790] mb-8">
            $2,000 deposit to start · 10–15 day build · balance on completion
          </p>
          <QuotePopupButton
            service="B2B AI Platform"
            className="inline-block px-10 py-4 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-base transition-colors duration-200 hover:bg-[#2D2D2D]"
          >
            Book a Discovery Call
          </QuotePopupButton>
        </div>
      </section>
    </div>
  )
}
