'use client'

import { useGetStartedModal } from '@/context/GetStartedModalContext'

export default function OpenQuoteModalButton({ className, children }: { className?: string; children?: React.ReactNode }) {
  const { openModal } = useGetStartedModal()
  return (
    <button
      onClick={() => openModal()}
      className={className}
    >
      {children ?? 'Get Started'}
    </button>
  )
}
