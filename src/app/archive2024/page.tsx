'use client'

import { lazy, Suspense, useRef } from 'react'

import Header from '../../components/archive2024/header'
import Intro from '../../components/archive2024/introduction'
import Starfield, {
  StarfieldRef,
} from '../../components/archive2024/ui/Starfield'

// Lazy load heavy components that aren't immediately visible
const About = lazy(() => import('../../components/archive2024/about-me'))
const Experience = lazy(
  () => import('../../components/archive2024/experience-section'),
)
const Projects = lazy(
  () => import('../../components/archive2024/project-works'),
)
const MyWorks = lazy(() => import('../../components/archive2024/my-works'))
const Contact = lazy(
  () => import('../../components/archive2024/contact-section'),
)

// Loading fallback component
const SectionLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-violet-400"></div>
  </div>
)

export default function Archive2024() {
  const starfieldRef = useRef<StarfieldRef>(null)

  return (
    <div className="relative min-h-screen overflow-x-hidden select-none">
      <div className="fixed inset-0 z-0">
        <Starfield
          ref={starfieldRef}
          starCount={1000}
          starColor={[255, 255, 255]}
          speedFactor={0.005}
          backgroundColor="black"
        />
      </div>
      <div className="relative z-10">
        <Header starfieldRef={starfieldRef} />
        <main className="snap-y snap-mandatory">
          <Intro starfieldRef={starfieldRef} />
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <MyWorks />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
