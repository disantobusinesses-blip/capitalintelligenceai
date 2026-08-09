import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// A handful of early blog posts were created with mixed-case slugs before the
// site settled on an all-lowercase convention (every other post is lowercase).
// The posts have been renamed to their lowercase slug in Supabase; this keeps
// the old, already-indexed uppercase URLs redirecting to the working page.
//
// This can't be a next.config.js redirect: Next's source-path matching is
// case-insensitive, so a rule written against the uppercase slug also matches
// the lowercase destination and redirects it to itself, an infinite loop. The
// exact string comparison below can never match its own (lowercase) output.
const LEGACY_BLOG_SLUGS: Record<string, string> = {
  'Best-Website-Designer-in-Essendon': 'best-website-designer-in-essendon',
  'Web-Design-strathmore-Essendon-pascoevale-melbourne': 'web-design-strathmore-essendon-pascoevale-melbourne',
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const entry = Object.entries(LEGACY_BLOG_SLUGS).find(([from]) => pathname === `/blog/${from}`)

  if (entry) {
    const url = request.nextUrl.clone()
    url.pathname = `/blog/${entry[1]}`
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/blog/:slug*'],
}
