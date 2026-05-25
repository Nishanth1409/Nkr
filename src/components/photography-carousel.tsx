'use client'

import Image from 'next/image'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
const INSTAGRAM_URL = 'https://www.instagram.com/_n.k.r_creation'

const speedWheel = 0.055
const speedDrag = -0.12
const progressEpsilon = 2

/** Stage center must sit near viewport middle before photo-scroll takes over */
const CENTER_BAND = 0.14

const isPointerOverCarousel = (
  root: HTMLElement,
  clientX: number,
  clientY: number
) => {
  const el = document.elementFromPoint(clientX, clientY)
  return el instanceof Node && root.contains(el)
}

export type PhotographySlide =
  | {
      type: 'photo'
      src: string
      alt: string
      objectPosition?: string
    }
  | {
      type: 'instagram'
      href: string
      imageSrc: string
      alt: string
    }

const getZIndex = (length: number, index: number, active: number) =>
  index === active ? length : length - Math.abs(index - active)

const getActiveIndex = (progress: number, count: number) =>
  Math.floor((progress / 100) * Math.max(count - 1, 0))

const shufflePhotoSlides = (slides: PhotographySlide[]): PhotographySlide[] => {
  const photos = slides.filter((s) => s.type === 'photo')
  const instagram = slides.find((s) => s.type === 'instagram')

  for (let i = photos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[photos[i], photos[j]] = [photos[j], photos[i]]
  }

  return instagram ? [...photos, instagram] : photos
}

type PhotographyCarouselProps = {
  slides: PhotographySlide[]
}

const isCarouselCenteredInViewport = (stage: HTMLElement | null) => {
  if (!stage) return false

  const rect = stage.getBoundingClientRect()
  const vh = window.innerHeight
  const viewportMid = vh / 2
  const stageMid = rect.top + rect.height / 2
  const band = vh * CENTER_BAND

  const centered = Math.abs(stageMid - viewportMid) <= band
  const visible = rect.top < vh * 0.9 && rect.bottom > vh * 0.1

  return centered && visible
}

