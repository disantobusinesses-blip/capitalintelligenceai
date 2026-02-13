"use client";

import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/config";
import ScrollReveal from "./ScrollReveal";

export default function TierCards() {
  return (
    <section className="py-32 px-6 relative" id="pricing">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-[#a78bfa] uppercase mb-4 block">
              Pricing
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Choose your tier
            </h2>
            <p className="text-[#a1a1aa] text-lg max-w-xl mx-auto">
              Two premium tiers designed to match your business needs. Every
              build is crafted to perfection.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {siteConfig.tiers.map((tier, i) => (
            <ScrollReveal key={tier.id} delay={i * 0.15}>
              <div
                className={`relative group rounded-2xl p-8 transition-all duration-500 h-full flex flex-col ${
                  tier.popular
                    ? "bg-gradient-to-b from-[#a78bfa]/10 to-[#111113] border border-[#a78bfa]/30"
                    : "glass-card"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a78bfa] text-[#09090b] text-xs font-semibold">
                      <Sparkles size={12} />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                  <p className="text-[#a1a1aa] text-sm leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="mb-8">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-[#a1a1aa] text-sm ml-2">
                    {tier.currency}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <Check
                        size={16}
                        className="text-[#a78bfa] mt-0.5 shrink-0"
                      />
                      <span className="text-[#d4d4d8]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/intake?tier=${tier.id}`}
                  className={`group/btn flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                    tier.popular
                      ? "bg-[#a78bfa] text-[#09090b] hover:bg-[#c4b5fd]"
                      : "border border-white/10 text-white hover:bg-white/5 hover:border-white/20"
                  }`}
                >
                  Select {tier.name}
                  <ArrowRight
                    size={14}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
