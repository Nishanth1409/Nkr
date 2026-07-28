'use client'

import React, { memo, useRef, useState } from 'react'
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import {
  ARCHIVE_PORTFOLIO_LINKS,
  CONTACT_LINKS as SHARED_CONTACT,
} from '../../data/portfolio-content'
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

const LINK_COLORS: Record<string, string> = {
  LinkedIn: '#0A66C2',
  GitHub: '#24292e',
  X: '#000000',
  Instagram: '#E4405F',
  Linktree: '#1a1a1a',
  Email: '#ea4335',
}

const LINK_ICONS: Record<string, React.ReactNode> = {
  LinkedIn: <FontAwesomeIcon icon={faLinkedin} size="lg" />,
  GitHub: <FontAwesomeIcon icon={faGithub} size="lg" />,
  X: <FontAwesomeIcon icon={faXTwitter} size="lg" />,
  Instagram: <FontAwesomeIcon icon={faInstagram} size="lg" />,
  Linktree: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 417 512"
      fill="currentColor"
    >
      <path
        fill="#43E660"
        fillRule="nonzero"
        d="M171.274 344.942h74.09v167.296h-74.09V344.942zM0 173.468h126.068l-89.622-85.44 49.591-50.985 85.439 87.829V0h74.086v124.872L331 37.243l49.552 50.785-89.58 85.24H417v70.502H290.252l90.183 87.629L331 381.192 208.519 258.11 86.037 381.192l-49.591-49.591 90.218-87.631H0v-70.502z"
      />
    </svg>
  ),
  Email: <FontAwesomeIcon icon={faEnvelope} size="lg" />,
}

const CONTACT_LINKS: ContactLink[] = SHARED_CONTACT.map((link) => ({
  id: link.name.toLowerCase(),
  name: link.name,
  href: link.href,
  icon: LINK_ICONS[link.name],
  color: LINK_COLORS[link.name] ?? '#7c3aed',
}))

const Footer = memo(() => (
  <StyledFooter className="absolute right-0 bottom-0 left-0 py-8 text-sm text-center">
    <span>
      Loosely designed in <FigmaPopup />. Built with Next.js, Tailwind CSS,
      Aceternity UI, Font Awesome, and Vercel.
    </span>
  </StyledFooter>
))
Footer.displayName = 'Footer'

const ContactLinkButton = memo(({ link }: { link: ContactLink }) => (
  <HoverBorderGradient<'a'>
    as="a"
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex w-fit items-center justify-center gap-2 px-3.5 py-2 text-sm font-medium sm:text-base"
    style={{
      backgroundColor: link.color,
    }}
  >
    {link.icon}
    <span>{link.name}</span>
  </HoverBorderGradient>
))
ContactLinkButton.displayName = 'ContactLinkButton'

const Contact = memo(() => {
  return (
    <section
      id="contact"
      className="flex overflow-hidden relative flex-col justify-center items-center min-h-screen snap-start"
    >
      <WavyBackground className="flex flex-col items-center mx-auto">
        <h1 className="mb-12 text-3xl font-semibold text-violet-400 sm:text-4xl md:text-5xl">
          Contact Me
        </h1>

        <div className="mx-auto flex w-full max-w-5xl flex-wrap justify-center gap-2.5 p-[clamp(1rem,2.5vw,2rem)]">
          {CONTACT_LINKS.map((link) => (
            <ContactLinkButton key={link.id} link={link} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 px-6">
          <h2 className="text-xl font-semibold text-violet-300">Archive</h2>
          <div className="flex flex-wrap justify-center gap-2.5">
            {ARCHIVE_PORTFOLIO_LINKS.map((link) => (
              <HoverBorderGradient
                key={link.href}
                as="a"
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  link.href.startsWith('http') ? 'noopener noreferrer' : undefined
                }
                containerClassName={
                  link.calm ? 'rounded-full opacity-70' : 'rounded-full'
                }
                className={
                  link.calm
                    ? 'bg-transparent px-3.5 py-1.5 text-sm text-violet-200/55 border border-violet-400/20 shadow-none'
                    : 'bg-violet-900/40 px-3.5 py-1.5 text-sm text-violet-100'
                }
              >
                {link.name}
              </HoverBorderGradient>
            ))}
          </div>
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
    <span className="inline-block relative">
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
          className="absolute bottom-[130%] left-1/2 z-50 hidden aspect-4/3 min-h-[220px] w-[min(90vw,500px)] max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-col items-center justify-center overflow-hidden rounded-3xl border border-violet-500/20 bg-black/80 p-0 shadow-2xl backdrop-blur-md lg:flex"
        >
          {!iframeLoaded ? (
            <button
              className="px-4 py-2 text-xs font-bold uppercase tracking-wide text-white bg-violet-600 rounded-full"
              onClick={() => setIframeLoaded(true)}
            >
              Load Preview
            </button>
          ) : (
            <iframe
              className="w-full h-full border-0"
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
