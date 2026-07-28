'use client'

import React, {
  memo,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { throttle } from 'lodash-es'

import { StarfieldRef } from './ui/Starfield'

interface HeaderProps {
  starfieldRef?: RefObject<StarfieldRef | null>
}

// ***************
// Navigation data
// ***************

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#myworks', label: 'Other Works' },
  { href: '#contact', label: 'Contact' },
] as const

const SECTIONS = [
  'intro',
  'about',
  'experience',
  'projects',
  'myworks',
  'contact',
] as const

// *************************
// Navigation link component
// *************************

const NavLink = memo(
  ({
    href,
    label,
    isActive,
    onClick,
  }: {
    href: string
    label: string
    isActive: boolean
    onClick: (href: string, event: React.MouseEvent) => void
  }) => (
    <a
      href={href}
      onClick={(event) => onClick(href, event)}
      className={`relative px-2 py-2 text-[clamp(0.75rem,2.2vw,1.125rem)] no-underline transition-all duration-500 ease-in-out sm:px-3 sm:py-2 md:px-4 md:py-2 ${
        isActive
          ? "bg-[url('/resources/static-squarespace.gif')] bg-cover bg-clip-text bg-center font-semibold text-transparent"
          : 'text-white transition-all duration-500 ease-in-out'
      }`}
    >
      {label}
    </a>
  ),
)

NavLink.displayName = 'NavLink'

// ***************
// Header component
// ***************

const Header = memo(({ starfieldRef }: HeaderProps) => {
  const [activeLink, setActiveLink] = useState('')

  // **************
  // Scroll handler
  // **************

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        SECTIONS.forEach((section) => {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveLink(section)
            }
          }
        })
      }, 100),
    [],
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      handleScroll.cancel() // Cancel any pending throttled calls
    }
  }, [handleScroll])

  // ************************
  // Navigation click handler
  // ************************

  const handleNavClick = useCallback(
    (href: string, event: React.MouseEvent) => {
      event.preventDefault()

      // Trigger light-speed effect when navigation is clicked
      if (starfieldRef?.current) {
        starfieldRef.current.triggerLightSpeed()
      }

      // Smooth scroll to section without updating URL
      const targetId = href.slice(1) // Remove '#' from href
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    },
    [starfieldRef],
  )

  // ****************
  // Header component
  // ****************

  return (
    <nav className="navbar fixed z-40 flex w-full max-w-[100%] flex-wrap items-center justify-center gap-x-[clamp(0.25rem,2vw,1.25rem)] gap-y-1 bg-black/10 px-[clamp(0.5rem,2vw,1.5rem)] py-2 backdrop-blur-lg transition-all duration-500 ease-in-out">
      {NAV_LINKS.map(({ href, label }) => (
        <NavLink
          key={href}
          href={href}
          label={label}
          isActive={activeLink === href.slice(1)}
          onClick={handleNavClick}
        />
      ))}
    </nav>
  )
})

Header.displayName = 'Header'

export default Header
