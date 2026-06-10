import Hero from '@/components/Hero'
import HeroIntro from '@/components/HeroIntro'
import AIBlogSections from '@/components/AIBlogSections'
import GoogleBusinessProfileBanner from '@/components/GoogleBusinessProfileBanner'
import ProvenResults from '@/components/ProvenResults'
import ServiceSelection from '@/components/ServiceSelection'
import LaunchTemplatesSection from '@/components/LaunchTemplatesSection'
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
      <LaunchTemplatesSection />
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
