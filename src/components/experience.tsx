import { FaAws } from 'react-icons/fa'
import { IoLogoVercel } from 'react-icons/io5'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import {
  SiFirebase,
  SiRazorpay,
  SiShadcnui,
  SiTypescript,
} from 'react-icons/si'

import Button from './ui/Button'

const experienceData = [
  {
    title: 'PaperPeak',
    subtitle: 'Academic & Research Writing Platform',
    time: 'May 2025 - Sept 2025',
    category: 'Full-Stack',
    description:
      'PaperPeak is a dedicated web platform built to replace a chaotic, manual WhatsApp-based operation. It automates the entire service lifecycle—from order intake to final delivery—by connecting students with verified writers in a structured, type-safe environment.',
    details: [
      'Developed an order system in Next.js that transformed WhatsApp-based services into a web platform connecting students with verified professional writers.',
      'Optimized the order tracking dashboard by implementing a local cache for Firebase listeners, which prevents the app from redundantly re-fetching attachments for orders that are already loaded.',
      'Integrated AWS S3 with presigned URLs to enable secure, direct uploads for large academic documents without overloading the main application server.',
      'Engineered a real-time pricing calculator in TypeScript that instantly computes costs across 9 service tiers and dynamic add-ons.',
    ],
    fontClass: 'font-rocksalt',
    fontSize: 'text-2xl',
    frontendStack: [
      { icon: RiNextjsFill, name: 'Next.js' },
      { icon: SiTypescript, name: 'TypeScript' },
      { icon: RiTailwindCssFill, name: 'Tailwind CSS' },
      { icon: SiShadcnui, name: 'Shadcn/UI' },
    ],
    backendStack: [
      { icon: SiFirebase, name: 'Firebase' },
      { icon: FaAws, name: 'AWS S3' },
      { icon: SiRazorpay, name: 'Razorpay API' },
      { icon: IoLogoVercel, name: 'Vercel' },
    ],
    link: 'Visit Website',
    address: 'https://paperpeak.vercel.app',
  },
]

const FancyHR = () => (
  <div className="my-12 flex items-center justify-center">
    <div className="h-px flex-1 bg-linear-to-r from-transparent via-black/20 to-black/40"></div>
    <div className="mx-6 flex items-center gap-3">
      <div className="h-3 w-3 rounded-full bg-black shadow-sm"></div>
      <div className="h-1 w-1 animate-pulse rounded-full bg-black"></div>
      <div className="h-2 w-2 rotate-45 transform bg-black"></div>
      <div className="h-1 w-1 animate-pulse rounded-full bg-black delay-75"></div>
      <div className="h-3 w-3 rounded-full bg-black shadow-sm"></div>
    </div>
    <div className="h-px flex-1 bg-linear-to-r from-black/40 via-black/20 to-transparent"></div>
  </div>
)

const ExperienceCard = ({
  experience,
}: {
  experience: (typeof experienceData)[0]
}) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center justify-between">
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
      {experience.details &&
        Array.isArray(experience.details) &&
        experience.details.length > 0 && (
          <ul className="list-inside list-disc pl-4 text-xl text-black">
            {experience.details.map((detail: string, idx: number) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        )}
    </div>

    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:gap-0">
      <div className="flex flex-col items-start gap-2">
        <span className="text-xl text-black">Stack:</span>
        {experience.frontendStack && experience.backendStack ? (
          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              {experience.frontendStack.map((tech, index) => (
                <div key={index} className="flex items-center gap-1 py-1 pl-1">
                  <tech.icon className="h-4 w-4" />
                  <span className="text-base text-black">{tech.name}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {experience.backendStack.map((tech, index) => (
                <div key={index} className="flex items-center gap-1 py-1 pl-1">
                  <tech.icon className="h-4 w-4" />
                  <span className="text-base text-black">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex w-full justify-end md:w-auto">
        <Button
          href={experience.address}
          target="_blank"
          rel="noopener noreferrer"
          size="md"
        >
          <span>{experience.link}</span>
        </Button>
      </div>
    </div>
  </div>
)

const Experience = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="container flex flex-col items-start justify-center gap-8 bg-white px-8 py-16 md:px-24 md:py-32">
        <div className="flex w-full flex-col items-start justify-between gap-x-4 md:flex-row md:items-center">
          <span className="text-5xl text-black">Freelancer</span>
          <span className="text-xl text-black">
            Remote • May 2025 - Present
          </span>
        </div>

        <div className="flex flex-col">
          {experienceData.map((experience, index) => (
            <div key={index}>
              <ExperienceCard experience={experience} />
              {index < experienceData.length - 1 && <FancyHR />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Experience
