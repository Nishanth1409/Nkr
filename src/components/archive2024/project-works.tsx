'use client'

import React, { memo, useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faBrain,
  faChevronLeft,
  faChevronRight,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  ARCHIVE_PROJECTS,
  type ArchiveCarouselProject,
} from '../../data/portfolio-content'
import { useIntersectionObserver } from './lib/hooks/useIntersectionObserver'

const PROJECTS: ArchiveCarouselProject[] = ARCHIVE_PROJECTS

const PROJECT_ICONS = [
  <FontAwesomeIcon key="brain" icon={faBrain} className="h-5 w-5 text-violet-400" />,
  <FontAwesomeIcon key="utensils" icon={faUtensils} className="h-5 w-5 text-violet-400" />,
] as const

// Memoized navigation button component
const NavButton = memo(
  ({
    onClick,
    icon,
    title,
    className,
  }: {
    onClick: () => void
    icon: IconDefinition
    title: string
    className?: string
  }) => (
    <button
      title={title}
      onClick={onClick}
      className={`flex rounded-lg p-2 transition-colors hover:bg-violet-500/10 ${className || ''}`}
    >
      <FontAwesomeIcon icon={icon} className="h-5 w-5 text-violet-400" />
    </button>
  ),
)

NavButton.displayName = 'NavButton'

// Memoized technology badge component
const TechBadge = memo(({ tech }: { tech: string }) => (
  <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-300">
    {tech}
  </span>
))

TechBadge.displayName = 'TechBadge'

// Memoized project selector component
const ProjectSelector = memo(
  ({
    projects,
    activeProject,
    onProjectChange,
    getProjectIcon,
  }: {
    projects: readonly ArchiveCarouselProject[]
    activeProject: number
    onProjectChange: (index: number) => void
    getProjectIcon: (index: number) => React.ReactNode
  }) => (
    <div className="mb-8 hidden items-start justify-center gap-4 lg:flex lg:flex-col">
      {projects.map((project, index) => (
        <button
          key={project.id}
          onClick={() => onProjectChange(index)}
          className={`flex w-full items-center gap-2 rounded-lg px-4 py-2 whitespace-nowrap transition-colors duration-300 ${
            activeProject === index
              ? 'border border-violet-500/30 bg-violet-500/20'
              : 'hover:bg-violet-500/10'
          }`}
        >
          <div>{getProjectIcon(index)}</div>
          <span className="text-lg font-medium text-white">
            {project.title}
          </span>
        </button>
      ))}
    </div>
  ),
)

ProjectSelector.displayName = 'ProjectSelector'

const Projects = memo(() => {
  const [activeProject, setActiveProject] = useState<number>(0)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const { elementRef, hasLoaded } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
  })

  // Memoize project icon getter
  const getProjectIcon = useCallback((index: number): React.ReactNode => {
    return PROJECT_ICONS[index] || PROJECT_ICONS[0]
  }, [])

  // Memoize navigation handlers
  const handleProjectChange = useCallback((index: number) => {
    setActiveProject(index)
    setCurrentImageIndex(0)
  }, [])

  const handlePrevProject = useCallback(() => {
    const newIndex = (activeProject - 1 + PROJECTS.length) % PROJECTS.length
    handleProjectChange(newIndex)
  }, [activeProject, handleProjectChange])

  const handleNextProject = useCallback(() => {
    const newIndex = (activeProject + 1) % PROJECTS.length
    handleProjectChange(newIndex)
  }, [activeProject, handleProjectChange])

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % PROJECTS[activeProject].image.length,
    )
  }, [activeProject])

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + PROJECTS[activeProject].image.length) %
        PROJECTS[activeProject].image.length,
    )
  }, [activeProject])

  // Memoize current project data
  const currentProject = useMemo(() => PROJECTS[activeProject], [activeProject])
  const currentImage = useMemo(
    () => currentProject.image[currentImageIndex],
    [currentProject, currentImageIndex],
  )

  if (!hasLoaded) {
    return <div ref={elementRef} className="min-h-screen" />
  }

  return (
    <section
      ref={elementRef}
      id="projects"
      className="relative flex min-h-screen snap-start flex-col items-center justify-center gap-8 px-4 py-20 sm:gap-12 sm:px-8 md:px-16 lg:items-start lg:px-24 xl:px-32"
    >
      <h1 className="flex text-3xl font-semibold text-violet-400 sm:text-4xl md:text-5xl">
        My Projects
      </h1>

      <div className="flex w-full flex-col items-center justify-around gap-4 lg:flex-row lg:items-start">
        <ProjectSelector
          projects={PROJECTS}
          activeProject={activeProject}
          onProjectChange={handleProjectChange}
          getProjectIcon={getProjectIcon}
        />

        {/* Mobile Project Navigation */}
        <div className="mb-8 flex w-full items-center justify-between lg:hidden">
          <NavButton
            onClick={handlePrevProject}
            icon={faChevronLeft}
            title="Previous Project"
          />
          <div className="flex items-center gap-2">
            <div className="flex">{getProjectIcon(activeProject)}</div>
            <span className="text-lg font-medium text-white">
              {currentProject.title}
            </span>
          </div>
          <NavButton
            onClick={handleNextProject}
            icon={faChevronRight}
            title="Next Project"
          />
        </div>

        {/* Project Content */}
        <div className="relative w-full">
          <div className="flex w-full flex-col items-center justify-center space-y-6 transition-opacity duration-300">
            <div className="group relative aspect-video w-full overflow-hidden rounded-lg lg:w-[60vw]">
              <Image
                src={currentImage}
                alt={currentProject.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={currentImageIndex === 0}
                quality={75}
                style={{ objectFit: 'cover' }}
              />
              {/* Image Navigation Buttons */}
              <NavButton
                onClick={handlePrevImage}
                icon={faChevronLeft}
                title="Previous image"
                className="absolute top-1/2 left-0 h-full -translate-y-1/2 items-center justify-center p-1 opacity-0 transition-opacity group-hover:opacity-100"
              />
              <NavButton
                onClick={handleNextImage}
                icon={faChevronRight}
                title="Next image"
                className="absolute top-1/2 right-0 h-full -translate-y-1/2 items-center justify-center p-1 opacity-0 transition-opacity group-hover:opacity-100"
              />
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {currentProject.image.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === currentImageIndex
                        ? 'bg-violet-400'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4 lg:max-w-[60vw]">
              <p className="font-lora text-lg leading-relaxed text-violet-300">
                {currentProject.description}
              </p>

              <div className="flex flex-col justify-between gap-4 lg:flex-row">
                <div className="flex h-fit w-fit flex-wrap gap-2">
                  {currentProject.technologies.map((tech) => (
                    <TechBadge key={tech} tech={tech} />
                  ))}
                </div>

                <a
                  href={currentProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-white/20 bg-gray-200 px-6 py-3 text-sm font-medium tracking-wider text-violet-700 uppercase transition-all duration-200 hover:bg-gray-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                    stroke="currentColor"
                    strokeWidth={2}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  View Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Projects.displayName = 'Projects'

export default Projects
