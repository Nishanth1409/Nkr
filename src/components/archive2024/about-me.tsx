'use client'

import React, { memo } from 'react'
import { FaFigma, FaReact } from 'react-icons/fa'
import { FaCss3Alt } from 'react-icons/fa6'
import { IoLogoJavascript } from 'react-icons/io5'
import { RiTailwindCssFill } from 'react-icons/ri'
import {
  SiCanva,
  SiFirebase,
  SiHtml5,
  SiNextdotjs,
  SiSupabase,
} from 'react-icons/si'

import { PORTFOLIO_INTRO_PARAGRAPHS } from '../../data/portfolio-content'

const TECH_STACK = [
  {
    name: 'Canva',
    desc: 'Social templates and quick campaign visuals.',
    icon: <SiCanva className="text-violet-400" />,
  },
  {
    name: 'Figma',
    desc: 'UI/UX layouts and design systems.',
    icon: <FaFigma className="text-violet-400" />,
  },
  {
    name: 'HTML & CSS',
    desc: 'Semantic markup and responsive styling.',
    icon: (
      <>
        <SiHtml5 className="text-violet-400" />
        <FaCss3Alt className="text-violet-400" />
      </>
    ),
  },
  {
    name: 'JavaScript',
    desc: 'Interactive interfaces and app logic.',
    icon: <IoLogoJavascript className="text-violet-400" />,
  },
  {
    name: 'React',
    desc: 'Component-driven UIs.',
    icon: <FaReact className="text-violet-400" />,
  },
  {
    name: 'Next.js',
    desc: 'Full-stack React with routing and APIs.',
    icon: <SiNextdotjs className="text-violet-400" />,
  },
  {
    name: 'Firebase',
    desc: 'Auth, Firestore, and hosting.',
    icon: <SiFirebase className="text-violet-400" />,
  },
  {
    name: 'Supabase',
    desc: 'Postgres, auth, and edge functions.',
    icon: <SiSupabase className="text-violet-400" />,
  },
  {
    name: 'Tailwind',
    desc: 'Utility-first styling.',
    icon: <RiTailwindCssFill className="text-violet-400" />,
  },
] as const

const About = memo(() => {
  return (
    <section
      id="about"
      className="relative flex min-h-screen snap-start flex-col items-center justify-center gap-8 px-4 sm:gap-12 sm:px-8 md:px-16 lg:items-start lg:px-24 xl:px-32"
    >
      <h1 className="flex text-3xl font-semibold text-violet-400 sm:text-4xl md:text-5xl">
        About Me
      </h1>

      <div className="font-lora flex flex-col items-center gap-6 text-base sm:gap-8 sm:text-lg md:text-xl lg:items-start">
        <div className="space-y-4 text-center text-gray-200 lg:text-left">
          {PORTFOLIO_INTRO_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="font-redhatdisplay w-full">
          <h3 className="mb-4 text-center text-xl font-semibold text-violet-300 sm:text-2xl lg:text-left">
            Technologies I work with
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="rounded-lg border border-gray-700 bg-gray-800/50 p-3 backdrop-blur-sm"
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="flex gap-1 text-lg">{tech.icon}</span>
                  <span className="text-sm font-medium text-gray-200">
                    {tech.name}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

About.displayName = 'About'

export default About
