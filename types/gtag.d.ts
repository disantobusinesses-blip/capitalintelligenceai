// Google Analytics gtag types
interface Window {
  gtag?: (
    command: 'event' | 'config' | 'js' | 'set',
    targetId: string,
    config?: Record<string, unknown>
  ) => void
}
