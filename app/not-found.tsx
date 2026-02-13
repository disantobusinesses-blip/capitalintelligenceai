'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/5 -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-9xl sm:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              404
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            Page Not Found
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="px-8 py-4 bg-accent text-background font-semibold rounded-lg hover:bg-accent/90 transition-all hover:scale-105 glow-effect text-lg"
            >
              Back to Home
            </Link>
            <Link
              href="/get-started"
              className="px-8 py-4 bg-secondary text-foreground font-semibold rounded-lg hover:bg-accent hover:text-background transition-all hover:scale-105 text-lg"
            >
              Get Started
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-4">Or explore these pages:</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/projects" 
                className="text-accent hover:underline text-sm font-medium"
              >
                Projects
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                href="/features" 
                className="text-accent hover:underline text-sm font-medium"
              >
                Features
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                href="/pricing" 
                className="text-accent hover:underline text-sm font-medium"
              >
                Pricing
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
