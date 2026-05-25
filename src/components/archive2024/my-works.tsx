'use client'

import React, { memo } from 'react'
import Image from 'next/image'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  DESIGN_ARCHIVE_FILES,
  INSTAGRAM_URL,
  MY_DESIGNS_DRIVE_URL,
  PHOTOGRAPHY_ARCHIVE_FILES,
} from '../../data/portfolio-content'
import HoverBorderGradient from './ui/hover-border-gradient'

const designImageUrl = (file: string) =>
  `/images/designs/${encodeURIComponent(file)}`

const photoImageUrl = (file: string) =>
  `/images/Photography/${encodeURIComponent(file)}`

const MyWorks = memo(() => {
  return (
    <section
      id="myworks"
      className="relative flex min-h-screen snap-start flex-col items-start justify-center gap-16 px-4 py-20 sm:px-8 md:px-16 lg:px-24 xl:px-32"
    >
      <h1 className="text-3xl font-semibold text-violet-400 sm:text-4xl md:text-5xl">
        Other Works
      </h1>

      <div className="flex w-full flex-col gap-6">
        <h2 className="text-2xl font-semibold text-violet-300 sm:text-3xl">
          Photography clicks
        </h2>
        <p className="font-lora max-w-3xl text-lg text-violet-200">
          Moments captured off the screen. Full gallery on{' '}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 underline transition-colors hover:text-violet-300"
          >
            @_n.k.r_creation
          </a>
          .
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
          {PHOTOGRAPHY_ARCHIVE_FILES.map((file) => (
            <div
              key={file}
              className="relative aspect-[3/4] overflow-hidden rounded-xl border border-violet-500/25 bg-black/40"
            >
              <Image
                src={photoImageUrl(file)}
                alt="Photography"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 280px"
                unoptimized
              />
            </div>
          ))}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex aspect-[3/4] flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-violet-500/40 bg-black p-4 text-center transition-colors hover:border-violet-400/60"
          >
            <Image
              src="/images/Photography/newlogo.jpg"
              alt="More on Instagram"
              width={120}
              height={120}
              className="object-contain"
              unoptimized
            />
            <span className="font-lora text-sm text-violet-100">
              Click for more images
            </span>
          </a>
        </div>
      </div>

      <div className="flex w-full flex-col gap-6">
        <h2 className="text-2xl font-semibold text-violet-300 sm:text-3xl">
          My template design
        </h2>
        <p className="font-lora max-w-3xl text-lg text-violet-200">
          Posters, invites, and layouts from my design work.
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {DESIGN_ARCHIVE_FILES.map((file) => (
            <div
              key={file}
              className="relative aspect-[4/5] overflow-hidden rounded-xl border border-violet-500/25 bg-black/40"
            >
              <Image
                src={designImageUrl(file)}
                alt="Template design"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 320px"
                unoptimized
              />
            </div>
          ))}
          <a
            href={MY_DESIGNS_DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex aspect-[4/5] flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-violet-500/40 bg-black p-4 text-center transition-colors hover:border-violet-400/60"
          >
            <Image
              src="/images/designs/more-designs.jpg"
              alt="More designs"
              width={120}
              height={120}
              className="object-contain"
              unoptimized
            />
            <span className="font-lora text-sm text-violet-100">
              Click for more designs
            </span>
          </a>
        </div>

        <div className="flex justify-start">
          <HoverBorderGradient
            as="a"
            href={MY_DESIGNS_DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            containerClassName="rounded-full"
            className="flex items-center gap-2 bg-black px-6 py-2 text-sm text-white"
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} className="h-4 w-4" />
            Open Google Drive folder
          </HoverBorderGradient>
        </div>
      </div>
    </section>
  )
})

MyWorks.displayName = 'MyWorks'

export default MyWorks
