"use client";

import ScrollReveal from "./ScrollReveal";
import { Zap, Shield, Clock, Award } from "lucide-react";

const values = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Every project is built for speed. Optimised performance means higher rankings and happier visitors.",
  },
  {
    icon: Shield,
    title: "Built to Last",
    description:
      "Enterprise-grade architecture with security best practices baked into every build.",
  },
  {
    icon: Clock,
    title: "Rapid Delivery",
    description:
      "From concept to launch in record time. Our streamlined process keeps timelines tight.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "No templates. No shortcuts. Every pixel is crafted to meet the highest standard of design.",
  },
];

export default function AboutSection() {
  return (
    <section className="py-32 px-6" id="about">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div>
              <span className="text-xs font-medium tracking-widest text-[#a78bfa] uppercase mb-4 block">
                About Us
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-[1.15]">
                Premium builds.
                <br />
                <span className="text-[#a1a1aa]">Zero compromises.</span>
              </h2>
              <p className="text-[#a1a1aa] text-lg leading-relaxed mb-6">
                Capital Intelligence Group is a premium web development studio
                based in Australia. We specialise in crafting high-end,
                AI-integrated websites that don&apos;t just look beautiful —
                they convert visitors into clients.
              </p>
              <p className="text-[#a1a1aa] leading-relaxed">
                Every project is built from scratch with modern technology,
                thoughtful UX, and conversion-focused design. We combine
                cutting-edge AI integration with timeless design principles to
                create digital experiences that elevate your brand.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4">
            {values.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="glass-card rounded-xl p-6 group hover:scale-[1.02] transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[#a78bfa]/10 flex items-center justify-center mb-4 group-hover:bg-[#a78bfa]/20 transition-colors">
                    <item.icon size={18} className="text-[#a78bfa]" />
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
