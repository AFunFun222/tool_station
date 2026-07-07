import type { GuideCard } from '@/types/guide'

export const roadmapSteps = [
  { title: '创建角色', level: 'Lv1', description: '完成初始教学并收集基础材料。', active: false },
  { title: '捕捉第一只帕鲁', level: 'Lv5', description: '优先捕捉工作型帕鲁，提升采集效率。', active: false },
  { title: '建立基地', level: 'Lv10', description: '在初始台地建立第一基地并铺设生产线。', active: true },
  { title: '挑战首个Boss', level: 'Lv15', description: '准备铜矿装备与基础药剂。', active: false },
  { title: '解锁配种', level: 'Lv20', description: '开始尝试第一条飞行坐骑配种路线。', active: false },
]

export const beginnerSuggestion = '根据你的进度（Lv10），建议你：1. 在初始台地建立基地 2. 捕捉3只工作帕鲁开始自动化 3. 准备铜矿装备'

export const beginnerGuides: GuideCard[] = [
  {
    id: 'beginner-1',
    title: '新手基地选址指南',
    summary: '矿点、地形、防守三位一体，快速找到最稳开荒基地。',
    sourceLabel: 'AI聚合 · B站·TapTap',
    sourcePlatform: 'B站 / TapTap',
    viewCount: '8.6万',
    cover: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
    tags: ['基地建设'],
    route: '/beginner',
  },
  {
    id: 'beginner-2',
    title: '前期最优帕鲁搭配',
    summary: '围绕战斗、采集、工作三条线，推荐最适合开荒的三只帕鲁。',
    sourceLabel: 'AI聚合 · 17173·知乎',
    sourcePlatform: '17173 / 知乎',
    viewCount: '6.9万',
    cover: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
    tags: ['阵容推荐'],
    route: '/beginner',
  },
  {
    id: 'beginner-3',
    title: '怎么捕捉帕鲁最快',
    summary: '从潜行背袭到帕鲁球选择，提升前期捕捉成功率。',
    sourceLabel: 'AI聚合 · 官方·社区',
    sourcePlatform: '官方 / 社区',
    viewCount: '5.2万',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80',
    tags: ['捕捉技巧'],
    route: '/beginner',
  },
]
