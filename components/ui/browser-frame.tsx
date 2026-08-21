import type { ReactNode } from 'react'

interface BrowserFrameProps {
  /** Domain shown in the URL bar, e.g. "onyxglobal.com.au". No scheme. */
  domain: string
  /** The screenshot. Positioned absolutely, so the child fills the viewport area. */
  children: ReactNode
  /**
   * Aspect ratio of the screenshot area below the chrome. Capped at 16:10 on
   * mobile so a tall screenshot cannot dominate a 375px viewport.
   */
  aspectClassName?: string
}

/**
 * Realistic browser window frame, adapted from the 21st.dev dillionverma
 * Safari mockup (id 1241).
 *
 * Adapted for the #F8F7F4 page: the chrome uses a warm neutral grey drawn from
 * the same family as the page background rather than the original's cool grey,
 * and there is no drop shadow. A heavy shadow would lift every card off the
 * page and, repeated down a grid of projects, reads as clutter. A hairline
 * border does the same job of separating chrome from screenshot.
 *
 * Purpose is credibility: the same screenshot inside real browser chrome with
 * the live domain reads as delivered client work rather than a photo gallery.
 */
export default function BrowserFrame({
  domain,
  children,
  aspectClassName = 'aspect-[16/10] md:aspect-video',
}: BrowserFrameProps) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[#E0DCD5] bg-[#F0EDE7]">
      {/* Chrome bar. Thin by design: it should frame the work, not compete. */}
      <div className="flex items-center gap-2 border-b border-[#E0DCD5] bg-[#EAE6DF] px-2.5 py-2">
        {/* Traffic lights, decorative only. */}
        <div className="flex flex-shrink-0 items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#D6CFC5]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#D6CFC5]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#D6CFC5]" />
        </div>
        {/* URL bar. The domain is real content, not decoration, so it is not
            aria-hidden: it tells a screen reader user which site this is. */}
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <span className="max-w-full truncate rounded-[4px] bg-white/70 px-2.5 py-0.5 text-[10px] font-medium text-[#6B6560] md:text-[11px]">
            {domain}
          </span>
        </div>
        {/* Balances the traffic lights so the URL bar sits optically centred. */}
        <div className="w-[38px] flex-shrink-0" aria-hidden="true" />
      </div>

      <div className={`relative w-full overflow-hidden bg-[#F0EDE7] ${aspectClassName}`}>
        {children}
      </div>
    </div>
  )
}
