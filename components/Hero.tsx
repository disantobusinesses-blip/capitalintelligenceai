'use client'

import { ArrowRight, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center px-6 overflow-hidden bg-tech-black">
      {/* Animated grid background */}
      <div className="absolute inset-0 animated-grid opacity-20" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-tech-baby-blue rounded-full animate-float opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-tech-baby-blue rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-tech-baby-blue rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-tech-baby-blue rounded-full animate-float opacity-70" style={{ animationDelay: '1.5s' }} />
      </div>
      
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-tech-baby-blue rounded-full blur-3xl opacity-10 animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tech-baby-blue rounded-full blur-3xl opacity-10 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      <div className="relative max-w-6xl mx-auto text-center space-y-6">
        {/* Logo/Brand Icon with glow */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-blue flex items-center justify-center shadow-glow smooth-transition hover:scale-110 animate-glow">
            <Zap className="w-8 h-8 text-tech-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-tech-white leading-tight">
          Intelligent Systems
        </h1>
        
        {/* Subheadline */}
        <p className="text-lg md:text-xl text-tech-platinum font-medium">
          Capital Intelligence Group
        </p>

        {/* Slogan with gradient */}
        <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-tech-white via-tech-baby-blue to-tech-white bg-clip-text text-transparent max-w-4xl mx-auto leading-relaxed">
          Systems That Think. Businesses That Scale.
        </p>

        {/* CTA Button */}
        <div className="pt-6">
          <button
            onClick={() => {
              const element = document.getElementById('services');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group px-10 py-4 bg-tech-baby-blue text-tech-black rounded-lg font-semibold text-lg flex items-center gap-2 mx-auto shadow-glow smooth-transition hover:bg-tech-baby-blue-light hover:scale-105 hover:shadow-glow-lg"
          >
            Explore Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-tech-baby-blue rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-tech-baby-blue rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
