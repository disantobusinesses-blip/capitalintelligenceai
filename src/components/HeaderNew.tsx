"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#packages", label: "Pricing" },
  { href: "#projects", label: "Projects" },
  { href: "#ai-demo", label: "AI Demo" },
];

export default function HeaderNew() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-silver to-silver-dark flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
            IS
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Intelligent Systems
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm rounded-lg transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/intake"
            className="ml-2 px-4 py-2 text-sm rounded-lg bg-foreground text-white font-medium hover:bg-silver-dark transition-all duration-300"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm rounded-lg transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/intake"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm rounded-lg bg-foreground text-white font-medium text-center mt-2"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
