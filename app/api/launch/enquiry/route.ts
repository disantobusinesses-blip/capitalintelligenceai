import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function esc(str: string): string {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface EnquiryPayload {
  paths: string[]
  website?: {
    choice?: string
    template?: string
    industry?: string
    goal?: string
    goLiveDate?: string
    hasLogo?: boolean
  } | null
  google?: { businessName?: string; suburb?: string; existing?: string } | null
  leads?: { industry?: string; volume?: string; challenge?: string } | null
  seo?: { businessName?: string; topics?: string; plan?: string } | null
  contact: { name?: string; email?: string; phone?: string }
}

function row(label: string, value?: string | null): string {
  if (!value) return ''
  return `<tr><td style="padding:6px 12px;border:1px solid #E8E4DF;font-weight:600;background:#F8F7F4;">${esc(
    label
  )}</td><td style="padding:6px 12px;border:1px solid #E8E4DF;">${esc(value)}</td></tr>`
}

export async function POST(request: NextRequest) {
  let body: EnquiryPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 })
  }

  const contact = body.contact || {}
  const name = (contact.name || '').trim()
  const email = (contact.email || '').trim()
  const phone = (contact.phone || '').trim()

  if (!name) {
    return NextResponse.json({ ok: false, message: 'Name is required.' }, { status: 400 })
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, message: 'A valid email is required.' }, { status: 400 })
  }
  if (!phone) {
    return NextResponse.json({ ok: false, message: 'Phone is required.' }, { status: 400 })
  }

  const paths = Array.isArray(body.paths) ? body.paths : []
  const businessName =
    body.google?.businessName?.trim() || body.seo?.businessName?.trim() || name

  // SMTP setup mirrors the existing onboarding route.
  const SMTP_HOST = process.env.SMTP_HOST
  const SMTP_PASS = process.env.SMTP_PASS
  const SMTP_USER = process.env.GMAIL_USER || process.env.SMTP_USER
  const SMTP_PORT = process.env.SMTP_PORT || '465'
  const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER

  if (!SMTP_HOST || !SMTP_PASS || !SMTP_USER) {
    console.error('SMTP not configured, launch enquiry logged only', {
      paths,
      businessName,
      email,
    })
    return NextResponse.json({ ok: true })
  }

  const timestamp = new Date().toLocaleString('en-AU', {
    timeZone: 'Australia/Melbourne',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const websiteSection = body.website
    ? `<h3>Website</h3><table style="border-collapse:collapse;font-size:14px;">
        ${row('Website choice', body.website.choice)}
        ${row('Template', body.website.template)}
        ${row('Industry', body.website.industry)}
        ${row('Goal', body.website.goal)}
        ${row('Go live date', body.website.goLiveDate)}
        ${row('Logo uploaded', body.website.hasLogo ? 'Yes' : 'No')}
      </table>`
    : ''

  const googleSection = body.google
    ? `<h3>Google Business Profile</h3><table style="border-collapse:collapse;font-size:14px;">
        ${row('Business name', body.google.businessName)}
        ${row('Suburb / area', body.google.suburb)}
        ${row('Existing profile', body.google.existing)}
      </table>`
    : ''

  const leadsSection = body.leads
    ? `<h3>More Leads</h3><table style="border-collapse:collapse;font-size:14px;">
        ${row('Target industry', body.leads.industry)}
        ${row('Leads / month', body.leads.volume)}
        ${row('Biggest challenge', body.leads.challenge)}
      </table>`
    : ''

  const seoSection = body.seo
    ? `<h3>SEO Blogs</h3><table style="border-collapse:collapse;font-size:14px;">
        ${row('Business name', body.seo.businessName)}
        ${row('Topics', body.seo.topics)}
        ${row('Plan', body.seo.plan)}
      </table>`
    : ''

  const htmlBody = `
    <h2>New IAS Enquiry, ${esc(businessName)}</h2>
    <p><strong>Services requested:</strong> ${esc(paths.join(', ') || 'Not specified')}</p>
    ${websiteSection}
    ${googleSection}
    ${leadsSection}
    ${seoSection}
    <h3>Contact</h3>
    <table style="border-collapse:collapse;font-size:14px;">
      ${row('Name', name)}
      ${row('Email', email)}
      ${row('Phone', phone)}
      ${row('Submitted', timestamp)}
    </table>
  `

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    await transporter.sendMail({
      from: SMTP_FROM,
      to: 'sales@intelligentaisystem.com',
      replyTo: email,
      subject: `New IAS Enquiry, ${paths.join(', ') || 'General'}, ${businessName}`,
      html: htmlBody,
    })

    // Confirmation to the customer.
    await transporter.sendMail({
      from: SMTP_FROM,
      to: email,
      subject: `We've received your enquiry, Intelligent AI Systems`,
      html: `
        <h2>Thanks ${esc(name)}, we&rsquo;ve got it!</h2>
        <p>Your enquiry for <strong>${esc(businessName)}</strong> has landed with our team and we&rsquo;ll be in touch within the hour.</p>
        <p><strong>Services requested:</strong> ${esc(paths.join(', ') || 'Not specified')}</p>
        <p>If anything is urgent, reply to this email or call us on 03 7051 0100.</p>
        <br>
        <p>Best regards,<br>The IAS Team<br>Intelligent AI Systems</p>
      `,
    })
  } catch (err) {
    console.error('Launch enquiry email failed:', err)
    return NextResponse.json(
      {
        ok: false,
        message:
          'We could not send your enquiry. Please try again or email sales@intelligentaisystem.com.',
      },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}
