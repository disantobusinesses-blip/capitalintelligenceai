import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, url } = await req.json()

    if (!name || !email || !url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Simple email check: local@domain.tld (no catastrophic backtracking)
    const emailRegex = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const safeName = escapeHtml(String(name))
    const safeEmail = escapeHtml(String(email))
    const safeUrl = escapeHtml(String(url))

    const smtpPort = parseInt(process.env.SMTP_PORT || '465')
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 8000,
    })

    try {
      // Send both emails in parallel to stay within serverless function time limits
      await Promise.all([
        // Notify the IAS team
        transporter.sendMail({
          from: `"IAS Website" <${process.env.SMTP_USER}>`,
          to: 'sales@intelligentaisystem.com',
          subject: `Free Audit Request – ${safeName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1A1A1A; border-bottom: 2px solid #1A1A1A; padding-bottom: 12px;">
                New Free Audit Request
              </h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 12px; background: #f5f5f5; font-weight: bold; width: 140px;">Name</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">Email</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;">${safeEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">Website URL</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;">
                    <a href="${safeUrl}" style="color: #1A1A1A;">${safeUrl}</a>
                  </td>
                </tr>
              </table>
              <p style="margin-top: 24px; color: #666; font-size: 14px;">
                Submitted via intelligentaisystem.com/contact
              </p>
            </div>
          `,
        }),
        // Auto-reply to the visitor
        transporter.sendMail({
          from: `"Intelligent AI Systems" <${process.env.SMTP_USER}>`,
          to: email,
          subject: 'We received your free audit request',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1A1A1A;">Hi ${safeName}, thanks for reaching out!</h2>
              <p style="color: #444; line-height: 1.6;">
                We've received your free website audit request for <strong>${safeUrl}</strong>.
              </p>
              <p style="color: #444; line-height: 1.6;">
                Our team will review your website and get back to you within 1–2 business days 
                with a personalised audit covering SEO, performance, design, and AI opportunities.
              </p>
              <p style="color: #444; line-height: 1.6;">
                In the meantime, feel free to explore our work at 
                <a href="https://intelligentaisystem.com/projects" style="color: #1A1A1A;">intelligentaisystem.com</a>.
              </p>
              <br/>
              <p style="color: #666; font-size: 14px;">— The IAS Team</p>
            </div>
          `,
        }),
      ])
    } finally {
      transporter.close()
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Audit request error:', error)
    return NextResponse.json({ error: 'Failed to send request' }, { status: 500 })
  }
}
