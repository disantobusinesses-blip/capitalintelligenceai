'use client'

import { Upload, Layout, Settings, Rocket, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    number: 1,
    title: 'Choose Plan',
    description: 'Select the monthly package that fits your business needs',
    icon: CheckCircle2,
  },
  {
    number: 2,
    title: 'Upload Logo + Brand Assets',
    description: 'Share your brand materials and visual identity',
    icon: Upload,
  },
  {
    number: 3,
    title: 'Select Layout Style',
    description: 'Choose from premium templates designed for your industry',
    icon: Layout,
  },
  {
    number: 4,
    title: 'Choose Features',
    description: 'Configure integrations and functionality for your site',
    icon: Settings,
  },
  {
    number: 5,
    title: 'Launch + Ongoing Plan',
    description: 'Go live and enjoy continuous optimisation and support',
    icon: Rocket,
  },
]

export default function OnboardingSection() {
  return (
    <section id="onboarding" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-luxury-charcoal mb-4">
            Simple Onboarding Process
          </h2>
          <p className="text-xl text-luxury-silver-dark max-w-2xl mx-auto">
            From selection to launch in just 5 streamlined steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-5 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-luxury-silver-light z-0" />
                )}

                {/* Step Card */}
                <div className="relative bg-luxury-off-white rounded-2xl p-6 border border-luxury-silver-light smooth-transition hover:luxury-shadow hover:scale-105 z-10">
                  {/* Step Number Badge */}
                  <div className="w-12 h-12 bg-gradient-silver rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-white font-bold text-xl">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <Icon className="w-10 h-10 text-luxury-charcoal" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-luxury-charcoal mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-sm text-luxury-silver-dark text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Timeline for Mobile */}
        <div className="md:hidden mt-12 space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="flex gap-4">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-silver rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-full bg-luxury-silver-light mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-6 h-6 text-luxury-charcoal" strokeWidth={1.5} />
                    <h3 className="text-lg font-bold text-luxury-charcoal">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-luxury-silver-dark leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => {
              const element = document.getElementById('packages');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-luxury-charcoal text-white rounded-lg font-semibold text-lg luxury-shadow smooth-transition hover:bg-luxury-silver-dark hover:scale-105"
          >
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  )
}
