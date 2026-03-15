import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import MeshGradientBackground from '@/components/MeshGradientBackground'
import { CurrencyProvider } from '@/context/CurrencyContext'
import BottomNav from '@/components/BottomNav'

export const metadata: Metadata = {
  title: 'IAS – Intelligent AI Systems | Premium Web & AI Solutions',
  description: 'Intelligent AI Systems (IAS) delivers premium websites, AI integrations, and digital solutions engineered for growth. Trusted by Australian businesses to build smarter digital experiences.',
  keywords: 'web design Australia, landing page, AI integration, website maintenance, SEO, digital agency, IAS, Intelligent AI Systems',
  metadataBase: new URL('https://intelligentaisystem.com'),
  openGraph: {
    title: 'IAS – Intelligent AI Systems | Premium Web & AI Solutions',
    description: 'Premium websites and AI integrations engineered for growth. Trusted by Australian businesses to build smarter digital experiences.',
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
      {/* Google Ads global site tag (AW-17950129824) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17950129824"
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17950129824');
        `}
      </Script>
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
