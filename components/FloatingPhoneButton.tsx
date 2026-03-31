'use client'

import Link from 'next/link'
import { Phone } from 'lucide-react'

export default function FloatingPhoneButton() {
  return (
    <Link
      href="tel:0370510100"
      aria-label="Call us on 03 7051 0100"
      className="fixed top-4 right-4 z-50 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-lg smooth-transition active:scale-95"
    >
      <Phone className="w-4 h-4 flex-shrink-0" />
      <span className="hidden sm:inline">Call Now · </span>
      <span>03 7051 0100</span>
    </Link>
  )
}
