export interface TemplateTier {
  id: 'basic' | 'premium'
  label: string
  price: number
  demoUrl: string
  /** What's included with this tier, shown as bullet points on the card. */
  included?: string[]
  /** Add-ons disclaimer shown as a hover/tap tooltip on the card. */
  tooltip?: string
}

export interface TemplateOption {
  id: string
  industry: string
  businessName: string
  demoUrl: string
  screenshot: string
  /** When present, the preview is rendered as a split half-and-half of these images. */
  screenshots?: string[]
  price: number
  /** When present, the template offers multiple build tiers (e.g. Basic / Premium). */
  tiers?: TemplateTier[]
  /** What's included with this template, shown as bullet points on the card. */
  included?: string[]
  /** Add-ons disclaimer shown as a hover/tap tooltip on the card. */
  tooltip?: string
}

export const GST_NOTE = '+GST'

export interface HostingPlan {
  id: 'basic' | 'updates'
  label: string
  price: string
}

export const TEMPLATE_PRICE = 850
export const TEMPLATE_PREMIUM_PRICE = 1750

export const GLOBAL_ADDONS_DISCLAIMER =
  'All template prices are + GST and include design, development, and hosting setup only. Clients are responsible for supplying their own logo, photos, written content, and any third-party account credentials (Fresha, OpenTable, Stripe). We connect and embed — we do not create or manage third-party accounts on your behalf. Need something custom? Contact us for a tailored quote.'

const STANDARD_TOOLTIP =
  'Price includes design and development only. Client must supply their own logo, photos, and written content. We do not design logos, create content, or set up third-party accounts.'

const FRESHA_TOOLTIP =
  'Fresha linking requires client to have an active Fresha account. We link to it — we do not create or manage your Fresha account. Client must supply logo, photos, and content.'
export const DEPOSIT_AMOUNT = 200
export const CUSTOM_SITE_FROM_PRICE = 1999

export const CUSTOM_BUDGET_OPTIONS = [
  '$1,999–$2,999',
  '$3,000–$3,999',
  '$4,000–$4,999',
  '$5,000–$5,999',
] as const

export type CustomBudget = (typeof CUSTOM_BUDGET_OPTIONS)[number]

export const HOSTING_PLANS: HostingPlan[] = [
  { id: 'basic', label: 'Hosting Only', price: '$59/mo' },
  { id: 'updates', label: 'Hosting + Updates', price: '$99/mo' },
]

export const TEMPLATES: TemplateOption[] = [
  {
    id: 'construction',
    industry: 'Construction & Trades',
    businessName: 'Apex Built Co',
    demoUrl: 'https://demo.intelligentaisystem.com',
    screenshot: '/templates/apex-basic.jpeg',
    screenshots: ['/templates/apex-basic.jpeg', '/templates/apex-premium.jpeg'],
    price: TEMPLATE_PRICE,
    tooltip: STANDARD_TOOLTIP,
    tiers: [
      {
        id: 'basic',
        label: 'Basic',
        price: TEMPLATE_PRICE,
        demoUrl: 'https://demo.intelligentaisystem.com',
        included: [
          'Custom landing page design',
          'Mobile responsive',
          'SEO optimised',
          'Enquire Now button wired to contact form',
          'Custom domain connection',
          'Hosting setup',
        ],
        tooltip: STANDARD_TOOLTIP,
      },
      {
        id: 'premium',
        label: 'Premium Cinematic Scroll',
        price: TEMPLATE_PREMIUM_PRICE,
        demoUrl: 'https://demo1.intelligentaisystem.com',
        included: [
          'Everything in Basic',
          'Cinematic scroll animations',
          'Book a Meeting button wired to consultation booking',
          'Premium immersive layout',
        ],
        tooltip: STANDARD_TOOLTIP,
      },
    ],
  },
  {
    id: 'skincare',
    industry: 'Skincare & Beauty',
    businessName: 'Lumière Skin Studio',
    demoUrl: 'https://demo2.intelligentaisystem.com',
    screenshot: '/templates/skincare.png',
    price: 950,
    included: [
      'Custom landing page design',
      'Mobile responsive',
      'SEO optimised',
      "Fresha booking button linked to client's existing Fresha profile",
      'Custom domain connection',
      'Hosting setup',
    ],
    tooltip: FRESHA_TOOLTIP,
  },
  {
    id: 'fitness',
    industry: 'Fitness & Personal Training',
    businessName: 'Forge Performance',
    demoUrl: 'https://demo3.intelligentaisystem.com',
    screenshot: '/templates/fitness.png',
    price: 850,
    included: [
      'Custom landing page design',
      'Mobile responsive',
      'SEO optimised',
      "Fresha booking button linked to client's existing Fresha profile",
      'Custom domain connection',
      'Hosting setup',
    ],
    tooltip: FRESHA_TOOLTIP,
  },
  {
    id: 'hospitality',
    industry: 'Hospitality & Restaurants',
    businessName: 'The Anchor Kitchen & Bar',
    demoUrl: 'https://demo4.intelligentaisystem.com',
    screenshot: '/templates/hospitality.png',
    price: 1350,
    included: [
      'Custom landing page design',
      'Mobile responsive',
      'SEO optimised',
      'Menu PDF embedded on site (client supplies PDF)',
      "OpenTable or Google Reserve booking button linked to client's existing account",
      'Custom domain connection',
      'Hosting setup',
    ],
    tooltip:
      'Menu PDF must be supplied by client in PDF format. We do not design menus. Booking system linking requires client to have an existing OpenTable or Google Reserve account. Client must supply logo, photos, and content.',
  },
  {
    id: 'legal',
    industry: 'Legal & Accounting',
    businessName: 'Meridian Legal & Advisory',
    demoUrl: 'https://demo5.intelligentaisystem.com',
    screenshot: '/templates/legal.png',
    price: 1350,
    included: [
      'Custom landing page design',
      'Mobile responsive',
      'SEO optimised',
      'Enquire Now button wired to contact form',
      'Phone call CTA button',
      'Schedule a Meeting button wired to consultation booking',
      'Custom domain connection',
      'Hosting setup',
    ],
    tooltip: STANDARD_TOOLTIP,
  },
]
