import React from 'react'
import type { IconType } from 'react-icons'
import {
  FaBootstrap,
  FaCss3Alt,
  FaHtml5,
  FaReact,
  FaSquare,
} from 'react-icons/fa'
import { GrMysql } from 'react-icons/gr'
import { IoLogoJavascript, IoLogoVercel } from 'react-icons/io5'
import { RiTailwindCssFill } from 'react-icons/ri'
import {
  SiFirebase,
  SiFlask,
  SiMongodb,
  SiNextdotjs,
  SiPhp,
  SiPython,
  SiRadixui,
  SiShadcnui,
  SiSupabase,
  SiTypescript,
  SiVite,
} from 'react-icons/si'

import Button from './ui/Button'
import {
  BHAAVCHITRA_GITHUB_URL,
  SWAAD_SANCHALAN_GITHUB_URL,
} from '../data/portfolio-content'
import { SectionDivider } from './ui/section-divider'

type StackItem = { icon: IconType; name: string }
type StackGroup = { label: string; items: StackItem[] }

type Project = {
  title: string
  subtitle: string
  time: string
  category: string
  description: string
  details: string[] | ''
  fontClass: string
  fontSize: string
  stackGroups: StackGroup[]
  link: string
  address: string
  extraStyle?: React.CSSProperties
}

const StackChip = ({ tech }: { tech: StackItem }) => (
  <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-lg border border-solid border-black/20 bg-white/80 px-2.5 py-1.5">
    <tech.icon className="h-4 w-4 shrink-0" />
    <span className="no-grunge text-sm text-black">{tech.name}</span>
  </div>
)

const ProjectStack = ({ groups }: { groups: StackGroup[] }) => (
  <div className="flex w-fit max-w-full flex-col gap-5 sm:flex-row sm:gap-8">
    {groups.map((group) => (
      <div key={group.label} className="flex flex-col gap-2">
        <span className="text-sm font-medium text-black">{group.label}</span>
        <div className="flex flex-col gap-1.5">
          {group.items.map((tech) => (
            <StackChip key={tech.name} tech={tech} />
          ))}
        </div>
      </div>
    ))}
  </div>
)

const projectsData: Project[] = [
  {
    title: 'Happy Journey',
    subtitle: 'AI-Powered Travel Advisor',
    time: 'May 2025 - Nov 2025',
    category: 'Full-Stack',
    description:
      'Happy Journey is a travel planning application that replaces manual trip coordination with AI-generated itineraries, budget-aware destination suggestions, and persistent trip history—built for Indian destinations with maps, geolocation, and admin tooling for events and hotels.',
    details: [
      'Developed Next.js API routes for AI trip planning and budget-based suggestions using Google Gemini and Groq (LLaMA 3.1) with automatic model fallback and robust JSON sanitization.',
      'Engineered dynamic budget algorithms that calculate accommodation, transport, food, and activity costs from travel style, group size, and vehicle fuel inputs before persisting plans to Firebase Firestore.',
      'Integrated Clerk authentication, IP geolocation with multi-provider fallback, reverse geocoding, Google Maps route links, and an admin panel for events and hotel management.',
    ],
    fontClass: 'font-beyonders',
    fontSize: 'text-xl',
    stackGroups: [
      {
        label: 'Frontend',
        items: [
          { icon: SiNextdotjs, name: 'Next.js' },
          { icon: SiTypescript, name: 'TypeScript' },
          { icon: RiTailwindCssFill, name: 'Tailwind CSS' },
          { icon: SiShadcnui, name: 'Shadcn/UI' },
        ],
      },
      {
        label: 'Backend',
        items: [
          { icon: SiFirebase, name: 'Firebase' },
          { icon: IoLogoVercel, name: 'Vercel' },
        ],
      },
    ],
    link: 'Visit Website',
    address: 'https://happy-journy.vercel.app/',
  },
  {
    title: 'NyayaSakhi AI',
    subtitle: 'Multilingual Legal Assistant for Rural Women',
    time: 'Apr 2026 - May 2026',
    category: 'Full-Stack',
    description:
      'NyayaSakhi AI is a generative legal assistant that gives rural women in India simple, culturally sensitive guidance on inheritance and property rights—in multiple Indian languages—with live AI chat, voice input, and document explanations.',
    details: [
      'Built a React + Vite frontend with multilingual UI, streaming legal chat, voice interaction, and a help directory for inheritance and property-rights topics.',
      'Implemented document upload with PDF/text extraction and OCR (Tesseract.js) so users can upload legal papers and receive plain-language explanations via streamed AI responses.',
      'Deployed serverless AI through Supabase Edge Functions and a Vercel `/api/nyaya-chat` route with Gemini 2.5 Flash, prompt engineering for simple legal tone, and real-time token streaming.',
    ],
    fontClass: 'font-clashdisplay',
    fontSize: 'text-3xl font-black',
    stackGroups: [
      {
        label: 'Frontend',
        items: [
          { icon: FaReact, name: 'React' },
          { icon: SiTypescript, name: 'TypeScript' },
          { icon: SiVite, name: 'Vite' },
          { icon: RiTailwindCssFill, name: 'Tailwind CSS' },
          { icon: SiRadixui, name: 'Radix UI' },
          { icon: SiShadcnui, name: 'Shadcn/UI' },
        ],
      },
      {
        label: 'Backend',
        items: [
          { icon: SiSupabase, name: 'Supabase' },
          { icon: FaSquare, name: 'Gemini AI' },
          { icon: IoLogoVercel, name: 'Vercel' },
        ],
      },
    ],
    link: 'Visit Website',
    address: 'https://nyayasakhi-ai.vercel.app/',
  },
  {
    title: 'BhaavChitra',
    subtitle: 'Sentiment Analysis Platform',
    time: 'Oct 2024 - Nov 2024',
    category: '',
    description:
      'BhaavChitra is a sentiment analysis system designed for feedback analysis, primarily for SMEs, providing key insights into how a product or service is performing.',
    details: '',
    extraStyle: {
      '--grunge-inset-y': '-1.4em',
      '--grunge-inset-x': '-0.5em',
    } as React.CSSProperties,
    fontClass: 'font-amsterdamone',
    fontSize: 'text-xl mb-7',
    stackGroups: [
      {
        label: 'Frontend',
        items: [
          { icon: FaHtml5, name: 'HTML5' },
          { icon: FaCss3Alt, name: 'CSS3' },
          { icon: IoLogoJavascript, name: 'JavaScript' },
        ],
      },
      {
        label: 'Backend',
        items: [
          { icon: SiPython, name: 'Python' },
          { icon: SiFlask, name: 'Flask' },
          { icon: SiMongodb, name: 'MongoDB' },
        ],
      },
    ],
    link: 'Link to Repository',
    address: BHAAVCHITRA_GITHUB_URL,
  },
  {
    title: 'SwaadSanchalan',
    subtitle: 'Restaurant Management System',
    time: 'Aug 2024',
    category: '',
    description:
      'Swaad Sanchalan is a comprehensive restaurant management system that streamlines operations, including menu management, reservations, billing, and sales reporting.',
    details: '',
    fontClass: 'font-berkshireswash',
    fontSize: 'text-3xl',
    stackGroups: [
      {
        label: 'Frontend',
        items: [
          { icon: FaHtml5, name: 'HTML5' },
          { icon: FaCss3Alt, name: 'CSS3' },
          { icon: IoLogoJavascript, name: 'JavaScript' },
          { icon: FaBootstrap, name: 'Bootstrap' },
        ],
      },
      {
        label: 'Backend',
        items: [
          { icon: SiPhp, name: 'PHP' },
          { icon: GrMysql, name: 'MySQL' },
        ],
      },
    ],
    link: 'Link to Repository',
    address: SWAAD_SANCHALAN_GITHUB_URL,
  },
]

