import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { TEMPLATES, HOSTING_PLANS, CUSTOM_BUDGET_OPTIONS } from '@/lib/templates'

const HOSTING_PRICE_MAP: Record<string, string | undefined> = {
  basic: process.env.STRIPE_PRICE_HOSTING_BASIC,
  updates: process.env.STRIPE_PRICE_HOSTING_UPDATES,
}

export async function POST(req: NextRequest) {
  try {
    const { templateId, tier, hostingPlan, goLiveDate, siteType, budget } = await req.json()

    const isCustom = siteType === 'custom'

    const template = isCustom ? null : TEMPLATES.find((t) => t.id === templateId)
    if (!isCustom && !template) {
      return NextResponse.json({ error: 'Invalid template' }, { status: 400 })
    }

    // Resolve the build tier (e.g. Basic / Premium) when the template offers them.
    const selectedTier =
      template?.tiers?.find((t) => t.id === tier) ?? template?.tiers?.[0] ?? null
    const templateName = template
      ? selectedTier && template.tiers && template.tiers.length > 1
        ? `${template.businessName} (${template.industry}) — ${selectedTier.label}`
        : `${template.businessName} (${template.industry})`
      : ''

    if (
      isCustom &&
      (typeof budget !== 'string' ||
        !(CUSTOM_BUDGET_OPTIONS as readonly string[]).includes(budget))
    ) {
      return NextResponse.json({ error: 'Invalid budget range' }, { status: 400 })
    }

    const hosting = HOSTING_PLANS.find((p) => p.id === hostingPlan)
    if (!hosting) {
      return NextResponse.json({ error: 'Invalid hosting plan' }, { status: 400 })
    }

    if (typeof goLiveDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(goLiveDate)) {
      return NextResponse.json({ error: 'Invalid go live date' }, { status: 400 })
    }

    const depositPriceId = process.env.STRIPE_PRICE_DEPOSIT
    const hostingPriceId = HOSTING_PRICE_MAP[hosting.id]
    if (!process.env.STRIPE_SECRET_KEY || !depositPriceId || !hostingPriceId) {
      return NextResponse.json(
        { error: 'Payment is not configured. Please contact us.' },
        { status: 500 }
      )
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://intelligentaisystem.com'

    const successParams = new URLSearchParams({
      template: isCustom ? 'custom' : template!.id,
      hosting: hosting.id,
      goLiveDate,
    })
    if (isCustom) {
      successParams.set('budget', budget)
    } else if (selectedTier && template!.tiers && template!.tiers.length > 1) {
      successParams.set('tier', selectedTier.id)
    }

    // Subscription mode lets us combine the recurring hosting plan with the
    // one-time $200 deposit in a single checkout session.
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        { price: hostingPriceId, quantity: 1 },
        { price: depositPriceId, quantity: 1 },
      ],
      success_url: `${baseUrl}/launch/onboarding?${successParams.toString()}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/launch`,
      metadata: {
        flow: 'launch_my_site',
        siteType: isCustom ? 'custom' : 'template',
        templateId: isCustom ? 'custom' : template!.id,
        templateName: isCustom ? `Custom Site (${budget})` : templateName,
        tier: isCustom ? '' : (selectedTier?.id ?? ''),
        hostingPlan: hosting.id,
        goLiveDate,
      },
      billing_address_collection: 'required',
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Launch checkout error:', err)
    return NextResponse.json(
      { error: 'Unable to start checkout. Please try again.' },
      { status: 500 }
    )
  }
}
