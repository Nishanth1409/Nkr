'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/solid'

const ASSET = '/archive2023'

const projects = [
  {
    id: 1,
    category: 'Restaurant Management System',
    title: 'Swaad Sanchalan',
    description: 'A comprehensive restaurant management solution',
    link: 'https://github.com/violetto-rose/Swaad-Sanchalan',
    pageImage: {
      src: `${ASSET}/swaad-sanchalan.svg`,
      alt: 'Swaad Sanchalan Project',
      objectFit: 'contain',
    },
    cardPosition: {
      desktop: { x: 0, y: 0 },
      tablet: { x: 0, y: 0 },
      mobile: { x: 0, y: 0 },
    },
    textAlign: 'center',
    layout: { desktop: 'vertical', tablet: 'vertical', mobile: 'vertical' },
    cardStyle: {
      rounded: '2rem',
      shadow: 'shadow-md',
      borderGradient: 'linear-gradient(90deg, #FFB147, #FF6C63, #B86ADF)',
      bgColor: 'bg-white',
    },
    cardSize: {
      scale: 1,
      imageMaxHeight: '30vh',
    },
  },
  {
    id: 2,
    category: 'AI-Powered Sentiment Analysis Platform',
    title: 'BhaavChitra',
    description: 'Advanced sentiment analysis with AI capabilities',
    link: 'https://github.com/violetto-rose/bhaavchitra',
    pageImage: {
      src: `${ASSET}/bhaavchitra.svg`,
      alt: 'BhaavChitra Project',
      objectFit: 'cover',
    },
    cardPosition: {
      desktop: { x: 0, y: 0 },
      tablet: { x: 0, y: 0 },
      mobile: { x: 0, y: 0 },
    },
    textAlign: 'center',
    layout: { desktop: 'vertical', tablet: 'vertical', mobile: 'vertical' },
    cardStyle: {
      rounded: '2rem',
      shadow: 'shadow-md',
      borderGradient: 'linear-gradient(90deg, #FFB147, #FF6C63, #B86ADF)',
      bgColor: 'bg-white',
    },
    cardSize: {
      scale: 1,
      imageMaxHeight: '35vh',
    },
  },
]

export default function WorksSection() {
  const [activeModal, setActiveModal] = useState(null)
  const [windowWidth, setWindowWidth] = useState(1024)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getDevice = () => {
    if (windowWidth < 768) return 'mobile'
    if (windowWidth < 1024) return 'tablet'
    return 'desktop'
  }

  const renderProjectCard = (project) => {
    const device = getDevice()
    const position = project.cardPosition[device]
    const scale = project.cardSize.scale

    return (
      <div
        key={project.id}
        className="flex w-full max-w-full flex-col items-center justify-center gap-4"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transition: 'transform 0.3s ease',
        }}
      >
        <div
          className={`relative flex max-w-full cursor-pointer flex-col items-center justify-center ${project.cardStyle.bgColor} ${project.cardStyle.shadow}`}
          style={{
            borderRadius: project.cardStyle.rounded,
            padding: '2px',
            background: project.cardStyle.borderGradient,
            width: 'min(100%, 20rem)',
            height: 'auto',
          }}
          onClick={() => setActiveModal(project)}
        >
          <div
            className={`flex flex-col justify-center items-center ${project.cardStyle.bgColor}`}
            style={{
              borderRadius: `calc(${project.cardStyle.rounded} - 0.25rem)`,
              padding: `${1.5 * scale}rem`,
            }}
          >
            <div className="flex justify-center mb-4">
              <img
                src={project.pageImage.src}
                alt={project.pageImage.alt}
                style={{
                  maxHeight: project.cardSize.imageMaxHeight,
                  borderRadius: '1.5rem',
                  objectFit: project.pageImage.objectFit,
                }}
              />
            </div>
            <div className="flex flex-col items-center text-center">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mb-2 text-[#FF6C63] font-bold hover:underline transition"
              >
                <ArrowRightIcon className="w-5 h-5 -rotate-45" />
                {project.category}
              </a>
              <span className="mb-2 text-2xl font-bold md:text-3xl lg:text-4xl">
                {project.title}
              </span>
              <span className="text-base text-gray-700 md:text-lg">
                {project.description}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getContainerClass = (layout) => {
    switch (layout) {
      case 'vertical':
        return 'flex flex-col space-y-8'
      case 'horizontal':
        return 'flex flex-row space-x-6 overflow-x-auto'
      case 'grid':
        return 'grid grid-cols-2 md:grid-cols-3 gap-8'
      default:
        return 'flex flex-col space-y-8'
    }
  }

  return (
    <div className="flex min-h-screen max-w-full items-center justify-center overflow-x-clip bg-white">
      <div className="portfolio-shell !px-[clamp(1rem,4vw,7rem)] space-y-0 pt-20 pb-8">
        <div className="mb-12 text-center">
          <span className="text-lg italic font-bold text-gray-700">Work</span>
          <h2 className="mt-2 bg-gradient-to-r from-[#FFB147] via-[#FF6C63] to-[#B86ADF] bg-clip-text text-3xl font-bold text-transparent uppercase md:text-4xl lg:text-5xl">
            Recent Projects
          </h2>
        </div>

        <div
          className={`${getContainerClass(projects[0].layout.desktop)} w-full max-w-full items-center overflow-x-clip`}
        >
          {projects.map((project) => renderProjectCard(project))}
        </div>

        {activeModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-md"
            onClick={() => setActiveModal(null)}
          >
            <div
              className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl md:w-2/3 md:max-w-none lg:w-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-3 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#FFB147] via-[#FF6C63] to-[#B86ADF] text-2xl font-bold text-white shadow-lg transition hover:scale-110"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>

              <img
                src={activeModal.pageImage.src}
                alt={activeModal.pageImage.alt}
                className="max-h-[60vh] w-full rounded-2xl object-contain"
              />

              <a
                href={activeModal.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setActiveModal(null)}
                className="absolute right-4 bottom-4 rounded-full bg-gradient-to-r from-[#FFB147] via-[#FF6C63] to-[#B86ADF] p-3 text-white shadow-lg transition hover:scale-110"
              >
                <ArrowRightIcon className="h-6 w-6 -rotate-45" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
