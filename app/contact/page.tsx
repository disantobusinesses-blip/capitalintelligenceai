'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, AlertCircle, Loader2, ArrowRight, User, Building2, Mail, Phone, MessageSquare, Check, ChevronDown } from 'lucide-react'

const SERVICE_OPTIONS = [
  { id: 'website-build-redesign', label: 'Website Build/Redesign' },
  { id: 'google-profile-setup', label: 'Google Profile Setup' },
  { id: 'b2b-ai-platform', label: 'B2B AI Platform' },
]

const ADD_ON_OPTIONS = [
  { id: 'hosting-updates', label: '$99 Hosting + Updates', description: 'Limited to 1 update per month — keeps websites looking fresh with new content you provide us.' },
]

const SEO_PACKAGE_OPTIONS = [
  { value: '', label: 'Select an SEO package (optional)' },
  { value: 'google-growth', label: 'Google Growth — A$199/month' },
  { value: 'super-growth', label: 'Super Growth — A$359/month' },
  { value: 'market-authority', label: 'Market Authority — A$799/month' },
]

const BUDGET_OPTIONS = [
  { value: '', label: 'Select your budget' },
  { value: '600-1000', label: '$600 – $1,000' },
  { value: '1000-2000', label: '$1,000 – $2,000' },
  { value: '2000-5000', label: '$2,000 – $5,000' },
  { value: '5000+', label: '$5,000+' },
  { value: 'not-sure', label: 'Not sure' },
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    services: [] as string[],
    addOns: [] as string[],
    seoPackage: '',
    budget: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [addOnsOpen, setAddOnsOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const toggleService = (serviceId: string) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }))
  }

  const toggleAddOn = (addOnId: string) => {
    setForm(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOnId)
        ? prev.addOns.filter(a => a !== addOnId)
        : [...prev.addOns, addOnId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          businessName: form.businessName,
          email: form.email,
          phone: form.phone,
          services: form.services.map(id => SERVICE_OPTIONS.find(s => s.id === id)?.label).join(', '),
          addOns: form.addOns.map(id => ADD_ON_OPTIONS.find(a => a.id === id)?.label).join(', '),
          seoPackage: SEO_PACKAGE_OPTIONS.find(s => s.value === form.seoPackage)?.label || '',
          budget: BUDGET_OPTIONS.find(b => b.value === form.budget)?.label || form.budget,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setStatus('success')
      // Fire Google Ads conversion tracking
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {'send_to': 'AW-17950129824/0hYECPfNlrkcEKD9pO9C'})
      }
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F7F4] pt-[74px]">
      {/* Hero */}
      <section className="bg-[#1A1A1A] text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#C8B89A] mb-4">
            Get a Quote
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Tell Us About Your <span className="text-[#C8B89A]">Project</span>
          </h1>
          <p className="text-[#B0A898] text-lg leading-relaxed max-w-2xl mx-auto">
            Fill out the form below and we&apos;ll get back to you with a tailored quote within 1-2 business days.
          </p>
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
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">Quote Request Received!</h2>
              <p className="text-[#666] mb-8 leading-relaxed">
                Thanks for reaching out. We&apos;ll review your project details and send you a personalised quote within 1-2 business days.
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
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Request a Quote</h2>
                <p className="text-[#666]">No commitment. We&apos;ll be in touch shortly.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Your Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Your Name <span className="text-red-500">*</span>
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

                {/* Business Name */}
                <div>
                  <label htmlFor="businessName" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                    <input
                      id="businessName"
                      name="businessName"
                      type="text"
                      required
                      placeholder="Your Business Pty Ltd"
                      value={form.businessName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-[#E0DAD0] rounded-[8px] bg-white text-[#1A1A1A] placeholder-[#BBB] focus:outline-none focus:border-[#1A1A1A] transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Email Address <span className="text-red-500">*</span>
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

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="0400 000 000"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-[#E0DAD0] rounded-[8px] bg-white text-[#1A1A1A] placeholder-[#BBB] focus:outline-none focus:border-[#1A1A1A] transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* What do you need? */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    What do you need? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleService(service.id)}
                        className={`px-4 py-2 rounded-[6px] text-sm font-medium transition-colors ${
                          form.services.includes(service.id)
                            ? 'bg-[#1A1A1A] text-white'
                            : 'bg-white border border-[#E0DAD0] text-[#1A1A1A] hover:border-[#1A1A1A]'
                        }`}
                      >
                        {form.services.includes(service.id) && (
                          <Check className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                        )}
                        {service.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#9E9790] mt-2">
                    All websites require $79/month hosting service.
                  </p>
                </div>

                {/* Optional Add-ons - Collapsible */}
                <div className="border border-[#E0DAD0] rounded-[8px] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setAddOnsOpen(!addOnsOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-[#F8F7F4] hover:bg-[#F0EDE8] transition-colors"
                  >
                    <span className="text-sm font-semibold text-[#1A1A1A]">Optional Add-ons</span>
                    <ChevronDown className={`w-4 h-4 text-[#6B6560] transition-transform duration-200 ${addOnsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${addOnsOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-4 space-y-3 border-t border-[#E0DAD0]">
                      {/* Hosting + Updates */}
                      {ADD_ON_OPTIONS.map((addOn) => (
                        <button
                          key={addOn.id}
                          type="button"
                          onClick={() => toggleAddOn(addOn.id)}
                          className={`w-full px-4 py-3 rounded-[6px] text-left text-sm font-medium transition-colors ${
                            form.addOns.includes(addOn.id)
                              ? 'bg-[#1A1A1A] text-white'
                              : 'bg-white border border-[#E0DAD0] text-[#1A1A1A] hover:border-[#1A1A1A]'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {form.addOns.includes(addOn.id) && (
                              <Check className="w-4 h-4 flex-shrink-0" />
                            )}
                            <span>
                              <span className="block font-semibold">{addOn.label}</span>
                              <span className={`block text-xs mt-0.5 ${form.addOns.includes(addOn.id) ? 'text-white/70' : 'text-[#9E9790]'}`}>
                                {addOn.description}
                              </span>
                            </span>
                          </span>
                        </button>
                      ))}

                      {/* SEO Packages */}
                      <div>
                        <label htmlFor="seoPackage" className="block text-sm font-semibold text-[#1A1A1A] mb-1">
                          SEO Packages
                          <span className="text-[10px] font-normal text-[#9E9790] ml-1">(+GST)</span>
                        </label>
                        <div className="relative">
                          <select
                            id="seoPackage"
                            name="seoPackage"
                            value={form.seoPackage}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-[#E0DAD0] rounded-[8px] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors text-sm appearance-none cursor-pointer"
                          >
                            {SEO_PACKAGE_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-[#999] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estimated Budget */}
                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-[#1A1A1A] mb-1">
                    Estimated Budget <span className="text-red-500">*</span>
                  </label>
                  <p className="text-[10px] text-[#9E9790] mb-2">All prices are + GST</p>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#E0DAD0] rounded-[8px] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors text-sm"
                  >
                    {BUDGET_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tell us about your project */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Tell us about your project
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[#999]" />
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Describe your project, goals, and any specific requirements..."
                      value={form.message}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-[#E0DAD0] rounded-[8px] bg-white text-[#1A1A1A] placeholder-[#BBB] focus:outline-none focus:border-[#1A1A1A] transition-colors text-sm resize-none"
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
                  disabled={status === 'loading' || !form.name || !form.businessName || !form.email || form.services.length === 0 || !form.budget}
                  className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] text-white font-semibold py-3.5 rounded-[8px] hover:bg-[#2D2D2D] transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Get My Quote <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-[#999] pt-1">
                  We typically respond within 1-2 business days. No spam, ever.
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
