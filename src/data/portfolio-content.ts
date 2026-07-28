/** Shared copy and links — home + archive routes (archives keep their own UI themes). */

export const PORTFOLIO_NAME = 'NISHANTH K R'

export const PORTFOLIO_TAGLINE =
  'Son of a farmer · Always a farmer · UI/UX · Logos · Templates · Invites · Frontend'

export const PORTFOLIO_INTRO_PARAGRAPHS = [
  "I'm a Computer Science and Design student from Karnataka, India — rooted in the land, building in design and code.",
  'I design across UI/UX, brand and visual identity — logos, templates, invitation cards (print and digital) — plus frontend with React and Next.js. Photography is part of how I see and shape stories.',
  'Open for client edits and commissions at affordable rates. Feel free to ask anytime — email or DM.',
] as const

export const PORTFOLIO_TECHNOLOGIES = [
  'Canva',
  'Figma',
  'HTML & CSS',
  'JavaScript',
  'React',
  'Next.js',
  'Firebase',
  'Supabase',
  'Tailwind',
] as const

/** Main Instagram — older creative work also linked from that profile */
export const INSTAGRAM_URL = 'https://www.instagram.com/_mr.nishanth.k.r'

export const MY_DESIGNS_DRIVE_URL =
  'https://drive.google.com/drive/folders/1qB1l4XnyGl3gSpLZq3BM7o1pzGNs0DRQ?usp=sharing'

/** Public repos (collaborative — under violetto-rose, not Nishanth1409/*) */
export const BHAAVCHITRA_GITHUB_URL = 'https://github.com/violetto-rose/bhaavchitra'
export const SWAAD_SANCHALAN_GITHUB_URL =
  'https://github.com/violetto-rose/swaad-sanchalan'

export const EXPERIENCE_SECTION = {
  heading: 'Experience',
  meta: 'Remote · 2025 - Present',
  title: 'ProtoRev Digital & ProtoRev 3D',
  subtitle: 'Frontend · Brand Design · Logos · Templates · Social',
  time: '2025 - Present',
  category: 'Design & Frontend',
  description:
    'Contributing to ProtoRev Digital and ProtoRev 3D across web presence, visual identity, and social content — frontend layouts, logos, templates, invitation-style creatives, and consistent brand execution for digital services and 3D printing.',
  details: [
    'Plan and design frontend layouts for protorevdigital.com and protorev3d.com, aligning structure, typography, and UI flow with each brand’s goals.',
    'Create logos, reusable templates, invitation-style graphics, and marketing visuals used across Instagram and other channels.',
    'Handle social media planning and posting—coordinating content calendars, captions, and on-brand graphics for both companies.',
    'Produce design templates and asset kits so the teams can ship campaigns and web updates faster with a unified look.',
  ],
  stack: {
    design: ['Figma', 'Canva'],
    frontend: ['Next.js', 'Tailwind CSS'],
  },
  links: [
    { label: 'ProtoRev Digital', href: 'https://www.protorevdigital.com/' },
    { label: 'ProtoRev 3D', href: 'https://www.protorev3d.com/' },
  ],
} as const

export type ArchiveCarouselProject = {
  id: number
  title: string
  description: string
  image: string[]
  link: string
  technologies: string[]
}

/** Archive2024 projects carousel only — main site keeps full project list separately */
export const ARCHIVE_PROJECTS: ArchiveCarouselProject[] = [
  {
    id: 1,
    title: 'BhaavChitra',
    description:
      'BhaavChitra is a sentiment analysis system designed for feedback analysis, primarily for SMEs, providing key insights into how a product or service is performing.',
    image: [
      '/images/BhaavChitra.webp',
      '/images/bhaavchitra-hero.webp',
      '/images/bhaavchitra-service.webp',
    ],
    link: BHAAVCHITRA_GITHUB_URL,
    technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'Flask', 'MongoDB'],
  },
  {
    id: 2,
    title: 'Swaad Sanchalan',
    description:
      'Swaad Sanchalan is a comprehensive restaurant management system that streamlines operations, including menu management, reservations, billing, and sales reporting.',
    image: [
      '/images/Swaad-Sanchalan.webp',
      '/images/swaad-sanchalan-hero.webp',
      '/images/swaad-sanchalan-dash.webp',
    ],
    link: SWAAD_SANCHALAN_GITHUB_URL,
    technologies: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'PHP', 'MySQL'],
  },
]

export const PHOTOGRAPHY_ARCHIVE_FILES = [
  'IMG_20210918_182748.jpg',
  'IMG_20250531_101435.jpg',
  'IMG_20230920_093152.jpg',
  'ZVE04401.jpg',
  'ZVE04450.jpg',
  '2.jpg',
] as const

export const DESIGN_ARCHIVE_FILES = [
  'AI tool Exhibition invitations.png',
  'CSD 2026.png',
  'CSD 2027.png',
  'BhaavChitra .png',
  'Radiant Tournament.png',
  'tug of war.png',
] as const

export const CONTACT_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nishanth-k-r-107895258',
  },
  { name: 'GitHub', href: 'https://github.com/Nishanth1409' },
  { name: 'X', href: 'https://x.com/Nkr1409' },
  { name: 'Instagram', href: INSTAGRAM_URL },
  { name: 'Linktree', href: 'https://linktr.ee/Nkr14' },
  { name: 'Email', href: 'mailto:nishanthkr1409@gmail.com' },
] as const

export const CONTACT_AVAILABILITY =
  'Open for client edits & commissions (logos, templates, invitation cards, UI/UX, digital invites) at affordable rates. Feel free to ask — email or Instagram DM.'

export const ARCHIVE_PORTFOLIO_LINKS = [
  { name: 'Current Portfolio', href: '/', calm: false },
  { name: '2025 Portfolio', href: '/archive2025', calm: true },
  { name: '2023 Portfolio', href: '/archive2023', calm: false },
] as const
