/**
 * Bare domain for a browser frame's URL bar, derived from the project's real
 * link so the two cannot drift apart. Strips the scheme, any leading `www.`
 * and the trailing path:
 *   https://www.eayelectrical.com.au/  ->  eayelectrical.com.au
 *
 * Falls back to the input when it is not a parseable URL, so a malformed entry
 * degrades to showing the raw string rather than throwing during render.
 */
export function domainFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}
