import { NextRequest, NextResponse } from 'next/server'

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

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const { pathname } = request.nextUrl

  const CRM_PASSWORD = process.env.CRM_PASSWORD

  if (hostname.startsWith('crm.')) {
    const auth = request.cookies.get('crm_auth')?.value
    const isAuthenticated =
      CRM_PASSWORD != null && auth === (await sessionToken(CRM_PASSWORD))

    if (pathname.startsWith('/api/crm-auth') || pathname === '/crm/login') {
      return NextResponse.next()
    }

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/crm/login', request.url))
    }

    if (pathname === '/' || !pathname.startsWith('/crm')) {
      return NextResponse.rewrite(new URL('/crm', request.url))
    }

    return NextResponse.next()
  }

  if (pathname.startsWith('/crm')) {
    const auth = request.cookies.get('crm_auth')?.value
    const expectedToken =
      CRM_PASSWORD != null ? await sessionToken(CRM_PASSWORD) : null
    if (
      auth !== expectedToken &&
      pathname !== '/crm/login' &&
      !pathname.startsWith('/api/crm-auth')
    ) {
      return NextResponse.redirect(new URL('/crm/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
