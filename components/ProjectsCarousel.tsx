'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'EAY Electrical',
    industry: 'Electrical Services',
    description: 'Professional electrical services website for residential and commercial clients across Australia. Modern design with service showcase and contact integration.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/EAY%20site-7S7pX8I1Dmy6mqs88OqeeR0avSRFuH.jpg',
    url: 'https://www.eayelectrical.com.au',
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    industry: 'Retail',
    description: 'Complete digital transformation with AI-powered inventory management and customer analytics.',
    image: null, // No image - will show fallback
  },
  {
    id: 3,
    title: 'Healthcare Portal',
    industry: 'Healthcare',
    description: 'Secure patient management system with intelligent appointment scheduling and telemedicine integration.',
    image: null, // No image - will show fallback
  },
  {
    id: 4,
    title: 'FinTech Dashboard',
    industry: 'Finance',
    description: 'Real-time financial analytics platform with automated reporting and predictive insights.',
    image: null, // No image - will show fallback
  },
  {
    id: 5,
    title: 'Property Management',
    industry: 'Real Estate',
    description: 'Intelligent property listing and tenant management system with automated workflows.',
    image: null, // No image - will show fallback
  },
  {
    id: 6,
    title: 'Manufacturing ERP',
    industry: 'Manufacturing',
    description: 'End-to-end production tracking with AI-driven quality control and supply chain optimization.',
    image: null, // No image - will show fallback
  },
]

export default function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isPaused])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section 
      id="projects" 
      className="py-24 px-6 bg-tech-gray/80 backdrop-blur-sm relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background effects */}
      <div className="absolute inset-0 tech-grid opacity-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-tech-baby-blue rounded-full blur-3xl opacity-5" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-tech-white mb-4">
            Our Projects
          </h2>
          <p className="text-xl text-tech-platinum max-w-2xl mx-auto">
            Intelligent systems implemented across diverse industries
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-tech-baby-blue">
            <div className="w-2 h-2 bg-tech-baby-blue rounded-full animate-pulse" />
            Auto-rotating • Hover to pause
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project) => (
                <div key={project.id} className="min-w-full px-4">
                  <div className="max-w-4xl mx-auto bg-tech-black border border-tech-baby-blue/20 rounded-2xl overflow-hidden tech-shadow smooth-transition hover:border-tech-baby-blue hover:shadow-glow">
                    {/* Project Image */}
                    <div className="aspect-video bg-gradient-tech relative overflow-hidden">
                      {project.image && (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover object-top"
                          />
                          {/* Dark overlay for better text readability when image is present */}
                          <div className="absolute inset-0 bg-tech-black/20" />
                        </>
                      )}
                      {/* Title overlay (always visible, but more prominent when no image) */}
                      <div className={`absolute inset-0 flex items-center justify-center text-tech-white text-2xl font-semibold ${!project.image ? 'bg-gradient-tech' : ''}`}>
                        {!project.image && <div className="absolute inset-0 bg-tech-baby-blue/10" />}
                        <span className="relative z-10">{project.title}</span>
                      </div>
                      {/* Animated lines */}
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-tech-baby-blue to-transparent animate-pulse" />
                    </div>

                    {/* Project Info */}
                    <div className="p-8">
                      <div className="mb-4">
                        <span className="inline-block px-4 py-1 bg-tech-baby-blue/10 border border-tech-baby-blue/30 text-tech-baby-blue rounded-full text-sm font-semibold">
                          {project.industry}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-tech-white mb-3">
                        {project.title}
                      </h3>
                      <p className="text-tech-platinum mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      {project.url ? (
                        <a 
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-tech-baby-blue text-tech-black rounded-lg font-semibold smooth-transition hover:bg-tech-baby-blue-light hover:shadow-glow-sm"
                        >
                          View Project
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-tech-baby-blue text-tech-black rounded-lg font-semibold smooth-transition hover:bg-tech-baby-blue-light hover:shadow-glow-sm">
                          View Project
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-tech-black/80 border border-tech-baby-blue/50 rounded-full p-3 tech-shadow smooth-transition hover:bg-tech-baby-blue hover:border-tech-baby-blue hover:shadow-glow"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6 text-tech-white" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-tech-black/80 border border-tech-baby-blue/50 rounded-full p-3 tech-shadow smooth-transition hover:bg-tech-baby-blue hover:border-tech-baby-blue hover:shadow-glow"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6 text-tech-white" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full smooth-transition ${
                  index === currentIndex
                    ? 'w-8 bg-tech-baby-blue shadow-glow-sm'
                    : 'w-2 bg-tech-platinum/30 hover:bg-tech-baby-blue/50'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
