'use client'

import { Shield, Zap, TrendingUp, Users, Headphones, Clock } from 'lucide-react'

const pricingDetails = [
  {
    plan: 'Website Hosting',
    price: '$119/month',
    icon: Shield,
    includes: [
      'Website hosting',
      'Website maintenance',
      'Security updates',
      'Monthly backups',
      'Up to 1hr tech support/month',
    ],
  },
  {
    plan: 'Revenue Optimisation',
    price: '$279/month',
    icon: TrendingUp,
    includes: [
      'Everything in Website Hosting, plus:',
      'Conversion rate optimization strategies',
      'A/B testing setup and analysis',
      'Advanced SEO enhancements and monitoring',
      'Lead generation tool integration',
      'Google Analytics setup and reporting',
      'Monthly performance reports with insights',
      'Priority email support (24-hour response)',
      'Landing page optimization',
    ],
  },
  {
    plan: 'Done-For-You Digital Team',
    price: '$449/month',
    icon: Users,
    includes: [
      'Everything in Revenue Optimisation, plus:',
      'Dedicated digital strategist assigned to your account',
      'Custom development work (up to 10 hours/month)',
      'Advanced third-party integrations',
      'Marketing automation setup and management',
      'Social media content planning',
      'Weekly strategy and performance calls',
      '24/7 priority support with 4-hour response time',
      'Quarterly comprehensive business reviews',
    ],
  },
]

export default function PricingDetails() {
  return (
    <section className="py-24 px-6 bg-luxury-off-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-luxury-charcoal mb-4">
            What's Included
          </h2>
          <p className="text-xl text-luxury-silver-dark max-w-2xl mx-auto">
            Clear breakdown of features in each monthly plan
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingDetails.map((detail, index) => {
            const Icon = detail.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-luxury-silver-light smooth-transition hover:luxury-shadow hover:scale-105"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-silver rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-luxury-charcoal">
                      {detail.plan}
                    </h3>
                    <p className="text-luxury-silver-dark font-semibold">
                      {detail.price}
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3">
                  {detail.includes.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`text-luxury-charcoal leading-relaxed ${
                        item.includes('Everything in') ? 'font-semibold mt-4' : ''
                      }`}
                    >
                      {item.includes('Everything in') ? (
                        <span className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-luxury-silver" />
                          {item}
                        </span>
                      ) : (
                        <span className="flex items-start gap-2">
                          <span className="text-luxury-silver mt-1.5">•</span>
                          {item}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-silver rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-luxury-charcoal mb-2">
              No Long-Term Contracts
            </h3>
            <p className="text-luxury-silver-dark">
              Month-to-month billing. Cancel or upgrade anytime.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-silver rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-luxury-charcoal mb-2">
              Dedicated Support
            </h3>
            <p className="text-luxury-silver-dark">
              Expert support team ready to assist with any questions.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-silver rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-luxury-charcoal mb-2">
              Continuous Optimization
            </h3>
            <p className="text-luxury-silver-dark">
              Your website improves every month with our ongoing enhancements.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
