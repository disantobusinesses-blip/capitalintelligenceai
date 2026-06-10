'use client'

/* eslint-disable @next/next/no-img-element */

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Rocket } from 'lucide-react'
import { TemplateOption, TemplateTier, HOSTING_PLANS, HostingPlan, GST_NOTE } from '@/lib/templates'

interface TemplateCardProps {
  template: TemplateOption
  /** Launch flow selection mode (with hosting plan buttons). */
  selectable?: boolean
  selected?: boolean
  selectedHosting?: HostingPlan['id'] | null
  selectedTier?: TemplateTier['id'] | null
  onSelect?: (templateId: string) => void
  onSelectHosting?: (templateId: string, hostingId: HostingPlan['id']) => void
  onSelectTier?: (templateId: string, tierId: TemplateTier['id']) => void
  /** Home mode: shows a "Select & Continue" button that starts the launch flow. */
  startFlow?: boolean
}

export default function TemplateCard({
  template,
  selectable = false,
  selected = false,
  selectedHosting = null,
  selectedTier = null,
  onSelect,
  onSelectHosting,
  onSelectTier,
  startFlow = false,
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
      className={`flex flex-col rounded-xl overflow-hidden bg-white border transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${
        selectable ? 'cursor-pointer' : ''
      } ${
        selected
          ? 'border-[#1A1A1A] ring-2 ring-[#1A1A1A]/30'
          : 'border-[#E8E4DF] hover:border-[#1A1A1A]'
      }`}
    >
      {/* Screenshot preview */}
      <div className="relative aspect-[8/5] bg-[#F8F7F4]">
        {previewImages ? (
          <div className="flex h-full w-full">
            {previewImages.map((src, i) => (
              <div key={src} className="relative h-full w-1/2">
                <img
                  src={src || '/placeholder.svg'}
                  alt={`${template.businessName} — ${template.industry} website preview ${i + 1}`}
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
            alt={`${template.businessName} — ${template.industry} website template preview`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>

      <div className="p-5 space-y-3 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[12px] font-semibold tracking-[1.5px] uppercase text-[#8A8A8A]">
              {template.industry}
            </p>
            <h3 className="text-[#1A1A1A] font-bold text-lg leading-tight">
              {template.businessName}
            </h3>
          </div>
          <p className="text-[#1A1A1A] font-extrabold text-lg whitespace-nowrap">
            ${displayPrice.toLocaleString()} {GST_NOTE}
          </p>
        </div>

        {/* Tier selector (e.g. Basic / Premium) */}
        {tiers && tiers.length > 1 && (
          <div className="flex flex-col gap-2">
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
                  className={`flex items-center justify-between gap-2 text-left rounded-[6px] border px-3 py-2 transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white'
                      : 'border-[#1A1A1A]/20 text-[#1A1A1A] hover:border-[#1A1A1A]'
                  }`}
                >
                  <span className="text-sm font-semibold">{tier.label}</span>
                  <span className="text-sm font-bold whitespace-nowrap">
                    ${tier.price.toLocaleString()} {GST_NOTE}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {/* Demo links — tiered templates show one button per tier */}
        {tiers && tiers.length > 1 ? (
          <div className="flex flex-wrap gap-2">
            {tiers.map((tier) => (
              <a
                key={tier.id}
                href={tier.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] border border-[#1A1A1A]/30 rounded-[6px] px-4 py-2 hover:bg-[#1A1A1A] hover:text-white transition-colors duration-200"
              >
                View {tier.id === 'premium' ? 'Premium' : 'Basic'} Demo
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
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] border border-[#1A1A1A]/30 rounded-[6px] px-4 py-2 self-start hover:bg-[#1A1A1A] hover:text-white transition-colors duration-200"
          >
            View Demo
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        {/* Home mode: start the launch flow with this template preselected */}
        {startFlow && (
          <Link
            href={`/launch?template=${template.id}${activeTier ? `&tier=${activeTier}` : ''}`}
            onClick={(e) => e.stopPropagation()}
            className="mt-auto inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-white font-bold px-4 py-3 rounded-[6px] hover:bg-[#2D2D2D] transition-colors duration-200"
          >
            <Rocket className="w-4 h-4" />
            Select &amp; Continue
          </Link>
        )}

        {/* Launch flow mode: hosting plan selection */}
        {selectable && (
          <div className="flex gap-2 pt-1 mt-auto">
            {HOSTING_PLANS.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect?.(template.id)
                  onSelectHosting?.(template.id, plan.id)
                }}
                className={`flex-1 text-xs font-semibold rounded-full px-3 py-2 border transition-colors duration-200 ${
                  selected && selectedHosting === plan.id
                    ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white'
                    : 'border-[#1A1A1A]/30 text-[#5A5A5A] hover:border-[#1A1A1A]'
                }`}
              >
                {plan.label} {plan.price}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
