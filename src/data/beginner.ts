import type { GuideCard } from '@/types/guide'

export const roadmapSteps = [
  { title: 'Create Character', level: 'Lv1', description: 'Complete initial tutorial and collect basic materials.', active: false },
  { title: 'Catch First Pal', level: 'Lv5', description: 'Prioritize catching work-type Pals to improve gathering efficiency.', active: false },
  { title: 'Establish Base', level: 'Lv10', description: 'Establish first base on initial plateau and set up production line.', active: true },
  { title: 'Challenge First Boss', level: 'Lv15', description: 'Prepare copper ore equipment and basic potions.', active: false },
  { title: 'Unlock Breeding', level: 'Lv20', description: 'Begin trying the first flying mount breeding path.', active: false },
]

export const beginnerSuggestion = 'Based on your progress (Lv10), we recommend: 1. Establish base on initial plateau 2. Catch 3 work Pals to start automation 3. Prepare copper ore equipment'

export const beginnerGuides: GuideCard[] = [
  {
    id: 'beginner-1',
    title: 'Beginner Base Location Guide',
    summary: 'Ore points, terrain, and defense trinity, quickly find the most stable early exploration base.',
    sourceLabel: 'AI Aggregated · Bilibili · TapTap',
    sourcePlatform: 'Bilibili / TapTap',
    viewCount: '86K',
    cover: './pic/show1.png',
    tags: ['Base Building'],
    route: '/beginner',
  },
  {
    id: 'beginner-2',
    title: 'Early Stage Optimal Pal Lineup',
    summary: 'Around three lines of combat, gathering, and work, recommend three Pals most suitable for early exploration.',
    sourceLabel: 'AI Aggregated · 17173 · Zhihu',
    sourcePlatform: '17173 / Zhihu',
    viewCount: '69K',
    cover: './pic/show2.png',
    tags: ['Lineup Recommendation'],
    route: '/beginner',
  },
  {
    id: 'beginner-3',
    title: 'How to Catch Pals Fastest',
    summary: 'From stealth backstab to Pal sphere selection, improve early-stage catching success rate.',
    sourceLabel: 'AI Aggregated · Official · Community',
    sourcePlatform: 'Official / Community',
    viewCount: '52K',
    cover: './pic/show3.png',
    tags: ['Catching Tips'],
    route: '/beginner',
  },
]
