import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { SiLinktree } from 'react-icons/si'

import Button from './ui/Button'

const contactLinks = [
  {
    icon: FaLinkedin,
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nishanth-k-r-107895258',
  },
  { icon: FaGithub, name: 'GitHub', href: 'https://github.com/Nishanth1409' },
  {
    icon: SiLinktree,
    name: 'Linktree',
    href: 'https://linktr.ee/Nkr14',
  },
  { icon: MdEmail, name: 'Email', href: 'mailto:nishanthkr1409@gmail.com' },
]

const archiveLinks = [
  { name: '2024 Portfolio', href: '/archive2024' },
  {
    name: '2023 Portfolio',
    href: 'https://nkr14.vercel.app/',
  },
]

const Contact = () => {
  return (
    <div className="contact-section-inner flex min-h-screen w-full items-center justify-center bg-transparent">
      <div className="container flex flex-col items-start justify-center gap-8 bg-transparent px-8 py-16 md:px-24 md:py-32">
        <span className="no-grunge text-3xl text-black sm:text-4xl md:text-5xl">Contact Me</span>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-4">
            {contactLinks.map((link, index) => (
              <Button
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                className="gap-2 no-grunge"
              >
                <link.icon className="no-grunge h-6 w-6" />
                <span className="no-grunge">{link.name}</span>
              </Button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="no-grunge text-2xl text-black">Archive</span>
            <div className="flex flex-wrap gap-3">
              {archiveLinks.map((link, index) => (
                <Button key={index} href={link.href} size="sm" className="no-grunge">
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
