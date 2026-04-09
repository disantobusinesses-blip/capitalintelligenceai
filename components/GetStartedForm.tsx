'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, X, Check, Upload, Palette, Layout, Monitor, CreditCard, Sparkles, Package, TrendingUp } from 'lucide-react'

type ServiceType = 'landing-page' | 'full-package'

type FormData = {
  service: ServiceType | null
  businessName: string
  industry: string
  description: string
  designStyle: string
  colorPreference: string
  features: string[]
  monthlyPlan: string
  aiAutomationRequest: string
  contactName: string
  contactEmail: string
  contactPhone: string
  hasLogo: boolean
  additionalNotes: string
}

const initialFormData: FormData = {
  service: null,
  businessName: '',
  industry: '',
  description: '',
  designStyle: '',
  colorPreference: '',
  features: [],
  monthlyPlan: '',
  aiAutomationRequest: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  hasLogo: false,
  additionalNotes: '',
}

const designStyles = [
  { id: 'modern', label: 'Modern & Clean', description: 'Minimal layouts with bold typography' },
  { id: 'corporate', label: 'Corporate & Professional', description: 'Structured and business-focused' },
  { id: 'creative', label: 'Creative & Bold', description: 'Eye-catching with unique elements' },
  { id: 'elegant', label: 'Elegant & Refined', description: 'Sophisticated with premium feel' },
]

const colorOptions = [
  { id: 'blue', label: 'Blue Tones', colors: ['#1e3a5f', '#3b82f6', '#93c5fd'] },
  { id: 'dark', label: 'Dark & Sleek', colors: ['#0a0a0a', '#374151', '#6b7280'] },
  { id: 'warm', label: 'Warm Tones', colors: ['#92400e', '#d97706', '#fbbf24'] },
  { id: 'green', label: 'Green & Natural', colors: ['#064e3b', '#10b981', '#6ee7b7'] },
  { id: 'red', label: 'Red & Bold', colors: ['#7f1d1d', '#ef4444', '#fca5a5'] },
  { id: 'custom', label: 'Custom / Not Sure', colors: ['#6366f1', '#a855f7', '#ec4899'] },
]

const featureOptions = [
  { name: '24/7 AI Chat Support', price: 'Price upon request', numericPrice: 0, benefit: 'Increases customer support efficiency' },
  { name: 'Blog / News Section', price: 'Price upon request', numericPrice: 0, benefit: 'Boosts Google ranking', seoBoost: true },
  { name: 'Automated AI Customer Replies', price: 'Price upon request', numericPrice: 0, benefit: 'Increases customer acquisition/support' },
  { name: 'Contact Form', price: 'FREE', numericPrice: 0, benefit: 'Increases lead generation', isFree: true },
  { name: 'Map / Location', price: 'FREE', numericPrice: 0, benefit: 'Increases local visibility', isFree: true },
  { name: 'Social Media Integration', price: 'FREE', numericPrice: 0, benefit: 'Increases brand awareness', isFree: true },
  { name: 'AI Automated Booking System', price: 'Price upon request', numericPrice: 0, benefit: 'Increases booking conversion rate', comingSoon: true },
  { name: 'Gallery / Portfolio', price: 'FREE', numericPrice: 0, benefit: 'Increases visitor engagement', isFree: true },
  { name: 'Customer Reviews', price: 'FREE', numericPrice: 0, benefit: 'Increases trust & conversions', seoBoost: true, isFree: true },
  { name: 'Newsletter Signup', price: 'Price upon request', numericPrice: 0, benefit: 'Increases repeat visitors' },
]

const monthlyPlans = [
  {
    id: 'care',
    name: 'Website Hosting',
    badge: null as string | null,
    price: '$99 AUD/month',
    subLabel: 'Hosting & maintenance',
    description: 'Essential hosting and maintenance to keep your site running smoothly.',
    features: ['Website hosting', 'Website maintenance', 'Security updates', 'Monthly backups', 'Up to 1hr tech support/month'],
  },
  {
    id: 'google-growth',
    name: 'Google Growth',
    badge: 'Most popular',
    price: '$299 AUD/month',
    subLabel: '4 blogs/month · Website Hosting included',
    description: 'Start ranking on Google with consistent monthly content.',
    features: ['Everything in Website Hosting', '4 SEO-optimised blog articles/month', 'Monthly keyword research', 'On-page optimisation', 'Monthly performance report', 'AI search indexing (ChatGPT, Gemini, Perplexity)'],
  },
  {
    id: 'super-growth',
    name: 'Super Growth',
    badge: 'Recommended',
    price: '$359 AUD/month',
    subLabel: '8 blogs/month · Website Hosting included',
    description: 'Accelerate your rankings with double the content and deeper strategy.',
    features: ['Everything in Google Growth', '8 SEO-optimised blog articles/month', 'Expanded keyword research', 'Internal linking strategy', 'Deep on-page optimisation', 'Detailed monthly reporting'],
  },
  {
    id: 'market-authority',
    name: 'Market Authority',
    badge: null as string | null,
    price: '$799 AUD/month',
    subLabel: '12 blogs/month · Website Hosting included',
    description: 'Dominate your niche and own the first page of Google.',
    features: ['Everything in Super Growth', '12 SEO-optimised blog articles/month', 'Full topical authority mapping', 'Advanced technical SEO', 'Competitor gap analysis', 'Priority support and reporting'],
  },
]

