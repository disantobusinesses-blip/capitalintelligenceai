export interface TemplateTier {
  id: 'basic' | 'premium'
  label: string
  price: number
  demoUrl: string
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
}

export const GST_NOTE = '+GST'

export interface HostingPlan {
  id: 'basic' | 'updates'
  label: string
  price: string
}

export const TEMPLATE_PRICE = 750
export const TEMPLATE_PREMIUM_PRICE = 1750
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
    industry: 'Construction',
    businessName: 'Apex Built Co',
    demoUrl: 'https://demo.intelligentaisystem.com',
    screenshot: '/templates/apex-basic.jpeg',
    screenshots: ['/templates/apex-basic.jpeg', '/templates/apex-premium.jpeg'],
    price: TEMPLATE_PRICE,
    tiers: [
      {
        id: 'basic',
        label: 'Basic',
        price: TEMPLATE_PRICE,
        demoUrl: 'https://demo.intelligentaisystem.com',
      },
      {
        id: 'premium',
        label: 'Premium Cinematic Scroll',
        price: TEMPLATE_PREMIUM_PRICE,
        demoUrl: 'https://demo1.intelligentaisystem.com',
      },
    ],
  },
  {
    id: 'skincare',
    industry: 'Skincare',
    businessName: 'Lumière Skin Studio',
    demoUrl: 'https://demo2.intelligentaisystem.com',
    screenshot: '/templates/skincare.png',
    price: TEMPLATE_PRICE,
  },
  {
    id: 'fitness',
    industry: 'Fitness',
    businessName: 'Forge Performance',
    demoUrl: 'https://demo3.intelligentaisystem.com',
    screenshot: '/templates/fitness.png',
    price: TEMPLATE_PRICE,
  },
  {
    id: 'hospitality',
    industry: 'Hospitality',
    businessName: 'The Anchor Kitchen & Bar',
    demoUrl: 'https://demo4.intelligentaisystem.com',
    screenshot: '/templates/hospitality.png',
    price: TEMPLATE_PRICE,
  },
  {
    id: 'legal',
    industry: 'Legal',
    businessName: 'Meridian Legal & Advisory',
    demoUrl: 'https://demo5.intelligentaisystem.com',
    screenshot: '/templates/legal.png',
    price: TEMPLATE_PRICE,
  },
]
