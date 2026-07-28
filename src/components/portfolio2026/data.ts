/** 2026 cinematic portfolio — nature cycle · craft · lens · builds */

export const P26_NAME = 'NISHANTH K R'
export const P26_HANDLE = 'NKR'
export const P26_YEAR = '2026'

export const P26_TAGLINE =
  'Son of a farmer · Always a farmer · Creative thinker · Brand · UI/UX · Lens · Frontend'

export const P26_MISSION =
  'I watch light the way farmers watch seasons — then turn that honesty into brands, interfaces, photographs, and products.'

export const P26_LINKS = {
  linkedin: 'https://www.linkedin.com/in/nishanth-k-r-107895258',
  github: 'https://github.com/Nishanth1409',
  x: 'https://x.com/Nkr1409',
  instagram: 'https://www.instagram.com/_mr.nishanth.k.r',
  instagramCreation: 'https://www.instagram.com/_n.k.r_creation',
  linktree: 'https://linktr.ee/Nkr14',
  email: 'mailto:nishanthkr1409@gmail.com',
  drive: 'https://drive.google.com/drive/folders/1qB1l4XnyGl3gSpLZq3BM7o1pzGNs0DRQ?usp=sharing',
  protorevDigital: 'https://www.protorevdigital.com/',
  protorev3d: 'https://www.protorev3d.com/',
  happyJourney: 'https://happy-journy.vercel.app/',
  nyayaSakhi: 'https://nyayasakhi-ai.vercel.app/',
  bhaavchitra: 'https://github.com/violetto-rose/bhaavchitra',
  swaad: 'https://github.com/violetto-rose/swaad-sanchalan',
} as const

const PHOTO = '/images/Photography'
const DESIGN = '/images/designs'

/** Real photography — Instagram / field eye */
export const P26_PHOTOS = [
  {
    src: `${PHOTO}/IMG_20210918_182748.jpg`,
    alt: 'Evening light — Karnataka',
    phase: 'sunrise',
  },
  {
    src: `${PHOTO}/IMG_20210918_183701.jpg`,
    alt: 'Portrait study',
    phase: 'day',
  },
  {
    src: `${PHOTO}/IMG_20211021_205036.jpg`,
    alt: 'Wide landscape',
    phase: 'sunset',
  },
  {
    src: `${PHOTO}/IMG_20230920_093152.jpg`,
    alt: 'Morning outdoor',
    phase: 'sunrise',
  },
  {
    src: `${PHOTO}/IMG_20250531_100841.jpg`,
    alt: 'Vertical composition',
    phase: 'moonrise',
  },
  {
    src: `${PHOTO}/IMG_20250531_101435.jpg`,
    alt: 'Street moment',
    phase: 'day',
  },
  {
    src: `${PHOTO}/redmi10promax.jpg`,
    alt: 'Sky and horizon',
    phase: 'sunset',
  },
  {
    src: `${PHOTO}/ZVE04401.jpg`,
    alt: 'Natural light portrait',
    phase: 'moonrise',
  },
  {
    src: `${PHOTO}/ZVE04450.jpg`,
    alt: 'Soft portrait',
    phase: 'night',
  },
  {
    src: `${PHOTO}/2.jpg`,
    alt: 'Candid frame',
    phase: 'moonset',
  },
  {
    src: `${PHOTO}/ZVE06018-2.jpg`,
    alt: 'Field study',
    phase: 'day',
  },
] as const

/** Design / invite work — Instagram craft + Drive */
export const P26_DESIGNS = [
  {
    src: `${DESIGN}/${encodeURIComponent('AI tool Exhibition invitations.png')}`,
    title: 'AI Exhibition Invite',
  },
  {
    src: `${DESIGN}/${encodeURIComponent('CSD 2026.png')}`,
    title: 'CSD 2026',
  },
  {
    src: `${DESIGN}/${encodeURIComponent('CSD 2027.png')}`,
    title: 'CSD 2027',
  },
  {
    src: `${DESIGN}/${encodeURIComponent('BhaavChitra .png')}`,
    title: 'BhaavChitra Visual',
  },
  {
    src: `${DESIGN}/${encodeURIComponent('Radiant Tournament.png')}`,
    title: 'Radiant Tournament',
  },
  {
    src: `${DESIGN}/${encodeURIComponent('tug of war.png')}`,
    title: 'Tug of War',
  },
  {
    src: `${DESIGN}/${encodeURIComponent('invitation.png')}`,
    title: 'Invitation system',
  },
  {
    src: `${DESIGN}/1.jpg`,
    title: 'Brand frame',
  },
] as const

/**
 * Celestial chapters — scroll = a day in nature.
 * Sunrise → Day → Golden → Sunset → Moonrise → Night → Moonset
 */
