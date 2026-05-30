'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'

const SPLASH_KEY = 'nkr-splash-seen'
const SPLASH_VIDEO = '/loadingpage.mp4'
const FADE_MS = 700
const MAX_SPLASH_MS = 12000

type SplashHydration = 'hydrating' | 'seen' | 'unseen'

const splashStore = {
  listeners: new Set<() => void>(),
  subscribe(callback: () => void) {
    splashStore.listeners.add(callback)
    return () => {
      splashStore.listeners.delete(callback)
    }
  },
  getSnapshot(): SplashHydration {
    if (typeof window === 'undefined') return 'hydrating'
    return sessionStorage.getItem(SPLASH_KEY) === '1' ? 'seen' : 'unseen'
  },
  getServerSnapshot(): SplashHydration {
    return 'hydrating'
  },
  markSeen() {
    sessionStorage.setItem(SPLASH_KEY, '1')
    splashStore.listeners.forEach((listener) => listener())
  },
}

type LoadingSplashProps = {
  children: React.ReactNode
}

export function LoadingSplash({ children }: LoadingSplashProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hydration = useSyncExternalStore(
    splashStore.subscribe,
    splashStore.getSnapshot,
    splashStore.getServerSnapshot,
  )
  const [fadeOut, setFadeOut] = useState(false)
  const [fading, setFading] = useState(false)
  const dismissedRef = useRef(false)

  const showSplash = hydration === 'unseen' || fading

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return
    dismissedRef.current = true
    setFading(true)
    setFadeOut(true)
    window.setTimeout(() => {
      splashStore.markSeen()
      setFading(false)
    }, FADE_MS)
  }, [])

  useEffect(() => {
    if (!showSplash) return

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    const maxTimer = window.setTimeout(dismiss, MAX_SPLASH_MS)

    return () => {
      window.clearTimeout(maxTimer)
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [showSplash, dismiss])

  useEffect(() => {
    if (!showSplash) {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [showSplash])

  useEffect(() => {
    if (!showSplash) return

    const video = videoRef.current
    if (!video) return

    const play = () => {
      video.playbackRate = 1
      void video.play().catch(() => {})
    }

    video.addEventListener('loadeddata', play)
    video.addEventListener('canplay', play)
    play()

    return () => {
      video.removeEventListener('loadeddata', play)
      video.removeEventListener('canplay', play)
    }
  }, [showSplash])

  if (hydration === 'hydrating') {
    return (
      <div className="loading-splash-placeholder min-h-screen" aria-hidden />
    )
  }

  return (
    <>
      {children}

      {showSplash ? (
        <div
          className={`loading-splash ${fadeOut ? 'loading-splash--out' : ''}`}
        >
          <video
            ref={videoRef}
            className="loading-splash-video"
            src={SPLASH_VIDEO}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={dismiss}
          />
        </div>
      ) : null}
    </>
  )
}
