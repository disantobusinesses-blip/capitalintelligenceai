'use client'

import { Home, User, Briefcase, BookOpen, Wrench } from 'lucide-react'
import { NavBar } from '@/components/ui/tubelight-navbar'

// Mirrors the top navbar's five top-level routes. The old "Other" item pointed
// at the retired Other Services nav entry; that content now lives in anchored
// sections on /services, so the pill is down to five items.
const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'About', url: '/about', icon: User },
  { name: 'Services', url: '/services', icon: Wrench },
  { name: 'Projects', url: '/projects', icon: Briefcase },
  { name: 'Blog', url: '/blog', icon: BookOpen },
]

export default function BottomNav() {
  // Mobile-only: the desktop viewport uses the top navbar instead.
  return <NavBar items={navItems} className="md:hidden" />
}
