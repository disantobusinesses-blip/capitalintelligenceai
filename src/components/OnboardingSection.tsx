"use client";

import { CheckCircle2, Upload, Layout, Puzzle, Rocket } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    number: 1,
    title: "Choose Plan",
    description:
      "Select the monthly package that aligns with your business goals and budget",
    icon: CheckCircle2,
  },
  {
    number: 2,
    title: "Upload Logo + Brand Assets",
    description:
      "Share your logo, brand colors, and any existing brand guidelines with our team",
    icon: Upload,
  },
  {
    number: 3,
    title: "Select Layout Style",
    description:
      "Choose from our premium templates and design styles that match your vision",
    icon: Layout,
  },
  {
    number: 4,
    title: "Choose Features",
    description:
      "Pick the integrations and functionality that will power your website",
    icon: Puzzle,
  },
  {
    number: 5,
    title: "Launch + Ongoing Plan",
    description:
      "Go live with your new website and enjoy continuous support and improvements",
    icon: Rocket,
  },
];

export default function OnboardingSection() {
  return (
    <section className="py-32 px-6 relative bg-gradient-to-b from-white to-muted">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-silver-dark uppercase mb-4 block">
              Simple Process
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Your Journey to Success
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From concept to launch in five straightforward steps. We guide you
              through every phase of the process.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-silver to-transparent -translate-y-1/2" />

          <div className="grid gap-8 md:gap-6">
            {steps.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 0.1}>
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-center gap-6 group">
                    {/* Icon Circle */}
                    <div className="relative shrink-0">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-silver to-silver-dark flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300 z-10 relative">
                        <step.icon size={32} strokeWidth={2} />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-silver to-silver-dark opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="inline-flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-silver-dark">
                          STEP {step.number}
                        </span>
                        <span className="h-px w-12 bg-silver hidden md:block" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-silver-dark transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed max-w-xl">
                        {step.description}
                      </p>
                    </div>

                    {/* Step number decoration */}
                    <div className="hidden lg:block text-8xl font-black text-silver/5 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                      {step.number}
                    </div>
                  </div>

                  {/* Connector for mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden w-0.5 h-8 bg-silver/30 mx-auto my-4" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.6}>
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 glass-card rounded-2xl">
              <div className="text-left">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Ready to get started?
                </h3>
                <p className="text-muted-foreground text-sm">
                  The entire process typically takes 2-3 weeks from start to launch.
                </p>
              </div>
              <a
                href="#packages"
                className="px-8 py-3.5 bg-foreground text-white font-semibold rounded-xl hover:bg-silver-dark transition-all duration-300 whitespace-nowrap"
              >
                Choose Your Plan
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
