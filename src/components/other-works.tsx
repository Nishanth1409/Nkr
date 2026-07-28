import {
  INSTAGRAM_URL,
  PhotographyCarousel,
  type PhotographySlide,
} from './photography-carousel'

const PHOTO_DIR = '/images/Photography'

/** 10 portfolio shots — frame is 3:4 portrait; landscape shots use objectPosition */
const photographyPhotos: Array<{
  file: string
  alt: string
  objectPosition?: string
}> = [
  { file: 'IMG_20210918_182748.jpg', alt: 'Evening light', objectPosition: 'center 45%' },
  { file: 'IMG_20210918_183701.jpg', alt: 'Portrait study' },
  { file: 'IMG_20211021_205036.jpg', alt: 'Wide landscape', objectPosition: 'center 40%' },
  { file: 'IMG_20230920_093152.jpg', alt: 'Outdoor scene', objectPosition: 'center 35%' },
  { file: 'IMG_20250531_100841.jpg', alt: 'Vertical composition' },
  { file: 'IMG_20250531_101435.jpg', alt: 'Street moment' },
  { file: '2.jpg', alt: 'Candid frame' },
  { file: 'redmi10promax.jpg', alt: 'Sky and horizon', objectPosition: 'center 50%' },
  { file: 'ZVE04401.jpg', alt: 'Portrait click' },
  { file: 'ZVE04450.jpg', alt: 'Natural light portrait' },
]

const photographySlides: PhotographySlide[] = [
  ...photographyPhotos.map((photo) => ({
    type: 'photo' as const,
    src: `${PHOTO_DIR}/${photo.file}`,
    alt: photo.alt,
    objectPosition: photo.objectPosition,
  })),
  {
    type: 'instagram',
    href: INSTAGRAM_URL,
    imageSrc: `${PHOTO_DIR}/newlogo.jpg`,
    alt: 'Nishanth Creation — more on Instagram',
  },
]

const OtherWorks = () => {
  return (
    <section
      id="other-works"
      className="photography-section-inner relative flex min-h-screen w-full flex-col items-center justify-center gap-8 overflow-x-clip bg-white py-[clamp(2.5rem,6vh,8rem)] pb-[clamp(4rem,8vh,9rem)] md:gap-12"
    >
      <div className="portfolio-shell relative z-20 flex w-full flex-col items-start gap-2 !pb-4 !pt-0">
        <span className="no-grunge text-[clamp(1.75rem,5vw+0.5rem,3rem)] leading-tight text-black">
          Photography
        </span>
        <span className="no-grunge text-[clamp(1rem,2.5vw+0.4rem,1.5rem)] text-black">
          Seeing the world through my lens.
        </span>
        <span className="no-grunge max-w-2xl text-pretty text-lg text-black md:text-xl">
          Scroll to move through photos — last card opens the full gallery on{' '}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link-hover no-grunge font-medium underline"
          >
            @_n.k.r_creation
          </a>
          .
        </span>
      </div>

      <div className="photo-carousel-bleed w-full pt-10 md:pt-16">
        <PhotographyCarousel slides={photographySlides} />
      </div>

      <a
        href="#my-designs"
        className="btn-interactive no-grunge relative z-20 mx-[clamp(1rem,4.5vw,6rem)] mt-4 inline-flex w-fit max-w-[calc(100%-2rem)] rounded-md border border-black/90 bg-white px-3.5 py-1.5 text-sm text-black shadow-[1.5px_1.5px_0_0_#111] sm:text-base"
      >
        My template designs ↓
      </a>
    </section>
  )
}

export default OtherWorks
