'use client'

import React, { useState, useEffect, useRef } from 'react'
import Sidebar from './Sidebar'
import HomeSection from './HomeSection'
import AboutSection from './AboutSection'
import WorksSection from './WorksSection'
import ContactSection from './ContactSection'

export default function Archive2023App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isDesktop, setIsDesktop] = useState(false)
  const sidebarRef = useRef(null)

  const sidebarWidthRem = isSidebarCollapsed ? '4rem' : '16rem'

  const mainStyle = isDesktop
    ? {
        marginLeft: sidebarWidthRem,
        width: `calc(100% - ${sidebarWidthRem})`,
      }
    : {
        marginLeft: 0,
        width: '100%',
      }

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsSidebarCollapsed(true)
    }
  }

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'works', 'contact']
      const y = window.scrollY + 100

      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const { offsetTop, offsetHeight } = el
        if (y >= offsetTop && y < offsetTop + offsetHeight) {
          setActiveSection(id)
          setIsSidebarCollapsed(true)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarCollapsed(true)
      }
    }
    if (!isSidebarCollapsed) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSidebarCollapsed])

  return (
    <div className="flex min-h-screen max-w-[100%] overflow-x-clip bg-white font-sans text-black">
      <div ref={sidebarRef}>
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onScrollToSection={scrollToSection}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>

      <div
        className="min-w-0 flex-1 bg-white transition-all duration-300"
        style={mainStyle}
        onClick={() => setIsSidebarCollapsed(true)}
      >
        <div className="space-y-8 px-[clamp(0.75rem,2vw,1.5rem)] py-[clamp(1rem,2vh,1.5rem)]">
          <section id="home" className="min-h-screen min-w-0">
            <HomeSection />
          </section>
          <section id="about" className="min-h-screen min-w-0">
            <AboutSection />
          </section>
          <section id="works" className="min-h-screen min-w-0 overflow-x-clip">
            <WorksSection />
          </section>
          <section id="contact" className="min-h-screen min-w-0">
            <ContactSection />
          </section>
        </div>
      </div>
    </div>
  )
}
