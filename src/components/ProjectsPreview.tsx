"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import ScrollReveal from "./ScrollReveal";
import { ExternalLink, Play } from "lucide-react";

export default function ProjectsPreview() {
  const previewProjects = siteConfig.projects.slice(0, 3);

  return (
    <section className="py-32 px-6" id="projects">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16">
            <div>
              <span className="text-xs font-medium tracking-widest text-[#a78bfa] uppercase mb-4 block">
                Our Work
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Recent projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-sm text-[#a78bfa] hover:text-[#c4b5fd] transition-colors flex items-center gap-1.5"
            >
              View all
              <ExternalLink size={14} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {previewProjects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <div className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-500">
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
                  <h3 className="font-semibold mb-1">{project.title}</h3>
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
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
