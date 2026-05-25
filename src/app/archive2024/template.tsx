'use client'

import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Reset scroll when entering the 2024 archive (client nav can preserve home scroll). */
export default function ArchiveTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo(0, 0)
  }, [pathname])

  return children
}
