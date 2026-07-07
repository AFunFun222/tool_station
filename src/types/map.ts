/** 地图坐标（ipos格式，单位约为游戏坐标/1000） */
export interface MapIpos {
  X: number
  Y: number
}

/** iconLookup.json 中单个图标定义 */
export interface IconLookupEntry {
  category: string
  group?: string
  fixed_icon: string
  label: string
  icon_width: number
  icon_height: number
}

/** 地图标记基础结构 */
export interface MapMarkerData {
  item: string
  type: string
  lv?: number
  href?: string
  comment?: string
  class?: string
  fixed_icon?: string
  ipos: MapIpos
  /** 来源标识 */
  source: 'extras' | 'fixedDungeon' | 'extrasIngame' | 'region' | 'paldex'
}

/** 帕鲁分布位置（原始游戏坐标） */
export interface PalLocation {
  X: number
  Y: number
  Z: number
}

/** 帕鲁昼夜分布 */
export interface PalDistribution {
  dayTimeLocations?: { locations: PalLocation[] }
  nightTimeLocations?: { locations: PalLocation[] }
}

/** paldex_distribution.json 格式 */
export type PaldexDistribution = Record<string, PalDistribution>

/** 筛选类别配置 */
export interface FilterCategory {
  id: string
  label: string
  icon: string
  color: string
  types: string[]
  enabled: boolean
}

/** 地图配置 */
export interface MapConfig {
  minMapTextureBlockSize: { X: number; Y: number }
  landScapeRealPositionMin: { X: number; Y: number; Z: number }
  landScapeRealPositionMax: { X: number; Y: number; Z: number }
}

/** 地图视图状态 */
export interface MapViewState {
  /** 缩放级别 0-4 */
  zoom: number
  /** 视图偏移X（px） */
  offsetX: number
  /** 视图偏移Y（px） */
  offsetY: number
}
