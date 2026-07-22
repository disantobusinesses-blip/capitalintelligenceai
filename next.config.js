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
  async redirects() {
    return [
      {
        source: '/blog/Best-Website-Designer-in-Essendon',
        destination: '/blog/best-website-designer-in-essendon',
        permanent: true,
      },
      {
        source: '/blog/Web-Design-strathmore-Essendon-pascoevale-melbourne',
        destination: '/blog/web-design-strathmore-essendon-pascoevale-melbourne',
        permanent: true,
      },
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
