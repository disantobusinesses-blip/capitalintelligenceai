import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Capital Intelligence CRM',
  robots: 'noindex, nofollow',
}

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ margin: 0, padding: 0, background: '#0a0a0f', minHeight: '100vh' }}>
      {children}
    </div>
  )
}
