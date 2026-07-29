'use client'

import React, { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

/**
 * SoftBlurIn — sourced from 21st.dev (@educlopez/soft-blur-in).
 * Install: npx shadcn@latest add "https://21st.dev/r/educlopez/soft-blur-in"
 *
 * Per-character fade-in with a gentle blur and upward motion. No palette or
 * type styling of its own, the caller supplies both via `className`, so the
 * project's tokens apply unchanged.
 *
 * Adaptation for this project: characters are grouped into per-word spans.
 * The stock version makes every character `inline-block`, which creates a
 * line-break opportunity between each one — a wrapping hero headline then
 * splits mid-word on narrow screens. Words now stay intact and only break
 * at spaces; the per-character stagger is preserved by tracking each word's
 * offset into the full string.
 */

export interface SoftBlurInProps {
  children: string
  className?: string
  /** Delay before the animation starts, in milliseconds. */
  delay?: number
  /** Per-character stagger, in milliseconds. */
  stagger?: number
  /** Animate only once the text scrolls into view. */
  triggerOnView?: boolean
}

const DURATION_S = 0.9
const MS = 1000
// Apple's signature ease-out.
const EASE = [0.22, 1, 0.36, 1] as const

export default function SoftBlurIn({
  children,
  className = '',
  delay = 0,
  stagger = 25,
  triggerOnView = false,
}: SoftBlurInProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const shouldReduceMotion = useReducedMotion()
  const play = (!triggerOnView || inView) && !shouldReduceMotion

  const words = children.split(' ')
  // Index of each word's first character within the whole string, so the
  // stagger keeps running across word boundaries.
  const wordOffsets: number[] = []
  let acc = 0
  for (const word of words) {
    wordOffsets.push(acc)
    acc += word.length + 1
  }

  return (
    <span aria-label={children} className={className} ref={ref}>
      {words.map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          {wordIndex > 0 && ' '}
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                animate={play ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
                aria-hidden="true"
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 16, filter: 'blur(12px)' }
                }
                key={charIndex}
                style={{ display: 'inline-block', whiteSpace: 'pre' }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: DURATION_S,
                        delay: delay / MS + ((wordOffsets[wordIndex] + charIndex) * stagger) / MS,
                        ease: EASE,
                      }
                }
              >
                {char}
              </motion.span>
            ))}
          </span>
        </React.Fragment>
      ))}
    </span>
  )
}
