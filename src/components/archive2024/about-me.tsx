'use client'

import React, { memo } from 'react'
import { FaJava } from 'react-icons/fa'
import {
  SiFigma,
  SiFirebase,
  SiGit,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'

// ***************
// Tech stack data
// ***************

const TECH_STACK = [
  {
    name: 'JavaScript',
    desc: 'The language that powers your nightmares.',
    icon: <SiJavascript className="text-violet-400" />,
  },
  {
    name: 'React',
    desc: (
      <>
        A <em>delightful</em> JavaScript library for building UIs.
      </>
    ),
    icon: <SiReact className="text-violet-400" />,
  },
  {
    name: 'Next.js',
    desc: 'React, but with superpowers.',
    icon: <SiNextdotjs className="text-violet-400" />,
  },
  {
    name: 'TypeScript',
    desc: 'JavaScript, but with types and fewer surprises.',
    icon: <SiTypescript className="text-violet-400" />,
  },
  {
    name: 'Tailwind CSS',
    desc: 'Fun-first CSS framework',
    icon: <SiTailwindcss className="text-violet-400" />,
  },
  {
    name: 'Firebase',
    desc: "Google's all-in-one app development platform.",
    icon: <SiFirebase className="text-violet-400" />,
  },
  {
    name: 'Java',
    desc: 'Write once, debug everywhere.',
    icon: <FaJava className="text-violet-400" />,
  },
  {
    name: 'MySQL',
    desc: 'SQL, but friendlier.',
    icon: <SiMysql className="text-violet-400" />,
  },
  {
    name: 'Git',
    desc: 'The reason you can undo your mistakes.',
    icon: <SiGit className="text-violet-400" />,
  },
  {
    name: 'Figma',
    desc: 'Design tool for people who like to move rectangles around.',
    icon: <SiFigma className="text-violet-400" />,
  },
] as const

// ******************
// About me component
// ******************

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
          <p>
            I&apos;m a <strong>Computer Science student</strong> from Karnataka,
            India. I build web applications and work on projects that solve real
            problems.
          </p>
          <p>
            Currently focused on <strong>frontend development</strong> with
            React and Next.js, and learning backend too.
          </p>
          <p>
            When I&apos;m not coding, I&apos;m reading <strong>comics</strong>,
            listen to <strong>music</strong>, or participate in{' '}
            <strong>CSS battles</strong> (recently got into competitive CSS!).
          </p>
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
                  <span className="text-lg">{tech.icon}</span>
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
