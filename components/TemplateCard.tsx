'use client'

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Check, ExternalLink, Info, Rocket } from 'lucide-react'
import { TemplateOption, TemplateTier, GST_NOTE } from '@/lib/templates'

interface TemplateCardProps {
  template: TemplateOption
  /** Launch flow selection mode (template + tier selection). */
  selectable?: boolean
  selected?: boolean
  selectedTier?: TemplateTier['id'] | null
  onSelect?: (templateId: string) => void
  onSelectTier?: (templateId: string, tierId: TemplateTier['id']) => void
  /** Compact launch-flow variant: smaller preview, tighter padding, trimmed copy. */
  compact?: boolean
  /** Home mode: shows a "Select & Continue" button that starts the launch flow. */
  startFlow?: boolean
  /** Gallery mode (e.g. the Projects "Browse Styles" section): hide all pricing. */
  hidePrice?: boolean
}

/** Add-ons disclaimer tooltip, hover on desktop, tap-to-reveal on mobile. */
function AddOnsTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('touchstart', handleOutside)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('touchstart', handleOutside)
    }
  }, [open])

  return (
    <span ref={wrapperRef} className="relative inline-flex group">
      <button
        type="button"
        aria-label="Add-ons disclaimer"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8A8A8A] hover:text-[#1A1A1A] transition-colors duration-200"
      >
        <Info className="w-3.5 h-3.5" />
        Add-ons disclaimer
      </button>
      <span
        role="tooltip"
        className={`absolute bottom-full left-0 z-20 mb-2 w-64 rounded-lg bg-[#1A1A1A] p-3 text-[12px] font-normal leading-relaxed text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-opacity duration-200 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto'
        }`}
      >
        {text}
        <span className="absolute top-full left-4 border-x-[6px] border-t-[6px] border-x-transparent border-t-[#1A1A1A]" />
      </span>
    </span>
  )
}

