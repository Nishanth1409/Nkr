import { DM_Sans, Instrument_Serif, Syne } from 'next/font/google'

import Portfolio2026 from '../components/portfolio2026/Portfolio2026'

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

/** 2026 is the current portfolio at `/`. */
export default function Home() {
  return (
    <div
      className={`${syne.variable} ${instrument.variable} ${dmSans.variable}`}
    >
      <Portfolio2026 />
    </div>
  )
}
