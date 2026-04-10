import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { CurrencyProvider } from '@/context/CurrencyContext'
import { QuoteModalProvider } from '@/context/QuoteModalContext'
import { GetStartedModalProvider } from '@/context/GetStartedModalContext'
import GetStartedFormWrapper from '@/components/GetStartedFormWrapper'
import BottomNav from '@/components/BottomNav'
import QuoteModal from '@/components/QuoteModal'
import FloatingButton from '@/components/FloatingButton'
import Navbar from '@/components/Navbar'

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Capital Intelligence Group / Intelligent AI Systems',
  alternateName: 'IAS',
  url: 'https://intelligentaisystem.com',
  logo: 'https://intelligentaisystem.com/ias-logo.png',
  image: 'https://intelligentaisystem.com/ias-logo.png',
  description:
    'AI-powered web design and SEO agency based in Melbourne, Australia. Building fast websites and delivering SEO content for Australian small businesses and tradies.',
  telephone: '+61-3-7051-0100',
  email: 'sales@intelligentaisystem.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Melbourne',
    addressRegion: 'VIC',
    addressCountry: 'AU',
  },
  areaServed: [
    'Moonee Ponds',
    'Essendon',
    'Coburg',
    'Brunswick West',
    'Strathmore',
    'Pascoe Vale',
    'Flemington',
    'Ascot Vale',
    'Melbourne',
  ],
  priceRange: '$$',
  currenciesAccepted: 'AUD',
  paymentAccepted: 'Credit Card, Bank Transfer',
  openingHours: 'Mo-Fr 09:00-17:00',
  taxID: '38 693 023 371',
  legalName: 'AI Capital Holdings Pty Ltd',
  sameAs: ['https://intelligentaisystem.com'],
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Intelligent AI Systems',
  alternateName: 'IAS',
  url: 'https://intelligentaisystem.com',
  logo: 'https://intelligentaisystem.com/ias-logo.png',
  description:
    'Intelligent AI Systems (IAS) delivers premium websites, AI integrations, and digital solutions engineered for growth. Trusted by Australian businesses to build smarter digital experiences.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AU',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+61-3-7051-0100',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  sameAs: ['https://intelligentaisystem.com'],
  taxID: '38 693 023 371',
}

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
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
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
      <body className="bg-[#F8F7F4]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <CurrencyProvider>
          <QuoteModalProvider>
            <GetStartedModalProvider>
              <Navbar />
              {children}
              <BottomNav />
              <FloatingButton />
              <QuoteModal />
              <GetStartedFormWrapper />
            </GetStartedModalProvider>
          </QuoteModalProvider>
        </CurrencyProvider>
      </body>
    </html>
  )
}
