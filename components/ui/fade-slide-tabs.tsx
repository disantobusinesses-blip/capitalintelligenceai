'use client'

import { useId, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface FadeSlideTab {
  /** Stable key, also used for the tab/panel aria wiring. */
  id: string
  label: string
  /** Tailwind background class for the active indicator, e.g. `bg-ias-brown-mid`. */
  indicatorClass: string
  content: ReactNode
}

interface FadeSlideTabsProps {
  tabs: FadeSlideTab[]
  /** `id` of the tab shown first. Falls back to the first tab. */
  defaultTabId?: string
  /** Accessible name for the tablist. */
  label: string
}

/**
 * Fade + slide tabs, adapted from the 21st.dev ruixen.ui pattern (id 7881) to
 * the IAS palette and typography.
 *
 * Replaces vertically stacked panels: only the selected panel is mounted, which
 * is the whole point here. The three package tables stacked to roughly nine
 * screens of scrolling on a 375px viewport before the user reached anything
 * else.
 *
 * The active indicator is a shared `layoutId` element, so framer-motion
 * animates it between tabs rather than cross-fading two separate bars.
 */
export default function FadeSlideTabs({ tabs, defaultTabId, label }: FadeSlideTabsProps) {
  const initial = defaultTabId && tabs.some((t) => t.id === defaultTabId) ? defaultTabId : tabs[0].id
  const [activeId, setActiveId] = useState(initial)
  // Direction drives which way the panel slides in: +1 when moving right along
  // the tab strip, -1 when moving left, so the motion matches the gesture.
  const [direction, setDirection] = useState(1)
  const groupId = useId()
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const activeIndex = tabs.findIndex((t) => t.id === activeId)
  const active = tabs[activeIndex]

  function select(id: string) {
    const nextIndex = tabs.findIndex((t) => t.id === id)
    setDirection(nextIndex > activeIndex ? 1 : -1)
    setActiveId(id)
  }

  /* Roving focus: arrow keys move between tabs and activate, per the WAI-ARIA
     tabs pattern. Without this a keyboard user can reach the tablist but not
     change tabs, since the inactive tabs are removed from the tab order. */
  function onKeyDown(event: React.KeyboardEvent) {
    const offset = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (offset === 0) return
    event.preventDefault()
    const next = tabs[(activeIndex + offset + tabs.length) % tabs.length]
    select(next.id)
    tabRefs.current[next.id]?.focus()
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="flex w-full gap-1 rounded-[8px] border border-[#E8E4DF] bg-white p-1"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId
          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[tab.id] = node
              }}
              role="tab"
              id={`${groupId}-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`${groupId}-panel-${tab.id}`}
              /* Only the active tab stays in the tab order; arrows do the rest. */
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(tab.id)}
              className={`relative flex-1 rounded-[6px] px-2 py-2.5 text-[13px] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ias-brown-dark md:text-[14px] ${
                isActive ? 'text-white' : 'text-[#6B6560] hover:text-[#1A1A1A]'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId={`${groupId}-indicator`}
                  className={`absolute inset-0 rounded-[6px] ${tab.indicatorClass}`}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {/* Above the indicator, which is absolutely positioned behind it. */}
              <span className="relative z-10">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* `mode="wait"` so the outgoing panel finishes leaving before the next
          arrives. Cross-fading two feature tables of differing height causes a
          visible jump as the container resizes mid-transition. */}
      <div className="mt-4 md:mt-6">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={activeId}
            role="tabpanel"
            id={`${groupId}-panel-${activeId}`}
            aria-labelledby={`${groupId}-tab-${activeId}`}
            custom={direction}
            initial={{ opacity: 0, x: direction * 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {active.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
