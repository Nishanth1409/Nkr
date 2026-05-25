'use client'

import React, { memo, RefObject, useCallback } from 'react'

import {
  PORTFOLIO_NAME,
  PORTFOLIO_TAGLINE,
} from '../../data/portfolio-content'
import HoverBorderGradient from './ui/hover-border-gradient'
import { StarfieldRef } from './ui/Starfield'
import { TextGenerateEffect } from './ui/text-generate-effect'

interface IntroProps {
  starfieldRef?: RefObject<StarfieldRef | null>
}

const Intro = memo(({ starfieldRef }: IntroProps) => {
  const handleExploreClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()

      if (starfieldRef?.current) {
        starfieldRef.current.triggerLightSpeed()
      }

      const targetElement = document.getElementById('about')
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    },
    [starfieldRef],
  )

  return (
    <section
      id="intro"
      className="relative flex min-h-screen snap-start flex-col items-center justify-center gap-8 px-4 text-center sm:gap-12 sm:px-8 md:px-16 lg:items-start lg:px-24 xl:px-32"
    >
      <div className="z-10 flex flex-col items-center lg:items-start">
        <h1 className="flex flex-wrap items-baseline justify-center text-3xl font-semibold sm:text-4xl md:text-5xl">
          <span className="mr-[0.8vw]">Hi!&nbsp;I&nbsp;am</span>
          <div className="inline-block text-5xl sm:text-6xl md:text-7xl">
            <span className="name-text">{PORTFOLIO_NAME.replace(/ /g, '\u00a0')}</span>
            <span className="-ml-2 animate-pulse sm:ml-[-0.8rem]">.</span>
          </div>
        </h1>
        <span className="font-lora text-sm sm:text-base md:text-lg">
          <TextGenerateEffect words={PORTFOLIO_TAGLINE} duration={2} filter={false} />
        </span>
      </div>
      <HoverBorderGradient
        as="a"
        href="#about"
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
