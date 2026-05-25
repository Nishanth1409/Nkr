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
  <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-lg border border-solid border-black/20 bg-white/80 px-2.5 py-1.5">
    <tech.icon className="h-4 w-4 shrink-0" />
    <span className="no-grunge text-sm text-black">{tech.name}</span>
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
    subtitle: 'Frontend Design · Branding · Social Media',
    time: '2025 - Present',
    category: 'Design & Frontend',
    description:
      'Contributing to two related brands—ProtoRev Digital and ProtoRev 3D—across web presence, visual identity, and social content. Work spans frontend layout planning, logo and template design, and consistent brand execution for digital services and 3D printing.',
    details: [
      'Plan and design frontend layouts for protorevdigital.com and protorev3d.com, aligning structure, typography, and UI flow with each brand’s goals.',
      'Create logos, reusable social templates, and marketing visuals used across Instagram and other channels.',
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
  <div className="flex flex-col gap-4">
    <div className="flex justify-between items-center">
      <div className="flex flex-col items-start">
        <span
          className={`grunge-text-extended text-black ${experience.fontSize} ${experience.fontClass}`}
        >
          {experience.title}
        </span>
        <span className="flex flex-col gap-0 text-base text-black md:flex-row md:gap-2">
          <span>{experience.subtitle}</span>
          <span className="hidden md:inline"> • </span>
          <span>{experience.time}</span>
        </span>
      </div>
      {experience.category && (
        <span className="no-grunge z-20 hidden rounded-full border border-black bg-white/50 px-3 py-1 text-black md:block">
          {experience.category}
        </span>
      )}
    </div>

    <div className="flex flex-col gap-2">
      <span className="text-xl text-black">{experience.description}</span>
      {experience.details.length > 0 && (
        <ul className="list-inside list-disc pl-4 text-xl text-black">
          {experience.details.map((detail, idx) => (
            <li key={idx}>{detail}</li>
          ))}
        </ul>
      )}
    </div>

    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      {(experience.stackGroups?.length ||
        experience.frontendStack ||
        experience.backendStack) && (
        <div className="w-full flex-1 lg:pr-10">
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
      <div className="container flex flex-col items-start justify-center gap-8 bg-white px-8 py-16 md:px-24 md:py-32">
        <div className="flex w-full flex-col items-start justify-between gap-x-4 md:flex-row md:items-center">
          <span className="text-5xl text-black">Experience</span>
          <span className="text-xl text-black">Remote · 2025 - Present</span>
        </div>

        <div className="flex flex-col">
          {experienceData.map((experience, index) => (
            <div key={index}>
              <ExperienceCard experience={experience} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Experience