const MONTH_INDEX: Record<string, number> = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
}

/** Sort key from end date in strings like "May 2025 - Nov 2025" or "Aug 2024". */
function getProjectTimelineKey(time: string): number {
  const end = time.includes(' - ') ? time.split(' - ').pop()!.trim() : time.trim()
  const match = end.match(/^([A-Za-z]+)\s+(\d{4})$/)
  if (!match) return 0
  const year = Number(match[2])
  const month = MONTH_INDEX[match[1]] ?? 0
  return year * 12 + month
}

const projectsByTimeline = [...projectsData].sort(
  (a, b) => getProjectTimelineKey(b.time) - getProjectTimelineKey(a.time),
)

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 flex-col items-start">
        <span
          className={`grunge-text-extended max-w-full break-words text-black ${project.fontSize} ${project.fontClass}`}
          style={project.extraStyle}
        >
          {project.title}
        </span>
        <span className="flex flex-col gap-0 text-base text-black md:flex-row md:gap-2">
          <span>{project.subtitle}</span>
          <span className="hidden md:inline"> • </span>
          <span>{project.time}</span>
        </span>
      </div>
      {project.category && (
        <span className="hidden z-20 px-3 py-1 text-black rounded-full border border-black no-grunge bg-white/50 md:block">
          {project.category}
        </span>
      )}
    </div>

    <div className="flex flex-col gap-2">
      <span className="text-lg text-black md:text-xl">{project.description}</span>
      {project.details &&
        Array.isArray(project.details) &&
        project.details.length > 0 && (
          <ul className="list-inside list-disc pl-4 text-lg text-black md:text-xl">
            {project.details.map((detail: string, idx: number) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        )}
    </div>

    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="w-full flex-1 lg:pr-10">
        <span className="mb-3 block text-xl text-black">Stack</span>
        <ProjectStack groups={project.stackGroups} />
      </div>

      <div className="flex w-full shrink-0 justify-start lg:w-auto lg:justify-end">
        <Button
          href={project.address}
          target="_blank"
          rel="noopener noreferrer"
          size="md"
        >
          <span>{project.link}</span>
        </Button>
      </div>
    </div>
  </div>
)

const Projects = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="container flex flex-col gap-8 justify-center items-start px-8 py-16 bg-white md:px-24 md:py-32">
        <span className="no-grunge text-3xl text-black sm:text-4xl md:text-5xl">Projects</span>

        <div className="flex flex-col">
          {projectsByTimeline.map((project, index) => (
            <div key={project.title}>
              <ProjectCard project={project} />
              {index < projectsByTimeline.length - 1 && <SectionDivider />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
