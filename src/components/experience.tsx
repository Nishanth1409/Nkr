import type { IconType } from 'react-icons'
import { FaFigma } from 'react-icons/fa'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import { SiCanva } from 'react-icons/si'

import Button from './ui/Button'

type StackItem = { icon: IconType; name: string }

type StackGroup = { label: string; items: StackItem[] }

type ExperienceLink = { label: string; address: string }

type ExperienceEntry = {
  title: string
  subtitle: string
  time: string
  category: string
  description: string
  details: string[]
  fontClass: string
  fontSize: string
  stackGroups?: StackGroup[]
  frontendStack?: StackItem[]
  backendStack?: StackItem[]
  links: ExperienceLink[]
}

const StackItemRow = ({ tech }: { tech: StackItem }) => (
  <div className="inline-flex w-fit max-w-full items-center gap-1.5 rounded-md border border-black/15 bg-white/90 px-2 py-1">
    <tech.icon className="h-3.5 w-3.5 shrink-0" />
    <span className="no-grunge text-xs text-black sm:text-sm">{tech.name}</span>
  </div>
)

const ExperienceStack = ({ experience }: { experience: ExperienceEntry }) => {
  if (experience.stackGroups?.length) {
    return (
      <div className="flex w-fit max-w-full flex-col gap-5 sm:flex-row sm:gap-8">
        {experience.stackGroups.map((group) => (
          <div key={group.label} className="flex flex-col gap-2">
            <span className="text-sm font-medium text-black">{group.label}</span>
            <div className="flex flex-col gap-1.5">
              {group.items.map((tech, index) => (
                <StackItemRow key={index} tech={tech} />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (experience.frontendStack && experience.backendStack) {
    return (
      <div className="flex w-fit max-w-full flex-col gap-5 sm:flex-row sm:gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-black">Frontend</span>
          <div className="flex flex-col gap-1.5">
            {experience.frontendStack.map((tech, index) => (
              <StackItemRow key={index} tech={tech} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-black">Backend</span>
          <div className="flex flex-col gap-1.5">
            {experience.backendStack.map((tech, index) => (
              <StackItemRow key={index} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const items = experience.frontendStack ?? experience.backendStack ?? []
  if (items.length === 0) return null

  return (
    <div className="flex flex-col gap-1.5">
      {items.map((tech, index) => (
        <StackItemRow key={index} tech={tech} />
      ))}
    </div>
  )
}

const experienceData: ExperienceEntry[] = [
  {
    title: 'ProtoRev Digital & ProtoRev 3D',
    subtitle: 'Frontend · Brand Design · Logos · Templates · Social',
    time: '2025 - Present',
    category: 'Design & Frontend',
    description:
      'Contributing to ProtoRev Digital and ProtoRev 3D across web presence, visual identity, and social content — frontend layouts, logos, templates, invitation-style creatives, and consistent brand execution for digital services and 3D printing.',
    details: [
      'Plan and design frontend layouts for protorevdigital.com and protorev3d.com, aligning structure, typography, and UI flow with each brand’s goals.',
      'Create logos, reusable templates, invitation-style graphics, and marketing visuals used across Instagram and other channels.',
      'Handle social media planning and posting—coordinating content calendars, captions, and on-brand graphics for both companies.',
      'Produce design templates and asset kits so the teams can ship campaigns and web updates faster with a unified look.',
    ],
    fontClass: 'font-unbounded',
    fontSize: 'text-2xl',
    stackGroups: [
      {
        label: 'Design',
        items: [
          { icon: FaFigma, name: 'Figma' },
          { icon: SiCanva, name: 'Canva' },
        ],
      },
      {
        label: 'Frontend',
        items: [
          { icon: RiNextjsFill, name: 'Next.js' },
          { icon: RiTailwindCssFill, name: 'Tailwind CSS' },
        ],
      },
    ],
    links: [
      {
        label: 'ProtoRev Digital',
        address: 'https://www.protorevdigital.com/',
      },
      {
        label: 'ProtoRev 3D',
        address: 'https://www.protorev3d.com/',
      },
    ],
  },
]

const ExperienceCard = ({ experience }: { experience: ExperienceEntry }) => (
  <div className="flex min-w-0 flex-col gap-4">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 flex-col items-start">
        <span
          className={`portfolio-display-title grunge-text-extended text-black ${experience.fontSize} ${experience.fontClass}`}
        >
          {experience.title}
        </span>
        <span className="flex min-w-0 flex-col gap-0 text-base text-black md:flex-row md:gap-2">
          <span className="text-pretty">{experience.subtitle}</span>
          <span className="hidden md:inline"> • </span>
          <span>{experience.time}</span>
        </span>
      </div>
      {experience.category && (
        <span className="no-grunge z-20 hidden shrink-0 rounded-full border border-black/70 bg-white/60 px-2.5 py-0.5 text-sm text-black md:block">
          {experience.category}
        </span>
      )}
    </div>

    <div className="flex min-w-0 flex-col gap-2">
      <span className="text-pretty text-lg text-black md:text-xl">
        {experience.description}
      </span>
      {experience.details.length > 0 && (
        <ul className="list-inside list-disc pl-4 text-lg text-black md:text-xl">
          {experience.details.map((detail, idx) => (
            <li key={idx} className="text-pretty">
              {detail}
            </li>
          ))}
        </ul>
      )}
    </div>

    <div className="flex min-w-0 flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      {(experience.stackGroups?.length ||
        experience.frontendStack ||
        experience.backendStack) && (
        <div className="w-full min-w-0 flex-1 lg:pr-10">
          <span className="mb-3 block text-xl text-black">Stack</span>
          <ExperienceStack experience={experience} />
        </div>
      )}

      <div className="flex w-full shrink-0 flex-wrap justify-start gap-3 md:w-auto md:justify-end">
        {experience.links.map((site, index) => (
          <Button
            key={index}
            href={site.address}
            target="_blank"
            rel="noopener noreferrer"
            size="md"
          >
            <span>{site.label}</span>
          </Button>
        ))}
      </div>
    </div>
  </div>
)

const Experience = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="portfolio-shell flex flex-col items-start justify-center gap-6 bg-white sm:gap-8">
        <div className="flex w-full min-w-0 flex-col items-start justify-between gap-x-4 gap-y-2 md:flex-row md:items-center">
          <span className="text-[clamp(1.75rem,5vw+0.5rem,3rem)] leading-tight text-black">
            Experience
          </span>
          <span className="text-lg text-black md:text-xl">Remote · 2025 - Present</span>
        </div>

        <div className="flex w-full min-w-0 flex-col">
          {experienceData.map((experience, index) => (
            <div key={index} className="min-w-0">
              <ExperienceCard experience={experience} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Experience
