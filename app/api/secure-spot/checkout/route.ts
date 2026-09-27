import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { getClientIp, runSpamChecks, logSubmission, BLOCKED_RESPONSE, RATE_LIMITED_RESPONSE } from '@/lib/spamGuard'

// Secure Your Spot, takes the same refundable $200 deposit as the launch
// flow (Stripe price STRIPE_PRICE_DEPOSIT). This is an optional upsell after a
// lead submits their details; their enquiry is already captured and emailed, so
// nothing here gates the lead or the conversion event.
export async function POST(req: NextRequest) {
  const ip = getClientIp(req)

  // No honeypot here: this route has no typed-content form of its own, it's
  // a button click after the real enquiry was already captured elsewhere.
  // Still worth the blocklist and rate-limit checks, since it's a public
  // POST endpoint that creates real Stripe checkout sessions.
  const spamCheck = await runSpamChecks(ip, undefined)
  if (spamCheck === 'blocked') {
    return NextResponse.json(BLOCKED_RESPONSE, { status: 403 })
  }
  if (spamCheck === 'rate-limited') {
    return NextResponse.json(RATE_LIMITED_RESPONSE, { status: 429 })
  }

  try {
    let service = ''
    try {
      const body = await req.json()
      if (typeof body?.service === 'string') service = body.service
    } catch {
      // No body is fine, the deposit is generic.
    }

    const depositPriceId = process.env.STRIPE_PRICE_DEPOSIT
    if (!process.env.STRIPE_SECRET_KEY || !depositPriceId) {
      return NextResponse.json(
        { error: 'Payment is not configured. Please contact us.' },
        { status: 500 }
      )
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://intelligentaisystem.com'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: depositPriceId, quantity: 1 }],
      success_url: `${baseUrl}/thank-you?deposit=1`,
      cancel_url: `${baseUrl}/secure-spot?canceled=1`,
      metadata: {
        flow: 'secure_your_spot',
        service: service || 'Not specified',
      },
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
    })

    await logSubmission({
      source: 'secure-spot-checkout',
      ip,
      userAgent: req.headers.get('user-agent'),
      payload: { service },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Secure-spot checkout error:', err)
    return NextResponse.json(
      { error: 'Unable to start checkout. Please try again.' },
      { status: 500 }
    )
  }
}
