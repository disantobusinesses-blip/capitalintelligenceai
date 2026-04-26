'use client'

import { Home, User, Briefcase, Layers, BookOpen, Wrench } from 'lucide-react'
import { NavBar } from '@/components/ui/tubelight-navbar'

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'About', url: '/about', icon: User },
  { name: 'Services', url: '/services', icon: Wrench },
  { name: 'Projects', url: '/projects', icon: Briefcase },
  { name: 'Features', url: '/features', icon: Layers },
  { name: 'Blog', url: '/blog', icon: BookOpen },
]

export default function BottomNav() {
  return <NavBar items={navItems} />
}
