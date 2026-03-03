'use client'

import Link from 'next/link'
import { useCurrency } from '@/context/CurrencyContext'

export default function Navbar() {
  const { currency, setCurrency } = useCurrency()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-tech-black/90 backdrop-blur-md border-b border-tech-baby-blue/20">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="IAS – Intelligent AI Systems"
        >
          <span
            className="text-2xl font-extrabold tracking-tight text-tech-baby-blue group-hover:text-tech-baby-blue-light smooth-transition"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}
          >
            IAS
          </span>
          <span className="hidden sm:block text-sm text-tech-platinum/70 font-medium pl-2 border-l border-tech-baby-blue/30">
            Intelligent AI Systems
          </span>
        </Link>

        {/* Nav links + Currency Switcher */}
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="hidden sm:block text-sm font-medium text-tech-platinum hover:text-tech-baby-blue smooth-transition"
          >
            Pricing
          </Link>
          <div role="group" className="flex items-center gap-1 bg-tech-gray border border-tech-baby-blue/20 rounded-lg p-1" aria-label="Currency switcher">
            <button
              onClick={() => setCurrency('AUD')}
              className={`px-3 py-1.5 rounded text-sm font-semibold smooth-transition ${
                currency === 'AUD'
                  ? 'bg-tech-baby-blue text-tech-black'
                  : 'text-tech-platinum hover:text-tech-white'
              }`}
              aria-pressed={currency === 'AUD'}
            >
              🇦🇺 AUD
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded text-sm font-semibold smooth-transition ${
                currency === 'USD'
                  ? 'bg-tech-baby-blue text-tech-black'
                  : 'text-tech-platinum hover:text-tech-white'
              }`}
              aria-pressed={currency === 'USD'}
            >
              🇺🇸 USD
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
