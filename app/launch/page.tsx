import type { Metadata } from 'next'
import LaunchFlow from './LaunchFlow'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Launch My Site — Templates from $750 | Intelligent AI Systems',
  description:
    'Pick a professionally designed industry template, choose your go live date, and launch your website in 24 hours. $200 deposit secures your build.',
}

export default function LaunchPage() {
  return (
    <>
      <LaunchFlow />
      <Footer />
    </>
  )
}
