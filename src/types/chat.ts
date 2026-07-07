export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
  status?: 'streaming' | 'done' | 'error'
  errorMessage?: string
  structured?: {
    formula: string
    materials: string
    estimatedTime: string
    successRate: string
    alternatives: string[]
    detailRoute: string
  }
}
