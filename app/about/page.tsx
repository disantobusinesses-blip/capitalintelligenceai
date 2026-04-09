import type { Metadata } from 'next'
import { Zap, Users, Target, Shield } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us – Intelligent AI Systems | Capital Intelligence Group',
  description: 'Learn about Intelligent AI Systems (IAS), part of Capital Intelligence Group. We build professional websites, AI integrations, and digital solutions for Australian businesses.',
  keywords: 'about IAS, Intelligent AI Systems, Capital Intelligence Group, web design agency Australia, AI automation, digital solutions',
  openGraph: {
    title: 'About Us – Intelligent AI Systems',
    description: 'We integrate intelligent systems into businesses so they operate smoother, faster, and smarter.',
    url: 'https://intelligentaisystem.com/about',
    type: 'website',
  },
}

const values = [
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We leverage cutting-edge AI and web technologies to deliver solutions that keep your business ahead of the curve.',
  },
  {
    icon: Users,
    title: 'Client-First Approach',
    description: 'Every project starts with understanding your unique business needs. We build solutions tailored specifically to you.',
  },
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'Our focus is on measurable outcomes: faster load times, higher conversions, and streamlined operations.',
  },
  {
    icon: Shield,
    title: 'Reliability',
    description: 'From secure hosting to ongoing maintenance, we ensure your digital presence is always performing at its best.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-[100dvh] bg-[#F8F7F4] pb-24">
      {/* Hero */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-6">
            About Intelligent Systems
          </h1>
          <p className="text-xl text-[#6B6560] leading-relaxed mb-4">
            Capital Intelligence Group
          </p>
          <p className="text-lg text-[#6B6560] max-w-2xl mx-auto leading-relaxed">
            We integrate intelligent systems into businesses so they operate smoother, faster, and smarter. 
            From professional websites to AI-powered automation, we help Australian businesses thrive in the digital age.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Who We Are</h2>
              <div className="space-y-4 text-[#6B6560] leading-relaxed">
                <p>
                  Intelligent AI Systems (IAS) is a digital solutions agency under the Capital Intelligence Group. 
                  We specialise in building high-performance websites and integrating AI-powered tools that help businesses 
                  automate their operations and grow their online presence.
                </p>
                <p>
                  Based in Australia, we work with startups, small businesses, and established companies across 
                  diverse industries, from electrical services to healthcare, finance, and retail.
                </p>
                <p>
                  Our mission is simple: deliver intelligent, scalable systems that make businesses run better.
                </p>
              </div>
              <p className="text-sm text-[#6B6560] mt-6">
                ABN: 38 693 023 371
              </p>
            </div>
            <div className="bg-white border border-[#E8E4DF] rounded-[10px] p-8 text-center">
              <div className="w-20 h-20 bg-[#F8F7F4] rounded-[10px] border border-[#E8E4DF] flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-[#1A1A1A]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Systems That Think.</h3>
              <p className="text-xl font-bold text-[#1A1A1A]">Businesses That Scale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1A1A1A] text-center mb-12">What Drives Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="bg-white border border-[#E8E4DF] rounded-[6px] p-6 smooth-transition hover:border-[#5C3D2E] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                >
                  <div className="w-12 h-12 bg-[#F8F7F4] rounded-[6px] border border-[#E8E4DF] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#1A1A1A]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{value.title}</h3>
                  <p className="text-sm text-[#6B6560] leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1A1A1A] text-center mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E8E4DF] rounded-[10px] p-8 smooth-transition hover:border-[#5C3D2E] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Professional Websites</h3>
              <ul className="space-y-2 text-[#6B6560] text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#5C3D2E] rounded-full mt-1.5 flex-shrink-0" />
                  Landing pages from $599 AUD
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#5C3D2E] rounded-full mt-1.5 flex-shrink-0" />
                  Full multi-page websites — custom price upon request
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#5C3D2E] rounded-full mt-1.5 flex-shrink-0" />
                  Mobile responsive & SEO optimised
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#5C3D2E] rounded-full mt-1.5 flex-shrink-0" />
                  Modern, fast-loading designs
                </li>
              </ul>
            </div>
            <div className="bg-white border border-[#E8E4DF] rounded-[10px] p-8 smooth-transition hover:border-[#5C3D2E] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">AI Integrations</h3>
              <ul className="space-y-2 text-[#6B6560] text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#5C3D2E] rounded-full mt-1.5 flex-shrink-0" />
                  24/7 AI chat support for your website
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#5C3D2E] rounded-full mt-1.5 flex-shrink-0" />
                  Automated booking systems
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#5C3D2E] rounded-full mt-1.5 flex-shrink-0" />
                  AI-powered customer email replies
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#5C3D2E] rounded-full mt-1.5 flex-shrink-0" />
                  Custom AI workflows & automation
                </li>
              </ul>
            </div>
            <div className="bg-white border border-[#E8E4DF] rounded-[10px] p-8 smooth-transition hover:border-[#5C3D2E] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Ongoing Support</h3>
              <ul className="space-y-2 text-[#6B6560] text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#5C3D2E] rounded-full mt-1.5 flex-shrink-0" />
                  Monthly hosting & maintenance plans
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#5C3D2E] rounded-full mt-1.5 flex-shrink-0" />
                  SEO & AI visibility packages
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#5C3D2E] rounded-full mt-1.5 flex-shrink-0" />
                  Security updates & backups
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#5C3D2E] rounded-full mt-1.5 flex-shrink-0" />
                  Dedicated tech support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Ready to Get Started?</h2>
          <p className="text-[#6B6560] mb-8">
            Let us build an intelligent system tailored to your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-lg smooth-transition hover:bg-[#2D2D2D] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              Explore Services
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 border-2 border-[#1A1A1A] text-[#1A1A1A] rounded-[6px] font-semibold text-lg smooth-transition hover:bg-[#1A1A1A] hover:text-white"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
