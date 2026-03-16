import Hero from '@/components/Hero'
import ProvenResults from '@/components/ProvenResults'
import ServiceSelection from '@/components/ServiceSelection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] pb-24">
      <Hero />
      <ProvenResults />
      <ServiceSelection />
      <Footer />
    </main>
  )
}
