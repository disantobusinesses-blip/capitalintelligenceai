"use client";

import { Suspense } from "react";
import IntakeForm from "@/components/IntakeForm";
import ScrollReveal from "@/components/ScrollReveal";

export default function IntakePage() {
  return (
    <div className="pt-32 pb-20 px-6 gradient-radial">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-medium tracking-widest text-[#a78bfa] uppercase mb-4 block">
              Start Your Project
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Let&apos;s build something
              <br />
              <span className="bg-gradient-to-r from-[#a78bfa] to-[#c4b5fd] bg-clip-text text-transparent">
                extraordinary
              </span>
            </h1>
            <p className="text-[#a1a1aa] text-lg max-w-xl mx-auto">
              Complete the steps below and we&apos;ll get your project started
              within 24 hours.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Suspense
            fallback={
              <div className="max-w-2xl mx-auto text-center py-20 text-[#a1a1aa]">
                Loading...
              </div>
            }
          >
            <IntakeForm />
          </Suspense>
        </ScrollReveal>
      </div>
    </div>
  );
}
