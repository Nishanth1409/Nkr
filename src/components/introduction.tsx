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
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="container flex flex-col gap-8 justify-center items-start px-8 py-16 bg-white md:px-24 md:py-32">
        <div className="flex flex-col gap-4">
          <span className="text-3xl text-black sm:text-4xl md:text-5xl">{PORTFOLIO_NAME}</span>
          <span className="text-xl text-black sm:text-2xl">{PORTFOLIO_TAGLINE}</span>
        </div>

        <div className="flex flex-col gap-2">
          {PORTFOLIO_INTRO_PARAGRAPHS.map((paragraph) => (
            <span key={paragraph} className="text-lg text-black md:text-xl">
              {paragraph}
            </span>
          ))}
        </div>

        <div className="flex flex-col items-start gap-[9px] self-stretch">
          <span className="text-lg text-black md:text-xl">Technologies I work with</span>
          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3">
            {technologies.map((tech, index) => (
              <div key={index} className="tech-card-border">
                <div className="tech-card-inner flex items-center gap-2 p-2.5">
                  {tech.icons ? (
                    <div className="no-grunge flex shrink-0 items-center gap-1">
                      {tech.icons.map((Icon, iconIndex) => (
                        <Icon key={iconIndex} className="h-6 w-6 shrink-0" />
                      ))}
                    </div>
                  ) : (
                    tech.icon && <tech.icon className="no-grunge h-6 w-6 shrink-0" />
                  )}
                  <span className="no-grunge text-base text-black">{tech.name}</span>
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
