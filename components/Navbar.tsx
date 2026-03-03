'use client'

import Link from 'next/link'

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
            className="hidden sm:block text-sm font-medium text-gray-600 hover:text-tech-baby-blue smooth-transition"
          >
            Pricing
          </Link>
        </div>
      </div>
    </header>
  )
}
