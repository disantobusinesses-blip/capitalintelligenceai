import { NextRequest, NextResponse } from 'next/server'

const CRM_PASSWORD = process.env.CRM_PASSWORD || 'capital2025'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const { pathname } = request.nextUrl
  const isCrmSubdomain = hostname.startsWith('crm.')

  // ── CRM SUBDOMAIN ──────────────────────────────────────────────
  if (isCrmSubdomain) {
    const auth = request.cookies.get('crm_auth')?.value
    const isAuthenticated = auth === CRM_PASSWORD

    // Always allow auth API through
    if (pathname.startsWith('/api/crm-auth') || pathname.startsWith('/api/unsubscribe')) {
      return NextResponse.next()
    }

    // /login on the crm subdomain → rewrite to /crm/login (clean URL)
    if (pathname === '/login') {
      return NextResponse.rewrite(new URL('/crm/login', request.url))
    }

    // Not authenticated → redirect to crm.domain/login (clean URL, no /crm prefix)
    if (!isAuthenticated) {
      const loginUrl = new URL(request.url)
      loginUrl.pathname = '/login'
      return NextResponse.redirect(loginUrl)
    }

    // Root or any path on crm subdomain → rewrite to /crm/[path]
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/crm', request.url))
    }

    // e.g. /leads → rewrite to /crm/leads
    if (!pathname.startsWith('/crm') && !pathname.startsWith('/_next') && !pathname.startsWith('/api')) {
      return NextResponse.rewrite(new URL('/crm' + pathname, request.url))
    }

    return NextResponse.next()
  }

  // ── MAIN DOMAIN: block /crm routes — redirect to crm subdomain ──
  if (pathname.startsWith('/crm')) {
    const crmUrl = request.nextUrl.clone()
    crmUrl.hostname = 'crm.' + hostname.replace('www.', '')
    crmUrl.pathname = '/'
    return NextResponse.redirect(crmUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
