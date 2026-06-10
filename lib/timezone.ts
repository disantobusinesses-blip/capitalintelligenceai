// Timezone utilities for Australia/Melbourne (AEST/AEDT)
// Handles correct conversion of Melbourne wall-clock times to UTC,
// accounting for daylight saving time.

export const TIMEZONE = 'Australia/Melbourne'

/**
 * Returns the offset (in milliseconds) of Australia/Melbourne from UTC
 * at the given instant. Positive means Melbourne is ahead of UTC.
 * e.g. UTC+10 -> 36000000, UTC+11 (DST) -> 39600000
 */
function getMelbourneOffsetMs(date: Date): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  const parts = dtf.formatToParts(date)
  const map: Record<string, number> = {}
  for (const part of parts) {
    if (part.type !== 'literal') {
      map[part.type] = Number(part.value)
    }
  }

  // Treat the Melbourne wall-clock components as if they were UTC,
  // then compare against the actual instant to derive the offset.
  const asUTC = Date.UTC(
    map.year,
    map.month - 1,
    map.day,
    map.hour === 24 ? 0 : map.hour,
    map.minute,
    map.second
  )

  return asUTC - date.getTime()
}

/**
 * Converts a Melbourne wall-clock time (e.g. user selects 2:30pm on a date)
 * into the correct UTC Date instant, accounting for AEST/AEDT.
 *
 * @param dateStr - ISO date string like "2025-01-15"
 * @param hour - hour in 24h format (Melbourne local)
 * @param minute - minute (Melbourne local)
 */
export function melbourneWallTimeToUTC(dateStr: string, hour: number, minute: number): Date {
  const [year, month, day] = dateStr.split('T')[0].split('-').map(Number)

  // First guess: treat the wall-clock time as if it were UTC.
  const utcGuessMs = Date.UTC(year, month - 1, day, hour, minute, 0, 0)

  // Determine Melbourne's offset at that instant and shift back to true UTC.
  const offset = getMelbourneOffsetMs(new Date(utcGuessMs))
  return new Date(utcGuessMs - offset)
}
