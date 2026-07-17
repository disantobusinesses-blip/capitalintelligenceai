'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

// The service values shown in the popup's "What service do you need?" dropdown.
// Buttons across the site open the popup with one of these pre-selected.
export type QuoteService =
  | 'Landing Page'
  | 'Custom Website'
  | 'Cinematic Custom Website'
  | 'B2B AI Platform'
  | 'Google Business Profile'
  | 'Other'

interface QuotePopupContextValue {
  isOpen: boolean
  /** Pre-selected service for the dropdown, or '' for no selection. */
  preselectedService: QuoteService | ''
  openPopup: (service?: QuoteService) => void
  closePopup: () => void
}

const QuotePopupContext = createContext<QuotePopupContextValue | undefined>(undefined)

export function QuotePopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [preselectedService, setPreselectedService] = useState<QuoteService | ''>('')

  return (
    <QuotePopupContext.Provider
      value={{
        isOpen,
        preselectedService,
        openPopup: (service) => {
          setPreselectedService(service ?? '')
          setIsOpen(true)
        },
        closePopup: () => setIsOpen(false),
      }}
    >
      {children}
    </QuotePopupContext.Provider>
  )
}

export function useQuotePopup() {
  const context = useContext(QuotePopupContext)
  if (!context) {
    throw new Error('useQuotePopup must be used within a QuotePopupProvider')
  }
  return context
}
