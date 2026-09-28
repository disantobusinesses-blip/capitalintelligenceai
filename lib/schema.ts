/**
 * The single source of truth for the business entity in structured data.
 *
 * The site previously declared itself under three different names across
 * pages ("Capital Intelligence Group / Intelligent AI Systems" as a
 * LocalBusiness, "Intelligent AI Systems" as an Organization, and
 * "Capital Intelligence Group" as the blog author) with no shared @id, so
 * search engines had no way to tell they were one business.
 *
 * There is now one node, carrying ORGANISATION_ID, that every other schema
 * block on the site points at via `organisationRef` instead of restating the
 * business, which is what keeps the name consistent sitewide.
 *
 * It carries BOTH types rather than picking one: schema.org allows @type to
 * be an array, and this entity genuinely is a LocalBusiness (it has an
 * address, phone and opening hours) that also needs to satisfy Article's
 * author/publisher fields, which expect Organization. ORGANISATION_TYPE is
 * the one array literal both `organisationSchema` and `organisationRef`
 * spread from, so the two declarations cannot drift apart the way the old
 * "LocalBusiness in one place, Organization in another" split did.
 *
 * The trading names that are no longer canonical are kept on `alternateName`
 * so the association is not lost.
 */

export const SITE_URL = 'https://intelligentaisystem.com'

/** Canonical name. Not the rebrand name, which is not final. */
export const ORGANISATION_NAME = 'Intelligent AI Systems'

/** Referenced sitewide. The fragment keeps it distinct from the page URL. */
export const ORGANISATION_ID = `${SITE_URL}/#organization`

/**
 * Shared by every declaration of this entity, see the file-level note above.
 * Order matters for readability only, schema.org does not treat array order
 * as significant.
 */
export const ORGANISATION_TYPE = ['Organization', 'LocalBusiness']

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
  '@type': ORGANISATION_TYPE,
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
  '@type': ORGANISATION_TYPE,
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
