import { redirect } from 'next/navigation'

/** Legacy path — 2026 lives at `/` now. */
export default function Legacy2026Redirect() {
  redirect('/')
}
