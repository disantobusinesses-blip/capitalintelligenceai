import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) return new NextResponse('Invalid link.', { status: 400 })
  const { data: tokenRow, error } = await supabase.from('crm_unsubscribe_tokens').select('*').eq('token', token).single()
  if (error || !tokenRow) return new NextResponse('Invalid or expired link.', { status: 404 })
  await supabase.from('crm_leads').update({ unsubscribed: true, unsubscribed_at: new Date().toISOString() }).eq('id', tokenRow.lead_id)
  await supabase.from('crm_unsubscribe_tokens').update({ used_at: new Date().toISOString() }).eq('token', token)
  return new NextResponse(`<!DOCTYPE html><html><head><title>Unsubscribed</title></head><body style="font-family:Arial,sans-serif;max-width:500px;margin:80px auto;text-align:center"><h2>You have been unsubscribed</h2><p>You will no longer receive emails from Capital Intelligence Group.</p><p style="color:#6b7280;font-size:13px">As required by the Australian Spam Act 2003, this takes effect within 5 business days.</p></body></html>`, { status: 200, headers: { 'Content-Type': 'text/html' } })
}
