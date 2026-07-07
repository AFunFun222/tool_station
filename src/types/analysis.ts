export interface ImpactCard {
  id: string
  title: string
  palName: string
  note: string
  tone: 'red' | 'green' | 'blue'
}

export interface TransferSuggestion {
  name: string
  reason: string
  priority?: '高' | '中' | '低'
}

export interface NewContentCard {
  title: string
  description: string
  route: string
}

export interface ChecklistItem {
  label: string
  checked: boolean
}

export interface ImpactDetail {
  name: string
  status: '削弱' | '不变' | '增强' | '新配种'
  description: string
  action: string
}
