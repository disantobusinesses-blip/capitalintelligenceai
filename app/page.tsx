'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionReveal from '@/components/section-reveal';
import TierCard from '@/components/tier-card';
import ProjectCard from '@/components/project-card';
import { tiers, projects, addOns } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/5 -z-10" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <span className="text-3xl font-bold text-background">C</span>
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance"
            >
              Premium Websites.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                Intelligently Built.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-balance"
            >
              Australian-based premium web studio crafting high-end, conversion-focused websites 
              with cutting-edge AI integration. Fast. Beautiful. Effective.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/get-started"
                className="px-8 py-4 bg-accent text-background font-semibold rounded-lg hover:bg-accent/90 transition-all hover:scale-105 glow-effect text-lg"
              >
                Get Started
              </Link>
              <Link
                href="/projects"
                className="px-8 py-4 bg-secondary text-foreground font-semibold rounded-lg hover:bg-accent hover:text-background transition-all hover:scale-105 text-lg"
              >
                View Projects
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-muted-foreground"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Tier Selection Section */}
      <section className="py-24 bg-gradient-to-b from-accent/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Choose Your Tier</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Select the perfect package for your business needs
              </p>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, index) => (
              <SectionReveal key={tier.id} delay={0.1 * (index + 1)}>
                <TierCard tier={tier} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl font-bold mb-8">
                Why Capital Intelligence Group?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We're not just web developers — we're digital architects. Our team combines 
                cutting-edge technology with premium design aesthetics to create websites that 
                don't just look stunning, but drive real business results.
              </p>
              <div className="grid sm:grid-cols-3 gap-8 mt-12">
                <div className="p-6 rounded-xl border border-border bg-card">
                  <div className="text-4xl font-bold text-accent mb-2">Fast</div>
                  <p className="text-muted-foreground">1-2 week delivery on most projects</p>
                </div>
                <div className="p-6 rounded-xl border border-border bg-card">
                  <div className="text-4xl font-bold text-accent mb-2">Premium</div>
                  <p className="text-muted-foreground">High-end design that converts</p>
                </div>
                <div className="p-6 rounded-xl border border-border bg-card">
                  <div className="text-4xl font-bold text-accent mb-2">Intelligent</div>
                  <p className="text-muted-foreground">AI-powered features included</p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-24 bg-gradient-to-b from-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Featured Projects</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                See what we've built for our clients
              </p>
            </div>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.slice(0, 3).map((project, index) => (
              <SectionReveal key={project.id} delay={0.1 * (index + 1)}>
                <ProjectCard project={project} />
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div className="text-center">
              <Link
                href="/projects"
                className="inline-flex items-center px-8 py-4 bg-secondary text-foreground font-semibold rounded-lg hover:bg-accent hover:text-background transition-all hover:scale-105"
              >
                View All Projects
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Add-ons Highlight */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Modular Add-ons</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Enhance your website with powerful features
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {addOns.map((addon, index) => (
              <SectionReveal key={addon.id} delay={0.05 * (index + 1)}>
                <div className="p-6 rounded-xl border border-border bg-card hover:border-accent/50 transition-all text-center group hover:scale-105">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {addon.icon}
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{addon.name}</h3>
                  <p className="text-accent text-sm font-bold">{addon.price}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.6}>
            <div className="text-center mt-12">
              <Link
                href="/pricing"
                className="inline-flex items-center text-accent hover:underline font-semibold"
              >
                View full pricing details
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-accent/10 to-primary/5 border-y border-accent/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Ready to Build Your Premium Website?
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                Get started today and have your new website live in 1-2 weeks
              </p>
              <Link
                href="/get-started"
                className="inline-flex items-center px-10 py-5 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-all hover:scale-105 glow-effect text-lg"
              >
                Start Your Project
                <svg
                  className="w-6 h-6 ml-3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
