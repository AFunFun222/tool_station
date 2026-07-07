import type { ChatMessage } from '@/types/chat'

export const recentChats = ['世界树怎么去', '最强战斗帕鲁怎么配', '基地最佳分工']

export const hotQuestions = ['推荐前期坐骑', '最强战斗帕鲁', '基地最佳分工']

export const initialMessages: ChatMessage[] = [
  {
    id: 'msg-user-1',
    role: 'user',
    text: '我有 Lv30 疾风隼和 Lv25 烽歌龙，想配一个飞行坐骑',
    status: 'done',
  },
  {
    id: 'msg-ai-1',
    role: 'assistant',
    text: '为你找到以下配种方案：',
    status: 'done',
    structured: {
      formula: '疾风隼 × 烽歌龙 = 空涡龙',
      materials: '高级帕鲁球 x5',
      estimatedTime: '~2小时',
      successRate: '85%',
      alternatives: ['替代方案: 疾风隼 × 紫霞鹿', '替代方案: 烽歌龙 × 云海鹿'],
      detailRoute: '/pals/kongwolong',
    },
  },
]
