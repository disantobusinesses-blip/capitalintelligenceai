"use client";

import ScrollReveal from "./ScrollReveal";
import { siteConfig } from "@/lib/config";
import {
  Bot,
  Mail,
  Calendar,
  MapPin,
  FileText,
  Image,
  Search,
  Quote,
  Share2,
  Video,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Bot,
  Mail,
  Calendar,
  MapPin,
  FileText,
  Image,
  Search,
  Quote,
  Share2,
  Video,
};

export default function AddOnsSection() {
  return (
    <section className="py-32 px-6 gradient-radial-bottom">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-[#a78bfa] uppercase mb-4 block">
              Modular Upgrades
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Power-up with add-ons
            </h2>
            <p className="text-[#a1a1aa] text-lg max-w-xl mx-auto">
              Extend your website with premium modules. Each add-on is built to
              integrate seamlessly.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {siteConfig.addOns.map((addon, i) => {
            const Icon = iconMap[addon.icon] || Bot;
            return (
              <ScrollReveal key={addon.id} delay={i * 0.05}>
                <div className="glass-card rounded-xl p-5 text-center group hover:scale-[1.02] transition-all duration-300 cursor-default">
                  <div className="w-10 h-10 rounded-lg bg-[#a78bfa]/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#a78bfa]/20 transition-colors">
                    <Icon size={18} className="text-[#a78bfa]" />
                  </div>
                  <span className="text-xs font-medium text-[#d4d4d8]">
                    {addon.label}
                  </span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
