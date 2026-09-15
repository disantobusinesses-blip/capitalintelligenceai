'use client'

import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface OngoingServicePanelProps {
  /** Anchor target, e.g. "hosting". Deep links to this panel still work. */
  id: string
  /** Small uppercase eyebrow, e.g. "Website Hosting". */
  eyebrow: string
  /** The panel's heading. */
  title: string
  /** One-line summary shown while collapsed, so the panel is useful closed. */
  summary: string
  /** Short price indicator on the trigger's trailing edge, e.g. "from $59/mo". */
  priceHint?: string
  children: ReactNode
  defaultOpen?: boolean
}

/**
 * One collapsible service inside the Ongoing Services group on /services.
 *
 * These sections were previously fully expanded and stacked, so a mobile
 * visitor scrolled through all of the hosting and blog pricing before reaching
 * anything else. Collapsed, the group becomes a short menu the visitor can scan
 * and open selectively.
 *
 * `scroll-mt` keeps the existing #hosting / #seo-blog-content style deep links
 * landing below the fixed navbar rather than under it.
 */
export default function OngoingServicePanel({
  id,
  eyebrow,
  title,
  summary,
  priceHint,
  children,
  defaultOpen = false,
}: OngoingServicePanelProps) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()
  /** True while this panel is open because a deep link opened it. */
  const openedByHash = useRef(false)

  /* These anchors are deep-linked from the navbar, footer and BeyondWebsite,
     so a collapsed panel would leave those links landing on a closed row that
     looks broken. Open this panel whenever the hash points at it.

     The `hashchange` listener matters as much as the initial read: moving from
     /services#hosting to /services#seo-blog-content keeps the same page
     mounted, so without it only the first deep link of a session would open.

     Scrolling is done manually with `window.scrollTo` rather than the more
     obvious `scrollIntoView`. This wrapper needs `overflow-hidden` to clip the
     collapse animation, and that makes it a programmatically scrollable box in
     its own right, so `scrollIntoView` resolves it as the nearest scroll
     container and scrolls *inside* the panel instead of moving the page. That
     failure is silent: it reports success and the viewport never moves.

     NAV_OFFSET mirrors the `scroll-mt-24` (6rem) that keeps the row clear of
     the fixed navbar.

     The scroll runs as several corrective passes rather than once. A single
     pass measured ~200px short: everything above this panel — the hero image,
     the logo marquee, the three pricing cards — is still settling when the
     effect first fires, so the target position keeps moving after we have
     committed to it. Each pass re-measures and only nudges if we are more than
     a couple of pixels out, so once the layout is stable the passes are no-ops.
     The passes also straddle the panel's own 300ms expand animation. */
  useEffect(() => {
    const NAV_OFFSET = 96
    const timers: number[] = []

    const scrollToPanel = (behavior: ScrollBehavior) => {
      const el = document.getElementById(id)
      if (!el) return
      const target = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
      if (Math.abs(target - window.scrollY) < 2) return
      window.scrollTo({ top: target, behavior })
    }

    const syncToHash = () => {
      if (window.location.hash !== `#${id}`) {
        /* The hash has moved to a different panel. Collapse this one only if a
           previous deep link is what opened it, so that following several nav
           links in a row doesn't leave every panel expanded and undo the
           grouping. A panel the visitor opened by hand is left alone. */
        if (openedByHash.current) {
          openedByHash.current = false
          setOpen(false)
        }
        return
      }
      openedByHash.current = true
      setOpen(true)
      requestAnimationFrame(() => scrollToPanel('smooth'))
      // 'auto' for the corrections so they land instantly instead of racing
      // the smooth animation from the pass before.
      timers.push(window.setTimeout(() => scrollToPanel('auto'), 450))
      timers.push(window.setTimeout(() => scrollToPanel('auto'), 1000))
    }

    syncToHash()
    window.addEventListener('hashchange', syncToHash)
    return () => {
      window.removeEventListener('hashchange', syncToHash)
      timers.forEach(clearTimeout)
    }
  }, [id])

  return (
    <div
      id={id}
      className="scroll-mt-24 overflow-hidden rounded-[10px] border border-[#E8E4DF] bg-white"
    >
      <button
        type="button"
        onClick={() => {
          // Hand control to the visitor: once they touch this panel, a later
          // hash change elsewhere must not collapse it underneath them.
          openedByHash.current = false
          setOpen((v) => !v)
        }}
        aria-expanded={open}
        aria-controls={`${panelId}-content`}
        className="flex w-full items-start gap-4 p-5 text-left transition-colors duration-200 hover:bg-[#FAF9F7] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ias-brown-dark md:p-6"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-semibold uppercase tracking-[1.5px] text-ias-brown-dark md:text-[12px]">
            {eyebrow}
          </span>
          <span className="mt-1.5 block text-[17px] font-bold leading-snug text-balance text-[#1A1A1A] md:text-[20px]">
            {title}
          </span>
          <span className="mt-1.5 block text-[13px] leading-relaxed text-[#6B6560]">
            {summary}
          </span>
        </span>
        <span className="flex flex-shrink-0 flex-col items-end gap-2">
          {priceHint && (
            <span className="whitespace-nowrap text-[12px] font-semibold text-ias-brown-dark">
              {priceHint}
            </span>
          )}
          {/* Decorative: aria-expanded on the button conveys the state. */}
          <ChevronDown
            aria-hidden="true"
            className={`h-5 w-5 text-[#6B6560] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            id={`${panelId}-content`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.2, delay: open ? 0.08 : 0 },
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#E8E4DF] p-5 md:p-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
