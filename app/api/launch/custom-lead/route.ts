import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface CustomLeadBody {
  name: string
  email: string
  phone: string
  tier?: string
  goLiveDate?: string
  hostingPlan?: string
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
  let body: CustomLeadBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 })
  }

  if (!body.name?.trim()) {
    return NextResponse.json({ ok: false, message: 'Name is required.' }, { status: 400 })
  }
  if (!body.email || !EMAIL_RE.test(body.email.trim())) {
    return NextResponse.json({ ok: false, message: 'A valid email address is required.' }, { status: 400 })
  }
  if (!body.phone?.trim()) {
    return NextResponse.json({ ok: false, message: 'Phone number is required.' }, { status: 400 })
  }

  const SMTP_HOST = process.env.SMTP_HOST
  const SMTP_PASS = process.env.SMTP_PASS
  const SMTP_USER = process.env.GMAIL_USER || process.env.SMTP_USER
  const SMTP_PORT = process.env.SMTP_PORT || '465'
  const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER

  if (!SMTP_HOST || !SMTP_PASS || !SMTP_USER) {
    console.error('SMTP not configured — custom lead logged only')
    // Never block the user from proceeding to checkout.
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
      <h2>📋 New Custom Site Lead (Pre-Payment) — ${esc(body.name)}</h2>
      <p><em>This lead submitted their contact details before reaching Stripe checkout.
      Follow up even if no payment comes through.</em></p>
      <h3>Contact Details</h3>
      <ul>
        <li><strong>Name:</strong> ${esc(body.name)}</li>
        <li><strong>Email:</strong> ${esc(body.email)}</li>
        <li><strong>Phone:</strong> ${esc(body.phone)}</li>
        <li><strong>Custom Tier Selected:</strong> ${esc(body.tier?.trim() || 'Not specified')}</li>
        ${body.hostingPlan ? `<li><strong>Hosting Plan:</strong> ${esc(body.hostingPlan)}</li>` : ''}
        ${body.goLiveDate ? `<li><strong>Go Live Date:</strong> ${esc(body.goLiveDate)}</li>` : ''}
      </ul>
    `

    await transporter.sendMail({
      from: SMTP_FROM,
      to: 'sales@intelligentaisystem.com',
      replyTo: body.email.trim(),
      subject: `📋 New Custom Site Lead (Pre-Payment) — ${body.name.trim()}`,
      html: htmlBody,
    })
  } catch (err) {
    console.error('Custom lead email send failed:', err)
    // Never block the user from proceeding to checkout.
  }

  return NextResponse.json({ ok: true })
}
