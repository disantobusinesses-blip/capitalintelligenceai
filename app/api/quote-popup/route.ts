import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface QuotePopupBody {
  name: string
  email: string
  phone: string
  service?: string
  message?: string
  /** Optional add-ons selected in the collapsed "Interested in add-ons?" section. */
  addons?: unknown
  /** Blog frequency tier — only meaningful when 'SEO Blog Content' is in addons. */
  blogTier?: unknown
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
  let body: QuotePopupBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 })
  }

  // Validation — only name, email and phone are required. The business
  // description is optional so it never blocks a submission.
  if (!body.name?.trim()) {
    return NextResponse.json({ ok: false, message: 'Name is required.' }, { status: 400 })
  }
  if (!body.email || !EMAIL_RE.test(body.email.trim())) {
    return NextResponse.json({ ok: false, message: 'A valid email address is required.' }, { status: 400 })
  }
  if (!body.phone?.trim()) {
    return NextResponse.json({ ok: false, message: 'Phone number is required.' }, { status: 400 })
  }

  // SMTP configuration — mirrors the onboarding route so GMAIL_USER / SMTP_USER
  // both work and existing email delivery is never broken.
  const SMTP_HOST = process.env.SMTP_HOST
  const SMTP_PASS = process.env.SMTP_PASS
  const SMTP_USER = process.env.GMAIL_USER || process.env.SMTP_USER
  const SMTP_PORT = process.env.SMTP_PORT || '465'
  const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER

  if (!SMTP_HOST || !SMTP_PASS || !SMTP_USER) {
    console.error('SMTP not configured — quote request logged only')
    // Still return success so the visitor is not blocked.
    return NextResponse.json({ ok: true })
  }

  // Add-ons are optional and client-supplied — validate shape defensively
  // rather than trusting the request body.
  const addons: string[] = Array.isArray(body.addons)
    ? body.addons.filter((a): a is string => typeof a === 'string' && a.trim() !== '')
    : []
  const blogTier = typeof body.blogTier === 'string' && body.blogTier.trim() !== '' ? body.blogTier.trim() : null

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    const addonsHtml = addons.length
      ? `
      <h3>Add-Ons Requested</h3>
      <ul>
        ${addons
          .map((addon) => {
            const tierSuffix = addon === 'SEO Blog Content' && blogTier ? ` — ${esc(blogTier)}` : ''
            return `<li><strong>${esc(addon)}</strong>${tierSuffix}</li>`
          })
          .join('')}
      </ul>
    `
      : ''

    const htmlBody = `
      <h2>🔔 New Quote Request — ${esc(body.name)}</h2>
      <h3>Contact Details</h3>
      <ul>
        <li><strong>Name:</strong> ${esc(body.name)}</li>
        <li><strong>Email:</strong> ${esc(body.email)}</li>
        <li><strong>Phone:</strong> ${esc(body.phone)}</li>
        <li><strong>Service Needed:</strong> ${esc(body.service?.trim() || 'Not specified')}</li>
      </ul>
      <h3>About Their Business</h3>
      <p>${body.message?.trim() ? esc(body.message.trim()).replace(/\n/g, '<br/>') : '<em>Not provided</em>'}</p>
      ${addonsHtml}
    `

    await transporter.sendMail({
      from: SMTP_FROM,
      to: 'sales@intelligentaisystem.com',
      replyTo: body.email.trim(),
      subject: `🔔 New Quote Request — ${body.name.trim()}`,
      html: htmlBody,
    })
  } catch (err) {
    console.error('Quote request email send failed:', err)
    // Still return success so the visitor is not blocked.
  }

  return NextResponse.json({ ok: true })
}
