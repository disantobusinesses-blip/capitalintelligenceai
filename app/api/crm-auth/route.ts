import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'

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
  const response = NextResponse.json({ ok: true })
  response.cookies.set('crm_auth', CRM_PASSWORD, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return response
}
