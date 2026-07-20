'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageOff } from 'lucide-react'

/** Client-account screenshot with a graceful fallback if the file is ever missing. */
export default function GrowthProofImage({
  src,
  alt,
  aspectClassName,
  wrapperClassName = 'mt-6',
  fit = 'cover',
  sizes = '(max-width: 768px) 100vw, 33vw',
}: {
  src: string
  alt: string
  aspectClassName: string
  /** Spacing/layout classes for the wrapper, defaults to the standalone column spacing. */
  wrapperClassName?: string
  /** 'cover' crops to fill (use when aspectClassName matches the image's native ratio).
   *  'contain' letterboxes to show the full frame (use in a shared grid where ratios vary). */
  fit?: 'cover' | 'contain'
  sizes?: string
}) {
  const [failed, setFailed] = useState(false)
  const fitClassName = fit === 'contain' ? 'object-contain' : 'object-cover object-top'

  if (failed) {
    return (
      <div
        className={`${wrapperClassName} ${aspectClassName} rounded-[8px] bg-[#F0EDE7] border border-[#E8E4DF] flex flex-col items-center justify-center gap-2 px-5 text-center`}
      >
        <ImageOff className="w-5 h-5 text-[#9E9790]" strokeWidth={1.5} />
        <span className="text-[#9E9790] text-xs font-medium leading-relaxed">[PLACEHOLDER: image pending upload]</span>
      </div>
    )
  }

  return (
    <div className={`relative ${wrapperClassName} ${aspectClassName} rounded-[8px] border border-[#E8E4DF] overflow-hidden bg-[#F0EDE7]`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={fitClassName}
        onError={() => setFailed(true)}
      />
    </div>
  )
}
