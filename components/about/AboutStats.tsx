'use client'

import { useEffect, useState } from 'react'
import { animate, motion } from 'framer-motion'

import { display } from '@/lib/fonts'

/**
 * The four studio numbers, sprung up from zero the first time the block scrolls
 * into view. `suffix` is kept separate from the value so the animated digits can
 * be swapped without disturbing the trailing glyph, and `literal` covers the
 * range stat ("2-4") which has no single number to count toward — that one is
 * rendered as-is rather than animated.
 */
const STATS: {
  value: number
  suffix?: string
  literal?: string
  label: string
}[] = [
  { value: 100, suffix: '+', label: 'Monthly blog posts published across client sites' },
  { value: 4, literal: '2-4', label: 'Day turnaround depending on build complexity' },
  { value: 3, suffix: '+', label: 'Years experience' },
  { value: 30, suffix: '+', label: 'Website clients under monthly management' },
]

/**
 * One counter, driven by a `start` flag rather than its own IntersectionObserver
 * so all four numbers move together with the block's entrance animation.
 */
function Counter({
  value,
  suffix,
  literal,
  start,
}: {
  value: number
  suffix?: string
  literal?: string
  start: boolean
}) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!start || literal) return
    // A spring rather than a linear tween: the slight settle reads as physical,
    // which is the whole point of a count-up. `animate` drives its own frame
    // loop, so the value ticks without being bound to a motion component.
    const controls = animate(0, value, {
      type: 'spring',
      stiffness: 60,
      damping: 18,
      restDelta: 0.4,
      // Rounding on update keeps the DOM writes to whole numbers only.
      onUpdate: (latest) => setCurrent(Math.round(latest)),
      // The spring settles a fraction short of target, so land it exactly.
      onComplete: () => setCurrent(value),
    })
    return () => controls.stop()
  }, [start, value, literal])

  return (
    <span className="tabular-nums">
      {literal ?? current}
      {suffix}
    </span>
  )
}

export default function AboutStats() {
  const [started, setStarted] = useState(false)

  return (
    <motion.div
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true, margin: '-60px' }}
      className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-8"
    >
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col"
        >
          <span
            className={`${display.className} text-[44px] leading-none font-semibold text-ias-brown-dark sm:text-[54px] md:text-[64px]`}
          >
            <Counter
              value={stat.value}
              suffix={stat.suffix}
              literal={stat.literal}
              start={started}
            />
          </span>
          <span className="mt-4 max-w-[220px] text-[14px] leading-relaxed text-ias-brown-muted md:text-[15px]">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}