export function PhotographyCarousel({ slides }: PhotographyCarouselProps) {
  const [orderedSlides, setOrderedSlides] = useState(slides)

  useEffect(() => {
    setOrderedSlides(shufflePhotoSlides(slides))
  }, [slides])

  const count = orderedSlides.length
  const [progress, setProgress] = useState(0)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const startXRef = useRef(0)
  const isDownRef = useRef(false)
  const progressRef = useRef(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  const active = getActiveIndex(progress, count)

  const clampProgress = useCallback(
    (value: number) => Math.max(0, Math.min(value, 100)),
    []
  )

  const setProgressValue = useCallback(
    (value: number) => {
      const next = clampProgress(value)
      progressRef.current = next
      setProgress(next)
    },
    [clampProgress]
  )

  const setProgressFromIndex = useCallback(
    (index: number) => {
      if (count <= 1) {
        setProgressValue(0)
        return
      }
      setProgressValue((index / (count - 1)) * 100)
    },
    [count, setProgressValue]
  )

  const applyWheelDelta = useCallback(
    (deltaY: number) => {
      const current = progressRef.current
      const wheelDelta = deltaY * speedWheel
      const atLast = current >= 100 - progressEpsilon
      const atFirst = current <= progressEpsilon

      if (wheelDelta > 0 && atLast) return false
      if (wheelDelta < 0 && atFirst) return false

      setProgressValue(current + wheelDelta)
      return true
    },
    [setProgressValue]
  )

  useEffect(() => {
    const stage = stageRef.current
    const root = rootRef.current
    if (!stage || !root) return

    const handleWheel = (e: WheelEvent) => {
      if (!isPointerOverCarousel(root, e.clientX, e.clientY)) return
      if (!isCarouselCenteredInViewport(stage)) return
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return

      const consumed = applyWheelDelta(e.deltaY)
      if (consumed) e.preventDefault()
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (!root.contains(e.target as Node)) return
      isDownRef.current = true
      startXRef.current = e.clientX
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (root.contains(e.target as Node) || isDownRef.current) {
        setCursor({ x: e.clientX, y: e.clientY })
      }

      if (!isDownRef.current) return
      const mouseProgress = (e.clientX - startXRef.current) * speedDrag
      startXRef.current = e.clientX
      setProgressValue(progressRef.current + mouseProgress)
    }

    const handleMouseUp = () => {
      isDownRef.current = false
    }

    let touchStartY = 0
    let touchStartX = 0

    const handleTouchStart = (e: TouchEvent) => {
      if (!root.contains(e.target as Node)) return
      const touch = e.touches[0]
      if (!touch) return
      touchStartX = touch.clientX
      touchStartY = touch.clientY
      isDownRef.current = true
      startXRef.current = touch.clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDownRef.current) return
      const touch = e.touches[0]
      if (!touch) return

      const dx = touch.clientX - touchStartX
      const dy = touch.clientY - touchStartY

      if (Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault()
        const mouseProgress = (touch.clientX - startXRef.current) * speedDrag
        startXRef.current = touch.clientX
        setProgressValue(progressRef.current + mouseProgress)
        return
      }

      if (!root.contains(e.target as Node)) return
      if (!isCarouselCenteredInViewport(stage)) return

      const consumed = applyWheelDelta(dy * 0.35)
      if (consumed) e.preventDefault()
    }

    const handleTouchEnd = () => {
      isDownRef.current = false
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    root.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    root.addEventListener('touchstart', handleTouchStart, { passive: true })
    root.addEventListener('touchmove', handleTouchMove, { passive: false })
    root.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      root.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      root.removeEventListener('touchstart', handleTouchStart)
      root.removeEventListener('touchmove', handleTouchMove)
      root.removeEventListener('touchend', handleTouchEnd)
    }
  }, [applyWheelDelta, setProgressValue])

  if (count === 0) return null

  const itemStyle = (index: number): CSSProperties => {
    const offset = count > 0 ? (index - active) / count : 0
    return {
      '--items': count,
      '--active': offset,
      '--zIndex': getZIndex(count, index, active),
    } as CSSProperties
  }

  return (
    <div
      ref={rootRef}
      className="photo-carousel relative w-full touch-pan-y select-none"
      aria-label="Photography gallery carousel"
      onMouseEnter={() => setCursorVisible(true)}
      onMouseLeave={() => {
        setCursorVisible(false)
        isDownRef.current = false
      }}
    >
      <div
        ref={stageRef}
        className="photo-carousel-stage relative z-1 mx-auto h-[min(85vh,780px)] w-full max-w-full"
      >
        {orderedSlides.map((slide, index) => {
          const isCenter = index === active
          const style = itemStyle(index)

          if (slide.type === 'instagram') {
            return (
              <a
                key="instagram-more"
                href={slide.href}
                target="_blank"
                rel="noopener noreferrer"
                className="photo-carousel-item photo-carousel-item--logo"
                style={style}
                onClick={(e) => {
                  if (!isCenter) {
                    e.preventDefault()
                    setProgressFromIndex(index)
                  }
                }}
                aria-label="View more photography on Instagram"
              >
                <div className="photo-carousel-box photo-carousel-box--logo">
                  <div className="photo-carousel-logo-media photo-carousel-media">
                    <Image
                      src={slide.imageSrc}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 48vw, 400px"
                      className="photo-carousel-img object-contain"
                      draggable={false}
                      priority
                      unoptimized
                    />
                  </div>
                  <span className="photo-carousel-cta no-grunge">
                    Click for more images
                  </span>
                </div>
              </a>
            )
          }

          return (
            <button
              key={`${slide.src}-${index}`}
              type="button"
              className="photo-carousel-item"
              style={style}
              onClick={() => setProgressFromIndex(index)}
              aria-label={slide.alt}
              aria-current={isCenter ? 'true' : undefined}
            >
              <div className="photo-carousel-box">
                <div className="photo-carousel-media">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 768px) 90vw, 800px"
                    className="photo-carousel-img object-cover"
                    style={{ objectPosition: slide.objectPosition ?? 'center' }}
                    draggable={false}
                    priority={index <= 2}
                    unoptimized
                  />
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div
        className={`photo-carousel-cursor pointer-events-none fixed z-100 hidden md:block ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
        aria-hidden
      />
      <div
        className={`photo-carousel-cursor photo-carousel-cursor--dot pointer-events-none fixed z-100 hidden md:block ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
        aria-hidden
      />
    </div>
  )
}

export { INSTAGRAM_URL }
