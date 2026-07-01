import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Websites $1,999–$5,999 | IAS',
  description:
    'Multi-page custom website design from $1,999 AUD. Mobile responsive, SEO optimised, with analytics dashboard and content strategy included.',
  alternates: {
    canonical: 'https://intelligentaisystem.com/services/full-package',
  },
  openGraph: {
    title: 'Custom Websites $1,999–$5,999 | IAS',
    description:
      'Multi-page custom website design from $1,999 AUD. Mobile responsive, SEO optimised, with analytics dashboard and content strategy included.',
    url: 'https://intelligentaisystem.com/services/full-package',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
