import type { Metadata } from 'next'
import './globals.css'
import ShaderBackground from '@/components/ShaderBackground'
import Navbar from '@/components/Navbar'
import { CurrencyProvider } from '@/context/CurrencyContext'

export const metadata: Metadata = {
  title: 'IAS – Intelligent AI Systems | Websites from $599 AUD',
  description: 'Intelligent AI Systems (IAS) builds professional websites, AI integrations, and digital solutions for Australian businesses. Landing pages from $599 AUD, full packages from $1,999 AUD.',
  keywords: 'web design Australia, landing page, AI integration, website maintenance, SEO, digital agency, IAS, Intelligent AI Systems',
  metadataBase: new URL('https://intelligentaisystem.com'),
  openGraph: {
    title: 'IAS – Intelligent AI Systems | Websites from $599 AUD',
    description: 'Professional websites and AI integrations for Australian businesses. Landing pages from $599 AUD, full packages from $1,999 AUD.',
    url: 'https://intelligentaisystem.com',
    siteName: 'Intelligent AI Systems',
    locale: 'en_AU',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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
      <body>
        <CurrencyProvider>
          <ShaderBackground />
          <Navbar />
          <div className="pt-16">
            {children}
          </div>
        </CurrencyProvider>
      </body>
    </html>
  )
}
