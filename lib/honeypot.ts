/**
 * Shared between every form component and every API route it posts to, so
 * the field name can't drift out of sync between the two sides.
 *
 * Named to read as a normal field to an automated filler (bots that blindly
 * fill every input they find) while never appearing to a real visitor: see
 * components/HoneypotField.tsx for how it's hidden. Any non-empty value here
 * means whatever submitted the form isn't a person, so every route treats it
 * as spam without runningreal validation or sending a real notification.
 */
export const HONEYPOT_FIELD_NAME = 'company_website'
