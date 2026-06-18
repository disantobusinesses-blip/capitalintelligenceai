'use client'

import { useEffect, useRef } from 'react'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  animationFrom?: { opacity: number; transform: string }
  animationTo?: { opacity: number; transform: string }
  easing?: string
  threshold?: number
  rootMargin?: string
  textAlign?: 'left' | 'center' | 'right'
  onLetterAnimationComplete?: () => void
}

export default function SplitText({
  text,
  className = '',
  delay = 100,
  animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  easing = 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'center',
  onLetterAnimationComplete,
}: SplitTextProps) {
  const letters = useRef<(HTMLElement | null)[]>([])
  const hasAnimated = useRef(false)
  const containerRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const els = letters.current
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            els.forEach((el, i) => {
              if (!el) return
              setTimeout(() => {
                el.style.opacity = String(animationTo.opacity)
                el.style.transform = animationTo.transform
                if (i === els.length - 1 && onLetterAnimationComplete) {
                  onLetterAnimationComplete()
                }
              }, i * delay)
            })
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [animationTo, delay, onLetterAnimationComplete, rootMargin, threshold])

  const words = text.split(' ')
  let letterIndex = 0

  return (
    <p
      ref={containerRef}
      className={className}
      style={{
        textAlign,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: textAlign === 'center' ? 'center' : 'flex-start',
      }}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} style={{ display: 'inline-flex', whiteSpace: 'pre' }}>
          {word.split('').map((char) => {
            const idx = letterIndex++
            return (
              <span
                key={idx}
                ref={(el) => {
                  letters.current[idx] = el
                }}
                style={{
                  display: 'inline-block',
                  opacity: animationFrom.opacity,
                  transform: animationFrom.transform,
                  transition: `opacity 0.6s ${easing}, transform 0.6s ${easing}`,
                }}
              >
                {char}
              </span>
            )
          })}
          {wordIdx < words.length - 1 && (
            <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
          )}
        </span>
      ))}
    </p>
  )
}
