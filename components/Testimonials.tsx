const testimonials = [
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
]

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-[72px] px-6">
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

        {/* Cards — horizontal scroll on mobile, 3-column grid on desktop */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="snap-start shrink-0 w-[80vw] sm:w-[60vw] md:w-auto bg-white rounded-[12px] p-6 flex flex-col gap-4"
              style={{ border: '1px solid #E8E4DF', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}
            >
              {/* 5 stars */}
              <div className="flex gap-0.5 text-yellow-400 text-lg" aria-label="5 star rating">
                ⭐⭐⭐⭐⭐
              </div>

              {/* Quote */}
              <p className="text-[#1A1A1A] text-[15px] leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author row */}
              <div className="flex items-center gap-3 mt-auto">
                <div
                  className={`${t.avatarColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-[#1A1A1A] font-semibold text-sm">— {t.author}</p>
                  <p className="text-[#6B6560] text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
