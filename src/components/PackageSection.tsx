"use client";

import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const packages = [
  {
    id: "website-care",
    name: "Website Care",
    price: "$169",
    period: "per month",
    description: "Essential maintenance and updates for your website",
    features: [
      "Monthly website updates",
      "Security monitoring",
      "Performance optimization",
      "Backup & recovery",
      "Technical support",
      "Bug fixes",
      "Content updates (2 hours/month)",
      "Monthly performance report",
    ],
    recommended: false,
  },
  {
    id: "revenue-optimization",
    name: "Revenue Optimisation",
    price: "$279",
    period: "per month",
    description: "Drive growth with conversion-focused improvements",
    features: [
      "Everything in Website Care",
      "A/B testing implementation",
      "Conversion rate optimization",
      "Analytics & reporting",
      "SEO improvements",
      "Lead capture optimization",
      "Content updates (4 hours/month)",
      "Quarterly strategy sessions",
    ],
    recommended: true,
  },
  {
    id: "done-for-you",
    name: "Done-For-You Digital Team",
    price: "$449",
    period: "per month",
    description: "Complete digital management and growth acceleration",
    features: [
      "Everything in Revenue Optimisation",
      "Dedicated account manager",
      "Content creation & publishing",
      "Social media management",
      "Email marketing campaigns",
      "Advanced AI integrations",
      "Custom feature development",
      "Unlimited support & updates",
      "Weekly strategy calls",
    ],
    recommended: false,
  },
];

export default function PackageSection() {
  return (
    <section className="py-32 px-6 relative" id="packages">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-silver-dark uppercase mb-4 block">
              Monthly Plans
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Choose Your Growth Path
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Flexible monthly plans designed to scale with your business needs.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {packages.map((pkg, i) => (
            <ScrollReveal key={pkg.id} delay={i * 0.15}>
              <div
                className={`relative group rounded-2xl p-8 transition-all duration-500 h-full flex flex-col ${
                  pkg.recommended
                    ? "bg-gradient-to-b from-silver/10 to-white border-2 border-silver shadow-xl"
                    : "glass-card"
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground text-white text-xs font-semibold">
                      <Sparkles size={12} />
                      Recommended
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    {pkg.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-foreground">
                    {pkg.price}
                  </span>
                  <span className="text-muted-foreground text-sm ml-2">
                    {pkg.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <Check
                        size={16}
                        className="text-silver-dark mt-0.5 shrink-0"
                      />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/intake?package=${pkg.id}`}
                  className={`group/btn flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    pkg.recommended
                      ? "bg-foreground text-white hover:bg-silver-dark"
                      : "border-2 border-border text-foreground hover:bg-muted hover:border-silver"
                  }`}
                >
                  Select {pkg.name}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
