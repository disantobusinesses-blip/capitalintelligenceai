'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    industry: 'Retail',
    description: 'Complete digital transformation with AI-powered inventory management and customer analytics.',
    image: '/api/placeholder/600/400',
  },
  {
    id: 2,
    title: 'Healthcare Portal',
    industry: 'Healthcare',
    description: 'Secure patient management system with intelligent appointment scheduling and telemedicine integration.',
    image: '/api/placeholder/600/400',
  },
  {
    id: 3,
    title: 'FinTech Dashboard',
    industry: 'Finance',
    description: 'Real-time financial analytics platform with automated reporting and predictive insights.',
    image: '/api/placeholder/600/400',
  },
  {
    id: 4,
    title: 'Property Management',
    industry: 'Real Estate',
    description: 'Intelligent property listing and tenant management system with automated workflows.',
    image: '/api/placeholder/600/400',
  },
  {
    id: 5,
    title: 'Manufacturing ERP',
    industry: 'Manufacturing',
    description: 'End-to-end production tracking with AI-driven quality control and supply chain optimization.',
    image: '/api/placeholder/600/400',
  },
]

export default function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section id="projects" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-luxury-charcoal mb-4">
            Our Projects
          </h2>
          <p className="text-xl text-luxury-silver-dark max-w-2xl mx-auto">
            Intelligent systems implemented across diverse industries
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project) => (
                <div key={project.id} className="min-w-full px-4">
                  <div className="max-w-4xl mx-auto bg-luxury-off-white rounded-2xl overflow-hidden luxury-shadow smooth-transition hover:scale-105">
                    {/* Project Image */}
                    <div className="aspect-video bg-gradient-silver flex items-center justify-center text-white text-2xl font-semibold">
                      {project.title}
                    </div>

                    {/* Project Info */}
                    <div className="p-8">
                      <div className="mb-4">
                        <span className="inline-block px-4 py-1 bg-luxury-silver-light text-luxury-charcoal rounded-full text-sm font-semibold">
                          {project.industry}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-luxury-charcoal mb-3">
                        {project.title}
                      </h3>
                      <p className="text-luxury-silver-dark mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      <button className="inline-flex items-center gap-2 px-6 py-2 bg-luxury-charcoal text-white rounded-lg font-semibold smooth-transition hover:bg-luxury-silver-dark">
                        View Project
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white border border-luxury-silver rounded-full p-3 luxury-shadow smooth-transition hover:bg-luxury-off-white"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6 text-luxury-charcoal" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border border-luxury-silver rounded-full p-3 luxury-shadow smooth-transition hover:bg-luxury-off-white"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6 text-luxury-charcoal" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full smooth-transition ${
                  index === currentIndex
                    ? 'w-8 bg-luxury-charcoal'
                    : 'w-2 bg-luxury-silver-light hover:bg-luxury-silver'
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
