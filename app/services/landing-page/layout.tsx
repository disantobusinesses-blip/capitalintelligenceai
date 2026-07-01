import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Landing Pages from $599 | IAS Australia',
  description:
    'High-converting landing pages from $599 AUD. Mobile responsive, SEO optimised, fast-loading — built to turn visitors into leads.',
  alternates: {
    canonical: 'https://intelligentaisystem.com/services/landing-page',
  },
  openGraph: {
    title: 'Landing Pages from $599 | IAS Australia',
    description:
      'High-converting landing pages from $599 AUD. Mobile responsive, SEO optimised, fast-loading — built to turn visitors into leads.',
    url: 'https://intelligentaisystem.com/services/landing-page',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
