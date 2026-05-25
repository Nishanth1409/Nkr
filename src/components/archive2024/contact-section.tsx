'use client'

import React, { memo, useRef, useState } from 'react'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import HoverBorderGradient from './ui/hover-border-gradient'
import { WavyBackground } from './ui/wavy-background'

const StyledFooter = styled.footer`
  text-shadow:
    0px 1px 2px rgb(0 0 0 / 0.3),
    0px 3px 2px rgb(0 0 0 / 0.3),
    0px 4px 8px rgb(0 0 0 / 0.3);
`

interface ContactLink {
  id: string
  name: string
  href: string
  icon: React.ReactNode
  color: string
}

const CONTACT_LINKS: ContactLink[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/manjumadhav-va',
    icon: <FontAwesomeIcon icon={faLinkedin} size="lg" />,
    color: '#0A66C2',
  },
  {
    id: 'github',
    name: 'GitHub',
    href: 'https://github.com/Violetto-rose',
    icon: <FontAwesomeIcon icon={faGithub} size="lg" />,
    color: '#24292e',
  },
  {
    id: 'linktree',
    name: 'Linktree',
    href: 'https://linktr.ee/manjumadhav.va',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 417 512.238"
        fill="currentColor"
      >
        <path
          fill="#43E660"
          fillRule="nonzero"
          d="M171.274 344.942h74.09v167.296h-74.09V344.942zM0 173.468h126.068l-89.622-85.44 49.591-50.985 85.439 87.829V0h74.086v124.872L331 37.243l49.552 50.785-89.58 85.24H417v70.502H290.252l90.183 87.629L331 381.192 208.519 258.11 86.037 381.192l-49.591-49.591 90.218-87.631H0v-70.502z"
        />
      </svg>
    ),
    color: '#1a1a1a',
  },
  {
    id: 'email',
    name: 'Email',
    href: 'mailto:manjumadhav.va@gmail.com',
    icon: <FontAwesomeIcon icon={faEnvelope} size="lg" />,
    color: '#ea4335',
  },
] as const

const Footer = memo(() => (
  <StyledFooter className="absolute right-0 bottom-0 left-0 py-8 text-center text-sm">
    <span>
      Loosely designed in <FigmaPopup />. Built with Next.js, Tailwind CSS,
      Aceternity UI, Font Awesome, and Vercel.
    </span>
  </StyledFooter>
))
Footer.displayName = 'Footer'

const ContactLinkButton = memo(({ link }: { link: ContactLink }) => (
  <div key={link.id}>
    {/* Explicitly passing <"a"> ensures TS finds 'children' and 'href' through the lazy boundary */}
    <HoverBorderGradient<'a'>
      as="a"
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-3 px-8 py-4 font-medium"
      style={{
        backgroundColor: link.color,
      }}
    >
      {link.icon}
      <span>{link.name}</span>
    </HoverBorderGradient>
  </div>
))
ContactLinkButton.displayName = 'ContactLinkButton'

const Contact = memo(() => {
  return (
    <section
      id="contact"
      className="relative flex min-h-screen snap-start flex-col items-center justify-center overflow-hidden"
    >
      <WavyBackground className="mx-auto flex flex-col items-center">
        <h1 className="mb-12 text-3xl font-semibold text-violet-400 sm:text-4xl md:text-5xl">
          Contact Me
        </h1>

        <div className="mx-auto grid w-full grid-cols-1 gap-6 p-6 sm:w-auto sm:p-8 md:grid-cols-2 lg:grid-cols-4">
          {CONTACT_LINKS.map((link) => (
            <ContactLinkButton key={link.id} link={link} />
          ))}
        </div>
      </WavyBackground>
      <Footer />
    </section>
  )
})
Contact.displayName = 'Contact'

const FigmaPopup = memo(() => {
  const [show, setShow] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(e.relatedTarget as Node)
    ) {
      setShow(false)
    }
  }

  return (
    <span className="relative inline-block">
      <a
        href="https://figma.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-violet-300 transition-colors hover:text-violet-200"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={handleMouseLeave}
      >
        Figma
      </a>

      {show && (
        <div
          ref={popupRef}
          onMouseLeave={() => setShow(false)}
          className="absolute bottom-[130%] left-1/2 z-50 hidden aspect-4/3 min-h-[220px] w-[90vw] max-w-[500px] -translate-x-1/2 flex-col items-center justify-center overflow-hidden rounded-3xl border border-violet-500/20 bg-black/80 p-0 shadow-2xl backdrop-blur-md lg:flex"
        >
          {!iframeLoaded ? (
            <button
              className="rounded-full bg-violet-600 px-6 py-3 text-xs font-bold text-white uppercase"
              onClick={() => setIframeLoaded(true)}
            >
              Load Preview
            </button>
          ) : (
            <iframe
              className="h-full w-full border-0"
              src="https://embed.figma.com/proto/TfkFcaZhPUUSXKt5Hy5fez/Untitled?embed-host=share"
              allowFullScreen
              title="Figma Preview"
            />
          )}
        </div>
      )}
    </span>
  )
})
FigmaPopup.displayName = 'FigmaPopup'

export default Contact
