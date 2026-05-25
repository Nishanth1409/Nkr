'use client'

import { lazy, Suspense } from 'react'

import Introduction from '../components/introduction'

import './home.css'

// Lazy load heavy components that aren't immediately visible
const Experience = lazy(() => import('../components/experience'))
const Projects = lazy(() => import('../components/projects'))
const Contact = lazy(() => import('../components/contact'))
const Footer = lazy(() => import('../components/footer'))

// Loading fallback component
const SectionLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-400"></div>
  </div>
)

export default function Home() {
  return (
    <div className="font-lora grunge-text relative min-h-screen overflow-x-hidden bg-white text-black select-none">
      <div className="pointer-events-none absolute inset-0 z-10 bg-[url('/images/paper-texture.webp')] bg-contain bg-top bg-repeat-y opacity-30 mix-blend-multiply" />

      <div className="relative">
        <main className="snap-y snap-mandatory">
          <Introduction />
          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
