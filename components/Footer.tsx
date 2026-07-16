'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#9E9790] pt-16 pb-8 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Column 1: Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/ias-logo.png"
                alt="Intelligent AI Systems"
                width={56}
                height={56}
                className="h-14 w-auto rounded object-cover"
              />
            </div>
            <p className="text-[#9E9790] text-sm leading-relaxed mb-3">
              Serving clients globally from Melbourne, Australia — helping businesses get found on Google and recommended by AI, so you get more leads, more calls, and more growth.
            </p>
            <p className="text-xs text-[#6B6560]">ABN: 38 693 023 371</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors duration-200">Home</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors duration-200">Services</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors duration-200">Projects</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors duration-200">Blog</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/landing-page" className="hover:text-white transition-colors duration-200">Landing Page</Link></li>
              <li><Link href="/services/full-package" className="hover:text-white transition-colors duration-200">Full Package</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors duration-200">SEO Plans</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors duration-200">Blog</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:0370510100" className="hover:text-white transition-colors duration-200">
                  03 7051 0100
                </a>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors duration-200">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[13px] text-[#6B6560]"
          style={{ borderTop: '1px solid #2D2D2D' }}
        >
          <p>© 2026 Intelligent AI Systems. All rights reserved.</p>
          <p className="md:text-right max-w-sm">
            Get found on Google and inside AI search engines like ChatGPT, Gemini and Perplexity.
          </p>
        </div>
      </div>
    </footer>
  )
}
