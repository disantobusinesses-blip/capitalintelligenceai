'use client'

const reviews = [
  {
    author: 'EAY Electrical',
    initial: 'E',
  },
  {
    author: 'Senator Developments',
    initial: 'S',
  },
  {
    author: 'Dylan M.',
    initial: 'D',
  },
  {
    author: 'Reborn Physiques',
    initial: 'R',
  },
  {
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
  // Duplicate reviews for seamless infinite scroll
  const duplicatedReviews = [...reviews, ...reviews]

  return (
    <div className="bg-white border-b border-[#E8E4DF] py-2 fixed top-[68px] left-0 right-0 z-40 overflow-hidden">
      {/* Scrolling Reviews - using CSS animation for consistent speed */}
      <div 
        className="flex gap-6 animate-scroll hover:[animation-play-state:paused]"
        style={{
          width: 'max-content',
        }}
      >
        {duplicatedReviews.map((review, index) => (
          <div
            key={`${review.author}-${index}`}
            className="flex-shrink-0 flex items-center gap-3 px-4 py-1"
          >
            {/* Stars */}
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                {review.initial}
              </div>
              <span className="text-xs text-[#6B6560] whitespace-nowrap">{review.author}</span>
            </div>

            {/* Google Icon */}
            <GoogleIcon />
          </div>
        ))}
      </div>
    </div>
  )
}
