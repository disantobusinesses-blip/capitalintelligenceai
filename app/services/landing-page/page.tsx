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
    <div className="min-h-[100dvh]">
      {/* Header */}
      <header className="py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-tech-white hover:text-tech-platinum-light smooth-transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-blue flex items-center justify-center shadow-glow-sm">
              <Zap className="w-5 h-5 text-tech-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-tech-white">Intelligent Systems</h3>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h1 className="text-5xl md:text-6xl font-bold text-tech-white mb-6">
            Need a Landing Page?
          </h1>
          <p className="text-xl text-tech-platinum mb-8 leading-relaxed">
            Perfect for startups and businesses looking to establish their online presence 
            with a stunning, high-converting single-page website.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const element = document.getElementById('pricing');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-tech-baby-blue text-tech-black rounded-lg font-semibold text-lg smooth-transition hover:bg-tech-baby-blue-light hover:shadow-glow"
            >
              View Pricing
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('features');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border-2 border-tech-baby-blue text-tech-white rounded-lg font-semibold text-lg smooth-transition hover:bg-tech-baby-blue hover:text-tech-black"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-tech-white text-center mb-12">
            What You'll Get
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-tech-black border border-tech-baby-blue/20 rounded-xl p-6 smooth-transition hover:border-tech-baby-blue hover:shadow-glow-sm"
                >
                  <div className="w-12 h-12 bg-gradient-blue rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-tech-white" />
                  </div>
                  <h3 className="text-xl font-bold text-tech-white mb-2">{feature.title}</h3>
                  <p className="text-tech-platinum">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Included Items */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-tech-white text-center mb-12">
            Everything Included
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {included.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-tech-gray border border-tech-baby-blue/10 rounded-lg p-4"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-tech-baby-blue rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-tech-black" />
                </div>
                <span className="text-tech-white">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-tech-black border-2 border-tech-baby-blue rounded-2xl p-8 text-center shadow-glow">
            <h2 className="text-3xl font-bold text-tech-white mb-4">
              Landing Page Package
            </h2>
            <div className="mb-6">
              <span className="text-6xl font-bold text-tech-white">$1,299</span>
              <span className="text-tech-platinum ml-2">one-time</span>
            </div>
            <p className="text-tech-platinum mb-8">
              Includes design, development, and deployment of your landing page
            </p>
            <button
              onClick={() => router.push('/')}
              className="w-full px-8 py-4 bg-tech-baby-blue text-tech-black rounded-lg font-semibold text-lg smooth-transition hover:bg-tech-baby-blue-light hover:shadow-glow-lg"
            >
              Get Started Now
            </button>
            <p className="text-sm text-tech-platinum mt-4">
              Add monthly maintenance package for ongoing support
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-4xl font-bold text-tech-white mb-6">
            Ready to Launch Your Landing Page?
          </h2>
          <p className="text-xl text-tech-platinum mb-8">
            Let's create something amazing together
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('chat');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              } else {
                router.push('/#chat');
              }
            }}
            className="px-8 py-4 bg-tech-baby-blue text-tech-black rounded-lg font-semibold text-lg smooth-transition hover:bg-tech-baby-blue-light hover:shadow-glow"
          >
            Talk to Our AI Assistant
          </button>
        </div>
      </section>
    </div>
  )
}
