export interface TemplateOption {
  id: string
  industry: string
  businessName: string
  demoUrl: string
  screenshot: string
  price: number
}

export interface HostingPlan {
  id: 'basic' | 'updates'
  label: string
  price: string
}

export const TEMPLATE_PRICE = 750
export const DEPOSIT_AMOUNT = 200

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
    screenshot: '/templates/construction.svg',
    price: TEMPLATE_PRICE,
  },
  {
    id: 'skincare',
    industry: 'Skincare',
    businessName: 'Lumière Skin Studio',
    demoUrl: 'https://demo1.intelligentaisystem.com',
    screenshot: '/templates/skincare.svg',
    price: TEMPLATE_PRICE,
  },
  {
    id: 'fitness',
    industry: 'Fitness',
    businessName: 'Forge Performance',
    demoUrl: 'https://demo2.intelligentaisystem.com',
    screenshot: '/templates/fitness.svg',
    price: TEMPLATE_PRICE,
  },
  {
    id: 'real-estate',
    industry: 'Real Estate',
    businessName: 'Prestige Property Group',
    demoUrl: 'https://demo3.intelligentaisystem.com',
    screenshot: '/templates/real-estate.svg',
    price: TEMPLATE_PRICE,
  },
  {
    id: 'hospitality',
    industry: 'Hospitality',
    businessName: 'The Anchor Kitchen & Bar',
    demoUrl: 'https://demo4.intelligentaisystem.com',
    screenshot: '/templates/hospitality.svg',
    price: TEMPLATE_PRICE,
  },
  {
    id: 'legal',
    industry: 'Legal',
    businessName: 'Meridian Legal & Advisory',
    demoUrl: 'https://demo5.intelligentaisystem.com',
    screenshot: '/templates/legal.svg',
    price: TEMPLATE_PRICE,
  },
]
