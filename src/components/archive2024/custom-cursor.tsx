'use client'

import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const CursorDot = styled.div`
  pointer-events: none;
  position: fixed;
  z-index: 50;
  height: 0.625rem;
  width: 0.625rem;
  border-radius: 9999px;
  border: 1px solid white;
  background-color: transparent;
  transition:
    background-color 100ms ease-out,
    transform 100ms ease-out;
  will-change: transform;
`

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isFinePointer, setIsFinePointer] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')

    // We move the update to a handler to satisfy the "callback" requirement
    const updatePointer = (matches: boolean) => {
      // requestAnimationFrame ensures this happens after the initial paint,
      // breaking the "synchronous" cascading render chain.
      requestAnimationFrame(() => {
        setIsFinePointer(matches)
      })
    }

    // Initial check
    updatePointer(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => updatePointer(e.matches)
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!isFinePointer) return

    const cursor = cursorRef.current
    if (!cursor) return

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
    }

    const interactiveElements = document.querySelectorAll<HTMLElement>(
      'a, button, img, video',
    )

    const handleMouseOver = () => {
      // Use setProperty or specific transforms to avoid overwriting the position
      cursor.style.backgroundColor = 'white'
      cursor.style.width = '1.25rem'
      cursor.style.height = '1.25rem'
      cursor.style.marginTop = '-0.3125rem' // Adjust for size change center
      cursor.style.marginLeft = '-0.3125rem'
    }

    const handleMouseOut = () => {
      cursor.style.backgroundColor = 'transparent'
      cursor.style.width = '0.625rem'
      cursor.style.height = '0.625rem'
      cursor.style.marginTop = '0px'
      cursor.style.marginLeft = '0px'
    }

    document.addEventListener('mousemove', handleMouseMove)
    interactiveElements.forEach((el) => {
      el.style.cursor = 'none'
      el.addEventListener('mouseenter', handleMouseOver)
      el.addEventListener('mouseleave', handleMouseOut)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach((el) => {
        el.style.cursor = ''
        el.removeEventListener('mouseenter', handleMouseOver)
        el.removeEventListener('mouseleave', handleMouseOut)
      })
    }
  }, [isFinePointer])

  return isFinePointer ? (
    <CursorDot ref={cursorRef} style={{ left: 0, top: 0 }} />
  ) : null
}

export default CustomCursor
