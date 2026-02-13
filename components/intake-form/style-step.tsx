'use client';

import { motion } from 'framer-motion';
import { styles } from '@/lib/data';

interface StyleStepProps {
  value: string;
  onChange: (value: string) => void;
}

export default function StyleStep({ value, onChange }: StyleStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Choose Your Style</h2>
      <p className="text-muted-foreground text-center mb-12">
        Select the design aesthetic for your website
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {styles.map((style) => (
          <motion.button
            key={style.id}
            type="button"
            onClick={() => onChange(style.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-8 rounded-2xl border-2 transition-all text-left ${
              value === style.id
                ? 'border-accent bg-accent/10 glow-effect'
                : 'border-border bg-card hover:border-accent/50'
            }`}
          >
            <h3 className="text-xl font-bold mb-2">{style.name}</h3>
            <p className="text-sm text-muted-foreground">{style.description}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
