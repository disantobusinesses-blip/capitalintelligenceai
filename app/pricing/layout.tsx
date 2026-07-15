import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing | Intelligent AI Systems',
  description:
    'View pricing for Intelligent AI Systems website packages, templates, and AI integrations for Australian businesses.',
  alternates: {
    canonical: 'https://intelligentaisystem.com/services',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
