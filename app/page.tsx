export const revalidate = 300

import Hero from '@/components/Hero'
import HeroIntro from '@/components/HeroIntro'
import AIBlogSections from '@/components/AIBlogSections'
import GoogleBusinessProfileBanner from '@/components/GoogleBusinessProfileBanner'
import ProvenResults from '@/components/ProvenResults'
import ServiceSelection from '@/components/ServiceSelection'
import PathChooser from '@/components/PathChooser'
import OurWork from '@/components/OurWork'
import Testimonials from '@/components/Testimonials'
import HowItWorks from '@/components/HowItWorks'
import SeoGuarantee from '@/components/SeoGuarantee'
import FinalCta from '@/components/FinalCta'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-[#F8F7F4] pb-24 md:pb-0">
      <HeroIntro />
      <PathChooser />
      <Hero />
      <AIBlogSections />
      <ServiceSelection />
      <GoogleBusinessProfileBanner />
      <ProvenResults />
      <OurWork />
      <Testimonials />
      <HowItWorks />
      <SeoGuarantee />
      <FinalCta />
      <Footer />
    </main>
  )
}
