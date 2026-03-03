import Hero from '@/components/Hero'
import ServiceSelection from '@/components/ServiceSelection'
import AIChatDemo from '@/components/AIChatDemo'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Hero />
      <ServiceSelection />
      <AIChatDemo />
      <Footer />
    </main>
  )
}
