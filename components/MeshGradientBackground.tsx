'use client'

import { MeshGradient } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"

interface MeshGradientBackgroundProps {
  colors?: string[]
  distortion?: number
  swirl?: number
  speed?: number
  offsetX?: number
}

export default function MeshGradientBackground({
  colors = ["#5C3A21", "#8B6B4A", "#C49A6C", "#D4B08C", "#3E2723", "#A1887F"],
  distortion = 1.2,
  swirl = 0.6,
  speed = 0.8,
  offsetX = 0.08,
}: MeshGradientBackgroundProps) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 w-screen h-screen" style={{ zIndex: -10 }}>
      <MeshGradient
        width={dimensions.width}
        height={dimensions.height}
        colors={colors}
        distortion={distortion}
        swirl={swirl}
        grainMixer={0}
        grainOverlay={0}
        speed={speed}
        offsetX={offsetX}
      />
      <div className="absolute inset-0 pointer-events-none bg-black/25" />
    </div>
  )
}
