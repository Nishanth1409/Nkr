import type { Metadata, Viewport } from 'next'
import { Berkshire_Swash, Lora, Rock_Salt, Unbounded } from 'next/font/google'

import './globals.css'

import { Analytics } from '@vercel/analytics/next'

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
})

const rocksalt = Rock_Salt({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-rocksalt',
})

const unbounded = Unbounded({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-unbounded',
})

const berkshireSwash = Berkshire_Swash({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-berkshireswash',
})

export const metadata: Metadata = {
  title: 'NKR · 2026 Portfolio',
  description:
    'Son of a farmer · Always a farmer. NISHANTH K R — 2026 cinematic portfolio. Brand, UI/UX, logos, templates, invites, and frontend.',
  keywords: [
    'NISHANTH K R',
    'farmer',
    'UI/UX design',
    'logo design',
    'invitation cards',
    'digital invites',
    'templates',
    'brand design',
    'frontend',
    'portfolio',
    '2026',
    'Karnataka',
    'India',
  ],
  authors: [{ name: 'NISHANTH K R' }],
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'NKR · 2026 Portfolio — Nishanth K R',
    description:
      '3D scroll portfolio · Launch → Success. Son of a farmer · Always a farmer.',
    type: 'website',
    url: 'https://nkrportfolio.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NKR · 2026 Portfolio — Nishanth K R',
    description:
      '3D scroll portfolio · Launch → Success. Son of a farmer · Always a farmer.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lora.variable} ${rocksalt.variable} ${unbounded.variable} ${berkshireSwash.variable} bg-black text-violet-100`}
    >
      <head>
        <link rel="preload" as="video" href="/loadingpage.mp4" />
        <link rel="preload" as="video" href="/images/paper-texture.mp4" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.cdnfonts.com/css/beyonders"
        />
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/beyonders"
        />
        <link
          rel="preload"
          as="style"
          href="https://db.onlinewebfonts.com/c/3aab0c222119b30542df27260dad0ebd?family=Amsterdam+1"
        />
        <link
          href="https://db.onlinewebfonts.com/c/3aab0c222119b30542df27260dad0ebd?family=Amsterdam+1"
          rel="stylesheet"
        />
      </head>
      <body className="font-lora" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
