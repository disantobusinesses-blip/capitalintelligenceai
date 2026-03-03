'use client'

import { Home, User, Briefcase, DollarSign, Layers } from 'lucide-react'
import { NavBar } from '@/components/ui/tubelight-navbar'

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'About', url: '/about', icon: User },
  { name: 'Projects', url: '/projects', icon: Briefcase },
  { name: 'Pricing', url: '/pricing', icon: DollarSign },
  { name: 'Features', url: '/features', icon: Layers },
]

export default function BottomNav() {
  return <NavBar items={navItems} />
}
