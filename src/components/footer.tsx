import React from 'react'

const footer = () => {
  return (
    <div className="flex items-center justify-center bg-transparent">
      <div className="portfolio-shell flex flex-col items-center justify-center gap-8 !py-4 bg-transparent">
        <span className="no-grunge max-w-4xl text-center text-pretty text-base text-black">
          Loosely designed in{' '}
          <a
            href="https://figma.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link-hover underline"
          >
            Figma
          </a>
          . Built with{' '}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link-hover underline"
          >
            Next.js
          </a>{' '}
          and{' '}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link-hover underline"
          >
            Tailwind CSS
          </a>{' '}
          using{' '}
          <a
            href="https://react-icons.github.io/react-icons/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link-hover underline"
          >
            React Icons
          </a>
          . Typeset in{' '}
          <a
            href="https://fonts.google.com/specimen/Lora"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link-hover underline"
          >
            Lora
          </a>
          . Hosted with{' '}
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link-hover underline"
          >
            Vercel
          </a>
          .
        </span>
      </div>
    </div>
  )
}

export default footer
