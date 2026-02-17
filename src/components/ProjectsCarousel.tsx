"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    id: 1,
    title: "FinTech Dashboard",
    industry: "Financial Services",
    description:
      "AI-powered analytics platform for real-time financial insights and automated reporting",
    image: "/api/placeholder/400/300",
  },
  {
    id: 2,
    title: "Healthcare Portal",
    industry: "Healthcare",
    description:
      "Intelligent patient management system with automated scheduling and records",
    image: "/api/placeholder/400/300",
  },
  {
    id: 3,
    title: "Retail Intelligence",
    industry: "E-Commerce",
    description:
      "Smart inventory and customer analytics system for data-driven retail decisions",
    image: "/api/placeholder/400/300",
  },
  {
    id: 4,
    title: "Manufacturing Hub",
    industry: "Manufacturing",
    description:
      "Integrated supply chain management with predictive maintenance systems",
    image: "/api/placeholder/400/300",
  },
  {
    id: 5,
    title: "Legal Practice Suite",
    industry: "Legal",
    description:
      "Automated case management and document processing for law firms",
    image: "/api/placeholder/400/300",
  },
  {
    id: 6,
    title: "Education Platform",
    industry: "Education",
    description:
      "Smart learning management system with AI-powered student insights",
    image: "/api/placeholder/400/300",
  },
];

export default function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector(".project-card")?.clientWidth || 0;
    const gap = 24; // 1.5rem
    const scrollAmount = cardWidth + gap;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setCurrentIndex(Math.max(0, currentIndex - 1));
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setCurrentIndex(Math.min(projects.length - 1, currentIndex + 1));
    }
  };

  return (
    <section className="py-32 px-6 relative bg-muted" id="projects">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-12">
            <span className="text-xs font-medium tracking-widest text-silver-dark uppercase mb-4 block">
              Our Work
            </span>
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground">
                  Featured Projects
                </h2>
                <p className="text-muted-foreground text-lg max-w-xl">
                  See how we&apos;ve transformed businesses with intelligent systems
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => scroll("left")}
                  disabled={currentIndex === 0}
                  className="p-3 rounded-xl border border-border bg-white hover:bg-muted hover:border-silver transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={20} className="text-foreground" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  disabled={currentIndex >= projects.length - 3}
                  className="p-3 rounded-xl border border-border bg-white hover:bg-muted hover:border-silver transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Next project"
                >
                  <ChevronRight size={20} className="text-foreground" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="project-card min-w-[340px] md:min-w-[380px] snap-start"
              >
                <div className="glass-card rounded-2xl overflow-hidden group h-full flex flex-col hover:shadow-xl transition-all duration-300">
                  {/* Image placeholder */}
                  <div className="relative h-56 bg-gradient-to-br from-silver-light to-silver overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 text-foreground text-xs font-medium">
                        {project.industry}
                      </span>
                    </div>
                    {/* Placeholder pattern */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl font-bold text-white/20">
                        {i + 1}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-silver-dark transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                      {project.description}
                    </p>
                    <button className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-silver-dark transition-colors group/btn">
                      View Project
                      <ArrowRight
                        size={16}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile scroll indicators */}
          <div className="flex md:hidden justify-center gap-2 mt-6">
            {projects.slice(0, -2).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  if (scrollContainerRef.current) {
                    const container = scrollContainerRef.current;
                    const cardWidth =
                      container.querySelector(".project-card")?.clientWidth || 0;
                    container.scrollTo({
                      left: idx * (cardWidth + 24),
                      behavior: "smooth",
                    });
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-8 bg-foreground"
                    : "w-2 bg-border hover:bg-silver"
                }`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
