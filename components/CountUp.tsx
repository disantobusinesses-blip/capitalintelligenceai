'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  end: number
  decimals?: number
  suffix?: string
  prefix?: string
  durationMs?: number
  className?: string
}

/**
 * Animates a number from 0 to `end` exactly ONCE, the first time it scrolls
 * into view. There is no looping or repeating motion — the IntersectionObserver
 * disconnects after the single run. Respects prefers-reduced-motion by rendering
 * the final value immediately with no animation.
 */
export default function CountUp({
  end,
  decimals = 0,
  suffix = '',
  prefix = '',
  durationMs = 1600,
  className,
}: CountUpProps) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Reduced-motion users get the final value with no count-up.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(end)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry.isIntersecting || hasRun.current) return
        hasRun.current = true
        observer.disconnect()

        const start = performance.now()
        const step = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1)
          // easeOutCubic — fast then settling, feels natural and stops cleanly.
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(end * eased)
          if (progress < 1) requestAnimationFrame(step)
          else setValue(end)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, durationMs])

  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
