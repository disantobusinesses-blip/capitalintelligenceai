'use client';

import { motion } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { IntakeFormData } from '@/lib/schemas';

interface DetailsStepProps {
  register: UseFormRegister<IntakeFormData>;
  errors: FieldErrors<IntakeFormData>;
}

export default function DetailsStep({ register, errors }: DetailsStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Project Details</h2>
      <p className="text-muted-foreground text-center mb-12">
        Tell us more about your project
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Business Name <span className="text-accent">*</span>
          </label>
          <input
            {...register('businessName')}
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
            placeholder="Your business name"
          />
          {errors.businessName && (
            <p className="mt-2 text-sm text-red-500">{errors.businessName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Project Description <span className="text-accent">*</span>
          </label>
          <textarea
            {...register('projectDescription')}
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none"
            placeholder="Describe your project, target audience, goals, and any specific requirements..."
          />
          {errors.projectDescription && (
            <p className="mt-2 text-sm text-red-500">{errors.projectDescription.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Inspiration Website
            <span className="text-muted-foreground text-xs ml-2">(optional)</span>
          </label>
          <input
            {...register('inspirationUrl')}
            type="url"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
            placeholder="https://example.com"
          />
          {errors.inspirationUrl && (
            <p className="mt-2 text-sm text-red-500">{errors.inspirationUrl.message}</p>
          )}
          <p className="mt-2 text-xs text-muted-foreground">
            Share a link to a website you like the style of
          </p>
        </div>
      </div>
    </motion.div>
  );
}
