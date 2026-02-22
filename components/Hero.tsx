'use client'

import { ArrowRight, Zap } from 'lucide-react'
import AnimatedShaderHero from '@/components/ui/animated-shader-hero'

export default function Hero() {
  return (
    <AnimatedShaderHero>
      <div className="relative max-w-6xl mx-auto text-center space-y-6 px-6">
        {/* Logo/Brand Icon with glow */}
        <div className="flex justify-center mb-6 animate-fade-in-down">
          <div className="w-16 h-16 rounded-2xl bg-gradient-blue flex items-center justify-center shadow-glow smooth-transition hover:scale-110 animate-glow">
            <Zap className="w-8 h-8 text-tech-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-tech-white leading-tight animate-fade-in-up animation-delay-200">
          Intelligent Systems
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-tech-platinum font-medium animate-fade-in-up animation-delay-400">
          Capital Intelligence Group
        </p>

        {/* Slogan with gradient */}
        <p className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-tech-white via-tech-baby-blue to-tech-white bg-clip-text text-transparent max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600">
          Systems That Think. Businesses That Scale.
        </p>

        {/* CTA Button */}
        <div className="pt-6 animate-fade-in-up animation-delay-800">
          <button
            onClick={() => {
              const element = document.getElementById('services')
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group px-10 py-4 bg-tech-baby-blue text-tech-black rounded-full font-semibold text-lg inline-flex items-center gap-2 shadow-glow smooth-transition hover:bg-tech-baby-blue-light hover:scale-105 hover:shadow-glow-lg"
          >
            Explore Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-tech-baby-blue rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-tech-baby-blue rounded-full animate-pulse" />
        </div>
      </div>
    </AnimatedShaderHero>
  )
}
