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
  { name: '2024 Portfolio', href: '/archive2024' },
  { name: '2023 Portfolio', href: '/archive2023' },
]

const Contact = () => {
  return (
    <div className="contact-section-inner flex min-h-screen w-full items-center justify-center bg-transparent">
      <div className="container flex flex-col items-start justify-center gap-8 bg-transparent px-8 py-16 md:px-24 md:py-32">
        <span className="no-grunge text-3xl text-black sm:text-4xl md:text-5xl">Contact Me</span>

        <p className="no-grunge max-w-2xl text-lg text-black md:text-xl">{CONTACT_AVAILABILITY}</p>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3">
            {CONTACT_LINKS.map((link) => {
              const Icon = iconByName[link.name] ?? MdEmail
              return (
                <Button
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="md"
                  className="gap-2 no-grunge"
                >
                  <Icon className="no-grunge h-6 w-6" />
                  <span className="no-grunge">{link.name}</span>
                </Button>
              )
            })}
          </div>

          <div className="flex flex-col gap-4">
            <span className="no-grunge text-2xl text-black">Archive</span>
            <div className="flex flex-wrap gap-3">
              {archiveLinks.map((link) => (
                <Button key={link.name} href={link.href} size="sm" className="no-grunge">
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
