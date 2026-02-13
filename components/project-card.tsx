'use client';

import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    tier: string;
    description: string;
    url: string;
    image: string;
  };
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-xl overflow-hidden border border-border bg-card hover:border-accent/50 transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 bg-accent/90 text-background text-xs font-semibold rounded-full">
            {project.tier}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
          {project.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
        
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-accent hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          View Live Site
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </a>
      </div>
    </motion.div>
  );
}
