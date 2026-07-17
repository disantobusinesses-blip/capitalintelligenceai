import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface QuoteFormData {
  // New form fields
  services?: string
  addOns?: string
  hostingPlan?: string
  seoPackage?: string
  budget?: string
  message?: string
  // Legacy form fields (keep for backward compatibility)
  websiteType?: 'landing' | 'full' | null
  colourDirection?: string
  colourLabel?: string
  seoPlan?: string
  seoPrice?: number
  notes?: string
  // Common fields
  name: string
  businessName: string
  email: string
  phone?: string
}

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  let body: QuoteFormData
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 })
  }

  // Validate required fields
  if (!body.name?.trim()) {
    return NextResponse.json({ ok: false, message: 'Name is required.' }, { status: 400 })
  }
  if (!body.businessName?.trim()) {
    return NextResponse.json({ ok: false, message: 'Business name is required.' }, { status: 400 })
  }
  if (!body.email || !EMAIL_RE.test(body.email.trim())) {
    return NextResponse.json({ ok: false, message: 'A valid email address is required.' }, { status: 400 })
  }

  // ── 1. Try Supabase insert ──────────────────────────────────────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    try {
      await fetch(`${supabaseUrl}/rest/v1/quote_requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          name: body.name.trim(),
          business_name: body.businessName.trim(),
          email: body.email.trim(),
          phone: body.phone?.trim() || null,
          // New form fields
          services: body.services || null,
          add_ons: body.addOns || null,
          seo_package: body.seoPackage || null,
          budget: body.budget || null,
          message: body.message || body.notes?.trim() || null,
          // Legacy fields (backward compatibility)
          website_type: body.websiteType || null,
          colour_direction: body.colourLabel || body.colourDirection || null,
          seo_plan: body.seoPlan || null,
          seo_price: body.seoPrice || 0,
          notes: body.notes?.trim() || null,
        }),
      })
    } catch (err) {
      console.error('Supabase insert failed:', err)
      // Continue — fall through to email
    }
  }

  // ── 2. Send notification email ─────────────────────────────────────────────
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    console.error('SMTP not configured — quote logged only')
    // Still return success so user is not blocked
    return NextResponse.json({ ok: true })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    // Build HTML body - handle both new simplified form and legacy detailed form
    let htmlBody = `
      <h2>New Quote Request — ${esc(body.businessName)}</h2>
      <h3>Contact Details</h3>
      <ul>
        <li><strong>Name:</strong> ${esc(body.name)}</li>
        <li><strong>Email:</strong> ${esc(body.email)}</li>
        ${body.phone ? `<li><strong>Phone:</strong> ${esc(body.phone)}</li>` : ''}
        <li><strong>Business Name:</strong> ${esc(body.businessName)}</li>
      </ul>
    `

    // New form fields (services, budget, addOns, seoPackage)
    const hasServices = body.services && body.services.trim() !== ''
    const hasBudget = body.budget && body.budget.trim() !== ''
    const hasHostingPlan = body.hostingPlan && body.hostingPlan.trim() !== ''

    if (hasServices || hasBudget || hasHostingPlan) {
      htmlBody += `<h3>Quote Details</h3><ul>`
      if (hasServices) {
        htmlBody += `<li><strong>Services Requested:</strong> ${esc(body.services!)}</li>`
      }
      if (hasHostingPlan) {
        htmlBody += `<li><strong>Hosting Plan:</strong> ${esc(body.hostingPlan!)}</li>`
      }
      if (hasBudget) {
        htmlBody += `<li><strong>Estimated Budget:</strong> ${esc(body.budget!)} (+GST)</li>`
      }
      htmlBody += `</ul>`
    }

    // Optional add-ons section
    const hasAddOns = body.addOns && body.addOns.trim() !== ''
    const hasSeoPackage = body.seoPackage && body.seoPackage.trim() !== '' && body.seoPackage !== 'Select an SEO package (optional)'
    
    if (hasAddOns || hasSeoPackage) {
      htmlBody += `<h3>Optional Add-ons</h3><ul>`
      if (hasAddOns) {
        htmlBody += `<li><strong>Hosting Add-on:</strong> ${esc(body.addOns!)}</li>`
      }
      if (hasSeoPackage) {
        htmlBody += `<li><strong>SEO Package:</strong> ${esc(body.seoPackage!)}</li>`
      }
      htmlBody += `</ul>`
    }

    // Legacy detailed quote info if provided (backward compatibility)
    if (body.websiteType) {
      const websiteLabel = body.websiteType === 'landing' ? 'Landing Page' : 'Full Website'
      const seoPlanLabel = (() => {
        switch (body.seoPlan) {
          case 'none': return 'No SEO plan (free blog only)'
          case 'google': return `Google Growth — $299/mo`
          case 'super': return `Super Growth — $359/mo`
          case 'market': return `Market Authority — $799/mo`
          default: return body.seoPlan || 'Not specified'
        }
      })()
      const basePrices: Record<string, number> = { landing: 599, full: 1999 }
      const basePrice = body.websiteType ? basePrices[body.websiteType] ?? 0 : 0

      htmlBody += `
        <h3>Quote Details</h3>
        <ul>
          <li><strong>Website Type:</strong> ${esc(websiteLabel)}</li>
          ${body.colourLabel || body.colourDirection ? `<li><strong>Colour Direction:</strong> ${esc(body.colourLabel || body.colourDirection || '')}</li>` : ''}
          <li><strong>SEO Plan:</strong> ${esc(seoPlanLabel)}</li>
          <li><strong>Free SEO Blog:</strong> Included</li>
          <li><strong>Build from:</strong> $${basePrice.toLocaleString()} AUD${(body.seoPrice || 0) > 0 ? ` + $${body.seoPrice}/mo` : ''}</li>
        </ul>
      `
    }

    // Project details / message
    const messageContent = body.message || body.notes
    if (messageContent) {
      htmlBody += `<h3>Project Details / Message</h3><p>${esc(messageContent)}</p>`
    }

    await transporter.sendMail({
      from: SMTP_FROM,
      to: 'sales@intelligentaisystem.com',
      replyTo: body.email.trim(),
      subject: `New Quote Request — ${body.businessName}`,
      html: htmlBody,
    })
  } catch (err) {
    console.error('Email send failed:', err)
    // Still return success so user is not blocked
  }

  return NextResponse.json({ ok: true })
}
