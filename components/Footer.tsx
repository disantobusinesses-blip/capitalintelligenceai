'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const PROMO_END = new Date('2026-04-07T23:59:59')

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, target.getTime() - Date.now()))

  useEffect(() => {
    const tick = () => setTimeLeft(Math.max(0, target.getTime() - Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  const totalSeconds = Math.floor(timeLeft / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, expired: timeLeft === 0 }
}

function PromoBanner() {
  const { days, hours, minutes, seconds, expired } = useCountdown(PROMO_END)

  if (expired) return null

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="bg-[#B91C1C] text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm">
        <span className="font-semibold tracking-wide">
          Limited offer — <span className="underline underline-offset-2">10% off all services</span>
        </span>
        <span className="text-white/70 hidden sm:inline">·</span>
        <span className="flex items-center gap-1.5 text-white/90 font-mono text-xs">
          <span>Ends in</span>
          <span className="bg-white/10 rounded px-1.5 py-0.5">{days}d</span>
          <span className="bg-white/10 rounded px-1.5 py-0.5">{pad(hours)}h</span>
          <span className="bg-white/10 rounded px-1.5 py-0.5">{pad(minutes)}m</span>
          <span className="bg-white/10 rounded px-1.5 py-0.5">{pad(seconds)}s</span>
        </span>
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#9E9790] pb-8">
      <PromoBanner />
      <div className="pt-16 pb-0 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Column 1: Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/ias-logo.png"
                alt="Intelligent AI Systems"
                width={72}
                height={72}
                className="h-16 w-auto rounded-lg object-cover"
              />
            </div>
            <p className="text-[#9E9790] text-sm leading-relaxed mb-3">
              We help Australian businesses get found on Google and recommended by AI, so you get more leads, more calls, and more growth.
            </p>
            <p className="text-xs text-[#6B6560]">ABN: 38 693 023 371</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors duration-200">Home</Link></li>
              <li><Link href="/#services" className="hover:text-white transition-colors duration-200">Services</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors duration-200">Pricing</Link></li>
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
              <li><Link href="/pricing" className="hover:text-white transition-colors duration-200">SEO Plans</Link></li>
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
      </div>
    </footer>
  )
}
