'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
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
import { useLenisScroll } from './useLenisScroll'
import './portfolio2026.css'

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false })

type Grade = {
  top: string
  mid: string
  bottom: string
  warmth: number
  night: number
}

function splitChars(el: HTMLElement | null) {
  if (!el || el.dataset.split === '1') return []
  const text = el.textContent ?? ''
  el.textContent = ''
  el.dataset.split = '1'
  return text.split('').map((ch) => {
    const span = document.createElement('span')
    span.className = 'p26-char'
    span.textContent = ch === ' ' ? '\u00a0' : ch
    el.appendChild(span)
    return span
  })
}

export default function Portfolio2026() {
  const trackRef = useRef<HTMLDivElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const progressLabelRef = useRef<HTMLSpanElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const titleRefs = useRef<(HTMLElement | null)[]>([])
  const progressRef = useRef(0)
  const velocityRef = useRef(0)
  const chapterIndexRef = useRef(0)
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useLenisScroll(mounted)

  const onGrade = (g: Grade) => {
    const root = rootRef.current
    if (!root) return
    root.style.setProperty('--p26-sky-top', g.top)
    root.style.setProperty('--p26-sky-mid', g.mid)
    root.style.setProperty('--p26-sky-bottom', g.bottom)
    root.style.setProperty('--p26-warmth', String(g.warmth))
    root.style.setProperty('--p26-night', String(g.night))
    root.style.setProperty(
      '--p26-aber',
      String(Math.min(0.012, Math.abs(velocityRef.current) * 0.8)),
    )
  }

  useEffect(() => {
    if (!mounted) return
    gsap.registerPlugin(ScrollTrigger, CustomEase)
    CustomEase.create('cinematicSilk', '0.45,0.05,0.55,0.95')
    CustomEase.create('cinematicFlow', '0.33,0,0.2,1')

    const track = trackRef.current
    if (!track) return

    const setWidth = progressFillRef.current
      ? gsap.quickSetter(progressFillRef.current, 'width', '%')
      : null
    const setLabel = progressLabelRef.current
      ? gsap.quickSetter(progressLabelRef.current, 'textContent')
      : null

    // Split titles once
    titleRefs.current.forEach((el) => splitChars(el))

    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.4,
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
        setWidth?.(Math.round(p * 100))
        setLabel?.(String(Math.round(p * 100)).padStart(2, '0'))
      },
    })

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('resize', refresh)
    const t = window.setTimeout(refresh, 400)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('resize', refresh)
      st.kill()
    }
  }, [mounted])

  // Chapter title char stagger — CodePen / Codrops SplitText pattern
  useEffect(() => {
    if (!mounted) return
    titleRefs.current.forEach((el, i) => {
      if (!el) return
      const chars = el.querySelectorAll('.p26-char')
      if (!chars.length) return
      if (i === active) {
        gsap.fromTo(
          chars,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.018,
            ease: 'cinematicFlow',
            overwrite: true,
          },
        )
      } else {
        gsap.to(chars, {
          y: -18,
          opacity: 0,
          duration: 0.28,
          stagger: 0.01,
          ease: 'power2.in',
          overwrite: true,
        })
      }
    })
  }, [active, mounted])

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
          velocityRef={velocityRef}
          chapterIndexRef={chapterIndexRef}
          onGrade={onGrade}
        />
      ) : null}

      <div className="p26-grade" aria-hidden />
      <div className="p26-grade-night" aria-hidden />
      <div className="p26-chroma" aria-hidden />
      <div className="p26-grain" aria-hidden />
      <div className="p26-letterbox p26-letterbox--top" aria-hidden />
      <div className="p26-letterbox p26-letterbox--bottom" aria-hidden />

      <div ref={trackRef} className="p26-scroll-track" />

      <header className="p26-hud">
        <div className="p26-topbar">
          <div className="p26-mark">{P26_MARK}</div>
          <nav className="p26-nav" aria-label="Scenes">
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
                <h1
                  className="p26-title"
                  ref={(el) => {
                    titleRefs.current[i] = el
                  }}
                >
                  {c.title}
                </h1>
                <p className="p26-body">{P26_LINE}</p>
                <p className="p26-body mt-3">{c.body}</p>
              </>
            ) : null}

            {c.id === 'work' ? (
              <>
                <h2
                  className="p26-title"
                  ref={(el) => {
                    titleRefs.current[i] = el
                  }}
                >
                  {c.title}
                </h2>
                <p className="p26-body">{c.body}</p>
                <div className="p26-glass">
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
                </div>
              </>
            ) : null}

            {c.id === 'craft' ? (
              <>
                <h2
                  className="p26-title"
                  ref={(el) => {
                    titleRefs.current[i] = el
                  }}
                >
                  {c.title}
                </h2>
                <p className="p26-body">{c.body}</p>
                <div className="p26-glass">
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
                    >
                      Drive
                    </a>
                    {' · '}
                    <a
                      href={P26_LINKS.instagramCreation}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @_n.k.r_creation
                    </a>
                  </p>
                </div>
              </>
            ) : null}

            {c.id === 'lens' ? (
              <>
                <h2
                  className="p26-title"
                  ref={(el) => {
                    titleRefs.current[i] = el
                  }}
                >
                  {c.title}
                </h2>
                <p className="p26-body">{c.body}</p>
                <div className="p26-glass">
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
                </div>
              </>
            ) : null}

            {c.id === 'connect' ? (
              <>
                <h2
                  className="p26-title"
                  ref={(el) => {
                    titleRefs.current[i] = el
                  }}
                >
                  {c.title}
                </h2>
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
                <p className="p26-note mt-6 mb-2">Archive</p>
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
