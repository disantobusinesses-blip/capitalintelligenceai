'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'

/**
 * DragCarousel — a horizontal scroll-snap rail with pointer dragging.
 *
 * Built on native overflow scrolling rather than a transform-based slider, so
 * mobile keeps real touch momentum/rubber-banding and the whole thing degrades
 * to a plain scrollable row without JS. On top of that it adds:
 *
 *  - Click-and-drag for mouse users (touch is left to the browser, which
 *    already does it better than any JS handler).
 *  - Prev/next buttons that page by one card width.
 *  - Dot indicators driven by observed scroll position, so they stay correct
 *    when the user flicks or drags rather than clicking.
 *
 * Accessibility: the rail is a focusable region with arrow-key scrolling, and
 * the drag layer never swallows keyboard or link semantics — a drag that moves
 * less than DRAG_SLOP px is treated as a click so cards remain clickable.
 */

/** Movement under this many px counts as a click, not a drag. */
const DRAG_SLOP = 8

export default function DragCarousel({
  children,
  label,
  className = '',
}: {
  children: ReactNode
  /** Accessible name for the scrollable region. */
  label: string
  className?: string
}) {
  const railRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const [activePage, setActivePage] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // Pointer-drag bookkeeping. Kept in a ref so the move handler never restarts.
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 })

  /** Width of one card plus its gap, used for paging and dot maths. */
  const stepSize = useCallback(() => {
    const rail = railRef.current
    if (!rail) return 0
    const first = rail.firstElementChild as HTMLElement | null
    if (!first) return rail.clientWidth
    const gap = Number.parseFloat(getComputedStyle(rail).columnGap || '0') || 0
    return first.offsetWidth + gap
  }, [])

  const sync = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    const { scrollLeft, scrollWidth, clientWidth } = rail
    const maxScroll = scrollWidth - clientWidth
    // 1px tolerance: sub-pixel layout means scrollLeft rarely hits max exactly.
    setCanPrev(scrollLeft > 1)
    setCanNext(scrollLeft < maxScroll - 1)

    const step = stepSize()
    if (step > 0) {
      const perView = Math.max(1, Math.round(clientWidth / step))
      const total = Math.max(1, Math.ceil(rail.children.length - perView + 1))
      setPageCount(total)
      setActivePage(Math.min(total - 1, Math.round(scrollLeft / step)))
    }
  }, [stepSize])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(rail)
    return () => observer.disconnect()
  }, [sync])

  const scrollByPage = (direction: 1 | -1) => {
    railRef.current?.scrollBy({ left: direction * stepSize(), behavior: 'smooth' })
  }

  const scrollToPage = (page: number) => {
    railRef.current?.scrollTo({ left: page * stepSize(), behavior: 'smooth' })
  }

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    // Every new press starts a fresh gesture. Resetting `moved` here (rather
    // than only in the click handler) matters because a drag that ends outside
    // the rail never produces a click, and a stale distance would then suppress
    // the *next* genuine click on a card.
    drag.current.moved = 0
    // Touch and pen already get native momentum scrolling; only hijack mouse.
    if (e.pointerType !== 'mouse') return
    const rail = railRef.current
    if (!rail) return
    drag.current = { active: true, startX: e.clientX, startScroll: rail.scrollLeft, moved: 0 }
    setIsDragging(true)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current
    if (!drag.current.active || !rail) return
    const delta = e.clientX - drag.current.startX
    drag.current.moved = Math.max(drag.current.moved, Math.abs(delta))
    rail.scrollLeft = drag.current.startScroll - delta
  }

  const endDrag = () => {
    if (!drag.current.active) return
    drag.current.active = false
    setIsDragging(false)
  }

  // A drag that travelled far enough must not also fire the card's click.
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved > DRAG_SLOP) {
      e.preventDefault()
      e.stopPropagation()
    }
    drag.current.moved = 0
  }

  return (
    <div className={className}>
      <div
        ref={railRef}
        role="group"
        aria-label={label}
        tabIndex={0}
        onScroll={sync}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        // Cards contain <img> and <a>, both natively draggable. Without this the
        // browser starts its own image/link drag on mousedown, which cancels our
        // pointer stream and the rail never scrolls.
        onDragStart={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault()
            scrollByPage(1)
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault()
            scrollByPage(-1)
          }
        }}
        className={`flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ias-brown-mid/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F8F7F4] rounded-[10px] ${
          isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
        }`}
        // Lock scrolling to the horizontal axis so a vertical page swipe on
        // mobile still scrolls the page rather than fighting the rail.
        style={{ touchAction: 'pan-y pinch-zoom', overscrollBehaviorX: 'contain' }}
      >
        {children}
      </div>

      {/* Controls: dots for position, arrows for paging. Hidden entirely when
          everything already fits, so a short list has no dead chrome. */}
      {(canPrev || canNext) && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label={`${label} position`}>
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activePage}
                aria-label={`Go to item ${i + 1}`}
                onClick={() => scrollToPage(i)}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ias-brown-mid/50 ${
                  i === activePage
                    ? 'w-7 bg-ias-brown-dark'
                    : 'w-1.5 bg-ias-brown-dark/25 hover:bg-ias-brown-dark/50'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              disabled={!canPrev}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ias-brown-dark/25 text-ias-brown-dark transition-colors duration-200 hover:border-ias-brown-dark hover:bg-ias-brown-dark hover:text-white disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ias-brown-mid/50"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              disabled={!canNext}
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ias-brown-dark/25 text-ias-brown-dark transition-colors duration-200 hover:border-ias-brown-dark hover:bg-ias-brown-dark hover:text-white disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ias-brown-mid/50"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
