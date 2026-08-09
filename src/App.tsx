import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

type IconName =
  | 'grid'
  | 'folder'
  | 'star'
  | 'users'
  | 'archive'
  | 'settings'
  | 'plus'
  | 'search'
  | 'chevron-down'
  | 'chevron-right'
  | 'chevron-left'
  | 'arrow-right'
  | 'arrow-left'
  | 'sparkles'
  | 'heart'
  | 'calendar'
  | 'map-pin'
  | 'cake'
  | 'building'
  | 'music'
  | 'mic'
  | 'ticket'
  | 'check'
  | 'check-circle'
  | 'more'
  | 'external'
  | 'eye'
  | 'lock'
  | 'globe'
  | 'layers'
  | 'palette'
  | 'layout'
  | 'type'
  | 'image'
  | 'monitor'
  | 'tablet'
  | 'phone'
  | 'undo'
  | 'redo'
  | 'play'
  | 'sliders'
  | 'x'
  | 'grip'
  | 'clock'
  | 'mail'
  | 'edit'
  | 'copy'
  | 'trash'
  | 'link'
  | 'zap'
  | 'info'
  | 'menu'
  | 'sun'

const iconPaths: Record<IconName, ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  folder: <><path d="M3.5 6.5h6l2 2h9v9.8a2.2 2.2 0 0 1-2.2 2.2H5.7a2.2 2.2 0 0 1-2.2-2.2V6.5Z" /><path d="M3.5 9h17" /></>,
  star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />,
  users: <><path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" /><circle cx="10" cy="8" r="3" /><path d="M17 11a3 3 0 1 0-1.2-5.8M20 20v-1.4a3.5 3.5 0 0 0-2.7-3.4" /></>,
  archive: <><path d="M4 7h16v13H4z" /><path d="M3 4h18v3H3zM9 11h6" /></>,
  settings: <><path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" /><path d="m19.4 15 .1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3.1 1.3v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3.1-1.3l-.1.1a1.8 1.8 0 0 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-1.3-3.1h-.2a1.8 1.8 0 0 1 0-3.6h.2a1.8 1.8 0 0 0 1.3-3.1l-.1-.1a1.8 1.8 0 0 1 2.5-2.5l.1.1a1.8 1.8 0 0 0 3.1-1.3v-.2a1.8 1.8 0 0 1 3.6 0v.2a1.8 1.8 0 0 0 3.1 1.3l.1-.1a1.8 1.8 0 0 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 1.3 3.1h.2a1.8 1.8 0 0 1 0 3.6h-.2a1.8 1.8 0 0 0-1.3 3.1Z" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  'chevron-right': <path d="m9 6 6 6-6 6" />,
  'chevron-left': <path d="m15 6-6 6 6 6" />,
  'arrow-right': <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  'arrow-left': <><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></>,
  sparkles: <><path d="m12 3-1.2 4.2L7 8.5l3.8 1.3L12 14l1.2-4.2L17 8.5l-3.8-1.3L12 3Z" /><path d="m19 14-.6 2.4L16 17l2.4.6L19 20l.6-2.4L22 17l-2.4-.6L19 14ZM5 14l-.6 2.4L2 17l2.4.6L5 20l.6-2.4L8 17l-2.4-.6L5 14Z" /></>,
  heart: <path d="M20.8 8.7c0 5.1-8.8 10.3-8.8 10.3S3.2 13.8 3.2 8.7A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.3Z" />,
  calendar: <><rect x="3.5" y="5" width="17" height="16" rx="2" /><path d="M7 3v4M17 3v4M3.5 10h17" /></>,
  'map-pin': <><path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></>,
  cake: <><path d="M4 12.5h16V20H4z" /><path d="M7 12.5V9.8a2 2 0 0 1 4 0v2.7m2 0V9.8a2 2 0 0 1 4 0v2.7M3 20h18M12 4v2M9.5 6.5a2.5 2.5 0 0 1 5 0" /></>,
  building: <><path d="M4 21V5.5L15 3v18M15 9h5v12M7.5 8h2M7.5 12h2M7.5 16h2M17 13h1.5M17 17h1.5M2 21h20" /></>,
  music: <><path d="M9 18V5l10-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="16" cy="16" r="3" /></>,
  mic: <><rect x="8" y="3" width="8" height="12" rx="4" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" /></>,
  ticket: <><path d="M3 7.5A2.5 2.5 0 0 0 5.5 5h13A2.5 2.5 0 0 0 21 7.5v1a2.5 2.5 0 0 0 0 5v1a2.5 2.5 0 0 0-2.5 2.5h-13A2.5 2.5 0 0 0 3 14.5v-1a2.5 2.5 0 0 0 0-5v-1Z" /><path d="M12 7v2M12 11v2M12 15v2" /></>,
  check: <path d="m5 12 4.3 4.3L19 6.7" />,
  'check-circle': <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.6 2.6L16.5 9" /></>,
  more: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /></>,
  external: <><path d="M14 4h6v6M20 4l-9 9" /><path d="M19 14v5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4 19V7a1.5 1.5 0 0 1 1.5-1.5h5" /></>,
  eye: <><path d="M2.8 12s3.2-5 9.2-5 9.2 5 9.2 5-3.2 5-9.2 5-9.2-5-9.2-5Z" /><circle cx="12" cy="12" r="2.2" /></>,
  lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a13.5 13.5 0 0 1 0 18M12 3a13.5 13.5 0 0 0 0 18" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
  palette: <><path d="M12 3a9 9 0 1 0 0 18h1.2a1.8 1.8 0 0 0 1.8-1.8c0-1-.8-1.8-1.8-1.8H12a1.8 1.8 0 0 1 0-3.6h3.5a5.5 5.5 0 0 0 0-11H12Z" /><circle cx="7" cy="10" r=".8" fill="currentColor" stroke="none" /><circle cx="8.5" cy="6.8" r=".8" fill="currentColor" stroke="none" /><circle cx="12" cy="6" r=".8" fill="currentColor" stroke="none" /><circle cx="16" cy="7.5" r=".8" fill="currentColor" stroke="none" /></>,
  layout: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></>,
  type: <><path d="M4 5h16M12 5v14M8 19h8" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8" cy="9" r="1.4" /><path d="m4 17 4.5-4.5 3 3 2.5-2.5L20 17" /></>,
  monitor: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
  tablet: <><rect x="6" y="2.5" width="12" height="19" rx="2" /><path d="M11 18.5h2" /></>,
  phone: <><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 18.5h2" /></>,
  undo: <><path d="M9 7 4 12l5 5" /><path d="M4 12h10a6 6 0 0 1 6 6" /></>,
  redo: <><path d="m15 7 5 5-5 5" /><path d="M20 12H10a6 6 0 0 0-6 6" /></>,
  play: <path d="m8 5 11 7-11 7V5Z" />,
  sliders: <><path d="M4 6h16M4 12h16M4 18h16" /><circle cx="8" cy="6" r="2" fill="var(--surface-2, #1a1b19)" /><circle cx="15" cy="12" r="2" fill="var(--surface-2, #1a1b19)" /><circle cx="10" cy="18" r="2" fill="var(--surface-2, #1a1b19)" /></>,
  x: <><path d="m6 6 12 12M18 6 6 18" /></>,
  grip: <><circle cx="8" cy="7" r="1" fill="currentColor" stroke="none" /><circle cx="16" cy="7" r="1" fill="currentColor" stroke="none" /><circle cx="8" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="8" cy="17" r="1" fill="currentColor" stroke="none" /><circle cx="16" cy="17" r="1" fill="currentColor" stroke="none" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  edit: <><path d="m4 16.5-.8 4.3 4.3-.8L19 8.5 15.5 5 4 16.5Z" /><path d="m13.5 7 3.5 3.5" /></>,
  copy: <><rect x="8" y="8" width="11" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2" /></>,
  trash: <><path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7.1.1l1.4-1.4a5 5 0 0 0-7.1-7.1L10.2 5.8" /><path d="M14 11a5 5 0 0 0-7.1-.1l-1.4 1.4a5 5 0 0 0 7.1 7.1l1.2-1.2" /></>,
  zap: <path d="m13 2-9 11h7l-1 9 9-11h-7l1-9Z" />,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
}

function Icon({ name, size = 18, strokeWidth = 1.7, className = '' }: { name: IconName; size?: number; strokeWidth?: number; className?: string }) {
  return (
    <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  )
}

type EventTypeId = 'wedding' | 'birthday' | 'corporate' | 'festival' | 'party' | 'conference' | 'custom'
type EditorTab = 'structure' | 'design' | 'build'
type Visibility = 'Public' | 'Invités' | 'Privé'

type Page = {
  id: string
  name: string
  slug: string
  description: string
  sections: string[]
  visibility: Visibility
  icon: IconName
  accent?: string
}

type Theme = {
  id: string
  name: string
  eyebrow: string
  description: string
  accent: string
  accentSoft: string
  background: string
  ink: string
  surface: string
  displayFont: string
  bodyFont: string
  layout: 'editorial' | 'airy' | 'grid' | 'compact'
  tags: string[]
  category?: string
  preview?: string
  templateName?: string
}

type Project = {
  id: string
  title: string
  subtitle: string
  eventType: EventTypeId
  date: string
  location: string
  status: 'En cours' | 'Publié' | 'Brouillon'
  progress: number
  initials: string
  thumbClass: string
  themeId: string
  pages: Page[]
  lastEdited: string
  guests?: number
  tagline?: string
  description?: string
  ctaLabel?: string
}

type NewEventDraft = {
  type: EventTypeId
  name: string
  host: string
  date: string
  location: string
  goals: string[]
}

const eventTypes: { id: EventTypeId; label: string; description: string; icon: IconName; color: string }[] = [
  { id: 'wedding', label: 'Mariage', description: 'Raconter votre histoire et accueillir vos invités', icon: 'heart', color: '#e89a83' },
  { id: 'birthday', label: 'Anniversaire', description: 'Une fête personnelle, joyeuse et mémorable', icon: 'cake', color: '#e6b86a' },
  { id: 'corporate', label: 'Entreprise', description: 'Réunir une équipe, une communauté ou des clients', icon: 'building', color: '#92aee7' },
  { id: 'festival', label: 'Festival', description: 'Programmer, orienter et faire vibrer un public', icon: 'music', color: '#c0a1e8' },
  { id: 'party', label: 'Soirée', description: 'Partager les bonnes infos avant le premier morceau', icon: 'sun', color: '#e694b4' },
  { id: 'conference', label: 'Conférence', description: 'Agenda, intervenants, inscription et ressources', icon: 'mic' as IconName, color: '#88cbbf' },
  { id: 'custom', label: 'Autre événement', description: 'Partir d’une base flexible et inventer votre format', icon: 'sparkles', color: '#aaa79e' },
]

