import React from 'react'
import type { IconType } from 'react-icons'
import { FaFigma, FaReact } from 'react-icons/fa'
import { FaCss3Alt } from 'react-icons/fa6'
import { IoLogoJavascript } from 'react-icons/io5'
import { RiTailwindCssFill } from 'react-icons/ri'
import { SiCanva, SiFirebase, SiHtml5, SiNextdotjs, SiSupabase } from 'react-icons/si'

import {
  PORTFOLIO_INTRO_PARAGRAPHS,
  PORTFOLIO_NAME,
  PORTFOLIO_TAGLINE,
} from '../data/portfolio-content'

type Technology = {
  name: string
  icon?: IconType
  icons?: IconType[]
}

const technologies: Technology[] = [
  { icon: SiCanva, name: 'Canva' },
  { icon: FaFigma, name: 'Figma' },
  { icons: [SiHtml5, FaCss3Alt], name: 'HTML & CSS' },
  { icon: IoLogoJavascript, name: 'JavaScript' },
  { icon: FaReact, name: 'React' },
  { icon: SiNextdotjs, name: 'Next.js' },
  { icon: SiFirebase, name: 'Firebase' },
  { icon: SiSupabase, name: 'Supabase' },
  { icon: RiTailwindCssFill, name: 'Tailwind' },
]

const Introduction = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="portfolio-shell flex flex-col items-start justify-center gap-6 bg-white sm:gap-8">
        <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
          <span className="text-[clamp(1.75rem,5vw+0.5rem,3rem)] leading-tight text-black">
            {PORTFOLIO_NAME}
          </span>
          <span className="text-[clamp(1rem,2.5vw+0.4rem,1.5rem)] leading-snug text-pretty text-black">
            {PORTFOLIO_TAGLINE}
          </span>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          {PORTFOLIO_INTRO_PARAGRAPHS.map((paragraph) => (
            <span
              key={paragraph}
              className="text-[clamp(1rem,1.5vw+0.65rem,1.25rem)] leading-relaxed text-pretty text-black"
            >
              {paragraph}
            </span>
          ))}
        </div>

        <div className="flex w-full min-w-0 flex-col items-start gap-[9px] self-stretch">
          <span className="text-[clamp(1rem,1.5vw+0.65rem,1.25rem)] text-black">
            Technologies I work with
          </span>
          <div className="grid w-full grid-cols-1 gap-3 min-[380px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
            {technologies.map((tech, index) => (
              <div key={index} className="tech-card-border min-w-0">
                <div className="tech-card-inner flex min-w-0 items-center gap-2 px-2.5 py-1.5">
                  {tech.icons ? (
                    <div className="no-grunge flex shrink-0 items-center gap-1">
                      {tech.icons.map((Icon, iconIndex) => (
                        <Icon key={iconIndex} className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                      ))}
                    </div>
                  ) : (
                    tech.icon && (
                      <tech.icon className="no-grunge h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                    )
                  )}
                  <span className="no-grunge min-w-0 text-sm text-black sm:text-base">
                    {tech.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Introduction