const servicePrices: Record<string, number> = {
  'landing-page': 599,
}

const TOTAL_STEPS = 5

function calculateRunningTotal(formData: FormData): number {
  let total = 0

  // Step 1: Service price
  if (formData.service) {
    total += servicePrices[formData.service] || 0
  }

  // Step 4: Feature prices (free features don't add to total)
  for (const featureName of formData.features) {
    const feature = featureOptions.find((f) => f.name === featureName)
    if (feature) {
      total += feature.numericPrice
    }
  }

  return total
}

export default function GetStartedForm({
  isOpen,
  onClose,
  preselectedService,
}: {
  isOpen: boolean
  onClose: () => void
  preselectedService?: ServiceType | null
}) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    service: preselectedService || null,
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
    setStep(1)
    setFormData({ ...initialFormData })
    setSubmitted(false)
    setSubmitError(null)
    onClose()
  }

  const toggleFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return formData.service !== null
      case 2:
        return formData.businessName.trim() !== '' && formData.industry.trim() !== ''
      case 3:
        return formData.designStyle !== ''
      case 4:
        return formData.monthlyPlan !== ''
      case 5:
        return formData.contactName.trim() !== '' && formData.contactEmail.trim() !== ''
      default:
        return false
    }
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70">
        <div className="bg-white border border-[#E8E4DF] rounded-2xl p-8 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-[#F8F7F4] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-[#1A1A1A]" />
          </div>
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Thank You!</h2>
          <p className="text-[#6B6560] mb-2">
            We have received your project details.
          </p>
          <p className="text-[#6B6560] mb-8">
            Our team will review your requirements and get back to you within 24 hours at <span className="text-[#1A1A1A]">{formData.contactEmail}</span>.
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
      <div className="bg-white border border-[#E8E4DF] rounded-2xl w-full max-w-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E8E4DF] flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A]">Get Started</h2>
            <p className="text-sm text-[#6B6560]">
              Step {step} of {TOTAL_STEPS}
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

        {/* Progress Bar */}
        <div className="px-4 pt-3 flex-shrink-0">
          <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1A1A1A] rounded-full smooth-transition"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {/* Step 1: Choose Service */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">What do you need?</h3>
              <p className="text-[#6B6560] mb-4">Select the service that best fits your project.</p>
              <div className="grid gap-3">
                <button
                  onClick={() => setFormData({ ...formData, service: 'landing-page' })}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left smooth-transition ${
                    formData.service === 'landing-page'
                      ? 'border-[#5C3D2E] bg-[#F8F7F4]'
                      : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                  }`}
                >
                  <div className="w-10 h-10 bg-[#F8F7F4] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-[#1A1A1A]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#1A1A1A] mb-1">Landing Page</h4>
                    <p className="text-sm text-[#6B6560] mb-2">
                      A single-page website to establish your online presence. Modern design, mobile responsive, and SEO optimized.
                    </p>
                  </div>
                  {formData.service === 'landing-page' && (
                    <Check className="w-5 h-5 text-[#1A1A1A] flex-shrink-0 mt-1" />
                  )}
                </button>
                <button
                  onClick={() => setFormData({ ...formData, service: 'full-package' })}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left smooth-transition ${
                    formData.service === 'full-package'
                      ? 'border-[#5C3D2E] bg-[#F8F7F4]'
                      : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                  }`}
                >
                  <div className="w-10 h-10 bg-[#F8F7F4] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-[#1A1A1A]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#1A1A1A] mb-1">Website + Full Package</h4>
                    <p className="text-sm text-[#6B6560] mb-2">
                      Complete multi-page website with ongoing maintenance, digital strategy, and monthly support plan.
                    </p>
                  </div>
                  {formData.service === 'full-package' && (
                    <Check className="w-5 h-5 text-[#1A1A1A] flex-shrink-0 mt-1" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Business Info */}
          {step === 2 && (
            <div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Tell us about your business</h3>
              <p className="text-[#6B6560] mb-4">Help us understand what your website needs to represent.</p>
              <div className="grid gap-3">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    Business Name <span className="text-[#1A1A1A]">*</span>
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                    placeholder="e.g. Capital Intelligence Group"
                    className="w-full px-4 py-2 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    Industry <span className="text-[#1A1A1A]">*</span>
                  </label>
                  <input
                    id="industry"
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData((prev) => ({ ...prev, industry: e.target.value }))}
                    placeholder="e.g. Electrical Services, Technology, etc."
                    className="w-full px-4 py-2 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    Brief description of your business
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="What does your business do? Who are your customers?"
                    rows={2}
                    className="w-full px-4 py-2 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200 resize-none"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFormData({ ...formData, hasLogo: !formData.hasLogo })}
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center smooth-transition ${
                      formData.hasLogo
                        ? 'bg-[#1A1A1A] border-[#5C3D2E]'
                        : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                    }`}
                    role="checkbox"
                    aria-checked={formData.hasLogo}
                  >
                    {formData.hasLogo && <Check className="w-4 h-4 text-white" />}
                  </button>
                  <label className="text-sm text-[#6B6560]">
                    I have a logo and brand assets ready to provide
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Design Style */}
          {step === 3 && (
            <div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Design preferences</h3>
              <p className="text-[#6B6560] mb-4">Choose the look and feel for your website.</p>

              <div className="mb-4">
                <p className="text-sm font-semibold text-[#1A1A1A] mb-2">Layout Style <span className="text-[#1A1A1A]">*</span></p>
                <div className="grid grid-cols-2 gap-2">
                  {designStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setFormData({ ...formData, designStyle: style.id })}
                      className={`p-3 rounded-xl border-2 text-left smooth-transition ${
                        formData.designStyle === style.id
                          ? 'border-[#5C3D2E] bg-[#F8F7F4]'
                          : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                      }`}
                    >
                      <Layout className="w-5 h-5 text-[#1A1A1A] mb-2" />
                      <p className="text-sm font-bold text-[#1A1A1A]">{style.label}</p>
                      <p className="text-xs text-[#6B6560] mt-1">{style.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#1A1A1A] mb-2">Color Preference</p>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setFormData({ ...formData, colorPreference: option.id })}
                      className={`p-2 rounded-xl border-2 text-center smooth-transition ${
                        formData.colorPreference === option.id
                          ? 'border-[#5C3D2E] bg-[#F8F7F4]'
                          : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                      }`}
                    >
                      <div className="flex justify-center gap-1 mb-2">
                        {option.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-5 h-5 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <p className="text-xs font-semibold text-[#1A1A1A]">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Monthly Plan */}
          {step === 4 && (
            <div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-1">Choose a monthly plan</h3>
              <p className="text-[#6B6560] mb-4">Select the ongoing support package that fits your goals. (Min. 1 required)</p>
              <div className="grid gap-3">
                {monthlyPlans.map((plan) => {
                  const isSelected = formData.monthlyPlan === plan.id
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setFormData({ ...formData, monthlyPlan: plan.id })}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left smooth-transition ${
                        isSelected
                          ? 'border-[#5C3D2E] bg-[#F8F7F4]'
                          : 'border-[#E8E4DF] hover:border-[#5C3D2E]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 smooth-transition ${
                          isSelected ? 'bg-[#1A1A1A] border-[#5C3D2E]' : 'border-[#E8E4DF]'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="text-base font-bold text-[#1A1A1A]">{plan.name}</span>
                          {plan.badge && (
                            <span className="text-xs px-2 py-0.5 bg-[#1A1A1A] text-white rounded-full font-semibold">
                              {plan.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-sm font-bold text-[#5C3D2E]">{plan.price}</span>
                          {plan.subLabel && (
                            <span className="text-xs text-[#9E9790]">{plan.subLabel}</span>
                          )}
                        </div>
                        <p className="text-xs text-[#6B6560] mb-2">{plan.description}</p>
                        <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
                          {plan.features.map((f) => (
                            <li key={f} className="flex items-start gap-1.5 text-xs text-[#6B6560]">
                              <Check className="w-3 h-3 text-[#5C3D2E] flex-shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}


          {/* Step 5: Contact Info */}
          {step === 5 && (
            <div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Your contact details</h3>
              <p className="text-[#6B6560] mb-4">How can we reach you to discuss your project?</p>
              <div className="grid gap-3">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    Full Name <span className="text-[#1A1A1A]">*</span>
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactName: e.target.value }))}
                    placeholder="Your full name"
                    className="w-full px-4 py-2 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    Email Address <span className="text-[#1A1A1A]">*</span>
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
                    placeholder="you@company.com"
                    className="w-full px-4 py-2 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))}
                    placeholder="Optional"
                    className="w-full px-4 py-2 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    Additional Notes
                  </label>
                  <textarea
                    id="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                    placeholder="Anything else you'd like us to know?"
                    rows={2}
                    className="w-full px-4 py-2 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#9E9790] focus:outline-none focus:border-[#5C3D2E] transition-colors duration-200 resize-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-[#E8E4DF] flex-shrink-0">
          {submitError && (
            <div className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {submitError}
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              onClick={step === 1 ? handleClose : handleBack}
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2.5 border border-[#E8E4DF] text-[#6B6560] rounded-lg font-medium smooth-transition hover:border-[#5C3D2E] hover:text-[#1A1A1A] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              {step === 1 ? 'Cancel' : 'Back'}
            </button>
            {step < TOTAL_STEPS ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#1A1A1A] text-white rounded-lg font-semibold smooth-transition hover:bg-[#2D2D2D] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || submitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#1A1A1A] text-white rounded-lg font-semibold smooth-transition hover:bg-[#2D2D2D] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit'}
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