const themes: Theme[] = [
  {
    id: 'ivory-ceremony',
    name: 'Ivory Ceremony',
    eyebrow: 'Éditorial doux',
    description: 'Une base lumineuse, sensible et intemporelle.',
    accent: '#c97f68',
    accentSoft: '#f2dfd4',
    background: '#f7f4ee',
    ink: '#272724',
    surface: '#fffdfa',
    displayFont: 'Cormorant Garamond',
    bodyFont: 'DM Sans',
    layout: 'editorial',
    tags: ['Élégant', 'Lumineux'],
    category: 'Éditorial',
    preview: 'editorial',
    templateName: 'The weekend',
  },
  {
    id: 'modern-night',
    name: 'Modern Night',
    eyebrow: 'Contraste précis',
    description: 'Un cadre sombre avec une énergie très contemporaine.',
    accent: '#e0aa68',
    accentSoft: '#44362a',
    background: '#141615',
    ink: '#f4f0e8',
    surface: '#202321',
    displayFont: 'DM Sans',
    bodyFont: 'DM Sans',
    layout: 'grid',
    tags: ['Nocturne', 'Graphique'],
    category: 'Nocturne',
    preview: 'nocturne',
    templateName: 'After dark',
  },
  {
    id: 'terracotta-garden',
    name: 'Terracotta Garden',
    eyebrow: 'Organique solaire',
    description: 'Des formes souples et une palette qui respire l’été.',
    accent: '#ba704f',
    accentSoft: '#f1d1b7',
    background: '#f3eadf',
    ink: '#3d3129',
    surface: '#fffaf1',
    displayFont: 'Playfair Display',
    bodyFont: 'DM Sans',
    layout: 'airy',
    tags: ['Chaleureux', 'Naturel'],
    category: 'Photo',
    preview: 'garden',
    templateName: 'Garden notes',
  },
  {
    id: 'electric-pulse',
    name: 'Electric Pulse',
    eyebrow: 'Énergie événementielle',
    description: 'Une direction vive pour les formats qui veulent bouger.',
    accent: '#a6efbd',
    accentSoft: '#243b32',
    background: '#15171a',
    ink: '#f4f2ec',
    surface: '#22252a',
    displayFont: 'DM Sans',
    bodyFont: 'DM Sans',
    layout: 'compact',
    tags: ['Vibrant', 'Festival'],
    category: 'Coloré',
    preview: 'playful',
    templateName: 'Electric pulse',
  },
  {
    id: 'paper-garden',
    name: 'Paper Garden',
    eyebrow: 'Romantique illustré',
    description: 'Une composition délicate entre papier, fleurs et photographie.',
    accent: '#c77f77',
    accentSoft: '#f0d8d2',
    background: '#f6f2ec',
    ink: '#302b2a',
    surface: '#fffdf8',
    displayFont: 'Playfair Display',
    bodyFont: 'DM Sans',
    layout: 'editorial',
    tags: ['Floral', 'Doux'],
    category: 'Éditorial',
    preview: 'paper',
    templateName: 'Paper & petals',
  },
  {
    id: 'film-stills',
    name: 'Film Stills',
    eyebrow: 'Photo immersive',
    description: 'Une expérience pleine page qui laisse la place aux images.',
    accent: '#ded0a0',
    accentSoft: '#3b3b35',
    background: '#1c1c1a',
    ink: '#f4eee3',
    surface: '#272724',
    displayFont: 'Playfair Display',
    bodyFont: 'DM Sans',
    layout: 'airy',
    tags: ['Photo', 'Cinéma'],
    category: 'Photo',
    preview: 'film',
    templateName: 'Film stills',
  },
  {
    id: 'white-space',
    name: 'White Space',
    eyebrow: 'Minimal typographique',
    description: 'Une architecture nette, calme et très éditoriale.',
    accent: '#cb6c81',
    accentSoft: '#f1e6e4',
    background: '#f8f7f3',
    ink: '#1f2220',
    surface: '#ffffff',
    displayFont: 'DM Sans',
    bodyFont: 'DM Sans',
    layout: 'compact',
    tags: ['Minimal', 'Typo'],
    category: 'Minimal',
    preview: 'minimal',
    templateName: 'White space',
  },
  {
    id: 'sunset-club',
    name: 'Sunset Club',
    eyebrow: 'Fête colorée',
    description: 'Une invitation vive et généreuse pour les événements qui rassemblent.',
    accent: '#f0bd69',
    accentSoft: '#e68b73',
    background: '#f7e8d1',
    ink: '#422b2a',
    surface: '#fff7e8',
    displayFont: 'DM Sans',
    bodyFont: 'DM Sans',
    layout: 'grid',
    tags: ['Coloré', 'Festif'],
    category: 'Coloré',
    preview: 'sunset',
    templateName: 'Sunset club',
  },
]

const goals = [
  { id: 'story', label: 'Présenter notre histoire', icon: 'heart' as IconName },
  { id: 'schedule', label: 'Partager le programme', icon: 'calendar' as IconName },
  { id: 'registration', label: 'Collecter des RSVP / inscriptions', icon: 'ticket' as IconName },
  { id: 'guests', label: 'Gérer les invités', icon: 'users' as IconName },
  { id: 'travel', label: 'Donner les infos pratiques', icon: 'map-pin' as IconName },
  { id: 'gallery', label: 'Publier une galerie', icon: 'image' as IconName },
]

const initialPages: Page[] = [
  { id: 'home', name: 'Accueil', slug: '/', description: 'La première impression de votre événement', sections: ['Navigation', 'Hero événement', 'Date & compte à rebours', 'Appel à l’action', 'Footer'], visibility: 'Public', icon: 'grid', accent: '#df9d89' },
  { id: 'story', name: 'Notre histoire', slug: '/notre-histoire', description: 'Le contexte, les visages et les moments forts', sections: ['En-tête de page', 'Timeline', 'Galerie éditoriale'], visibility: 'Public', icon: 'heart', accent: '#d6a5bc' },
  { id: 'program', name: 'Programme', slug: '/programme', description: 'Les temps forts et les horaires à retenir', sections: ['En-tête de page', 'Agenda par journée', 'Lieux associés'], visibility: 'Public', icon: 'calendar', accent: '#e1b56f' },
  { id: 'venue', name: 'Lieu & accès', slug: '/lieu', description: 'Adresse, carte, transport et recommandations', sections: ['Carte', 'Informations pratiques', 'Hébergements'], visibility: 'Public', icon: 'map-pin', accent: '#9db69c' },
  { id: 'rsvp', name: 'RSVP', slug: '/rsvp', description: 'Une réponse simple pour chaque invité', sections: ['Introduction', 'Formulaire RSVP', 'Confirmation'], visibility: 'Invités', icon: 'ticket', accent: '#b99dde' },
  { id: 'gallery', name: 'Galerie', slug: '/galerie', description: 'Un espace pour partager les images de l’événement', sections: ['En-tête de page', 'Galerie photos', 'Livre d’or'], visibility: 'Public', icon: 'image', accent: '#99b6c9' },
]

const projectSeeds: Project[] = [
  {
    id: 'p-camille-thomas',
    title: 'Camille & Thomas',
    subtitle: 'Mariage',
    eventType: 'wedding',
    date: '12 septembre 2026',
    location: 'Domaine de la Chesnaie',
    status: 'En cours',
    progress: 68,
    initials: 'CT',
    thumbClass: 'thumb-wedding',
    themeId: 'ivory-ceremony',
    pages: initialPages,
    lastEdited: 'il y a 8 min',
    guests: 86,
  },
  {
    id: 'p-summer-sessions',
    title: 'Summer Sessions',
    subtitle: 'Festival',
    eventType: 'festival',
    date: '18 — 20 juillet 2026',
    location: 'Parc des Expositions, Lille',
    status: 'Publié',
    progress: 100,
    initials: 'SS',
    thumbClass: 'thumb-festival',
    themeId: 'electric-pulse',
    pages: [
      { id: 'home', name: 'Accueil', slug: '/', description: 'L’énergie du festival en une page', sections: ['Navigation', 'Hero line-up', 'Billetterie', 'Footer'], visibility: 'Public', icon: 'grid' },
      { id: 'lineup', name: 'Line-up', slug: '/line-up', description: 'Artistes et scènes', sections: ['Artistes', 'Filtres par scène', 'CTA billets'], visibility: 'Public', icon: 'music' },
      { id: 'schedule', name: 'Programme', slug: '/programme', description: 'Horaires et scènes', sections: ['Programme par jour', 'Carte des scènes'], visibility: 'Public', icon: 'calendar' },
      { id: 'tickets', name: 'Billetterie', slug: '/billetterie', description: 'Réserver son pass', sections: ['Types de billets', 'FAQ', 'Formulaire'], visibility: 'Public', icon: 'ticket' },
    ],
    lastEdited: 'hier',
    guests: 2400,
  },
  {
    id: 'p-product-summit',
    title: 'Product Summit',
    subtitle: 'Événement entreprise',
    eventType: 'corporate',
    date: '04 novembre 2026',
    location: 'La Condition Publique, Roubaix',
    status: 'Brouillon',
    progress: 32,
    initials: 'PS',
    thumbClass: 'thumb-corporate',
    themeId: 'modern-night',
    pages: [
      { id: 'home', name: 'Accueil', slug: '/', description: 'La promesse de la journée', sections: ['Navigation', 'Hero conférence', 'Chiffres clés', 'Footer'], visibility: 'Public', icon: 'grid' },
      { id: 'agenda', name: 'Agenda', slug: '/agenda', description: 'Une journée pour apprendre et échanger', sections: ['Sessions', 'Pause déjeuner', 'CTA inscription'], visibility: 'Public', icon: 'calendar' },
      { id: 'speakers', name: 'Intervenants', slug: '/intervenants', description: 'Les voix du summit', sections: ['Grille intervenants', 'Profils dynamiques'], visibility: 'Public', icon: 'users' },
      { id: 'register', name: 'Inscription', slug: '/inscription', description: 'Réserver sa place', sections: ['Formulaire', 'Tarifs', 'Confirmation'], visibility: 'Public', icon: 'ticket' },
    ],
    lastEdited: 'il y a 3 jours',
    guests: 320,
  },
]

function readProjects(): Project[] {
  try {
    const stored = localStorage.getItem('atelier-projects')
    if (stored) return JSON.parse(stored) as Project[]
  } catch {
    // Keep the seeded experience if local storage is unavailable.
  }
  return projectSeeds
}

function formatEventLabel(type: EventTypeId) {
  return eventTypes.find((event) => event.id === type)?.label ?? 'Événement'
}

