import type { Metadata } from 'next'

/* Mirrors app/pricing/layout.tsx: a metadata shell for a URL that permanently
   redirects (see next.config.js), so a crawler that doesn't follow the
   redirect still sees a title distinct from every other page rather than
   duplicating /services'.

   B2B Lead Generation is a retired service, not a renamed one, so this does
   not describe it as a current offering the way full-package and
   landing-page's shells describe theirs. */
export const metadata: Metadata = {
  title: 'B2B Lead Generation Has Retired | Intelligent AI Systems',
  description:
    'The standalone B2B AI CRM and lead acquisition platform is no longer offered. See our current website packages and services.',
  alternates: {
    canonical: 'https://intelligentaisystem.com/services',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
