'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

import {
  FIGMA_CUBE_SCENES,
  FIGMA_SECTION_INTRO,
  faceImagesForSegment,
} from '../data/figma-cube-content'

import '../app/figma-cube.css'

const FACE_KEYS = ['top', 'front', 'right', 'back', 'left', 'bottom'] as const

/** Hide side copy while the cube is turning */
const COPY_SETTLE = 0.09

/** One viewport of scroll with cube centered before rotation begins */
const ROTATION_LEAD_VIEWS = 1

type CubeStop = { rx: number; ry: number }

const buildStops = (n: number): CubeStop[] => {
  const base: CubeStop[] = [
    { rx: 90, ry: 0 },
    { rx: 0, ry: 0 },
    { rx: 0, ry: -90 },
    { rx: 0, ry: -180 },
    { rx: 0, ry: -270 },
    { rx: -90, ry: -360 },
  ]
  const out = base.slice(0, Math.min(n, 6))
  for (let i = 6; i < n; i++) {
    out.push({ rx: 0, ry: -360 - (i - 6) * 90 })
  }
  return out
}

const easeIO = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

const cubeTransform = (s: number, stops: CubeStop[], n: number) => {
  if (n < 2 || stops.length < 2) return 'rotateX(90deg) rotateY(0deg)'
  const t = s * (n - 1)
  const i = Math.min(Math.floor(t), n - 2)
  const f = easeIO(t - i)
  const a = stops[i]
  const b = stops[i + 1]
  const rx = a.rx + (b.rx - a.rx) * f
  const ry = a.ry + (b.ry - a.ry) * f
  return `rotateX(${rx}deg) rotateY(${ry}deg)`
}

const copyOpacityFromSegment = (segmentT: number) => {
  const nearest = Math.round(segmentT)
  const dist = Math.abs(segmentT - nearest)
  if (dist <= COPY_SETTLE) return 1
  if (dist >= COPY_SETTLE + 0.14) return 0
  return 1 - (dist - COPY_SETTLE) / 0.14
}

/** Rotation 0→1 only after intro + lead-in, while scrolling the step track */
const rotationProgressFromScroll = (
  sectionTop: number,
  introHeight: number,
  scrollHeight: number,
  viewport: number,
) => {
  const scrolled = -sectionTop
  const leadPx = viewport * ROTATION_LEAD_VIEWS
  const trackScrolled = Math.max(0, scrolled - introHeight)

  if (trackScrolled <= leadPx) return 0

  const rotatable = Math.max(1, scrollHeight - leadPx - viewport)
  const rotScrolled = trackScrolled - leadPx
  return Math.min(1, rotScrolled / rotatable)
}

export function FigmaCubeGallery() {
  const scenes = FIGMA_CUBE_SCENES
  const n = scenes.length
  const stops = useMemo(() => buildStops(n), [n])
  const maxIndex = n - 1

  const sectionRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const [segmentT, setSegmentT] = useState(0)
  const [cubeStyle, setCubeStyle] = useState('rotateX(90deg) rotateY(0deg)')

  const faceImages = useMemo(
    () => faceImagesForSegment(segmentT),
    [segmentT],
  )

  const activeStop = Math.min(maxIndex, Math.max(0, Math.round(segmentT)))
  const activeScene = scenes[activeStop]
  const copyOpacity = copyOpacityFromSegment(segmentT)
  const activeLink = activeScene?.link ?? null
  const linkVisible = Boolean(activeLink && copyOpacity > 0.85)

  useEffect(() => {
    const section = sectionRef.current
    const intro = introRef.current
    const scroll = scrollRef.current
    if (!section || !scroll) return

    let frameId = 0

    const tick = () => {
      const viewport = window.innerHeight
      const sectionRect = section.getBoundingClientRect()
      const introHeight = intro?.offsetHeight ?? 0
      const scrollHeight = scroll.offsetHeight

      let progress = 0

      if (sectionRect.bottom > viewport && sectionRect.top < viewport) {
        progress = rotationProgressFromScroll(
          sectionRect.top,
          introHeight,
          scrollHeight,
          viewport,
        )
      } else if (sectionRect.bottom <= viewport) {
        progress = 1
      }

      const nextSegmentT = progress * Math.max(n - 1, 1)
      setSegmentT(nextSegmentT)
      setCubeStyle(cubeTransform(progress, stops, n))
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [n, stops])

  const cubeFaces = FACE_KEYS.map((face, faceIdx) => (
    <div key={face} className="figma-cube-face" data-face={face}>
      <div className="figma-cube-face-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={faceImages[faceIdx]}
          alt=""
          className="figma-cube-face-img"
          draggable={false}
        />
      </div>
    </div>
  ))

  return (
    <section
      ref={sectionRef}
      id="figma-works"
      className="figma-cube-section figma-cube-section-copy w-full bg-transparent"
    >
      <div
        ref={introRef}
        className="figma-cube-intro container relative z-30 flex w-full flex-col items-start gap-2 px-8 pb-4 pt-16 md:px-24 md:pt-24"
      >
        <span className="no-grunge text-3xl sm:text-4xl md:text-5xl">{FIGMA_SECTION_INTRO.title}</span>
        <span className="no-grunge text-xl sm:text-2xl">{FIGMA_SECTION_INTRO.subtitle}</span>
        <span className="no-grunge max-w-2xl text-lg md:text-xl">
          {FIGMA_SECTION_INTRO.description}
        </span>
      </div>

      <div className="figma-cube-sticky">
        <div className="figma-cube-stage">
          <div
            className={`figma-cube-active-copy ${activeScene.cardAlign === 'right' ? 'right' : ''}`}
            style={{ opacity: copyOpacity }}
          >
            <span className="figma-cube-copy-title no-grunge block text-xl md:text-2xl">
              {activeScene.name}
            </span>
            <span className="figma-cube-copy-sub no-grunge mt-1 block text-lg opacity-80 md:text-xl">
              {activeScene.subtitle}
            </span>
            <p className="figma-cube-copy-body no-grunge mt-3 max-w-md text-lg md:text-xl">
              {activeScene.body}
            </p>
            {activeLink ? (
              <p
                className={`figma-cube-figma-link no-grunge mt-4 text-xl ${linkVisible ? 'is-visible' : ''}`}
              >
                <Link
                  href={activeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="figma-cube-figma-link-anchor font-medium underline text-link-hover no-grunge"
                  tabIndex={linkVisible ? 0 : -1}
                  aria-hidden={!linkVisible}
                >
                  Open in Figma ↗
                </Link>
              </p>
            ) : null}
          </div>

          <div className="figma-cube-scene">
            <div className="figma-cube-pivot">
              <div
                className={`figma-cube ${linkVisible && activeLink ? 'figma-cube--interactive' : ''}`}
                style={{ transform: cubeStyle }}
              >
                {cubeFaces}
                {linkVisible && activeLink ? (
                  <a
                    href={activeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="figma-cube-hit"
                    aria-label={`Open ${activeScene.name} in Figma`}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="figma-cube-scroll container px-8 md:px-24"
      >
        <div
          className="figma-cube-scroll-lead"
          aria-hidden
          style={{ minHeight: `${ROTATION_LEAD_VIEWS * 100}vh` }}
        />
        {scenes.map((scene) => (
          <section
            key={scene.id}
            id={scene.id}
            className="figma-cube-scroll-section"
            aria-hidden
          />
        ))}
      </div>
    </section>
  )
}
