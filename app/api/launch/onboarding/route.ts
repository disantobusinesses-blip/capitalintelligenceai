import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const MAX_LOGO_SIZE = 5 * 1024 * 1024 // 5MB

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(request: NextRequest) {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 })
  }

  const getField = (name: string) => {
    const value = formData.get(name)
    return typeof value === 'string' ? value.trim() : ''
  }

  const fullName = getField('fullName')
  const businessName = getField('businessName')
  const email = getField('email')
  const phone = getField('phone')
  const abn = getField('abn')
  const industry = getField('industry')
  const colours = getField('colours')
  const tagline = getField('tagline')
  const services = getField('services')
  const notes = getField('notes')
  const template = getField('template')
  const goLiveDate = getField('goLiveDate')
  const hostingPlan = getField('hostingPlan')

  if (!fullName) {
    return NextResponse.json({ ok: false, message: 'Full name is required.' }, { status: 400 })
  }
  if (!businessName) {
    return NextResponse.json({ ok: false, message: 'Business name is required.' }, { status: 400 })
  }
  if (!email) {
    return NextResponse.json({ ok: false, message: 'Email is required.' }, { status: 400 })
  }
  if (!phone) {
    return NextResponse.json({ ok: false, message: 'Phone is required.' }, { status: 400 })
  }
  if (!industry) {
    return NextResponse.json({ ok: false, message: 'Industry is required.' }, { status: 400 })
  }
  if (!services) {
    return NextResponse.json({ ok: false, message: 'List of services is required.' }, { status: 400 })
  }

  // Optional logo upload
  let logoAttachment: { filename: string; content: Buffer } | null = null
  const logo = formData.get('logo')
  if (logo instanceof File && logo.size > 0) {
    if (logo.size > MAX_LOGO_SIZE) {
      return NextResponse.json(
        { ok: false, message: 'Logo file is too large (max 5MB).' },
        { status: 400 }
      )
    }
    if (!logo.type.startsWith('image/')) {
      return NextResponse.json(
        { ok: false, message: 'Logo must be an image file.' },
        { status: 400 }
      )
    }
    logoAttachment = {
      filename: logo.name || 'logo',
      content: Buffer.from(await logo.arrayBuffer()),
    }
  }

  const SMTP_HOST = process.env.SMTP_HOST
  const SMTP_PASS = process.env.SMTP_PASS
  const SMTP_USER = process.env.GMAIL_USER || process.env.SMTP_USER
  const SMTP_PORT = process.env.SMTP_PORT || '465'
  const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER

  if (!SMTP_HOST || !SMTP_PASS || !SMTP_USER) {
    console.error('SMTP not configured — onboarding submission logged only')
    return NextResponse.json({ ok: true })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    const htmlBody = `
      <p style="background:#FFF4E5;border:1px solid #F0C36D;border-radius:6px;padding:10px 14px;font-weight:bold;color:#8A5A00;">
        ⚠️ 10% DEPOSIT INCENTIVE APPLIES — apply 10% discount when invoicing the final build balance.
      </p>
      <h2>New Launch My Site Onboarding — ${esc(businessName)}</h2>
      <h3>Order Details</h3>
      <ul>
        <li><strong>Selected Template:</strong> ${esc(template || 'Not provided')}</li>
        <li><strong>Go Live Date:</strong> ${esc(goLiveDate || 'Not provided')}</li>
        <li><strong>Hosting Plan:</strong> ${esc(hostingPlan || 'Not provided')}</li>
      </ul>
      <h3>Contact Details</h3>
      <ul>
        <li><strong>Full Name:</strong> ${esc(fullName)}</li>
        <li><strong>Business Name:</strong> ${esc(businessName)}</li>
        <li><strong>Email:</strong> ${esc(email)}</li>
        <li><strong>Phone:</strong> ${esc(phone)}</li>
        <li><strong>ABN:</strong> ${esc(abn || 'Not provided')}</li>
        <li><strong>Industry:</strong> ${esc(industry)}</li>
      </ul>
      <h3>Branding</h3>
      <ul>
        <li><strong>Preferred Colours:</strong> ${esc(colours || 'Not provided')}</li>
        <li><strong>Tagline:</strong> ${esc(tagline || 'Not provided')}</li>
        <li><strong>Logo:</strong> ${logoAttachment ? `Attached (${esc(logoAttachment.filename)})` : 'Not provided'}</li>
      </ul>
      <h3>Services</h3>
      <p>${esc(services).replace(/\n/g, '<br/>')}</p>
      ${notes ? `<h3>Additional Notes</h3><p>${esc(notes).replace(/\n/g, '<br/>')}</p>` : ''}
    `

    await transporter.sendMail({
      from: SMTP_FROM,
      to: 'sales@intelligentaisystem.com',
      replyTo: email,
      subject: `New Launch My Site Onboarding — ${businessName}`,
      html: htmlBody,
      attachments: logoAttachment ? [logoAttachment] : [],
    })

    // Confirmation email to the customer so they know their details were received.
    const customerHtmlBody = `
      <h2>Thanks ${esc(fullName)} — we&rsquo;ve got your details!</h2>
      <p>Your onboarding details for <strong>${esc(businessName)}</strong> have been received and our team is starting on your build.</p>
      <h3>Your Order</h3>
      <ul>
        <li><strong>Selected build:</strong> ${esc(template || 'Not provided')}</li>
        <li><strong>Hosting plan:</strong> ${esc(hostingPlan || 'Not provided')}</li>
        <li><strong>Go live date:</strong> ${esc(goLiveDate || 'Not provided')}</li>
      </ul>
      <h3>Your Details</h3>
      <ul>
        <li><strong>Name:</strong> ${esc(fullName)}</li>
        <li><strong>Email:</strong> ${esc(email)}</li>
        <li><strong>Phone:</strong> ${esc(phone)}</li>
        <li><strong>Business:</strong> ${esc(businessName)}</li>
      </ul>
      <p>We&rsquo;ll be in touch shortly from sales@intelligentaisystem.com to confirm everything before your go live date. If anything looks wrong, just reply to this email or call us on 03 7051 0100.</p>
      <br>
      <p>Best regards,<br>The IAS Team<br>Intelligent AI Systems</p>
    `

    await transporter.sendMail({
      from: SMTP_FROM,
      to: email,
      subject: `We've received your details — Intelligent AI Systems`,
      html: customerHtmlBody,
    })
  } catch (err) {
    console.error('Onboarding email send failed:', err)
    return NextResponse.json(
      { ok: false, message: 'We could not send your details. Please try again or email sales@intelligentaisystem.com.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}
