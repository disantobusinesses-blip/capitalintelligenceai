'use client'

import { motion } from 'framer-motion'

import { display } from '@/lib/fonts'

const STEPS = [
  {
    title: 'Real technical foundation',
    description:
      'Structured data, correct heading hierarchy, fast load times, SEO built in from day one, not sold as an add-on afterward.',
  },
  {
    title: 'Fixed-price packages',
    description:
      'Foundation, Growth, and Bespoke. No vague quotes, no scope creep, no surprises on the invoice.',
  },
  {
    title: 'Real results',
    description:
      'Every site designed to rank, load fast, and convert, backed by genuine client outcomes.',
  },
]

/**
 * Three-step timeline. The connecting line runs vertically on mobile and
 * horizontally from md up, drawn behind the markers so it never overlaps text.
 */
export default function AboutProcess() {
  return (
    <ol className="relative flex flex-col gap-10 md:flex-row md:gap-8">
      {STEPS.map((step, i) => (
        <motion.li
          key={step.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-1 gap-5 md:flex-col md:gap-0"
        >
          {/* Connector drawn per step and omitted on the last one, so the rail
              stops at the final marker instead of running off the row. Vertical
              between stacked steps on mobile, horizontal from md up. */}
          {i < STEPS.length - 1 && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-9 left-[15px] -bottom-10 w-px bg-ias-brown-mid/25 md:top-[15px] md:bottom-auto md:left-9 md:h-px md:w-[calc(100%-4px)]"
            />
          )}

          <span
            className={`${display.className} relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ias-brown-dark text-[15px] font-semibold text-white`}
          >
            {i + 1}
          </span>
          <div className="md:mt-6">
            <h3 className="text-[19px] font-semibold text-[#1A1A1A] text-balance md:text-[20px]">
              {step.title}
            </h3>
            <p className="mt-3 max-w-[360px] text-[15px] leading-relaxed text-ias-brown-muted">
              {step.description}
            </p>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}
