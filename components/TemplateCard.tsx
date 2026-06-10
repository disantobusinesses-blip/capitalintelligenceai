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
      className={`rounded-xl overflow-hidden bg-white border transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${
        selectable ? 'cursor-pointer' : ''
      } ${
        selected
          ? 'border-[#1A1A1A] ring-2 ring-[#1A1A1A]/30'
          : 'border-[#E8E4DF] hover:border-[#1A1A1A]'
      }`}
    >
      {/* Screenshot preview */}
      <div className="relative aspect-[8/5] bg-[#F8F7F4]">
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
            <p className="text-[12px] font-semibold tracking-[1.5px] uppercase text-[#8A8A8A]">
              {template.industry}
            </p>
            <h3 className="text-[#1A1A1A] font-bold text-lg leading-tight">
              {template.businessName}
            </h3>
          </div>
          <p className="text-[#1A1A1A] font-extrabold text-lg whitespace-nowrap">
            ${template.price}
          </p>
        </div>

        <a
          href={template.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] border border-[#1A1A1A]/30 rounded-[6px] px-4 py-2 hover:bg-[#1A1A1A] hover:text-white transition-colors duration-200"
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
