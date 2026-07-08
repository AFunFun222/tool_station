import type { GuideCard } from '@/types/guide'

export const hotGuides: GuideCard[] = [
  {
    id: 'guide-1',
    title: 'Beginner Base Location Guide',
    summary: 'From three dimensions of ore points, terrain, and defense efficiency, help you quickly determine your first base.',
    sourceLabel: 'AI Aggregated · Bilibili · TapTap',
    sourcePlatform: 'Bilibili / TapTap',
    viewCount: '128K',
    cover: './pic/show1.png',
    tags: ['Base Building', 'Must-See for Beginners'],
    route: '/changelog',
  },
  {
    id: 'guide-2',
    title: 'Early Stage Optimal Pal Lineup',
    summary: 'Around three lines of combat, gathering, and work, recommend three Pals most suitable for early exploration.',
    sourceLabel: 'AI Aggregated · 17173 · Zhihu',
    sourcePlatform: '17173 / Zhihu',
    viewCount: '94K',
    cover: './pic/show2.png',
    tags: ['Lineup Recommendation', 'Early Exploration Route'],
    route: '/tier-list',
  },
  {
    id: 'guide-3',
    title: 'World Tree Exploration Preparation Checklist',
    summary: 'Must-see for returning players: Level, mounts, resources, and new mechanics preparation explained in one go.',
    sourceLabel: 'AI Aggregated · Official · Community',
    sourcePlatform: 'Official / Community',
    viewCount: '182K',
    cover: './pic/show3.png',
    tags: ['Version 1.0 Changes', 'Endgame Exploration'],
    route: '/veteran-analysis',
  },
]
