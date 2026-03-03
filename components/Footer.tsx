'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-16 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            {/* Logo placeholder – replace via GitHub with your own logo */}
            <div className="mb-4">
              <div className="h-16 w-48 border border-dashed border-gray-300 rounded flex items-center justify-center text-sm text-gray-400">
                Logo
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              We integrate intelligent systems into businesses so they operate smoother, faster, and smarter.
            </p>
            <p className="text-sm text-gray-500">
              ABN: 38 693 023 371
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-800">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('services');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-600 hover:text-tech-baby-blue smooth-transition"
                >
                  Services
                </button>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-tech-baby-blue smooth-transition"
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
                  className="text-gray-600 hover:text-tech-baby-blue smooth-transition"
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
                  className="text-gray-600 hover:text-tech-baby-blue smooth-transition"
                >
                  AI Assistant
                </button>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-tech-baby-blue smooth-transition"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-800">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-tech-baby-blue smooth-transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-gray-600 hover:text-tech-baby-blue smooth-transition"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Capital Intelligence Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
