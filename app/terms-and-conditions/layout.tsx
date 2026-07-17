import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Intelligent AI Systems',
  description:
    'Terms and conditions for Intelligent AI Systems services, including subscription plans, billing, cancellation, and intellectual property rights.',
  alternates: {
    canonical: 'https://intelligentaisystem.com/terms-and-conditions',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
