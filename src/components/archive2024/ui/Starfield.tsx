'use client'

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

// Based on react-starfield by designly1
// https://github.com/designly1/react-starfield
// Modified to support light-speed travel effects and optimized for performance

interface Props {
  speedFactor?: number
  backgroundColor?: string
  starColor?: [number, number, number]
  starCount?: number
  className?: string
}

interface Star {
  x: number
  y: number
  z: number
}

export interface StarfieldRef {
  triggerLightSpeed: () => void
}

const Starfield = forwardRef<StarfieldRef, Props>((props, ref) => {
  const {
    speedFactor = 0.05,
    backgroundColor = 'black',
    starColor = [255, 255, 255],
    starCount = 5000,
    className = '',
  } = props

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const starsRef = useRef<Star[]>([])
  const speedRef = useRef(speedFactor)
  const targetSpeedRef = useRef(speedFactor)
  const dimensionsRef = useRef({ w: 0, h: 0 })
  const colorStringRef = useRef('')

  // ******************
  // Color string calculation
  // ******************

  useEffect(() => {
    colorStringRef.current = `${starColor[0]},${starColor[1]},${starColor[2]}`
  }, [starColor])

  // *************
  // Star creation
  // *************

  const makeStars = useCallback((count: number): Star[] => {
    const stars = new Array(count)
    for (let i = 0; i < count; i++) {
      stars[i] = {
        x: Math.random() * 1600 - 800,
        y: Math.random() * 900 - 450,
        z: Math.random() * 1000,
      }
    }
    return stars
  }, [])

  // *************
  // Pixel rendering
  // *************

  const putPixel = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      brightness: number,
    ) => {
      ctx.fillStyle = `rgba(${colorStringRef.current},${brightness})`
      // Use Math.floor once and cache size calculation
      const size = Math.max(1, brightness * 2)
      const floorX = Math.floor(x)
      const floorY = Math.floor(y)
      ctx.fillRect(floorX, floorY, size, size)
    },
    [],
  )

  // *************
  // Star movement
  // *************

  const moveStars = useCallback((distance: number) => {
    const stars = starsRef.current
    const len = stars.length
    for (let i = 0; i < len; i++) {
      const star = stars[i]
      star.z -= distance
      if (star.z <= 1) {
        star.z += 1000
      }
    }
  }, [])

  // *************
  // Light speed effect
  // *************

  useImperativeHandle(
    ref,
    () => ({
      triggerLightSpeed: () => {
        // Dramatic speed increase then decrease
        targetSpeedRef.current = speedFactor * 50 // 50x speed

        setTimeout(() => {
          targetSpeedRef.current = speedFactor // Back to normal speed
        }, 1000) // Speed burst for 1 second
      },
    }),
    [speedFactor],
  )

  // *************
  // Canvas rendering
  // *************

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true, // Enable low-latency canvas context
    })
    if (!ctx) {
      console.error('Could not get 2d context from canvas element')
      return
    }

    // Initialize dimensions
    dimensionsRef.current.w = window.innerWidth
    dimensionsRef.current.h = window.innerHeight

    const setCanvasExtents = () => {
      const { w, h } = dimensionsRef.current
      canvas.width = w
      canvas.height = h
    }

    setCanvasExtents()
    starsRef.current = makeStars(starCount)

    let prevTime: number
    let isAnimating = true

    const tick = (time: number) => {
      if (!isAnimating) return

      const elapsed = time - prevTime
      prevTime = time

      // Smooth speed transitions for light-speed effect (optimized interpolation)
      const speedDiff = targetSpeedRef.current - speedRef.current
      if (Math.abs(speedDiff) > 0.001) {
        speedRef.current += speedDiff * 0.1
      }

      moveStars(elapsed * speedRef.current)

      // Clear canvas
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, dimensionsRef.current.w, dimensionsRef.current.h)

      const centerX = dimensionsRef.current.w * 0.5
      const centerY = dimensionsRef.current.h * 0.5
      const { w, h } = dimensionsRef.current

      const stars = starsRef.current
      const starCount = stars.length

      // Render stars with optimized loop
      for (let i = 0; i < starCount; i++) {
        const star = stars[i]
        const zInv = 1 / (star.z * 0.001)

        const x = centerX + star.x * zInv
        const y = centerY + star.y * zInv

        // Early bounds check
        if (x < 0 || x >= w || y < 0 || y >= h) {
          continue
        }

        const d = star.z * 0.001
        const brightness = 1 - d * d

        // Only render visible stars
        if (brightness > 0.01) {
          putPixel(ctx, x, y, brightness)
        }
      }

      animationRef.current = requestAnimationFrame(tick)
    }

    const init = (time: number) => {
      prevTime = time
      animationRef.current = requestAnimationFrame(tick)
    }

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        dimensionsRef.current.w = window.innerWidth
        dimensionsRef.current.h = window.innerHeight
        setCanvasExtents()
      }, 100)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    animationRef.current = requestAnimationFrame(init)

    return () => {
      isAnimating = false
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [backgroundColor, speedFactor, starCount, makeStars, moveStars, putPixel])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 ${className}`}
      style={{
        padding: 0,
        margin: 0,
        zIndex: 10,
        mixBlendMode: 'screen',
        willChange: 'transform',
      }}
    />
  )
})

Starfield.displayName = 'Starfield'

export default Starfield
