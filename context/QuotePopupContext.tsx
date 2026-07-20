'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

// The service values shown in the popup's "What service do you need?" list.
// These mirror the packages on /services so the quote panel and the pricing
// page always offer the same choices. Buttons across the site open the popup
// with one of these pre-selected.
export type QuoteService =
  | 'Foundation'
  | 'Growth'
  | 'Bespoke'
  | 'Custom Build / Platform'
  | 'SEO Blog Content'
  | 'Google Business Profile'
  | 'B2B AI Platform'
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
