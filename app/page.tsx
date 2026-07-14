export const revalidate = 60

import HeroIntro from '@/components/HeroIntro'
import PortfolioStrip from '@/components/PortfolioStrip'
import WhyWorkWithUs from '@/components/WhyWorkWithUs'
import Hero from '@/components/Hero'
import BeyondWebsite from '@/components/BeyondWebsite'
import HomeFAQ from '@/components/HomeFAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-[#F8F7F4] pb-24 md:pb-0">
      <HeroIntro />
      <PortfolioStrip />
      <WhyWorkWithUs />
      {/* "Book a Free Consultation" — unmodified, preserves its own distinct
          Google Ads conversion label (AW-17950129824/ZA2zCPTNlrkcEKD9pO9C). */}
      <Hero />
      <BeyondWebsite />
      <HomeFAQ />
      <Footer />
    </main>
  )
}
