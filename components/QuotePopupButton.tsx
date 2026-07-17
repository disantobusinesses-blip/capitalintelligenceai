'use client'

import { useQuotePopup, QuoteService } from '@/context/QuotePopupContext'

/**
 * Opens the site-wide Quote Popup, optionally pre-selecting a service in the
 * dropdown. Used to replace mailto: links across the site (which silently do
 * nothing on desktop browsers without a configured mail client).
 */
export default function QuotePopupButton({
  service,
  className,
  children,
}: {
  service?: QuoteService
  className?: string
  children: React.ReactNode
}) {
  const { openPopup } = useQuotePopup()
  return (
    <button type="button" onClick={() => openPopup(service)} className={className}>
      {children}
    </button>
  )
}
