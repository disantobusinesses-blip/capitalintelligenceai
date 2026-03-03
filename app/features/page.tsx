import type { Metadata } from 'next'
import { Check, MessageCircle, CalendarCheck, Mail, FileText, MapPin, Share2, Newspaper, Image, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Website Features & Add-Ons – Intelligent AI Systems',
  description: 'Explore all available website features and AI integrations. From 24/7 AI chat support and automated booking systems to contact forms, blog sections, and social media integration. See how each feature adds value to your business.',
  keywords: 'website features, AI chat support, automated booking, contact form, blog section, social media integration, customer reviews, newsletter signup, gallery portfolio, map location, website add-ons Australia',
  openGraph: {
    title: 'Website Features & Add-Ons – Intelligent AI Systems',
    description: 'Choose from AI-powered tools, free essentials, and premium add-ons to build the perfect website for your business.',
    url: 'https://intelligentaisystem.com/features',
    type: 'website',
  },
}

const features = [
  {
    name: '24/7 AI Chat Support',
    icon: MessageCircle,
    price: '$399/month',
    category: 'AI-Powered',
    description: 'An intelligent chatbot that handles customer enquiries around the clock, providing instant responses and routing complex issues to your team.',
    valuePoints: [
      'Increases customer support efficiency by handling up to 80% of common queries automatically',
      'Reduces response time from hours to seconds, improving customer satisfaction',
      'Available 24/7 including weekends and holidays — never miss a lead',
      'Learns from interactions to provide increasingly accurate answers over time',
      'Seamlessly escalates complex issues to human agents when needed',
    ],
    idealFor: 'Businesses receiving frequent customer enquiries who want to provide instant support without hiring additional staff.',
  },
  {
    name: 'AI Automated Booking System',
    icon: CalendarCheck,
    price: '$399 setup + $99/month',
    category: 'AI-Powered',
    description: 'A smart booking system that lets customers schedule appointments directly through your website, with automated confirmations and reminders.',
    valuePoints: [
      'Increases booking conversion rate by allowing customers to book instantly, 24/7',
      'Eliminates double-bookings with intelligent calendar synchronisation',
      'Sends automated email and SMS reminders, reducing no-shows by up to 40%',
      'Integrates with popular calendar platforms like Google Calendar and Outlook',
      'Provides analytics on booking patterns to help optimise your schedule',
    ],
    idealFor: 'Service-based businesses such as consultants, tradespeople, healthcare providers, and salons.',
  },
  {
    name: 'Automated AI Customer Replies',
    icon: Mail,
    price: 'Custom pricing',
    category: 'AI-Powered',
    description: 'AI-powered email response system that automatically drafts and sends personalised replies to customer enquiries based on your business context.',
    valuePoints: [
      'Increases customer acquisition and support by responding instantly to every enquiry',
      'Maintains consistent brand voice across all customer communications',
      'Reduces manual email workload by up to 70%, freeing staff for higher-value tasks',
      'Learns from your previous responses to improve accuracy over time',
      'Handles high volumes during peak periods without additional staffing',
    ],
    idealFor: 'Businesses that receive high volumes of customer emails and want to ensure fast, consistent responses.',
  },
  {
    name: 'Contact Form',
    icon: FileText,
    price: 'FREE',
    category: 'Essential',
    isFree: true,
    description: 'A professional contact form that captures visitor details and sends enquiries directly to your inbox, making it easy for potential customers to reach you.',
    valuePoints: [
      'Increases lead generation by providing a simple, low-friction way for visitors to get in touch',
      'Captures essential customer information for follow-up and CRM integration',
      'Includes spam protection to ensure only genuine enquiries reach your inbox',
      'Customisable fields to collect the specific information your business needs',
      'Mobile-optimised for easy submission on any device',
    ],
    idealFor: 'Every business — an essential feature for capturing enquiries and converting visitors into leads.',
  },
  {
    name: 'Map / Location',
    icon: MapPin,
    price: 'FREE',
    category: 'Essential',
    isFree: true,
    description: 'An embedded interactive map showing your business location, making it easy for local customers to find you.',
    valuePoints: [
      'Increases local visibility and helps customers find your physical location easily',
      'Boosts local SEO by signalling your geographic relevance to search engines',
      'Integrates with Google Maps for directions and navigation',
      'Builds trust by showing you are a real, established business',
      'Supports multiple locations for businesses with several offices or stores',
    ],
    idealFor: 'Any business with a physical location that serves local customers.',
  },
  {
    name: 'Social Media Integration',
    icon: Share2,
    price: 'FREE',
    category: 'Essential',
    isFree: true,
    description: 'Connect your website to your social media profiles, displaying feeds and making it easy for visitors to follow and share your content.',
    valuePoints: [
      'Increases brand awareness by connecting your web presence with social platforms',
      'Encourages visitors to follow your social channels, building your audience',
      'Displays live social feeds to keep your website content fresh and dynamic',
      'Enables easy content sharing to expand your reach organically',
      'Supports all major platforms including Instagram, Facebook, LinkedIn, and X',
    ],
    idealFor: 'Businesses actively using social media who want to cross-promote their online presence.',
  },
  {
    name: 'Blog / News Section',
    icon: Newspaper,
    price: '+$199 AUD',
    category: 'Growth',
    seoBoost: true,
    description: 'A professionally designed blog section where you can publish articles, news updates, and industry insights to attract organic traffic.',
    valuePoints: [
      'Boosts Google ranking by providing fresh, keyword-rich content that search engines love',
      'Establishes your business as an authority in your industry',
      'Drives organic traffic — businesses with blogs generate 55% more website visitors',
      'Provides shareable content for social media marketing',
      'Supports long-tail keyword strategy for capturing niche search traffic',
    ],
    idealFor: 'Businesses looking to improve their SEO and establish thought leadership in their industry.',
  },
  {
    name: 'Gallery / Portfolio',
    icon: Image,
    price: '$99 setup',
    category: 'Growth',
    description: 'A visually stunning gallery or portfolio section to showcase your work, products, or completed projects.',
    valuePoints: [
      'Increases visitor engagement by providing visual proof of your work quality',
      'Builds credibility by showcasing completed projects and satisfied clients',
      'Supports high-resolution images with optimised loading for fast performance',
      'Filterable categories to help visitors find relevant examples quickly',
      'Mobile-responsive grid layout that looks great on all devices',
    ],
    idealFor: 'Creative professionals, tradespeople, photographers, and any business that can benefit from visual showcases.',
  },
  {
    name: 'Customer Reviews',
    icon: Star,
    price: '+$99 AUD',
    category: 'Growth',
    seoBoost: true,
    description: 'Display verified customer testimonials and reviews on your website to build trust and social proof.',
    valuePoints: [
      'Increases trust and conversions — 93% of consumers say reviews influence their decisions',
      'Boosts Google ranking through review schema markup and fresh user-generated content',
      'Provides social proof that reduces hesitation and encourages action',
      'Integrates with Google Reviews and other platforms for automatic updates',
      'Customisable display options to highlight your best testimonials',
    ],
    idealFor: 'Service-based businesses and e-commerce stores looking to build trust with new visitors.',
  },
  {
    name: 'Newsletter Signup',
    icon: Mail,
    price: '$199 setup',
    category: 'Growth',
    description: 'A newsletter subscription form to build your email list and keep customers engaged with regular updates.',
    valuePoints: [
      'Increases repeat visitors by keeping your business top-of-mind with regular emails',
      'Builds a direct marketing channel you own, independent of social media algorithms',
      'Integrates with popular email platforms like Mailchimp, ConvertKit, and SendGrid',
      'Supports automated welcome sequences to nurture new subscribers',
      'Includes analytics to track signups and engagement rates',
    ],
    idealFor: 'Businesses wanting to build long-term customer relationships through email marketing.',
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-tech-baby-blue rounded-full blur-3xl opacity-10" />
        <div className="max-w-4xl mx-auto relative">
          <h1 className="text-5xl md:text-6xl font-bold text-tech-white mb-6">
            Website Features & Add-Ons
          </h1>
          <p className="text-xl text-tech-platinum max-w-2xl mx-auto mb-4">
            Choose from AI-powered tools, free essentials, and premium add-ons to build the perfect website for your business.
          </p>
          <p className="text-tech-baby-blue font-semibold">
            All features available during our onboarding process (Step 4 of 6)
          </p>
        </div>
      </section>

      {/* Category Legend */}
      <section className="px-6 pb-8">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-tech-gray border border-tech-baby-blue/20 rounded-full text-sm">
            <div className="w-3 h-3 bg-tech-baby-blue rounded-full" />
            <span className="text-tech-white">AI-Powered</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-tech-gray border border-tech-baby-blue/20 rounded-full text-sm">
            <div className="w-3 h-3 bg-tech-baby-blue rounded-full" />
            <span className="text-tech-white">Essential (FREE)</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-tech-gray border border-tech-baby-blue/20 rounded-full text-sm">
            <div className="w-3 h-3 bg-tech-baby-blue rounded-full" />
            <span className="text-tech-white">Growth Add-Ons</span>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-tech-gray border border-tech-baby-blue/20 rounded-2xl p-8 smooth-transition hover:border-tech-baby-blue hover:shadow-glow-sm"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left: Icon & Name */}
                  <div className="md:w-64 flex-shrink-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-blue rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-tech-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-tech-white">{feature.name}</h3>
                        <span className="text-tech-baby-blue font-semibold text-sm">{feature.price}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-3 py-1 bg-tech-baby-blue/10 border border-tech-baby-blue/30 text-tech-baby-blue rounded-full font-semibold">
                        {feature.category}
                      </span>
                      {feature.seoBoost && (
                        <span className="text-xs px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full font-semibold flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          SEO Boost
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Description & Value */}
                  <div className="flex-1">
                    <p className="text-tech-platinum mb-4 leading-relaxed">{feature.description}</p>
                    
                    <h4 className="text-sm font-bold text-tech-white mb-3">How It Provides Value:</h4>
                    <ul className="space-y-2 mb-4">
                      {feature.valuePoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-tech-baby-blue flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-tech-platinum">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-tech-black/50 border border-tech-baby-blue/10 rounded-lg p-3">
                      <p className="text-xs text-tech-platinum">
                        <span className="text-tech-baby-blue font-semibold">Ideal for: </span>
                        {feature.idealFor}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-tech-white mb-4">Ready to Build Your Website?</h2>
          <p className="text-tech-platinum mb-2">
            Select your features during our simple 6-step onboarding process.
          </p>
          <p className="text-sm text-tech-white italic mb-8">
            Select multiple paid options for a discount upon quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-tech-baby-blue text-tech-black rounded-lg font-semibold text-lg smooth-transition hover:bg-tech-baby-blue-light hover:shadow-glow"
            >
              Get Started
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 border-2 border-tech-baby-blue text-tech-baby-blue rounded-lg font-semibold text-lg smooth-transition hover:bg-tech-baby-blue hover:text-tech-black"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
