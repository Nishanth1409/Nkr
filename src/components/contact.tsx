import React from 'react'
import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { SiLinktree } from 'react-icons/si'

import {
  CONTACT_AVAILABILITY,
  CONTACT_LINKS,
} from '../data/portfolio-content'
import Button from './ui/Button'

const iconByName: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
  X: FaXTwitter,
  Instagram: FaInstagram,
  Linktree: SiLinktree,
  Email: MdEmail,
}

const archiveLinks = [
  { name: '2026 Portfolio', href: '/2026' },
  { name: '2024 Portfolio', href: '/archive2024' },
  { name: '2023 Portfolio', href: '/archive2023' },
]

const Contact = () => {
  return (
    <div className="contact-section-inner flex min-h-screen w-full items-center justify-center bg-transparent">
      <div className="portfolio-shell flex flex-col items-start justify-center gap-6 bg-transparent sm:gap-8">
        <span className="no-grunge text-[clamp(1.75rem,5vw+0.5rem,3rem)] leading-tight text-black">
          Contact Me
        </span>

        <p className="no-grunge max-w-2xl text-pretty text-lg text-black md:text-xl">
          {CONTACT_AVAILABILITY}
        </p>

        <div className="flex w-full min-w-0 flex-col gap-8">
          <div className="flex flex-wrap gap-2.5">
            {CONTACT_LINKS.map((link) => {
              const Icon = iconByName[link.name] ?? MdEmail
              return (
                <Button
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="md"
                  className="no-grunge"
                >
                  <Icon className="no-grunge h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                  <span className="no-grunge">{link.name}</span>
                </Button>
              )
            })}
          </div>

          <div className="flex flex-col gap-3">
            <span className="no-grunge text-2xl text-black">Archive</span>
            <div className="flex flex-wrap gap-2.5">
              {archiveLinks.map((link) => (
                <Button
                  key={link.name}
                  href={link.href}
                  size="sm"
                  className="no-grunge"
                >
                  <span className="no-grunge">{link.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
