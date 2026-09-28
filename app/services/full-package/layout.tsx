import type { Metadata } from 'next'

/* Mirrors app/pricing/layout.tsx: a metadata shell for a URL that permanently
   redirects (see next.config.js). The standalone Full Package page was
   retired, but unlike B2B this is a renamed offering, not a discontinued
   one: it now lives as the Growth and Bespoke tiers on /services, so the
   title below describes where that content actually went. */
export const metadata: Metadata = {
  title: 'Full Website Packages, Now Growth & Bespoke | Intelligent AI Systems',
  description:
    'Our full custom website package is now the Growth ($2,999) and Bespoke ($6,999) tiers on the services page, compared side by side with Foundation.',
  alternates: {
    canonical: 'https://intelligentaisystem.com/services',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
