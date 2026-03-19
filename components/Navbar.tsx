'use client'

import Link from 'next/link'
import { Phone } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo placeholder – replace via GitHub with your own logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <div className="h-10 w-32 border border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-400">
            Logo
          </div>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="hidden sm:block text-sm font-medium text-gray-600 hover:text-tech-white smooth-transition"
          >
            Pricing
          </Link>

          {/* Phone CTA button – top-right, visible on all screen sizes */}
          <Link
            href="tel:0370510100"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-full smooth-transition"
            aria-label="Call us on 03 7051 0100"
          >
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span className="hidden sm:inline">Call Now · </span>
            <span>03 7051 0100</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
