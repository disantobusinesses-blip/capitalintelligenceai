'use client';

import { motion } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { IntakeFormData } from '@/lib/schemas';

interface ContactStepProps {
  register: UseFormRegister<IntakeFormData>;
  errors: FieldErrors<IntakeFormData>;
  isSubmitting: boolean;
}

export default function ContactStep({ register, errors, isSubmitting }: ContactStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Contact Information</h2>
      <p className="text-muted-foreground text-center mb-12">
        How should we reach you?
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            {...register('fullName')}
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
            placeholder="John Smith"
          />
          {errors.fullName && (
            <p className="mt-2 text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Email Address <span className="text-accent">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Phone Number <span className="text-accent">*</span>
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
            placeholder="+61 400 000 000"
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-3">
            Preferred Contact Method <span className="text-accent">*</span>
          </label>
          <div className="space-y-3">
            <label className="flex items-center p-4 rounded-lg border border-border bg-card hover:border-accent/50 transition-all cursor-pointer">
              <input
                {...register('contactMethod')}
                type="radio"
                value="email"
                className="w-4 h-4 text-accent focus:ring-accent focus:ring-2"
              />
              <span className="ml-3 font-medium">Email</span>
            </label>
            <label className="flex items-center p-4 rounded-lg border border-border bg-card hover:border-accent/50 transition-all cursor-pointer">
              <input
                {...register('contactMethod')}
                type="radio"
                value="phone"
                className="w-4 h-4 text-accent focus:ring-accent focus:ring-2"
              />
              <span className="ml-3 font-medium">Phone</span>
            </label>
            <label className="flex items-center p-4 rounded-lg border border-border bg-card hover:border-accent/50 transition-all cursor-pointer">
              <input
                {...register('contactMethod')}
                type="radio"
                value="both"
                className="w-4 h-4 text-accent focus:ring-accent focus:ring-2"
              />
              <span className="ml-3 font-medium">Both Email and Phone</span>
            </label>
          </div>
          {errors.contactMethod && (
            <p className="mt-2 text-sm text-red-500">{errors.contactMethod.message}</p>
          )}
        </div>
      </div>

      <div className="mt-8 p-6 rounded-xl bg-accent/5 border border-accent/20">
        <p className="text-sm text-muted-foreground text-center">
          By submitting this form, you agree to be contacted by Capital Intelligence Group 
          regarding your project enquiry.
        </p>
      </div>
    </motion.div>
  );
}
