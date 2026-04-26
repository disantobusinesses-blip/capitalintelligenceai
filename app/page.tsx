import Hero from '@/components/Hero'
import AIBlogSections from '@/components/AIBlogSections'
import GoogleBusinessProfileBanner from '@/components/GoogleBusinessProfileBanner'
import ProvenResults from '@/components/ProvenResults'
import ServiceSelection from '@/components/ServiceSelection'
import OurWork from '@/components/OurWork'
import Testimonials from '@/components/Testimonials'
import HowItWorks from '@/components/HowItWorks'
import SeoGuarantee from '@/components/SeoGuarantee'
import NewsletterSignup from '@/components/NewsletterSignup'
import FinalCta from '@/components/FinalCta'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-[#F8F7F4] pb-24 md:pb-0">
      <Hero />
      <NewsletterSignup />
      <AIBlogSections />
      <GoogleBusinessProfileBanner />
      <ProvenResults />
      <ServiceSelection />
      <OurWork />
      <Testimonials />
      <HowItWorks />
      <SeoGuarantee />
      <FinalCta />
      <Footer />
    </main>
  )
}
