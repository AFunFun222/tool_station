export type AccentTone = 'teal' | 'orange' | 'purple' | 'blue' | 'slate'

export interface NavItem {
  label: string
  route: string
}

export interface BreadcrumbItem {
  label: string
  route?: string
}

export interface QuickTool {
  id: string
  title: string
  description: string
  route: string
  accent: AccentTone
  icon: string
}

export interface TagItem {
  label: string
  accent?: AccentTone
}