function pagesForEvent(type: EventTypeId): Page[] {
  const base = initialPages.map((page) => ({ ...page, sections: [...page.sections] }))
  if (type === 'wedding') return base
  if (type === 'birthday') return [
    base[0],
    { id: 'program', name: 'Le programme', slug: '/programme', description: 'Les temps forts de la fête', sections: ['En-tête de page', 'Timeline de la soirée', 'Infos pratiques'], visibility: 'Public', icon: 'calendar', accent: '#e1b56f' },
    { id: 'venue', name: 'Le lieu', slug: '/lieu', description: 'Adresse, carte et accès', sections: ['Carte', 'Accès', 'Hébergements'], visibility: 'Public', icon: 'map-pin', accent: '#9db69c' },
    { id: 'rsvp', name: 'RSVP', slug: '/rsvp', description: 'Confirmer sa présence', sections: ['Introduction', 'Formulaire RSVP', 'Confirmation'], visibility: 'Invités', icon: 'ticket', accent: '#b99dde' },
    { id: 'gifts', name: 'Cadeaux', slug: '/cadeaux', description: 'Partager une liste ou une cagnotte', sections: ['Introduction', 'Liens utiles', 'Message'], visibility: 'Public', icon: 'heart', accent: '#d6a5bc' },
  ]
  if (type === 'festival') return [
    { id: 'home', name: 'Accueil', slug: '/', description: 'L’énergie de l’événement dès l’arrivée', sections: ['Navigation', 'Hero line-up', 'Billetterie', 'Footer'], visibility: 'Public', icon: 'grid' },
    { id: 'lineup', name: 'Line-up', slug: '/line-up', description: 'Artistes et invités', sections: ['Grille dynamique', 'Filtres', 'Profils'], visibility: 'Public', icon: 'music' },
    { id: 'program', name: 'Programme', slug: '/programme', description: 'Horaires et scènes', sections: ['Agenda par jour', 'Carte des scènes'], visibility: 'Public', icon: 'calendar' },
    { id: 'map', name: 'Carte du site', slug: '/carte', description: 'Se repérer sur place', sections: ['Carte interactive', 'Points utiles'], visibility: 'Public', icon: 'map-pin' },
    { id: 'tickets', name: 'Billetterie', slug: '/billetterie', description: 'Pass et réservation', sections: ['Tarifs', 'Formulaire', 'FAQ'], visibility: 'Public', icon: 'ticket' },
  ]
  if (type === 'corporate' || type === 'conference') return [
    { id: 'home', name: 'Accueil', slug: '/', description: 'La promesse de votre événement', sections: ['Navigation', 'Hero événement', 'Chiffres clés', 'Footer'], visibility: 'Public', icon: 'grid' },
    { id: 'agenda', name: 'Agenda', slug: '/agenda', description: 'Les temps forts et sessions', sections: ['Programme', 'Filtres', 'CTA inscription'], visibility: 'Public', icon: 'calendar' },
    { id: 'speakers', name: 'Intervenants', slug: '/intervenants', description: 'Les personnes à découvrir', sections: ['Grille de profils', 'Pages dynamiques'], visibility: 'Public', icon: 'users' },
    { id: 'venue', name: 'Lieu', slug: '/lieu', description: 'Accès, transport et informations', sections: ['Carte', 'Accès', 'FAQ'], visibility: 'Public', icon: 'map-pin' },
    { id: 'register', name: 'Inscription', slug: '/inscription', description: 'Réserver sa place', sections: ['Formulaire', 'Tarifs', 'Confirmation'], visibility: 'Public', icon: 'ticket' },
  ]
  return [
    base[0],
    { id: 'details', name: 'Informations', slug: '/informations', description: 'Tout ce qu’il faut savoir', sections: ['En-tête de page', 'Détails', 'FAQ'], visibility: 'Public', icon: 'info' },
    { id: 'program', name: 'Programme', slug: '/programme', description: 'Les horaires et temps forts', sections: ['Agenda', 'Lieux'], visibility: 'Public', icon: 'calendar' },
    { id: 'register', name: 'Inscription', slug: '/inscription', description: 'Participer à l’événement', sections: ['Formulaire', 'Confirmation'], visibility: 'Public', icon: 'ticket' },
  ]
}

function IconButton({ name, label, onClick, active = false, size = 18 }: { name: IconName; label: string; onClick?: () => void; active?: boolean; size?: number }) {
  return <button type="button" className={`icon-button ${active ? 'is-active' : ''}`} onClick={onClick} aria-label={label} title={label}><Icon name={name} size={size} /></button>
}

function App() {
  const [projects, setProjects] = useState<Project[]>(readProjects)
  const [view, setView] = useState<'dashboard' | 'editor'>('dashboard')
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [editorTab, setEditorTab] = useState<EditorTab>('structure')
  const [showNewEvent, setShowNewEvent] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedPageId, setSelectedPageId] = useState('home')
  const [selectedSection, setSelectedSection] = useState('Hero événement')
  const [themeOverride, setThemeOverride] = useState<string | null>(null)

  const activeProject = projects.find((project) => project.id === activeProjectId) ?? null
  const activeTheme = themes.find((theme) => theme.id === (themeOverride ?? activeProject?.themeId)) ?? themes[0]
  const filteredProjects = projects.filter((project) => `${project.title} ${project.subtitle} ${project.location}`.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    localStorage.setItem('atelier-projects', JSON.stringify(projects))
  }, [projects])

  function openProject(id: string, tab: EditorTab = 'structure') {
    setActiveProjectId(id)
    setSelectedPageId('home')
    setSelectedSection('Hero événement')
    setThemeOverride(null)
    setEditorTab(tab)
    setView('editor')
  }

  function updateActiveProject(updater: (project: Project) => Project) {
    if (!activeProjectId) return
    setProjects((current) => current.map((project) => project.id === activeProjectId ? updater(project) : project))
  }

  function createProject(draft: NewEventDraft) {
    const eventLabel = formatEventLabel(draft.type)
    const title = draft.name.trim() || (draft.type === 'wedding' ? 'Votre mariage' : `Mon ${eventLabel.toLowerCase()}`)
    const initials = title.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'NE'
    const newProject: Project = {
      id: `p-${Date.now()}`,
      title,
      subtitle: eventLabel,
      eventType: draft.type,
      date: draft.date || 'Date à définir',
      location: draft.location || 'Lieu à définir',
      status: 'Brouillon',
      progress: 12,
      initials,
      thumbClass: draft.type === 'festival' ? 'thumb-festival' : draft.type === 'corporate' ? 'thumb-corporate' : draft.type === 'party' ? 'thumb-party' : 'thumb-new',
      themeId: draft.type === 'festival' ? 'electric-pulse' : draft.type === 'corporate' ? 'modern-night' : 'ivory-ceremony',
      pages: pagesForEvent(draft.type),
      lastEdited: 'à l’instant',
      guests: 0,
      tagline: draft.type === 'festival' ? 'Trois jours pour vibrer ensemble.' : draft.type === 'corporate' || draft.type === 'conference' ? 'Une journée pour apprendre et échanger.' : 'Un moment à partager.',
      description: 'Ajoutez quelques mots pour donner le ton de votre événement.',
      ctaLabel: draft.type === 'festival' ? 'Voir le programme' : draft.type === 'corporate' || draft.type === 'conference' ? 'S’inscrire à l’événement' : 'Découvrir l’événement',
    }
    setProjects((current) => [newProject, ...current])
    setShowNewEvent(false)
    setActiveProjectId(newProject.id)
    setSelectedPageId('home')
    setEditorTab('structure')
    setThemeOverride(null)
    setView('editor')
  }

  function addPage() {
    const id = `page-${Date.now()}`
    updateActiveProject((project) => ({
      ...project,
      progress: Math.min(100, project.progress + 3),
      pages: [...project.pages, { id, name: 'Nouvelle page', slug: '/nouvelle-page', description: 'Une nouvelle page à imaginer', sections: ['En-tête de page', 'Contenu', 'Appel à l’action'], visibility: 'Public', icon: 'layers', accent: '#a7b6b0' }],
    }))
    setSelectedPageId(id)
  }

  function updateProjectField(field: 'title' | 'date' | 'location' | 'tagline' | 'description' | 'ctaLabel', value: string) {
    updateActiveProject((project) => ({ ...project, [field]: value, lastEdited: 'à l’instant' }))
  }

  function addSection(sectionName = 'Nouvelle section') {
    updateActiveProject((project) => ({
      ...project,
      pages: project.pages.map((page) => page.id === selectedPageId ? { ...page, sections: [...page.sections, sectionName] } : page),
      progress: Math.min(100, project.progress + 2),
      lastEdited: 'à l’instant',
    }))
    setSelectedSection(sectionName)
  }

  function renamePage(pageId: string) {
    const page = activeProject?.pages.find((item) => item.id === pageId)
    if (!page) return
    const name = window.prompt('Nom de la page', page.name)?.trim()
    if (!name || name === page.name) return
    updateActiveProject((project) => ({ ...project, pages: project.pages.map((item) => item.id === pageId ? { ...item, name } : item), lastEdited: 'à l’instant' }))
  }

  function duplicatePage(pageId: string) {
    updateActiveProject((project) => {
      const index = project.pages.findIndex((page) => page.id === pageId)
      if (index === -1) return project
      const source = project.pages[index]
      const copy: Page = { ...source, id: `page-${Date.now()}`, name: `${source.name} copie`, slug: `${source.slug === '/' ? '/accueil' : source.slug}-copie`, sections: [...source.sections] }
      const pages = [...project.pages]
      pages.splice(index + 1, 0, copy)
      return { ...project, pages, progress: Math.min(100, project.progress + 2), lastEdited: 'à l’instant' }
    })
  }

  function deletePage(pageId: string) {
    if (!activeProject || activeProject.pages.length <= 1 || pageId === 'home') return
    updateActiveProject((project) => ({ ...project, pages: project.pages.filter((page) => page.id !== pageId), progress: Math.max(1, project.progress - 2), lastEdited: 'à l’instant' }))
    if (selectedPageId === pageId) setSelectedPageId('home')
  }

  function movePage(pageId: string, direction: 'up' | 'down') {
    updateActiveProject((project) => {
      const index = project.pages.findIndex((page) => page.id === pageId)
      const target = direction === 'up' ? index - 1 : index + 1
      if (index < 0 || target < 0 || target >= project.pages.length) return project
      const pages = [...project.pages]
      const [page] = pages.splice(index, 1)
      pages.splice(target, 0, page)
      return { ...project, pages, lastEdited: 'à l’instant' }
    })
  }

  function cyclePageVisibility(pageId: string) {
    updateActiveProject((project) => ({ ...project, pages: project.pages.map((page) => {
      if (page.id !== pageId) return page
      const next: Visibility = page.visibility === 'Public' ? 'Invités' : page.visibility === 'Invités' ? 'Privé' : 'Public'
      return { ...page, visibility: next }
    }), lastEdited: 'à l’instant' }))
  }

  function updateSection(sectionName: string, action: 'duplicate' | 'delete' | 'up' | 'down') {
    updateActiveProject((project) => ({
      ...project,
      pages: project.pages.map((page) => {
        if (page.id !== selectedPageId) return page
        const index = page.sections.indexOf(sectionName)
        if (index < 0) return page
        if (action === 'delete' && page.sections.length > 1) return { ...page, sections: page.sections.filter((_, itemIndex) => itemIndex !== index) }
        if (action === 'duplicate') {
          const sections = [...page.sections]
          sections.splice(index + 1, 0, `${sectionName} copie`)
          return { ...page, sections }
        }
        const target = action === 'up' ? index - 1 : index + 1
        if (target < 0 || target >= page.sections.length) return page
        const sections = [...page.sections]
        const [section] = sections.splice(index, 1)
        sections.splice(target, 0, section)
        return { ...page, sections }
      }),
      lastEdited: 'à l’instant',
    }))
  }

  if (view === 'dashboard') {
    return (
      <div className="app-shell">
        <Dashboard
          projects={filteredProjects}
          allProjectsCount={projects.length}
          search={search}
          onSearch={setSearch}
          onNew={() => setShowNewEvent(true)}
          onOpen={openProject}
        />
        {showNewEvent && <NewEventModal onClose={() => setShowNewEvent(false)} onCreate={createProject} />}
      </div>
    )
  }

  if (!activeProject) {
    setView('dashboard')
    return null
  }

  return (
    <div className="app-shell editor-shell" style={{ '--accent': activeTheme.accent, '--accent-soft': activeTheme.accentSoft } as CSSProperties}>
      <Editor
        project={activeProject}
        theme={activeTheme}
        editorTab={editorTab}
        selectedPageId={selectedPageId}
        selectedSection={selectedSection}
        onBack={() => setView('dashboard')}
        onTab={setEditorTab}
        onPage={setSelectedPageId}
        onSection={setSelectedSection}
        onAddPage={addPage}
        onAddSection={addSection}
        onProjectUpdate={updateProjectField}
        onRenamePage={renamePage}
        onDuplicatePage={duplicatePage}
        onDeletePage={deletePage}
        onMovePage={movePage}
        onCyclePageVisibility={cyclePageVisibility}
        onSectionAction={updateSection}
        onTheme={(id) => {
          setThemeOverride(id)
          updateActiveProject((project) => ({ ...project, themeId: id }))
        }}
        onPreview={() => setShowPreview(true)}
        onPublish={() => updateActiveProject((project) => ({ ...project, status: 'Publié', progress: 100 }))}
      />
      {showPreview && <PreviewOverlay project={activeProject} theme={activeTheme} onClose={() => setShowPreview(false)} />}
    </div>
  )
}

