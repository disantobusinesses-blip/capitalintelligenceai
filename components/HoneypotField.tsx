import { HONEYPOT_FIELD_NAME } from '@/lib/honeypot'

/**
 * Invisible to a real visitor and to assistive tech, present to anything that
 * fills in every input on the page. Off-screen positioning rather than
 * `display:none` or `visibility:hidden`, since some bots specifically skip
 * fields hidden that way to dodge honeypots.
 *
 * Render once inside each public form, spread its value into the POST body
 * under HONEYPOT_FIELD_NAME, and let the API route reject anything that
 * filled it, see lib/spamGuard.ts.
 */
export default function HoneypotField({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden"
    >
      <label htmlFor={HONEYPOT_FIELD_NAME}>Leave this field empty</label>
      <input
        id={HONEYPOT_FIELD_NAME}
        name={HONEYPOT_FIELD_NAME}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  )
}
