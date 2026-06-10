import type { Metadata } from 'next'
import LaunchFlow from './LaunchFlow'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Launch My Site — Templates from $850 | Intelligent AI Systems',
  description:
    'Pick a professionally designed industry template, choose your go live date, and launch your website within 24–48 hours. $200 deposit secures your build.',
}

export default async function LaunchPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string; tier?: string }>
}) {
  const params = await searchParams
  return (
    <>
      <LaunchFlow
        initialTemplateId={params.template ?? null}
        initialTier={params.tier === 'premium' || params.tier === 'basic' ? params.tier : null}
      />
      <Footer />
    </>
  )
}
