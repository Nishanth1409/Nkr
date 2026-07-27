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

export default function ContactSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="container px-5 py-7 space-y--10 md:px-16 lg:px-28">
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
              className="flex flex-col items-center justify-center gap-4 p-8 transition-transform bg-white border border-gray-200 shadow-xl rounded-2xl hover:scale-105"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-[#FFB147] via-[#FF6C63] to-[#B86ADF]">
                <card.icon className="w-10 h-10 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">
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
              className="flex flex-col items-center justify-center gap-3 p-6 transition-transform bg-white border border-gray-200 shadow-lg rounded-xl hover:scale-105"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-[#FFB147] via-[#FF6C63] to-[#B86ADF]">
                <card.icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">
                {card.value}
              </span>
              <span className="text-gray-500">{card.type}</span>
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-4 mb-32 md:hidden">
          {contactCards.map((card) => (
            <a
              key={card.id}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 p-4 transition-transform bg-white border border-gray-200 shadow-md rounded-xl hover:scale-105"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#FFB147] via-[#FF6C63] to-[#B86ADF]">
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-800">
                {card.value}
              </span>
              <span className="text-gray-500">{card.type}</span>
            </a>
          ))}

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

      <div className="fixed flex-col hidden space-y-4 lg:flex left-4 bottom-8">
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
