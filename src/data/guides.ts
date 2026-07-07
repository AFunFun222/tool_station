import type { GuideCard } from '@/types/guide'

export const hotGuides: GuideCard[] = [
  {
    id: 'guide-1',
    title: '新手基地选址指南',
    summary: '从矿点、地形与防守效率三个维度，帮你快速确定第一基地。',
    sourceLabel: 'AI聚合 · B站·TapTap',
    sourcePlatform: 'B站 / TapTap',
    viewCount: '12.8万',
    cover: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
    tags: ['基地建设', '新手必看'],
    route: '/beginner',
  },
  {
    id: 'guide-2',
    title: '前期最优帕鲁搭配',
    summary: '围绕战斗、采集、工作三条线，推荐最适合开荒的三只帕鲁。',
    sourceLabel: 'AI聚合 · 17173·知乎',
    sourcePlatform: '17173 / 知乎',
    viewCount: '9.4万',
    cover: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
    tags: ['阵容推荐', '开荒路线'],
    route: '/beginner',
  },
  {
    id: 'guide-3',
    title: '世界树探索前置清单',
    summary: '回坑玩家必看：等级、坐骑、物资与新机制准备一次讲清。',
    sourceLabel: 'AI聚合 · 官方·社区',
    sourcePlatform: '官方 / 社区',
    viewCount: '18.2万',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80',
    tags: ['1.0变更', '终局探索'],
    route: '/veteran-analysis',
  },
]
