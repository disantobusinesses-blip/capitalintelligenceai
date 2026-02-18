import Hero from '@/components/Hero'
import ServiceSelection from '@/components/ServiceSelection'
import ProjectsCarousel from '@/components/ProjectsCarousel'
import AIChatDemo from '@/components/AIChatDemo'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-tech-black">
      <Hero />
      <ServiceSelection />
      <ProjectsCarousel />
      <AIChatDemo />
      <Footer />
    </main>
  )
}
