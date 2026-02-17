"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroNew() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-radial">
      {/* Animated background elements - silver tones */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-silver/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-silver-light/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-silver to-silver-dark mb-4">
            <span className="text-white font-bold text-2xl">IS</span>
          </div>
          <h3 className="text-sm font-semibold tracking-[0.3em] text-silver-dark uppercase">
            Intelligent Systems
          </h3>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="block text-foreground">Systems That Think.</span>
          <span className="block bg-gradient-to-r from-silver via-silver-light to-silver bg-clip-text text-transparent">
            Businesses That Scale.
          </span>
        </motion.h1>

        {/* Slogan */}
        <motion.p
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          We integrate intelligent systems into businesses so they operate
          smoother, faster, and smarter.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Link
            href="#packages"
            className="group relative px-8 py-3.5 bg-foreground text-white font-semibold rounded-xl hover:bg-silver-dark transition-all duration-300 text-sm overflow-hidden"
          >
            <span className="relative z-10">Begin Building Your Website</span>
            <div className="absolute inset-0 bg-gradient-to-r from-silver to-silver-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          <Link
            href="#projects"
            className="px-8 py-3.5 border border-border text-foreground font-medium rounded-xl hover:bg-muted hover:border-silver transition-all duration-300 text-sm"
          >
            View Our Projects
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="w-5 h-8 rounded-full border border-silver flex justify-center pt-1.5"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-silver-dark"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
