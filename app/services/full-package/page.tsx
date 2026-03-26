'use client'

import Link from 'next/link'
import { ArrowLeft, Check, Zap, Package, TrendingUp, BarChart } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function FullPackageService() {
  const router = useRouter()

  const tiers = [
    {
      name: 'Website Care',
      price: '$169',
      period: '/month',
      description: 'Essential maintenance and security',
      features: [
        'Monthly maintenance',
        'Security updates',
        'Content updates (5/month)',
        'Performance optimization',
        'Backup & recovery',
        'Email support',
      ],
    },
    {
      name: 'Revenue Optimisation',
      price: '$279',
      period: '/month',
      description: 'Growth-focused with SEO & analytics',
      featured: true,
      features: [
        'Everything in Website Care',
        'Conversion optimization',
        'A/B testing & analytics',
        'SEO enhancements',
        'Lead generation tools',
        'Monthly reports',
        'Priority support',
      ],
    },
    {
      name: 'Done-For-You Digital Team',
      price: '$449',
      period: '/month',
      description: 'Complete digital management',
      features: [
        'Everything in Revenue Optimisation',
        'Dedicated strategist',
        'Custom development',
        'Advanced integrations',
        'Marketing automation',
        'Social media management',
        'Weekly strategy calls',
        '24/7 priority support',
      ],
    },
  ]

  return (
    <div className="min-h-[100dvh] bg-[#F8F7F4]">
      {/* Header */}
      <header className="py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#6B6560] hover:text-[#1A1A1A] smooth-transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[6px] bg-[#F8F7F4] border border-[#E8E4DF] flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#5C3D2E]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1A1A1A]">Intelligent Systems</h3>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-block px-4 py-2 bg-[#F8F7F4] border border-[#E8E4DF] rounded-full text-[#5C3D2E] font-semibold mb-6">
            Complete Solution
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-6">
            Website + Full Package
          </h1>
          <p className="text-xl text-[#6B6560] mb-8 leading-relaxed">
            Complete solution including multi-page website, ongoing maintenance, 
            and comprehensive digital strategy for continuous growth.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1A1A1A] text-center mb-12">
            Choose Your Monthly Plan
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-[10px] p-8 smooth-transition hover:scale-105 ${
                  tier.featured
                    ? 'border-2 border-[#1A1A1A] shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
                    : 'border border-[#E8E4DF]'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-[#1A1A1A] text-white rounded-full text-sm font-semibold">
                    Recommended
                  </div>
                )}
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">{tier.name}</h3>
                <p className="text-[#6B6560] mb-4">{tier.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-[#1A1A1A]">{tier.price}</span>
                  <span className="text-[#6B6560]">{tier.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#1A1A1A] flex-shrink-0 mt-0.5" />
                      <span className="text-[#1A1A1A]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-[6px] font-semibold smooth-transition ${
                    tier.featured
                      ? 'bg-[#1A1A1A] text-white hover:bg-[#2D2D2D]'
                      : 'border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Setup Fee */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            Website Setup & Development
          </h2>
          <p className="text-xl text-[#6B6560] mb-8">
            One-time setup fee for your custom multi-page website
          </p>
          <div className="bg-[#1A1A1A] border border-[#E8E4DF] rounded-[10px] p-8">
            <div className="mb-4">
              <span className="text-5xl font-bold text-white">$2,499</span>
              <span className="text-gray-400 ml-2">one-time</span>
            </div>
            <p className="text-gray-400 mb-6">
              Includes custom design, development, and deployment
            </p>
            <ul className="grid md:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-white" />
                <span className="text-white">Custom design</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-white" />
                <span className="text-white">Up to 10 pages</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-white" />
                <span className="text-white">Mobile responsive</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-white" />
                <span className="text-white">SEO setup</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-white" />
                <span className="text-white">Analytics integration</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-white" />
                <span className="text-white">Contact forms</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-6">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-xl text-[#6B6560] mb-8">
            Let's build something amazing together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const element = document.getElementById('chat');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  router.push('/#chat');
                }
              }}
              className="px-8 py-4 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-lg smooth-transition hover:bg-[#2D2D2D] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              Talk to Our AI Assistant
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-4 border-2 border-[#1A1A1A] text-[#1A1A1A] rounded-[6px] font-semibold text-lg smooth-transition hover:bg-[#1A1A1A] hover:text-white"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
