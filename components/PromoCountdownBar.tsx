'use client'

import { useEffect, useState } from 'react'
import { MarqueeAnimation } from '@/components/ui/marquee-animation'

// End of day, Melbourne time. Sept 30 is still AEST (DST starts the first
// Sunday of October), so the offset is a fixed +10:00.
const OFFER_END = new Date('2026-09-30T23:59:59+10:00')

const PROMO_TEXT =
  'FOUNDATION PACKAGE – $100 OFF   ·   GROWTH PACKAGE – $200 OFF   ·   OFFER ENDS SEPT 30   ·   '

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft | null {
  const diff = OFFER_END.getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

/**
 * Site-wide promo strip, fixed above the navbar. Reserved space for it is
 * baked into every page's top padding (see the fixed-header offsets across
 * app/**\/page.tsx), so once the offer ends this is simplest left rendering
 * nothing rather than reflowing every page that assumes its height.
 */
export default function PromoCountdownBar() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!timeLeft) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-9 bg-[#2E1B12] text-white flex items-center overflow-hidden">
      <div className="flex-1 min-w-0 h-full flex items-center">
        <MarqueeAnimation baseVelocity={2} className="text-[10px] sm:text-xs tracking-wide !text-white">
          {PROMO_TEXT}
        </MarqueeAnimation>
      </div>
      <div className="flex-shrink-0 flex items-center gap-1.5 h-full pl-3 pr-4 bg-black/15 border-l border-white/15 whitespace-nowrap">
        <span className="hidden sm:inline text-[10px] font-semibold uppercase tracking-wide text-white/70">
          Ends in
        </span>
        <span className="text-[11px] sm:text-xs font-bold font-mono tabular-nums">
          {timeLeft.days}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
        </span>
      </div>
    </div>
  )
}
