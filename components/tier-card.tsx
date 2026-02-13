'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface TierCardProps {
  tier: {
    id: string;
    name: string;
    price: string;
    description: string;
    features: string[];
    highlighted?: boolean;
  };
  onSelect?: (tierId: string) => void;
}

export default function TierCard({ tier, onSelect }: TierCardProps) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(tier.id);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-2xl p-8 border-2 transition-all ${
        tier.highlighted
          ? 'border-accent bg-gradient-to-br from-accent/10 to-primary/5 glow-effect'
          : 'border-border bg-card hover:border-accent/50'
      }`}
    >
      {tier.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-background text-sm font-semibold rounded-full">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
        <div className="text-4xl font-bold text-accent mb-3">{tier.price}</div>
        <p className="text-muted-foreground">{tier.description}</p>
      </div>

      <ul className="space-y-3 mb-8">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {onSelect ? (
        <button
          onClick={handleClick}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all hover:scale-105 ${
            tier.highlighted
              ? 'bg-accent text-background hover:bg-accent/90 glow-effect'
              : 'bg-secondary text-foreground hover:bg-accent hover:text-background'
          }`}
        >
          Select This Tier
        </button>
      ) : (
        <Link
          href={`/get-started?tier=${tier.id}`}
          className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-all hover:scale-105 ${
            tier.highlighted
              ? 'bg-accent text-background hover:bg-accent/90 glow-effect'
              : 'bg-secondary text-foreground hover:bg-accent hover:text-background'
          }`}
        >
          Select This Tier
        </Link>
      )}
    </motion.div>
  );
}