export default function TemplateCard({
  template,
  selectable = false,
  selected = false,
  selectedTier = null,
  onSelect,
  onSelectTier,
  compact = false,
  startFlow = false,
  hidePrice = false,
}: TemplateCardProps) {
  const tiers = template.tiers
  const defaultTier = tiers?.[0]?.id ?? null

  // Internal tier state keeps the preview/demo/price in sync in every mode.
  const [activeTier, setActiveTier] = useState<TemplateTier['id'] | null>(
    selectedTier ?? defaultTier
  )

  const currentTier = tiers?.find((t) => t.id === activeTier) ?? null
  const displayPrice = currentTier?.price ?? template.price
  const demoUrl = currentTier?.demoUrl ?? template.demoUrl
  const included = currentTier?.included ?? template.included
  const tooltip = currentTier?.tooltip ?? template.tooltip

  function chooseTier(tierId: TemplateTier['id']) {
    setActiveTier(tierId)
    onSelectTier?.(template.id, tierId)
  }

  const previewImages =
    template.screenshots && template.screenshots.length > 1
      ? template.screenshots.slice(0, 2)
      : null

  return (
    <div
      onClick={selectable ? () => onSelect?.(template.id) : undefined}
      className={`flex flex-col h-full rounded-xl overflow-hidden bg-white border transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${
        selectable ? 'cursor-pointer' : ''
      } ${
        selected
          ? 'border-[#5C3D2E] ring-2 ring-[#5C3D2E]'
          : 'border-[#E8E4DF] hover:border-[#1A1A1A]'
      }`}
    >
      {/* Screenshot preview */}
      <div className={`relative bg-[#F8F7F4] ${compact ? 'aspect-[16/9]' : 'aspect-[8/5]'}`}>
        {previewImages ? (
          <div className="flex h-full w-full">
            {previewImages.map((src, i) => (
              <div key={src} className="relative h-full w-1/2">
                <img
                  src={src || '/placeholder.svg'}
                  alt={`${template.businessName}, ${template.industry} website preview ${i + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {i === 0 && <span className="absolute inset-y-0 right-0 w-px bg-white/70" />}
              </div>
            ))}
          </div>
        ) : (
          <img
            src={template.screenshot || '/placeholder.svg'}
            alt={`${template.businessName}, ${template.industry} website template preview`}
            width={800}
            height={600}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>

      <div className={`flex flex-col flex-1 ${compact ? 'p-3 space-y-2' : 'p-5 space-y-3'}`}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className={`font-semibold tracking-[1.5px] uppercase text-[#8A8A8A] ${compact ? 'text-[10px]' : 'text-[12px]'}`}>
              {template.industry}
            </p>
            <h3 className={`text-[#1A1A1A] font-bold leading-tight ${compact ? 'text-sm' : 'text-lg'}`}>
              {template.businessName}
            </h3>
          </div>
          {!hidePrice && (
            <p className={`text-[#1A1A1A] font-extrabold whitespace-nowrap ${compact ? 'text-sm' : 'text-lg'}`}>
              ${displayPrice.toLocaleString()} {GST_NOTE}
            </p>
          )}
        </div>

        {/* Tier selector (e.g. Basic / Premium) */}
        {tiers && tiers.length > 1 && (
          <div className={`flex flex-col ${compact ? 'gap-1.5' : 'gap-2'}`}>
            {tiers.map((tier) => {
              const isActive = activeTier === tier.id
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    chooseTier(tier.id)
                    if (selectable) onSelect?.(template.id)
                  }}
                  className={`flex items-center justify-between gap-2 text-left rounded-[6px] border transition-colors duration-200 ${
                    compact ? 'px-2.5 py-1.5' : 'px-3 py-2'
                  } ${
                    isActive
                      ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white'
                      : 'border-[#1A1A1A]/20 text-[#1A1A1A] hover:border-[#1A1A1A]'
                  }`}
                >
                  <span className={`font-semibold ${compact ? 'text-[13px]' : 'text-sm'}`}>{tier.label}</span>
                  {!hidePrice && (
                    <span className={`font-bold whitespace-nowrap ${compact ? 'text-[13px]' : 'text-sm'}`}>
                      ${tier.price.toLocaleString()} {GST_NOTE}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* What's included, hidden in compact mode to keep cards tight */}
        {!compact && included && included.length > 0 && (
          <ul className="space-y-1.5">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[13px] text-[#5A5A5A]">
                <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#1A1A1A]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Add-ons disclaimer tooltip, hidden in compact mode */}
        {!compact && tooltip && <AddOnsTooltip text={tooltip} />}

        {/* Demo links, tiered templates show one button per tier */}
        {tiers && tiers.length > 1 ? (
          <div className="flex flex-wrap gap-2">
            {tiers.map((tier) => (
              <a
                key={tier.id}
                href={tier.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`inline-flex items-center gap-1.5 font-semibold text-[#1A1A1A] border border-[#1A1A1A]/30 rounded-[6px] hover:bg-[#1A1A1A] hover:text-white transition-colors duration-200 ${
                  compact ? 'text-[13px] px-3 py-1.5' : 'text-sm px-4 py-2'
                }`}
              >
                {compact ? (tier.id === 'premium' ? 'Premium' : 'Basic') : `View ${tier.id === 'premium' ? 'Premium' : 'Basic'} Demo`}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        ) : (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex items-center gap-1.5 font-semibold text-[#1A1A1A] border border-[#1A1A1A]/30 rounded-[6px] self-start hover:bg-[#1A1A1A] hover:text-white transition-colors duration-200 ${
              compact ? 'text-[13px] px-3 py-1.5' : 'text-sm px-4 py-2'
            }`}
          >
            View Demo
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        {/* Home mode: send visitors to the fixed-price packages on /services */}
        {startFlow && (
          <Link
            href="/services"
            onClick={(e) => e.stopPropagation()}
            className="mt-auto inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-white font-bold px-4 py-3 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200"
          >
            <Rocket className="w-4 h-4" />
            Select &amp; Continue
          </Link>
        )}

        {/* Launch flow mode: a clear "selected" affordance at the foot of the card. */}
        {selectable && (
          <div className="mt-auto pt-1">
            <span
              className={`flex items-center justify-center gap-2 rounded-[6px] font-bold transition-colors duration-200 ${
                compact ? 'px-3 py-2 text-[13px]' : 'px-4 py-3 text-sm'
              } ${
                selected
                  ? 'bg-[#5C3D2E] text-white'
                  : 'border border-[#1A1A1A]/30 text-[#1A1A1A]'
              }`}
            >
              {selected ? (
                <>
                  <Check className="w-4 h-4" />
                  Selected
                </>
              ) : (
                'Select'
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
