'use client'

import { useEffect, useRef } from 'react'

const VIDEO_SRC = '/images/paper-texture.mp4'
const PLAYBACK_RATE = 1.5

export function PaperTextureBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
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
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 h-[100dvh] w-full overflow-hidden opacity-50 mix-blend-multiply"
      aria-hidden
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/paper-texture.webp"
        className="object-cover w-full h-full pointer-events-none"
        onLoadedMetadata={(e) => {
          e.currentTarget.playbackRate = PLAYBACK_RATE
        }}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
    </div>
  )
}
