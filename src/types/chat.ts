export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
  structured?: {
    formula: string
    materials: string
    estimatedTime: string
    successRate: string
    alternatives: string[]
    detailRoute: string
  }
}
