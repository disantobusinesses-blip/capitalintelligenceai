'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, ShieldCheck, Loader2, CreditCard, Clock } from 'lucide-react'
import FlowTrustStrip from '@/components/FlowTrustStrip'

const DEPOSIT_LABEL = '$200 refundable deposit'

function SecureSpotContent() {
  const params = useSearchParams()
  const service = params.get('service') ?? ''
  const canceled = params.get('canceled') === '1'

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSecure = async () => {
    if (loading) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/secure-spot/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service }),
      })
      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url
        return
      }
      setError(data.error || 'Unable to start checkout. Please try again.')
    } catch {
      setError('Something went wrong. Please try again or email sales@intelligentaisystem.com.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[100dvh] bg-[#F8F7F4] text-[#1A1A1A] flex items-center justify-center px-5 py-20 pt-[120px]">
      <div className="w-full max-w-lg">
        {/* Always-on confirmation — their details are captured regardless of
            whatever happens with the deposit below. */}
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15 border border-green-500/30">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Thanks — we&apos;ve got your details</h1>
          <p className="text-[#6B6560] leading-relaxed max-w-md mx-auto">
            Your request is in and our team will be in touch within 1 hour. Want to jump the queue?
            Secure your spot below with a fully refundable deposit.
          </p>
        </div>

        {/* Deposit card */}
        <div className="mt-8 rounded-2xl border border-[#E8E4DF] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="h-5 w-5 text-[#5C3D2E]" />
            <h2 className="text-xl font-bold">Secure Your Spot</h2>
          </div>
          <p className="text-sm text-[#6B6560] mb-5">
            Lock in your place in our build queue with a {DEPOSIT_LABEL}. It comes straight off your
            final invoice — and if we&apos;re not the right fit, you get it back in full.
          </p>

          <ul className="space-y-2.5 mb-6">
            {[
              'Fully refundable — no risk',
              'Comes off your final build invoice',
              'Priority position in our build queue',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>

          {canceled && (
            <div className="mb-4 rounded-lg bg-[#FFF4E5] border border-[#F0C36D] px-4 py-3 text-sm text-[#8A5A00]">
              No worries — your details are still saved and we&apos;ll be in touch. You can secure your
              spot any time.
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleSecure}
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-[#1A1A1A] px-8 py-4 font-bold text-white transition-colors duration-200 hover:bg-[#2D2D2D] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Redirecting to Stripe…
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" />
                Secure my spot — {DEPOSIT_LABEL}
              </>
            )}
          </button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-[#9E9790]">
            <Clock className="w-3.5 h-3.5" />
            Secure checkout by Stripe · refundable any time
          </p>

          <Link
            href="/"
            className="mt-4 block text-center text-sm font-semibold text-[#6B6560] underline-offset-2 hover:underline"
          >
            No thanks, I&apos;ll wait for your call
          </Link>
        </div>

        {/* Pricing + social proof */}
        <div className="mt-6">
          <FlowTrustStrip />
        </div>
      </div>
    </main>
  )
}

export default function SecureSpotPage() {
  return (
    <Suspense fallback={null}>
      <SecureSpotContent />
    </Suspense>
  )
}
