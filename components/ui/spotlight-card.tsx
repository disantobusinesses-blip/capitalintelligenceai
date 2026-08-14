'use client'

import { cn } from '@/lib/utils'
import React, { useEffect, useRef, useState } from 'react'

/**
 * SpotlightCard — sourced from 21st.dev (@berkcangumusisik/spotlight-card).
 * Install: npx shadcn@latest add "https://21st.dev/r/berkcangumusisik/spotlight-card"
 *
 * Adaptations for this project:
 *  - Palette stripped. The stock version hardcodes a dark theme
 *    (`border-neutral-800 bg-neutral-900 text-neutral-200`, `rounded-xl`),
 *    which would have overridden the section's own tokens. The base class is
 *    now structural only, so the caller supplies surface, border and radius.
 *  - Default spotlight is the mid brand brown rather than white, so it reads on
 *    the light surfaces this site uses. Driven by the --ias-brown-mid-rgb
 *    channels so it tracks the palette instead of pinning a hex.
 *  - Pointer events instead of mouse events. The stock handlers are
 *    mouse-only, leaving the effect dead on touch; pointer events give phones
 *    the same spotlight on tap that a desktop gets on hover.
 */

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  spotlightColor?: string
}

export const SpotlightCard = ({
  children,
  className,
  spotlightColor = 'rgb(var(--ias-brown-mid-rgb) / 0.28)',
  ...props
}: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null)
  const holdRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const clearHold = () => {
    if (holdRef.current) {
      clearTimeout(holdRef.current)
      holdRef.current = null
    }
  }
  useEffect(() => clearHold, [])

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  // Fires for both a mouse entering and a finger touching down.
  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    clearHold()
    handlePointerMove(e)
    setOpacity(1)
  }

  const handlePointerLeave = (e?: React.PointerEvent<HTMLDivElement>) => {
    clearHold()
    // A finger lifts within a frame or two of touching down, so releasing
    // immediately would flash the spotlight and read as nothing happening.
    // Touch gets a short hold; a mouse still clears the moment it leaves.
    if (e?.pointerType === 'touch') {
      holdRef.current = setTimeout(() => setOpacity(0), 900)
      return
    }
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerDown={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  )
}
