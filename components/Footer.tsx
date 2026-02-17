'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-luxury-charcoal text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-silver flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Intelligent Systems</h3>
                <p className="text-sm text-luxury-silver-light">Capital Intelligence Group</p>
              </div>
            </div>
            <p className="text-luxury-silver-light leading-relaxed mb-4">
              We integrate intelligent systems into businesses so they operate smoother, faster, and smarter.
            </p>
            <p className="text-sm text-luxury-silver-light">
              ABN: 38 693 023 371
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('packages');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-luxury-silver-light hover:text-white smooth-transition"
                >
                  Plans & Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('projects');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-luxury-silver-light hover:text-white smooth-transition"
                >
                  Our Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('onboarding');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-luxury-silver-light hover:text-white smooth-transition"
                >
                  Onboarding
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-luxury-silver-light hover:text-white smooth-transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-luxury-silver-light hover:text-white smooth-transition"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-luxury-silver-dark pt-8 text-center text-luxury-silver-light">
          <p>© {new Date().getFullYear()} Capital Intelligence Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
