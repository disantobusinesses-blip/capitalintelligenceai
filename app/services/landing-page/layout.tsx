import type { Metadata } from 'next'

/* Mirrors app/pricing/layout.tsx: a metadata shell for a URL that permanently
   redirects (see next.config.js). The standalone Landing Page offering now
   lives as the Foundation tier on /services (1-3 pages, from $1,999), so the
   title below points at where that content actually went rather than
   duplicating /services' own title. */
export const metadata: Metadata = {
  title: 'Landing Pages, Now the Foundation Package | Intelligent AI Systems',
  description:
    'Our landing page offering is now the Foundation package on the services page: a 1 to 3 page mobile-responsive build from $1,999, compared against Growth and Bespoke.',
  alternates: {
    canonical: 'https://intelligentaisystem.com/services',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
