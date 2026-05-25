import { useCallback, useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

// *************************
// Use intersection observer
// *************************

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // *********************
  // Intersection callback
  // *********************

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      const isCurrentlyIntersecting = entry.isIntersecting

      setIsIntersecting(isCurrentlyIntersecting)

      if (isCurrentlyIntersecting && !hasLoaded) {
        setHasLoaded(true)

        // If triggerOnce is true, disconnect observer after first intersection
        if (triggerOnce && observerRef.current) {
          observerRef.current.disconnect()
        }
      }
    },
    [hasLoaded, triggerOnce],
  )

  // *********************
  // Intersection observer
  // *********************

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Create observer with memoized callback
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    })

    observerRef.current.observe(element)

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [threshold, rootMargin, handleIntersection])

  // *****************************
  // Additional cleanup on unmount
  // *****************************

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // *************
  // Return values
  // *************

  return {
    elementRef,
    isIntersecting,
    hasLoaded,
  }
}
