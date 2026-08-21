/**
 * FadeRiseText, the site's headline entrance animation.
 *
 * Replaces the previous typewriter effect. Design differences that matter:
 *  - The full string is rendered on the server and present at first paint, so
 *    crawlers and screen readers get the real heading, and LCP is not gated on
 *    a JS timer revealing one character at a time.
 *  - Only opacity/transform animate (both compositor-friendly), and the
 *    container reserves final layout immediately, so no reflow per character.
 *  - No `use client`. This is pure CSS, so it drops straight into the server
 *    components that render these headings.
 *
 * Words fade and rise in a short stagger. Reduced-motion users get the final
 * state instantly, handled in globals.css.
 */
export default function FadeRiseText({
  text,
  className,
  /** Delay before the first word starts, seconds. */
  delay = 0,
  /** Gap between consecutive words, seconds. Keep small; this multiplies. */
  stagger = 0.07,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
}) {
  const words = text.split(' ')

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          // Words repeat within a headline, so the index has to be part of the key.
          key={`${word}-${i}`}
          className="ias-fade-rise-word inline-block whitespace-pre"
          style={{ animationDelay: `${delay + i * stagger}s` }}
        >
          {/* Trailing space lives inside the animated span (with whitespace-pre
              so it is preserved) rather than between spans, where inline-block
              siblings would collapse it and run the words together. */}
          {i < words.length - 1 ? `${word} ` : word}
        </span>
      ))}
    </span>
  )
}
