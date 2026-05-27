'use client'

import { useEffect, useRef, useState } from 'react'

const reviews = [
  {
    quote: 'Website was made for me within 48 hours, and after a month or so was ranked 1 on Google for some topics. Amazing work.',
    author: 'EAY Electrical',
    initial: 'E',
  },
  {
    quote: 'The experience was incredible. Optimized my businesses presence on Google and helped with growth and insight overall. Couldn\'t recommend more.',
    author: 'Dylan M.',
    initial: 'D',
  },
  {
    quote: 'Our enquiries doubled within the first 60 days of launching our new site. Couldn\'t be happier.',
    author: 'M.T.',
    initial: 'M',
  },
  {
    quote: 'We had no website at all before this. Now we\'re ranking on the first page of Google for our suburb.',
    author: 'J.K.',
    initial: 'J',
  },
  {
    quote: 'The team was fast, professional, and the site looks better than competitors who paid 3x more.',
    author: 'R.A.',
    initial: 'R',
  },
  {
    quote: 'Working with IAS was a great experience. They built my website exactly how I wanted, added a contact form, blogs, and analytics tracking.',
    author: 'Reborn Physiques',
    initial: 'R',
  },
  {
    quote: 'Great experience with IAS. They got my PT landing page done the same day, set up my Google Business Profile, and walked me through getting my domain sorted.',
    author: 'Antonio — Your Coach Plus',
    initial: 'A',
  },
]

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l2.9 6.3 6.8.9-5 4.7 1.2 6.8L12 17.6l-5.9 3.1 1.2-6.8-5-4.7 6.8-.9L12 2z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  )
}

export default function GoogleReviewsBanner() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate reviews for seamless infinite scroll
  const duplicatedReviews = [...reviews, ...reviews]

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationFrameId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed
        
        // Reset position when we've scrolled through the first set of reviews
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0
        }
        
        scrollContainer.scrollLeft = scrollPosition
      }
      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isPaused])

  return (
    <div className="bg-white border-b border-[#E8E4DF] py-3 fixed top-[68px] left-0 right-0 z-40">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <GoogleIcon />
          <span className="text-xs font-semibold text-[#1A1A1A]">Verified Google Reviews</span>
          <div className="flex items-center gap-0.5 ml-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
          <span className="text-xs text-[#6B6560] ml-1">5.0</span>
        </div>
      </div>

      {/* Scrolling Reviews */}
      <div
        ref={scrollRef}
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex gap-4 px-4 w-max">
          {duplicatedReviews.map((review, index) => (
            <div
              key={`${review.author}-${index}`}
              className="flex-shrink-0 w-[320px] bg-[#F8F7F4] rounded-lg p-4 border border-[#E8E4DF]"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#1A1A1A] text-sm leading-relaxed line-clamp-2 mb-3">
                &ldquo;{review.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {review.initial}
                </div>
                <span className="text-xs text-[#6B6560] truncate">{review.author}</span>
                <div className="ml-auto flex items-center gap-1">
                  <GoogleIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
