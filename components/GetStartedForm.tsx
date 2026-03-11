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
  { name: '24/7 AI Chat Support', price: '$399/month', numericPrice: 399, benefit: 'Increases customer support efficiency' },
  { name: 'AI Automated Booking System', price: '$399 setup + $99/month', numericPrice: 399, benefit: 'Increases booking conversion rate', comingSoon: true },
  { name: 'Automated AI Customer Replies', price: 'Custom pricing', numericPrice: 0, benefit: 'Increases customer acquisition/support' },
  { name: 'Contact Form', price: 'FREE', numericPrice: 0, benefit: 'Increases lead generation', isFree: true },
  { name: 'Map / Location', price: 'FREE', numericPrice: 0, benefit: 'Increases local visibility', isFree: true },
  { name: 'Social Media Integration', price: 'FREE', numericPrice: 0, benefit: 'Increases brand awareness', isFree: true },
  { name: 'Blog / News Section', price: '+$199 AUD', numericPrice: 199, benefit: 'Boosts Google ranking', seoBoost: true },
  { name: 'Gallery / Portfolio', price: '$99 setup', numericPrice: 99, benefit: 'Increases visitor engagement' },
  { name: 'Customer Reviews', price: '+$99 AUD', numericPrice: 99, benefit: 'Increases trust & conversions', seoBoost: true },
  { name: 'Newsletter Signup', price: '$199 setup', numericPrice: 199, benefit: 'Increases repeat visitors' },
]

const monthlyPlans = [
  {
    id: 'care',
    name: 'Website Care',
    price: 'Starting at $119 AUD/month+',
    numericPrice: 119,
    description: 'Essential hosting and maintenance',
    features: ['Website Hosting', 'Website Maintenance', 'Security Updates', 'Monthly Backups', 'Tech Support'],
  },
  {
    id: 'seo-ai',
    name: 'SEO & AI Visibility',
    price: 'Starting at $149 AUD/month+',
    numericPrice: 149,
    description: 'Get found on Google and AI search engines',
    features: ['Google Search Optimisation', 'AI Search Engine Indexing (ChatGPT, Gemini, Perplexity)', 'Structured Data / Schema Markup', 'Monthly SEO Reports', 'Content Strategy Guidance'],
  },
  {
    id: 'ai-integration',
    name: 'AI Systems Integration',
    price: 'Custom',
    numericPrice: 0,
    description: 'Automate your business with AI',
    features: ['24/7 AI Chat Support', 'Automated Email Responder', 'Phone Call Transcript Generator', 'Custom AI Workflows', 'Business Process Automation'],
    isCustom: true,
  },
]

const servicePrices: Record<string, number> = {
  'landing-page': 599,
  'full-package': 1999,
}

const TOTAL_STEPS = 6

