'use client'

import { useId, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface DisclosureProps {
  /** Trigger label, e.g. "What we built". */
  label: string
  children: ReactNode
  /** Collapsed unless set. Every caller here stays collapsed by default. */
  defaultOpen?: boolean
  /** Extra classes for the trigger button. */
  triggerClassName?: string
  /** Rendered on the trigger's trailing edge, before the chevron. */
  meta?: ReactNode
}

/**
 * Collapsible panel, adapted from the 21st.dev ibelick Disclosure (id 1660).
 *
 * Animating to `height: 'auto'` is the key detail: framer-motion measures the
 * content and interpolates to the real pixel height, so the expansion has no
 * layout jump and no hardcoded max-height to outgrow. `overflow-hidden` on the
 * animated wrapper keeps the content clipped while it is mid-transition.
 *
 * The panel is unmounted when closed rather than hidden, which keeps the
 * collapsed card genuinely short instead of merely visually clipped.
 */
export default function Disclosure({
  label,
  children,
  defaultOpen = false,
  triggerClassName = '',
  meta,
}: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className={`flex w-full items-center justify-between gap-3 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ias-brown-dark ${triggerClassName}`}
      >
        <span>{label}</span>
        <span className="flex flex-shrink-0 items-center gap-2">
          {meta}
          {/* Decorative: `aria-expanded` on the button already conveys state. */}
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
              // Opacity trails the height slightly so content does not appear
              // before there is room for it.
              opacity: { duration: 0.2, delay: open ? 0.06 : 0 },
            }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
