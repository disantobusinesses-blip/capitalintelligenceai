'use client'

import { useState } from 'react'
import { Bot } from 'lucide-react'
import QuotePopupButton from '@/components/QuotePopupButton'

const services = [
  {
    id: 'b2b-crm-ai-platform',
    icon: Bot,
    title: 'B2B Custom CRM AI Acquisition Platform',
    price: 'Custom Pricing',
    priceNote: 'book a discovery call',
    description: 'A fully private, custom-built AI-powered CRM and customer acquisition system, built exclusively around your industry, niche, and sales process.',
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
    detailsLink: '/services/b2b-crm-ai-platform',
  },
]

export default function ServiceSelection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section id="services" className="bg-[#F8F7F4] py-[80px] px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            Other Services
          </h2>
          <p className="text-[18px] text-[#6B6560] max-w-xl mx-auto">
            Choose the service that fits your business
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 max-w-md mx-auto gap-6 items-stretch">
          {services.map((service) => {
            const Icon = service.icon
            const isHovered = hoveredId === service.id
            return (
              <div
                key={service.id}
                className="bg-white rounded-[10px] p-7 flex flex-col h-full transition-all duration-200"
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
                <div className="mb-0.5">
                  <p className="text-[17px] font-bold text-[#5C3D2E]">
                    {service.price}
                    <span className="text-[10px] font-normal text-[#9E9790] ml-1">+ GST</span>
                    <span className="text-[13px] font-normal text-[#9E9790] ml-1">{service.priceNote}</span>
                  </p>
                </div>

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

                {/* CTA */}
                <QuotePopupButton
                  service="B2B AI Platform"
                  className="w-full bg-[#1A1A1A] text-white font-semibold py-3 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200 mt-auto text-sm text-center block"
                >
                  {service.cta}
                </QuotePopupButton>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
