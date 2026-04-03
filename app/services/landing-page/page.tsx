'use client'

import Link from 'next/link'
import { ArrowLeft, Check, Zap, Smartphone, Gauge, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LandingPageService() {
  const router = useRouter()

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed with sub-second load times',
    },
    {
      icon: Smartphone,
      title: 'Mobile Responsive',
      description: 'Perfect display on all devices and screen sizes',
    },
    {
      icon: Gauge,
      title: 'High Performance',
      description: 'Built with modern tech for optimal performance',
    },
    {
      icon: Search,
      title: 'SEO Optimized',
      description: 'Structured for maximum search engine visibility',
    },
  ]

  const included = [
    'Custom single-page design',
    'Responsive mobile layout',
    'Contact form integration',
    'Google Analytics setup',
    'SEO optimization',
    'Fast loading speed',
    'Social media links',
    'SSL certificate',
    'Domain setup assistance',
    'One month of support',
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
          <h1 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-6">
            Need a Landing Page?
          </h1>
          <p className="text-xl text-[#6B6560] mb-8 leading-relaxed">
            Perfect for startups and businesses looking to establish their online presence 
            with a stunning, high-converting single-page website.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const element = document.getElementById('pricing');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-lg smooth-transition hover:bg-[#2D2D2D] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              View Pricing
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('features');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border-2 border-[#1A1A1A] text-[#1A1A1A] rounded-[6px] font-semibold text-lg smooth-transition hover:bg-[#1A1A1A] hover:text-white"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1A1A1A] text-center mb-12">
            What You'll Get
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white border border-[#E8E4DF] rounded-[6px] p-6 smooth-transition hover:border-[#5C3D2E] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                >
                  <div className="w-12 h-12 bg-[#F8F7F4] rounded-[6px] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#1A1A1A]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{feature.title}</h3>
                  <p className="text-[#6B6560]">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Included Items */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1A1A1A] text-center mb-12">
            Everything Included
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {included.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white border border-[#E8E4DF] rounded-[6px] p-4"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#1A1A1A]" />
                </div>
                <span className="text-[#1A1A1A]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#1A1A1A] border-2 border-[#1A1A1A] rounded-[10px] p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <h2 className="text-3xl font-bold text-white mb-4">
              Landing Page Package
            </h2>
            <div className="mb-6">
              <span className="text-6xl font-bold text-white">$599 AUD</span>
              <span className="text-gray-400 ml-2">one-time</span>
            </div>
            <p className="text-gray-400 mb-8">
              Includes design, development, and deployment of your landing page
            </p>
            <button
              onClick={() => router.push('/')}
              className="w-full px-8 py-4 bg-white text-[#1A1A1A] rounded-[6px] font-semibold text-lg smooth-transition hover:bg-[#F8F7F4]"
            >
              Get Started Now
            </button>
            <p className="text-sm text-gray-400 mt-4">
              Add monthly maintenance package for ongoing support
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-6">
            Ready to Launch Your Landing Page?
          </h2>
          <p className="text-xl text-[#6B6560] mb-8">
            Let's create something amazing together
          </p>

        </div>
      </section>
    </div>
  )
}
