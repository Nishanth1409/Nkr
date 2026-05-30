'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  target?: string
  rel?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const animationDuration = 300

const Button = ({
  children,
  href,
  onClick,
  target,
  rel,
  className = '',
  size = 'md',
}: ButtonProps) => {
  const baseClasses =
    'btn-interactive relative z-30 flex items-center rounded-lg border border-solid border-black bg-white text-black shadow-[3px_3px_0_0_#000]'

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base sm:text-lg md:text-xl',
    lg: 'px-6 py-3 text-xl md:text-2xl',
  }

  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${className}`

  const [pressed, setPressed] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearPressTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const resetPressed = () => {
    clearPressTimeout()
    setPressed(false)
  }

  useEffect(() => {
    resetPressed()

    const handlePageShow = () => resetPressed()

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') resetPressed()
    }

    window.addEventListener('pageshow', handlePageShow)
    window.addEventListener('pagehide', handlePageShow)
    window.addEventListener('focus', handlePageShow)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('pageshow', handlePageShow)
      window.removeEventListener('pagehide', handlePageShow)
      window.removeEventListener('focus', handlePageShow)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearPressTimeout()
    }
  }, [])

  const runPressAnimation = (action?: () => void) => {
    setPressed(true)
    clearPressTimeout()
    timeoutRef.current = setTimeout(() => {
      setPressed(false)
      timeoutRef.current = null
      action?.()
    }, animationDuration)
  }

  const pressedClassName = `${buttonClasses} ${pressed ? 'is-pressed' : ''}`

  if (href) {
    const opensInNewTab = target === '_blank' || href.startsWith('http')

    if (
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      opensInNewTab
    ) {
      return (
        <a
          href={href}
          target={target ?? (href.startsWith('http') ? '_blank' : undefined)}
          rel={rel ?? (opensInNewTab ? 'noopener noreferrer' : undefined)}
          className={pressedClassName}
          onClick={() => runPressAnimation()}
        >
          {children}
        </a>
      )
    }

    return (
      <Link
        href={href}
        scroll
        className={pressedClassName}
        onClick={() => runPressAnimation()}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type="button"
      className={pressedClassName}
      onClick={() => runPressAnimation(onClick)}
    >
      {children}
    </button>
  )
}

export default Button
