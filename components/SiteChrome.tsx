'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import GoogleReviewsBanner from '@/components/GoogleReviewsBanner'
import BottomNav from '@/components/BottomNav'

/**
 * Renders the global site chrome (top navbar, reviews banner, bottom nav)
 * everywhere except the immersive /launch funnel, which runs full-screen with
 * its own navigation. Chrome is automatically restored when leaving /launch.
 */
export default function SiteChrome() {
  const pathname = usePathname()

  if (pathname === '/launch') return null

  return (
    <>
      <Navbar />
      <GoogleReviewsBanner />
      <BottomNav />
    </>
  )
}
