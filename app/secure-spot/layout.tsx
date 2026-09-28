import type { Metadata } from 'next'

/* The page itself is a client component, so its metadata lives here.
   Without this it inherited the root layout's title and description, which is
   what made the homepage title appear on three separate URLs.

   Noindex is deliberate: this is a post-enquiry funnel step reached from the
   quote panel, not a page anyone should land on from search. */
export const metadata: Metadata = {
  title: 'Secure Your Build Slot | Intelligent AI Systems',
  description:
    'Confirm your website build slot with a deposit. Your enquiry details are already saved, this step only reserves your place in the build queue.',
  alternates: {
    canonical: 'https://intelligentaisystem.com/secure-spot',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
