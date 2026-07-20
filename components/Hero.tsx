'use client'

import ConsultationBooking from '@/components/ConsultationBooking'

/**
 * Homepage "Book a Free Consultation" section. The booking form itself lives in
 * ConsultationBooking so the exact same flow can be reused inside the quote
 * panel's "Book a Call" view. This section is kept separate so it preserves its
 * own distinct Google Ads conversion label (AW-17950129824/ZA2zCPTNlrkcEKD9pO9C),
 * which fires from inside ConsultationBooking on a successful booking.
 */
export default function Hero() {
  return (
    <section
      id="quote"
      className="bg-[#F8F7F4] pt-[40px] pb-[80px] px-6"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-[560px] mx-auto">
          {/* Free Consultation Booking */}
          <div
            id="consultation"
            className="bg-white rounded-[12px] p-6 md:p-8 scroll-mt-24"
            style={{ border: '1px solid #E8E4DF', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
          >
            <ConsultationBooking />
          </div>
        </div>
      </div>
    </section>
  )
}
