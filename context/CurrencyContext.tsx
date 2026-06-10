'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Currency = 'AUD' | 'USD'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (c: Currency) => void
  convert: (aud: number) => number
  symbol: string
  label: string
}

// Approximate rate – update periodically or replace with a live API
const AUD_TO_USD = 0.65

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'AUD',
  setCurrency: () => {},
  convert: (n) => n,
  symbol: '$',
  label: 'AUD',
})

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('AUD')

  const convert = (aud: number): number => {
    if (currency === 'USD') return Math.round(aud * AUD_TO_USD)
    return aud
  }

  const symbol = '$'
  const label = currency

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert, symbol, label }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}
