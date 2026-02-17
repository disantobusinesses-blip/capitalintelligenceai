'use client'

import Link from 'next/link'
import { ArrowLeft, Check, Zap, Wrench, TrendingUp, Cpu } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function EnhancementService() {
  const router = useRouter()

  const enhancements = [
    {
      icon: TrendingUp,
      title: 'Performance Boost',
      description: 'Optimize load times and improve overall site speed',
      price: '$499',
    },
    {
      icon: Cpu,
      title: 'AI Integration',
      description: 'Add intelligent chatbots and automation',
      price: '$899',
    },
    {
      icon: Zap,
      title: 'SEO Enhancement',
      description: 'Improve search rankings and visibility',
      price: '$699',
    },
    {
      icon: Wrench,
      title: 'Feature Addition',
      description: 'Add new functionality to your site',
      price: 'Custom',
    },
  ]

  const monthlyPackages = [
    {
      name: 'Website Care',
      price: '$169',
      period: '/month',
      description: 'Keep your site running smoothly',
      features: [
        'Monthly maintenance',
        'Security updates',
        'Content updates (5/month)',
        'Performance monitoring',
        'Backup & recovery',
        'Email support',
      ],
    },
    {
      name: 'Revenue Optimisation',
      price: '$279',
      period: '/month',
      description: 'Grow your business online',
      featured: true,
      features: [
        'Everything in Website Care',
        'Conversion optimization',
        'A/B testing',
        'SEO management',
        'Analytics reporting',
        'Priority support',
      ],
    },
    {
      name: 'Done-For-You Team',
      price: '$449',
      period: '/month',
      description: 'Complete digital management',
      features: [
        'Everything in Revenue Optimisation',
        'Dedicated strategist',
        'Custom development hours',
        'Marketing automation',
        'Weekly strategy calls',
        '24/7 support',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-tech-black">
      {/* Header */}
      <header className="border-b border-tech-baby-blue/20 py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-tech-baby-blue hover:text-tech-baby-blue-light smooth-transition"
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
        <div className="absolute inset-0 animated-grid opacity-20" />
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-tech-baby-blue rounded-full blur-3xl opacity-10" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h1 className="text-5xl md:text-6xl font-bold text-tech-white mb-6">
            Already Have a Website?
          </h1>
          <p className="text-xl text-tech-platinum mb-8 leading-relaxed">
            Enhance your existing website with our premium packages, AI integration, 
            and ongoing optimization services.
          </p>
          <p className="text-lg text-tech-baby-blue">
            Let's take your website to the next level
          </p>
        </div>
      </section>

      {/* One-Time Enhancements */}
      <section className="py-20 px-6 bg-tech-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-tech-white text-center mb-4">
            One-Time Enhancements
          </h2>
          <p className="text-xl text-tech-platinum text-center mb-12">
            Upgrade specific aspects of your website
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enhancements.map((enhancement, index) => {
              const Icon = enhancement.icon
              return (
                <div
                  key={index}
                  className="bg-tech-black border border-tech-baby-blue/20 rounded-xl p-6 smooth-transition hover:border-tech-baby-blue hover:shadow-glow-sm"
                >
                  <div className="w-12 h-12 bg-gradient-blue rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-tech-white" />
                  </div>
                  <h3 className="text-xl font-bold text-tech-white mb-2">{enhancement.title}</h3>
                  <p className="text-tech-platinum mb-4">{enhancement.description}</p>
                  <div className="text-2xl font-bold text-tech-baby-blue">
                    {enhancement.price}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Monthly Packages */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-tech-white text-center mb-4">
            Ongoing Maintenance Packages
          </h2>
          <p className="text-xl text-tech-platinum text-center mb-12">
            Keep your website optimized and growing
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {monthlyPackages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-tech-gray rounded-2xl p-8 smooth-transition hover:scale-105 ${
                  pkg.featured
                    ? 'border-2 border-tech-baby-blue shadow-glow'
                    : 'border border-tech-baby-blue/20'
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-tech-baby-blue text-tech-black rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-tech-white mb-2">{pkg.name}</h3>
                <p className="text-tech-platinum mb-4">{pkg.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-tech-baby-blue">{pkg.price}</span>
                  <span className="text-tech-platinum">{pkg.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-tech-baby-blue flex-shrink-0 mt-0.5" />
                      <span className="text-tech-white">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold smooth-transition ${
                    pkg.featured
                      ? 'bg-tech-baby-blue text-tech-black hover:bg-tech-baby-blue-light hover:shadow-glow-sm'
                      : 'border-2 border-tech-baby-blue text-tech-baby-blue hover:bg-tech-baby-blue hover:text-tech-black'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 bg-tech-gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-tech-white text-center mb-12">
            How It Works
          </h2>
          <div className="space-y-6">
            {[
              { step: '1', title: 'Website Audit', description: 'We analyze your current website to identify opportunities' },
              { step: '2', title: 'Custom Proposal', description: 'Receive a tailored plan with recommended enhancements' },
              { step: '3', title: 'Implementation', description: 'Our team implements the improvements efficiently' },
              { step: '4', title: 'Ongoing Support', description: 'Choose a monthly package for continuous optimization' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-6 items-start bg-tech-black border border-tech-baby-blue/20 rounded-xl p-6"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-blue rounded-lg flex items-center justify-center text-xl font-bold text-tech-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-tech-white mb-2">{item.title}</h3>
                  <p className="text-tech-platinum">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 animated-grid opacity-10" />
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-4xl font-bold text-tech-white mb-6">
            Ready to Enhance Your Website?
          </h2>
          <p className="text-xl text-tech-platinum mb-8">
            Let's discuss how we can improve your online presence
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
              className="px-8 py-4 bg-tech-baby-blue text-tech-black rounded-lg font-semibold text-lg smooth-transition hover:bg-tech-baby-blue-light hover:shadow-glow"
            >
              Talk to Our AI Assistant
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-4 border-2 border-tech-baby-blue text-tech-baby-blue rounded-lg font-semibold text-lg smooth-transition hover:bg-tech-baby-blue hover:text-tech-black"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
