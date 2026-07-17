import { redirect, RedirectType } from 'next/navigation'

export default function PricingPage() {
  redirect('/services', RedirectType.replace)
}
