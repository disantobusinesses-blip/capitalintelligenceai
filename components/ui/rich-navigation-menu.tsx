'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * RichNavigationMenu — adapted from 21st.dev (Rich Navigation Menu, id 18191,
 * by shadcnui-blocks).
 *
 * Adaptations for this project:
 *  - Icon set dropped. The stock block pairs every item with a generic SaaS
 *    glyph; this is a services agency, so items are text plus an optional
 *    one-line description and the only icon left is the caret affordance.
 *  - Palette mapped onto the IAS brown tokens rather than the stock
 *    zinc/primary scale.
 *  - Radix dependency removed. The stock block pulls in
 *    @radix-ui/react-navigation-menu; this version is a small hover/focus
 *    controlled menu so no new dependency is added to the project.
 *  - Accessibility: each trigger owns its panel via aria-controls/aria-expanded,
 *    the panel closes on Escape and on focus leaving the group, and hover intent
 *    is debounced on close so the pointer can cross the gap to the panel.
 */

export interface NavChild {
  label: string
  href: string
  description?: string
}

export interface NavColumn {
  heading: string
  items: NavChild[]
}

export interface NavEntry {
  label: string
  href: string
  columns?: NavColumn[]
  /** Optional promo rail rendered down the right edge of the panel. */
  feature?: {
    title: string
    body: string
    href: string
    cta: string
  }
}

/** True when `href` is the current page or an ancestor of it. */
function useIsActive(href: string) {
  const pathname = usePathname()
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function NavLeaf({ item, onNavigate }: { item: NavChild; onNavigate: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="block rounded-[6px] px-3 py-2 transition-colors duration-150 hover:bg-[#F3EFE9] focus-visible:bg-[#F3EFE9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ias-brown-mid/50"
    >
      <span className="block text-[14px] font-medium text-[#1A1A1A]">{item.label}</span>
      {item.description && (
        <span className="mt-0.5 block text-[12.5px] leading-snug text-[#6B6560]">
          {item.description}
        </span>
      )}
    </Link>
  )
}

function NavItem({ entry }: { entry: NavEntry }) {
  const [open, setOpen] = useState(false)
  const groupRef = useRef<HTMLLIElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const panelId = useId()
  const isActive = useIsActive(entry.href)
  const hasPanel = Boolean(entry.columns?.length)

  // Closing is debounced so the pointer can travel the gap between the trigger
  // and the panel without the panel vanishing mid-move. Opening is immediate.
  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  if (!hasPanel) {
    return (
      <li>
        <Link
          href={entry.href}
          aria-current={isActive ? 'page' : undefined}
          className={`text-[15px] font-medium transition-colors duration-200 hover:text-ias-brown-dark ${
            isActive ? 'text-ias-brown-dark' : 'text-[#1A1A1A]'
          }`}
        >
          {entry.label}
        </Link>
      </li>
    )
  }

  return (
    <li
      ref={groupRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={(e) => {
        // Only close when focus actually leaves the trigger + panel subtree.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          setOpen(false)
          groupRef.current?.querySelector<HTMLElement>('[data-nav-trigger]')?.focus()
        }
      }}
    >
      <div className="flex items-center gap-1">
        <Link
          href={entry.href}
          data-nav-trigger
          aria-current={isActive ? 'page' : undefined}
          className={`text-[15px] font-medium transition-colors duration-200 hover:text-ias-brown-dark ${
            isActive ? 'text-ias-brown-dark' : 'text-[#1A1A1A]'
          }`}
        >
          {entry.label}
        </Link>
        <button
          type="button"
          aria-label={`${entry.label} menu`}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="rounded p-0.5 text-[#6B6560] transition-colors duration-200 hover:text-ias-brown-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ias-brown-mid/50"
        >
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            strokeWidth={2}
          />
        </button>
      </div>

      <div
        id={panelId}
        // Kept mounted so the fade/rise can play both ways; pointer-events are
        // dropped while hidden so the invisible panel never eats clicks.
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-200 ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div
          className="flex gap-6 rounded-[10px] bg-white p-5"
          style={{ border: '1px solid #E8E4DF', boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
        >
          {entry.columns!.map((col) => (
            <div key={col.heading} className="w-[236px]">
              {/* #9E684C only reaches 2.88:1 at 11px; this darker grey clears AA. */}
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[1.2px] text-[#6B6560]">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-0.5">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <NavLeaf item={item} onNavigate={() => setOpen(false)} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {entry.feature && (
            /* Pale brown tint, not `--ias-brown-light`. That mid-tone only
               reaches 3.54:1 behind this 12.5px copy (and 4.54:1 even against
               pure black), so it cannot carry small text at AA. */
            <div
              className="flex w-[220px] flex-col rounded-[8px] p-4"
              style={{ backgroundColor: 'var(--ias-brown-pale)' }}
            >
              <p className="text-[15px] font-bold leading-snug text-[#2E1B12]">
                {entry.feature.title}
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-[#2E1B12]/80">
                {entry.feature.body}
              </p>
              <Link
                href={entry.feature.href}
                onClick={() => setOpen(false)}
                className="mt-auto pt-4 text-[13px] font-semibold text-[#2E1B12] underline underline-offset-2"
              >
                {entry.feature.cta}
              </Link>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export default function RichNavigationMenu({ entries }: { entries: NavEntry[] }) {
  return (
    <nav aria-label="Main">
      <ul className="flex items-center gap-7">
        {entries.map((entry) => (
          <NavItem key={entry.href} entry={entry} />
        ))}
      </ul>
    </nav>
  )
}
