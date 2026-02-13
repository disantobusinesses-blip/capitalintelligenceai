'use client';

import { motion } from 'framer-motion';
import { colorPalettes } from '@/lib/data';

interface ColorStepProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ColorStep({ value, onChange }: ColorStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Choose Your Colors</h2>
      <p className="text-muted-foreground text-center mb-12">
        Select a color palette for your website
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {colorPalettes.map((palette) => (
          <motion.button
            key={palette.id}
            type="button"
            onClick={() => onChange(palette.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-6 rounded-2xl border-2 transition-all ${
              value === palette.id
                ? 'border-accent bg-accent/10 glow-effect'
                : 'border-border bg-card hover:border-accent/50'
            }`}
          >
            <h3 className="text-lg font-bold mb-4">{palette.name}</h3>
            <div className="flex gap-2">
              {palette.colors.map((color, index) => (
                <div
                  key={index}
                  className="flex-1 h-12 rounded-lg"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
