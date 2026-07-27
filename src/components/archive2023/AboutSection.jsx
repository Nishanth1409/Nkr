'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'

const ASSET = '/archive2023'

const AboutSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFigmaOpen, setIsFigmaOpen] = useState(false)
  const [rotateFigma, setRotateFigma] = useState(false)
  const [activeLogo, setActiveLogo] = useState(null)

  const cardRef = useRef(null)

  const handleFigmaClick = () => {
    setRotateFigma(true)
    setTimeout(() => setRotateFigma(false), 1000)
    setIsFigmaOpen(!isFigmaOpen)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsFigmaOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const figmaProjects = [
    {
      id: 1,
      link: 'https://www.figma.com/proto/gwOjKoUKr6jarhEMV9q4g9?node-id=0-1&t=hd3xr6x9vo2gFuDA-6',
    },
    {
      id: 2,
      link: 'https://www.figma.com/proto/QLLaNhspvkK8oy6CFbjp2J?node-id=0-1&t=hd3xr6x9vo2gFuDA-6',
    },
    {
      id: 3,
      link: 'https://www.figma.com/proto/C4Rzntyqnsr2PN3ImdpEDs?node-id=0-1&t=hd3xr6x9vo2gFuDA-6',
    },
    {
      id: 4,
      link: 'https://www.figma.com/proto/75flaOsr4MBHszdq9bVXJz?node-id=0-1&t=hd3xr6x9vo2gFuDA-6',
    },
    {
      id: 5,
      link: 'https://www.figma.com/proto/oPgBbHCIc8kmpejjoDwdwn?node-id=0-1&t=hd3xr6x9vo2gFuDA-6',
    },
    {
      id: 6,
      link: 'https://www.figma.com/design/YZw7eWebiTOrhno5hNB7yj/my-portfolio?node-id=1-491&t=UWpL59Cj9TyQnyz0-1',
    },
    {
      id: 7,
      link: 'https://www.figma.com/proto/KygauuT0LpgAYOynxLeYEE?node-id=0-1&t=hd3xr6x9vo2gFuDA-6',
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="container px-6 space-y-0 md:px-16 lg:px-28">
        <div className="flex flex-col items-center py-20 lg:flex-row">
          <div className="flex flex-col items-center flex-grow mb-10 lg:mb-0">
            <img
              className="max-h-[50vh] md:max-h-[60vh] lg:max-h-[70vh]"
              src={`${ASSET}/about-logo.svg`}
              alt="Hero Logo"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex gap-2 mt-6 text-black underline"
            >
              View My Resume
              <span className="flex items-center justify-center w-6 h-6 bg-black">
                <ArrowRightIcon className="w-5 h-5 text-white -rotate-45" />
              </span>
            </button>
          </div>

          <div className="flex flex-col items-center justify-center flex-grow w-full space-y-12">
            <h2 className="text-4xl md:text-5xl uppercase font-bold text-center mb-8 bg-gradient-to-r from-[#FFB147] via-[#FF6C63] to-[#B86ADF] bg-clip-text text-transparent">
              About me
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-center text-gray-700 md:text-2xl lg:text-3xl">
              I am a Computer Science and Design undergraduate with expertise in{' '}
              <span className="font-semibold">UI/UX design</span> and proficiency
              in tools such as <span className="font-semibold">Figma</span>,{' '}
              <span className="font-semibold">Canva</span>,{' '}
              <span className="font-semibold">Git/GitHub</span>, and{' '}
              <span className="font-semibold">Visual Studio Code</span>. I am
              passionate about crafting intuitive digital experiences and aspire
              to grow as a <span className="font-semibold">Frontend Developer</span>{' '}
              and <span className="font-semibold">UI/UX designer</span>. Outside of
              design and development, I enjoy listening to music and pursuing
              photography.
            </p>
            <h3 className="text-4xl md:text-5xl uppercase font-bold text-center mb-8 bg-gradient-to-r from-[#FFB147] via-[#FF6C63] to-[#B86ADF] bg-clip-text text-transparent">
              Technologies I Know
            </h3>
            <div className="relative flex flex-wrap justify-center gap-6 md:gap-10">
              <div className="relative">
                <span
                  onClick={handleFigmaClick}
                  className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full outline-4 outline-[#FFB147] p-3 
             transition-transform duration-300 hover:scale-110 cursor-pointer bg-white shadow-md"
                >
                  <img
                    src={`${ASSET}/figma.svg`}
                    alt="Figma"
                    className="object-contain w-12 h-12 md:w-16 md:h-16 logo-rotate"
                  />
                </span>

                {isFigmaOpen && (
                  <div
                    ref={cardRef}
                    className="absolute z-50 grid w-64 grid-cols-2 gap-3 p-4 -translate-x-1/2 bg-white shadow-2xl top-28 left-1/2 rounded-2xl"
                  >
                    {figmaProjects.map((project) => (
                      <a
                        key={project.id}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsFigmaOpen(false)}
                        className="px-3 py-2 text-sm bg-[#FFB147] text-white font-medium rounded-lg shadow hover:bg-[#e69e40] transition-colors"
                      >
                        Project {project.id}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {[
                {
                  icon: `${ASSET}/canva.svg`,
                  link: 'https://drive.google.com/drive/folders/1qB1l4XnyGl3gSpLZq3BM7o1pzGNs0DRQ?usp=sharing',
                  name: 'canva',
                },
                {
                  icon: `${ASSET}/javascript.svg`,
                  link: 'https://bokmyshow1409.vercel.app/',
                  name: 'js',
                },
                {
                  icon: `${ASSET}/HTML.svg`,
                  link: 'https://nishanth1409.github.io/Zomato_1409/',
                  name: 'react',
                },
              ].map((item, idx) => (
                <span
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveLogo(item.name)

                    if (window.innerWidth < 768) {
                      setTimeout(() => {
                        window.open(item.link, '_blank', 'noopener,noreferrer')
                      }, 1000)
                    } else {
                      window.open(item.link, '_blank', 'noopener,noreferrer')
                    }
                  }}
                  className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full outline-4 outline-[#FFB147] p-3 
               transition-transform duration-300 hover:scale-110 cursor-pointer"
                >
                  <img
                    src={item.icon}
                    alt={`Tech ${idx}`}
                    className="object-contain w-12 h-12 md:w-16 md:h-16 logo-rotate"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-2 items-center py-20 px-14 rounded-[8rem] bg-gradient-to-l from-[#FFB147] via-[#FF6C63] to-[#B86ADF] gap-10">
          <div className="flex flex-col items-start gap-5">
            <span className="text-lg italic font-bold text-white">
              Experience
            </span>
            <span className="text-5xl font-bold text-white">
              VOLUNTEERING & LEADERSHIP
            </span>
            <p className="text-lg text-white">
              I am a <span className="italic font-bold">UI/UX</span>,{' '}
              <span className="italic font-bold">photo editing</span>, and{' '}
              <span className="italic font-bold">template designer</span>, and
              I&apos;m very passionate and dedicated to my work.
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-10">
            <div>
              <div className="flex justify-between">
                <span className="text-lg italic font-bold text-white">
                  2024 - Present
                </span>
                <span className="text-base font-bold text-white">
                  GeeksforGeeks (Student Club PESITM)
                </span>
              </div>
              <span className="text-3xl font-bold text-white">Design Head</span>
              <div className="w-full h-0.5 bg-white opacity-30 rounded mt-2"></div>
            </div>
            <div>
              <div className="flex justify-between">
                <span className="text-lg italic font-bold text-white">
                  2024 - 2025
                </span>
                <span className="text-base font-bold text-white">
                  Prerana 2024 - 2025 (PESITM)
                </span>
              </div>
              <span className="text-3xl font-bold text-white">
                Creative Template Designer & Event Coordinator
              </span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex lg:hidden flex-col items-center text-center py-20 px-12 rounded-[4rem] bg-gradient-to-l from-[#FFB147] via-[#FF6C63] to-[#B86ADF] space-y-8">
          <span className="text-xl italic font-bold text-white">Experience</span>
          <span className="text-4xl font-bold text-white">
            VOLUNTEERING & LEADERSHIP
          </span>
          <p className="max-w-xl text-white">
            I am a <span className="italic font-bold">UI/UX</span>,{' '}
            <span className="italic font-bold">photo editing</span>, and{' '}
            <span className="italic font-bold">template designer</span>, and
            I&apos;m very passionate and dedicated to my work.
          </p>
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-lg italic font-bold text-white">
                2024 - Present
              </p>
              <p className="text-2xl font-bold text-white">
                Design Head - GeeksforGeeks (PESITM)
              </p>
            </div>
            <div>
              <p className="text-lg italic font-bold text-white">2024 - 2025</p>
              <p className="text-2xl font-bold text-white">
                Creative Template Designer & Event Coordinator - Prerana
              </p>
            </div>
          </div>
        </div>

        <div className="flex md:hidden flex-col items-center text-center py-16 px-8 rounded-[2rem] bg-gradient-to-l from-[#FFB147] via-[#FF6C63] to-[#B86ADF] space-y-6">
          <span className="text-lg italic font-bold text-white">Experience</span>
          <span className="text-3xl font-bold text-white">
            VOLUNTEERING & LEADERSHIP
          </span>
          <p className="text-base text-white">
            Passionate <span className="italic font-bold">UI/UX</span>,{' '}
            <span className="italic font-bold">photo editing</span>, and{' '}
            <span className="italic font-bold">template designer</span>.
          </p>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm italic font-bold text-white">
                2024 - Present
              </p>
              <p className="text-lg font-bold text-white">
                Design Head - GeeksforGeeks
              </p>
            </div>
            <div>
              <p className="text-sm italic font-bold text-white">2024 - 2025</p>
              <p className="text-lg font-bold text-white">
                Creative Template Designer - Prerana
              </p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-md"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white w-11/12 md:w-3/4 lg:w-2/3 h-[80vh] relative p-8 rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute flex items-center justify-center w-10 h-10 text-2xl font-bold bg-gradient-to-r from-[#FFB147] via-[#FF6C63] to-[#B86ADF] text-white rounded-full top-1 left-1 hover:bg-gray-300 hover:text-black"
            >
              &times;
            </button>

            <iframe
              src="https://drive.google.com/file/d/18FapirYKIv_4HM3BfVo2oqkOY_Rn5Ca5/preview"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              title="Resume Preview"
            ></iframe>

            <a
              href="https://drive.google.com/uc?export=download&id=18FapirYKIv_4HM3BfVo2oqkOY_Rn5Ca5"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsModalOpen(false)}
              className="absolute bottom-4 right-4 bg-gradient-to-r from-[#FFB147] via-[#FF6C63] to-[#B86ADF] 
             text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
            >
              <ArrowDownTrayIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default AboutSection
