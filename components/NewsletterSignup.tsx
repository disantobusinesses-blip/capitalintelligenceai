'use client'

import { useState } from 'react'
import { CheckCircle, Send } from 'lucide-react'

export default function NewsletterSignup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setStatus('submitting')
    try {
      await fetch('/api/notify-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, source: 'newsletter' }),
      })
      setStatus('success')
    } catch {
      setStatus('success')
    }
  }

  return (
    <section className="bg-[#F8F7F4] py-[80px] px-6" style={{ borderTop: '1px solid #E8E4DF' }}>
      <div className="max-w-[560px] mx-auto text-center">
        <p className="text-[#5C3D2E] text-[13px] font-semibold tracking-[1.5px] uppercase mb-3">
          Stay in the Loop
        </p>
        <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#1A1A1A] leading-tight mb-3">
          Join Our Newsletter
        </h2>
        <p className="text-[16px] text-[#6B6560] mb-8">
          Get the latest tips on AI, SEO, and digital growth delivered straight to your inbox.
        </p>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
            <p className="text-[#1A1A1A] font-bold text-xl">We look forward to working with you.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200 text-sm"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 border border-[#E8E4DF] rounded-[6px] text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200 text-sm"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-[#1A1A1A] text-white font-semibold py-3 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
            >
              {status === 'submitting' ? 'Subscribing…' : (
                <>Subscribe <Send className="w-4 h-4" /></>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
