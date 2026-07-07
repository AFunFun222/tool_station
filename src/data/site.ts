import type { NavItem, QuickTool } from '@/types/common'

export const navItems: NavItem[] = [
  { label: '首页', route: '/' },
  { label: '图鉴', route: '/pals' },
  { label: '配种', route: '/breeding' },
  { label: '攻略', route: '/beginner' },
  { label: '1.0变更', route: '/veteran-analysis' },
]

export const quickTools: QuickTool[] = [
  {
    id: 'breeding',
    title: '配种计算器',
    description: '双向查询热门配种路径，快速找到目标帕鲁。',
    route: '/breeding',
    accent: 'teal',
    icon: 'Calculator',
  },
  {
    id: 'encyclopedia',
    title: '帕鲁图鉴',
    description: '查看属性、技能、工作适应性与掉落信息。',
    route: '/pals',
    accent: 'blue',
    icon: 'BookOpenText',
  },
  {
    id: 'advisor',
    title: 'AI顾问',
    description: '自然语言提问，获得可执行的养成建议。',
    route: '/advisor',
    accent: 'teal',
    icon: 'Sparkles',
  },
  {
    id: 'analysis',
    title: '1.0变更',
    description: '输入存档信息，生成个性化回坑指南。',
    route: '/veteran-analysis',
    accent: 'orange',
    icon: 'Radar',
  },
]
