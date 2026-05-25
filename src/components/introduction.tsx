import React from 'react'
import { FaFigma, FaReact } from 'react-icons/fa'
import { IoLogoJavascript } from 'react-icons/io5'
import { RiTailwindCssFill } from 'react-icons/ri'
import { SiFirebase, SiSupabase } from 'react-icons/si'

const technologies = [
  { icon: IoLogoJavascript, name: 'JavaScript' },
  { icon: FaReact, name: 'React' },
  { icon: SiFirebase, name: 'Firebase' },
  { icon: SiSupabase, name: 'Supabase' },
  { icon: RiTailwindCssFill, name: 'Tailwind' },
  { icon: FaFigma, name: 'Figma' },
]

const Introduction = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="container flex flex-col items-start justify-center gap-8 bg-white px-8 py-16 md:px-24 md:py-32">
        <div className="flex flex-col gap-4">
          <span className="text-5xl text-black">NISHANTH K R</span>
          <span className="text-2xl text-black">
            A developer who builds webapps and enjoys good design.
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xl text-black">
            I&apos;m a <strong>Computer Science</strong> student from Karnataka,
            India.
          </span>
          <span className="text-xl text-black">
            Currently, I&apos;m focused on <strong>frontend development</strong>{' '}
            with React and Next.js and am also learning backend development.
          </span>
          <span className="text-xl text-black">
            When I&apos;m not coding, I enjoy reading comics and listening to
            music.
          </span>
        </div>

        <div className="flex flex-col items-start gap-[9px] self-stretch">
          <span className="text-xl text-black">Technologies I work with</span>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg border border-solid border-black p-2.5"
              >
                <tech.icon className="h-6 w-6" />
                <span className="text-base text-black">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Introduction
