/** 2026 portfolio content — sourced from live profiles + current site copy. */

export const P26_NAME = 'NISHANTH K R'
export const P26_HANDLE = 'NKR'
export const P26_YEAR = '2026'

export const P26_TAGLINE =
  'Son of a farmer · Always a farmer · Brand · UI/UX · Frontend'

export const P26_MISSION =
  'From soil to screen — I build identities, interfaces, and digital products that feel rooted and modern.'

export const P26_LINKS = {
  linkedin: 'https://www.linkedin.com/in/nishanth-k-r-107895258',
  github: 'https://github.com/Nishanth1409',
  x: 'https://x.com/Nkr1409',
  instagram: 'https://www.instagram.com/_mr.nishanth.k.r',
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

/** Scroll chapters: Launch → Success narrative */
export const P26_CHAPTERS = [
  {
    id: 'launch',
    index: '01',
    title: 'Launch',
    kicker: 'The beginning',
    body: 'Every craft starts somewhere. Mine started in Karnataka fields — then spilled into pixels, prototypes, and products.',
  },
  {
    id: 'roots',
    index: '02',
    title: 'Roots',
    kicker: 'Who I am',
    body: 'Computer Science & Design · PESITM. Growing into UX and brand systems. Photography keeps my eye honest.',
  },
  {
    id: 'craft',
    index: '03',
    title: 'Craft',
    kicker: 'How I build',
    body: 'Logos, templates, invitation systems, UI/UX, and frontend with React & Next.js — shipped with care at affordable rates.',
  },
  {
    id: 'work',
    index: '04',
    title: 'Work',
    kicker: 'Selected builds',
    body: 'From ProtoRev brands to Happy Journey, NyayaSakhi AI, BhaavChitra, and Swaad Sanchalan — design meeting engineering.',
  },
  {
    id: 'success',
    index: '05',
    title: 'Success',
    kicker: 'Where it lands',
    body: 'Remote design & frontend with ProtoRev Digital & ProtoRev 3D. Open for commissions, edits, and collaborations.',
  },
  {
    id: 'connect',
    index: '06',
    title: 'Connect',
    kicker: 'Next chapter',
    body: 'Let’s build something that lasts — brand, product, or a single invitation that feels unforgettable.',
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

export const P26_PROJECTS = [
  {
    title: 'ProtoRev Digital & 3D',
    role: 'Frontend · Brand · Social',
    href: P26_LINKS.protorevDigital,
    tone: 0,
  },
  {
    title: 'Happy Journey',
    role: 'AI Travel · Full-stack',
    href: P26_LINKS.happyJourney,
    tone: 1,
  },
  {
    title: 'NyayaSakhi AI',
    role: 'Legal aid · Multilingual',
    href: P26_LINKS.nyayaSakhi,
    tone: 2,
  },
  {
    title: 'BhaavChitra',
    role: 'Sentiment · SME insights',
    href: P26_LINKS.bhaavchitra,
    tone: 3,
  },
  {
    title: 'Swaad Sanchalan',
    role: 'Restaurant systems',
    href: P26_LINKS.swaad,
    tone: 4,
  },
] as const

/**
 * Placeholder media slots — swap `src` / `type` to real video later.
 * Keep lightweight for local/dev; replace with MP4/WebM when ready.
 */
export type P26MediaSlot = {
  id: string
  label: string
  /** 'placeholder' now; set to 'video' + videoSrc when assets arrive */
  type: 'placeholder' | 'video'
  videoSrc?: string
  posterHint: string
}

export const P26_MEDIA_SLOTS: P26MediaSlot[] = [
  {
    id: 'm-launch',
    label: 'Launch reel',
    type: 'placeholder',
    posterHint: 'Field light → first UI',
  },
  {
    id: 'm-craft',
    label: 'Craft reel',
    type: 'placeholder',
    posterHint: 'Figma frames → code',
  },
  {
    id: 'm-work',
    label: 'Work reel',
    type: 'placeholder',
    posterHint: 'Product surfaces',
  },
  {
    id: 'm-success',
    label: 'Success reel',
    type: 'placeholder',
    posterHint: 'Shipped moments',
  },
]
