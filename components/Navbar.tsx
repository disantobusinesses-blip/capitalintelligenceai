'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header
        style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.08)' }}
        className="fixed top-0 left-0 right-0 z-50 bg-white h-[68px] flex items-center"
      >
        <div className="max-w-[1200px] mx-auto px-6 w-full flex items-center justify-between">
          {/* LEFT: Logo */}
          <Link href="/" aria-label="Home" className="flex items-center flex-shrink-0">
            <Image
              src="/images/is-logo.jpg"
              alt="Intelligent AI Systems"
              width={48}
              height={48}
              className="h-12 w-auto rounded object-cover"
            />
          </Link>

          {/* CENTER: Nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium text-[#1A1A1A] hover:text-[#5C3D2E] hover:underline transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT: Phone + CTA (desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-[#1A1A1A] font-semibold text-[15px]">03 7051 0100</span>
            <Link
              href="/#quote"
              className="bg-[#1A1A1A] text-white text-sm font-semibold px-6 py-3 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile: phone icon + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href="tel:0370510100"
              aria-label="Call us"
              className="text-[#1A1A1A] hover:text-[#5C3D2E] transition-colors duration-200"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="text-[#1A1A1A] hover:text-[#5C3D2E] transition-colors duration-200"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-[#1A1A1A] flex flex-col">
          <div className="flex items-center justify-between px-6 h-[68px]">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Image
                src="/images/is-logo.jpg"
                alt="Intelligent AI Systems"
                width={48}
                height={48}
                className="h-12 w-auto rounded object-cover"
              />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="text-white hover:text-[#9E9790] transition-colors duration-200"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-white text-3xl font-semibold hover:text-[#9E9790] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#quote"
              onClick={() => setMobileOpen(false)}
              className="mt-4 bg-white text-[#1A1A1A] text-lg font-bold px-8 py-4 rounded-[6px] hover:bg-[#F8F7F4] transition-colors duration-200"
            >
              Get a Free Quote
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