function BrandMark() {
  return <div className="brand-mark"><span className="brand-orbit orbit-one" /><span className="brand-orbit orbit-two" /><span className="brand-dot" /></div>
}

function Sidebar({ active = 'projects', onNew, onHome }: { active?: string; onNew: () => void; onHome: () => void }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-topline">
        <div className="brand"><BrandMark /><span>atelier</span><span className="brand-period">.</span></div>
        <IconButton name="chevron-down" label="Changer d’espace" size={15} />
      </div>
      <div className="workspace-switcher">
        <div className="workspace-avatar">M</div>
        <div><strong>Maison Studio</strong><span>Workspace personnel</span></div>
        <Icon name="chevron-down" size={15} />
      </div>
      <button type="button" className="new-project-button" onClick={onNew}><Icon name="plus" size={17} /><span>Nouvel événement</span><span className="shortcut">⌘ N</span></button>
      <div className="sidebar-label">Workspace</div>
      <nav className="sidebar-nav">
        <button type="button" className={active === 'projects' ? 'active' : ''} onClick={onHome}><Icon name="grid" /><span>Tous les projets</span><span className="nav-count">6</span></button>
        <button type="button" className={active === 'favorites' ? 'active' : ''}><Icon name="star" /><span>Favoris</span></button>
        <button type="button" className={active === 'shared' ? 'active' : ''}><Icon name="users" /><span>Partagés avec moi</span></button>
        <button type="button" className={active === 'archive' ? 'active' : ''}><Icon name="archive" /><span>Archive</span></button>
      </nav>
      <div className="sidebar-section-header"><span className="sidebar-label">Dossiers</span><IconButton name="plus" label="Créer un dossier" size={15} /></div>
      <div className="folder-list">
        <button type="button"><Icon name="folder" size={16} /><span>Mariages 2026</span><span className="folder-count">2</span></button>
        <button type="button"><Icon name="folder" size={16} /><span>Événements clients</span><span className="folder-count">3</span></button>
        <button type="button"><Icon name="folder" size={16} /><span>Inspirations</span></button>
      </div>
      <div className="sidebar-bottom">
        <button type="button" className="help-link"><span className="help-badge">?</span><span>Besoin d’aide ?</span></button>
        <button type="button" className="profile-row"><div className="profile-avatar">ML</div><span><strong>Matt L.</strong><small>Propriétaire</small></span><Icon name="more" size={16} /></button>
      </div>
    </aside>
  )
}

function Dashboard({ projects, allProjectsCount, search, onSearch, onNew, onOpen }: { projects: Project[]; allProjectsCount: number; search: string; onSearch: (value: string) => void; onNew: () => void; onOpen: (id: string, tab?: EditorTab) => void }) {
  return (
    <div className="dashboard-layout">
      <Sidebar onNew={onNew} onHome={() => undefined} />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <div className="breadcrumb"><span>Maison Studio</span><Icon name="chevron-right" size={13} /><strong>Projets</strong></div>
            <h1>Vos événements, <em>bien racontés.</em></h1>
            <p>Construisez des expériences qui commencent avant le jour J.</p>
          </div>
          <div className="header-actions">
            <button type="button" className="quiet-button"><Icon name="users" size={16} />Inviter</button>
            <button type="button" className="primary-button" onClick={onNew}><Icon name="plus" size={17} />Nouvel événement</button>
          </div>
        </header>
        <section className="dashboard-hero">
          <div className="hero-copy">
            <span className="eyebrow"><Icon name="sparkles" size={14} />Le studio événementiel</span>
            <h2>Du premier brief<br /><span>au dernier souvenir.</span></h2>
            <p>Structurez votre événement, choisissez une direction et donnez à chaque invité la bonne information au bon moment.</p>
            <button type="button" className="text-button" onClick={onNew}>Créer mon premier événement <Icon name="arrow-right" size={16} /></button>
          </div>
          <div className="hero-orbit-art" aria-hidden="true">
            <div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" /><div className="hero-orbit orbit-c" />
            <div className="hero-art-card art-card-main"><span className="art-label">THE WEEKEND</span><strong>Camille<br /><i>&</i> Thomas</strong><span className="art-date">12 — 09 — 26</span></div>
            <div className="hero-art-card art-card-note"><Icon name="calendar" size={15} /><span>Votre site se construit<br /><b>page par page.</b></span></div>
            <div className="hero-art-card art-card-dot"><span>✦</span></div>
          </div>
        </section>
        <section className="dashboard-toolbar">
          <div className="section-title"><h2>Vos projets</h2><span>{allProjectsCount} événements</span></div>
          <div className="toolbar-actions"><label className="search-field"><Icon name="search" size={16} /><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Rechercher un projet" /></label><button type="button" className="filter-button">Dernière modification <Icon name="chevron-down" size={14} /></button></div>
        </section>
        <section className="project-grid">
          <button type="button" className="new-project-card" onClick={onNew}><span className="new-card-icon"><Icon name="plus" size={21} /></span><strong>Créer un événement</strong><span>Commencer avec un kit ou une page blanche</span></button>
          {projects.map((project) => <ProjectCard key={project.id} project={project} onOpen={onOpen} />)}
        </section>
        <section className="dashboard-footnote"><Icon name="info" size={15} /><span>Chaque projet commence par une structure. Vous pourrez changer de direction sans perdre votre contenu.</span><button type="button">Découvrir les kits <Icon name="arrow-right" size={14} /></button></section>
      </main>
    </div>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (id: string, tab?: EditorTab) => void }) {
  return (
    <article className="project-card" onClick={() => onOpen(project.id)}>
      <div className={`project-thumb ${project.thumbClass}`}>
        <div className="thumb-noise" />
        <div className="thumb-topline"><span>{project.subtitle}</span><span className="thumb-live-dot" /></div>
        <div className="thumb-content">
          {project.eventType === 'wedding' && <><small>THE WEEKEND OF</small><strong>{project.title.split(' & ')[0]} <i>&</i><br />{project.title.split(' & ')[1] ?? 'Thomas'}</strong><span>{project.date}</span></>}
          {project.eventType === 'festival' && <><small>JULY / 2026</small><strong>SUMMER<br /><i>SESSIONS</i></strong><span>Music / Art / Friends</span></>}
          {project.eventType === 'corporate' && <><small>PRODUCT / COMMUNITY</small><strong>PRODUCT<br /><i>SUMMIT</i></strong><span>04.11.26 — Roubaix</span></>}
        </div>
        <div className="thumb-footer"><span>atelier.site</span><span>↗</span></div>
      </div>
      <div className="project-card-meta"><div><h3>{project.title}</h3><p>{project.subtitle} · {project.location}</p></div><button type="button" className="card-more" onClick={(event) => { event.stopPropagation(); onOpen(project.id, 'design') }}><Icon name="more" size={16} /></button></div>
      <div className="project-card-footer"><span className={`status-pill ${project.status.toLowerCase().replace(' ', '-')}`}><i />{project.status}</span><span>{project.lastEdited}</span><span className="project-progress"><span style={{ width: `${project.progress}%` }} /></span></div>
    </article>
  )
}

