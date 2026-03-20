'use client'

import { useState } from 'react'
import { CheckCircle, Send } from 'lucide-react'

const HERO_HEADLINE = 'Get Found on Google. Get Recommended by AI.'

const trustBadges = [
  'First SEO Blog Free',
  'No Lock-In Contracts',
  'Split Payments Available',
  '90-Day Ranking Guarantee',
]

export default function Hero() {
  const [name, setName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [phone, setPhone] = useState('')
  const [quoteEmail, setQuoteEmail] = useState('')
  const [message, setMessage] = useState('')
  const [quoteStatus, setQuoteStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [quoteError, setQuoteError] = useState('')

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quoteEmail.trim() || !message.trim()) return

    setQuoteStatus('submitting')
    setQuoteError('')

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: null,
          businessName: businessName || 'Quick Quote Request',
          industry: '',
          description: message,
          designStyle: '',
          colorPreference: '',
          features: [],
          monthlyPlan: '',
          aiAutomationRequest: '',
          contactName: name || 'Quick Quote',
          contactEmail: quoteEmail,
          contactPhone: phone,
          hasLogo: false,
          additionalNotes: message,
        }),
      })
      const result = await response.json()
      if (response.ok && result.ok) {
        setQuoteStatus('success')
        setName('')
        setBusinessName('')
        setPhone('')
        setQuoteEmail('')
        setMessage('')
      } else {
        setQuoteStatus('error')
        setQuoteError(result.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setQuoteStatus('error')
      setQuoteError('Something went wrong. Please try again.')
    }
  }

  return (
    <section
      id="quote"
      className="bg-[#F8F7F4] pt-[100px] pb-[80px] px-6 mt-[68px]"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-[60%_40%] gap-12 items-start">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Label */}
            <p className="text-[#5C3D2E] text-[13px] font-semibold tracking-[1.5px] uppercase">
              Melbourne&apos;s AI-Powered Web Agency
            </p>

            {/* Headline */}
            <h1 className="text-[36px] md:text-[52px] leading-[1.15] font-extrabold text-[#1A1A1A]">
              {HERO_HEADLINE}
            </h1>

            {/* Subheadline */}
            <p className="text-[18px] text-[#6B6560] mt-4 max-w-[520px]">
              We build websites that rank on Google and get recommended by AI assistants like ChatGPT and Gemini, using SEO and GEO (Generative Engine Optimisation) to grow your business from every direction.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#quote"
                className="bg-[#1A1A1A] text-white font-semibold px-6 py-3 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200 inline-block"
              >
                Get a Free Quote
              </a>
              <a
                href="#our-work"
                className="border-2 border-[#1A1A1A] text-[#1A1A1A] font-semibold px-6 py-3 rounded-[6px] hover:bg-[#1A1A1A] hover:text-white transition-all duration-200 inline-block"
              >
                View Our Work
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-2">
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[13px] text-[#6B6560]">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Quote Form */}
          <div
            className="bg-white rounded-[12px] p-8"
            style={{ border: '1px solid #E8E4DF', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
          >
            {quoteStatus === 'success' ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <CheckCircle className="w-10 h-10 text-green-500" />
                <p className="text-[#1A1A1A] font-bold text-xl text-center">Quote request received!</p>
                <p className="text-[#6B6560] text-sm text-center">We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div>
                  <p className="text-[#1A1A1A] font-bold text-lg mb-1">Get My Free Quote</p>
                  <p className="text-[#6B6560] text-sm">We Respond Within 1 Hour</p>
                </div>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200 text-sm"
                />
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Business Name"
                  className="w-full px-4 py-3 border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200 text-sm"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200 text-sm"
                />
                <input
                  type="email"
                  value={quoteEmail}
                  onChange={(e) => setQuoteEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200 text-sm"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your business and what you need..."
                  rows={3}
                  required
                  className="w-full px-4 py-3 border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200 resize-none text-sm"
                />

                <button
                  type="submit"
                  disabled={quoteStatus === 'submitting'}
                  className="w-full bg-[#1A1A1A] text-white font-semibold py-3 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {quoteStatus === 'submitting' ? 'Sending…' : (
                    <>Get My Free Quote: We Respond Within 1 Hour <Send className="w-4 h-4" /></>
                  )}
                </button>

                {quoteStatus === 'error' && (
                  <p className="text-red-500 text-xs">{quoteError}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
