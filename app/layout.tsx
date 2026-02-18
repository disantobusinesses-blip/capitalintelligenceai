import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Intelligent Systems - Capital Intelligence Group',
  description: 'We integrate intelligent systems into businesses so they operate smoother, faster, and smarter.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
