/** Figma prototype links (portfolio file removed) */
export const FIGMA_PROJECT_LINKS = {
  whatsapp:
    'https://www.figma.com/proto/gwOjKoUKr6jarhEMV9q4g9?node-id=0-1&t=hd3xr6x9vo2gFuDA-6',
  zepto:
    'https://www.figma.com/proto/QLLaNhspvkK8oy6CFbjp2J?node-id=0-1&t=hd3xr6x9vo2gFuDA-6',
  instagram:
    'https://www.figma.com/proto/C4Rzntyqnsr2PN3ImdpEDs?node-id=0-1&t=hd3xr6x9vo2gFuDA-6',
  google:
    'https://www.figma.com/proto/75flaOsr4MBHszdq9bVXJz?node-id=0-1&t=hd3xr6x9vo2gFuDA-6',
  tripadvisor:
    'https://www.figma.com/proto/oPgBbHCIc8kmpejjoDwdwn?node-id=0-1&t=hd3xr6x9vo2gFuDA-6',
  dashboard:
    'https://www.figma.com/proto/KygauuT0LpgAYOynxLeYEE?node-id=0-1&t=hd3xr6x9vo2gFuDA-6',
} as const

const FIGMA_DIR = '/images/figma/logos'

export const FIGMA_PROJECT_IMAGES = {
  figma: `${FIGMA_DIR}/portfolio.svg`,
  whatsapp: `${FIGMA_DIR}/whatsapp.svg`,
  instagram: `${FIGMA_DIR}/instagram.svg`,
  google: `${FIGMA_DIR}/google.svg`,
  tripadvisor: `${FIGMA_DIR}/tripadvisor.svg`,
  zepto: `${FIGMA_DIR}/zepto.svg`,
  dashboard: `${FIGMA_DIR}/dashboard.svg`,
} as const

/** Scroll / cube order: Figma → WhatsApp → Instagram → Google → TripAdvisor → Zepto → Dashboard */
export const FIGMA_CUBE_PROJECT_KEYS = [
  'figma',
  'whatsapp',
  'instagram',
  'google',
  'tripadvisor',
  'zepto',
  'dashboard',
] as const satisfies ReadonlyArray<keyof typeof FIGMA_PROJECT_IMAGES>

export type FigmaProjectKey = (typeof FIGMA_CUBE_PROJECT_KEYS)[number]

export type FigmaCubeScene = {
  id: string
  name: string
  subtitle: string
  body: string
  link: string | null
  imageKey: FigmaProjectKey
  cardAlign: 'left' | 'right'
}

export const FIGMA_SECTION_INTRO = {
  title: 'Figma',
  subtitle: 'UI/UX prototypes and learning screens.',
  description:
    'Scroll to rotate through recreated app screens — each stop opens its prototype in Figma.',
}

export const FIGMA_CUBE_SCENES: FigmaCubeScene[] = [
  {
    id: 's0',
    name: 'My Works in Figma',
    subtitle: 'UI/UX learning prototypes',
    body: 'Scroll to rotate the cube — each face is a recreated app screen built in Figma for layout and component practice.',
    link: null,
    imageKey: 'figma',
    cardAlign: 'left',
  },
  {
    id: 's1',
    name: 'WhatsApp UI',
    subtitle: 'Mobile chat layout',
    body: 'WhatsApp-style screens — message list, chat bubbles, and mobile spacing practice.',
    link: FIGMA_PROJECT_LINKS.whatsapp,
    imageKey: 'whatsapp',
    cardAlign: 'right',
  },
  {
    id: 's2',
    name: 'Instagram',
    subtitle: 'Social feed UI',
    body: 'Feed, stories, and profile layouts — studying visual hierarchy and component rhythm.',
    link: FIGMA_PROJECT_LINKS.instagram,
    imageKey: 'instagram',
    cardAlign: 'left',
  },
  {
    id: 's3',
    name: 'Google Search',
    subtitle: 'Search interface',
    body: 'Home and results screens — minimal UI patterns from a familiar product.',
    link: FIGMA_PROJECT_LINKS.google,
    imageKey: 'google',
    cardAlign: 'right',
  },
  {
    id: 's4',
    name: 'TripAdvisor',
    subtitle: 'Travel discovery',
    body: 'Destination cards, ratings, and browse flows for a travel app concept.',
    link: FIGMA_PROJECT_LINKS.tripadvisor,
    imageKey: 'tripadvisor',
    cardAlign: 'left',
  },
  {
    id: 's5',
    name: 'Zepto Cafe',
    subtitle: 'Quick-commerce flow',
    body: 'Zepto Cafe product listing, cart, and checkout patterns in a clickable prototype.',
    link: FIGMA_PROJECT_LINKS.zepto,
    imageKey: 'zepto',
    cardAlign: 'right',
  },
  {
    id: 's6',
    name: 'Dashboard',
    subtitle: 'Admin panel',
    body: 'Charts, tables, and sidebar navigation — data-heavy dashboard UI practice.',
    link: FIGMA_PROJECT_LINKS.dashboard,
    imageKey: 'dashboard',
    cardAlign: 'left',
  },
]

