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
      className="flex relative flex-col gap-8 justify-center items-center py-16 pb-24 w-full min-h-screen bg-white photography-section-inner overflow-x-clip md:gap-12 md:py-32 md:pb-36"
    >
      <div className="container flex relative z-20 flex-col gap-2 items-start px-8 pb-4 w-full md:px-24">
        <span className="no-grunge text-3xl text-black sm:text-4xl md:text-5xl">Photography</span>
        <span className="no-grunge text-xl text-black sm:text-2xl">Seeing the world through my lens.
        </span>
        <span className="no-grunge max-w-2xl text-lg text-black md:text-xl">
          Scroll to move through photos — last card opens the full gallery on{' '}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline text-link-hover no-grunge"
          >
            @_n.k.r_creation
          </a>
          .
        </span>
      </div>

      <div className="pt-10 w-full photo-carousel-bleed md:pt-16">
        <PhotographyCarousel slides={photographySlides} />
      </div>

      <a
        href="#my-designs"
        className="btn-interactive no-grunge relative z-20 mx-8 mt-4 inline-flex rounded-lg border border-black bg-white px-4 py-2 text-base text-black shadow-[3px_3px_0_0_#000] sm:text-lg md:mx-24"
      >
        My template designs ↓
      </a>
    </section>
  )
}

export default OtherWorks
