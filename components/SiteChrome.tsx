'use client'

import Navbar from '@/components/Navbar'
import GoogleReviewsBanner from '@/components/GoogleReviewsBanner'
import BottomNav from '@/components/BottomNav'

/**
 * Renders the global site chrome (top navbar, reviews banner, bottom nav).
 */
export default function SiteChrome() {
  return (
    <>
      <Navbar />
      <GoogleReviewsBanner />
      <BottomNav />
    </>
  )
}
