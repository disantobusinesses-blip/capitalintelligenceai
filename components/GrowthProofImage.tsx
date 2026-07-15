'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageOff } from 'lucide-react'

/** Client-account screenshot with a graceful fallback if the file is ever missing. */
export default function GrowthProofImage({
  src,
  alt,
  aspectClassName,
}: {
  src: string
  alt: string
  aspectClassName: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`mt-6 ${aspectClassName} rounded-[8px] bg-[#F0EDE7] border border-[#E8E4DF] flex flex-col items-center justify-center gap-2 px-5 text-center`}
      >
        <ImageOff className="w-5 h-5 text-[#9E9790]" strokeWidth={1.5} />
        <span className="text-[#9E9790] text-xs font-medium leading-relaxed">[PLACEHOLDER: image pending upload]</span>
      </div>
    )
  }

  return (
    <div className={`relative mt-6 ${aspectClassName} rounded-[8px] border border-[#E8E4DF] overflow-hidden bg-[#F0EDE7]`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover object-top"
        onError={() => setFailed(true)}
      />
    </div>
  )
}