export const P26_CHAPTERS = [
  {
    id: 'sunrise',
    index: '01',
    sky: 'Sunrise',
    title: 'Sunrise',
    kicker: 'The field wakes',
    body: 'Light finds the soil first. I grew up watching that — then learned to chase the same honesty in design and code.',
  },
  {
    id: 'day',
    index: '02',
    sky: 'Daylight',
    title: 'Roots',
    kicker: 'Who I am under the sun',
    body: 'Computer Science & Design · PESITM · Karnataka. A farmer’s son building brand systems, UI/UX, and frontend — still reading the land for rhythm.',
  },
  {
    id: 'golden',
    index: '03',
    sky: 'Golden hour',
    title: 'Craft',
    kicker: 'When light turns warm',
    body: 'Logos, templates, invitation systems, social kits — Figma & Canva to React & Next.js. Affordable commissions, careful craft.',
  },
  {
    id: 'sunset',
    index: '04',
    sky: 'Sunset',
    title: 'Builds',
    kicker: 'Work that lands',
    body: 'Happy Journey, NyayaSakhi AI, BhaavChitra, Swaad Sanchalan, ProtoRev Digital & 3D — products where design meets engineering.',
  },
  {
    id: 'moonrise',
    index: '05',
    sky: 'Moonrise',
    title: 'Lens',
    kicker: 'Seeing after the sun',
    body: 'Photography keeps my eye honest. Scroll my frames — then open Instagram for the full gallery and daily craft.',
  },
  {
    id: 'night',
    index: '06',
    sky: 'Night',
    title: 'Bloom',
    kicker: 'Where it settles',
    body: 'Remote design & frontend with ProtoRev. Open for edits, commissions, collaborations — brands that feel rooted and modern.',
  },
  {
    id: 'moonset',
    index: '07',
    sky: 'Moonset',
    title: 'Connect',
    kicker: 'Before the next dawn',
    body: 'Let’s build something that lasts — a brand, a product, a photograph, or one invitation that feels unforgettable.',
  },
] as const

export const P26_STACK = [
  'Figma',
  'Canva',
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind',
  'Firebase',
  'Supabase',
  'Three.js',
  'Photography',
] as const

export const P26_PROJECTS = [
  {
    title: 'ProtoRev Digital & 3D',
    role: 'Frontend · Brand · Social',
    href: P26_LINKS.protorevDigital,
    blurb: 'Web presence, identity, and social systems for digital & 3D printing brands.',
  },
  {
    title: 'Happy Journey',
    role: 'AI Travel · Full-stack',
    href: P26_LINKS.happyJourney,
    blurb: 'AI itineraries, budget logic, maps — travel planning for Indian destinations.',
  },
  {
    title: 'NyayaSakhi AI',
    role: 'Legal aid · Multilingual',
    href: P26_LINKS.nyayaSakhi,
    blurb: 'Generative legal guidance for rural women — voice, chat, document clarity.',
  },
  {
    title: 'BhaavChitra',
    role: 'Sentiment · SME insights',
    href: P26_LINKS.bhaavchitra,
    blurb: 'Feedback sentiment analysis that turns emotion into actionable insight.',
  },
  {
    title: 'Swaad Sanchalan',
    role: 'Restaurant systems',
    href: P26_LINKS.swaad,
    blurb: 'Menus, reservations, billing, and sales — operations in one flow.',
  },
] as const

/** Sky color keyframes for DOM + Three fog (progress 0→1) */
export type SkyStop = {
  t: number
  top: string
  mid: string
  bottom: string
  fog: number
  glow: string
  label: string
}

export const P26_SKY_STOPS: SkyStop[] = [
  {
    t: 0,
    top: '#1b1438',
    mid: '#ff7a45',
    bottom: '#ffd29a',
    fog: 0x3a2040,
    glow: 'rgba(255, 140, 70, 0.45)',
    label: 'Sunrise',
  },
  {
    t: 0.14,
    top: '#3d7eb8',
    mid: '#9fd4f0',
    bottom: '#f7e8c8',
    fog: 0x7aa8c8,
    glow: 'rgba(255, 220, 140, 0.25)',
    label: 'Daylight',
  },
  {
    t: 0.32,
    top: '#2a5688',
    mid: '#f0a050',
    bottom: '#e86840',
    fog: 0xc88858,
    glow: 'rgba(255, 160, 70, 0.4)',
    label: 'Golden hour',
  },
  {
    t: 0.48,
    top: '#1a2048',
    mid: '#d45a35',
    bottom: '#4a1e35',
    fog: 0x582838,
    glow: 'rgba(220, 90, 50, 0.35)',
    label: 'Sunset',
  },
  {
    t: 0.62,
    top: '#080c1c',
    mid: '#1a2850',
    bottom: '#2a1845',
    fog: 0x0c1024,
    glow: 'rgba(180, 200, 255, 0.18)',
    label: 'Moonrise',
  },
  {
    t: 0.78,
    top: '#03050c',
    mid: '#0a1020',
    bottom: '#12101c',
    fog: 0x05070e,
    glow: 'rgba(140, 160, 220, 0.12)',
    label: 'Night',
  },
  {
    t: 1,
    top: '#0a0c1a',
    mid: '#1a1835',
    bottom: '#3a2850',
    fog: 0x140e22,
    glow: 'rgba(255, 170, 120, 0.15)',
    label: 'Moonset',
  },
]
