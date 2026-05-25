'use client'

import React, { memo } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faBlackboard,
  faBookOpen,
  faChartLine,
  faCheck,
  faCheckCircle,
  faCode,
  faComments,
  faExternalLinkAlt,
  faFileAlt,
  faGraduationCap,
  faLaptopCode,
  faMobileAlt,
  faPalette,
  faServer,
  faShieldAlt,
  faStar,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaAws } from 'react-icons/fa6'
import {
  SiCss,
  SiFirebase,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMarkdown,
  SiNextdotjs,
  SiPwa,
  SiRazorpay,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si'

// ********************************
// Project template type definition
// ********************************

interface ProjectTemplate {
  id: string
  title: string
  subtitle: string
  description: string
  icon: IconDefinition
  status: {
    text: string
    icon: IconDefinition
  }
  type: {
    text: string
    icon: IconDefinition
  }
  features: {
    icon: IconDefinition
    title: string
    desc: string
  }[]
  techStack: {
    frontend: string[]
    backend: string[]
  }
  metrics: {
    number: string
    label: string
    desc: string
  }[]
  highlightHeader: string
  highlights: string[]
  link: string
}

// ************
// Project data
// ************

const PROJECTS: ProjectTemplate[] = [
  {
    id: 'ui-ux-tutorials',
    title: 'UI/UX Design Tutorials',
    subtitle: 'Educational Resource Platform',
    description:
      'A comprehensive collection of interactive tutorials covering various aspects of UI/UX design. This educational platform serves as a practical resource for designers and developers, providing step-by-step guidance and real-world examples.',
    icon: faPalette,
    status: { text: 'Live', icon: faCheckCircle },
    type: { text: 'Educational', icon: faBlackboard },
    features: [
      {
        icon: faGraduationCap,
        title: 'Interactive Tutorials',
        desc: 'Step-by-step design guides',
      },
      {
        icon: faMobileAlt,
        title: 'Responsive Design',
        desc: 'Mobile-optimized learning',
      },
      {
        icon: faBookOpen,
        title: 'Resource Library',
        desc: 'Assets and design fonts',
      },
      {
        icon: faUsers,
        title: 'Student Focused',
        desc: 'Beginner-friendly content',
      },
    ],
    techStack: {
      frontend: ['HTML5', 'CSS3', 'JavaScript', 'Markdown'],
      backend: ['Firebase', 'PWA', 'GitHub Pages'],
    },
    metrics: [
      { number: '9', label: 'Tutorial Topics', desc: 'Comprehensive coverage' },
      { number: '50+', label: 'Students Helped', desc: 'Active learners' },
      {
        number: '100%',
        label: 'Free Access',
        desc: 'Open educational resource',
      },
    ],
    highlightHeader: 'Tutorial Topics',
    highlights: [
      'Chat App Redesign',
      'Food App Redesign',
      'Social Media App Redesign',
      'Product Website Redesign',
      'Travel Agency Website Redesign',
      'Dashboard Interface Design',
      'E-Commerce Website Redesign',
      'Educational Website Redesign',
      'Music Player App Redesign',
    ],
    link: 'https://violetto-rose.github.io/UI-UX/',
  },
  {
    id: 'paperpeak',
    title: 'PaperPeak',
    subtitle: 'Academic Writing Platform',
    description:
      'A middleware platform connecting students needing academic writing help with professional writers. PaperPeak enables secure transactions, real-time messaging, and manages the full paper-writing workflow from order placement to delivery by facilitating direct collaboration and progress tracking between both parties.',
    icon: faFileAlt,
    status: { text: 'Live', icon: faCheckCircle },
    type: { text: 'Full-Stack', icon: faCode },
    features: [
      {
        icon: faShieldAlt,
        title: 'Secure Matching',
        desc: 'Verified writer-student connections',
      },
      {
        icon: faChartLine,
        title: 'Real-time Tracking',
        desc: 'Live project progress updates',
      },
      {
        icon: faComments,
        title: 'Direct Communication',
        desc: 'Built-in messaging system',
      },
      {
        icon: faStar,
        title: 'Quality Assurance',
        desc: 'Rating & review system',
      },
    ],
    techStack: {
      frontend: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
      backend: ['Firebase', 'AWS S3', 'Razorpay API', 'Vercel'],
    },
    metrics: [
      { number: '3', label: 'User Roles', desc: 'Students, Writers, Admins' },
      { number: '24/7', label: 'Support', desc: 'Round-the-clock assistance' },
      { number: '99%', label: 'Uptime Target', desc: 'Enterprise reliability' },
    ],
    highlightHeader: 'Development Hightlights',
    highlights: [
      'Multi-tenant Architecture',
      'Real-time Data Sync',
      'Secure File Handling',
      'Payment Integration',
      'Role-based Access',
      'Document Management',
      'Notification System',
      'Admin Analytics',
    ],
    link: 'https://paperpeak.vercel.app',
  },
] as const

// *******************
// Tech icon component
// *******************

const TechIcon = memo(({ tech }: { tech: string }) => {
  const techLower = tech.toLowerCase()

  switch (techLower) {
    case 'html5':
      return <SiHtml5 className="text-violet-400" />
    case 'css3':
      return <SiCss className="text-violet-400" />
    case 'javascript':
      return <SiJavascript className="text-violet-400" />
    case 'markdown':
      return <SiMarkdown className="text-violet-400" />
    case 'next.js':
      return <SiNextdotjs className="text-violet-400" />
    case 'typescript':
      return <SiTypescript className="text-violet-400" />
    case 'tailwind css':
      return <SiTailwindcss className="text-violet-400" />
    case 'firebase':
      return <SiFirebase className="text-violet-400" />
    case 'aws s3':
      return <FaAws className="text-violet-400" />
    case 'razorpay api':
      return <SiRazorpay className="text-violet-400" />
    case 'vercel':
      return <SiVercel className="text-violet-400" />
    case 'github pages':
      return <SiGithub className="text-violet-400" />
    case 'pwa':
      return <SiPwa className="text-violet-400" />
    case 'shadcn/ui':
      return <SiShadcnui className="text-violet-400" />
    default:
      return null
  }
})

TechIcon.displayName = 'TechIcon'

// **********************
// Project card component
// **********************

const ProjectCard = memo(({ project }: { project: ProjectTemplate }) => (
  <div className="mx-auto mb-16 w-full">
    <div className="relative rounded-3xl border border-violet-500/20 bg-linear-to-br from-violet-900/30 via-violet-900/20 to-violet-900/30 p-8 shadow-2xl backdrop-blur-sm md:p-12">
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex rounded-xl border border-violet-400/30 bg-violet-500/20 p-3">
                <FontAwesomeIcon
                  icon={project.icon}
                  className="text-2xl text-violet-300"
                />
              </div>
              <div>
                <h2 className="mb-2 text-3xl font-semibold text-white md:text-4xl">
                  {project.title}
                </h2>
                <p className="font-medium text-violet-300">
                  {project.subtitle}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-violet-400/30 bg-violet-500/20 px-4 py-2 text-sm font-medium text-violet-300">
              <FontAwesomeIcon icon={project.status.icon} className="mr-2" />
              {project.status.text}
            </span>
            <span className="rounded-full border border-violet-400/30 bg-violet-500/20 px-4 py-2 text-sm font-medium text-violet-300">
              <FontAwesomeIcon icon={project.type.icon} className="mr-2" />{' '}
              {project.type.text}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="font-lora mb-8 max-w-4xl text-lg leading-relaxed text-violet-100">
          {project.description}
        </p>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Features Column */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
              <span className="h-2 w-2 rounded-full bg-violet-400"></span>
              Core Features
            </h3>
            <div className="space-y-3">
              {project.features.map((feature, index) => (
                <div
                  key={`${feature.title}-${index}`}
                  className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-violet-800/20"
                >
                  <div className="flex">
                    <FontAwesomeIcon
                      icon={feature.icon}
                      className="shrink-0 text-lg text-violet-300"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-violet-200">
                      {feature.title}
                    </p>
                    <p className="text-sm text-violet-300">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture & Tech Stack */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
              <span className="h-2 w-2 rounded-full bg-violet-400"></span>
              Technical Implementation
            </h3>

            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-violet-500/20 bg-violet-900/20 p-5">
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-violet-200">
                  <FontAwesomeIcon icon={faLaptopCode} className="text-lg" />
                  Frontend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.frontend.map((tech) => (
                    <span
                      key={tech}
                      className="flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-600/20 px-3 py-1 text-sm text-violet-200"
                    >
                      <TechIcon tech={tech} />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-violet-500/20 bg-violet-900/20 p-5">
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-violet-200">
                  <FontAwesomeIcon icon={faServer} className="text-lg" />
                  Backend & Cloud
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.backend.map((tech) => (
                    <span
                      key={tech}
                      className="flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-600/20 px-3 py-1 text-sm text-violet-200"
                    >
                      <TechIcon tech={tech} />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-3">
              {project.metrics.map((metric, index) => (
                <div
                  key={`${metric.label}-${index}`}
                  className="rounded-xl border border-violet-500/20 bg-linear-to-br from-violet-800/20 to-violet-800/20 p-4 text-center"
                >
                  <div className="mb-1 text-2xl font-bold text-white">
                    {metric.number}
                  </div>
                  <div className="mb-1 text-sm font-medium text-violet-300">
                    {metric.label}
                  </div>
                  <div className="text-xs text-violet-400">{metric.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Highlights */}
        <div className="mt-8 border-t border-violet-500/20 pt-8">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
            <span className="h-2 w-2 rounded-full bg-violet-400"></span>
            {project.highlightHeader}
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {project.highlights.map((highlight, index) => (
              <div
                key={`${highlight}-${index}`}
                className="flex items-center gap-2 rounded-lg border border-violet-500/20 bg-violet-900/20 p-3 transition-colors hover:bg-violet-900/30"
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  className="shrink-0 text-violet-400"
                />
                <span className="text-sm font-medium text-violet-200">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 flex justify-end">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-gray-200 px-5 py-3 text-xs font-medium tracking-wider text-violet-700 uppercase shadow-[0px_0px_16px_0px_rgba(255,255,255,0.4)] transition-all duration-200 hover:bg-gray-300 hover:shadow-[0px_0px_8px_0px_rgba(255,255,255,0.2)] active:shadow-none sm:gap-2.5 sm:px-7 sm:py-4 sm:text-sm"
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} className="h-4 w-4" />
            Visit Website
          </a>
        </div>
      </div>
    </div>
  </div>
))

ProjectCard.displayName = 'ProjectCard'

// ******************
// My works component
// ******************

const MyWorks = memo(() => {
  return (
    <section
      id="myworks"
      className="relative flex min-h-screen snap-start flex-col items-center justify-center gap-8 px-4 py-20 sm:gap-12 sm:px-8 md:px-16 lg:items-start lg:px-24 xl:px-32"
    >
      <h1 className="flex text-3xl font-semibold text-violet-400 sm:text-4xl md:text-5xl">
        My Works
      </h1>
      {PROJECTS.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  )
})

MyWorks.displayName = 'MyWorks'

export default MyWorks
