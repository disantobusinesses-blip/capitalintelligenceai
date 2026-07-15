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
    ]
  },
}

module.exports = nextConfig
