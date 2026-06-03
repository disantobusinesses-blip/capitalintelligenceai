'use client'

import { useState } from 'react'
import { X, Check, Send, Building2, User, Mail, Phone, MessageSquare, ChevronDown } from 'lucide-react'

const serviceOptions = [
  { id: 'website-build-redesign', label: 'Website Build/Redesign' },
  { id: 'google-profile-setup', label: 'Google Profile Setup' },
  { id: 'b2b-ai-platform', label: 'B2B AI Platform' },
]

const addOnOptions = [
  { id: 'hosting-updates', label: '$99 Hosting + Updates', description: 'Limited to 1 update per month — keeps websites looking fresh with new content you provide us.' },
]

const seoPackageOptions = [
  { value: '', label: 'Select an SEO package (optional)' },
  { value: 'google-growth', label: 'Google Growth — A$199/month' },
  { value: 'super-growth', label: 'Super Growth — A$359/month' },
  { value: 'market-authority', label: 'Market Authority — A$799/month' },
]

const budgetOptions = [
  { value: '', label: 'Select a budget range' },
  { value: '$600-$1,000', label: '$600 – $1,000' },
  { value: '$1,000-$2,000', label: '$1,000 – $2,000' },
  { value: '$2,000-$5,000', label: '$2,000 – $5,000' },
  { value: '$5,000+', label: '$5,000+' },
  { value: 'not-sure', label: 'Not sure' },
]

type FormData = {
  name: string
  businessName: string
  email: string
  phone: string
  services: string[]
  addOns: string[]
  seoPackage: string
  budget: string
  message: string
}

const initialFormData: FormData = {
  name: '',
  businessName: '',
  email: '',
  phone: '',
  services: [],
  addOns: [],
  seoPackage: '',
  budget: '',
  message: '',
}

