import type { Metadata } from 'next'
import './globals.css'
import MeshGradientBackground from '@/components/MeshGradientBackground'
import { CurrencyProvider } from '@/context/CurrencyContext'
import BottomNav from '@/components/BottomNav'

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
          <MeshGradientBackground
            colors={["#5C3A21", "#8B6B4A", "#C49A6C", "#D4B08C", "#3E2723", "#A1887F"]}
            distortion={1.2}
            speed={0.8}
          />
          {children}
          <BottomNav />
        </CurrencyProvider>
      </body>
    </html>
  )
}
