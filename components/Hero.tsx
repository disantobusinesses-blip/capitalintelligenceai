'use client'

import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-off-white via-white to-luxury-silver-light opacity-50" />
      
      <div className="relative max-w-6xl mx-auto text-center space-y-8">
        {/* Logo/Brand Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-silver flex items-center justify-center luxury-shadow smooth-transition hover:scale-105">
            <Sparkles className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-luxury-charcoal leading-tight">
          Intelligent Systems
        </h1>
        
        {/* Subheadline - Brand Name */}
        <p className="text-xl md:text-2xl text-luxury-silver-dark font-medium">
          Capital Intelligence Group
        </p>

        {/* Slogan */}
        <p className="text-2xl md:text-3xl font-semibold text-luxury-charcoal max-w-4xl mx-auto leading-relaxed">
          Systems That Think. Businesses That Scale.
        </p>

        {/* Value Proposition */}
        <p className="text-lg md:text-xl text-luxury-silver-dark max-w-3xl mx-auto leading-relaxed">
          We integrate intelligent systems into businesses so they operate smoother, faster, and smarter.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <button
            onClick={() => {
              const element = document.getElementById('packages');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group px-8 py-4 bg-luxury-charcoal text-white rounded-lg font-semibold text-lg flex items-center gap-2 luxury-shadow smooth-transition hover:bg-luxury-silver-dark hover:scale-105"
          >
            Begin Building Your Website
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => {
              const element = document.getElementById('projects');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-white border-2 border-luxury-silver text-luxury-charcoal rounded-lg font-semibold text-lg luxury-shadow smooth-transition hover:bg-luxury-off-white hover:scale-105"
          >
            View Our Projects
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-luxury-silver-light rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-luxury-silver rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  )
}
