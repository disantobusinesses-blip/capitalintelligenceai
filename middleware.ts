import { NextRequest, NextResponse } from 'next/server'

const CRM_PASSWORD = process.env.CRM_PASSWORD || 'capital2025'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const { pathname } = request.nextUrl

  if (hostname.startsWith('crm.')) {
    const auth = request.cookies.get('crm_auth')?.value
    const isAuthenticated = auth === CRM_PASSWORD

    if (pathname.startsWith('/api/crm-auth') || pathname === '/crm/login') {
      return NextResponse.next()
    }

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/crm/login', request.url))
    }

    if (!pathname.startsWith('/crm')) {
      return NextResponse.rewrite(new URL('/crm', request.url))
    }

    return NextResponse.next()
  }

  if (pathname.startsWith('/crm')) {
    const auth = request.cookies.get('crm_auth')?.value
    if (auth !== CRM_PASSWORD && pathname !== '/crm/login' && !pathname.startsWith('/api/crm-auth')) {
      return NextResponse.redirect(new URL('/crm/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next\/static|_next\/image|favicon\.ico).*)'],
}
