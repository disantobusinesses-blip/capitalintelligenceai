import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Intelligent AI Systems',
  description:
    'Read the privacy policy for Intelligent AI Systems. How we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://intelligentaisystem.com/privacy-policy',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
