import React from 'react'
import {
  FaAws,
  FaBootstrap,
  FaCss3Alt,
  FaGithub,
  FaHtml5,
  FaReact,
  FaSquare,
} from 'react-icons/fa'
import { GrMysql } from 'react-icons/gr'
import { IoLogoJavascript, IoLogoPwa, IoLogoVercel } from 'react-icons/io5'
import { RiTailwindCssFill } from 'react-icons/ri'
import {
  SiFirebase,
  SiFlask,
  SiMarkdown,
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

const projectsData = [
  {
    title: 'Syncova',
    subtitle: 'Task Management & Workflow Automation Tool',
    time: 'May 2025 - Nov 2025',
    category: 'Full-Stack',
    description:
      'Syncova is an intelligent project management platform designed to solve resource allocation challenges in distributed teams. It combines advanced algorithms for optimal task assignment with a secure, real-time collaboration environment, ensuring fair workload distribution and strict data privacy.',
    details: [
      'Engineered a workload distribution engine using the Hungarian Algorithm for optimal resource allocation and a Greedy strategy for real-time task assignments based on skill tolerance.',
      'Architected a secure multi-tenant system using Supabase, enforcing strict data isolation between employer and employee accounts via PostgreSQL Row Level Security (RLS) policies.',
      'Implemented complex SQL logic using recursive CTEs to automatically detect circular task dependencies and database triggers for real-time progress aggregation.',
    ],
    fontClass: 'font-beyonders',
    fontSize: 'text-xl',
    frontendStack: [
      { icon: FaReact, name: 'React' },
      { icon: SiTypescript, name: 'TypeScript' },
      { icon: SiVite, name: 'Vite' },
      { icon: RiTailwindCssFill, name: 'Tailwind CSS' },
      { icon: SiRadixui, name: 'Radix UI' },
    ],
    backendStack: [
      { icon: SiSupabase, name: 'Supabase' },
      { icon: FaAws, name: 'AWS S3' },
      { icon: IoLogoVercel, name: 'Vercel' },
    ],
    link: 'Visit Website',
    address: 'https://syncova.vercel.app/',
  },
  {
    title: 'GitDoxx',
    subtitle: 'Real‑Time Collaborative Document Platform with Version Control',
    time: 'Aug 2025 - Dec 2025',
    category: 'Full‑Stack',
    description:
      'GitDoxx is a platform for real-time document collaboration, combining multi-cursor editing with Git-like snapshots and rollback, AI-powered diff/summarization, and secure sharing via invite links, share keys, and granular roles.',
    details: [
      'Unifying multi-cursor editing with version snapshots and one-click rollback; AI diff and summarization are accelerating document reviews.',
      'Enabling secure collaboration: invite links, share keys, and granular roles for controlled access.',
      'Delivering durable snapshots in S3 with PDF exports and PWA support for responsive, on-the-go use.',
    ],
    fontClass: 'font-clashdisplay',
    fontSize: 'text-4xl font-black',
    frontendStack: [
      { icon: SiNextdotjs, name: 'Next.js' },
      { icon: SiTypescript, name: 'TypeScript' },
      { icon: RiTailwindCssFill, name: 'Tailwind CSS' },
      { icon: FaSquare, name: 'BlockNote' },
      { icon: FaSquare, name: 'Y.js' },
      { icon: SiShadcnui, name: 'Shadcn/UI' },
    ],
    backendStack: [
      { icon: SiFirebase, name: 'Firebase' },
      { icon: FaAws, name: 'AWS S3' },
      { icon: IoLogoVercel, name: 'Vercel' },
      { icon: FaSquare, name: 'Groq AI' },
    ],
    link: 'Visit Website',
    address: 'https://gitdoxx.vercel.app/',
  },
  {
    title: 'UI/UX Tutorials',
    subtitle: 'Resource Platform',
    time: 'Feb 2025 - Jul 2025',
    category: 'Educational',
    description:
      'A web-based UI/UX tutorial platform delivering interactive, step-by-step lessons; providing mobile‑responsive PWA, and a Firebase‑authenticated admin dashboard for time‑bound announcements with integrated feedback collection.',
    details: [
      'Served 60+ students with interactive tutorials and exercises, improving access via an installable PWA and on-page markdown rendering.',
      'Captures learner input through a feedback modal; includes a curated resource library (fonts, assets, lab manual)',
      'Modular JS architecture (feature-isolated modules for search, theming, auth, feedback) with consistent, UX-centered design: responsive layout, ARIA labels, keyboard shortcuts, image zoom, and structure view for navigability. ',
    ],
    fontClass: 'font-unbounded',
    fontSize: 'text-3xl',
    frontendStack: [
      { icon: FaHtml5, name: 'HTML5' },
      { icon: FaCss3Alt, name: 'CSS3' },
      { icon: IoLogoJavascript, name: 'JavaScript' },
      { icon: SiMarkdown, name: 'Markdown' },
    ],
    backendStack: [
      { icon: SiFirebase, name: 'Firebase' },
      { icon: IoLogoPwa, name: 'PWA' },
      { icon: FaGithub, name: 'GitHub Pages' },
    ],
    link: 'Visit Website',
    address: 'https://violetto-rose.github.io/UI-UX/',
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
    stack: [
      { icon: FaHtml5, name: 'HTML5' },
      { icon: FaCss3Alt, name: 'CSS3' },
      { icon: IoLogoJavascript, name: 'JavaScript' },
      { icon: SiPython, name: 'Python' },
      { icon: SiFlask, name: 'Flask' },
      { icon: SiMongodb, name: 'MongoDB' },
    ],
    link: 'Link to Repository',
    address: 'https://github.com/violetto-rose/BhaavChitra',
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
    stack: [
      { icon: FaHtml5, name: 'HTML5' },
      { icon: FaCss3Alt, name: 'CSS3' },
      { icon: IoLogoJavascript, name: 'JavaScript' },
      { icon: SiPhp, name: 'PHP' },
      { icon: GrMysql, name: 'MySQL' },
      { icon: FaBootstrap, name: 'Bootstrap' },
    ],
    link: 'Link to Repository',
    address: 'https://github.com/violetto-rose/Swaad-Sanchalan',
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

const ProjectCard = ({ project }: { project: (typeof projectsData)[0] }) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <div className="flex flex-col items-start">
        <span
          className={`grunge-text-extended text-black ${project.fontSize} ${project.fontClass}`}
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
        <span className="no-grunge z-20 hidden rounded-full border border-black bg-white/50 px-3 py-1 text-black md:block">
          {project.category}
        </span>
      )}
    </div>

    <div className="flex flex-col gap-2">
      <span className="text-xl text-black">{project.description}</span>
      {project.details &&
        Array.isArray(project.details) &&
        project.details.length > 0 && (
          <ul className="list-inside list-disc pl-4 text-xl text-black">
            {project.details.map((detail: string, idx: number) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        )}
    </div>

    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:gap-0">
      <div className="flex flex-col items-start gap-2">
        <span className="text-xl text-black">Stack:</span>
        {project.frontendStack && project.backendStack ? (
          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              {project.frontendStack.map((tech, index) => (
                <div key={index} className="flex items-center gap-1 py-1 pl-1">
                  <tech.icon className="h-4 w-4" />
                  <span className="text-base text-black">{tech.name}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {project.backendStack.map((tech, index) => (
                <div key={index} className="flex items-center gap-1 py-1 pl-1">
                  <tech.icon className="h-4 w-4" />
                  <span className="text-base text-black">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {project.stack?.map((tech, index) => (
              <div key={index} className="flex items-center gap-1 py-1 pl-1">
                <tech.icon className="h-4 w-4" />
                <span className="text-base text-black">{tech.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex w-full justify-end md:w-auto">
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
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="container flex flex-col items-start justify-center gap-8 bg-white px-8 py-16 md:px-24 md:py-32">
        <span className="grunge-text-extended text-5xl text-black">
          Projects
        </span>

        <div className="flex flex-col">
          {projectsData.map((project, index) => (
            <div key={index}>
              <ProjectCard project={project} />
              {index < projectsData.length - 1 && <FancyHR />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
