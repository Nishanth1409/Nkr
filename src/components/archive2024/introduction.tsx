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
      className="portfolio-shell relative flex min-h-screen snap-start flex-col items-center justify-center gap-[clamp(1.5rem,4vh,3rem)] text-center lg:items-start"
    >
      <div className="z-10 flex flex-col items-center lg:items-start">
        <h1 className="flex max-w-full flex-wrap items-baseline justify-center text-[clamp(1.5rem,4vw+0.5rem,3rem)] font-semibold">
          <span className="mr-[0.8vw]">Hi!&nbsp;I&nbsp;am</span>
          <div className="inline-block max-w-full text-[clamp(2rem,6vw+0.75rem,4.5rem)]">
            <span className="name-text break-words">{PORTFOLIO_NAME}</span>
            <span className="-ml-2 animate-pulse sm:ml-[-0.8rem]">.</span>
          </div>
        </h1>
        <span className="font-lora max-w-[min(100%,42rem)] text-balance px-1 text-sm sm:text-base md:text-lg">
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
