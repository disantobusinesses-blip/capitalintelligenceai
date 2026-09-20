import { redirect, RedirectType } from 'next/navigation'

export default function LandingPagePage() {
  redirect('/services', RedirectType.replace)
}
