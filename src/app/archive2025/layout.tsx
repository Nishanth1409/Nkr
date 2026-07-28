import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NKR · 2025 Portfolio (Archive)',
  description:
    'Archived 2025 portfolio — Nishanth K R. UI/UX, logos, templates, invites, frontend.',
  openGraph: {
    title: 'NKR · 2025 Archive — Nishanth K R',
    description: 'Previous portfolio year (2025), kept for reference.',
    url: 'https://nkrportfolio.vercel.app/archive2025',
  },
}

export default function Archive2025Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
