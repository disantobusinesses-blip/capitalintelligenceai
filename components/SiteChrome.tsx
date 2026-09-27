'use client'

import Navbar from '@/components/Navbar'
import PromoCountdownBar from '@/components/PromoCountdownBar'
import GoogleReviewsBanner from '@/components/GoogleReviewsBanner'
import BottomNav from '@/components/BottomNav'

/**
 * Renders the global site chrome (promo strip, top navbar, reviews banner,
 * bottom nav).
 */
export default function SiteChrome() {
  return (
    <>
      <PromoCountdownBar />
      <Navbar />
      <GoogleReviewsBanner />
      <BottomNav />
    </>
  )
}
