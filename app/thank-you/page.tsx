'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Mail, Clock, ArrowRight } from 'lucide-react'

const planNames: Record<string, string> = {
  landing_page: 'Landing Page',
  website_care: 'Website Hosting Plan',
  google_growth: 'Google Growth Plan',
  super_growth: 'Super Growth Plan',
  market_authority: 'Market Authority Plan',
}

function ThankYouContent() {
  const params = useSearchParams()
  const plan = params.get('plan') ?? ''
  const planName = planNames[plan] ?? 'your plan'

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-emerald-400" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">You&apos;re in! 🎉</h1>
        <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
          Thank you for purchasing{' '}
          <span className="text-white font-semibold">{planName}</span>.
          <br />
          We&apos;ll be in touch within 24 hours to get started.
        </p>

        {/* Next Steps */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 mb-8 text-left space-y-4">
          <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-widest mb-4">What happens next</h3>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            <p className="text-sm text-zinc-400">
              A <span className="text-white">confirmation email</span> is on its way to your inbox from Stripe.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            <p className="text-sm text-zinc-400">
              Our team will <span className="text-white">contact you within 24 hours</span> to kick off your project.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <ArrowRight className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            <p className="text-sm text-zinc-400">
              Questions? Email us at{' '}
              <a
                href="mailto:sales@intelligentaisystem.com"
                className="text-white underline hover:text-emerald-400 transition-colors"
              >
                sales@intelligentaisystem.com
              </a>
            </p>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-100 transition-colors"
        >
          Back to Home
          <ArrowRight className="w-4 h-4" />
        </Link>

        <p className="text-zinc-600 text-xs mt-6">
          Payment processed securely by Stripe
        </p>
      </div>
    </main>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <ThankYouContent />
    </Suspense>
  )
}
