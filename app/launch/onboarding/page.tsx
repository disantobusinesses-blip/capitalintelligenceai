import type { Metadata } from 'next'
import OnboardingForm from './OnboardingForm'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Onboarding — Launch My Site | Intelligent AI Systems',
  description:
    'Tell us about your business so we can launch your website on your chosen go live date.',
  robots: { index: false, follow: false },
}

export default function OnboardingPage() {
  return (
    <>
      <OnboardingForm />
      <Footer />
    </>
  )
}
