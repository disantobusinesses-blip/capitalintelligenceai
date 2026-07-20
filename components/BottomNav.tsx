'use client'

import { Home, User, Briefcase, BookOpen, Wrench, Layers } from 'lucide-react'
import { NavBar } from '@/components/ui/tubelight-navbar'

// Mirrors the top navbar's link set. "Other" points at the same Other Services
// page as the desktop nav; the label is shortened so six items fit the mobile
// pill. "About" is a real page (app/about/page.tsx), so it stays.
const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'About', url: '/about', icon: User },
  { name: 'Services', url: '/services', icon: Wrench },
  { name: 'Projects', url: '/projects', icon: Briefcase },
  { name: 'Blog', url: '/blog', icon: BookOpen },
  { name: 'Other', url: '/services/b2b-crm-ai-platform', icon: Layers },
]

export default function BottomNav() {
  // Mobile-only: the desktop viewport uses the top navbar instead.
  return <NavBar items={navItems} className="md:hidden" />
}
