'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createNoise3D } from 'simplex-noise'

import { cn } from '../lib/utils'

interface WavyBackgroundProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  colors?: string[]
  waveWidth?: number
  backgroundFill?: string
  blur?: number
  speed?: 'slow' | 'fast'
  waveOpacity?: number
}

const SPEED_MAP = {
  slow: 0.0005,
  fast: 0.002,
  default: 0.001,
} as const

const DEFAULT_WAVE_COLORS: string[] = [
  '#50C878',
  '#00FFFF',
  '#4f46e5',
  '#9333ea',
  '#ec4899',
]

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors = DEFAULT_WAVE_COLORS,
  waveWidth = 50,
  blur = 20,
  speed = 'fast',
  waveOpacity = 1,
  ...props
}: WavyBackgroundProps) => {
  const noise = useMemo(() => createNoise3D(), [])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number | undefined>(undefined)
  const dimensionsRef = useRef({ width: 0, height: 0 })
  const [isSafari, setIsSafari] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const animationSpeed = useMemo(() => {
    return SPEED_MAP[speed] || SPEED_MAP.default
  }, [speed])

  const waveColors = useMemo(() => {
    return colors || DEFAULT_WAVE_COLORS
  }, [colors])

  useEffect(() => {
    // 1. Move state updates to a callback inside requestAnimationFrame to pass strict linting
    const initClient = () => {
      const userAgent =
        typeof navigator !== 'undefined' ? navigator.userAgent : ''
      const safariCheck =
        userAgent.includes('Safari') && !userAgent.includes('Chrome')

      requestAnimationFrame(() => {
        setIsMounted(true)
        setIsSafari(safariCheck)
      })
    }

    const updateDimensions = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      if (
        dimensionsRef.current.width !== width ||
        dimensionsRef.current.height !== height
      ) {
        dimensionsRef.current = { width, height }
      }
    }

    initClient()
    updateDimensions()

    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(updateDimensions, 100)
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  const drawWave = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      n: number,
      nt: number,
      w: number,
      h: number,
    ) => {
      ctx.globalAlpha = waveOpacity

      for (let i = 0; i < n; i++) {
        ctx.beginPath()
        ctx.lineWidth = waveWidth
        ctx.strokeStyle = waveColors[i % waveColors.length]

        const step = 5
        let firstPoint = true

        for (let x = 0; x < w; x += step) {
          const y = noise(x / 800, 0.8 * i, nt) * 100
          const yPos = y + h

          if (firstPoint) {
            ctx.moveTo(x, yPos)
            firstPoint = false
          } else {
            ctx.lineTo(x, yPos)
          }
        }
        ctx.stroke()
      }
    },
    [noise, waveOpacity, waveWidth, waveColors],
  )

  useEffect(() => {
    if (!isMounted || dimensionsRef.current.width === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
    })
    if (!ctx) return

    let w: number,
      h: number,
      nt = 0
    let isAnimating = true

    const render = () => {
      if (!isAnimating) return

      const { width, height } = dimensionsRef.current

      if (w !== width || h !== height) {
        w = canvas.width = width
        h = canvas.height = height
        ctx.filter = `blur(${blur}px)`
      }

      ctx.clearRect(0, 0, w, h)
      nt += animationSpeed
      drawWave(ctx, 5, nt, w, h)
      animationIdRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      isAnimating = false
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [isMounted, blur, animationSpeed, drawWave])

  return (
    <div
      className={cn(
        'flex h-screen flex-col items-center justify-center',
        containerClassName,
      )}
    >
      {/* Conditionally rendering the canvas only when mounted prevents hydration mismatch */}
      {isMounted && (
        <canvas
          className="absolute inset-0 z-0"
          ref={canvasRef}
          style={{
            ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
            willChange: 'transform',
          }}
        />
      )}
      <div className={cn('relative z-10', className)} {...props}>
        {children}
      </div>
    </div>
  )
}
