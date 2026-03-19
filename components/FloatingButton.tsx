'use client'

import { useEffect, useState } from 'react'
import { PenLine, Plus } from 'lucide-react'
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
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-tech-baby-blue text-tech-black font-semibold rounded-full shadow-glow smooth-transition hover:bg-tech-baby-blue-light hover:shadow-glow-lg active:scale-95 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{ transition: 'opacity 0.5s ease, transform 0.5s ease, background-color 0.2s ease' }}
    >
      {/* Mobile: icon only */}
      <span className="flex items-center justify-center w-14 h-14 md:hidden">
        <Plus className="w-6 h-6" />
      </span>
      {/* Desktop: full label */}
      <span className="hidden md:flex items-center gap-2 px-5 py-3.5 text-sm">
        <PenLine className="w-4 h-4" />
        Build me a website →
      </span>
    </button>
  )
}
