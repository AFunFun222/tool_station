import type { NavItem, QuickTool } from '@/types/common'

export const navItems: NavItem[] = [
  { label: 'Home', route: '/' },
  { label: 'Book', route: '/pals' },
  { label: 'Breeding', route: '/breeding' },
  { label: 'Strategy', route: '/beginner' },
  { label: 'Map', route: '/map' },
  { label: 'Community', route: '/community' },
  { label: 'Change', route: '/changelog' },
]

export const quickTools: QuickTool[] = [
  {
    id: 'breeding',
    title: 'Breeding Calculator',
    description: 'Query popular breeding paths in both directions, quickly find your target Pal.',
    route: '/breeding',
    accent: 'teal',
    icon: 'Calculator',
  },
  {
    id: 'encyclopedia',
    title: 'Pal Compendium',
    description: 'View element types, skills, work suitability, and drop information.',
    route: '/pals',
    accent: 'blue',
    icon: 'BookOpenText',
  },
  {
    id: 'advisor',
    title: 'AI Advisor',
    description: 'Ask natural language questions, get actionable breeding advice.',
    route: '/advisor',
    accent: 'teal',
    icon: 'Sparkles',
  },
  {
    id: 'map',
    title: 'Interactive Map',
    description: 'View areas, bosses, caves, black markets, and Pal day/night distribution.',
    route: '/map',
    accent: 'purple',
    icon: 'Map',
  },
]
