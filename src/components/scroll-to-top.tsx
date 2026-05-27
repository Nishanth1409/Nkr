'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { IoChevronUp } from 'react-icons/io5'

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const scrollAnimRef = useRef<number | null>(null)

  useEffect(() => {
    const intro = document.getElementById('home-intro')

    const pastIntro = () => {
      if (!intro) {
        setVisible(window.scrollY > window.innerHeight * 0.75)
        return
      }
      const bottom = intro.offsetTop + intro.offsetHeight
      setVisible(window.scrollY > bottom - window.innerHeight * 0.15)
    }

    pastIntro()
    window.addEventListener('scroll', pastIntro, { passive: true })
    window.addEventListener('resize', pastIntro, { passive: true })
    return () => {
      window.removeEventListener('scroll', pastIntro)
      window.removeEventListener('resize', pastIntro)
    }
  }, [])

  const cancelScrollAnim = useCallback(() => {
    if (scrollAnimRef.current !== null) {
      cancelAnimationFrame(scrollAnimRef.current)
      scrollAnimRef.current = null
    }
  }, [])

  useEffect(() => {
    const stop = () => cancelScrollAnim()
    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })
    window.addEventListener('keydown', stop, { passive: true })
    return () => {
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('keydown', stop)
      cancelScrollAnim()
    }
  }, [cancelScrollAnim])

  const scrollToTop = useCallback(() => {
    cancelScrollAnim()

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reducedMotion) {
      window.scrollTo(0, 0)
      return
    }

    const startY = window.scrollY
    if (startY <= 0) return

    const duration = Math.min(1400, Math.max(650, startY * 0.55))
    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration)
      const eased = easeInOutCubic(progress)
      window.scrollTo(0, startY * (1 - eased))

      if (progress < 1) {
        scrollAnimRef.current = requestAnimationFrame(tick)
      } else {
        scrollAnimRef.current = null
        window.scrollTo(0, 0)
      }
    }

    scrollAnimRef.current = requestAnimationFrame(tick)
  }, [cancelScrollAnim])

  return (
    <button
      type="button"
      className={`scroll-to-top no-grunge ${visible ? 'is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <IoChevronUp className="scroll-to-top-icon no-grunge" aria-hidden />
    </button>
  )
}
