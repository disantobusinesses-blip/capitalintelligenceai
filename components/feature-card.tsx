'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FeatureCardProps {
  feature: {
    id: string;
    title: string;
    description: string;
    benefit: string;
  };
  mockup: ReactNode;
}

export default function FeatureCard({ feature, mockup }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-border bg-card p-8 hover:border-accent/50 transition-all"
    >
      <div className="mb-6">
        <div className="rounded-xl border border-border bg-background/50 p-6 overflow-hidden">
          {mockup}
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
      <p className="text-muted-foreground mb-4">{feature.description}</p>
      
      <div className="flex items-center text-accent font-semibold text-sm">
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
        </svg>
        {feature.benefit}
      </div>
    </motion.div>
  );
}
