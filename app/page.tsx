export const revalidate = 60

import HeroIntro from '@/components/HeroIntro'
import PortfolioStrip from '@/components/PortfolioStrip'
import BeyondWebsite from '@/components/BeyondWebsite'
import HomeFAQ from '@/components/HomeFAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-[#0A0A0A] pb-24 md:pb-0">
      <HeroIntro />
      <PortfolioStrip />
      <BeyondWebsite />
      <HomeFAQ />
      <Footer />
    </main>
  )
}
