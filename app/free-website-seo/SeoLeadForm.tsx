'use client'

import { useState } from 'react'
import { ArrowRight, Loader2, AlertCircle, CheckCircle } from 'lucide-react'

export default function SeoLeadForm() {
  const [form, setForm] = useState({
    name: '',
    business_name: '',
    email: '',
    phone: '',
    existing_website: '',
    plan_interest: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/notify-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'free-website-seo' }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.message || 'Something went wrong')
      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-14">
        <div className="w-16 h-16 bg-[#2563EB]/20 border border-[#2563EB]/40 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-[#2563EB]" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Thanks! We&apos;ll be in touch within 1 business day.</h2>
        <p className="text-[#94A3B8] leading-relaxed">
          Our team will review your details and reach out to get your free website started.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Claim Your Free Website</h2>
        <p className="text-[#94A3B8]">Fill in your details and we&apos;ll be in touch within 1 business day.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[#CBD5E1] mb-1.5">Full Name *</label>
          <input
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder-[#475569] focus:outline-none focus:border-[#2563EB] transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#CBD5E1] mb-1.5">Business Name *</label>
          <input
            name="business_name"
            type="text"
            required
            placeholder="Acme Digital"
            value={form.business_name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder-[#475569] focus:outline-none focus:border-[#2563EB] transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#CBD5E1] mb-1.5">Email Address *</label>
          <input
            name="email"
            type="email"
            required
            placeholder="jane@yourbusiness.com"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder-[#475569] focus:outline-none focus:border-[#2563EB] transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#CBD5E1] mb-1.5">Phone Number *</label>
          <input
            name="phone"
            type="tel"
            required
            placeholder="04xx xxx xxx"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder-[#475569] focus:outline-none focus:border-[#2563EB] transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#CBD5E1] mb-1.5">
            Current Website <span className="text-[#475569] font-normal">(optional)</span>
          </label>
          <input
            name="existing_website"
            type="url"
            placeholder="https://yoursite.com"
            value={form.existing_website}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder-[#475569] focus:outline-none focus:border-[#2563EB] transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#CBD5E1] mb-1.5">Which plan interests you? *</label>
          <select
            name="plan_interest"
            required
            value={form.plan_interest}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0A0F1E] border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#2563EB] transition-colors text-sm"
          >
            <option value="" disabled>Select a plan…</option>
            <option value="Google Growth">Google Growth, $199/month</option>
            <option value="Super Growth">Super Growth, $359/month</option>
            <option value="Google Authority">Google Authority, $799/month</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>

        {status === 'error' && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-4 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-base"
        >
          {status === 'loading' ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</>
          ) : (
            <>Claim My Free Website <ArrowRight className="w-5 h-5" /></>
          )}
        </button>

        <p className="text-center text-xs text-[#475569] pt-1">
          No credit card required. No lock-in contracts. Melbourne-based team.
        </p>
      </form>
    </>
  )
}
