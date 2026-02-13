"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import ScrollReveal from "@/components/ScrollReveal";
import Lightbox from "@/components/Lightbox";
import { ExternalLink, Play } from "lucide-react";

type FilterType = "all" | "landing" | "ai-integrated";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered =
    filter === "all"
      ? siteConfig.projects
      : siteConfig.projects.filter((p) => p.tier === filter);

  const lightboxImages = filtered.map((p) => ({
    src: p.image,
    alt: p.title,
  }));

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-medium tracking-widest text-[#a78bfa] uppercase mb-4 block">
              Portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Our projects
            </h1>
            <p className="text-[#a1a1aa] text-lg max-w-xl mx-auto">
              A selection of premium websites we&apos;ve crafted for clients
              across industries.
            </p>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal>
          <div className="flex justify-center gap-2 mb-12">
            {[
              { id: "all" as FilterType, label: "All Projects" },
              { id: "landing" as FilterType, label: "Landing Pages" },
              { id: "ai-integrated" as FilterType, label: "AI Integrated" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                  filter === f.id
                    ? "bg-[#a78bfa]/10 text-[#a78bfa] border border-[#a78bfa]/30"
                    : "text-[#a1a1aa] hover:text-white border border-transparent hover:bg-white/5"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.05}>
              <motion.div
                layout
                className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => {
                  setLightboxIndex(i);
                  setLightboxOpen(true);
                }}
              >
                <div className="relative aspect-[4/3] bg-[#18181b] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {project.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play size={18} className="text-white ml-0.5" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#09090b]/70 backdrop-blur-sm text-[10px] font-medium text-[#a78bfa] border border-[#a78bfa]/20">
                      {project.tier === "ai-integrated"
                        ? "AI Integrated"
                        : "Landing Page"}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{project.title}</h3>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-[#a1a1aa] hover:text-[#a78bfa] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Visit ${project.title}`}
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <p className="text-xs text-[#a1a1aa] mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-[#a1a1aa]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>
      </div>

      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
