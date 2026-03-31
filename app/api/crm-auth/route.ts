import { NextRequest, NextResponse } from 'next/server'

const CRM_PASSWORD = process.env.CRM_PASSWORD || 'capital2025'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (password !== CRM_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set('crm_auth', CRM_PASSWORD, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return response
}
