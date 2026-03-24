'use client'

import { useState } from 'react'
import { CheckCircle, Send, Hammer } from 'lucide-react'
import { motion } from 'framer-motion'
import { useGetStartedModal } from '@/context/GetStartedModalContext'

// Time slots 9:00 AM – 5:00 PM in 15-minute increments
function generateTimeSlots(): string[] {
  const slots: string[] = []
  for (let hour = 9; hour <= 17; hour++) {
    for (let min = 0; min < 60; min += 15) {
      if (hour === 17 && min > 0) break
      const h = hour % 12 === 0 ? 12 : hour % 12
      const m = min.toString().padStart(2, '0')
      const period = hour < 12 ? 'AM' : 'PM'
      slots.push(`${h}:${m} ${period}`)
    }
  }
  return slots
}

const TIME_SLOTS = generateTimeSlots()

const HERO_HEADLINE = 'Get Found on Google. Get Recommended by AI.'

const trustBadges = [
  'First SEO Blog Free',
  'No Lock-In Contracts',
  'Split Payments Available',
  '90-Day Ranking Guarantee',
]

export default function Hero() {
  const { openModal } = useGetStartedModal()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [time, setTime] = useState('')
  const [consultStatus, setConsultStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [consultError, setConsultError] = useState('')

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim() || !time) return

    setConsultStatus('submitting')
    setConsultError('')

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, time }),
      })
      const result = await response.json()
      if (response.ok && result.ok) {
        setConsultStatus('success')
        setName('')
        setPhone('')
        setTime('')
      } else {
        setConsultStatus('error')
        setConsultError(result.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setConsultStatus('error')
      setConsultError('Something went wrong. Please try again.')
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
            <div className="flex flex-col gap-3 pt-2">
              {/* Primary CTA */}
              <div className="relative inline-flex self-start w-full sm:w-auto pb-4">
                <button
                  onClick={() => openModal()}
                  className="relative w-full sm:w-auto bg-[#1A1A1A] text-white font-bold px-8 py-4 rounded-[6px] text-base shadow-lg hover:bg-[#2D2D2D] transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Hammer className="w-5 h-5" />
                  Build Me a Website
                </button>
                {/* Animated hand-drawn loop */}
                <motion.svg
                  className="absolute -bottom-1 left-0 w-full overflow-visible pointer-events-none"
                  viewBox="0 0 300 18"
                  height="18"
                  preserveAspectRatio="none"
                  initial="hidden"
                  animate="visible"
                >
                  <motion.path
                    d="M 6 10 Q 75 2, 150 10 Q 225 18, 294 10"
                    fill="none"
                    stroke="#5C3D2E"
                    strokeWidth="3"
                    strokeLinecap="round"
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                          pathLength: { duration: 2, ease: [0.43, 0.13, 0.23, 0.96], repeat: Infinity, repeatDelay: 4 },
                          opacity: { duration: 0.4 },
                        },
                      },
                    }}
                  />
                </motion.svg>
              </div>
              {/* Secondary CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#consultation"
                  className="bg-[#1A1A1A] text-white font-semibold px-6 py-3 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200 inline-block text-center"
                >
                  Get a Free Quote
                </a>
                <a
                  href="#our-work"
                  className="border-2 border-[#1A1A1A] text-[#1A1A1A] font-semibold px-6 py-3 rounded-[6px] hover:bg-[#1A1A1A] hover:text-white transition-all duration-200 inline-block text-center"
                >
                  View Our Work
                </a>
              </div>
            </div>

            {/* Urgency text */}
            <p className="text-sm text-[#6B6560] text-left md:text-center -mt-1">
              Limited spots available this month — we only take on a handful of new clients at a time.
            </p>

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

          {/* RIGHT COLUMN: Free Consultation Booking */}
          <div
            id="consultation"
            className="bg-white rounded-[12px] p-8 scroll-mt-24"
            style={{ border: '1px solid #E8E4DF', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
          >
            {consultStatus === 'success' ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <CheckCircle className="w-10 h-10 text-green-500" />
                <p className="text-[#1A1A1A] font-bold text-xl text-center">You&apos;re booked in!</p>
                <p className="text-[#6B6560] text-sm text-center">We&apos;ll call you at your preferred time. Talk soon!</p>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-4">
                <div>
                  <p className="text-[#1A1A1A] font-bold text-lg mb-1">Book a Free Consultation</p>
                  <p className="text-[#6B6560] text-sm">Free 15-minute phone call · No commitment</p>
                </div>

                {/* Time picker */}
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200 text-sm"
                >
                  <option value="">Select preferred call time (9 AM – 5 PM)</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200 text-sm"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  required
                  className="w-full px-4 py-3 border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200 text-sm"
                />

                <button
                  type="submit"
                  disabled={consultStatus === 'submitting'}
                  className="w-full bg-[#1A1A1A] text-white font-semibold py-3 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {consultStatus === 'submitting' ? 'Booking…' : (
                    <>Book My Free Consultation <Send className="w-4 h-4" /></>
                  )}
                </button>

                {consultStatus === 'error' && (
                  <p className="text-red-500 text-xs">{consultError}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
