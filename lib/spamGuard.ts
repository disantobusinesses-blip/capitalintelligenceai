import { createClient } from '@supabase/supabase-js'
import type { NextRequest } from 'next/server'

/**
 * Every public form-submission API route calls this pair at the top:
 * reject blocked IPs before doing any work, then log who submitted once
 * validation passes. Both are wired into: /api/consultation, /api/quote,
 * /api/quote-popup, /api/notify-lead, /api/newsletter and
 * /api/secure-spot/checkout, the full set of routes reachable from a live
 * form on the site.
 *
 * To block someone spamming a form: add a row to the `blocked_ips` table in
 * the Supabase dashboard (ip_address + an optional reason). No deploy
 * needed, every route re-checks on the next request. Delete the row to
 * unblock. Submitted IPs are visible per-lead in `form_submissions` and on
 * every notification email.
 */

/**
 * These serverless functions run on Node, not Vercel's Edge runtime, so
 * `NextRequest.ip` (an Edge-only extension) is never populated here. Vercel
 * instead forwards the original client address as the first entry of
 * x-forwarded-for, appending its own proxy hops after it.
 */
export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim()
    if (first) return first
  }
  return request.headers.get('x-real-ip') || 'unknown'
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

/**
 * Fails open on any lookup error: a Supabase hiccup should never turn into
 * every legitimate visitor being blocked from submitting a form.
 */
export async function isIpBlocked(ip: string): Promise<boolean> {
  if (ip === 'unknown') return false
  const supabase = getSupabase()
  if (!supabase) return false

  try {
    const { data, error } = await supabase
      .from('blocked_ips')
      .select('ip_address')
      .eq('ip_address', ip)
      .maybeSingle()
    if (error) {
      console.error('blocked_ips lookup failed:', error)
      return false
    }
    return !!data
  } catch (err) {
    console.error('blocked_ips lookup failed:', err)
    return false
  }
}

interface LogSubmissionParams {
  /** Which form/route this came from, e.g. 'consultation', 'quote-popup'. */
  source: string
  ip: string
  userAgent: string | null
  name?: string | null
  email?: string | null
  phone?: string | null
  /** The full parsed request body, kept as-is for reference. */
  payload: unknown
}

/** Best-effort: a logging failure must never block the actual submission. */
export async function logSubmission(params: LogSubmissionParams): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) return

  try {
    // supabase-js resolves with an `error` field on failure (RLS denial,
    // bad column, etc.) rather than throwing, so it has to be checked
    // explicitly, an empty catch block here would silently swallow it.
    const { error } = await supabase.from('form_submissions').insert({
      source: params.source,
      ip_address: params.ip,
      user_agent: params.userAgent,
      name: params.name || null,
      email: params.email || null,
      phone: params.phone || null,
      payload: params.payload as object,
    })
    if (error) console.error('form_submissions insert failed:', error)
  } catch (err) {
    console.error('form_submissions insert failed:', err)
  }
}

/** Standard rejection body for a blocked IP, used identically everywhere. */
export const BLOCKED_RESPONSE = { ok: false, message: 'Unable to process your request.' } as const
