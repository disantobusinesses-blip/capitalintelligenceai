'use client'

import { useState } from 'react'
import { ArrowRight, Zap, Send, CheckCircle } from 'lucide-react'

export default function Hero() {
  const [quoteEmail, setQuoteEmail] = useState('')
  const [quoteDescription, setQuoteDescription] = useState('')
  const [quoteStatus, setQuoteStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [quoteError, setQuoteError] = useState('')

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quoteEmail.trim() || !quoteDescription.trim()) return

    setQuoteStatus('submitting')
    setQuoteError('')

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: null,
          businessName: 'Quick Quote Request',
          industry: '',
          description: quoteDescription,
          designStyle: '',
          colorPreference: '',
          features: [],
          monthlyPlan: '',
          aiAutomationRequest: '',
          contactName: 'Quick Quote',
          contactEmail: quoteEmail,
          contactPhone: '',
          hasLogo: false,
          additionalNotes: quoteDescription,
        }),
      })
      const result = await response.json()
      if (response.ok && result.ok) {
        setQuoteStatus('success')
        setQuoteEmail('')
        setQuoteDescription('')
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
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden py-20">
      <div className="relative max-w-6xl mx-auto text-center space-y-6 px-6">
        {/* Logo/Brand Icon with glow */}
        <div className="flex justify-center mb-6 animate-fade-in-down">
          <div className="w-16 h-16 rounded-2xl bg-gradient-blue flex items-center justify-center shadow-glow smooth-transition hover:scale-110 animate-glow">
            <Zap className="w-8 h-8 text-tech-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-tech-white leading-tight animate-fade-in-up animation-delay-200">
          Intelligent Systems
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-tech-platinum font-medium animate-fade-in-up animation-delay-400">
          Capital Intelligence Group
        </p>

        {/* Slogan with gradient */}
        <p className="text-2xl md:text-4xl font-bold text-tech-white max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600">
          Systems That Think. Businesses That Scale.
        </p>

        {/* Email for Quote */}
        <div className="animate-fade-in-up animation-delay-700 max-w-xl mx-auto">
          {quoteStatus === 'success' ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <CheckCircle className="w-8 h-8 text-tech-baby-blue" />
              <p className="text-tech-white font-semibold text-lg">Quote request received!</p>
              <p className="text-tech-platinum text-sm">We&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleQuoteSubmit} className="bg-tech-black/60 backdrop-blur-sm border border-tech-baby-blue/30 rounded-2xl p-5 text-left space-y-3">
              <div>
                <p className="text-tech-white font-bold text-lg">Email for Quote</p>
                <p className="text-tech-platinum text-sm mt-0.5">Instant Quote response</p>
              </div>
              <textarea
                value={quoteDescription}
                onChange={(e) => setQuoteDescription(e.target.value)}
                placeholder="Describe the website you want: industry, style, features, goals..."
                rows={3}
                required
                className="w-full px-4 py-2.5 bg-tech-black/80 border border-tech-baby-blue/30 rounded-xl text-tech-white placeholder-tech-platinum/50 focus:outline-none focus:border-tech-baby-blue smooth-transition resize-none text-sm"
              />
              <div className="flex gap-2">
                <input
                  type="email"
                  value={quoteEmail}
                  onChange={(e) => setQuoteEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-4 py-2.5 bg-tech-black/80 border border-tech-baby-blue/30 rounded-xl text-tech-white placeholder-tech-platinum/50 focus:outline-none focus:border-tech-baby-blue smooth-transition text-sm"
                />
                <button
                  type="submit"
                  disabled={quoteStatus === 'submitting'}
                  className="px-5 py-2.5 bg-tech-baby-blue text-tech-black rounded-xl font-semibold text-sm inline-flex items-center gap-2 smooth-transition hover:bg-tech-baby-blue-light disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {quoteStatus === 'submitting' ? 'Sending…' : (
                    <>Send <Send className="w-4 h-4" /></>
                  )}
                </button>
              </div>
              {quoteStatus === 'error' && (
                <p className="text-red-400 text-xs">{quoteError}</p>
              )}
            </form>
          )}
        </div>

        {/* CTA Button */}
        <div className="pt-2 animate-fade-in-up animation-delay-800">
          <button
            onClick={() => {
              const element = document.getElementById('services')
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group px-10 py-4 bg-tech-baby-blue text-tech-black rounded-full font-semibold text-lg inline-flex items-center gap-2 shadow-glow smooth-transition hover:bg-tech-baby-blue-light hover:scale-105 hover:shadow-glow-lg"
          >
            Explore Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
