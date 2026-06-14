import type { Metadata } from 'next'
import LaunchFunnel from './LaunchFunnel'
import LaunchFlow from './LaunchFlow'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: "Launch My Site — Let's Build Something Remarkable | Intelligent AI Systems",
  description:
    "Tell us what you need — a website, Google Business Profile, more leads, or SEO blogs — and we'll handle the rest. Launch in 24–48 hours.",
}

export default async function LaunchPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string; tier?: string; type?: string }>
}) {
  const params = await searchParams

  // Deep links from the Templates page (e.g. /launch?template=construction) keep
  // the focused template → hosting → checkout flow. Everything else gets the new
  // cinematic multi-path funnel.
  const useTemplateFlow = Boolean(params.template || params.type)

  if (useTemplateFlow) {
    return (
      <>
        <LaunchFlow
          initialTemplateId={params.template ?? null}
          initialTier={params.tier === 'premium' || params.tier === 'basic' ? params.tier : null}
          initialSiteType={
            params.type === 'template' || params.type === 'custom' ? params.type : null
          }
        />
        <Footer />
      </>
    )
  }

  return <LaunchFunnel />
}
