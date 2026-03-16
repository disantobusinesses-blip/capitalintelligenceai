'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, Send, CheckCircle, Clock } from 'lucide-react'

// Countdown target: March 25, 2026
const DEAL_DEADLINE = new Date('2026-03-25T23:59:59')

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl md:text-3xl font-bold text-tech-white tabular-nums leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-tech-platinum mt-1">{label}</span>
    </div>
  )
}

export default function Hero() {
  const [quoteEmail, setQuoteEmail] = useState('')
  const [quoteDescription, setQuoteDescription] = useState('')
  const [quoteStatus, setQuoteStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [quoteError, setQuoteError] = useState('')
  const countdown = useCountdown(DEAL_DEADLINE)

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
      <div className="relative max-w-2xl mx-auto text-center space-y-6 px-6">

        {/* IS Logo — floating, no box */}
        <div className="flex justify-center mb-2 animate-fade-in-down">
          <Image
            src="/images/is-logo.jpg"
            alt="Capital Intelligence Group logo"
            width={72}
            height={72}
            className="rounded-full object-cover drop-shadow-lg smooth-transition hover:scale-105"
          />
        </div>

        {/* Label */}
        <p className="text-sm font-semibold uppercase tracking-widest text-tech-white animate-fade-in-up animation-delay-200">
          Capital Intelligence Group
        </p>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-tech-white leading-tight text-balance animate-fade-in-up animation-delay-400">
          Websites That Get Found.<br />Businesses That Grow.
        </h1>

        {/* Sub copy */}
        <p className="text-base md:text-lg text-tech-platinum leading-relaxed text-balance animate-fade-in-up animation-delay-600">
          We build SEO-powered websites for Australian businesses — designed to attract visitors, generate leads, and scale with you.
        </p>

        {/* Countdown Banner */}
        <div className="animate-fade-in-up animation-delay-600">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-tech-black/70 backdrop-blur-sm border border-amber-500/40 rounded-2xl px-6 py-4">
            <div className="flex items-center gap-2 text-amber-400">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-semibold whitespace-nowrap">15% off website builds — ends March 25</span>
            </div>
            <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-amber-500/30 pt-3 sm:pt-0 sm:pl-4">
              <CountdownUnit value={countdown.days} label="days" />
              <span className="text-amber-400 font-bold text-lg">:</span>
              <CountdownUnit value={countdown.hours} label="hrs" />
              <span className="text-amber-400 font-bold text-lg">:</span>
              <CountdownUnit value={countdown.minutes} label="min" />
              <span className="text-amber-400 font-bold text-lg">:</span>
              <CountdownUnit value={countdown.seconds} label="sec" />
            </div>
          </div>
        </div>

        {/* Quote Form */}
        <div className="animate-fade-in-up animation-delay-700">
          {quoteStatus === 'success' ? (
            <div className="flex flex-col items-center gap-2 py-6">
              <CheckCircle className="w-8 h-8 text-tech-baby-blue" />
              <p className="text-tech-white font-semibold text-lg">Quote request received!</p>
              <p className="text-tech-platinum text-sm">We&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={handleQuoteSubmit}
              className="bg-tech-black/60 backdrop-blur-sm border border-tech-baby-blue/25 rounded-2xl p-5 text-left space-y-3"
            >
              <div>
                <p className="text-tech-white font-bold text-base">Get a Free Quote</p>
                <p className="text-tech-platinum text-xs mt-0.5">Tell us about your business — we respond fast.</p>
              </div>
              <textarea
                value={quoteDescription}
                onChange={(e) => setQuoteDescription(e.target.value)}
                placeholder="Describe your business and what you need..."
                rows={3}
                required
                className="w-full px-4 py-2.5 bg-tech-black/80 border border-tech-baby-blue/25 rounded-xl text-tech-white placeholder-tech-platinum/50 focus:outline-none focus:border-tech-baby-blue smooth-transition resize-none text-sm"
              />
              <div className="flex gap-2">
                <input
                  type="email"
                  value={quoteEmail}
                  onChange={(e) => setQuoteEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-4 py-2.5 bg-tech-black/80 border border-tech-baby-blue/25 rounded-xl text-tech-white placeholder-tech-platinum/50 focus:outline-none focus:border-tech-baby-blue smooth-transition text-sm"
                />
                <button
                  type="submit"
                  disabled={quoteStatus === 'submitting'}
                  className="px-5 py-2.5 bg-tech-baby-blue text-tech-black rounded-xl font-bold text-sm inline-flex items-center gap-2 smooth-transition hover:bg-tech-baby-blue-light disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* CTA */}
        <div className="pt-1 animate-fade-in-up animation-delay-800">
          <button
            onClick={() => {
              const element = document.getElementById('services')
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group px-8 py-3.5 bg-tech-baby-blue text-tech-black rounded-full font-bold text-base inline-flex items-center gap-2 shadow-glow smooth-transition hover:bg-tech-baby-blue-light hover:scale-105 hover:shadow-glow-lg"
          >
            See Our Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  )
}
