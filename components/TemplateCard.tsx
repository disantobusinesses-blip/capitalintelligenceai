'use client'

/* eslint-disable @next/next/no-img-element */

import { ExternalLink } from 'lucide-react'
import { TemplateOption, HOSTING_PLANS, HostingPlan } from '@/lib/templates'

interface TemplateCardProps {
  template: TemplateOption
  selectable?: boolean
  selected?: boolean
  selectedHosting?: HostingPlan['id'] | null
  onSelect?: (templateId: string) => void
  onSelectHosting?: (templateId: string, hostingId: HostingPlan['id']) => void
}

export default function TemplateCard({
  template,
  selectable = false,
  selected = false,
  selectedHosting = null,
  onSelect,
  onSelectHosting,
}: TemplateCardProps) {
  return (
    <div
      onClick={selectable ? () => onSelect?.(template.id) : undefined}
      className={`rounded-xl overflow-hidden bg-[#141414] border transition-all duration-200 ${
        selectable ? 'cursor-pointer' : ''
      } ${
        selected
          ? 'border-emerald-400 ring-2 ring-emerald-400/40'
          : 'border-white/10 hover:border-white/30'
      }`}
    >
      {/* Screenshot preview */}
      <div className="relative aspect-[8/5] bg-[#0a0a0a]">
        <img
          src={template.screenshot}
          alt={`${template.businessName} — ${template.industry} website template preview`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[12px] font-semibold tracking-[1.5px] uppercase text-zinc-400">
              {template.industry}
            </p>
            <h3 className="text-white font-bold text-lg leading-tight">
              {template.businessName}
            </h3>
          </div>
          <p className="text-white font-extrabold text-lg whitespace-nowrap">
            ${template.price}
          </p>
        </div>

        <a
          href={template.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-white border border-white/30 rounded-[6px] px-4 py-2 hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
        >
          View Demo
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {selectable && (
          <div className="flex gap-2 pt-1">
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
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'border-white/30 text-zinc-300 hover:border-white'
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