function NewEventModal({ onClose, onCreate }: { onClose: () => void; onCreate: (draft: NewEventDraft) => void }) {
  const [step, setStep] = useState(1)
  const [draft, setDraft] = useState<NewEventDraft>({ type: 'wedding', name: '', host: '', date: '', location: '', goals: ['story', 'schedule', 'registration'] })
  const selectedType = eventTypes.find((event) => event.id === draft.type) ?? eventTypes[0]

  function toggleGoal(id: string) {
    setDraft((current) => ({ ...current, goals: current.goals.includes(id) ? current.goals.filter((goal) => goal !== id) : [...current.goals, id] }))
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="new-event-modal" role="dialog" aria-modal="true" aria-labelledby="new-event-title">
        <div className="modal-rail">
          <div className="modal-brand"><BrandMark /><span>atelier</span></div>
          <div className="modal-rail-intro"><span className="eyebrow">Nouveau projet</span><h2>Créons le bon<br /><em>premier cadre.</em></h2><p>Quelques repères suffisent. Le reste pourra évoluer avec vous.</p></div>
          <div className="step-list">
            {[['01', 'Format', 'Quel événement ?'], ['02', 'Essentiel', 'Les informations de base'], ['03', 'Intention', 'Ce que votre site doit faire'], ['04', 'Prêt à partir', 'Votre première structure']].map(([number, label, hint], index) => <div key={number} className={`step-item ${step === index + 1 ? 'active' : ''} ${step > index + 1 ? 'done' : ''}`}><span className="step-number">{step > index + 1 ? <Icon name="check" size={14} /> : number}</span><span><strong>{label}</strong><small>{hint}</small></span></div>)}
          </div>
          <div className="modal-rail-tip"><Icon name="sparkles" size={15} /><span>Vous pourrez modifier le sitemap et le design à tout moment.</span></div>
        </div>
        <div className="modal-content">
          <div className="modal-header"><span className="modal-progress">Étape {String(step).padStart(2, '0')} <i>/ 04</i></span><button type="button" className="modal-close" onClick={onClose}><Icon name="x" size={19} /></button></div>
          {step === 1 && <div className="wizard-step"><span className="eyebrow">On commence par le contexte</span><h1 id="new-event-title">Quel genre d’événement<br /><em>préparez-vous ?</em></h1><p className="wizard-lead">Votre choix nous aide à proposer un premier sitemap pertinent. Rien ne sera figé.</p><div className="event-type-grid">{eventTypes.map((event) => <button type="button" key={event.id} className={`event-type-card ${draft.type === event.id ? 'selected' : ''}`} onClick={() => setDraft((current) => ({ ...current, type: event.id }))} style={{ '--type-color': event.color } as CSSProperties}><span className="event-type-icon"><Icon name={event.icon} size={19} /></span><span className="event-type-copy"><strong>{event.label}</strong><small>{event.description}</small></span><span className="radio-dot"><i /></span></button>)}</div></div>}
          {step === 2 && <div className="wizard-step"><span className="eyebrow">Les essentiels</span><h1>Donnez-lui un<br /><em>premier visage.</em></h1><p className="wizard-lead">Ces informations seront disponibles dans le contenu de départ et pourront alimenter vos pages.</p><div className="form-grid"><Field label={draft.type === 'wedding' ? 'Nom du projet ou du couple' : 'Nom de l’événement'} value={draft.name} onChange={(value) => setDraft((current) => ({ ...current, name: value }))} placeholder={draft.type === 'wedding' ? 'Camille & Thomas' : 'Summer Sessions'} wide /><Field label={draft.type === 'wedding' ? 'Qui organise ?' : 'Organisé par'} value={draft.host} onChange={(value) => setDraft((current) => ({ ...current, host: value }))} placeholder={draft.type === 'wedding' ? 'Camille, Thomas & leurs proches' : 'Maison Studio'} /><Field label="Date ou période" value={draft.date} onChange={(value) => setDraft((current) => ({ ...current, date: value }))} placeholder={draft.type === 'festival' ? '18 — 20 juillet 2026' : '12 septembre 2026'} icon="calendar" /><Field label="Lieu principal" value={draft.location} onChange={(value) => setDraft((current) => ({ ...current, location: value }))} placeholder="Rechercher un lieu, une ville..." icon="map-pin" wide /></div><div className="location-hint"><Icon name="sparkles" size={14} /><span>La recherche de lieu pourra ensuite proposer carte, accès, hôtels et recommandations à proximité.</span></div></div>}
          {step === 3 && <div className="wizard-step"><span className="eyebrow">L’intention du site</span><h1>Que doit-il permettre<br /><em>à vos invités ?</em></h1><p className="wizard-lead">Choisissez tout ce qui compte maintenant. Vous pourrez ajouter des modules plus tard.</p><div className="goal-grid">{goals.map((goal) => <button type="button" key={goal.id} className={`goal-card ${draft.goals.includes(goal.id) ? 'selected' : ''}`} onClick={() => toggleGoal(goal.id)}><span className="goal-icon"><Icon name={goal.icon} size={17} /></span><span>{goal.label}</span><span className="goal-check">{draft.goals.includes(goal.id) && <Icon name="check" size={13} />}</span></button>)}</div><div className="smart-suggestion"><div className="smart-suggestion-icon"><Icon name="zap" size={17} /></div><div><strong>Une première structure sera suggérée</strong><p>À partir de vos choix, atelier préparera un sitemap que vous pourrez réorganiser avant de passer au design.</p></div></div></div>}
          {step === 4 && <div className="wizard-step finish-step"><span className="eyebrow"><Icon name="check-circle" size={14} /> Tout est prêt</span><h1>Votre événement mérite<br /><em>son propre espace.</em></h1><p className="wizard-lead">Voici le point de départ que nous allons préparer.</p><div className="review-card"><div className="review-visual" style={{ background: `linear-gradient(135deg, ${selectedType.color}33, #f6f1e9)` }}><Icon name={selectedType.icon} size={28} /></div><div className="review-main"><span className="review-type">{selectedType.label}</span><h3>{draft.name || (draft.type === 'wedding' ? 'Votre mariage' : 'Mon événement')}</h3><p>{draft.date || 'Date à définir'} <span>·</span> {draft.location || 'Lieu à définir'}</p></div><span className="review-ready"><Icon name="check" size={14} /> Sitemap prêt</span></div><div className="review-list"><span><Icon name="layers" size={16} /> Structure recommandée</span><strong>{pagesForEvent(draft.type).length} pages essentielles</strong><span><Icon name="palette" size={16} /> Direction de départ</span><strong>{draft.type === 'festival' ? 'Electric Pulse' : draft.type === 'corporate' ? 'Modern Night' : 'Ivory Ceremony'}</strong></div></div>}
          <div className="modal-footer"><button type="button" className="back-button" onClick={() => step === 1 ? onClose() : setStep(step - 1)}>{step === 1 ? 'Annuler' : <><Icon name="arrow-left" size={15} />Retour</>}</button><div className="footer-right">{step < 4 ? <button type="button" className="primary-button" onClick={() => setStep(step + 1)}>Continuer <Icon name="arrow-right" size={16} /></button> : <button type="button" className="primary-button" onClick={() => onCreate(draft)}>Ouvrir le studio <Icon name="arrow-right" size={16} /></button>}</div></div>
        </div>
      </section>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, icon, wide = false }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; icon?: IconName; wide?: boolean }) {
  return <label className={`field ${wide ? 'wide' : ''}`}><span>{label}</span><div className="field-control">{icon && <Icon name={icon} size={16} />}<input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></div></label>
}

function ProjectTabBar({ project, onBack }: { project: Project; onBack: () => void }) {
  return <div className="framer-project-tabbar"><div className="framer-window-brand"><button type="button" className="window-dot dot-red" aria-label="Fermer" /><button type="button" className="window-dot dot-yellow" aria-label="Réduire" /><button type="button" className="window-dot dot-green" aria-label="Agrandir" /></div><div className="framer-app-tabs"><button type="button" className="framer-home-tab" onClick={onBack}><BrandMark /><span>atelier</span></button><button type="button" className="framer-file-tab muted-tab" onClick={onBack}><span className="file-tab-icon"><Icon name="edit" size={12} /></span><span>All projects</span></button><button type="button" className="framer-file-tab active"><span className="file-tab-icon"><Icon name="layers" size={12} /></span><span>{project.title}</span><Icon name="x" size={12} /></button><button type="button" className="framer-add-tab" aria-label="Nouvel onglet"><Icon name="plus" size={16} /></button></div><div className="framer-tabbar-spacer" /></div>
}

function Editor({ project, theme, editorTab, selectedPageId, selectedSection, onBack, onTab, onPage, onSection, onAddPage, onAddSection, onProjectUpdate, onRenamePage, onDuplicatePage, onDeletePage, onMovePage, onCyclePageVisibility, onSectionAction, onTheme, onPreview, onPublish }: { project: Project; theme: Theme; editorTab: EditorTab; selectedPageId: string; selectedSection: string; onBack: () => void; onTab: (tab: EditorTab) => void; onPage: (id: string) => void; onSection: (section: string) => void; onAddPage: () => void; onAddSection: (sectionName?: string) => void; onProjectUpdate: (field: 'title' | 'date' | 'location' | 'tagline' | 'description' | 'ctaLabel', value: string) => void; onRenamePage: (pageId: string) => void; onDuplicatePage: (pageId: string) => void; onDeletePage: (pageId: string) => void; onMovePage: (pageId: string, direction: 'up' | 'down') => void; onCyclePageVisibility: (pageId: string) => void; onSectionAction: (sectionName: string, action: 'duplicate' | 'delete' | 'up' | 'down') => void; onTheme: (id: string) => void; onPreview: () => void; onPublish: () => void }) {
  const selectedPage = project.pages.find((page) => page.id === selectedPageId) ?? project.pages[0]
  return (
    <div className="editor-layout">
      <ProjectTabBar project={project} onBack={onBack} />
      <header className="editor-topbar framer-toolbar">
        <div className="framer-toolbar-left"><button type="button" className="canvas-menu"><BrandMark /><span>Canvas</span><Icon name="chevron-down" size={13} /></button><span className="toolbar-divider" /><IconButton name="plus" label="Ajouter" size={17} /><IconButton name="layout" label="Insérer une section" size={17} /><IconButton name="type" label="Ajouter du texte" size={17} /><span className="toolbar-divider" /><div className="editor-tabs compact-tabs"><button type="button" className={editorTab === 'structure' ? 'active' : ''} onClick={() => onTab('structure')}><Icon name="layers" size={14} /><span>Structure</span></button><button type="button" className={editorTab === 'design' ? 'active' : ''} onClick={() => onTab('design')}><Icon name="palette" size={14} /><span>Design</span></button><button type="button" className={editorTab === 'build' ? 'active' : ''} onClick={() => onTab('build')}><Icon name="layout" size={14} /><span>Build</span></button></div></div>
        <div className="framer-toolbar-center"><strong>{project.title}</strong><span className="main-branch">⌘ main</span></div>
        <div className="editor-actions"><span className="saved-state"><span className="saved-dot" />Enregistré</span><IconButton name="undo" label="Annuler" size={16} /><IconButton name="redo" label="Rétablir" size={16} /><span className="topbar-divider" /><button type="button" className="editor-preview-button" onClick={onPreview}><Icon name="play" size={14} />Aperçu</button><button type="button" className="invite-button">Inviter</button><button type="button" className="publish-button" onClick={onPublish}>Publier <Icon name="arrow-right" size={15} /></button><div className="editor-avatar">ML</div></div>
      </header>
      {editorTab === 'structure' && <StructureView project={project} selectedPageId={selectedPageId} onPage={onPage} onAddPage={onAddPage} onTab={onTab} onRenamePage={onRenamePage} onDuplicatePage={onDuplicatePage} onDeletePage={onDeletePage} onMovePage={onMovePage} onCyclePageVisibility={onCyclePageVisibility} />}
      {editorTab === 'design' && <DesignView project={project} theme={theme} onTheme={onTheme} onTab={onTab} />}
      {editorTab === 'build' && <BuilderView project={project} theme={theme} selectedPage={selectedPage} selectedSection={selectedSection} onPage={onPage} onSection={onSection} onAddPage={onAddPage} onAddSection={onAddSection} onProjectUpdate={onProjectUpdate} onSectionAction={onSectionAction} onPreview={onPreview} />}
    </div>
  )
}

function EditorSidebar({ project, selectedPageId, onPage, onAddPage, mode = 'pages' }: { project: Project; selectedPageId: string; onPage: (id: string) => void; onAddPage: () => void; mode?: 'pages' | 'layers' }) {
  return <aside className="editor-sidebar"><div className="editor-sidebar-tabs"><button type="button" className={mode === 'pages' ? 'active' : ''}><Icon name="layers" size={15} />Pages</button><button type="button" className={mode === 'layers' ? 'active' : ''}><Icon name="grip" size={15} />Layers</button></div><label className="editor-search"><Icon name="search" size={15} /><input placeholder="Rechercher" /></label><div className="editor-side-heading"><span>{mode === 'pages' ? 'Pages du site' : 'Sections'}</span><IconButton name="plus" label="Ajouter" size={14} onClick={onAddPage} /></div><div className="page-list">{project.pages.map((page, index) => <button type="button" key={page.id} className={`page-list-item ${selectedPageId === page.id ? 'active' : ''}`} onClick={() => onPage(page.id)}><span className="page-list-icon" style={{ '--page-accent': page.accent ?? '#a8b4ad' } as CSSProperties}><Icon name={page.icon} size={15} /></span><span className="page-list-copy"><strong>{page.name}</strong><small>{page.slug}</small></span>{index === 0 ? <span className="home-mark">⌂</span> : <Icon name="more" size={15} className="page-more" />}</button>)}</div><button type="button" className="add-page-link" onClick={onAddPage}><Icon name="plus" size={15} />Ajouter une page</button><div className="sidebar-bottom editor-sidebar-bottom"><div className="completion-mini"><div><span>Projet complété</span><strong>{project.progress}%</strong></div><div className="completion-bar"><span style={{ width: `${project.progress}%` }} /></div></div><button type="button" className="settings-row"><Icon name="settings" size={16} /><span>Paramètres du projet</span><Icon name="chevron-right" size={14} /></button></div></aside>
}

