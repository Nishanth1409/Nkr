import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { SiLinktree } from 'react-icons/si'

import Button from './ui/Button'

const contactLinks = [
  {
    icon: FaLinkedin,
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/manjumadhav-va',
  },
  { icon: FaGithub, name: 'GitHub', href: 'https://github.com/Violetto-rose' },
  {
    icon: SiLinktree,
    name: 'Linktree',
    href: 'https://linktr.ee/manjumadhav.va',
  },
  { icon: MdEmail, name: 'Email', href: 'mailto:manjumadhav.va@gmail.com' },
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
    <div className="flex justify-center items-center bg-white">
      <div className="container flex flex-col gap-8 justify-center items-start px-8 py-16 bg-white md:px-24 md:py-32">
        <span className="text-5xl text-black">Contact Me</span>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {contactLinks.map((link, index) => (
              <Button
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                className="gap-2"
              >
                <link.icon className="w-6 h-6" />
                <span>{link.name}</span>
              </Button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-2xl text-black">Archive</span>
            <div className="flex flex-wrap gap-3">
              {archiveLinks.map((link, index) => (
                <Button key={index} href={link.href} size="sm">
                  <span>{link.name}</span>
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
