'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, AlertCircle, Loader2, ArrowRight, Globe, Mail, User } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', url: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F7F4] pt-[68px]">
      {/* Hero */}
      <section className="bg-[#1A1A1A] text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#C8B89A] mb-4">
            Free Website Audit
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Get Your Free <span className="text-[#C8B89A]">Website Audit</span>
          </h1>
          <p className="text-[#B0A898] text-lg leading-relaxed max-w-2xl mx-auto">
            Enter your details below and our team will personally audit your website — covering SEO, performance, design, and AI opportunities — completely free.
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="py-14 px-6 border-b border-[#E8E3DC]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { title: 'SEO Analysis', desc: 'We check your rankings, keywords, and indexability to find quick wins.' },
            { title: 'Performance Review', desc: 'Page speed, Core Web Vitals, and mobile experience assessed.' },
            { title: 'AI Opportunities', desc: 'We identify exactly where AI can save you time and grow revenue.' },
          ].map(item => (
            <div key={item.title} className="p-6 bg-white rounded-xl border border-[#E8E3DC]">
              <div className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-[#1A1A1A] text-lg mb-2">{item.title}</h3>
              <p className="text-[#666] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-6">
        <div className="max-w-lg mx-auto">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">Request Received!</h2>
              <p className="text-[#666] mb-8 leading-relaxed">
                Thanks for reaching out. We'll review your website and send your personalised audit within 1–2 business days.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white font-semibold px-6 py-3 rounded-[6px] hover:bg-[#2D2D2D] transition-colors"
              >
                Back to Home <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Request Your Free Audit</h2>
                <p className="text-[#666]">Takes 30 seconds. No credit card. No obligation.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="John Smith"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-[#E0DAD0] rounded-[8px] bg-white text-[#1A1A1A] placeholder-[#BBB] focus:outline-none focus:border-[#1A1A1A] transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@yourbusiness.com.au"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-[#E0DAD0] rounded-[8px] bg-white text-[#1A1A1A] placeholder-[#BBB] focus:outline-none focus:border-[#1A1A1A] transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="url" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Website URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                    <input
                      id="url"
                      name="url"
                      type="url"
                      required
                      placeholder="https://yourbusiness.com.au"
                      value={form.url}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-[#E0DAD0] rounded-[8px] bg-white text-[#1A1A1A] placeholder-[#BBB] focus:outline-none focus:border-[#1A1A1A] transition-colors text-sm"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-[6px] text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errorMsg || 'Something went wrong. Please try again.'}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] text-white font-semibold py-3.5 rounded-[8px] hover:bg-[#2D2D2D] transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Get My Free Audit <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-[#999] pt-1">
                  We typically respond within 1–2 business days. No spam, ever.
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
