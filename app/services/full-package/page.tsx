import { redirect, RedirectType } from 'next/navigation'

export default function FullPackagePage() {
  redirect('/services', RedirectType.replace)
}
