'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import StepIndicator from './step-indicator';
import TierStep from './tier-step';
import StyleStep from './style-step';
import ColorStep from './color-step';
import UploadStep from './upload-step';
import DetailsStep from './details-step';
import AddonsStep from './addons-step';
import ContactStep from './contact-step';
import { intakeFormSchema, IntakeFormData } from '@/lib/schemas';

export default function IntakeForm() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 7;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: {
      tier: (searchParams.get('tier') as 'tier1' | 'tier2') || undefined,
      addOns: [],
    },
  });

  // Watch form values for controlled components
  const tier = watch('tier');
  const style = watch('style');
  const palette = watch('palette');
  const logo = watch('logo');
  const addOns = watch('addOns');

  const nextStep = () => {
    // Validate current step before proceeding
    switch (currentStep) {
      case 1:
        if (!tier) {
          toast.error('Please select a tier');
          return;
        }
        break;
      case 2:
        if (!style) {
          toast.error('Please select a style');
          return;
        }
        break;
      case 3:
        if (!palette) {
          toast.error('Please select a color palette');
          return;
        }
        break;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: IntakeFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log('Form data:', data);
      
      toast.success('Your project request has been submitted! We\'ll be in touch soon.', {
        duration: 6000,
      });
      
      // Reset form or redirect
      setCurrentStep(1);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <TierStep value={tier} onChange={(value) => setValue('tier', value as any)} />;
      case 2:
        return <StyleStep value={style} onChange={(value) => setValue('style', value as any)} />;
      case 3:
        return <ColorStep value={palette} onChange={(value) => setValue('palette', value)} />;
      case 4:
        return <UploadStep value={logo} onChange={(value) => setValue('logo', value)} />;
      case 5:
        return <DetailsStep register={register} errors={errors} />;
      case 6:
        return <AddonsStep value={addOns} onChange={(value) => setValue('addOns', value)} />;
      case 7:
        return <ContactStep register={register} errors={errors} isSubmitting={isSubmitting} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

          <div className="flex justify-between items-center max-w-3xl mx-auto mt-12">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-secondary text-foreground hover:bg-accent/20"
            >
              ← Previous
            </button>

            {currentStep === totalSteps ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-all hover:scale-105 glow-effect disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-background"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Project Request'
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-accent text-background font-semibold rounded-lg hover:bg-accent/90 transition-all hover:scale-105"
              >
                Next →
              </button>
            )}
          </div>

          {/* Step Skip Option for Logo Upload */}
          {currentStep === 4 && (
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={nextStep}
                className="text-muted-foreground hover:text-accent transition-colors text-sm underline"
              >
                Skip logo upload for now
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