export default function GetStartedForm({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
  preselectedService?: 'landing-page' | 'full-package' | null
}) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [addOnsOpen, setAddOnsOpen] = useState(false)

  const toggleService = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }))
  }

  const toggleAddOn = (addOnId: string) => {
    setFormData((prev) => ({
      ...prev,
      addOns: prev.addOns.includes(addOnId)
        ? prev.addOns.filter((a) => a !== addOnId)
        : [...prev.addOns, addOnId],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)

    const servicesLabels = formData.services
      .map((id) => serviceOptions.find((s) => s.id === id)?.label)
      .filter(Boolean)
      .join(', ')

    const addOnsLabels = formData.addOns
      .map((id) => addOnOptions.find((a) => a.id === id)?.label)
      .filter(Boolean)
      .join(', ')

    const seoPackageLabel = seoPackageOptions.find((s) => s.value === formData.seoPackage)?.label || ''

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          businessName: formData.businessName,
          email: formData.email,
          phone: formData.phone,
          notes: formData.message,
          services: servicesLabels,
          addOns: addOnsLabels,
          seoPackage: seoPackageLabel,
          budget: formData.budget,
          websiteType: null,
          colourDirection: '',
          colourLabel: '',
          seoPlan: '',
          seoPrice: 0,
        }),
      })

      const result = await response.json()

      if (response.ok && result.ok) {
        setSubmitted(true)
      } else {
        setSubmitError(result.message || 'Failed to submit form. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError('An error occurred. Please try again or contact us directly at sales@intelligentaisystem.com')
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData(initialFormData)
    setSubmitted(false)
    setSubmitError(null)
    onClose()
  }

  const canSubmit = formData.name.trim() !== '' && formData.email.trim() !== '' && formData.businessName.trim() !== '' && formData.services.length > 0 && formData.budget !== ''

  if (!isOpen) return null

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70">
        <div className="bg-white border border-[#E8E4DF] rounded-2xl p-8 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-[#F8F7F4] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-[#1A1A1A]" />
          </div>
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Thank You!</h2>
          <p className="text-[#6B6560] mb-2">
            We have received your enquiry.
          </p>
          <p className="text-[#6B6560] mb-8">
            Our team will review your request and get back to you within 24 hours at <span className="text-[#1A1A1A]">{formData.email}</span>.
          </p>
          <button
            onClick={handleClose}
            className="px-8 py-3 bg-[#1A1A1A] text-white rounded-lg font-semibold smooth-transition hover:bg-[#2D2D2D]"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70">
      <div className="bg-white border border-[#E8E4DF] rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E8E4DF] sticky top-0 bg-white rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A]">Get a Quote</h2>
            <p className="text-sm text-[#6B6560] mt-0.5">
              Free consultation, no commitment
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-[#F8F7F4] rounded-lg smooth-transition"
            aria-label="Close form"
          >
            <X className="w-5 h-5 text-[#6B6560]" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#5C3D2E]" />
                Your Name <span className="text-red-400">*</span>
              </span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="John Smith"
              required
              className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200"
            />
          </div>

          {/* Business Name */}
          <div>
            <label htmlFor="businessName" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#5C3D2E]" />
                Business Name <span className="text-red-400">*</span>
              </span>
            </label>
            <input
              id="businessName"
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
              placeholder="Your Business Name"
              required
              className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[#5C3D2E]" />
                Email Address <span className="text-red-400">*</span>
              </span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="john@example.com"
              required
              className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#5C3D2E]" />
                Phone Number
              </span>
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="0412 345 678"
              className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200"
            />
          </div>

          {/* What do you need? - Toggle Buttons */}
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              What do you need? <span className="text-red-400">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    formData.services.includes(service.id)
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-[#F8F7F4] text-[#1A1A1A] border border-[#E8E4DF] hover:border-[#5C3D2E]'
                  }`}
                >
                  {formData.services.includes(service.id) && (
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
          <div className="border border-[#E8E4DF] rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setAddOnsOpen(!addOnsOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#F8F7F4] hover:bg-[#F0EDE8] transition-colors"
            >
              <span className="text-sm font-semibold text-[#1A1A1A]">Optional Add-ons</span>
              <ChevronDown className={`w-4 h-4 text-[#6B6560] transition-transform duration-200 ${addOnsOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${addOnsOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-4 space-y-3 border-t border-[#E8E4DF]">
                {/* Hosting + Updates */}
                {addOnOptions.map((addOn) => (
                  <button
                    key={addOn.id}
                    type="button"
                    onClick={() => toggleAddOn(addOn.id)}
                    className={`w-full px-4 py-3 rounded-lg text-left text-sm font-medium transition-all duration-200 ${
                      formData.addOns.includes(addOn.id)
                        ? 'bg-[#1A1A1A] text-white'
                        : 'bg-white text-[#1A1A1A] border border-[#E8E4DF] hover:border-[#5C3D2E]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {formData.addOns.includes(addOn.id) && (
                        <Check className="w-4 h-4 flex-shrink-0" />
                      )}
                      <span>
                        <span className="block font-semibold">{addOn.label}</span>
                        <span className={`block text-xs mt-0.5 ${formData.addOns.includes(addOn.id) ? 'text-white/70' : 'text-[#9E9790]'}`}>
                          {addOn.description}
                        </span>
                      </span>
                    </span>
                  </button>
                ))}

                {/* SEO Packages */}
                <div>
                  <label htmlFor="seoPackage" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    SEO Packages
                    <span className="text-[10px] font-normal text-[#9E9790] ml-1">(+GST)</span>
                  </label>
                  <div className="relative">
                    <select
                      id="seoPackage"
                      value={formData.seoPackage}
                      onChange={(e) => setFormData((prev) => ({ ...prev, seoPackage: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200 appearance-none cursor-pointer"
                    >
                      {seoPackageOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#9E9790] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Estimated Budget */}
          <div>
            <label htmlFor="budget" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
              Estimated Budget <span className="text-red-400">*</span>
              <span className="text-[10px] font-normal text-[#9E9790] ml-1">(+GST)</span>
            </label>
            <div className="relative">
              <select
                id="budget"
                value={formData.budget}
                onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200 appearance-none cursor-pointer"
              >
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#9E9790] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#5C3D2E]" />
                Tell us about your project
              </span>
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="What kind of website do you need? Any specific features or requirements?"
              rows={3}
              className="w-full px-4 py-2.5 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200 resize-none"
            />
          </div>

          {submitError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {submitError}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#1A1A1A] text-white rounded-lg font-semibold smooth-transition hover:bg-[#2D2D2D] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? 'Sending...' : (
              <>
                Get My Free Quote
                <Send className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-[#9E9790]">
            We typically respond within 24 hours.
          </p>
        </form>
      </div>
    </div>
  )
}
