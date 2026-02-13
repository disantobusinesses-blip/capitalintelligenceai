'use client';

import { useState } from 'react';
import SectionReveal from '@/components/section-reveal';
import ProjectCard from '@/components/project-card';
import { projects } from '@/lib/data';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.tier.toLowerCase().includes(filter));

  return (
    <div className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our portfolio of premium websites built for Australian businesses
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-accent text-background'
                  : 'bg-secondary text-foreground hover:bg-accent/20'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('tier 1')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'tier 1'
                  ? 'bg-accent text-background'
                  : 'bg-secondary text-foreground hover:bg-accent/20'
              }`}
            >
              Tier 1
            </button>
            <button
              onClick={() => setFilter('tier 2')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'tier 2'
                  ? 'bg-accent text-background'
                  : 'bg-secondary text-foreground hover:bg-accent/20'
              }`}
            >
              Tier 2
            </button>
          </div>
        </SectionReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <SectionReveal key={project.id} delay={0.05 * (index + 1)}>
              <ProjectCard project={project} />
            </SectionReveal>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No projects found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
