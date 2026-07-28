'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import {
  P26_CHAPTERS,
  P26_DESIGNS,
  P26_HANDLE,
  P26_LINKS,
  P26_NAME,
  P26_PHOTOS,
  P26_PROJECTS,
  P26_STACK,
  P26_TAGLINE,
  P26_YEAR,
} from './data'
import './portfolio2026.css'

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false })

type SkyState = {
  top: string
  mid: string
  bottom: string
  glow: string
  label: string
}

export default function Portfolio2026() {
  const trackRef = useRef<HTMLDivElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const progressLabelRef = useRef<HTMLSpanElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const chapterIndexRef = useRef(0)
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [skyLabel, setSkyLabel] = useState('Sunrise')

  useEffect(() => {
    setMounted(true)
  }, [])

  const onSkyChange = (sky: SkyState) => {
    const root = rootRef.current
    if (!root) return
    root.style.setProperty('--p26-sky-top', sky.top)
    root.style.setProperty('--p26-sky-mid', sky.mid)
    root.style.setProperty('--p26-sky-bottom', sky.bottom)
    root.style.setProperty('--p26-glow', sky.glow)
    setSkyLabel((prev) => (prev === sky.label ? prev : sky.label))
  }

  useEffect(() => {
    if (!mounted) return
    gsap.registerPlugin(ScrollTrigger)

    const track = trackRef.current
    if (!track) return

    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
      onUpdate: (self) => {
        const p = self.progress
        progressRef.current = p
        const idx = Math.min(
          P26_CHAPTERS.length - 1,
          Math.floor(p * P26_CHAPTERS.length),
        )
        if (idx !== chapterIndexRef.current) {
          chapterIndexRef.current = idx
          setActive(idx)
        }
        if (progressFillRef.current) {
          progressFillRef.current.style.width = `${Math.round(p * 100)}%`
        }
        if (progressLabelRef.current) {
          progressLabelRef.current.textContent = `${String(Math.round(p * 100)).padStart(2, '0')}%`
        }
      },
    })

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('resize', refresh)
    const t = window.setTimeout(refresh, 250)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('resize', refresh)
      st.kill()
    }
  }, [mounted])

  const scrollToChapter = (i: number) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const top =
      window.scrollY +
      rect.top +
      (i / P26_CHAPTERS.length) * track.offsetHeight +
      8
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const dawnPhotos = P26_PHOTOS.filter((p) =>
    ['sunrise', 'day'].includes(p.phase),
  )
  const nightPhotos = P26_PHOTOS.filter((p) =>
    ['moonrise', 'night', 'moonset', 'sunset'].includes(p.phase),
  )

  return (
    <div ref={rootRef} className="p26-root">
      <div className="p26-sky" aria-hidden />
      {mounted ? (
        <Scene3D
          progressRef={progressRef}
          chapterIndexRef={chapterIndexRef}
          onSkyChange={onSkyChange}
        />
      ) : null}
      <div className="p26-grain" aria-hidden />
      <div className="p26-vignette" aria-hidden />

      <div ref={trackRef} className="p26-scroll-track" />

      <header className="p26-hud">
        <div className="p26-topbar">
          <div className="p26-topbar-row">
            <div>
              <div className="p26-mark">
                {P26_HANDLE} <span className="p26-year">· {P26_YEAR}</span>
              </div>
              <div className="mt-2">
                <span className="p26-sky-chip">{skyLabel}</span>
              </div>
            </div>

            <div className="p26-year-links">
              <Link href="/archive2025" className="is-calm">
                2025
              </Link>
              <Link href="/archive2024">2024</Link>
              <Link href="/archive2023">2023</Link>
            </div>
          </div>

          <nav className="p26-nav" aria-label="Sky chapters">
            {P26_CHAPTERS.map((c, i) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className={i === active ? 'is-active' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToChapter(i)
                }}
              >
                {c.sky}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-end justify-between gap-4">
          <p className="p26-hint">Scroll the day · Sunrise → Moonset</p>
          <div className="p26-progress">
            <div className="p26-progress-bar" aria-hidden>
              <div ref={progressFillRef} className="p26-progress-fill" />
            </div>
            <span ref={progressLabelRef} className="p26-progress-label">
              00%
            </span>
          </div>
        </div>
      </header>

      <main className="p26-stage">
        {P26_CHAPTERS.map((c, i) => (
          <section
            key={c.id}
            id={c.id}
            className={`p26-chapter${i === active ? ' is-active' : ''}`}
            aria-hidden={i !== active}
            style={{
              position: i === active ? 'relative' : 'absolute',
              pointerEvents: i === active ? 'auto' : 'none',
            }}
          >
            <p className="p26-kicker">
              {c.index} · {c.kicker}
            </p>

            {c.id === 'sunrise' ? (
              <>
                <p className="p26-hero-name">{P26_NAME}</p>
                <h1 className="p26-title">{c.title}</h1>
                <p className="p26-body">{P26_TAGLINE}</p>
                <p className="p26-body mt-4">{c.body}</p>
                <div className="p26-rail" aria-label="Dawn photography">
                  {dawnPhotos.slice(0, 5).map((photo) => (
                    <figure key={photo.src}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photo.src} alt={photo.alt} loading="lazy" />
                      <figcaption>{photo.alt}</figcaption>
                    </figure>
                  ))}
                </div>
              </>
            ) : null}

            {c.id === 'day' ? (
              <>
                <h2 className="p26-title">{c.title}</h2>
                <p className="p26-body">{c.body}</p>
                <p className="p26-body mt-4">
                  Nature taught patience. Design taught systems. Code taught
                  shipping. Photography taught me when to wait for light.
                </p>
              </>
            ) : null}

            {c.id === 'golden' ? (
              <>
                <h2 className="p26-title">{c.title}</h2>
                <p className="p26-body">{c.body}</p>
                <div className="p26-stack">
                  {P26_STACK.map((s) => (
                    <span key={s} className="p26-chip">
                      {s}
                    </span>
                  ))}
                </div>
                <div
                  className="p26-rail p26-rail--wide"
                  aria-label="Design work"
                >
                  {P26_DESIGNS.map((d) => (
                    <figure key={d.src}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={d.src} alt={d.title} loading="lazy" />
                      <figcaption>{d.title}</figcaption>
                    </figure>
                  ))}
                </div>
                <p className="p26-media-note">
                  More on Drive · Instagram craft
                </p>
              </>
            ) : null}

            {c.id === 'sunset' ? (
              <>
                <h2 className="p26-title">{c.title}</h2>
                <p className="p26-body">{c.body}</p>
                <div className="p26-projects">
                  {P26_PROJECTS.map((p) => (
                    <a
                      key={p.title}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p26-project"
                    >
                      <strong>{p.title}</strong>
                      <em>{p.blurb}</em>
                      <span>{p.role}</span>
                    </a>
                  ))}
                </div>
              </>
            ) : null}

            {c.id === 'moonrise' ? (
              <>
                <h2 className="p26-title">{c.title}</h2>
                <p className="p26-body">{c.body}</p>
                <div className="p26-rail" aria-label="Night photography">
                  {nightPhotos.map((photo) => (
                    <figure key={photo.src}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photo.src} alt={photo.alt} loading="lazy" />
                      <figcaption>{photo.alt}</figcaption>
                    </figure>
                  ))}
                </div>
                <div className="p26-connect-links">
                  <a
                    href={P26_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @_mr.nishanth.k.r
                  </a>
                  <a
                    href={P26_LINKS.instagramCreation}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @_n.k.r_creation
                  </a>
                </div>
              </>
            ) : null}

            {c.id === 'night' ? (
              <>
                <h2 className="p26-title">{c.title}</h2>
                <p className="p26-body">{c.body}</p>
                <div className="p26-connect-links">
                  <a
                    href={P26_LINKS.protorevDigital}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ProtoRev Digital
                  </a>
                  <a
                    href={P26_LINKS.protorev3d}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ProtoRev 3D
                  </a>
                  <a
                    href={P26_LINKS.drive}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Design drive
                  </a>
                </div>
              </>
            ) : null}

            {c.id === 'moonset' ? (
              <>
                <h2 className="p26-title">{c.title}</h2>
                <p className="p26-body">{c.body}</p>
                <div className="p26-connect-links">
                  <a href={P26_LINKS.email}>Email</a>
                  <a
                    href={P26_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={P26_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <a href={P26_LINKS.x} target="_blank" rel="noopener noreferrer">
                    X
                  </a>
                  <a
                    href={P26_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                  <a
                    href={P26_LINKS.instagramCreation}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Creation
                  </a>
                  <a
                    href={P26_LINKS.linktree}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Linktree
                  </a>
                </div>
                <p className="p26-media-note mt-8 mb-3">Archive</p>
                <div className="p26-connect-links">
                  <a href="/archive2025" className="p26-archive-calm">
                    2025 Portfolio
                  </a>
                  <a href="/archive2024">2024 Portfolio</a>
                  <a href="/archive2023">2023 Portfolio</a>
                </div>
              </>
            ) : null}
          </section>
        ))}
      </main>
    </div>
  )
}
