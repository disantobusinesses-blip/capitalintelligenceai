'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface QuoteModalContextValue {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const QuoteModalContext = createContext<QuoteModalContextValue>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
})

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <QuoteModalContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
    </QuoteModalContext.Provider>
  )
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext)
  if (!context) {
    throw new Error('useQuoteModal must be used within a QuoteModalProvider')
  }
  return context
}
