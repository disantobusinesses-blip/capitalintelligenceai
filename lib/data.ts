export const tiers = [
  {
    id: 'tier1',
    name: 'Landing Page Website',
    price: '$2,300 AUD',
    description: 'Perfect for businesses that need a professional online presence',
    features: [
      'Single-page professional website',
      'Mobile responsive design',
      'Contact form integration',
      'SEO basics included',
      '1 round of revisions',
      'Fast delivery (1-2 weeks)',
    ],
  },
  {
    id: 'tier2',
    name: 'AI Integrated Website',
    price: 'from $3,300 AUD',
    description: 'Advanced website with AI capabilities and smart features',
    features: [
      'Everything in Tier 1',
      'AI chatbot integration',
      'Smart lead capture',
      'Advanced SEO optimization',
      'Multi-page support',
      'Add-on modules available',
      '2 rounds of revisions',
    ],
    highlighted: true,
  },
];

export const addOns = [
  { id: 'ai-chatbot', name: 'AI Chatbot', price: '+$400', icon: '💬' },
  { id: 'email-capture', name: 'Email Capture', price: '+$200', icon: '✉️' },
  { id: 'booking-form', name: 'Booking System', price: '+$350', icon: '📅' },
  { id: 'maps', name: 'Maps Integration', price: '+$150', icon: '🗺️' },
  { id: 'extra-pages', name: 'Extra Pages', price: '+$250/page', icon: '📄' },
  { id: 'gallery', name: 'Photo Gallery', price: '+$200', icon: '🖼️' },
  { id: 'seo-suburbs', name: 'SEO Suburbs', price: '+$300', icon: '📍' },
  { id: 'testimonials', name: 'Testimonials', price: '+$150', icon: '⭐' },
  { id: 'social-links', name: 'Social Links', price: '+$100', icon: '🔗' },
  { id: 'video-section', name: 'Video Section', price: '+$250', icon: '🎥' },
];

export const projects = [
  {
    id: 1,
    name: 'Melbourne Dental Care',
    tier: 'Tier 2',
    description: 'Premium dental clinic website with AI booking assistant',
    url: 'https://example.com',
    image: '/placeholder-1.jpg',
  },
  {
    id: 2,
    name: 'Sydney Law Partners',
    tier: 'Tier 2',
    description: 'Professional law firm website with intelligent lead capture',
    url: 'https://example.com',
    image: '/placeholder-2.jpg',
  },
  {
    id: 3,
    name: 'Brisbane Fitness Studio',
    tier: 'Tier 1',
    description: 'Clean, modern landing page for boutique gym',
    url: 'https://example.com',
    image: '/placeholder-3.jpg',
  },
  {
    id: 4,
    name: 'Perth Real Estate',
    tier: 'Tier 2',
    description: 'Property showcase with AI-powered property search',
    url: 'https://example.com',
    image: '/placeholder-4.jpg',
  },
  {
    id: 5,
    name: 'Adelaide Cafe Co.',
    tier: 'Tier 1',
    description: 'Elegant single-page site for artisan cafe',
    url: 'https://example.com',
    image: '/placeholder-5.jpg',
  },
  {
    id: 6,
    name: 'Gold Coast Spa',
    tier: 'Tier 2',
    description: 'Luxury spa website with online booking integration',
    url: 'https://example.com',
    image: '/placeholder-6.jpg',
  },
];

export const features = [
  {
    id: 'ai-chat',
    title: 'AI Chat Widget',
    description: 'Intelligent chatbot that engages visitors 24/7, answers questions, and captures leads automatically.',
    benefit: 'Convert more visitors into customers',
  },
  {
    id: 'email-capture',
    title: 'Smart Lead Forms',
    description: 'Beautiful, conversion-optimized forms that integrate with your CRM and email marketing tools.',
    benefit: 'Grow your email list effortlessly',
  },
  {
    id: 'cta-blocks',
    title: 'High-Converting CTAs',
    description: 'Strategically placed call-to-action blocks designed to drive engagement and conversions.',
    benefit: 'Maximize conversion rates',
  },
  {
    id: 'booking',
    title: 'Booking System',
    description: 'Integrated scheduling system that lets customers book appointments directly from your site.',
    benefit: 'Automate appointment scheduling',
  },
  {
    id: 'maps',
    title: 'Service Area Maps',
    description: 'Interactive maps showcasing your service areas, locations, and coverage zones.',
    benefit: 'Show customers where you operate',
  },
  {
    id: 'gallery',
    title: 'Photo Galleries',
    description: 'Stunning, responsive image galleries that showcase your work in the best light.',
    benefit: 'Impress with visual storytelling',
  },
  {
    id: 'testimonials',
    title: 'Testimonials Carousel',
    description: 'Dynamic testimonial displays that build trust and social proof with your audience.',
    benefit: 'Build credibility and trust',
  },
  {
    id: 'seo',
    title: 'Fast SEO Layout',
    description: 'Optimized page structure, meta tags, and performance tuning for maximum search visibility.',
    benefit: 'Rank higher on Google',
  },
];

export const styles = [
  { id: 'modern', name: 'Modern', description: 'Clean, minimal with bold typography' },
  { id: 'luxury', name: 'Luxury', description: 'Elegant, sophisticated, premium' },
  { id: 'bold', name: 'Bold', description: 'High contrast, strong presence' },
  { id: 'minimal', name: 'Minimal', description: 'Simple, focused, spacious' },
];

export const colorPalettes = [
  { id: 'ocean', name: 'Ocean', colors: ['#1e3a8a', '#3b82f6', '#60a5fa', '#dbeafe'] },
  { id: 'forest', name: 'Forest', colors: ['#14532d', '#16a34a', '#4ade80', '#dcfce7'] },
  { id: 'sunset', name: 'Sunset', colors: ['#7c2d12', '#ea580c', '#fb923c', '#fed7aa'] },
  { id: 'royal', name: 'Royal', colors: ['#4c1d95', '#7c3aed', '#a78bfa', '#ede9fe'] },
  { id: 'rose', name: 'Rose', colors: ['#881337', '#e11d48', '#fb7185', '#fecdd3'] },
  { id: 'amber', name: 'Amber', colors: ['#78350f', '#f59e0b', '#fbbf24', '#fef3c7'] },
];
