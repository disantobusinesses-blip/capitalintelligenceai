'use client'

import { useState } from 'react'
import { useGetStartedModal } from '@/context/GetStartedModalContext'
import { Globe, Package, MapPin, Bot } from 'lucide-react'

const services = [
  {
    id: 'landing-page',
    icon: Globe,
    title: 'Landing Page',
    price: 'From A$599',
    priceNote: 'one-time',
    description: 'A high-converting single-page website designed to turn visitors into leads.',
    features: [
      'Custom modern design',
      'Mobile responsive & fast loading',
      'SEO optimised on-page',
      'Contact form included',
    ],
    addon: null,
    cta: 'Get Started',
  },
  {
    id: 'full-package',
    icon: Package,
    title: 'Website + Full Package',
    price: 'Custom quote',
    priceNote: 'upon request',
    description: 'Complete multi-page website with ongoing support and digital strategy.',
    features: [
      'Custom multi-page design',
      'Monthly maintenance & support',
      'Analytics dashboard setup',
      'SEO + AI search indexing',
    ],
    addon: null,
    cta: 'Get Started',
  },
  {
    id: 'google-business-profile',
    icon: MapPin,
    title: 'Google Business Profile Setup',
    price: 'A$299',
    priceNote: 'one-time',
    description: 'Look more legitimate online, improve your local visibility, and make it easier for happy customers to find and review you.',
    features: [
      'Full GBP setup or optimisation',
      'Business category & service config',
      'Professionally written business description',
      'Review QR code for customers',
      'SMS & email review request templates',
      '1 professional cover image supplied',
      'Handover notes for self-management',
    ],
    addon: {
      label: 'Optional add-on',
      title: 'Ongoing Profile Management',
      price: 'A$79/month',
      features: [
        'Ongoing profile edits',
        'Review response support',
        'Image & post updates',
        'Light optimisation over time',
      ],
    },
    cta: 'Enquire Now',
  },
  {
    id: 'b2b-crm-ai-platform',
    icon: Bot,
    title: 'B2B Custom CRM AI Acquisition Platform',
    price: 'Custom Pricing',
    priceNote: 'book a discovery call',
    description: 'A fully private, custom-built AI-powered CRM and customer acquisition system — built exclusively around your industry, niche, and sales process.',
    features: [
      'AI trained on your industry & target market',
      'Private lead scraping & storage',
      'Full CRM pipeline management',
      'Automated lead tracking & follow-up',
      'Built exclusively for your business',
      'Ongoing hosting & management included',
    ],
    addon: null,
    cta: 'Book a Discovery Call',
  },
]

export default function ServiceSelection() {
  const { openModal } = useGetStartedModal()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [addonOpen, setAddonOpen] = useState(false)

  return (
    <section id="services" className="bg-[#F8F7F4] py-[80px] px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            What Can We Build For You?
          </h2>
          <p className="text-[18px] text-[#6B6560] max-w-xl mx-auto">
            Choose the service that fits your business
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            const isHovered = hoveredId === service.id
            const isGbp = service.id === 'google-business-profile'
            return (
              <div
                key={service.id}
                className="bg-white rounded-[10px] p-7 flex flex-col transition-all duration-200"
                style={{
                  border: '1px solid #E8E4DF',
                  borderTop: isHovered ? '3px solid #5C3D2E' : '1px solid #E8E4DF',
                  boxShadow: isHovered ? '0 8px 32px rgba(0,0,0,0.10)' : '0 2px 12px rgba(0,0,0,0.06)',
                }}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Icon */}
                <div className="mb-5">
                  <Icon className="w-8 h-8 text-[#5C3D2E]" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-1 leading-snug">{service.title}</h3>

                {/* Price */}
                <p className="text-[17px] font-bold text-[#5C3D2E] mb-0.5">
                  {service.price}
                  <span className="text-[13px] font-normal text-[#9E9790] ml-1">{service.priceNote}</span>
                </p>

                {/* Description */}
                <p className="text-[#6B6560] text-sm mb-5 leading-relaxed mt-2">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Add-on (GBP only) */}
                {isGbp && service.addon && (
                  <div className="mb-4 rounded-[6px] border border-[#E8E4DF] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setAddonOpen((v) => !v)}
                      className="w-full flex items-center justify-between px-3 py-2.5 bg-[#F8F7F4] hover:bg-[#F0EDE8] transition-colors duration-150 text-left"
                    >
                      <span className="text-xs font-semibold text-[#5C3D2E] uppercase tracking-wide">
                        {service.addon.label}
                      </span>
                      <span className="text-xs font-bold text-[#1A1A1A] ml-2 whitespace-nowrap">
                        {service.addon.price}
                      </span>
                    </button>
                    {addonOpen && (
                      <ul className="px-3 py-2 space-y-1 bg-white">
                        {service.addon.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-xs text-[#6B6560]">
                            <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* CTA */}
                {service.id === 'b2b-crm-ai-platform' ? (
                  <a
                    href="mailto:sales@intelligentaisystem.com?subject=B2B%20CRM%20AI%20Platform%20-%20Discovery%20Call&body=Hello%2C%20I%27d%20like%20to%20book%20a%20discovery%20call%20for%20the%20B2B%20Custom%20CRM%20AI%20Acquisition%20Platform."
                    className="w-full bg-[#1A1A1A] text-white font-semibold py-3 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200 mt-auto text-sm text-center block"
                  >
                    {service.cta}
                  </a>
                ) : (
                  <button
                    onClick={() => openModal()}
                    className="w-full bg-[#1A1A1A] text-white font-semibold py-3 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200 mt-auto text-sm"
                  >
                    {service.cta}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
