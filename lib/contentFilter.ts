import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity'

/**
 * Real words and Australian place/business names that contain a blacklisted
 * substring and would otherwise false-positive for this site's audience
 * (Cockburn is a real WA local government area, for instance). Obscenity's
 * whitelist suppresses a blacklist match anywhere it overlaps one of these,
 * see https://github.com/jo3-l/obscenity#readme.
 */
const FALSE_POSITIVE_WHITELIST = ['cockburn', 'cockatoo', 'scunthorpe']

let matcher: RegExpMatcher | null = null

/** Built once per server instance rather than per request, it's not cheap. */
function getMatcher(): RegExpMatcher {
  if (!matcher) {
    const built = englishDataset.build()
    matcher = new RegExpMatcher({
      ...built,
      ...englishRecommendedTransformers,
      whitelistedTerms: [...(built.whitelistedTerms ?? []), ...FALSE_POSITIVE_WHITELIST],
    })
  }
  return matcher
}

export function containsProfanity(text: string): boolean {
  if (!text) return false
  return getMatcher().hasMatch(text)
}

/**
 * A visitor's own website or a portfolio link is normal in a message; a pile
 * of links is the single most common shape of contact-form spam (SEO and
 * backlink bots pasting their target URLs). Matches with or without a
 * scheme, since spam text frequently drops the "https://".
 */
const URL_PATTERN = /https?:\/\/\S+|\bwww\.\S+\.[a-z]{2,}\S*/gi
const LINK_SPAM_THRESHOLD = 3

export function looksLikeLinkSpam(text: string): boolean {
  if (!text) return false
  const matches = text.match(URL_PATTERN)
  return !!matches && matches.length >= LINK_SPAM_THRESHOLD
}

/**
 * Checks free-text fields a visitor typed by hand (name, message, business
 * name, notes, ...) for profanity or link-spam. Returns a rejection message
 * for the first field that fails, or null if everything is clean.
 *
 * Deliberately never called on structured fields the visitor was asked to
 * paste (email, phone, an "existing website" URL) — those are the fields
 * most likely to trip a false positive and least likely to carry deliberate
 * abuse, so callers should only pass the free-text ones.
 */
export function checkEnquiryContent(fields: Array<string | null | undefined>): string | null {
  for (const field of fields) {
    if (!field) continue
    if (containsProfanity(field)) {
      return 'Please remove inappropriate language and try again.'
    }
    if (looksLikeLinkSpam(field)) {
      return 'Please remove the links from your message and try again.'
    }
  }
  return null
}
