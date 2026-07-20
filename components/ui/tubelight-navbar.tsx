"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(items[0].name)

  useEffect(() => {
    const match = items.find((item) => item.url === pathname)
    if (match) setActiveTab(match.name)
  }, [pathname, items])

  return (
    <div
      className={cn(
        "fixed bottom-0 left-1/2 -translate-x-1/2 z-50 mb-6",
        className,
      )}
    >
      <div className="flex items-center gap-0 bg-tech-black/80 border border-tech-baby-blue/30 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              aria-label={item.name}
              className={cn(
                "relative cursor-pointer font-semibold rounded-full transition-colors",
                // Mobile: label only, compact padding so all items fit at 375px
                "px-2.5 py-2",
                // Desktop: label with more padding
                "md:px-5 md:py-2",
                "text-tech-platinum hover:text-tech-white",
                isActive && "bg-tech-baby-blue/10 text-tech-white",
              )}
            >
              {/* Mobile and desktop: label only */}
              <span className="text-xs md:text-sm">{item.name}</span>
              {isActive && (
                <div className="absolute inset-0 w-full bg-tech-baby-blue/5 rounded-full -z-10 transition-opacity duration-200">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-tech-baby-blue rounded-t-full">
                    <div className="absolute w-12 h-6 bg-tech-baby-blue/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-tech-baby-blue/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-tech-baby-blue/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
