"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#a78bfa]/20 via-[#7c3aed]/10 to-transparent" />
            <div className="absolute inset-0 bg-[#111113]/80" />

            <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Ready to build something
                <br />
                <span className="bg-gradient-to-r from-[#a78bfa] to-[#c4b5fd] bg-clip-text text-transparent">
                  extraordinary?
                </span>
              </h2>
              <p className="text-[#a1a1aa] text-lg max-w-lg mx-auto mb-8">
                Start your project today. Our streamlined intake process makes
                it effortless to get started.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/intake"
                  className="group flex items-center gap-2 px-8 py-3.5 bg-[#a78bfa] text-[#09090b] font-semibold rounded-xl hover:bg-[#c4b5fd] transition-all duration-300 text-sm"
                >
                  Get Started
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  href="/projects"
                  className="px-8 py-3.5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/5 transition-all duration-300 text-sm"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