function StructureView({ project, selectedPageId, onPage, onAddPage, onTab, onRenamePage, onDuplicatePage, onDeletePage, onMovePage, onCyclePageVisibility }: { project: Project; selectedPageId: string; onPage: (id: string) => void; onAddPage: () => void; onTab: (tab: EditorTab) => void; onRenamePage: (pageId: string) => void; onDuplicatePage: (pageId: string) => void; onDeletePage: (pageId: string) => void; onMovePage: (pageId: string, direction: 'up' | 'down') => void; onCyclePageVisibility: (pageId: string) => void }) {
  return <div className="editor-body structure-body"><EditorSidebar project={project} selectedPageId={selectedPageId} onPage={onPage} onAddPage={onAddPage} /><main className="structure-main"><div className="view-heading"><div><div className="mini-breadcrumb"><span>Projet</span><Icon name="chevron-right" size={12} /><span>Structure</span></div><h1>La structure de votre événement</h1><p>Organisez les pages avant de passer au design. Votre contenu restera intact si vous changez de direction.</p></div><div className="heading-tools"><button type="button" className="quiet-button"><Icon name="eye" size={15} />Parcours invité</button><button type="button" className="primary-button" onClick={() => onTab('design')}><Icon name="palette" size={15} />Passer au design</button></div></div><div className="structure-status"><div className="structure-status-icon"><Icon name="sparkles" size={18} /></div><div><strong>Une base cohérente pour {project.title}</strong><p>{project.pages.length} pages proposées · {project.pages.reduce((total, page) => total + page.sections.length, 0)} sections à personnaliser</p></div><div className="status-checks"><span><Icon name="check-circle" size={14} />Navigation</span><span><Icon name="check-circle" size={14} />Mobile</span><span className="status-warn"><Icon name="info" size={14} />2 contenus à compléter</span></div></div><div className="sitemap-toolbar"><div><span className="sitemap-kicker">Sitemap</span><h2>Le parcours de vos visiteurs</h2></div><div className="sitemap-actions"><button type="button" className="small-outline-button"><Icon name="grip" size={14} />Vue compacte</button><button type="button" className="small-outline-button" onClick={onAddPage}><Icon name="plus" size={14} />Ajouter une page</button></div></div><div className="sitemap-canvas"><div className="sitemap-connector connector-1" /><div className="sitemap-connector connector-2" /><div className="sitemap-grid">{project.pages.map((page, index) => <PageStructureCard key={page.id} page={page} index={index} selected={page.id === selectedPageId} onClick={() => onPage(page.id)} onRename={() => onRenamePage(page.id)} onDuplicate={() => onDuplicatePage(page.id)} onDelete={() => onDeletePage(page.id)} onMoveUp={() => onMovePage(page.id, 'up')} onMoveDown={() => onMovePage(page.id, 'down')} onCycleVisibility={() => onCyclePageVisibility(page.id)} />)}<button type="button" className="sitemap-add-card" onClick={onAddPage}><span><Icon name="plus" size={18} /></span><strong>Ajouter une page</strong><small>Créer un nouveau point d’entrée</small></button></div></div><div className="structure-bottom-grid"><div className="principle-card"><div className="principle-icon"><Icon name="link" size={17} /></div><div><span className="eyebrow">Le principe atelier</span><h3>Une donnée, plusieurs endroits.</h3><p>La date, le lieu et le programme pourront être réutilisés dans toutes vos pages sans ressaisie.</p></div><button type="button" className="arrow-circle"><Icon name="arrow-right" size={15} /></button></div><div className="next-step-card"><span className="eyebrow">Étape suivante</span><div><div className="next-step-icon"><Icon name="palette" size={17} /></div><span><strong>Choisir une direction</strong><small>Palette, typographie et rythme visuel</small></span><Icon name="arrow-right" size={16} /></div><button type="button" onClick={() => onTab('design')}>Explorer les directions <Icon name="arrow-right" size={14} /></button></div></div></main></div>
}

function PageStructureCard({ page, index, selected, onClick, onRename, onDuplicate, onDelete, onMoveUp, onMoveDown, onCycleVisibility }: { page: Page; index: number; selected: boolean; onClick: () => void; onRename: () => void; onDuplicate: () => void; onDelete: () => void; onMoveUp: () => void; onMoveDown: () => void; onCycleVisibility: () => void }) {
  return <div className={`page-structure-card ${selected ? 'selected' : ''}`} onClick={onClick}><div className="structure-card-top"><span className="structure-order">{String(index + 1).padStart(2, '0')}</span><button type="button" className="structure-visibility" onClick={(event) => { event.stopPropagation(); onCycleVisibility() }}>{page.visibility === 'Public' ? <><Icon name="globe" size={12} />Public</> : page.visibility === 'Invités' ? <><Icon name="users" size={12} />Invités</> : <><Icon name="lock" size={12} />Privé</>}</button><div className="structure-card-actions"><button type="button" onClick={(event) => { event.stopPropagation(); onMoveUp() }} aria-label="Monter"><Icon name="chevron-left" size={13} /></button><button type="button" onClick={(event) => { event.stopPropagation(); onMoveDown() }} aria-label="Descendre"><Icon name="chevron-right" size={13} /></button><button type="button" onClick={(event) => { event.stopPropagation(); onRename() }} aria-label="Renommer"><Icon name="edit" size={13} /></button><button type="button" onClick={(event) => { event.stopPropagation(); onDuplicate() }} aria-label="Dupliquer"><Icon name="copy" size={13} /></button><button type="button" onClick={(event) => { event.stopPropagation(); onDelete() }} aria-label="Supprimer"><Icon name="trash" size={13} /></button></div></div><div className="structure-card-icon" style={{ '--page-accent': page.accent ?? '#a8b4ad' } as CSSProperties}><Icon name={page.icon} size={19} /></div><div className="structure-card-copy"><h3>{page.name}</h3><p>{page.description}</p></div><div className="structure-card-footer"><span>{page.sections.length} sections</span><span>{page.slug}</span><Icon name="chevron-right" size={14} /></div></div>
}

