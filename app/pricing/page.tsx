'use client';

import Link from 'next/link';
import SectionReveal from '@/components/section-reveal';
import TierCard from '@/components/tier-card';
import { tiers, addOns } from '@/lib/data';

export default function PricingPage() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the perfect tier for your business. No hidden fees, no surprises.
            </p>
          </div>
        </SectionReveal>

        {/* Tier Comparison */}
        <div className="mb-24">
          <SectionReveal delay={0.2}>
            <h2 className="text-3xl font-bold text-center mb-12">Our Tiers</h2>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, index) => (
              <SectionReveal key={tier.id} delay={0.1 * (index + 1)}>
                <TierCard tier={tier} />
              </SectionReveal>
            ))}
          </div>
        </div>

        {/* Add-ons Section */}
        <div className="mb-24">
          <SectionReveal>
            <h2 className="text-3xl font-bold text-center mb-4">Add-on Modules</h2>
            <p className="text-center text-muted-foreground mb-12">
              Enhance your website with additional features
            </p>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {addOns.map((addon, index) => (
              <SectionReveal key={addon.id} delay={0.05 * (index + 1)}>
                <div className="p-6 rounded-xl border border-border bg-card hover:border-accent/50 transition-all group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl group-hover:scale-110 transition-transform">
                      {addon.icon}
                    </div>
                    <div className="text-accent font-bold">{addon.price}</div>
                  </div>
                  <h3 className="font-semibold mb-2">{addon.name}</h3>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <SectionReveal delay={0.4}>
          <div className="max-w-4xl mx-auto mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">Feature Comparison</h2>
            
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold">Tier 1</th>
                    <th className="text-center p-4 font-semibold bg-accent/10">Tier 2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-4">Mobile Responsive</td>
                    <td className="text-center p-4">✓</td>
                    <td className="text-center p-4 bg-accent/5">✓</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Contact Form</td>
                    <td className="text-center p-4">✓</td>
                    <td className="text-center p-4 bg-accent/5">✓</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">SEO Basics</td>
                    <td className="text-center p-4">✓</td>
                    <td className="text-center p-4 bg-accent/5">Advanced</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Multi-page Support</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4 bg-accent/5">✓</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">AI Chatbot</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4 bg-accent/5">✓</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Smart Lead Capture</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4 bg-accent/5">✓</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Add-on Modules</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4 bg-accent/5">✓</td>
                  </tr>
                  <tr>
                    <td className="p-4">Revisions</td>
                    <td className="text-center p-4">1 round</td>
                    <td className="text-center p-4 bg-accent/5">2 rounds</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </SectionReveal>

        {/* CTA */}
        <SectionReveal delay={0.5}>
          <div className="text-center bg-gradient-to-br from-accent/10 to-primary/5 rounded-2xl p-12 border border-accent/20">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose your tier and complete our intake form to begin your project
            </p>
            <Link
              href="/get-started"
              className="inline-flex items-center px-10 py-4 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-all hover:scale-105 glow-effect"
            >
              Start Your Project
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
