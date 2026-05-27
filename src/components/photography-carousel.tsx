'use client'

import Image from 'next/image'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const INSTAGRAM_URL = 'https://www.instagram.com/_n.k.r_creation'

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

const hashString = (value: string) => {
  let hash = 2166136261
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

const createSeededRandom = (seed: number) => {
  let state = seed || 1
  return () => {
    state = Math.imul(state ^ (state >>> 15), state | 1)
    state ^= state + Math.imul(state ^ (state >>> 7), state | 61)
    return ((state ^ (state >>> 14)) >>> 0) / 4294967296
  }
}

/** Deterministic shuffle — same result on server and client (no Math.random) */
const shufflePhotoSlides = (slides: PhotographySlide[]): PhotographySlide[] => {
  const photos = slides.filter((s) => s.type === 'photo')
  const instagram = slides.find((s) => s.type === 'instagram')
  const seed = hashString(photos.map((photo) => photo.src).sort().join('\0'))
  const random = createSeededRandom(seed)

  for (let i = photos.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[photos[i], photos[j]] = [photos[j], photos[i]]
  }

  return instagram ? [...photos, instagram] : photos
}

/** Tall scroll runway — sticky stage stays centred while page scroll advances photos */
const getScrollTrackHeightVh = (count: number) =>
  Math.max(220, 100 + Math.max(count - 1, 1) * 30)

type PhotographyCarouselProps = {
  slides: PhotographySlide[]
}

export function PhotographyCarousel({ slides }: PhotographyCarouselProps) {
  const orderedSlides = useMemo(() => shufflePhotoSlides(slides), [slides])

  const count = orderedSlides.length
  const scrollHeightVh = getScrollTrackHeightVh(count)
  const [progress, setProgress] = useState(0)
  const scrollTrackRef = useRef<HTMLDivElement>(null)

  const active = getActiveIndex(progress, count)

  const setProgressValue = useCallback((value: number) => {
    const next = Math.max(0, Math.min(value, 100))
    setProgress(next)
  }, [])

  const setProgressFromIndex = useCallback(
    (index: number) => {
      if (count <= 1) {
        setProgressValue(0)
        return
      }
      setProgressValue((index / (count - 1)) * 100)
    },
    [count, setProgressValue],
  )

  // Sticky scroll track + scrub (no pin — avoids clashing with My Designs pin)
  useEffect(() => {
    const scrollTrack = scrollTrackRef.current
    if (!scrollTrack || count <= 1) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    gsap.registerPlugin(ScrollTrigger)

    const st = ScrollTrigger.create({
      trigger: scrollTrack,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        setProgressValue(self.progress * 100)
      },
    })

    const refreshScroll = () => ScrollTrigger.refresh()
    refreshScroll()
    const refreshTimer = window.setTimeout(refreshScroll, 500)
    const imagesTimer = window.setTimeout(refreshScroll, 1500)

    return () => {
      window.clearTimeout(refreshTimer)
      window.clearTimeout(imagesTimer)
      st.kill()
      ScrollTrigger.refresh()
    }
  }, [count, scrollHeightVh, setProgressValue])

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
      ref={scrollTrackRef}
      className="photo-carousel-scroll-track relative w-full"
      style={{ height: `${scrollHeightVh}vh` }}
      aria-label="Photography gallery carousel"
    >
      <div className="photo-carousel-sticky">
        <div className="photo-carousel relative w-full select-none">
          <div className="photo-carousel-stage relative z-1 mx-auto h-[min(85vh,780px)] w-full max-w-full">
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
                        style={{
                          objectPosition: slide.objectPosition ?? 'center',
                        }}
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
        </div>
      </div>
    </div>
  )
}

export { INSTAGRAM_URL }
