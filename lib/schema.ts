/**
 * The single source of truth for the business entity in structured data.
 *
 * The site previously declared itself under three different names across
 * pages ("Capital Intelligence Group / Intelligent AI Systems" as a
 * LocalBusiness, "Intelligent AI Systems" as an Organization, and
 * "Capital Intelligence Group" as the blog author) with no shared @id, so
 * search engines had no way to tell they were one business.
 *
 * There is now one node, typed LocalBusiness (a subtype of Organization, so it
 * satisfies both roles), carrying ORGANISATION_ID. Every other schema block on
 * the site points at that id via `organisationRef` instead of restating the
 * business, which is what keeps the name consistent sitewide.
 *
 * The trading names that are no longer canonical are kept on `alternateName`
 * so the association is not lost.
 */

export const SITE_URL = 'https://intelligentaisystem.com'

/** Canonical name. Not the rebrand name, which is not final. */
export const ORGANISATION_NAME = 'Intelligent AI Systems'

/** Referenced sitewide. The fragment keeps it distinct from the page URL. */
export const ORGANISATION_ID = `${SITE_URL}/#organization`

const LOGO_URL = `${SITE_URL}/ias-logo.png`

/**
 * Pointer to the canonical node above, for author/publisher slots.
 *
 * Carries the name and logo alongside the @id rather than being a bare
 * reference: the full node is emitted by the root layout so an @id alone would
 * resolve, but Article consumers that read the author/publisher in isolation
 * still get a usable name.
 */
export const organisationRef = {
  '@type': 'Organization',
  '@id': ORGANISATION_ID,
  name: ORGANISATION_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
  },
}

export const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': ORGANISATION_ID,
  name: ORGANISATION_NAME,
  alternateName: ['IAS', 'Capital Intelligence Group'],
  legalName: 'AI Capital Holdings Pty Ltd',
  url: SITE_URL,
  logo: LOGO_URL,
  image: LOGO_URL,
  description:
    'AI-powered web design and SEO agency based in Melbourne, Australia. Building fast websites and delivering SEO content for ambitious businesses across Australia and internationally.',
  telephone: '+61-3-7051-0100',
  email: 'sales@intelligentaisystem.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Melbourne VIC',
    postalCode: '3000',
    addressLocality: 'Melbourne',
    addressRegion: 'VIC',
    addressCountry: 'AU',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+61-3-7051-0100',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  areaServed: [
    'Moonee Ponds',
    'Essendon',
    'Coburg',
    'Brunswick West',
    'Strathmore',
    'Pascoe Vale',
    'Flemington',
    'Ascot Vale',
    'Melbourne',
  ],
  priceRange: '$$',
  currenciesAccepted: 'AUD',
  paymentAccepted: 'Credit Card, Bank Transfer',
  openingHours: 'Mo-Fr 09:00-17:00',
  taxID: '38 693 023 371',
  // Self-referential URLs add nothing here; `url` above already states it.
  sameAs: [
    'https://www.facebook.com/intelligentaisystems',
    'https://www.linkedin.com/company/intelligent-ai-systems',
  ],
}
