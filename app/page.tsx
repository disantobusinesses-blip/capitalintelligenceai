import Hero from '@/components/Hero'
import PackageSection from '@/components/PackageSection'
import ProjectsCarousel from '@/components/ProjectsCarousel'
import AIChatDemo from '@/components/AIChatDemo'
import OnboardingSection from '@/components/OnboardingSection'
import PricingDetails from '@/components/PricingDetails'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <PackageSection />
      <ProjectsCarousel />
      <AIChatDemo />
      <OnboardingSection />
      <PricingDetails />
      <Footer />
    </main>
  )
}
