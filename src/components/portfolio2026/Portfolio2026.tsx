'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import {
  P26_CHAPTERS,
  P26_HANDLE,
  P26_LINKS,
  P26_MEDIA_SLOTS,
  P26_NAME,
  P26_PROJECTS,
  P26_STACK,
  P26_TAGLINE,
  P26_YEAR,
} from './data'
import MediaFrame from './MediaFrame'
import './portfolio2026.css'

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false })

export default function Portfolio2026() {
  const trackRef = useRef<HTMLDivElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const progressLabelRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef(0)
  const chapterIndexRef = useRef(0)
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    gsap.registerPlugin(ScrollTrigger)

    const track = trackRef.current
    if (!track) return

    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.65,
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
    const t = window.setTimeout(refresh, 200)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('resize', refresh)
      st.kill()
    }
  }, [mounted])

  return (
    <div className="p26-root">
      {mounted ? (
        <Scene3D progressRef={progressRef} chapterIndexRef={chapterIndexRef} />
      ) : null}
      <div className="p26-grain" aria-hidden />

      <div ref={trackRef} className="p26-scroll-track" />

      <header className="p26-hud">
        <div className="p26-topbar">
          <div className="p26-mark">
            {P26_HANDLE} <span className="p26-year">· {P26_YEAR}</span>
          </div>
          <nav className="p26-nav" aria-label="Chapters">
            {P26_CHAPTERS.map((c, i) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className={i === active ? 'is-active' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  const track = trackRef.current
                  if (!track) return
                  const rect = track.getBoundingClientRect()
                  const top =
                    window.scrollY +
                    rect.top +
                    (i / P26_CHAPTERS.length) * track.offsetHeight
                  window.scrollTo({ top, behavior: 'smooth' })
                }}
              >
                {c.title}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/archive2025"
              className="text-[0.65rem] tracking-[0.14em] text-[rgba(243,238,230,0.38)] uppercase no-underline transition-colors hover:text-[rgba(243,238,230,0.62)]"
            >
              2025
            </Link>
            <Link
              href="/archive2024"
              className="text-[0.65rem] tracking-[0.14em] text-[rgba(243,238,230,0.65)] uppercase no-underline transition-colors hover:text-[#f3eee6]"
            >
              2024
            </Link>
            <Link
              href="/archive2023"
              className="text-[0.65rem] tracking-[0.14em] text-[rgba(243,238,230,0.65)] uppercase no-underline transition-colors hover:text-[#f3eee6]"
            >
              2023
            </Link>
          </div>
        </div>

        <div className="flex items-end justify-between gap-4">
          <p className="p26-hint">Scroll · Launch → Success</p>
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

            {c.id === 'launch' ? (
              <>
                <p className="p26-hero-name">{P26_NAME}</p>
                <h1 className="p26-title">{c.title}</h1>
                <p className="p26-body">{P26_TAGLINE}</p>
                <p className="p26-body mt-4">{c.body}</p>
                <MediaFrame slot={P26_MEDIA_SLOTS[0]} className="mt-6" />
              </>
            ) : null}

            {c.id === 'roots' ? (
              <>
                <h2 className="p26-title">{c.title}</h2>
                <p className="p26-body">{c.body}</p>
                <p className="p26-body mt-4">
                  Based in Karnataka, India — studying Computer Science &amp;
                  Design at PESITM, growing a practice across brand, UI, and
                  frontend.
                </p>
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
                <MediaFrame slot={P26_MEDIA_SLOTS[1]} className="mt-6" />
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
                      <span>{p.role}</span>
                    </a>
                  ))}
                </div>
                <MediaFrame slot={P26_MEDIA_SLOTS[2]} className="mt-6" />
              </>
            ) : null}

            {c.id === 'success' ? (
              <>
                <h2 className="p26-title">{c.title}</h2>
                <p className="p26-body">{c.body}</p>
                <p className="p26-body mt-4">
                  ProtoRev Digital &amp; ProtoRev 3D — frontend, brand systems,
                  social, and templates shipped remotely.
                </p>
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
                <MediaFrame slot={P26_MEDIA_SLOTS[3]} className="mt-6" />
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
