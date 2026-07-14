import { Cormorant_Garamond, Inter } from 'next/font/google'

// Display font for headlines — used across the redesigned homepage sections only.
export const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})

// Body font for the redesigned homepage sections only.
export const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})
