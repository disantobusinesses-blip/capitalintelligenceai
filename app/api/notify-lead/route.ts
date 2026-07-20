import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createClient } from '@supabase/supabase-js'

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: NextRequest) {
  let body: Record<string, string>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 })
  }

  // Insert into Supabase cig_leads table
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey)
      await supabase.from('cig_leads').insert({
        ...body,
        created_at: new Date().toISOString(),
      })
    } catch (err) {
      console.error('Supabase insert error:', err)
    }
  }

  // Send email notification
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    console.error('SMTP not configured, lead logged to Supabase only')
    return NextResponse.json({ ok: true })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 8000,
    })

    const source = body.source || 'unknown'
    const isTradie = source === 'free-tradie-website'

    const rows = Object.entries(body)
      .filter(([k]) => k !== 'source')
      .map(([k, v]) => `<li><strong>${esc(k.replace(/_/g, ' '))}:</strong> ${esc(String(v))}</li>`)
      .join('')

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0A0F1E; border-bottom: 2px solid #2563EB; padding-bottom: 12px;">
          New Lead, ${esc(isTradie ? 'Free Tradie Website' : 'Free Website + SEO')}
        </h2>
        <ul style="line-height: 1.8;">${rows}</ul>
        <p style="color: #666; font-size: 13px; margin-top: 20px;">
          Source: ${esc(source)} · ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })}
        </p>
      </div>
    `

    try {
      await transporter.sendMail({
        from: SMTP_FROM,
        to: 'disantobusinesses@gmail.com',
        subject: `New Lead, ${isTradie ? 'Free Tradie Website' : 'Free Website + SEO'} (${esc(body.name || 'Unknown')})`,
        html: htmlBody,
      })
    } finally {
      transporter.close()
    }
  } catch (err) {
    console.error('Email send failed:', err)
    // Still return success so the user experience is not blocked
  }

  return NextResponse.json({ ok: true })
}
