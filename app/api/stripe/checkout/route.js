import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_MAP = {
  landing_page:     process.env.STRIPE_PRICE_LANDING_PAGE,
  website_care:     process.env.STRIPE_PRICE_WEBSITE_CARE,
  google_growth:    process.env.STRIPE_PRICE_GOOGLE_GROWTH,
  super_growth:     process.env.STRIPE_PRICE_SUPER_GROWTH,
  market_authority: process.env.STRIPE_PRICE_MARKET_AUTHORITY,
};

const RECURRING_PLANS = ["website_care","google_growth","super_growth","market_authority"];

export async function POST(req) {
  try {
    const { planKey, currency } = await req.json();
    const priceId = PRICE_MAP[planKey];
    if (!priceId) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    const isRecurring = RECURRING_PLANS.includes(planKey);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://intelligentaisystem.com";
    const session = await stripe.checkout.sessions.create({
      mode: isRecurring ? "subscription" : "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/thank-you?plan=${planKey}`,
      cancel_url: `${baseUrl}/pricing`,
      metadata: { planKey, displayCurrency: currency },
      allow_promotion_codes: true,
      billing_address_collection: "required",
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
