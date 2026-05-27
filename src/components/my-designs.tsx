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
      className="flex relative z-20 flex-col w-full bg-transparent designs-section scroll-mt-4"
    >
      <div className="container flex relative z-20 flex-col gap-2 items-start px-8 py-16 w-full designs-section-copy md:px-24 md:pb-8">
        <span className="text-5xl no-grunge">Designs</span>
        <span className="text-2xl no-grunge">Creative templates and visual concepts.</span>
        <span className="max-w-2xl text-xl no-grunge">
          Scroll to move through posters and invites — last card opens the full{' '}
          <a
            href={MY_DESIGNS_DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline text-link-hover no-grunge"
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
