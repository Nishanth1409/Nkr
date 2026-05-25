/**
 * My Designs carousel — files in public/images/designs/
 * Drive: https://drive.google.com/drive/folders/1qB1l4XnyGl3gSpLZq3BM7o1pzGNs0DRQ?usp=sharing
 *
 * When you add a file to public/images/designs/, add the exact filename here.
 */
export const MY_DESIGNS_DRIVE_URL =
  'https://drive.google.com/drive/folders/1qB1l4XnyGl3gSpLZq3BM7o1pzGNs0DRQ?usp=sharing'

export const DESIGNS_PUBLIC_DIR = '/images/designs'

/** Filenames must match public/images/designs/ exactly (spaces included) */
export const MY_DESIGN_FILES = [
  'AI tool Exhibition invitations.png',
  'BhaavChitra .png',
  'CSD 2026.png',
  'CSD 2027.png',
  'et.png',
  'invitation.png',
  'Radiant Tournament.png',
  'tug of war.png',
  '1.jpg',
  '1 (2).jpg',
  'IMG-20240715-WA0009.jpg',
] as const

/** Final slide — “Click for more designs” card */
export const MORE_DESIGNS_FILE = 'more-designs.jpg'

export const designImageUrl = (file: string) =>
  `${DESIGNS_PUBLIC_DIR}/${file.split('/').map((part) => encodeURIComponent(part)).join('/')}`

export const MY_DESIGN_SLIDES = MY_DESIGN_FILES.map((file) => designImageUrl(file))

export const MORE_DESIGNS_SLIDE = designImageUrl(MORE_DESIGNS_FILE)

/** All carousel textures (designs + more-designs.jpg last) */
export const MY_DESIGN_CAROUSEL_IMAGES = [...MY_DESIGN_SLIDES, MORE_DESIGNS_SLIDE]
