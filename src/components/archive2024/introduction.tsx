'use client'

import React, { memo, RefObject, useCallback } from 'react'

import HoverBorderGradient from './ui/hover-border-gradient'
import { StarfieldRef } from './ui/Starfield'
import { TextGenerateEffect } from './ui/text-generate-effect'

interface IntroProps {
  starfieldRef?: RefObject<StarfieldRef | null>
}

// *****************
// Introduction text
// *****************

const INTRO_TEXT = 'A developer who builds web apps and enjoys good design'

const Intro = memo(({ starfieldRef }: IntroProps) => {
  // *********************
  // Explore click handler
  // *********************

  const handleExploreClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()

      // Trigger light-speed effect
      if (starfieldRef?.current) {
        starfieldRef.current.triggerLightSpeed()
      }

      // Smooth scroll to myworks section
      const targetElement = document.getElementById('myworks')
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    },
    [starfieldRef],
  )

  // **********************
  // Introduction component
  // **********************

  return (
    <section
      id="intro"
      className="relative flex min-h-screen snap-start flex-col items-center justify-center gap-8 px-4 text-center sm:gap-12 sm:px-8 md:px-16 lg:items-start lg:px-24 xl:px-32"
    >
      <div className="z-10 flex flex-col items-center lg:items-start">
        <h1 className="flex flex-wrap items-baseline justify-center text-3xl font-semibold sm:text-4xl md:text-5xl">
          <span className="mr-[0.8vw]">Hi!&nbsp;I&nbsp;am</span>
          <div className="inline-block text-5xl sm:text-6xl md:text-7xl">
            <span className="name-text">Manju&nbsp;Madhav&nbsp;</span>
            <span className="-ml-2 animate-pulse sm:ml-[-0.8rem]">.</span>
          </div>
        </h1>
        <span className="font-lora text-sm sm:text-base md:text-lg">
          <TextGenerateEffect words={INTRO_TEXT} duration={2} filter={false} />
        </span>
      </div>
      <HoverBorderGradient
        as="a"
        href="#myworks"
        onClick={handleExploreClick}
        containerClassName="rounded-full z-20"
        className="flex items-center space-x-2 bg-black text-sm text-white sm:text-base"
      >
        Explore My Works
      </HoverBorderGradient>
    </section>
  )
})

Intro.displayName = 'Intro'

export default Intro
