'use client'

import { useEffect, useState } from 'react'
import { Hammer } from 'lucide-react'
import { useQuoteModal } from '@/context/QuoteModalContext'

export default function FloatingButton() {
  const { openModal } = useQuoteModal()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <button
      onClick={openModal}
      aria-label="Build me a website"
      className={`fixed bottom-24 right-6 z-40 flex items-center gap-2 bg-[#1A1A1A] text-white font-semibold rounded-full shadow-lg active:scale-95 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{ transition: 'opacity 0.5s ease, transform 0.5s ease, background-color 0.2s ease' }}
    >
      {/* Mobile: pill with hammer + label */}
      <span className="flex items-center gap-2 px-4 py-3 md:hidden text-sm">
        <Hammer className="w-4 h-4" />
        Build My Website
      </span>
      {/* Desktop: full label */}
      <span className="hidden md:flex items-center gap-2 px-5 py-3.5 text-sm">
        <Hammer className="w-4 h-4" />
        Build me a website →
      </span>
    </button>
  )
}
