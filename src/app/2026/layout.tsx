import type { Metadata } from 'next'
import { DM_Sans, Instrument_Serif, Syne } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-p26-display',
})

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-p26-serif',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-p26-sans',
})

export const metadata: Metadata = {
  title: 'NKR · 2026 Portfolio',
  description:
    'Nishanth K R — 2026 cinematic portfolio. Launch to success: brand, UI/UX, and frontend from Karnataka.',
  openGraph: {
    title: 'NKR · 2026 Portfolio — Nishanth K R',
    description:
      '3D scroll portfolio · Launch → Success. Son of a farmer · Always a farmer.',
    url: 'https://nkrportfolio.vercel.app/2026',
  },
}

export default function Layout2026({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`${syne.variable} ${instrument.variable} ${dmSans.variable}`}
    >
      {children}
    </div>
  )
}
