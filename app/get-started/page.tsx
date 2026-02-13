'use client';

import { Suspense } from 'react';
import IntakeForm from '@/components/intake-form';

function GetStartedContent() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">Let's Build Your Website</h1>
          <p className="text-xl text-muted-foreground">
            Complete this quick intake form to help us understand your vision. 
            Takes just 5 minutes.
          </p>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <IntakeForm />
      </Suspense>
    </div>
  );
}

export default function GetStartedPage() {
  return <GetStartedContent />;
}
