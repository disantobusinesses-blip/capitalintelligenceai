'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-transparent text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/is-logo.jpg"
                alt="Intelligent Systems Logo"
                className="h-16 w-auto rounded"
              />
            </div>
            <p className="text-white/70 leading-relaxed mb-4">
              We integrate intelligent systems into businesses so they operate smoother, faster, and smarter.
            </p>
            <p className="text-sm text-white/50">
              ABN: 38 693 023 371
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('services');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-white/70 hover:text-tech-white smooth-transition"
                >
                  Services
                </button>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-white/70 hover:text-tech-white smooth-transition"
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
                  className="text-white/70 hover:text-tech-white smooth-transition"
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
                  className="text-white/70 hover:text-tech-white smooth-transition"
                >
                  AI Assistant
                </button>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-tech-white smooth-transition"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-white/70 hover:text-tech-white smooth-transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-white/70 hover:text-tech-white smooth-transition"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 text-center text-white/50">
          <p>© {new Date().getFullYear()} Capital Intelligence Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
