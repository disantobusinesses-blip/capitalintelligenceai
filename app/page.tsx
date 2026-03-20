import Hero from '@/components/Hero'
import ProvenResults from '@/components/ProvenResults'
import ServiceSelection from '@/components/ServiceSelection'
import OurWork from '@/components/OurWork'
import HowItWorks from '@/components/HowItWorks'
import SeoGuarantee from '@/components/SeoGuarantee'
import FinalCta from '@/components/FinalCta'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-[#F8F7F4]">
      <Hero />
      <ProvenResults />
      <ServiceSelection />
      <OurWork />
      <HowItWorks />
      <SeoGuarantee />
      <FinalCta />
      <Footer />
    </main>
  )
}
