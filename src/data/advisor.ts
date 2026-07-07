import type { ChatMessage } from '@/types/chat'

export const recentChats = ['How to reach World Tree', 'Best combat Pal lineup', 'Optimal base division of labor']

export const hotQuestions = ['Recommended early-stage mounts', 'Strongest combat Pal', 'Optimal base division of labor']

export const initialMessages: ChatMessage[] = [
  {
    id: 'msg-user-1',
    role: 'user',
    text: 'I have Lv30 Swift Falcon and Lv25 Phoenix Dragon, want to breed a flying mount',
    status: 'done',
  },
  {
    id: 'msg-ai-1',
    role: 'assistant',
    text: 'Found the following breeding plan for you:',
    status: 'done',
    structured: {
      formula: 'Swift Falcon × Phoenix Dragon = Sky Vortex Dragon',
      materials: 'Advanced Pal Sphere x5',
      estimatedTime: '~2 hours',
      successRate: '85%',
      alternatives: ['Alternative: Swift Falcon × Purple Glow Deer', 'Alternative: Phoenix Dragon × Cloud Sea Deer'],
      detailRoute: '/pals/kongwolong',
    },
  },
]
