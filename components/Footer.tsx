'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-tech-baby-blue/20 text-tech-white py-16 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 tech-grid opacity-5" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-tech-baby-blue rounded-full blur-3xl opacity-5" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/987c6401-7e4f-425c-afe0-67cfa9fb2937.jpeg"
                alt="Intelligent Systems logo"
                width={56}
                height={80}
                className="object-contain flex-shrink-0"
                style={{ width: 56, height: 80 }}
              />
              <div>
                <h3 className="text-xl font-bold text-tech-white">Intelligent Systems</h3>
                <p className="text-sm text-tech-platinum">Capital Intelligence Group</p>
              </div>
            </div>
            <p className="text-tech-platinum leading-relaxed mb-4">
              We integrate intelligent systems into businesses so they operate smoother, faster, and smarter.
            </p>
            <p className="text-sm text-tech-platinum">
              ABN: 38 693 023 371
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-tech-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('services');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-tech-platinum hover:text-tech-baby-blue smooth-transition"
                >
                  Services
                </button>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-tech-platinum hover:text-tech-baby-blue smooth-transition"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('projects');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-tech-platinum hover:text-tech-baby-blue smooth-transition"
                >
                  Our Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('chat');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-tech-platinum hover:text-tech-baby-blue smooth-transition"
                >
                  AI Assistant
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-tech-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-tech-platinum hover:text-tech-baby-blue smooth-transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-tech-platinum hover:text-tech-baby-blue smooth-transition"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-tech-baby-blue/20 pt-8 text-center text-tech-platinum">
          <p>© {new Date().getFullYear()} Capital Intelligence Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