/** Physical faces: top, front, right, back, left, bottom */
export const FIGMA_CUBE_FACE_KEYS: FigmaProjectKey[] = [
  'figma',
  'whatsapp',
  'instagram',
  'google',
  'tripadvisor',
  'zepto',
]

/**
 * Which face index faces the viewer at each scroll stop (matches buildStops rotation).
 * Stop 6 (Dashboard) reuses the front face — same orientation as stop 1.
 */
export const CUBE_FORWARD_FACE_BY_STOP = [0, 1, 2, 3, 4, 5, 1] as const

/** Stable logos: fixed on each face; only the forward face swaps for stop 6 (Dashboard). */
export const faceImagesForCubeStop = (stop: number): string[] => {
  const clamped = Math.min(
    FIGMA_CUBE_SCENES.length - 1,
    Math.max(0, Math.round(stop)),
  )
  const images = FIGMA_CUBE_FACE_KEYS.map((key) => FIGMA_PROJECT_IMAGES[key])
  const forward = CUBE_FORWARD_FACE_BY_STOP[clamped]
  const key = FIGMA_CUBE_SCENES[clamped].imageKey
  images[forward] = FIGMA_PROJECT_IMAGES[key]
  return images
}

/** Snap image stop at half-step so logos do not flicker mid-turn */
export const stableImageStopFromSegment = (
  segmentT: number,
  maxStop: number,
): number => {
  if (segmentT >= maxStop - 0.5) return maxStop
  return Math.min(maxStop, Math.max(0, Math.round(segmentT)))
}

const FRONT_FACE = 1

/**
 * Per-frame face logos.
 * Front face is shared by WhatsApp (stop 1) and Dashboard (stop 6).
 * WhatsApp only at stop 1; Dashboard when turning Zepto→Dashboard and when
 * TripAdvisor→Zepto (front face peeks during the tilt).
 */
export const faceImagesForSegment = (segmentT: number): string[] => {
  const maxStop = FIGMA_CUBE_SCENES.length - 1
  const images = FIGMA_CUBE_FACE_KEYS.map((key) => FIGMA_PROJECT_IMAGES[key])

  const settled = stableImageStopFromSegment(segmentT, maxStop)
  const settledForward = CUBE_FORWARD_FACE_BY_STOP[settled]
  images[settledForward] =
    FIGMA_PROJECT_IMAGES[FIGMA_CUBE_SCENES[settled].imageKey]

  const base = Math.floor(segmentT)
  const frac = segmentT - base

  if (frac > 0.04 && base < maxStop) {
    const next = base + 1
    const nextForward = CUBE_FORWARD_FACE_BY_STOP[next]
    images[nextForward] =
      FIGMA_PROJECT_IMAGES[FIGMA_CUBE_SCENES[next].imageKey]
  }

  const turningToDashboard =
    settled === maxStop || segmentT >= 5.02 || (base === 5 && frac > 0.04)

  // TripAdvisor → Zepto: front face peeks in — show Dashboard, not WhatsApp
  const tripadvisorToZepto = segmentT > 4 && segmentT < 5.02

  if (turningToDashboard || tripadvisorToZepto) {
    images[FRONT_FACE] = FIGMA_PROJECT_IMAGES.dashboard
  } else if (settled === 1 || (base === 0 && frac > 0.04)) {
    images[FRONT_FACE] = FIGMA_PROJECT_IMAGES.whatsapp
  }

  return images
}

export const imageForProjectKey = (key: FigmaProjectKey) =>
  FIGMA_PROJECT_IMAGES[key]
