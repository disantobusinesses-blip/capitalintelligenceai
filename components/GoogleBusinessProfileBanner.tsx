'use client'

import Image from 'next/image'
import { MapPin, Star, ShieldCheck, TrendingUp, CheckCircle } from 'lucide-react'

const trustPoints = [
  {
    icon: MapPin,
    heading: 'Connected to your website',
    body: 'We set up your Google Business Profile and link it directly to your site so every visitor can find, call, or message you instantly.',
  },
  {
    icon: Star,
    heading: 'Ready to collect reviews',
    body: 'We give you a custom review QR code plus done-for-you SMS and email templates — so happy customers can leave a review in seconds.',
  },
  {
    icon: ShieldCheck,
    heading: 'A major trust signal for leads',
    body: "A verified Google profile is one of the first things potential customers check. Businesses with complete, active profiles consistently win more enquiries.",
  },
  {
    icon: TrendingUp,
    heading: 'Stronger local visibility',
    body: 'Show up in Google Maps, local search results, and "near me" queries — putting your business in front of people who are ready to buy.',
  },
]

export default function GoogleBusinessProfileBanner() {
  return (
    <section
      className="bg-[#F8F7F4] py-[72px] px-6"
      style={{ borderBottom: '1px solid #E8E4DF' }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 mb-12">

          {/* Left: text + price badge */}
          <div className="flex-1 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-[600px]">
              <p className="text-[#5C3D2E] text-[13px] font-semibold tracking-[1.5px] uppercase mb-3">
                Google Business Profile
              </p>
              <h2 className="text-[30px] md:text-[40px] font-extrabold text-[#1A1A1A] leading-[1.15] mb-4">
                Get Found on Google.<br className="hidden md:block" /> Build Trust Before They Even Click.
              </h2>
              <p className="text-[17px] text-[#6B6560] leading-relaxed">
                We get your Google Business Profile set up, optimised, and connected to your website —
                so it&apos;s working as a trust signal and lead source from day one.
              </p>
            </div>

            {/* Price badge */}
            <div
              className="flex-shrink-0 bg-white rounded-[10px] px-6 py-5 text-center self-start md:self-auto"
              style={{ border: '1px solid #E8E4DF' }}
            >
              <p className="text-[12px] font-semibold text-[#9E9790] uppercase tracking-widest mb-1">One-time setup</p>
              <p className="text-[32px] font-extrabold text-[#1A1A1A] leading-none">A$299</p>
              <p className="text-[12px] text-[#9E9790] mt-1">+optional A$79/mo management</p>
            </div>
          </div>

          {/* Right: section image */}
          <div className="flex-shrink-0 w-full lg:w-[420px] flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2 bg-[#EAF5EA] text-[#1A1A1A] text-[12px] font-semibold rounded-[6px] px-4 py-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Results in 7 days of setup</span>
            </div>
            <div className="rounded-[12px] overflow-hidden" style={{ border: '1px solid #E8E4DF' }}>
              <Image
                src="/HBSgbp.png"
                alt="Google Business Profile setup"
                width={420}
                height={320}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>

        {/* Trust point cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {trustPoints.map((point) => {
            const Icon = point.icon
            return (
              <div
                key={point.heading}
                className="bg-white rounded-[10px] p-6 flex flex-col transition-shadow duration-200 hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)]"
                style={{ border: '1px solid #E8E4DF' }}
              >
                <div className="mb-4">
                  <Icon className="w-6 h-6 text-[#5C3D2E]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[15px] font-bold text-[#1A1A1A] mb-2 leading-snug">{point.heading}</h3>
                <p className="text-[13px] text-[#6B6560] leading-relaxed flex-1">{point.body}</p>
              </div>
            )
          })}
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="mailto:sales@intelligentaisystem.com?subject=Get%20a%20Free%20Quote&body=Hello%20IAS%2C%20requesting%20a%20quote%20for%20the%20following%3A%20"
            className="bg-[#1A1A1A] text-white font-semibold px-7 py-3.5 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200 text-[15px]"
          >
            Enquire About GBP Setup — A$299
          </a>
          <a
            href="/services/google-business-profile"
            className="text-[14px] font-semibold text-[#5C3D2E] hover:underline underline-offset-2 transition-colors duration-150"
          >
            See everything that&apos;s included →
          </a>
        </div>

      </div>
    </section>
  )
}
