/** NKR 2026 — portfolio content from GitHub + uploaded public assets only */

export const P26_NAME = 'NISHANTH K R'
export const P26_MARK = 'NKR'
export const P26_YEAR = '2026'

export const P26_LINE =
  'UI/UX · Brand · Frontend · Photography — Karnataka'

export const P26_INTRO =
  'I design brands and build products — from invitation systems to full-stack apps. Open for commissions and collaborations.'

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
} as const

const PHOTO = '/images/Photography'
const DESIGN = '/images/designs'
const enc = (f: string) =>
  `${DESIGN}/${f.split('/').map((p) => encodeURIComponent(p)).join('/')}`

/** Uploaded photography only — no generated placeholders */
export const P26_PHOTOS = [
  { src: `${PHOTO}/IMG_20210918_182748.jpg`, alt: 'Evening light' },
  { src: `${PHOTO}/IMG_20211021_205036.jpg`, alt: 'Landscape' },
  { src: `${PHOTO}/IMG_20230920_093152.jpg`, alt: 'Outdoor' },
  { src: `${PHOTO}/IMG_20250531_100841.jpg`, alt: 'Composition' },
  { src: `${PHOTO}/IMG_20250531_101435.jpg`, alt: 'Street' },
  { src: `${PHOTO}/redmi10promax.jpg`, alt: 'Horizon' },
  { src: `${PHOTO}/ZVE04401.jpg`, alt: 'Portrait' },
  { src: `${PHOTO}/ZVE04450.jpg`, alt: 'Natural light' },
  { src: `${PHOTO}/2.jpg`, alt: 'Candid' },
  { src: `${PHOTO}/ZVE06018-2.jpg`, alt: 'Field study' },
] as const

/** Uploaded design / invite work (Drive + Instagram craft) */
export const P26_DESIGNS = [
  { src: enc('AI tool Exhibition invitations.png'), title: 'AI Exhibition Invite' },
  { src: enc('CSD 2026.png'), title: 'CSD 2026' },
  { src: enc('CSD 2027.png'), title: 'CSD 2027' },
  { src: enc('BhaavChitra .png'), title: 'BhaavChitra' },
  { src: enc('Radiant Tournament.png'), title: 'Radiant Tournament' },
  { src: enc('tug of war.png'), title: 'Tug of War' },
  { src: enc('invitation.png'), title: 'Invitation' },
  { src: enc('1.jpg'), title: 'Brand frame' },
  { src: enc('1 (2).jpg'), title: 'Visual' },
  { src: enc('et.png'), title: 'Event graphic' },
] as const

/**
 * Hero media for 3D — max 4 uploaded images (smooth, not cluttered).
 * One focal plane at a time in the scene.
 */
export const P26_SCENE_IMAGES = [
  P26_PHOTOS[0].src,
  P26_PHOTOS[1].src,
  P26_DESIGNS[0].src,
  P26_PHOTOS[6].src,
] as const

