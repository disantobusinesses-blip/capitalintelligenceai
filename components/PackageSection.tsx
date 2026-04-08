'use client'

import { Check, Star } from 'lucide-react'

const packages = [
  {
    name: 'Website Hosting',
    price: 119,
    recommended: false,
    features: [
      'Website hosting',
      'Website maintenance',
      'Security updates',
      'Monthly backups',
      'Up to 1hr tech support/month',
    ],
  },
  {
    name: 'Revenue Optimisation',
    price: 279,
    recommended: true,
    features: [
      'Everything in Website Hosting',
      'Conversion rate optimization',
      'A/B testing & analytics',
      'SEO enhancements',
      'Lead generation tools',
      'Monthly performance reports',
      'Priority support',
    ],
  },
  {
    name: 'Done-For-You Digital Team',
    price: 449,
    recommended: false,
    features: [
      'Everything in Revenue Optimisation',
      'Dedicated digital strategist',
      'Custom development work',
      'Advanced integrations',
      'Marketing automation',
      'Social media management',
      'Weekly strategy calls',
      '24/7 priority support',
    ],
  },
]

export default function PackageSection() {
  return (
    <section id="packages" className="py-24 px-6 bg-luxury-off-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-luxury-charcoal mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-luxury-silver-dark max-w-2xl mx-auto">
            Scalable monthly plans designed to grow with your business
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 smooth-transition ${
                pkg.recommended
                  ? 'luxury-shadow scale-105 border-2 border-luxury-silver'
                  : 'border border-luxury-silver-light hover:luxury-shadow hover:scale-105'
              }`}
            >
              {/* Recommended Badge */}
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-luxury-charcoal text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    Recommended
                  </div>
                </div>
              )}

              {/* Package Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-luxury-charcoal mb-2">
                  {pkg.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-luxury-charcoal">
                    ${pkg.price}
                  </span>
                  <span className="text-luxury-silver-dark">/month</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <Check className="w-5 h-5 text-luxury-silver" strokeWidth={3} />
                    </div>
                    <span className="text-luxury-charcoal">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => {
                  const element = document.getElementById('onboarding');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full py-3 rounded-lg font-semibold smooth-transition ${
                  pkg.recommended
                    ? 'bg-luxury-charcoal text-white hover:bg-luxury-silver-dark'
                    : 'bg-luxury-silver-light text-luxury-charcoal hover:bg-luxury-silver'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