function DesignView({ project, theme, onTheme, onTab }: { project: Project; theme: Theme; onTheme: (id: string) => void; onTab: (tab: EditorTab) => void }) {
  const [filter, setFilter] = useState('Tous')
  const [search, setSearch] = useState('')
  const categories = ['Tous', 'Éditorial', 'Photo', 'Minimal', 'Coloré', 'Nocturne']
  const visibleThemes = themes.filter((item) => (filter === 'Tous' || item.category === filter) && `${item.name} ${item.description} ${item.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase()))

  return <div className="editor-body design-body design-library-body"><EditorSidebar project={project} selectedPageId="home" onPage={() => undefined} onAddPage={() => undefined} /><main className="design-main design-library-main"><div className="view-heading"><div><div className="mini-breadcrumb"><span>Projet</span><Icon name="chevron-right" size={12} /><span>Design</span></div><h1>Choisissez une direction</h1><p>Partez d’une expérience complète, puis adaptez la palette, la typographie et chaque bloc à votre événement.</p></div><div className="heading-tools"><button type="button" className="quiet-button"><Icon name="sparkles" size={15} />Générer une direction</button><button type="button" className="primary-button" onClick={() => onTab('build')}><Icon name="layout" size={15} />Ouvrir le builder</button></div></div><div className="design-library-toolbar"><div className="design-filter-tabs">{categories.map((category) => <button type="button" key={category} className={filter === category ? 'active' : ''} onClick={() => setFilter(category)}>{category}</button>)}</div><label className="design-search"><Icon name="search" size={14} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher un style" /></label><button type="button" className="design-sort"><Icon name="sliders" size={14} />Trier <Icon name="chevron-down" size={12} /></button></div><div className="design-gallery-heading"><div><span className="sitemap-kicker">Bibliothèque de designs</span><h2>{filter === 'Tous' ? 'Des points de départ, pas des cages.' : filter}</h2></div><span>{visibleThemes.length} propositions</span></div><div className="theme-grid design-gallery-grid">{visibleThemes.map((item) => <ThemeCard key={item.id} theme={item} active={theme.id === item.id} onSelect={() => onTheme(item.id)} />)}</div>{visibleThemes.length === 0 && <div className="design-empty"><Icon name="search" size={20} /><strong>Aucun style trouvé</strong><span>Essayez une autre recherche ou revenez à tous les designs.</span></div>}<div className="design-library-note"><div className="design-note-icon"><Icon name="palette" size={16} /></div><div><span className="eyebrow">Après le choix</span><strong>Chaque détail restera réglable.</strong><p>Le design donne le rythme. Vos données, vos pages et vos sections restent indépendantes.</p></div><button type="button" onClick={() => onTab('build')}>Personnaliser <Icon name="arrow-right" size={14} /></button></div></main><aside className="design-preview-panel design-library-preview"><div className="preview-panel-heading"><span>Aperçu du design actif</span><div><IconButton name="monitor" label="Aperçu desktop" active size={14} /><IconButton name="phone" label="Aperçu mobile" size={14} /></div></div><div className={`mini-site-preview ${theme.id}`} style={{ background: theme.background, color: theme.ink }}><div className="mini-site-nav"><span>{project.title.toUpperCase()}</span><span><i /> MENU</span></div><div className="mini-site-hero"><span className="mini-site-eyebrow" style={{ color: theme.accent }}>{theme.templateName?.toUpperCase() ?? theme.eyebrow.toUpperCase()}</span><h3 style={{ fontFamily: theme.displayFont }}>{project.title.split(' & ')[0]} <em>&</em><br />{project.title.split(' & ')[1] ?? 'vous'}</h3><p>{project.date}</p><button type="button" style={{ background: theme.accent, color: theme.background }}>Découvrir <Icon name="arrow-right" size={12} /></button></div><div className="mini-site-shape" style={{ background: theme.accentSoft }}><div style={{ borderColor: theme.accent }}><span>{project.location.split(',')[0]}</span><strong>{project.tagline || 'Un événement à votre image.'}</strong></div></div><div className="mini-site-lines"><span /><span /><span /></div></div><div className="preview-panel-footer"><span><Icon name="check-circle" size={13} />Design actif : {theme.name}</span><button type="button" onClick={() => onTab('build')}>Personnaliser <Icon name="arrow-right" size={13} /></button></div></aside></div>
}

function ThemeCard({ theme, active, onSelect }: { theme: Theme; active: boolean; onSelect: () => void }) {
  return <button type="button" className={`theme-card design-template-card ${active ? 'active' : ''}`} onClick={onSelect}><div className={`theme-thumb template-thumb ${theme.preview ?? 'editorial'}`} style={{ background: theme.background, color: theme.ink }}><div className="template-browser-bar"><span className="template-browser-brand" style={{ color: theme.accent }}>✦</span><span /><span /><span /></div><div className="template-nav"><span>{theme.templateName ?? theme.name}</span><span>INFO&nbsp;&nbsp; RSVP</span></div><div className="template-hero-copy"><small style={{ color: theme.accent }}>{theme.eyebrow}</small><strong style={{ fontFamily: theme.displayFont }}>{theme.preview === 'film' ? <>We are<br />getting <i>married</i></> : theme.preview === 'minimal' ? <>MATHILDE<br /><i>&amp; JOHAN</i></> : theme.preview === 'playful' || theme.preview === 'sunset' ? <>THE<br /><i>PARTY</i></> : <>{theme.name.split(' ')[0]}<br /><i>&amp; forever</i></>}</strong><span className="template-rule" style={{ background: theme.accent }} /><em>{theme.preview === 'paper' ? 'A story in bloom' : theme.preview === 'nocturne' ? 'A night to remember' : '12 — 09 — 26'}</em></div><div className="template-art" style={{ background: theme.accentSoft, borderColor: theme.accent }}><span>{theme.preview === 'garden' || theme.preview === 'film' ? 'PHOTO / 01' : theme.preview === 'paper' ? '✿' : <>YOUR<br />MOMENT</>}</span></div><div className="template-footer"><span>THE WEEKEND</span><span>↗</span></div></div><div className="theme-card-meta"><div><span className="eyebrow">{theme.category ?? theme.eyebrow}</span><h3>{theme.name}</h3><p>{theme.description}</p></div><span className="theme-radio">{active && <Icon name="check" size={13} />}</span></div><div className="theme-tags">{theme.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></button>
}

function InlineEditable({ value, onCommit, className = '', placeholder = 'Cliquer pour éditer', multiline = false }: { value: string; onCommit: (value: string) => void; className?: string; placeholder?: string; multiline?: boolean }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  useEffect(() => {
    if (!editing) setDraft(value)
  }, [value, editing])

  function commit() {
    const next = draft.trim()
    setEditing(false)
    if (next && next !== value) onCommit(next)
  }

  if (editing) {
    if (multiline) return <textarea autoFocus className={`inline-editor ${className}`} value={draft} onChange={(event) => setDraft(event.target.value)} onBlur={commit} onKeyDown={(event) => { if (event.key === 'Escape') { setDraft(value); setEditing(false) } }} />
    return <input autoFocus className={`inline-editor ${className}`} value={draft} onChange={(event) => setDraft(event.target.value)} onBlur={commit} onKeyDown={(event) => { if (event.key === 'Enter') commit(); if (event.key === 'Escape') { setDraft(value); setEditing(false) } }} />
  }

  return <span role="button" tabIndex={0} className={`inline-editable ${className}`} title="Cliquer pour éditer" onClick={(event) => { event.stopPropagation(); setDraft(value); setEditing(true) }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setDraft(value); setEditing(true) } }}>{value || placeholder}</span>
}

function BuilderView({ project, theme, selectedPage, selectedSection, onPage, onSection, onAddPage, onAddSection, onProjectUpdate, onSectionAction, onPreview }: { project: Project; theme: Theme; selectedPage: Page; selectedSection: string; onPage: (id: string) => void; onSection: (section: string) => void; onAddPage: () => void; onAddSection: (sectionName?: string) => void; onProjectUpdate: (field: 'title' | 'date' | 'location' | 'tagline' | 'description' | 'ctaLabel', value: string) => void; onSectionAction: (sectionName: string, action: 'duplicate' | 'delete' | 'up' | 'down') => void; onPreview: () => void }) {
  const [panelMode, setPanelMode] = useState<'agent' | 'style' | 'content'>('agent')
  const [leftMode, setLeftMode] = useState<'pages' | 'layers' | 'assets'>('pages')
  const [zoom, setZoom] = useState(50)
  const [showSectionLibrary, setShowSectionLibrary] = useState(false)
  const sectionOptions = ['Hero événement', 'Agenda', 'Galerie', 'Lieu & accès', 'FAQ', 'Formulaire RSVP', 'Appel à l’action', 'Livre d’or']

  return <div className="framer-editor-body">
    <BuilderLeftPanel project={project} selectedPage={selectedPage} selectedSection={selectedSection} leftMode={leftMode} onMode={setLeftMode} onPage={onPage} onSection={(section) => { onSection(section); setPanelMode('style') }} onAddPage={onAddPage} onAddSection={() => setShowSectionLibrary(true)} onSectionAction={onSectionAction} />
    <BuilderCanvas project={project} theme={theme} selectedPage={selectedPage} selectedSection={selectedSection} zoom={zoom} onZoom={setZoom} showSectionLibrary={showSectionLibrary} sectionOptions={sectionOptions} onToggleSectionLibrary={() => setShowSectionLibrary((current) => !current)} onCloseSectionLibrary={() => setShowSectionLibrary(false)} onAddSection={onAddSection} onSection={(section) => { onSection(section); setPanelMode('style') }} onProjectUpdate={onProjectUpdate} onPreview={onPreview} />
    <aside className="framer-right-panel">
      <div className="framer-right-tabs"><button type="button" className={panelMode === 'agent' ? 'active' : ''} onClick={() => setPanelMode('agent')}>Agent</button><button type="button" className={panelMode === 'style' ? 'active' : ''} onClick={() => setPanelMode('style')}>Style</button><button type="button" className={panelMode === 'content' ? 'active' : ''} onClick={() => setPanelMode('content')}>Content</button></div>
      {panelMode === 'agent' ? <AgentPanel project={project} onStyle={() => setPanelMode('style')} /> : panelMode === 'style' ? <StyleInspector project={project} theme={theme} selectedSection={selectedSection} /> : <ContentInspector project={project} onProjectUpdate={onProjectUpdate} />}
    </aside>
  </div>
}

function BuilderLeftPanel({ project, selectedPage, selectedSection, leftMode, onMode, onPage, onSection, onAddPage, onAddSection, onSectionAction }: { project: Project; selectedPage: Page; selectedSection: string; leftMode: 'pages' | 'layers' | 'assets'; onMode: (mode: 'pages' | 'layers' | 'assets') => void; onPage: (id: string) => void; onSection: (section: string) => void; onAddPage: () => void; onAddSection: () => void; onSectionAction: (sectionName: string, action: 'duplicate' | 'delete' | 'up' | 'down') => void }) {
  return <aside className="framer-left-panel"><div className="framer-panel-tabs"><button type="button" className={leftMode === 'pages' ? 'active' : ''} onClick={() => onMode('pages')}><Icon name="layers" size={15} />Pages</button><button type="button" className={leftMode === 'layers' ? 'active' : ''} onClick={() => onMode('layers')}><Icon name="grip" size={15} />Layers</button><button type="button" className={leftMode === 'assets' ? 'active' : ''} onClick={() => onMode('assets')}><Icon name="image" size={15} />Assets</button></div><label className="framer-search"><Icon name="search" size={15} /><input placeholder="Search..." /></label>{leftMode === 'pages' && <><div className="framer-panel-section-title"><span>Design</span><IconButton name="plus" label="Ajouter un élément" size={15} /></div><div className="framer-tool-row"><button type="button"><Icon name="type" size={15} /><span>Text</span></button><button type="button"><Icon name="image" size={15} /><span>Media</span></button><button type="button" onClick={onAddSection}><Icon name="layout" size={15} /><span>Section</span></button></div><div className="framer-panel-section-title pages-title"><span>Pages</span><IconButton name="plus" label="Ajouter une page" size={15} onClick={onAddPage} /></div><div className="framer-page-list">{project.pages.map((page) => <button type="button" key={page.id} className={`framer-page-item ${selectedPage.id === page.id ? 'active' : ''}`} onClick={() => onPage(page.id)}><span className="framer-page-icon"><Icon name={page.icon} size={14} /></span><span>{page.name}</span>{page.id === 'home' && <span className="framer-home-glyph">⌂</span>}</button>)}</div><button type="button" className="framer-add-page" onClick={onAddPage}><Icon name="plus" size={14} />Add page</button></>}{leftMode === 'layers' && <><div className="framer-panel-section-title"><span>{selectedPage.name} layers</span><IconButton name="plus" label="Ajouter une section" size={15} onClick={onAddSection} /></div><div className="framer-layer-list">{selectedPage.sections.map((section, index) => <div key={`${section}-${index}`} className={`framer-layer-item ${selectedSection === section ? 'active' : ''}`}><button type="button" className="layer-select" onClick={() => onSection(section)}><Icon name="grip" size={13} /><span>{section}</span></button><div className="layer-actions"><button type="button" onClick={() => onSectionAction(section, 'up')} aria-label="Monter"><Icon name="chevron-left" size={11} /></button><button type="button" onClick={() => onSectionAction(section, 'down')} aria-label="Descendre"><Icon name="chevron-right" size={11} /></button><button type="button" onClick={() => onSectionAction(section, 'duplicate')} aria-label="Dupliquer"><Icon name="copy" size={11} /></button><button type="button" onClick={() => onSectionAction(section, 'delete')} aria-label="Supprimer"><Icon name="trash" size={11} /></button></div></div>)}</div><button type="button" className="framer-add-page" onClick={onAddSection}><Icon name="plus" size={14} />Add section</button></>}{leftMode === 'assets' && <><div className="framer-panel-section-title"><span>Project assets</span><IconButton name="plus" label="Ajouter un média" size={15} /></div><div className="framer-assets-grid"><button type="button" className="asset-placeholder"><Icon name="plus" size={16} /><span>Upload</span></button><div className="asset-tile asset-tile-one"><span>IMG / 01</span></div><div className="asset-tile asset-tile-two"><span>IMG / 02</span></div><div className="asset-tile asset-tile-three"><span>IMG / 03</span></div></div></>}<div className="framer-left-footer"><button type="button"><Icon name="settings" size={15} />Settings</button><span>⌘ K</span></div></aside>
}

function BuilderCanvas({ project, theme, selectedPage, selectedSection, zoom, onZoom, showSectionLibrary, sectionOptions, onToggleSectionLibrary, onCloseSectionLibrary, onAddSection, onSection, onProjectUpdate, onPreview }: { project: Project; theme: Theme; selectedPage: Page; selectedSection: string; zoom: number; onZoom: (value: number) => void; showSectionLibrary: boolean; sectionOptions: string[]; onToggleSectionLibrary: () => void; onCloseSectionLibrary: () => void; onAddSection: (sectionName?: string) => void; onSection: (section: string) => void; onProjectUpdate: (field: 'title' | 'date' | 'location' | 'tagline' | 'description' | 'ctaLabel', value: string) => void; onPreview: () => void }) {
  const scaledWidth = 780 * zoom / 100
  const scaledHeight = 790 * zoom / 100
  const editable = (field: 'title' | 'date' | 'location' | 'tagline' | 'description' | 'ctaLabel') => (value: string) => onProjectUpdate(field, value)

  return <main className="framer-canvas-area"><div className="framer-canvas-top"><div className="framer-canvas-size"><Icon name="play" size={13} /><span>Desktop</span><strong>1200</strong><Icon name="plus" size={15} /></div><div className="framer-canvas-breadcrumb"><span>{project.title}</span><Icon name="chevron-right" size={12} /><strong>{selectedPage.name}</strong></div></div><div className="framer-stage"><div className="framer-canvas-ruler"><span>0</span><span>320</span><span>640</span><span>960</span><span>1200</span></div><div className="canvas-zoom-space" style={{ width: `${scaledWidth}px`, height: `${scaledHeight}px` }}><div className="site-canvas framer-site-canvas" style={{ background: theme.background, color: theme.ink, transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}><div className="site-canvas-nav"><span className="site-logo-mark" style={{ color: theme.accent }}>✦</span><strong><InlineEditable value={project.title} onCommit={editable('title')} /></strong><div><span>Programme</span><span>Infos</span><span>RSVP</span><button type="button" style={{ background: theme.accent, color: theme.background }}>Menu</button></div></div><div className={`canvas-section selected-section ${selectedSection === 'Hero événement' ? 'is-selected' : ''}`} onClick={() => onSection('Hero événement')}><span className="section-tag">Hero événement <Icon name="edit" size={12} /></span><div className="canvas-hero-copy"><span className="canvas-eyebrow" style={{ color: theme.accent }}>{project.subtitle.toUpperCase()}</span><h1 style={{ fontFamily: theme.displayFont }}><InlineEditable value={project.title} onCommit={editable('title')} className="editable-title" /></h1><p><InlineEditable value={project.date} onCommit={editable('date')} className="editable-meta" /> <span>·</span> <InlineEditable value={project.location} onCommit={editable('location')} className="editable-meta" /></p><button type="button" style={{ background: theme.accent, color: theme.background }}><InlineEditable value={project.ctaLabel || 'Découvrir l’événement'} onCommit={editable('ctaLabel')} className="editable-button" /> <Icon name="arrow-right" size={14} /></button></div><div className="canvas-hero-art" style={{ background: theme.accentSoft }}><div className="hero-art-frame" style={{ borderColor: theme.accent }}><span>THE<br />MOMENT</span></div></div></div><div className={`canvas-section canvas-info-section ${selectedSection === 'Date & compte à rebours' ? 'is-selected' : ''}`} onClick={() => onSection('Date & compte à rebours')}><span className="section-tag">Date & compte à rebours <Icon name="edit" size={12} /></span><div><span className="canvas-eyebrow" style={{ color: theme.accent }}>À RETENIR</span><h2 style={{ fontFamily: theme.displayFont }}><InlineEditable value={project.tagline || 'Un moment à partager.'} onCommit={editable('tagline')} className="editable-tagline" /></h2></div><div className="date-boxes"><div><strong>12</strong><span>JOURS</span></div><div><strong>09</strong><span>MOIS</span></div><div><strong>26</strong><span>ANNÉE</span></div></div></div><button type="button" className="canvas-add-section" onClick={(event) => { event.stopPropagation(); onToggleSectionLibrary() }}><Icon name="plus" size={15} />Ajouter une section</button>{showSectionLibrary && <div className="section-library-popover"><div className="section-library-heading"><span>Ajouter une section</span><button type="button" onClick={onCloseSectionLibrary}><Icon name="x" size={13} /></button></div><div className="section-library-grid">{sectionOptions.map((option) => <button type="button" key={option} onClick={() => { onAddSection(option); onCloseSectionLibrary() }}><span className="library-icon"><Icon name={option === 'Agenda' ? 'calendar' : option === 'Galerie' ? 'image' : option === 'Lieu & accès' ? 'map-pin' : option === 'Formulaire RSVP' ? 'ticket' : option === 'FAQ' ? 'info' : option === 'Livre d’or' ? 'heart' : 'layout'} size={14} /></span><span>{option}</span><Icon name="plus" size={12} /></button>)}</div></div>}<div className={`canvas-section canvas-story-section ${selectedSection === 'Notre histoire' ? 'is-selected' : ''}`} onClick={() => onSection('Notre histoire')}><span className="section-tag">Notre histoire <Icon name="edit" size={12} /></span><div className="story-image" style={{ background: `linear-gradient(145deg, ${theme.accentSoft}, ${theme.accent}55)` }}><span>IMAGE / 01</span></div><div className="story-copy"><span className="canvas-eyebrow" style={{ color: theme.accent }}>LE CONTEXTE</span><h2 style={{ fontFamily: theme.displayFont }}>Tout commence<br />par une histoire.</h2><p><InlineEditable value={project.description || 'Ajoutez votre texte, vos images et le ton qui ressemble à votre événement.'} onCommit={editable('description')} multiline className="editable-description" /></p></div></div></div></div></div><div className="framer-bottom-bar"><div className="framer-bottom-tools"><IconButton name="arrow-right" label="Sélection" active size={15} /><IconButton name="grip" label="Déplacer" size={15} /><span className="bottom-divider" /><IconButton name="sun" label="Mode clair" size={15} /></div><div className="framer-zoom"><button type="button" className="zoom-step" onClick={() => onZoom(Math.max(10, zoom - 10))} aria-label="Zoom arrière">−</button><input aria-label="Niveau de zoom" type="range" min="10" max="400" step="5" value={zoom} onChange={(event) => onZoom(Number(event.target.value))} /><button type="button" className="zoom-value" onClick={() => onZoom(50)}>{zoom}% <Icon name="chevron-down" size={12} /></button><button type="button" className="zoom-step" onClick={() => onZoom(Math.min(400, zoom + 10))} aria-label="Zoom avant">+</button></div><button type="button" className="framer-upgrade" onClick={onPreview}><Icon name="play" size={13} />Aperçu</button></div></main>
}

function AgentPanel({ project, onStyle }: { project: Project; onStyle: () => void }) {
  return <div className="framer-agent-panel"><div className="agent-chat-header"><button type="button">New Chat <Icon name="chevron-down" size={13} /></button><IconButton name="plus" label="Nouvelle conversation" size={15} /></div><div className="agent-card"><div className="agent-card-title"><span className="agent-spark"><Icon name="sparkles" size={15} /></span><div><strong>Assistant Atelier</strong><small>Votre copilote de direction</small></div></div><p>Décrivez une modification ou demandez-moi une nouvelle idée pour <b>{project.title}</b>.</p><div className="agent-prompt"><span>Ask Atelier...</span><button type="button" aria-label="Envoyer"><Icon name="arrow-right" size={14} /></button></div></div><div className="agent-section-title">Suggestions</div><button type="button" className="agent-suggestion" onClick={onStyle}><span><Icon name="palette" size={15} /></span><div><strong>Proposer une palette</strong><small>À partir de votre événement</small></div><Icon name="arrow-right" size={14} /></button><button type="button" className="agent-suggestion"><span><Icon name="layout" size={15} /></span><div><strong>Ajouter une section</strong><small>Choisir parmi les blocs</small></div><Icon name="arrow-right" size={14} /></button><button type="button" className="agent-suggestion"><span><Icon name="sparkles" size={15} /></span><div><strong>Rédiger le contenu</strong><small>Un ton adapté à votre public</small></div><Icon name="arrow-right" size={14} /></button><div className="agent-credits"><span className="agent-credit-icon"><Icon name="zap" size={14} /></span><div><strong>Atelier peut vous aider à aller plus vite</strong><small>La direction reste toujours entre vos mains.</small></div></div></div>
}

function StyleInspector({ project, theme, selectedSection }: { project: Project; theme: Theme; selectedSection: string }) {
  return <div className="style-inspector"><div className="inspector-heading"><div className="inspector-selected-icon"><Icon name="layers" size={16} /></div><div><span>Section sélectionnée</span><strong>{selectedSection}</strong></div><IconButton name="more" label="Plus d'actions" size={16} /></div><InspectorGroup title="Disposition" icon="layout"><div className="segmented-control"><button type="button" className="active">Libre</button><button type="button">Grille</button><button type="button">Pleine largeur</button></div><div className="inspector-row"><span>Alignement</span><div className="align-buttons"><button type="button">←</button><button type="button" className="active">↔</button><button type="button">→</button></div></div><div className="range-row"><span>Espacement vertical</span><strong>96 px</strong></div><input type="range" min="20" max="160" defaultValue="96" /></InspectorGroup><InspectorGroup title="Apparence" icon="palette"><div className="inspector-row"><span>Fond de section</span><span className="color-value"><i style={{ background: theme.background }} />{theme.background.toUpperCase()}</span></div><div className="inspector-row"><span>Couleur d’accent</span><span className="color-value"><i style={{ background: theme.accent }} />{theme.accent.toUpperCase()}</span></div><div className="inspector-row"><span>Rayon des cartes</span><strong>24 px</strong></div></InspectorGroup><InspectorGroup title="Données connectées" icon="link"><div className="data-binding"><span className="binding-dot" /><div><small>Nom de l’événement</small><strong>{project.title}</strong></div><Icon name="check" size={14} /></div><div className="data-binding"><span className="binding-dot" /><div><small>Date principale</small><strong>event.date</strong></div><Icon name="check" size={14} /></div><button type="button" className="connect-data-button"><Icon name="link" size={14} />Connecter une donnée</button></InspectorGroup><div className="inspector-tip"><Icon name="sparkles" size={15} /><span>Les changements de style se propagent à toutes les sections qui utilisent ce composant.</span></div></div>
}

function ContentInspector({ project, onProjectUpdate }: { project: Project; onProjectUpdate: (field: 'title' | 'date' | 'location' | 'tagline' | 'description' | 'ctaLabel', value: string) => void }) {
  return <div className="content-inspector"><div className="content-intro"><span className="eyebrow"><Icon name="link" size={13} />Données du projet</span><h3>Une source pour<br /><em>tout votre site.</em></h3><p>Modifiez une information ici, elle se mettra à jour dans les sections connectées.</p></div><div className="content-field-list"><ContentField label="Nom de l’événement" value={project.title} onChange={(value) => onProjectUpdate('title', value)} /><ContentField label="Date ou période" value={project.date} onChange={(value) => onProjectUpdate('date', value)} icon="calendar" /><ContentField label="Lieu principal" value={project.location} onChange={(value) => onProjectUpdate('location', value)} icon="map-pin" /><ContentField label="Phrase d’accroche" value={project.tagline || ''} onChange={(value) => onProjectUpdate('tagline', value)} /><ContentField label="Bouton principal" value={project.ctaLabel || ''} onChange={(value) => onProjectUpdate('ctaLabel', value)} /><label className="content-field content-textarea"><span>Description</span><textarea value={project.description || ''} onChange={(event) => onProjectUpdate('description', event.target.value)} placeholder="Le ton de votre événement..." /></label></div><div className="content-sync-note"><Icon name="check-circle" size={14} /><span>Synchronisé avec {project.pages.length} pages du projet</span></div></div>
}

function ContentField({ label, value, onChange, icon }: { label: string; value: string; onChange: (value: string) => void; icon?: IconName }) {
  return <label className="content-field"><span>{label}</span><div>{icon && <Icon name={icon} size={13} />}<input value={value} onChange={(event) => onChange(event.target.value)} /></div></label>
}

function InspectorGroup({ title, icon, children }: { title: string; icon: IconName; children: ReactNode }) {
  return <section className="inspector-group"><div className="inspector-group-title"><span><Icon name={icon} size={14} />{title}</span><Icon name="chevron-down" size={14} /></div>{children}</section>
}

function PreviewOverlay({ project, theme, onClose }: { project: Project; theme: Theme; onClose: () => void }) {
  return <div className="preview-overlay"><div className="preview-overlay-top"><div className="preview-url"><span className="url-dot" /><span>atelier.site/{project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}</span><Icon name="lock" size={12} /></div><div className="preview-overlay-actions"><span className="preview-mode-label"><Icon name="eye" size={14} />Vue visiteur</span><button type="button" className="preview-close" onClick={onClose}>Fermer <Icon name="x" size={16} /></button></div></div><div className="preview-viewport"><div className="preview-device" style={{ background: theme.background, color: theme.ink }}><div className="preview-device-nav"><strong style={{ color: theme.accent }}>{project.title}</strong><div><span>Programme</span><span>Infos</span><span>RSVP</span></div></div><div className="preview-device-hero"><div><span className="canvas-eyebrow" style={{ color: theme.accent }}>{project.subtitle.toUpperCase()}</span><h1 style={{ fontFamily: theme.displayFont }}>{project.title.split(' & ')[0]} <em>&</em><br />{project.title.split(' & ')[1] ?? 'vous'}</h1><p>{project.date}</p><button type="button" style={{ background: theme.accent, color: theme.background }}>Découvrir <Icon name="arrow-right" size={14} /></button></div><div className="preview-portrait" style={{ background: theme.accentSoft, borderColor: theme.accent }}><span>IMAGE<br />À VENIR</span></div></div><div className="preview-device-info" style={{ borderColor: `${theme.accent}66` }}><div><span>LE LIEU</span><strong>{project.location}</strong></div><div><span>À RETENIR</span><strong>Un moment<br />à partager.</strong></div><div><span>LA SUITE</span><strong>Voir le programme <Icon name="arrow-right" size={14} /></strong></div></div></div></div></div>
}

export default App
