import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const transporter = nodemailer.createTransport({ host: 'smtp.gmail.com', port: 465, secure: true, auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD } })

export async function POST(req: NextRequest) {
  const { leadId, subject, body } = await req.json()
  if (!leadId || !subject || !body) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const { data: lead } = await supabase.from('crm_leads').select('*').eq('id', leadId).single()
  if (!lead) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!lead.email) return NextResponse.json({ error: 'No email' }, { status: 400 })
  if (lead.unsubscribed) return NextResponse.json({ error: 'Unsubscribed' }, { status: 400 })
  const { data: tokenRow } = await supabase.from('crm_unsubscribe_tokens').select('token').eq('lead_id', leadId).single()
  const unsubUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/unsubscribe?token=${tokenRow?.token}`
  const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">${body.replace(/\n/g, '<br/>')}<hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0"/><div style="font-size:12px;color:#6b7280"><p>Sent by <strong>Capital Intelligence Group</strong> | Melbourne VIC | ABN: 38 693 023 371</p><p>You received this because your business may benefit from our web design services.</p><p><a href="${unsubUrl}" style="color:#6b7280">Unsubscribe</a> — removed within 5 business days per the Australian Spam Act 2003.</p></div></div>`
  try {
    await transporter.sendMail({ from: `"Capital Intelligence Group" <${process.env.GMAIL_USER}>`, to: lead.email, subject, html })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
  const entry = { sent_at: new Date().toISOString(), subject, body }
  await supabase.from('crm_leads').update({ email_sent_at: new Date().toISOString(), outreach_count: (lead.outreach_count || 0) + 1, last_contacted_at: new Date().toISOString(), last_event: 'emailed', status: lead.status === 'new' ? 'contacted' : lead.status, outreach_history: [...(lead.outreach_history || []), entry] }).eq('id', leadId)
  return NextResponse.json({ ok: true })
}
