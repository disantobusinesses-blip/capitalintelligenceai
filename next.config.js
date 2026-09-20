/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
  /* Static assets under /public shipped with no Cache-Control at all, so every
     visit refetched them. Next already fingerprints and caches its own
     /_next/static output, this covers the files we serve directly.

     Images get a month with stale-while-revalidate rather than `immutable`:
     they are replaced in place under the same filename (swapping a portfolio
     screenshot, say), and immutable would strand visitors on the old bytes for
     the full year. Fonts genuinely never change under a given name, so those
     take the long immutable cache. */
  async headers() {
    return [
      {
        source: '/:path*.(png|jpg|jpeg|gif|svg|webp|avif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/:path*.(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // Legacy mixed-case blog slugs moved to middleware.ts: Next's
      // path-to-regexp source matching is case-insensitive, so a rule here
      // written against the uppercase slug also matches the lowercase
      // destination and redirects it to itself, an infinite loop. Middleware
      // does a plain string comparison instead, which can't match its own
      // output.
      {
        source: '/pricing',
        destination: '/services',
        permanent: true,
      },
      {
        // The "Browse Styles" template gallery on /projects has since been
        // removed too (folded into the per-package #foundation/#growth/#bespoke
        // examples), so this now lands on /projects generally.
        source: '/templates',
        destination: '/projects',
        permanent: true,
      },
      {
        // Standalone Landing Page / Full Package pages were removed, the
        // Foundation/Growth/Bespoke package cards on /services replace them.
        source: '/services/landing-page',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/services/full-package',
        destination: '/services',
        permanent: true,
      },
      {
        // B2B Lead Generation is no longer an offered service. Its detail page
        // and the /services#b2b panel are both gone, so existing search traffic
        // and external links land on the current service list instead of a 404.
        source: '/services/b2b-crm-ai-platform',
        destination: '/services',
        permanent: true,
      },
      {
        // The /launch multi-step funnel is retired. Its role (browsing package
        // examples and starting a build) is now covered by /services directly.
        source: '/launch/:path*',
        destination: '/services',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
