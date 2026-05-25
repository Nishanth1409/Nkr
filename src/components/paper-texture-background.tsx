'use client'

import { useEffect, useRef, useState } from 'react'

const VIDEO_SRC = '/images/paper-texture.mp4'
const FALLBACK_POSTER = '/images/paper-texture.webp'
const PLAYBACK_RATE = 1.5

export function PaperTextureBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    if (useFallback) return

    const video = videoRef.current
    if (!video) return

    const play = () => {
      video.playbackRate = PLAYBACK_RATE
      void video.play().catch(() => {})
    }

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) play()
    }

    video.addEventListener('loadeddata', play)
    video.addEventListener('canplay', play)
    window.addEventListener('pageshow', handlePageShow)
    play()

    return () => {
      video.removeEventListener('loadeddata', play)
      video.removeEventListener('canplay', play)
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [useFallback])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 h-[100dvh] w-full overflow-hidden opacity-50 mix-blend-multiply"
      aria-hidden
    >
      {useFallback ? (
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${FALLBACK_POSTER})` }}
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={FALLBACK_POSTER}
          className="pointer-events-none h-full w-full object-cover"
          onLoadedMetadata={(e) => {
            e.currentTarget.playbackRate = PLAYBACK_RATE
          }}
          onError={() => setUseFallback(true)}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
