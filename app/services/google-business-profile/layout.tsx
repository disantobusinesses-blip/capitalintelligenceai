import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Google Business Profile Setup $299 | IAS',
  description:
    'Professional Google Business Profile setup and optimisation from $299. Includes cover image, review QR code, keyword-rich description, and local SEO.',
  alternates: {
    canonical: 'https://intelligentaisystem.com/services/google-business-profile',
  },
  openGraph: {
    title: 'Google Business Profile Setup $299 | IAS',
    description:
      'Professional Google Business Profile setup and optimisation from $299. Includes cover image, review QR code, and local SEO.',
    url: 'https://intelligentaisystem.com/services/google-business-profile',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
