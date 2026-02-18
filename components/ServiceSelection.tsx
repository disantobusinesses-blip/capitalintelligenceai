'use client'

import { ArrowRight, Sparkles, Package, Wrench } from 'lucide-react'
import { useRouter } from 'next/navigation'

const services = [
  {
    id: 'landing-page',
    title: 'Need a Landing Page',
    description: 'Perfect for startups and businesses looking to establish their online presence with a stunning single-page website.',
    icon: Sparkles,
    features: ['Modern Design', 'Mobile Responsive', 'Fast Loading', 'SEO Optimized'],
    path: '/services/landing-page',
    color: 'baby-blue',
  },
  {
    id: 'full-package',
    title: 'Website + Full Package',
    description: 'Complete solution including multi-page website, ongoing maintenance, and comprehensive digital strategy.',
    icon: Package,
    features: ['Custom Design', 'Multiple Pages', 'Monthly Support', 'Analytics Dashboard'],
    path: '/services/full-package',
    color: 'platinum',
  },
  {
    id: 'enhancement',
    title: 'Already Have a Website?',
    description: 'Enhance your existing website with our premium packages, AI integration, and ongoing optimization services.',
    icon: Wrench,
    features: ['Performance Boost', 'AI Integration', 'SEO Enhancement', 'Continuous Updates'],
    path: '/services/enhancement',
    color: 'baby-blue',
  },
]

export default function ServiceSelection() {
  const router = useRouter()

  return (
    <section className="relative min-h-screen py-20 px-6 overflow-hidden bg-tech-black">
      {/* Animated grid background */}
      <div className="absolute inset-0 animated-grid opacity-30" />
      
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-tech-baby-blue rounded-full blur-3xl opacity-10 animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tech-baby-blue rounded-full blur-3xl opacity-10 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-tech-white mb-6 animate-fade-in">
            What Can We Build For You?
          </h2>
          <p className="text-xl text-tech-platinum max-w-3xl mx-auto">
            Choose the service that best fits your needs and let's create something amazing together
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className="group relative bg-tech-gray border border-tech-baby-blue/20 rounded-2xl p-8 smooth-transition hover:border-tech-baby-blue hover:shadow-glow cursor-pointer"
                onClick={() => router.push(service.path)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-blue opacity-0 group-hover:opacity-5 rounded-2xl smooth-transition" />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-blue rounded-xl flex items-center justify-center group-hover:scale-110 smooth-transition">
                    <Icon className="w-8 h-8 text-tech-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-tech-white mb-4 group-hover:text-tech-baby-blue smooth-transition">
                  {service.title}
                </h3>
                
                <p className="text-tech-platinum mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-tech-platinum-light text-sm">
                      <div className="w-1.5 h-1.5 bg-tech-baby-blue rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className="w-full px-6 py-3 bg-tech-baby-blue text-tech-black rounded-lg font-semibold flex items-center justify-center gap-2 smooth-transition hover:bg-tech-baby-blue-light group-hover:shadow-glow-sm">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-tech-platinum mb-4">
            Not sure which option is right for you?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('chat');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 border-2 border-tech-baby-blue text-tech-baby-blue rounded-lg font-semibold smooth-transition hover:bg-tech-baby-blue hover:text-tech-black"
          >
            Talk to Our AI Assistant
          </button>
        </div>
      </div>
    </section>
  )
}
