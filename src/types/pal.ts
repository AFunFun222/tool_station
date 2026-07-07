export interface PalStat {
  label: string
  value: number
}

export interface PalWorkSuitabilityEntry {
  key: string
  label: string
  level: number
}

export interface SkillInfo {
  name: string
  description: string
  power?: string
}

export interface DropItem {
  name: string
  rate: string
}

export interface PalSummary {
  id: string
  name: string
  number: string
  rarity: number
  elements: string[]
  avatar: string
  accent: string
  recommendation?: string
  stats?: {
    battle: number
    gather: number
    work: number
  }
  versionNote?: string
  workSuitability?: PalWorkSuitabilityEntry[]
  detailUrl?: string
}

export interface PalDetail extends PalSummary {
  description: string
  passiveSkill: SkillInfo
  activeSkill: SkillInfo
  statsPanel: PalStat[]
  workSuitability: PalWorkSuitabilityEntry[]
  drops: DropItem[]
  activeSkills: Array<{
    level: number
    name: string
    element: string
    power: number
    cooltime: number
    description: string
  }>
  breedingRelations: Array<{
    formula: string
    route: string
  }>
}
