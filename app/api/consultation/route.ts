import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(request: NextRequest) {
  let body: { name?: string; phone?: string; time?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 })
  }

  if (!body.name?.trim()) {
    return NextResponse.json({ ok: false, message: 'Name is required.' }, { status: 400 })
  }
  if (!body.phone?.trim()) {
    return NextResponse.json({ ok: false, message: 'Phone number is required.' }, { status: 400 })
  }
  if (!body.time?.trim()) {
    return NextResponse.json({ ok: false, message: 'Preferred time is required.' }, { status: 400 })
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    console.error('SMTP not configured — consultation logged only')
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
      <h2>New Consultation Booking — ${esc(body.name.trim())}</h2>
      <ul>
        <li><strong>Name:</strong> ${esc(body.name.trim())}</li>
        <li><strong>Phone:</strong> ${esc(body.phone.trim())}</li>
        <li><strong>Preferred Call Time:</strong> ${esc(body.time.trim())}</li>
      </ul>
      <p>This is a free 15-minute phone call consultation request. Please call the client at their preferred time.</p>
    `

    await transporter.sendMail({
      from: SMTP_FROM,
      to: 'sales@intelligentaisystem.com',
      subject: `New Consultation Booking — ${body.name.trim()}`,
      html: htmlBody,
    })
  } catch (err) {
    console.error('Email send failed:', err)
    // Still return success so user is not blocked
  }

  return NextResponse.json({ ok: true })
}
