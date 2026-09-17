import type { Metadata } from 'next'

/* Client component, so its metadata lives here. Previously it inherited the
   root layout's title and description verbatim.

   Noindex because this is a post-purchase confirmation page: it is only
   meaningful immediately after checkout, and indexing it would put a dead-end
   page into search results. */
export const metadata: Metadata = {
  title: 'Order Confirmed | Intelligent AI Systems',
  description:
    'Your purchase is confirmed. Here is what happens next on your website build, and how to get in touch with the team in the meantime.',
  alternates: {
    canonical: 'https://intelligentaisystem.com/thank-you',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
