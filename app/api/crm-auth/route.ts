import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'

async function sessionToken(password: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const buf = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode('crm_session_v1')
  )
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const password = typeof body.password === 'string' ? body.password : ''
  const CRM_PASSWORD = process.env.CRM_PASSWORD
  if (!CRM_PASSWORD || !password) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  const encoder = new TextEncoder()
  const given = encoder.encode(password)
  const expected = encoder.encode(CRM_PASSWORD)
  const match = given.length === expected.length && timingSafeEqual(given, expected)
  if (!match) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  const token = await sessionToken(CRM_PASSWORD)
  const response = NextResponse.json({ ok: true })
  response.cookies.set('crm_auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return response
}
