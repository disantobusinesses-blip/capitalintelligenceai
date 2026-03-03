import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface LeadFormData {
  service: string | null
  businessName: string
  industry: string
  description: string
  designStyle: string
  colorPreference: string
  features: string[]
  monthlyPlan: string
  aiAutomationRequest: string
  contactName: string
  contactEmail: string
  contactPhone: string
  hasLogo: boolean
  additionalNotes: string
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
  try {
    const body: LeadFormData = await request.json()

    // Validate required fields
    if (!body.contactName || !body.contactName.trim()) {
      return NextResponse.json(
        { ok: false, message: 'Contact name is required.' },
        { status: 400 }
      )
    }
    if (!body.contactEmail || !EMAIL_RE.test(body.contactEmail.trim())) {
      return NextResponse.json(
        { ok: false, message: 'A valid contact email is required.' },
        { status: 400 }
      )
    }
    if (!body.businessName || !body.businessName.trim()) {
      return NextResponse.json(
        { ok: false, message: 'Business name is required.' },
        { status: 400 }
      )
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      console.error('SMTP environment variables are not fully configured')
      return NextResponse.json(
        { ok: false, message: 'Server configuration error. Please try again later.' },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })

    const serviceName = body.service === 'landing-page' ? 'Landing Page' : 'Website + Full Package'
    const planName = body.monthlyPlan === 'care'
      ? 'Website Care ($99 AUD/mo)'
      : body.monthlyPlan === 'ai-integration'
        ? 'AI Systems Integration (Custom)'
        : body.monthlyPlan || 'Not selected'

    const htmlBody = `
      <h2>New Lead: ${esc(body.businessName)}</h2>
      <h3>Contact</h3>
      <ul>
        <li><strong>Name:</strong> ${esc(body.contactName)}</li>
        <li><strong>Email:</strong> ${esc(body.contactEmail)}</li>
        ${body.contactPhone ? `<li><strong>Phone:</strong> ${esc(body.contactPhone)}</li>` : ''}
      </ul>
      <h3>Service Details</h3>
      <ul>
        <li><strong>Service:</strong> ${esc(serviceName)}</li>
        <li><strong>Monthly Plan:</strong> ${esc(planName)}</li>
      </ul>
      <h3>Business Information</h3>
      <ul>
        <li><strong>Business Name:</strong> ${esc(body.businessName)}</li>
        <li><strong>Industry:</strong> ${esc(body.industry)}</li>
        ${body.description ? `<li><strong>Description:</strong> ${esc(body.description)}</li>` : ''}
        <li><strong>Has Logo:</strong> ${body.hasLogo ? 'Yes' : 'No'}</li>
      </ul>
      <h3>Design Preferences</h3>
      <ul>
        <li><strong>Style:</strong> ${esc(body.designStyle || 'Not specified')}</li>
        <li><strong>Color:</strong> ${esc(body.colorPreference || 'Not specified')}</li>
      </ul>
      ${Array.isArray(body.features) && body.features.length > 0 ? `
      <h3>Features Requested</h3>
      <ul>${body.features.map((f: string) => `<li>${esc(f)}</li>`).join('')}</ul>
      ` : ''}
      ${body.aiAutomationRequest ? `
      <h3>AI Automation Request</h3>
      <p>${esc(body.aiAutomationRequest)}</p>
      ` : ''}
      ${body.additionalNotes ? `
      <h3>Additional Notes</h3>
      <p>${esc(body.additionalNotes)}</p>
      ` : ''}
    `

    await transporter.sendMail({
      from: SMTP_FROM,
      to: 'sales@intelligentaisystem.com',
      replyTo: body.contactEmail.trim(),
      subject: `New ${serviceName} Inquiry – ${body.businessName}`,
      html: htmlBody,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error processing lead submission:', error)
    return NextResponse.json(
      { ok: false, message: 'Failed to submit form. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}