function calculateRunningTotal(formData: FormData): number {
  let total = 0

  // Step 1: Service price
  if (formData.service) {
    total += servicePrices[formData.service] || 0
  }

  // Step 4: Feature prices
  for (const featureName of formData.features) {
    const feature = featureOptions.find((f) => f.name === featureName)
    if (feature) {
      total += feature.numericPrice
    }
  }

  // Step 5: Monthly plan price
  if (formData.monthlyPlan) {
    const plan = monthlyPlans.find((p) => p.id === formData.monthlyPlan)
    if (plan) {
      total += plan.numericPrice
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
        return formData.features.length > 0
      case 5:
        if (formData.monthlyPlan === '') return false
        if (formData.monthlyPlan === 'ai-integration') {
          return formData.aiAutomationRequest.trim() !== ''
        }
        return true
      case 6:
        return formData.contactName.trim() !== '' && formData.contactEmail.trim() !== ''
      default:
        return false
    }
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tech-black/90 backdrop-blur-sm">
        <div className="bg-tech-gray border border-tech-baby-blue/30 rounded-2xl p-8 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-tech-baby-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-tech-white" />
          </div>
          <h2 className="text-3xl font-bold text-tech-white mb-4">Thank You!</h2>
          <p className="text-tech-platinum mb-2">
            We have received your project details.
          </p>
          <p className="text-tech-platinum mb-8">
            Our team will review your requirements and get back to you within 24 hours at <span className="text-tech-white">{formData.contactEmail}</span>.
          </p>
          <button
            onClick={handleClose}
            className="px-8 py-3 bg-tech-baby-blue text-tech-black rounded-lg font-semibold smooth-transition hover:bg-tech-baby-blue-light"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tech-black/90 backdrop-blur-sm">
      <div className="bg-tech-gray border border-tech-baby-blue/30 rounded-2xl w-full max-w-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-tech-baby-blue/20 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-tech-white">Get Started</h2>
            <p className="text-sm text-tech-platinum">
              Step {step} of {TOTAL_STEPS}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-tech-black/50 rounded-lg smooth-transition"
            aria-label="Close form"
          >
            <X className="w-5 h-5 text-tech-platinum" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pt-3 flex-shrink-0">
          <div className="w-full h-1.5 bg-tech-black rounded-full overflow-hidden">
            <div
              className="h-full bg-tech-baby-blue rounded-full smooth-transition"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {/* Step 1: Choose Service */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-bold text-tech-white mb-2">What do you need?</h3>
              <p className="text-tech-platinum mb-4">Select the service that best fits your project.</p>
              <div className="grid gap-3">
                <button
                  onClick={() => setFormData({ ...formData, service: 'landing-page' })}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left smooth-transition ${
                    formData.service === 'landing-page'
                      ? 'border-tech-baby-blue bg-tech-baby-blue/10'
                      : 'border-tech-baby-blue/20 hover:border-tech-baby-blue/50'
                  }`}
                >
                  <div className="w-10 h-10 bg-tech-baby-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-tech-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-tech-white mb-1">Landing Page</h4>
                    <p className="text-sm text-tech-platinum mb-2">
                      A single-page website to establish your online presence. Modern design, mobile responsive, and SEO optimized.
                    </p>
                    <p className="text-sm font-semibold text-tech-white">$599 – $1,499 AUD</p>
                  </div>
                  {formData.service === 'landing-page' && (
                    <Check className="w-5 h-5 text-tech-white flex-shrink-0 mt-1" />
                  )}
                </button>
                <button
                  onClick={() => setFormData({ ...formData, service: 'full-package' })}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left smooth-transition ${
                    formData.service === 'full-package'
                      ? 'border-tech-baby-blue bg-tech-baby-blue/10'
                      : 'border-tech-baby-blue/20 hover:border-tech-baby-blue/50'
                  }`}
                >
                  <div className="w-10 h-10 bg-tech-baby-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-tech-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-tech-white mb-1">Website + Full Package</h4>
                    <p className="text-sm text-tech-platinum mb-2">
                      Complete multi-page website with ongoing maintenance, digital strategy, and monthly support plan.
                    </p>
                    <p className="text-sm font-semibold text-tech-white">Starting at $1,999+ AUD</p>
                  </div>
                  {formData.service === 'full-package' && (
                    <Check className="w-5 h-5 text-tech-white flex-shrink-0 mt-1" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Business Info */}
          {step === 2 && (
            <div>
              <h3 className="text-xl font-bold text-tech-white mb-2">Tell us about your business</h3>
              <p className="text-tech-platinum mb-4">Help us understand what your website needs to represent.</p>
              <div className="grid gap-3">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-semibold text-tech-white mb-1.5">
                    Business Name <span className="text-tech-white">*</span>
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Capital Intelligence Group"
                    className="w-full px-4 py-2 bg-tech-black border border-tech-baby-blue/30 rounded-lg text-tech-white placeholder-tech-platinum/50 focus:outline-none focus:border-tech-baby-blue smooth-transition"
                  />
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-semibold text-tech-white mb-1.5">
                    Industry <span className="text-tech-white">*</span>
                  </label>
                  <input
                    id="industry"
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g. Electrical Services, Technology, etc."
                    className="w-full px-4 py-2 bg-tech-black border border-tech-baby-blue/30 rounded-lg text-tech-white placeholder-tech-platinum/50 focus:outline-none focus:border-tech-baby-blue smooth-transition"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-tech-white mb-1.5">
                    Brief description of your business
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="What does your business do? Who are your customers?"
                    rows={2}
                    className="w-full px-4 py-2 bg-tech-black border border-tech-baby-blue/30 rounded-lg text-tech-white placeholder-tech-platinum/50 focus:outline-none focus:border-tech-baby-blue smooth-transition resize-none"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFormData({ ...formData, hasLogo: !formData.hasLogo })}
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center smooth-transition ${
                      formData.hasLogo
                        ? 'bg-tech-baby-blue border-tech-baby-blue'
                        : 'border-tech-baby-blue/30 hover:border-tech-baby-blue/60'
                    }`}
                    role="checkbox"
                    aria-checked={formData.hasLogo}
                  >
                    {formData.hasLogo && <Check className="w-4 h-4 text-tech-black" />}
                  </button>
                  <label className="text-sm text-tech-platinum">
                    I have a logo and brand assets ready to provide
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Design Style */}
          {step === 3 && (
            <div>
              <h3 className="text-xl font-bold text-tech-white mb-2">Design preferences</h3>
              <p className="text-tech-platinum mb-4">Choose the look and feel for your website.</p>

              <div className="mb-4">
                <p className="text-sm font-semibold text-tech-white mb-2">Layout Style <span className="text-tech-white">*</span></p>
                <div className="grid grid-cols-2 gap-2">
                  {designStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setFormData({ ...formData, designStyle: style.id })}
                      className={`p-3 rounded-xl border-2 text-left smooth-transition ${
                        formData.designStyle === style.id
                          ? 'border-tech-baby-blue bg-tech-baby-blue/10'
                          : 'border-tech-baby-blue/20 hover:border-tech-baby-blue/50'
                      }`}
                    >
                      <Layout className="w-5 h-5 text-tech-white mb-2" />
                      <p className="text-sm font-bold text-tech-white">{style.label}</p>
                      <p className="text-xs text-tech-platinum mt-1">{style.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-tech-white mb-2">Color Preference</p>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setFormData({ ...formData, colorPreference: option.id })}
                      className={`p-2 rounded-xl border-2 text-center smooth-transition ${
                        formData.colorPreference === option.id
                          ? 'border-tech-baby-blue bg-tech-baby-blue/10'
                          : 'border-tech-baby-blue/20 hover:border-tech-baby-blue/50'
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
                      <p className="text-xs font-semibold text-tech-white">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Features */}
          {step === 4 && (
            <div>
              <h3 className="text-xl font-bold text-tech-white mb-2">Choose your features</h3>
              <p className="text-tech-platinum mb-1">Select all the features you want on your website.</p>
              <p className="text-sm text-tech-white italic mb-4">*Select multiple paid options for discount upon quote*</p>
              <div className="grid grid-cols-2 gap-3">
                {featureOptions.map((feature) => {
                  const isSelected = formData.features.includes(feature.name)
                  if (feature.comingSoon) {
                    return (
                      <div
                        key={feature.name}
                        className="flex items-start gap-3 p-3 rounded-lg border-2 text-left border-tech-baby-blue/10 opacity-60 cursor-not-allowed"
                      >
                        <div className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 border-tech-baby-blue/20" />
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-sm text-tech-white block">{feature.name}</span>
                            <span className="text-xs px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-full font-semibold">
                              Coming Soon
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-tech-white">{feature.price}</span>
                          <span className="text-xs text-green-400 block mt-0.5">{feature.benefit}</span>
                        </div>
                      </div>
                    )
                  }
                  return (
                    <button
                      key={feature.name}
                      onClick={() => toggleFeature(feature.name)}
                      className={`flex items-start gap-3 p-3 rounded-lg border-2 text-left smooth-transition ${
                        isSelected
                          ? 'border-tech-baby-blue bg-tech-baby-blue/10'
                          : 'border-tech-baby-blue/20 hover:border-tech-baby-blue/50'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 smooth-transition mt-0.5 ${
                          isSelected
                            ? 'bg-tech-baby-blue border-tech-baby-blue'
                            : 'border-tech-baby-blue/30'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-tech-black" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm text-tech-white block">{feature.name}</span>
                          {feature.seoBoost && (
                            <TrendingUp className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                          )}
                        </div>
                        <span className="text-xs font-semibold text-tech-white">{feature.price}</span>
                        <span className="text-xs text-green-400 block mt-0.5">{feature.benefit}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 5: Monthly Plan */}
          {step === 5 && (
            <div>
              <h3 className="text-xl font-bold text-tech-white mb-2">Choose your monthly plan</h3>
              <p className="text-tech-platinum mb-4">Select the ongoing support plan that works for you.</p>
              <div className="grid gap-3">
                {monthlyPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setFormData({ ...formData, monthlyPlan: plan.id })}
                    className={`relative flex items-start gap-4 p-4 rounded-xl border-2 text-left smooth-transition ${
                      formData.monthlyPlan === plan.id
                        ? 'border-tech-baby-blue bg-tech-baby-blue/10'
                        : 'border-tech-baby-blue/20 hover:border-tech-baby-blue/50'
                    }`}
                  >
                    <div className="w-10 h-10 bg-tech-baby-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-5 h-5 text-tech-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                        <h4 className="text-lg font-bold text-tech-white">{plan.name}</h4>
                        <span className="text-tech-white font-bold text-sm">{plan.price}</span>
                      </div>
                      <p className="text-sm text-tech-platinum mb-2">{plan.description}</p>
                      <ul className="grid gap-1">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-tech-platinum">
                            <div className="w-1 h-1 bg-tech-baby-blue rounded-full flex-shrink-0 mt-1.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {formData.monthlyPlan === plan.id && (
                      <Check className="w-5 h-5 text-tech-white flex-shrink-0 mt-1" />
                    )}
                  </button>
                ))}
              </div>

              {/* AI Integration custom input */}
              {formData.monthlyPlan === 'ai-integration' && (
                <div className="mt-4 p-4 bg-tech-black border border-tech-baby-blue/30 rounded-xl">
                  <h4 className="text-base font-bold text-tech-white mb-2">What would you like to automate?</h4>
                  <p className="text-sm text-tech-platinum mb-3">
                    Tell us about your automation needs. Here are some suggestions:
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, aiAutomationRequest: '24/7 AI Customer Support' })}
                      className="px-3 py-1.5 text-xs bg-tech-baby-blue/10 border border-tech-baby-blue/30 text-tech-white rounded-lg smooth-transition hover:bg-tech-baby-blue/20"
                    >
                      24/7 AI Customer Support
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, aiAutomationRequest: 'Automated Social Media Posting' })}
                      className="px-3 py-1.5 text-xs bg-tech-baby-blue/10 border border-tech-baby-blue/30 text-tech-white rounded-lg smooth-transition hover:bg-tech-baby-blue/20"
                    >
                      Automated Social Media Posting
                    </button>
                  </div>
                  <textarea
                    value={formData.aiAutomationRequest}
                    onChange={(e) => setFormData({ ...formData, aiAutomationRequest: e.target.value })}
                    placeholder="Describe what you want to automate..."
                    rows={3}
                    className="w-full px-4 py-2 bg-tech-gray border border-tech-baby-blue/30 rounded-lg text-tech-white placeholder-tech-platinum/50 focus:outline-none focus:border-tech-baby-blue smooth-transition resize-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 6: Contact Info */}
          {step === 6 && (
            <div>
              <h3 className="text-xl font-bold text-tech-white mb-2">Your contact details</h3>
              <p className="text-tech-platinum mb-4">How can we reach you to discuss your project?</p>
              <div className="grid gap-3">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-semibold text-tech-white mb-1.5">
                    Full Name <span className="text-tech-white">*</span>
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-2 bg-tech-black border border-tech-baby-blue/30 rounded-lg text-tech-white placeholder-tech-platinum/50 focus:outline-none focus:border-tech-baby-blue smooth-transition"
                  />
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-semibold text-tech-white mb-1.5">
                    Email Address <span className="text-tech-white">*</span>
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full px-4 py-2 bg-tech-black border border-tech-baby-blue/30 rounded-lg text-tech-white placeholder-tech-platinum/50 focus:outline-none focus:border-tech-baby-blue smooth-transition"
                  />
                </div>
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-semibold text-tech-white mb-1.5">
                    Phone Number
                  </label>
                  <input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    placeholder="Optional"
                    className="w-full px-4 py-2 bg-tech-black border border-tech-baby-blue/30 rounded-lg text-tech-white placeholder-tech-platinum/50 focus:outline-none focus:border-tech-baby-blue smooth-transition"
                  />
                </div>
                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-semibold text-tech-white mb-1.5">
                    Additional Notes
                  </label>
                  <textarea
                    id="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    placeholder="Anything else you'd like us to know?"
                    rows={2}
                    className="w-full px-4 py-2 bg-tech-black border border-tech-baby-blue/30 rounded-lg text-tech-white placeholder-tech-platinum/50 focus:outline-none focus:border-tech-baby-blue smooth-transition resize-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-tech-baby-blue/20 flex-shrink-0">
          {/* Running Total */}
          {calculateRunningTotal(formData) > 0 && (
            <div className="mb-3 p-3 bg-tech-baby-blue/10 border border-tech-baby-blue/30 rounded-lg flex items-center justify-between">
              <span className="text-sm font-medium text-tech-platinum">Estimated Total</span>
              <span className="text-lg font-bold text-tech-white">${calculateRunningTotal(formData).toLocaleString()} AUD</span>
            </div>
          )}
          {submitError && (
            <div className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {submitError}
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              onClick={step === 1 ? handleClose : handleBack}
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2.5 border border-tech-baby-blue/30 text-tech-platinum rounded-lg font-medium smooth-transition hover:border-tech-baby-blue hover:text-tech-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              {step === 1 ? 'Cancel' : 'Back'}
            </button>
            {step < TOTAL_STEPS ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-2.5 bg-tech-baby-blue text-tech-black rounded-lg font-semibold smooth-transition hover:bg-tech-baby-blue-light disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || submitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-tech-baby-blue text-tech-black rounded-lg font-semibold smooth-transition hover:bg-tech-baby-blue-light disabled:opacity-40 disabled:cursor-not-allowed"
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
