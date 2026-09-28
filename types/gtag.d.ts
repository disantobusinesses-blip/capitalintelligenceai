// Google Analytics gtag types
interface Window {
  gtag?: (
    command: 'event' | 'config' | 'js' | 'set',
    targetId: string,
    config?: Record<string, unknown>
  ) => void
  fbq?: (
    command: 'init' | 'track' | 'trackCustom',
    eventNameOrId: string,
    params?: Record<string, unknown>
  ) => void
}
