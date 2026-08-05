'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * TypingEffect — types text out character by character with a blinking cursor,
 * optionally rotating through several phrases.
 *
 * Adaptations from the supplied source:
 *  - Imports `motion/react` and reuses the project's `cn` from lib/utils
 *    rather than redeclaring an `any`-typed copy.
 *  - Opinionated defaults stripped (`text-4xl font-bold`, `justify-center`,
 *    `text-center`) so callers keep their own type scale and alignment. The
 *    cursor stays `bg-current`, so it inherits whatever colour the heading is.
 *  - Layout is reserved by an invisible copy of the longest phrase, with the
 *    typed text overlaid on top. Without this the element grows from zero
 *    width as it types and shoves the rest of the page down — very visible on
 *    a heading that wraps to two or three lines on a phone.
 *  - `loop` can be turned off, so a single fixed heading types once and stops
 *    instead of clearing and retyping itself forever.
 *  - The full text is exposed via `aria-label` and the animated parts are
 *    `aria-hidden`, matching the pattern already used by soft-blur-in, so a
 *    heading is never an empty node to screen readers or crawlers.
 *  - Honours prefers-reduced-motion by rendering the text outright.
 */

interface TypingEffectProps {
  texts: string[]
  className?: string
  /** Pause once a phrase finishes, before the next one starts. */
  rotationInterval?: number
  typingSpeed?: number
  /** When false, stops after the final phrase rather than starting over. */
  loop?: boolean
  /** Overrides the accessible name; defaults to the phrases joined. */
  label?: string
}

export const TypingEffect = ({
  texts,
  className,
  rotationInterval = 3000,
  typingSpeed = 150,
  loop = true,
  label,
}: TypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const containerRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(containerRef, { once: true })
  const shouldReduceMotion = useReducedMotion()

  const currentText = texts[currentTextIndex % texts.length] ?? ''
  const isLastText = currentTextIndex === texts.length - 1
  const finished = !loop && isLastText && charIndex >= currentText.length

  useEffect(() => {
    if (!isInView || shouldReduceMotion || finished) return

    if (charIndex < currentText.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText.charAt(charIndex))
        setCharIndex(charIndex + 1)
      }, typingSpeed)
      return () => clearTimeout(typingTimeout)
    }

    const changeLabelTimeout = setTimeout(() => {
      setDisplayedText('')
      setCharIndex(0)
      setCurrentTextIndex((prev) => (prev + 1) % texts.length)
    }, rotationInterval)
    return () => clearTimeout(changeLabelTimeout)
  }, [
    charIndex,
    currentText,
    isInView,
    shouldReduceMotion,
    finished,
    typingSpeed,
    rotationInterval,
    texts.length,
  ])

  const accessibleName = label ?? texts.join(', ')
  // The box is sized to the longest phrase so rotation never reflows either.
  const longest = texts.reduce((a, b) => (b.length > a.length ? b : a), texts[0] ?? '')

  // Only swap to the typed overlay once typing is genuinely running. The base
  // copy stays visible otherwise, so the heading still renders its text if the
  // animation never starts — reduced motion, no IntersectionObserver, JS off.
  // Hiding it unconditionally left the heading blank in exactly those cases.
  const active = isInView && !shouldReduceMotion

  return (
    <span ref={containerRef} aria-label={accessibleName} className={cn('relative inline-block', className)}>
      <span aria-hidden="true" className={active ? 'invisible' : undefined}>
        {active ? longest : texts[0]}
      </span>
      {active && (
        <span aria-hidden="true" className="absolute inset-0">
          {displayedText}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="ml-1 inline-block h-[0.8em] w-[0.06em] translate-y-[0.02em] rounded-sm bg-current align-middle"
          />
        </span>
      )}
    </span>
  )
}

export default TypingEffect
