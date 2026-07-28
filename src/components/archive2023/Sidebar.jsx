'use client'

import React, { useState, useEffect } from 'react'
import {
  FaGithub,
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa6'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/solid'
import './sidebar.css'

const Sidebar = ({
  isCollapsed,
  onToggleCollapse,
  onScrollToSection,
  activeSection,
  setActiveSection,
}) => {
  const [showNKR, setShowNKR] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hoveredSocial, setHoveredSocial] = useState(null)
  const [showLabels, setShowLabels] = useState(!isCollapsed)

  useEffect(() => {
    if (!setActiveSection) return
    const sections = document.querySelectorAll('section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.6 },
    )
    sections.forEach((sec) => observer.observe(sec))
    return () => sections.forEach((sec) => observer.unobserve(sec))
  }, [setActiveSection])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const homeSection = document.getElementById('home')
      if (currentScrollY > lastScrollY) {
        setShowNKR(false)
      } else {
        if (homeSection) {
          const homeTop = homeSection.getBoundingClientRect().top
          if (homeTop >= -50) {
            setShowNKR(true)
          }
        }
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    let timeout
    if (!isCollapsed) {
      timeout = setTimeout(() => setShowLabels(true), 200)
    } else {
      setShowLabels(false)
    }
    return () => clearTimeout(timeout)
  }, [isCollapsed])

  const menuItems = [
    {
      id: 'home',
      label: 'HOME',
      icon: <HomeIcon className="w-5 h-5 duration-1000" />,
    },
    {
      id: 'about',
      label: 'ABOUT',
      icon: <UserIcon className="w-5 h-5 duration-1000" />,
    },
    {
      id: 'works',
      label: 'WORKS',
      icon: <BriefcaseIcon className="w-5 h-5 duration-1000" />,
    },
    {
      id: 'contact',
      label: 'CONTACT',
      icon: <EnvelopeIcon className="w-5 h-5 duration-1000" />,
    },
  ]

  const socialLinks = [
    {
      href: 'https://github.com/Nishanth1409',
      icon: <FaGithub />,
      label: 'Github',
      hoverColor: '#FFBA5D',
      className: 'duration-1000',
    },
    {
      href: 'https://www.facebook.com/share/1CWz33sC8p/',
      icon: <FaFacebook />,
      label: 'Facebook',
      hoverColor: '#1769ff',
      className: 'duration-1000',
    },
    {
      href: 'https://x.com/Nkr1409',
      icon: <FaXTwitter />,
      label: 'Twitter',
      hoverColor: '#1DA1F2',
      className: 'duration-1000',
    },
    {
      href: 'https://www.instagram.com/_n.k.r_creation',
      icon: <FaInstagram />,
      label: 'Instagram',
      hoverColor: '#e4405f',
      className: 'duration-1000',
    },
    {
      href: 'https://www.linkedin.com/in/nishanth-k-r-107895258',
      icon: <FaLinkedinIn />,
      label: 'Linkedin',
      hoverColor: '#4097e4',
      className: 'duration-1000',
    },
  ]

  return (
    <>
      <div className="lg:hidden">
        <div
          className={`fixed z-50 font-serif transform -translate-x-1/2 top-4 left-1/2 transition-opacity duration-500 ${
            showNKR ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-4xl font-bold gradient-text-mobile">NKR.</span>
        </div>

        <div className="fixed bottom-0 left-0 z-50 flex w-full justify-around gap-2 border-t border-white/20 bg-white/30 px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-xl backdrop-blur-md sm:justify-center sm:gap-6 sm:space-x-0 rounded-t-4xl">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => onScrollToSection(item.id)}
                  className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-500 relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FFBA5D] via-[#F29993] to-[#7A26A3] text-white'
                      : 'bg-white text-black'
                  }`}
                  aria-label={item.label}
                >
                  {item.icon}
                  {!isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-[#FFBA5D] via-[#F29993] to-[#7A26A3] opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full"></span>
                  )}
                </button>
                <span className="absolute px-2 py-1 text-xs text-white -translate-x-1/2 bg-black rounded opacity-0 left-1/2 -top-8 group-hover:opacity-100 whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div
        className={`hidden lg:flex bg-gradient-to-b from-[#FFBA5D] via-[#F29993] to-[#7A26A3] duration-700 flex-col items-center py-8 fixed left-0 top-0 h-full z-30 ${
          isCollapsed ? 'w-16 px-4' : 'w-64 px-8'
        }`}
      >
        <button
          onClick={onToggleCollapse}
          className="absolute p-2 text-white bg-black rounded-full shadow-lg -right-4 top-2 hover:bg-gray-800 "
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-4 h-4" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4" />
          )}
        </button>

        <div className={`mb-24 font-serif ${isCollapsed ? 'mb-16' : ''}`}>
          <span
            className={`gradient-text-desktop duration-1000 font-bold ${
              isCollapsed ? 'text-xl' : 'text-3xl'
            }`}
          >
            NKR.
          </span>
        </div>

        <nav className="flex flex-col items-start flex-grow space-y-6">
          {menuItems.map((item) => (
            <div key={item.id} className="relative group">
              <span
                onClick={() => onScrollToSection(item.id)}
                className={`flex items-center transition-all duration-500 transform hover:scale-110 cursor-pointer ${
                  isCollapsed
                    ? 'justify-center text-sm p-2'
                    : 'justify-start space-x-3 text-xl'
                } ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-[#ffc982] via-[#eca6a1] to-[#b97fd6] text-black rounded-full px-3 py-2'
                    : 'text-white duration-1000'
                }`}
              >
                {item.icon}
                {!isCollapsed && showLabels && <span>{item.label}</span>}
              </span>
              {isCollapsed && (
                <span className="absolute px-2 py-1 ml-2 text-xs text-white transition-opacity duration-1000 bg-black rounded opacity-0 left-full group-hover:opacity-100 whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>

        <div
          className={`flex mb-6 ${
            isCollapsed
              ? 'flex-col space-y-4'
              : 'flex-col items-center space-y-4'
          }`}
        >
          {socialLinks.map((s, idx) => (
            <a
              key={idx}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex items-center justify-center w-8 h-8 bg-white rounded-full"
              onMouseEnter={() => setHoveredSocial(idx)}
              onMouseLeave={() => setHoveredSocial(null)}
              style={{
                color: hoveredSocial === idx ? s.hoverColor : 'black',
                transition: 'color 0.3s',
              }}
            >
              {React.cloneElement(s.icon, { className: 'w-5 h-5' })}
            </a>
          ))}
        </div>

        {!isCollapsed && (
          <div className="text-center decoration-1000">
            <span className="text-sm text-white duration-1000">
              Copyright ©2025 NKR. All rights reserved.
            </span>
          </div>
        )}
      </div>
    </>
  )
}

export default Sidebar
