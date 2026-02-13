"use client";

import Link from "next/link";
import FeatureDemos from "@/components/FeatureDemos";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-[#a78bfa] uppercase mb-4 block">
              Features
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Premium modules
            </h1>
            <p className="text-[#a1a1aa] text-lg max-w-xl mx-auto">
              Every module is designed as a premium product component. See them
              in action below.
            </p>
          </div>
        </ScrollReveal>

        <FeatureDemos />

        {/* CTA */}
        <ScrollReveal>
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to build with these modules?
            </h2>
            <p className="text-[#a1a1aa] mb-8 max-w-md mx-auto">
              Start your project and choose the features that fit your business.
            </p>
            <Link
              href="/intake"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#a78bfa] text-[#09090b] font-semibold rounded-xl hover:bg-[#c4b5fd] transition-all text-sm"
            >
              Get Started
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
