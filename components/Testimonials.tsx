'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Website was made for me within 48 hours, and after a month or so was ranked 1 on Google for some topics. Amazing work.',
    author: 'EAY Electrical',
    role: 'Electrical Services, Australia',
    initial: 'E',
    avatarColor: 'bg-yellow-500',
  },
  {
    quote:
      'The experience was incredible. Optimized my businesses presence on Google and helped with growth and insight overall. Couldn\'t recommend more',
    author: 'Dylan.M',
    role: 'Google Review',
    initial: 'D',
    avatarColor: 'bg-sky-500',
  },
  {
    quote:
      "Our enquiries doubled within the first 60 days of launching our new site. Couldn't be happier.",
    author: 'M.T.',
    role: 'Trades Business, Melbourne',
    initial: 'M',
    avatarColor: 'bg-blue-500',
  },
  {
    quote:
      "We had no website at all before this. Now we're ranking on the first page of Google for our suburb.",
    author: 'J.K.',
    role: 'Hospitality Business, Sydney',
    initial: 'J',
    avatarColor: 'bg-green-500',
  },
  {
    quote:
      'The team was fast, professional, and the site looks better than competitors who paid 3x more.',
    author: 'R.A.',
    role: 'Professional Services, Brisbane',
    initial: 'R',
    avatarColor: 'bg-purple-500',
  },
  {
    quote:
      'Working with IAS was a great experience. They built my website exactly how I wanted, added a contact form, blogs, and analytics tracking. Clean design, fast turnaround, and great communication throughout. Highly recommend.',
    author: 'Reborn Physiques',
    role: 'Health & Fitness, Australia',
    initial: 'R',
    avatarColor: 'bg-red-500',
  },
  {
    quote:
      'Great experience with IAS. They got my PT landing page done the same day, set up my Google Business Profile, and walked me through getting my domain sorted. They also linked my Fresha booking so clients can book easily. Super smooth process, would definitely recommend.',
    author: 'Antonio — Your Coach Plus',
    role: 'Personal Training, Australia',
    initial: 'A',
    avatarColor: 'bg-emerald-500',
  },
]

function PremiumStars() {
  return (
    <div className="flex gap-1" aria-label="5 star rating">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`star-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          <path
            d="M12 2l2.9 6.3 6.8.9-5 4.7 1.2 6.8L12 17.6l-5.9 3.1 1.2-6.8-5-4.7 6.8-.9L12 2z"
            fill={`url(#star-grad-${i})`}
            stroke="#D97706"
            strokeWidth="0.5"
          />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused])

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  return (
    <section
      className="bg-gray-50 py-[72px] px-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Headings */}
        <div className="text-center mb-10">
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#1A1A1A] leading-tight">
            What Our Clients Are Saying
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Clients prefer to stay private — results speak for themselves.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-[680px] mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.author + t.quote.slice(0, 10)}
                  className="min-w-full px-2"
                >
                  <div
                    className="bg-white rounded-[12px] p-8 flex flex-col gap-4"
                    style={{ border: '1px solid #E8E4DF', boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}
                  >
                    {/* Premium stars */}
                    <PremiumStars />

                    {/* Quote */}
                    <p className="text-[#1A1A1A] text-[16px] leading-relaxed flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    {/* Author row */}
                    <div className="flex items-center gap-3 mt-auto pt-2 border-t border-[#E8E4DF]">
                      <div
                        className={`${t.avatarColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                      >
                        {t.initial}
                      </div>
                      <div>
                        <p className="text-[#1A1A1A] font-semibold text-sm">— {t.author}</p>
                        <p className="text-[#6B6560] text-xs">{t.role}</p>
                      </div>
                      {/* Google branding */}
                      <div className="ml-auto flex items-center gap-1 text-[11px] text-[#9E9790]">
                        <svg width="14" height="14" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                          <path fill="none" d="M0 0h48v48H0z"/>
                        </svg>
                        Google Review
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-white border border-[#E8E4DF] rounded-full p-2 shadow-sm hover:shadow-md transition-shadow"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-white border border-[#E8E4DF] rounded-full p-2 shadow-sm hover:shadow-md transition-shadow"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5 text-[#1A1A1A]" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-[#1A1A1A]' : 'w-2 bg-[#D1CCC7] hover:bg-[#9E9790]'
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