/** Portfolio chapters — what clients expect, not sky poetry */
export const P26_CHAPTERS = [
  {
    id: 'intro',
    index: '01',
    title: 'NKR',
    nav: 'Intro',
    kicker: 'Portfolio 2026',
    body: P26_INTRO,
  },
  {
    id: 'work',
    index: '02',
    title: 'Work',
    nav: 'Work',
    kicker: 'Selected projects',
    body: 'Products and systems shipped across travel, legal aid, agriculture, brand, and tools — from GitHub and the live web.',
  },
  {
    id: 'craft',
    index: '03',
    title: 'Craft',
    nav: 'Craft',
    kicker: 'Design systems',
    body: 'Logos, templates, invitation cards, UI kits — Figma, Canva, and frontend execution. More on Drive and Instagram.',
  },
  {
    id: 'lens',
    index: '04',
    title: 'Lens',
    nav: 'Lens',
    kicker: 'Photography',
    body: 'Frames from the field and the street — the same eye that shapes brand and product.',
  },
  {
    id: 'connect',
    index: '05',
    title: 'Connect',
    nav: 'Connect',
    kicker: 'Next',
    body: 'Remote design & frontend · ProtoRev Digital & 3D · open for edits and commissions.',
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
] as const

/** Curated from Nishanth1409 GitHub + collab repos — portfolio-facing only */
export const P26_PROJECTS = [
  {
    title: 'Happy Journey',
    role: 'AI Travel · Full-stack',
    href: 'https://happy-journy.vercel.app/',
    repo: 'https://github.com/Nishanth1409/happy-journy',
    blurb: 'AI itineraries, budget planning, maps — Next.js, Clerk, Firebase.',
  },
  {
    title: 'NyayaSakhi AI',
    role: 'Legal aid · Multilingual',
    href: 'https://nyayasakhi-ai.vercel.app/',
    repo: 'https://github.com/Nishanth1409/nyayasakhi-ai',
    blurb: 'Accessible legal guidance for rural women — chat, voice, documents.',
  },
  {
    title: 'Areca ERP',
    role: 'ERP · Agriculture',
    href: 'https://github.com/Nishanth1409/Areca-ERP',
    repo: 'https://github.com/Nishanth1409/Areca-ERP',
    blurb: 'SRYN arecanut ERP — employees, attendance, loans, finance, PDF reports.',
  },
  {
    title: 'Sryn Mandi',
    role: 'Rates · Live data',
    href: 'https://sryn-mandi.vercel.app',
    repo: 'https://github.com/Nishanth1409/sryn-mandi',
    blurb: 'Live arecanut mandi rates and local agent averages.',
  },
  {
    title: 'ProtoRev Digital & 3D',
    role: 'Frontend · Brand · Social',
    href: P26_LINKS.protorevDigital,
    repo: 'https://github.com/manoj633/protorev3d-ui',
    blurb: 'Web presence, identity, and social systems for ProtoRev brands.',
  },
  {
    title: 'GymWeb',
    role: 'Fitness · Next.js',
    href: 'https://gymweb-sand.vercel.app',
    repo: 'https://github.com/Nishanth1409/gymweb',
    blurb: 'Fitness / gym website built with Next.js.',
  },
  {
    title: 'BhaavChitra',
    role: 'Sentiment · NLP',
    href: 'https://github.com/violetto-rose/bhaavchitra',
    repo: 'https://github.com/violetto-rose/bhaavchitra',
    blurb: 'Sentiment analysis for SME feedback — BERT & VADER.',
  },
  {
    title: 'Swaad Sanchalan',
    role: 'Restaurant systems',
    href: 'https://github.com/violetto-rose/swaad-sanchalan',
    repo: 'https://github.com/violetto-rose/swaad-sanchalan',
    blurb: 'Menus, reservations, billing, and sales reporting.',
  },
  {
    title: 'College Event Management',
    role: 'Events · PHP',
    href: 'https://github.com/Nishanth1409/College-event-management-System',
    repo: 'https://github.com/Nishanth1409/College-event-management-System',
    blurb: 'Student profiles, event discovery, and organizer registration tools.',
  },
  {
    title: 'YouTube Music Float Dock',
    role: 'Chrome extension',
    href: 'https://github.com/Nishanth1409/youtube-music-float-dock',
    repo: 'https://github.com/Nishanth1409/youtube-music-float-dock',
    blurb: 'Float dock, PiP, HQ playback, random play for YouTube Music.',
  },
  {
    title: 'Windhawk Mods',
    role: 'Windows 11',
    href: 'https://windhawk.net/',
    repo: 'https://github.com/Nishanth1409/windhawk-mods',
    blurb: 'Lock screen & wallpaper, tray audio, fullscreen taskbar peek.',
  },
  {
    title: 'BookMyShow UI',
    role: 'React practice',
    href: 'https://bokmyshow1409.vercel.app',
    repo: 'https://github.com/Nishanth1409/REACT-TO-INTOR',
    blurb: 'Movie booking UI practice in React.',
  },
] as const

/** Soft atmosphere only — no labeled “sunrise / moonset” UI */
export const P26_SKY_STOPS = [
  { t: 0, top: '#0c1018', mid: '#2a3548', bottom: '#1a1814', fog: 0x1a2030, glow: 'rgba(200,170,120,0.12)' },
  { t: 0.25, top: '#101828', mid: '#3a4558', bottom: '#221c18', fog: 0x222838, glow: 'rgba(180,160,130,0.1)' },
  { t: 0.5, top: '#0a0e18', mid: '#1c2435', bottom: '#181410', fog: 0x121820, glow: 'rgba(160,150,140,0.08)' },
  { t: 0.75, top: '#080a12', mid: '#141c28', bottom: '#100e0c', fog: 0x0c1018, glow: 'rgba(140,150,180,0.1)' },
  { t: 1, top: '#06080e', mid: '#10141c', bottom: '#0c0a08', fog: 0x080a10, glow: 'rgba(120,130,160,0.08)' },
] as const
