import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Intelligent AI Systems',
  description:
    'Get in touch with Intelligent AI Systems. We build premium websites and AI integrations for businesses across Australia, the US, the UK, and Singapore.',
  alternates: {
    canonical: 'https://intelligentaisystem.com/contact',
  },
  openGraph: {
    title: 'Contact Us | Intelligent AI Systems',
    description:
      'Get in touch with Intelligent AI Systems. We build premium websites and AI integrations for businesses across Australia.',
    url: 'https://intelligentaisystem.com/contact',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
