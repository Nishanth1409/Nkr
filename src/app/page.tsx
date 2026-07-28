'use client'

import { lazy, Suspense } from 'react'

import Introduction from '../components/introduction'
import { LoadingSplash } from '../components/loading-splash'
import MyDesigns from '../components/my-designs'
import { PaperTextureBackground } from '../components/paper-texture-background'
import { ScrollToTop } from '../components/scroll-to-top'
import { SectionDivider } from '../components/ui/section-divider'

import './home.css'
import './loading-splash.css'

// Lazy load heavy components that aren't immediately visible
const Experience = lazy(() => import('../components/experience'))
const Projects = lazy(() => import('../components/projects'))
const FigmaWorks = lazy(() => import('../components/figma-works'))
const OtherWorks = lazy(() => import('../components/other-works'))
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
    <LoadingSplash>
      <div className="font-lora grunge-text relative min-h-screen w-full max-w-[100%] overflow-x-clip bg-white text-black select-none">
      <PaperTextureBackground />

      <div className="relative">
        <main>
          <div id="home-intro" className="home-section">
            <Introduction />
          </div>
          <SectionDivider />
          <div className="home-section">
            <Suspense fallback={<SectionLoader />}>
              <Experience />
            </Suspense>
          </div>
          <SectionDivider />
          <div className="home-section">
            <Suspense fallback={<SectionLoader />}>
              <Projects />
            </Suspense>
          </div>
          <SectionDivider />
          <div className="home-section figma-cube-home-section">
            <Suspense fallback={<SectionLoader />}>
              <FigmaWorks />
            </Suspense>
          </div>
          <SectionDivider />
          <div className="home-section photography-section">
            <Suspense fallback={<SectionLoader />}>
              <OtherWorks />
            </Suspense>
          </div>
          <div className="home-section my-designs-home-section designs-section-snap">
            <MyDesigns />
          </div>
          <SectionDivider />
          <div className="home-section contact-home-section">
            <Suspense fallback={<SectionLoader />}>
              <Contact />
            </Suspense>
          </div>
          <SectionDivider />
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        </main>
      </div>

        <ScrollToTop />
      </div>
    </LoadingSplash>
  )
}
