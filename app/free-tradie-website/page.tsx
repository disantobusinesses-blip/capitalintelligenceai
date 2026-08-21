import type { Metadata } from 'next'
import { CheckCircle, ArrowRight, Smartphone, Globe, Phone, Zap, ShieldCheck, RefreshCw } from 'lucide-react'
import TradieLeadForm from './TradieLeadForm'

export const metadata: Metadata = {
  title: 'Free Tradie Website | $0 Upfront, Capital Intelligence Group',
  description:
    'We build your tradie website for free. $0 upfront, $119/month. Electricians, plumbers, builders and more. Live in 1 day.',
  openGraph: {
    title: 'Free Tradie Website | $0 Upfront, Capital Intelligence Group',
    description:
      'We build your tradie website for free. $0 upfront, $119/month. Electricians, plumbers, builders and more. Live in 1 day.',
    url: 'https://intelligentaisystem.com/free-tradie-website',
    type: 'website',
  },
}

const whatYouGet = [
  { icon: Globe, label: 'Custom-designed tradie website' },
  { icon: Smartphone, label: 'Mobile-optimised' },
  { icon: Zap, label: 'Google-ready (basic SEO)' },
  { icon: Phone, label: 'Contact form + click-to-call' },
  { icon: ShieldCheck, label: 'Hosted and maintained' },
  { icon: RefreshCw, label: 'Updates included' },
]

const steps = [
  {
    num: '01',
    title: 'Fill in the form',
    desc: 'Tell us your trade, business name, and contact details. Takes under a minute.',
  },
  {
    num: '02',
    title: 'We build your site in 1 day',
    desc: 'Our Melbourne-based team builds your professional website, completely free.',
  },
  {
    num: '03',
    title: 'Go live and start getting calls',
    desc: 'Your site is live within 24–48 hours. Start getting enquiries straight away.',
  },
]

const trust = [
  '$0 upfront',
  'Live in 1 day',
  'Melbourne-based team',
  'Cancel anytime',
]

export default function FreeTradieWebsitePage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-[68px]">

      {/* ── Hero ── */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          {/* #60A5FA rather than the #2563EB used for large type and icons on
              this page: at 14px this needs 4.5:1 on the navy and #2563EB is
              3.69:1. See the matching note on /free-website-seo. */}
          <p className="text-sm font-semibold tracking-widest uppercase text-[#60A5FA] mb-4">
            Limited spots available each month
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
            Free Website for Tradies,<br className="hidden md:block" /> Built in 1 Day
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            $0 upfront. Just $119/month to keep it live, updated, and working hard for you.
          </p>
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            Claim My Free Website <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-4 text-sm text-[#94A3B8]">Limited spots available each month.</p>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <div className="border-y border-white/10 py-4 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-[#94A3B8]">
          {trust.map(t => (
            <span key={t} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#2563EB] flex-shrink-0" /> {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── What you get ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What You Get</h2>
          <p className="text-[#94A3B8]">Everything a tradie needs to look professional online and win more jobs.</p>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-5">
          {whatYouGet.map(({ icon: Icon, label }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col items-center text-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2563EB]/15 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#2563EB]" />
              </div>
              <p className="text-sm font-semibold leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-[#94A3B8]">Three simple steps to your free tradie website.</p>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {steps.map(s => (
            <div key={s.num} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="text-4xl font-black text-[#2563EB] mb-4">{s.num}</div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Lead capture form ── */}
      <section id="lead-form" className="py-20 px-6">
        <div className="max-w-lg mx-auto">
          <TradieLeadForm />
        </div>
      </section>

    </main>
  )
}
