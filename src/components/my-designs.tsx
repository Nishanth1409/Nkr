'use client'

import { DesignsCarouselCanvas } from './designs-carousel-canvas'
import {
  MY_DESIGN_CAROUSEL_IMAGES,
  MY_DESIGNS_DRIVE_URL,
} from '../data/my-designs-images'

const MyDesigns = () => {
  return (
    <section
      id="my-designs"
      className="designs-section relative z-20 flex w-full flex-col scroll-mt-4 bg-transparent"
    >
      <div className="designs-section-copy container relative z-20 flex w-full flex-col items-start gap-2 px-8 py-16 md:px-24 md:pb-8">
        <span className="no-grunge text-5xl">My Designs</span>
        <span className="no-grunge text-2xl">My template design</span>
        <span className="no-grunge max-w-2xl text-xl">
          Scroll to move through posters and invites — last card opens the full{' '}
          <a
            href={MY_DESIGNS_DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link-hover no-grunge font-medium underline"
          >
            Drive folder
          </a>
          .
        </span>
      </div>

      <DesignsCarouselCanvas
        watermark="Designs"
        images={MY_DESIGN_CAROUSEL_IMAGES}
        moreDesignsUrl={MY_DESIGNS_DRIVE_URL}
      />
    </section>
  )
}

export default MyDesigns
