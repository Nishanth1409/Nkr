'use client'

import React, { memo } from 'react'
import { FaFigma } from 'react-icons/fa'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import { SiCanva } from 'react-icons/si'

import { EXPERIENCE_SECTION } from '../../data/portfolio-content'
import HoverBorderGradient from './ui/hover-border-gradient'

const ExperienceSection = memo(() => {
  const exp = EXPERIENCE_SECTION

  return (
    <section
      id="experience"
      className="portfolio-shell relative flex min-h-screen snap-start flex-col items-center justify-center gap-[clamp(1.5rem,4vh,3rem)] lg:items-start"
    >
      <div className="flex w-full flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-3xl font-semibold text-violet-400 sm:text-4xl md:text-5xl">
          {exp.heading}
        </h1>
        <span className="font-lora text-base text-violet-300 sm:text-lg">
          {exp.meta}
        </span>
      </div>

      <div className="w-full rounded-3xl border border-violet-500/20 bg-violet-900/20 p-6 backdrop-blur-sm md:p-10">
        <div className="mb-6 flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              {exp.title}
            </h2>
            <p className="font-lora text-violet-300">
              {exp.subtitle} · {exp.time}
            </p>
          </div>
          <span className="mt-2 inline-flex w-fit rounded-full border border-violet-400/30 bg-violet-500/20 px-2.5 py-0.5 text-sm text-violet-200 lg:mt-0">
            {exp.category}
          </span>
        </div>

        <p className="font-lora mb-4 text-lg leading-relaxed text-violet-100">
          {exp.description}
        </p>

        <ul className="font-lora mb-8 list-inside list-disc space-y-2 pl-2 text-violet-200">
          {exp.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>

        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:gap-10">
          <div>
            <h3 className="mb-2 text-sm font-semibold tracking-wide text-violet-300 uppercase">
              Design
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-violet-500/25 bg-black/40 px-2.5 py-1 text-sm text-violet-100">
                <FaFigma className="text-violet-400" /> Figma
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-violet-500/25 bg-black/40 px-2.5 py-1 text-sm text-violet-100">
                <SiCanva className="text-violet-400" /> Canva
              </span>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold tracking-wide text-violet-300 uppercase">
              Frontend
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-violet-500/25 bg-black/40 px-2.5 py-1 text-sm text-violet-100">
                <RiNextjsFill className="text-violet-400" /> Next.js
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-violet-500/25 bg-black/40 px-2.5 py-1 text-sm text-violet-100">
                <RiTailwindCssFill className="text-violet-400" /> Tailwind CSS
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {exp.links.map((link) => (
            <HoverBorderGradient
              key={link.href}
              as="a"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              containerClassName="rounded-full"
              className="bg-black px-3.5 py-1.5 text-sm text-white"
            >
              {link.label}
            </HoverBorderGradient>
          ))}
        </div>
      </div>
    </section>
  )
})

ExperienceSection.displayName = 'ExperienceSection'

export default ExperienceSection
