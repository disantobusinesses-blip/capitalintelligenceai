'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone } from 'lucide-react'
import { useQuotePopup } from '@/context/QuotePopupContext'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Templates', href: '/templates' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const { openPopup } = useQuotePopup()

  return (
    <header
      style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.08)' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white h-[68px] flex items-center"
    >
      <div className="max-w-[1200px] mx-auto px-6 w-full flex items-center justify-between">
        {/* LEFT: Logo */}
        <Link href="/" aria-label="Home" className="flex items-center flex-shrink-0">
          <Image
            src="/ias-logo.png"
            alt="Intelligent AI Systems"
            width={48}
            height={48}
            loading="eager"
            fetchPriority="high"
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

        {/* RIGHT: Phone + CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="tel:0370510100"
            aria-label="Call 03 7051 0100"
            className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#5C3D2E] transition-colors duration-200"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden md:inline font-semibold text-[15px]">03 7051 0100</span>
          </a>
          <button
            type="button"
            onClick={() => openPopup()}
            className="bg-[#1A1A1A] text-white text-sm font-semibold px-5 py-2.5 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200"
          >
            Quote
          </button>
        </div>
      </div>
    </header>
  )
}
