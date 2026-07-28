'use client'

import React from 'react'
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid'
import {
  FaGithub,
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa6'

const contactCards = [
  {
    id: 1,
    type: 'Phone',
    value: '+91 83101 93757',
    icon: PhoneIcon,
    link: 'tel:+918310193757',
  },
  {
    id: 2,
    type: 'Email',
    value: 'nishanthkr1409@gmail.com',
    icon: EnvelopeIcon,
    link: 'mailto:nishanthkr1409@gmail.com',
  },
]

const socialLinks = [
  {
    href: 'https://github.com/Nishanth1409',
    icon: FaGithub,
    label: 'Github',
    hoverColor: '#FFBA5D',
  },
  {
    href: 'https://www.facebook.com/share/1CWz33sC8p/',
    icon: FaFacebook,
    label: 'Facebook',
    hoverColor: '#1769ff',
  },
  {
    href: 'https://x.com/Nkr1409',
    icon: FaXTwitter,
    label: 'Twitter',
    hoverColor: '#1DA1F2',
  },
  {
    href: 'https://www.instagram.com/_n.k.r_creation',
    icon: FaInstagram,
    label: 'Instagram',
    hoverColor: '#e4405f',
  },
  {
    href: 'https://www.linkedin.com/in/nishanth-k-r-107895258',
    icon: FaLinkedinIn,
    label: 'Linkedin',
    hoverColor: '#4097e4',
  },
]

const archiveLinks = [
  { name: 'Current Portfolio', href: '/' },
  { name: '2024 Portfolio', href: '/archive2024' },
]

function ArchiveLinks() {
  return (
    <div className="flex flex-col items-center gap-4 mt-10 mb-4">
      <h3 className="text-2xl md:text-3xl uppercase font-bold bg-gradient-to-r from-[#FFB147] via-[#FF6C63] to-[#B86ADF] bg-clip-text text-transparent">
        Archive
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {archiveLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="px-3.5 py-1.5 text-sm font-medium text-white rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.18)] transition-transform hover:scale-[1.03] bg-gradient-to-r from-[#FFB147] via-[#FF6C63] to-[#B86ADF]"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  )
}

export default function ContactSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="portfolio-shell container space-y-0 !px-[clamp(1rem,4vw,7rem)] py-7">
        <div className="mb-8 text-center">
          <span className="text-lg italic font-bold text-gray-700">Contact</span>
          <h2 className="mt-2 text-4xl lg:text-5xl uppercase font-bold bg-gradient-to-r from-[#FFB147] via-[#FF6C63] to-[#B86ADF] bg-clip-text text-transparent">
            Reach out to me
          </h2>
          <p className="mt-2 text-lg text-gray-600 md:text-xl">
            I&apos;d love to hear from you! Feel free to get in touch via phone
            or email.
          </p>
        </div>

        <div className="hidden grid-cols-2 gap-6 lg:grid">
          {contactCards.map((card) => (
            <a
              key={card.id}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-200/90 bg-white p-5 shadow-sm transition-transform hover:scale-[1.02] md:gap-3 md:p-6 lg:gap-4 lg:p-7"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-[#FFB147] via-[#FF6C63] to-[#B86ADF]">
                <card.icon className="w-10 h-10 text-white" />
              </div>
              <span className="break-all text-lg font-bold text-gray-800 sm:text-xl md:text-2xl">
                {card.value}
              </span>
              <span className="text-gray-500">{card.type}</span>
            </a>
          ))}
        </div>

        <div className="hidden grid-cols-2 gap-4 md:grid lg:hidden">
          {contactCards.map((card) => (
            <a
              key={card.id}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2.5 rounded-xl border border-gray-200/90 bg-white p-5 shadow-sm transition-transform hover:scale-[1.02]"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-[#FFB147] via-[#FF6C63] to-[#B86ADF]">
                <card.icon className="w-8 h-8 text-white" />
              </div>
              <span className="break-all text-xl font-bold text-gray-800">
                {card.value}
              </span>
              <span className="text-gray-500">{card.type}</span>
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <ArchiveLinks />
        </div>

        <div className="flex flex-col gap-4 mb-32 md:hidden">
          {contactCards.map((card) => (
            <a
              key={card.id}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200/90 bg-white p-3.5 shadow-sm transition-transform hover:scale-[1.02]"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#FFB147] via-[#FF6C63] to-[#B86ADF]">
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <span className="break-all text-lg font-bold text-gray-800">
                {card.value}
              </span>
              <span className="text-gray-500">{card.type}</span>
            </a>
          ))}

          <ArchiveLinks />

          <div className="flex justify-center mt-4 space-x-3">
            {socialLinks.map((s, idx) => {
              const IconComp = s.icon
              return (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(
                      s.href,
                      '_blank',
                      'width=500,height=600,top=100,left=100,resizable=yes,scrollbars=yes',
                    )
                  }}
                  aria-label={s.label}
                  className="flex items-center justify-center w-10 h-10 transition-transform bg-white rounded-full shadow-lg hover:scale-110"
                >
                  <IconComp
                    className="w-5 h-5 text-black transition-colors duration-200"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = s.hoverColor)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'black')
                    }
                  />
                </button>
              )
            })}
          </div>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-500">
              Copyright ©2025 NKR. All rights reserved.
            </span>
          </div>
        </div>
      </div>

      {/* Desktop socials live in the sidebar — avoid overlap */}
      <div className="fixed bottom-8 left-20 z-20 hidden flex-col space-y-4 xl:left-[17rem]">
        {socialLinks.map((s, idx) => {
          const IconComp = s.icon
          return (
            <a
              key={idx}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex items-center justify-center w-8 h-8 transition-transform bg-white rounded-full shadow-lg hover:scale-110"
            >
              <IconComp
                className="w-5 h-5 text-black transition-colors duration-200"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = s.hoverColor)
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = 'black')}
              />
            </a>
          )
        })}
      </div>
    </div>
  )
}
