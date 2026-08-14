'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Check, MapPin, Star, QrCode, FileText, Image, Settings } from 'lucide-react'
import QuotePopupButton from '@/components/QuotePopupButton'

const setupFeatures = [
  {
    icon: Settings,
    title: 'Full Setup or Optimisation',
    description: 'We create or fully optimise your Google Business Profile from the ground up, categories, services, hours, and more.',
  },
  {
    icon: FileText,
    title: 'Professional Business Description',
    description: 'A concise, keyword-rich description written to build trust and improve your local search ranking.',
  },
  {
    icon: QrCode,
    title: 'Review QR Code',
    description: 'A ready-to-print QR code you can hand to customers to make leaving a review effortless.',
  },
  {
    icon: Image,
    title: 'Cover Image Supplied',
    description: 'One professionally sourced cover image to make your profile look polished and credible from day one.',
  },
  {
    icon: Star,
    title: 'Handover Notes',
    description: 'Clear, simple notes showing you exactly how to manage the profile yourself after we set it up.',
  },
]

const setupIncludes = [
  'Full Google Business Profile setup or optimisation',
  'Business category and service configuration',
  'Professionally written business description',
  'Review QR code for customers',
  '1 professional cover image supplied by us',
  'Handover notes so you can manage it yourself',
]

const managementIncludes = [
  'Ongoing profile edits as your business changes',
  'Review response support',
  'Image and post updates',
  'Light optimisation over time',
]

export default function GoogleBusinessProfilePage() {
  const [addonExpanded, setAddonExpanded] = useState(false)

  return (
    <main className="min-h-[100dvh] bg-[#F8F7F4] pt-[74px]">

      {/* Header */}
      <header className="py-6 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#6B6560] hover:text-[#1A1A1A] transition-colors duration-150"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[6px] bg-[#F8F7F4] border border-[#E8E4DF] flex items-center justify-center">
              <MapPin className="w-5 h-5 text-ias-brown-dark" strokeWidth={1.5} />
            </div>
            <span className="text-sm font-bold text-[#1A1A1A] hidden sm:block">Intelligent AI Systems</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-white border border-[#E8E4DF] rounded-full text-xs font-semibold text-ias-brown-dark uppercase tracking-wide mb-6">
            Local Visibility
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-tight mb-6">
            Google Business Profile Setup
          </h1>
          <p className="text-lg md:text-xl text-[#6B6560] leading-relaxed mb-10 max-w-2xl mx-auto">
            Look more legitimate online, improve your local visibility, and make it
            easier for happy customers to find and review you, all done for you in one hit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <QuotePopupButton
              service="Google Business Profile"
              className="px-8 py-4 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-base transition-colors duration-200 hover:bg-[#2D2D2D]"
            >
              Enquire Now, A$299
            </QuotePopupButton>
            <a
              href="#what-you-get"
              className="px-8 py-4 border border-[#1A1A1A] text-[#1A1A1A] rounded-[6px] font-semibold text-base transition-colors duration-200 hover:bg-[#1A1A1A] hover:text-white"
            >
              See What's Included
            </a>
          </div>
        </div>
      </section>

      {/* What you get, feature cards */}
      <section id="what-you-get" className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">What You Get</h2>
            <p className="text-[#6B6560] text-base max-w-lg mx-auto">
              Everything you need to show up confidently on Google from day one.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {setupFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="bg-[#F8F7F4] border border-[#E8E4DF] rounded-[8px] p-6 transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
                >
                  <div className="w-10 h-10 bg-white border border-[#E8E4DF] rounded-[6px] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-ias-brown-dark" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-bold text-[#1A1A1A] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#6B6560] leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">Simple, Transparent Pricing</h2>
            <p className="text-[#6B6560] text-base">One price. No lock-in. No surprises.</p>
          </div>

          {/* Setup card */}
          <div className="bg-[#1A1A1A] rounded-[10px] p-8 md:p-10 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-bold text-[#9E9790] uppercase tracking-widest mb-1">One-time setup</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white">Google Business Profile Setup</h3>
              </div>
              <div className="sm:text-right shrink-0">
                <span className="text-4xl md:text-5xl font-bold text-white">A$299 <span className="text-sm font-normal text-[#9E9790]">+ GST</span></span>
                <p className="text-sm text-[#9E9790] mt-1">one-time · no monthly fees</p>
              </div>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {setupIncludes.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-[#D1CDC8]">{item}</span>
                </li>
              ))}
            </ul>
            <QuotePopupButton
              service="Google Business Profile"
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#1A1A1A] rounded-[6px] font-semibold text-base transition-colors duration-200 hover:bg-[#F8F7F4] inline-block text-center"
            >
              Enquire Now
            </QuotePopupButton>
          </div>

          {/* Add-on card */}
          <div className="bg-white border border-[#E8E4DF] rounded-[10px] overflow-hidden">
            <button
              type="button"
              onClick={() => setAddonExpanded((v) => !v)}
              className="w-full flex items-center justify-between px-7 py-5 text-left hover:bg-[#F8F7F4] transition-colors duration-150"
            >
              <div>
                <span className="text-xs font-bold text-ias-brown-dark uppercase tracking-widest block mb-0.5">
                  Optional Add-on
                </span>
                <span className="text-base font-bold text-[#1A1A1A]">
                  Google Business Profile Management
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <span className="text-lg font-bold text-[#1A1A1A]">A$79<span className="text-sm font-normal text-[#6B6560]">/month</span> <span className="text-[10px] font-normal text-[#9E9790]">+ GST</span></span>
                <svg
                  className={`w-5 h-5 text-[#6B6560] transition-transform duration-200 ${addonExpanded ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            {addonExpanded && (
              <div className="px-7 pb-6 border-t border-[#E8E4DF]">
                <p className="text-sm text-[#6B6560] leading-relaxed mt-4 mb-4">
                  Keep your profile active and well-maintained without lifting a finger.
                  We handle the ongoing upkeep so your profile stays accurate and up to date.
                </p>
                <ul className="space-y-2.5 mb-6">
                  {managementIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-sm text-[#1A1A1A]">{item}</span>
                    </li>
                  ))}
                </ul>
                <QuotePopupButton
                  service="Google Business Profile"
                  className="w-full sm:w-auto px-6 py-3 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-sm transition-colors duration-200 hover:bg-[#2D2D2D] inline-block text-center"
                >
                  Enquire About the Add-on
                </QuotePopupButton>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            Ready to Show Up on Google?
          </h2>
          <p className="text-[#6B6560] text-base mb-8 leading-relaxed">
            A properly set-up Google Business Profile is one of the highest-ROI things a local
            business can do. Get yours done right, once, for A$299.
          </p>
          <QuotePopupButton
            service="Google Business Profile"
            className="px-8 py-4 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-base transition-colors duration-200 hover:bg-[#2D2D2D] inline-block"
          >
            Enquire Now
          </QuotePopupButton>
          <p className="text-xs text-[#9E9790] mt-4">No lock-in contracts. Remote-first. Fast turnaround.</p>
        </div>
      </section>

    </main>
  )
}
