'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import BottomNav from './BottomNav'
import FloatingButton from './FloatingButton'
import QuoteModal from './QuoteModal'
import GetStartedFormWrapper from './GetStartedFormWrapper'

export default function MarketingChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isCRM = pathname.startsWith('/crm')

  if (isCRM) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      {children}
      <BottomNav />
      <FloatingButton />
      <QuoteModal />
      <GetStartedFormWrapper />
    </>
  )
}
