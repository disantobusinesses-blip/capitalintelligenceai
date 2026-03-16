'use client'

import { useQuoteModal } from '@/context/QuoteModalContext'

export default function OpenQuoteModalButton({ className, children }: { className?: string; children?: React.ReactNode }) {
  const { openModal } = useQuoteModal()
  return (
    <button
      onClick={openModal}
      className={className}
    >
      {children ?? 'Get Started'}
    </button>
  )
}
