import { redirect, RedirectType } from 'next/navigation'

export default function B2BCrmAiPlatformPage() {
  redirect('/services', RedirectType.replace)
}
