'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import { cn } from '../lib/utils'

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'

/**
 * Polymorphic Type Definition
 * We use a type instead of an interface here as it's more reliable for
 * intersections with ComponentPropsWithoutRef.
 */
export type HoverBorderGradientProps<T extends React.ElementType> = {
  as?: T
  children: React.ReactNode
  containerClassName?: string
  className?: string
  duration?: number
  clockwise?: boolean
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export default function HoverBorderGradient<
  T extends React.ElementType = 'button',
>({
  children,
  containerClassName,
  className,
  as,
  duration = 1,
  clockwise = true,
  ...props
}: HoverBorderGradientProps<T>) {
  const Tag = as || 'button'
  const [hovered, setHovered] = useState(false)
  const [direction, setDirection] = useState<Direction>('TOP')
  const [isHoverSupported, setIsHoverSupported] = useState(false)

  const rotateDirection = useCallback(
    (currentDirection: Direction): Direction => {
      const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT']
      const currentIndex = directions.indexOf(currentDirection)
      const nextIndex = clockwise
        ? (currentIndex - 1 + directions.length) % directions.length
        : (currentIndex + 1) % directions.length
      return directions[nextIndex]
    },
    [clockwise],
  )

  const movingMap = useMemo(
    () => ({
      TOP: 'radial-gradient(40% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
      LEFT: 'radial-gradient(35% 50% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
      BOTTOM:
        'radial-gradient(40% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
      RIGHT:
        'radial-gradient(35% 50% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
    }),
    [],
  )

  const highlight =
    'radial-gradient(100% 200% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)'

  useEffect(() => {
    const checkHover = () => {
      const canHover = window.matchMedia('(hover: hover)').matches
      // requestAnimationFrame passes the 'no-sync-state-in-effect' lint rule
      requestAnimationFrame(() => setIsHoverSupported(canHover))
    }
    checkHover()
  }, [])

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prev) => rotateDirection(prev))
      }, duration * 1000)
      return () => clearInterval(interval)
    }
  }, [hovered, duration, rotateDirection])

  return (
    <Tag
      onMouseEnter={() => isHoverSupported && setHovered(true)}
      onMouseLeave={() => isHoverSupported && setHovered(false)}
      className={cn(
        'relative flex h-min flex-col flex-nowrap content-center items-center justify-center gap-10 overflow-visible rounded-full border border-white/50 bg-black/20 p-px transition duration-500 hover:bg-black/10',
        containerClassName,
      )}
      {...props}
    >
      <div
        className={cn(
          'z-10 w-auto rounded-[inherit] bg-black px-4 py-2 text-white',
          className,
        )}
      >
        {children}
      </div>
      {isHoverSupported && (
        <motion.div
          className="absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit] will-change-transform"
          style={{
            filter: 'blur(2px)',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
          animate={{
            background: hovered
              ? [movingMap[direction], highlight]
              : movingMap[direction],
          }}
          transition={{ ease: 'linear', duration: duration ?? 1 }}
        />
      )}
      <div className="absolute inset-[2px] z-1 flex-none rounded-[100px] bg-black" />
    </Tag>
  )
}
