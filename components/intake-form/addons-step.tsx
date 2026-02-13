'use client';

import { motion } from 'framer-motion';
import { addOns } from '@/lib/data';

interface AddonsStepProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function AddonsStep({ value, onChange }: AddonsStepProps) {
  const toggleAddon = (addonId: string) => {
    if (value.includes(addonId)) {
      onChange(value.filter((id) => id !== addonId));
    } else {
      onChange([...value, addonId]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Select Add-ons</h2>
      <p className="text-muted-foreground text-center mb-12">
        Choose additional features for your website (optional)
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {addOns.map((addon) => {
          const isSelected = value.includes(addon.id);
          
          return (
            <motion.button
              key={addon.id}
              type="button"
              onClick={() => toggleAddon(addon.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-6 rounded-2xl border-2 transition-all text-left relative ${
                isSelected
                  ? 'border-accent bg-accent/10 glow-effect'
                  : 'border-border bg-card hover:border-accent/50'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-background"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              )}
              
              <div className="text-4xl mb-3">{addon.icon}</div>
              <h3 className="font-bold mb-2">{addon.name}</h3>
              <p className="text-accent font-semibold text-sm">{addon.price}</p>
            </motion.button>
          );
        })}
      </div>

      <p className="text-center text-muted-foreground text-sm mt-8">
        Selected: {value.length} add-on{value.length !== 1 ? 's' : ''}
      </p>
    </motion.div>
  );
}
