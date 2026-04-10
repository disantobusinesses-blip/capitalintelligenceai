import type { Metadata } from 'next'
import { Check, MessageCircle, Mail, FileText, MapPin, Share2, TrendingUp, ArrowRight } from 'lucide-react'
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
    price: '$799 setup + custom/month',
    category: 'AI-Powered',
    blogLink: '/blog/ai-chatbots-automation-more-leads',
    description: 'An intelligent chatbot that handles customer enquiries around the clock, providing instant responses and routing complex issues to your team.',
    valuePoints: [
      'Increases customer support efficiency by handling up to 80% of common queries automatically',
      'Reduces response time from hours to seconds, improving customer satisfaction',
      'Available 24/7 including weekends and holidays, so you never miss a lead',
      'Learns from interactions to provide increasingly accurate answers over time',
      'Seamlessly escalates complex issues to human agents when needed',
    ],
    idealFor: 'Businesses receiving frequent customer enquiries who want to provide instant support without hiring additional staff.',
  },
  {
    name: 'Automated AI Customer Replies',
    icon: Mail,
    price: 'Custom pricing',
    category: 'AI-Powered',
    blogLink: '/blog/ai-chatbots-automation-more-leads',
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
    blogLink: '/blog/ai-chatbots-automation-more-leads',
    description: 'A professional contact form that captures visitor details and sends enquiries directly to your inbox, making it easy for potential customers to reach you.',
    valuePoints: [
      'Increases lead generation by providing a simple, low-friction way for visitors to get in touch',
      'Captures essential customer information for follow-up and CRM integration',
      'Includes spam protection to ensure only genuine enquiries reach your inbox',
      'Customisable fields to collect the specific information your business needs',
      'Mobile-optimised for easy submission on any device',
    ],
    idealFor: 'Every business: an essential feature for capturing enquiries and converting visitors into leads.',
  },
  {
    name: 'Map / Location',
    icon: MapPin,
    price: 'FREE',
    category: 'Essential',
    isFree: true,
    blogLink: '/blog/how-ai-improves-local-seo-google-business-profile',
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
    blogLink: '/blog/social-media-integration-website-benefits',
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
    name: 'Newsletter Signup',
    icon: Mail,
    price: '$599 setup',
    category: 'Growth',
    blogLink: '/blog/newsletter-signup-email-marketing-benefits',
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
    <div className="min-h-[100dvh] bg-[#F8F7F4] pb-24">
      {/* Hero */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-6">
            Website Features & Add-Ons
          </h1>
          <p className="text-xl text-[#6B6560] max-w-2xl mx-auto mb-4">
            Choose from AI-powered tools, free essentials, and premium add-ons to build the perfect website for your business.
          </p>
          <p className="text-[#1A1A1A] font-semibold">
            All features available during our onboarding process (Step 4 of 6)
          </p>
        </div>
      </section>

      {/* Category Legend */}
      <section className="px-6 pb-8">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E8E4DF] rounded-full text-sm">
            <div className="w-3 h-3 bg-[#5C3D2E] rounded-full" />
            <span className="text-[#1A1A1A]">AI-Powered</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E8E4DF] rounded-full text-sm">
            <div className="w-3 h-3 bg-[#5C3D2E] rounded-full" />
            <span className="text-[#1A1A1A]">Essential (FREE)</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E8E4DF] rounded-full text-sm">
            <div className="w-3 h-3 bg-[#5C3D2E] rounded-full" />
            <span className="text-[#1A1A1A]">Growth Add-Ons</span>
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
                className="bg-white border border-[#E8E4DF] rounded-[10px] p-8 smooth-transition hover:border-[#5C3D2E] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left: Icon & Name */}
                  <div className="md:w-64 flex-shrink-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-[#F8F7F4] rounded-[6px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#1A1A1A]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#1A1A1A]">{feature.name}</h3>
                        <span className="text-[#1A1A1A] font-semibold text-sm">{feature.price}</span>
                        {feature.priceNote && (
                          <p className="text-green-400 text-xs font-semibold mt-0.5">{feature.priceNote}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-xs px-3 py-1 bg-[#F8F7F4] border border-[#E8E4DF] text-[#1A1A1A] rounded-full font-semibold">
                        {feature.category}
                      </span>
                      {feature.seoBoost && (
                        <span className="text-xs px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full font-semibold flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          SEO Boost
                        </span>
                      )}
                      {feature.comingSoon && (
                        <span className="text-xs px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-full font-semibold">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Description & Value */}
                  <div className="flex-1">
                    <p className="text-[#6B6560] mb-4 leading-relaxed">{feature.description}</p>
                    
                    <h4 className="text-sm font-bold text-[#1A1A1A] mb-3">How It Provides Value:</h4>
                    <ul className="space-y-2 mb-4">
                      {feature.valuePoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#1A1A1A] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#6B6560]">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-[#F8F7F4] border border-[#E8E4DF] rounded-[6px] p-3 mb-4">
                      <p className="text-xs text-[#6B6560]">
                        <span className="text-[#1A1A1A] font-semibold">Ideal for: </span>
                        {feature.idealFor}
                      </p>
                    </div>

                    {feature.blogLink && (
                      <Link
                        href={feature.blogLink}
                        className="inline-flex items-center gap-1.5 text-[#5C3D2E] text-sm font-semibold hover:text-[#5C3D2E] smooth-transition group"
                      >
                        Read our blog on this feature
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    )}
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
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Ready to Build Your Website?</h2>
          <p className="text-[#6B6560] mb-2">
            Select your features during our simple 6-step onboarding process.
          </p>
          <p className="text-sm text-[#1A1A1A] italic mb-8">
            Select multiple paid options for a discount upon quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-[#1A1A1A] text-white rounded-[6px] font-semibold text-lg smooth-transition hover:bg-[#2D2D2D] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              Get Started
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 border-2 border-[#1A1A1A] text-[#1A1A1A] rounded-[6px] font-semibold text-lg smooth-transition hover:bg-[#1A1A1A] hover:text-white"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
