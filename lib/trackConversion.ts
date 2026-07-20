// Centralised Google Ads conversion tracking.
//
// IMPORTANT (conversion-tracking bug fix): the conversion event MUST fire
// programmatically from the JS success-callback of a form POST, never gated
// behind a full page navigation to a /thank-you URL. When a form submits via
// fetch/AJAX without navigating, a navigation-triggered conversion would never
// fire, which is why real leads were not being recorded in Google Ads.
//
// trackConversion() fires the event immediately. When a redirect should happen
// straight after (e.g. to the deposit page), pass `onDone`: we use gtag's
// `event_callback` so the conversion beacon is sent BEFORE we navigate, with a
// short timeout fallback so the redirect still happens if the callback is
// blocked or gtag never loaded.

export const ADS_ID = 'AW-17950129824'

// Conversion labels (send_to = `${ADS_ID}/${label}`).
export const CONVERSION_LEAD = `${ADS_ID}/0hYECPfNlrkcEKD9pO9C`

export function trackConversion(sendTo: string, onDone?: () => void): void {
  if (typeof window === 'undefined') {
    onDone?.()
    return
  }

  let finished = false
  const finish = () => {
    if (finished) return
    finished = true
    onDone?.()
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: sendTo,
      event_callback: onDone ? finish : undefined,
    })
    // Fallback: never block the user if the callback doesn't return.
    if (onDone) window.setTimeout(finish, 1200)
  } else {
    // gtag not loaded, don't block the flow.
    finish()
  }
}
