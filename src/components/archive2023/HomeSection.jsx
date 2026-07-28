'use client'

import React from 'react'

const ASSET = '/archive2023'

const HomeSection = ({
  nLogoXMobile = '-2rem',
  nLogoYMobile = '-3rem',
  nLogoXTablet = '-3rem',
  nLogoYTablet = '-6rem',
  nLogoXDesktop = '-2rem',
  nLogoYDesktop = '-8rem',
}) => {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-white">
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-20 xl:hidden"
        style={{ backgroundImage: `url('${ASSET}/hero-logo.svg')` }}
      ></div>

      <div className="container relative z-10 flex flex-col-reverse items-center px-6 sm:hidden">
        <div className="flex flex-col items-center justify-center flex-grow space-y-4 text-center">
          <div className="relative flex flex-col items-center">
            <img
              className="absolute w-14"
              src={`${ASSET}/n-logo.svg`}
              alt="N"
              style={{
                top: nLogoYMobile,
                left: nLogoXMobile,
              }}
            />

            <span className="flex w-full max-w-full flex-col text-center text-[clamp(1.75rem,6vw,2.25rem)] uppercase">
              <span>My name is</span>
              <span>
                <span className="break-words font-bold">Nishanth K R</span>
              </span>
            </span>
          </div>

          <span className="max-w-full px-1 text-center text-[clamp(1rem,3.8vw,1.125rem)] text-pretty">
            A <span className="italic font-bold">creative mind</span> passionate
            about <span className="italic font-bold">UI/UX</span>,{' '}
            <span className="italic font-bold">photo&nbsp;editing</span>, and{' '}
            <span className="italic font-bold">template&nbsp;design...</span>
          </span>
        </div>
      </div>

      <div className="container relative z-10 hidden sm:flex xl:hidden">
        <div className="flex flex-col items-center justify-center flex-grow space-y-4 text-center">
          <div className="relative flex flex-col items-center">
            <img
              className="absolute w-20 md:w-24"
              src={`${ASSET}/n-logo.svg`}
              alt="N"
              style={{
                top: nLogoYTablet,
                left: nLogoXTablet,
              }}
            />

            <span className="flex flex-col w-full text-5xl text-center uppercase md:text-6xl">
              <span>My name is</span>
              <span>
                <span className="font-bold">Nishanth K R</span>
              </span>
            </span>
          </div>

          <span className="text-2xl text-center md:text-3xl">
            A <span className="italic font-bold">creative mind</span> passionate
            about <span className="italic font-bold">UI/UX</span>,{' '}
            <span className="italic font-bold">photo&nbsp;editing</span>, and{' '}
            <span className="italic font-bold">template&nbsp;design...</span>
          </span>
        </div>
      </div>

      <div className="container relative z-10 items-center hidden xl:flex xl:flex-row xl:px-27">
        <div className="flex flex-col items-start justify-center flex-grow space-y-4 text-left">
          <div className="relative flex flex-col items-start">
            <img
              className="absolute w-20"
              src={`${ASSET}/n-logo.svg`}
              alt="N"
              style={{
                top: nLogoYDesktop,
                left: nLogoXDesktop,
              }}
            />

            <span className="flex flex-col w-full text-6xl uppercase">
              <span>My name is</span>
              <span>
                <span className="font-bold">Nishanth K R</span>
              </span>
            </span>
          </div>

          <span className="text-3xl">
            A <span className="italic font-bold">creative mind</span> passionate
            about <span className="italic font-bold">UI/UX</span>,{' '}
            <span className="italic font-bold">photo&nbsp;editing</span>, and{' '}
            <span className="italic font-bold">template&nbsp;design...</span>
          </span>
        </div>

        <img
          className="max-h-[70vh]"
          src={`${ASSET}/hero-logo.svg`}
          alt="Hero Logo"
        />
      </div>
    </div>
  )
}

export default HomeSection
