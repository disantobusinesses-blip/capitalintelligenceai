"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Send,
  Mail,
  ArrowRight,
  Calendar,
  MapPin,
  Star,
  Image as ImageIcon,
  Search,
  Zap,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

function AIChatDemo() {
  const [messages] = useState([
    { role: "bot", text: "Hi! How can I help you today?" },
    { role: "user", text: "I'd like to book a consultation" },
    { role: "bot", text: "I'd be happy to help! Let me pull up our available times. What day works best for you?" },
  ]);

  return (
    <div className="bg-[#0d0d0f] rounded-xl border border-white/5 overflow-hidden max-w-sm">
      <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-[#a78bfa]/20 flex items-center justify-center">
          <Bot size={12} className="text-[#a78bfa]" />
        </div>
        <span className="text-xs font-medium">AI Assistant</span>
        <span className="ml-auto w-2 h-2 rounded-full bg-green-500" />
      </div>
      <div className="p-4 space-y-3 min-h-[160px]">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#a78bfa] text-[#09090b]"
                  : "bg-white/5 text-[#d4d4d8]"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-white/5 flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 text-xs bg-white/5 rounded-lg px-3 py-2 text-white placeholder-[#52525b] outline-none"
          readOnly
        />
        <button className="p-2 bg-[#a78bfa] rounded-lg" aria-label="Send">
          <Send size={12} className="text-[#09090b]" />
        </button>
      </div>
    </div>
  );
}

function EmailCaptureDemo() {
  return (
    <div className="bg-[#0d0d0f] rounded-xl border border-white/5 p-6 max-w-sm">
      <div className="w-10 h-10 rounded-lg bg-[#a78bfa]/10 flex items-center justify-center mb-4">
        <Mail size={18} className="text-[#a78bfa]" />
      </div>
      <h4 className="font-semibold text-sm mb-1">Stay in the loop</h4>
      <p className="text-[10px] text-[#a1a1aa] mb-4">
        Get weekly insights delivered to your inbox.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="your@email.com"
          className="flex-1 text-xs bg-white/5 rounded-lg px-3 py-2.5 text-white placeholder-[#52525b] border border-white/10 outline-none"
          readOnly
        />
        <button className="px-4 py-2.5 bg-[#a78bfa] text-[#09090b] text-xs font-medium rounded-lg">
          Subscribe
        </button>
      </div>
    </div>
  );
}

function CTABlockDemo() {
  return (
    <div className="bg-gradient-to-br from-[#a78bfa]/10 to-[#0d0d0f] rounded-xl border border-[#a78bfa]/20 p-6 max-w-sm text-center">
      <h4 className="font-bold text-lg mb-2">Ready to get started?</h4>
      <p className="text-xs text-[#a1a1aa] mb-4">
        Transform your online presence today.
      </p>
      <button className="group flex items-center gap-2 mx-auto px-6 py-2.5 bg-[#a78bfa] text-[#09090b] text-xs font-semibold rounded-lg">
        Get Started
        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

function BookingDemo() {
  return (
    <div className="bg-[#0d0d0f] rounded-xl border border-white/5 p-6 max-w-sm">
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={16} className="text-[#a78bfa]" />
        <span className="text-sm font-medium">Book a Consultation</span>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={i} className="text-[10px] text-center text-[#52525b] py-1">{d}</div>
        ))}
        {Array.from({ length: 28 }, (_, i) => (
          <button
            key={i}
            className={`text-[10px] py-1.5 rounded transition-colors ${
              i === 14
                ? "bg-[#a78bfa] text-[#09090b] font-medium"
                : i === 15 || i === 16
                ? "bg-[#a78bfa]/10 text-[#a78bfa]"
                : "text-[#a1a1aa] hover:bg-white/5"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button className="w-full py-2.5 bg-[#a78bfa] text-[#09090b] text-xs font-medium rounded-lg">
        Confirm Booking
      </button>
    </div>
  );
}

function MapsDemo() {
  return (
    <div className="bg-[#0d0d0f] rounded-xl border border-white/5 overflow-hidden max-w-sm">
      <div className="aspect-[16/10] bg-[#18181b] relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#18181b]" />
        <div className="relative">
          <MapPin size={24} className="text-[#a78bfa] mx-auto" />
          <div className="mt-2 text-[10px] text-[#a1a1aa]">Melbourne, VIC</div>
        </div>
        {/* Map grid lines */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={`h-${i}`} className="absolute w-full h-px bg-white/20" style={{ top: `${(i + 1) * 16}%` }} />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <div key={`v-${i}`} className="absolute h-full w-px bg-white/20" style={{ left: `${(i + 1) * 16}%` }} />
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <MapPin size={12} className="text-[#a78bfa]" />
          <span className="text-xs">Service Area: Melbourne Metro</span>
        </div>
      </div>
    </div>
  );
}

function GalleryDemo() {
  return (
    <div className="bg-[#0d0d0f] rounded-xl border border-white/5 p-4 max-w-sm">
      <div className="flex items-center gap-2 mb-3">
        <ImageIcon size={14} className="text-[#a78bfa]" />
        <span className="text-xs font-medium">Portfolio Gallery</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg bg-gradient-to-br from-[#18181b] to-[#1a1a2e] hover:ring-1 hover:ring-[#a78bfa]/30 transition-all cursor-pointer"
            style={{ opacity: 0.6 + i * 0.06 }}
          />
        ))}
      </div>
    </div>
  );
}

function TestimonialsDemo() {
  return (
    <div className="bg-[#0d0d0f] rounded-xl border border-white/5 p-6 max-w-sm">
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-xs text-[#d4d4d8] italic leading-relaxed mb-4">
        &ldquo;The website CIG built for us completely transformed our online presence. Enquiries increased by 300% in the first month.&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#7c3aed]" />
        <div>
          <p className="text-xs font-medium">Sarah Chen</p>
          <p className="text-[10px] text-[#a1a1aa]">CEO, Luxe Property</p>
        </div>
      </div>
    </div>
  );
}

function SEODemo() {
  return (
    <div className="bg-[#0d0d0f] rounded-xl border border-white/5 p-6 max-w-sm">
      <div className="flex items-center gap-2 mb-4">
        <Search size={14} className="text-[#a78bfa]" />
        <span className="text-xs font-medium">SEO Performance</span>
      </div>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-[#a1a1aa]">Page Speed</span>
            <span className="text-green-400">98/100</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-green-400"
              initial={{ width: 0 }}
              whileInView={{ width: "98%" }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-[#a1a1aa]">SEO Score</span>
            <span className="text-[#a78bfa]">95/100</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#a78bfa]"
              initial={{ width: 0 }}
              whileInView={{ width: "95%" }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-[#a1a1aa]">Accessibility</span>
            <span className="text-emerald-400">100/100</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-emerald-400"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Zap size={12} className="text-amber-400" />
        <span className="text-[10px] text-[#a1a1aa]">
          Lightning-fast, SEO-optimised builds
        </span>
      </div>
    </div>
  );
}

const featureDemos = [
  {
    id: "ai-chat",
    title: "AI Chat Widget",
    description: "Intelligent chatbot that handles enquiries 24/7, qualifies leads, and books appointments automatically.",
    category: "AI-Powered",
    demo: <AIChatDemo />,
  },
  {
    id: "email-capture",
    title: "Email Capture & Lead Forms",
    description: "Beautiful opt-in forms that integrate with your CRM and email marketing platform.",
    category: "Lead Generation",
    demo: <EmailCaptureDemo />,
  },
  {
    id: "cta-blocks",
    title: "Strong CTA Blocks",
    description: "Conversion-optimised call-to-action sections designed to drive action at every scroll point.",
    category: "Conversion",
    demo: <CTABlockDemo />,
  },
  {
    id: "booking",
    title: "Booking & Scheduling",
    description: "Integrated booking system that syncs with your calendar and sends automated confirmations.",
    category: "Automation",
    demo: <BookingDemo />,
  },
  {
    id: "maps",
    title: "Maps & Service Areas",
    description: "Interactive maps showing your service locations, coverage areas, and office directions.",
    category: "Location",
    demo: <MapsDemo />,
  },
  {
    id: "gallery",
    title: "Gallery & Portfolio",
    description: "Stunning image galleries with lightbox, lazy loading, and optional video integration.",
    category: "Visual",
    demo: <GalleryDemo />,
  },
  {
    id: "testimonials",
    title: "Testimonials & Reviews",
    description: "Social proof sections with animated testimonial carousels and star ratings.",
    category: "Trust",
    demo: <TestimonialsDemo />,
  },
  {
    id: "seo",
    title: "SEO-Optimised Layout",
    description: "Lightning-fast, search-engine friendly architecture that ranks you higher on Google.",
    category: "Performance",
    demo: <SEODemo />,
  },
];

export { featureDemos };
export default function FeatureDemos() {
  return (
    <section className="py-20">
      <div className="space-y-24">
        {featureDemos.map((feature, i) => (
          <ScrollReveal key={feature.id}>
            <div
              className={`flex flex-col ${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 items-center`}
            >
              <div className="flex-1 max-w-md">
                <span className="text-[10px] font-medium tracking-widest text-[#a78bfa] uppercase mb-3 block">
                  {feature.category}
                </span>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-[#a1a1aa] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className="flex-1 flex justify-center">{feature.demo}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
