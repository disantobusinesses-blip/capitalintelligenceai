'use client';

import { motion } from 'framer-motion';
import TierCard from '@/components/tier-card';
import { tiers } from '@/lib/data';

interface TierStepProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TierStep({ value, onChange }: TierStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Choose Your Tier</h2>
      <p className="text-muted-foreground text-center mb-12">
        Select the package that best fits your needs
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`transition-all ${value === tier.id ? 'ring-2 ring-accent rounded-2xl' : ''}`}
          >
            <TierCard tier={tier} onSelect={onChange} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
