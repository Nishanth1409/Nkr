import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Serif } from 'next/font/google'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-ibm-plex-sans',
})

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-ibm-plex-serif',
})

export const metadata: Metadata = {
  title: 'NISHANTH K R | Portfolio - 2023 Archive',
  description:
    'NISHANTH K R - 2023 portfolio archive. Computer Science and Design student specializing in UI/UX, photo editing, and template design.',
  keywords: [
    'NISHANTH K R',
    'UI/UX design',
    'portfolio',
    'Karnataka',
    'India',
    '2023 archive',
  ],
  authors: [{ name: 'NISHANTH K R' }],
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'NISHANTH K R - Portfolio - 2023 Archive',
    description:
      '2023 portfolio archive — UI/UX, photo editing, and template design.',
    type: 'website',
    url: 'https://nkrportfolio.vercel.app/archive2023',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NISHANTH K R - Portfolio - 2023 Archive',
    description:
      '2023 portfolio archive — UI/UX, photo editing, and template design.',
  },
}

export const viewport: Viewport = {
  themeColor: '#FFB147',
}

export default function Archive2023Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      data-archive2023-layout
      className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable} min-h-screen bg-white text-black [font-family:var(--font-ibm-plex-sans),system-ui,sans-serif] [&_.font-serif]:[font-family:var(--font-ibm-plex-serif),Georgia,serif]`}
    >
      {children}
    </div>
  )
}
