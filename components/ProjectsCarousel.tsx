'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'EAY Electrical',
    industry: 'Electrical Services',
    description: 'Professional electrical services website for residential and commercial clients across Australia. Modern design with service showcase and contact integration.',
    image: '/projects/eay-electrical.png',
    url: 'https://www.eayelectrical.com.au',
    color: '#1A3A5C',
  },
  {
    id: 2,
    title: 'My AI Bank',
    industry: 'FinTech',
    description: 'AI-powered banking platform delivering intelligent financial tools and personalised banking experiences.',
    image: '/projects/myaibank.png',
    url: 'https://myaibank.ai',
    color: '#0F172A',
  },
  {
    id: 3,
    title: 'Reborn Physiques',
    industry: 'Health & Fitness',
    description: 'Custom fitness and physique coaching website built to convert visitors into clients, with service showcases and seamless contact integration.',
    image: '/projects/rebornphysiques.png',
    url: 'https://rebornphysiques.com',
    color: '#1A1A1A',
  },
]

/** Branded gradient placeholder shown when a static screenshot isn't available or fails to load */
function ProjectPlaceholder({ title, color, url }: { title: string; color: string; url?: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-4"
      style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}DD 100%)` }}
    >
      <span className="text-white text-2xl font-bold tracking-wide">{title}</span>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/15 backdrop-blur text-white text-sm font-medium rounded-full hover:bg-white/25 transition-colors"
        >
          Visit Live Site
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  )
}

export default function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set())

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
      className="py-24 px-6 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background effects */}
      <div className="absolute inset-0 tech-grid opacity-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#5C3D2E] rounded-full blur-3xl opacity-5" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            Our Projects
          </h2>
          <p className="text-xl text-[#6B6560] max-w-2xl mx-auto">
            Intelligent systems implemented across diverse industries
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#1A1A1A]">
            <div className="w-2 h-2 bg-[#5C3D2E] rounded-full animate-pulse" />
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
                  <div className="max-w-4xl mx-auto bg-white border border-[#E8E4DF] rounded-[10px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] smooth-transition hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]">
                    {/* Project Image */}
                    <div className="aspect-video bg-gradient-tech relative overflow-hidden">
                      {project.image && !failedImages.has(project.id) ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover object-top"
                            onError={() => setFailedImages(prev => new Set([...prev, project.id]))}
                          />
                          {/* Dark overlay for better text readability when image is present */}
                          <div className="absolute inset-0 bg-[#1A1A1A]/20" />
                        </>
                      ) : (
                        <ProjectPlaceholder title={project.title} color={project.color} url={project.url} />
                      )}
                      {/* Animated lines */}
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-tech-baby-blue to-transparent animate-pulse" />
                    </div>

                    {/* Project Info */}
                    <div className="p-8">
                      <div className="mb-4">
                        <span className="inline-block px-4 py-1 bg-[#F8F7F4] border border-[#E8E4DF] text-[#1A1A1A] rounded-full text-sm font-semibold">
                          {project.industry}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">
                        {project.title}
                      </h3>
                      <p className="text-[#6B6560] mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      {project.url ? (
                        <a 
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white rounded-lg font-semibold smooth-transition hover:bg-[#2D2D2D] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]"
                        >
                          View Project
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white rounded-lg font-semibold smooth-transition hover:bg-[#2D2D2D] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]">
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white border border-[#5C3D2E] rounded-full p-3  smooth-transition hover:bg-[#2D2D2D] hover:border-[#5C3D2E]"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border border-[#5C3D2E] rounded-full p-3  smooth-transition hover:bg-[#2D2D2D] hover:border-[#5C3D2E]"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6 text-[#1A1A1A]" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full smooth-transition ${
                  index === currentIndex
                    ? 'w-8 bg-[#1A1A1A]'
                    : 'w-2 bg-[#E8E4DF] hover:bg-[#2D2D2D]/50'
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
