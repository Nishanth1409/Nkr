'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import {
  P26_CHAPTERS,
  P26_DESIGNS,
  P26_LINE,
  P26_LINKS,
  P26_MARK,
  P26_NAME,
  P26_PHOTOS,
  P26_PROJECTS,
  P26_STACK,
} from './data'
import './portfolio2026.css'

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false })

type SkyState = {
  top: string
  mid: string
  bottom: string
  glow: string
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
      scrub: 1.1,
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
          progressLabelRef.current.textContent = `${String(Math.round(p * 100)).padStart(2, '0')}`
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
      4
    window.scrollTo({ top, behavior: 'smooth' })
  }

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
          <div className="p26-mark">{P26_MARK}</div>

          <nav className="p26-nav" aria-label="Sections">
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
                {c.nav}
              </a>
            ))}
          </nav>

          <div className="p26-year-links">
            <Link href="/archive2025" className="is-calm">
              2025
            </Link>
            <Link href="/archive2024">2024</Link>
            <Link href="/archive2023">2023</Link>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="p26-progress" aria-hidden>
            <div className="p26-progress-bar">
              <div ref={progressFillRef} className="p26-progress-fill" />
            </div>
            <span ref={progressLabelRef} className="p26-progress-label">
              00
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

            {c.id === 'intro' ? (
              <>
                <p className="p26-hero-name">{P26_NAME}</p>
                <h1 className="p26-title">{c.title}</h1>
                <p className="p26-body">{P26_LINE}</p>
                <p className="p26-body mt-4">{c.body}</p>
              </>
            ) : null}

            {c.id === 'work' ? (
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

            {c.id === 'craft' ? (
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
                <div className="p26-rail p26-rail--wide" aria-label="Designs">
                  {P26_DESIGNS.map((d) => (
                    <figure key={d.src}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={d.src} alt={d.title} loading="lazy" />
                      <figcaption>{d.title}</figcaption>
                    </figure>
                  ))}
                </div>
                <p className="p26-note">
                  <a
                    href={P26_LINKS.drive}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[inherit] underline-offset-2 hover:underline"
                  >
                    Google Drive
                  </a>
                  {' · '}
                  <a
                    href={P26_LINKS.instagramCreation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[inherit] underline-offset-2 hover:underline"
                  >
                    @_n.k.r_creation
                  </a>
                </p>
              </>
            ) : null}

            {c.id === 'lens' ? (
              <>
                <h2 className="p26-title">{c.title}</h2>
                <p className="p26-body">{c.body}</p>
                <div className="p26-rail" aria-label="Photography">
                  {P26_PHOTOS.map((photo) => (
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
                    Instagram
                  </a>
                  <a
                    href={P26_LINKS.instagramCreation}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Creation
                  </a>
                </div>
              </>
            ) : null}

            {c.id === 'connect' ? (
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
                    href={P26_LINKS.linktree}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Linktree
                  </a>
                  <a
                    href={P26_LINKS.protorevDigital}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ProtoRev
                  </a>
                </div>
                <p className="p26-note mt-8 mb-3">Archive</p>
                <div className="p26-connect-links">
                  <a href="/archive2025" className="p26-archive-calm">
                    2025
                  </a>
                  <a href="/archive2024">2024</a>
                  <a href="/archive2023">2023</a>
                </div>
              </>
            ) : null}
          </section>
        ))}
      </main>
    </div>
  )
}
