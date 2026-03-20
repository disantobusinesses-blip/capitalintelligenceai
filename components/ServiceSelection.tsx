'use client'

import { useState } from 'react'
import { useQuoteModal } from '@/context/QuoteModalContext'
import { Globe, Package, TrendingUp } from 'lucide-react'

const services = [
  {
    id: 'landing-page',
    icon: Globe,
    title: 'Landing Page',
    price: 'From $599 AUD',
    description: 'A high-converting single-page website designed to turn visitors into leads.',
    features: [
      'Custom modern design',
      'Mobile responsive & fast loading',
      'SEO optimised on-page',
      'Contact form included',
    ],
  },
  {
    id: 'full-package',
    icon: Package,
    title: 'Website + Full Package',
    price: 'From $1,999 AUD',
    description: 'Complete multi-page website with ongoing support and digital strategy.',
    features: [
      'Custom multi-page design',
      'Monthly maintenance & support',
      'Analytics dashboard setup',
      'SEO + AI search indexing',
    ],
  },
  {
    id: 'seo-plans',
    icon: TrendingUp,
    title: 'Monthly SEO Plans',
    price: 'From $119/month',
    description: 'Consistent monthly SEO to grow your Google rankings and organic traffic.',
    features: [
      'Keyword research & targeting',
      'Monthly blog content creation',
      'Google Business Profile optimisation',
      'Monthly performance reports',
    ],
  },
]

export default function ServiceSelection() {
  const { openModal } = useQuoteModal()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

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
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon
            const isHovered = hoveredId === service.id
            return (
              <div
                key={service.id}
                className="bg-white rounded-[10px] p-8 flex flex-col transition-all duration-200"
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
                <h3 className="text-[20px] font-bold text-[#1A1A1A] mb-1">{service.title}</h3>

                {/* Price */}
                <p className="text-[18px] font-bold text-[#5C3D2E] mb-3">{service.price}</p>

                {/* Description */}
                <p className="text-[#6B6560] text-sm mb-5 leading-relaxed">{service.description}</p>

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
                <button
                  onClick={openModal}
                  className="w-full bg-[#1A1A1A] text-white font-semibold py-3 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200 mt-auto"
                >
                  Get Started
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
