'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageOff } from 'lucide-react'

/**
 * Portfolio screenshot with a graceful fallback. Used for cards whose image
 * file may land in /public/projects/ slightly after the code referencing it
 * ships, so a missing file never renders as a broken image.
 */
export default function PortfolioCardImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <ImageOff className="w-6 h-6 text-ias-brown-muted" strokeWidth={1.5} />
        <span className="text-ias-brown-muted text-xs font-medium leading-relaxed">
          [PLACEHOLDER: image pending upload]
        </span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover object-top"
      onError={() => setFailed(true)}
    />
  )
}
