'use client'

import { useEffect, useRef, useState } from 'react'

import type { P26MediaSlot } from './data'

type MediaFrameProps = {
  slot: P26MediaSlot
  className?: string
}

/**
 * Lightweight placeholder frame.
 * When you drop real reels in /public/2026/, set slot.type = 'video'
 * and slot.videoSrc = '/2026/your-reel.mp4'.
 */
export default function MediaFrame({ slot, className = '' }: MediaFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (slot.type !== 'video' || !videoRef.current) return
    const v = videoRef.current
    const onReady = () => setReady(true)
    v.addEventListener('loadeddata', onReady)
    void v.play().catch(() => {})
    return () => v.removeEventListener('loadeddata', onReady)
  }, [slot.type, slot.videoSrc])

  if (slot.type === 'video' && slot.videoSrc) {
    return (
      <div className={`p26-media-frame ${className}`}>
        <video
          ref={videoRef}
          src={slot.videoSrc}
          muted
          loop
          playsInline
          autoPlay
          className="h-auto w-full rounded-sm object-cover"
          style={{ opacity: ready ? 1 : 0.4 }}
        />
        <p className="p26-media-note">{slot.label}</p>
      </div>
    )
  }

  return (
    <div className={`p26-media-frame ${className}`}>
      <div
        className="relative aspect-video w-full overflow-hidden rounded-sm border border-[rgba(243,238,230,0.14)]"
        style={{
          background:
            'linear-gradient(135deg, #1a1612 0%, #2a241c 45%, #1e2a1c 100%)',
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
          <div>
            <p className="text-[0.65rem] tracking-[0.16em] text-[rgba(196,165,116,0.95)] uppercase">
              Media slot · {slot.id}
            </p>
            <p className="mt-2 font-[family-name:var(--font-p26-serif)] text-2xl text-[#f3eee6] sm:text-3xl">
              {slot.label}
            </p>
          </div>
          <div>
            <p className="text-sm text-[rgba(243,238,230,0.7)]">{slot.posterHint}</p>
            <p className="mt-1 text-[0.65rem] tracking-[0.12em] text-[rgba(196,165,116,0.85)] uppercase">
              Placeholder still · replace with MP4 / WebM
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
