import type { Metadata, Viewport } from 'next'
import { Red_Hat_Display } from 'next/font/google'

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-red-hat-display',
})

export const metadata: Metadata = {
  title: 'NISHANTH K R | Web Developer Portfolio - 2024 Archive',
  description:
    'NISHANTH K R - Computer Science and Design student specializing in web development. Portfolio showcasing projects in full-stack development, and software engineering.',
  keywords: [
    'NISHANTH K R',
    'web developer',
    'computer science',
    'UI/UX design',
    'portfolio',
    'Karnataka',
    'India',
    'full-stack developer',
  ],
  authors: [{ name: 'NISHANTH K R' }],
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'NISHANTH K R - Web Developer Portfolio - 2024 Archive',
    description:
      'Computer Science and Design student specializing in web development. View my projects and get in touch for collaborations.',
    type: 'website',
    url: 'https://manjumadhav.vercel.app/archive2024',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NISHANTH K R - Web Developer Portfolio - 2024 Archive',
    description:
      'Computer Science and Design student specializing in web development. View my projects and get in touch for collaborations.',
  },
}

export const viewport: Viewport = {
  themeColor: '#7f22fe',
}

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      data-archive-layout
      className={`${redHatDisplay.variable} font-redhatdisplay min-h-screen bg-black text-violet-100`}
    >
      {children}
    </div>
  )
}
