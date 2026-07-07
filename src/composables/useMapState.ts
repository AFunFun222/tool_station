import { ref, computed, reactive } from 'vue'
import type { MapMarkerData, FilterCategory, MapConfig } from '@/types/map'
import extrasRaw from '../../map/extras.json'
import fixedDungeonRaw from '../../map/fixedDungeon.json'
import extrasIngameRaw from '../../map/extrasIngame.json'
import regionDataRaw from '../../map/regionData.json'
import iconLookupRaw from '../../map/iconLookup.json'
import configRaw from '../../map/config.json'

// ── 地图配置 ─────────────────────────────────────────────
const mapConfig = configRaw as MapConfig

// 使用实际数据的坐标范围（而不是配置文件中可能不准确的范围）
// 实际数据范围：X: -2160 到 1118, Y: -2049 到 996
// 添加5%的边距以确保标记不会触及边界
const DATA_MIN_X = -2160
const DATA_MAX_X = 1118
const DATA_MIN_Y = -2049
const DATA_MAX_Y = 996

const marginX = (DATA_MAX_X - DATA_MIN_X) * 0.05
const marginY = (DATA_MAX_Y - DATA_MIN_Y) * 0.05

const MAP_MIN_X = DATA_MIN_X - marginX
const MAP_MAX_X = DATA_MAX_X + marginX
const MAP_MIN_Y = DATA_MIN_Y - marginY
const MAP_MAX_Y = DATA_MAX_Y + marginY
const MAP_WIDTH = MAP_MAX_X - MAP_MIN_X
const MAP_HEIGHT = MAP_MAX_Y - MAP_MIN_Y

// z4 下地图像素尺寸：16 瓦片 × 256px
export const TILE_SIZE = 256
export const MAX_ZOOM = 4
export const MAP_PIXEL_SIZE = Math.pow(2, MAX_ZOOM) * TILE_SIZE // 4096

// ── 坐标转换 ─────────────────────────────────────────────
/** 将 ipos 坐标转换为地图像素坐标 */
export function iposToPixel(x: number, y: number): { px: number; py: number } {
  const px = ((x - MAP_MIN_X) / MAP_WIDTH) * MAP_PIXEL_SIZE
  // Y 轴翻转（ipos Y向上为正，像素Y向下为正）
  const py = ((MAP_MAX_Y - y) / MAP_HEIGHT) * MAP_PIXEL_SIZE
  return { px, py }
}

// ── 原始数据合并为统一格式 ─────────────────────────────────
function buildMarkers(): MapMarkerData[] {
  const markers: MapMarkerData[] = []

  for (const d of extrasRaw as any[]) {
    markers.push({ ...d, source: 'extras' })
  }
  for (const d of fixedDungeonRaw as any[]) {
    markers.push({ ...d, source: 'fixedDungeon' })
  }
  for (const d of extrasIngameRaw as any[]) {
    markers.push({ ...d, source: 'extrasIngame' })
  }
  for (const d of regionDataRaw as any[]) {
    markers.push({ ...d, source: 'region' })
  }

  return markers
}

const allMarkers = buildMarkers()

// ── 图标查找表 ─────────────────────────────────────────────
export const iconLookup = iconLookupRaw as unknown as Record<
  string,
  { category?: string; fixed_icon: string; label: string; icon_width: number; icon_height: number }
>

// ── 筛选类别配置 ──────────────────────────────────────────
export const filterCategories = reactive([
  {
    id: 'enemies',
    label: '敌人 / Boss',
    icon: '⚔️',
    color: '#ef4444',
    types: ['Alpha Pal', 'Enemy Camp', 'Tower', 'Bounty', 'Rampaging', 'Anti-Air Turret'],
    enabled: true,
  },
  {
    id: 'locations',
    label: '地点 / 传送',
    icon: '📍',
    color: '#3b82f6',
    types: ['Fast Travel', 'Dungeon', 'Heat Source', 'Treasure Map', 'Region'],
    enabled: true,
  },
  {
    id: 'npcs',
    label: 'NPC',
    icon: '🧑',
    color: '#f59e0b',
    types: ['Black Marketeer', 'Wandering Merchant', 'Arrogant Pal Critic'],
    enabled: true,
  },
  {
    id: 'resources',
    label: '资源 / 矿物',
    icon: '⛏️',
    color: '#10b981',
    types: ['Ore', 'Sulfur', 'Sulfur Cluster', 'Pure Quartz', 'Pure Quartz Cluster',
      'Crude Oil', 'Chromite', 'Hexolite Quartz', 'Nightstar Sand', 'Junk',
      'Kinship Peach', 'Fruit Tree'],
    enabled: false,
  },
  {
    id: 'fishing',
    label: '钓鱼 / 打捞',
    icon: '🎣',
    color: '#6366f1',
    types: ['Fishing Spot', 'Salvage Rank1', 'Salvage Rank2'],
    enabled: false,
  },
  {
    id: 'collectibles',
    label: '收集品',
    icon: '💎',
    color: '#ec4899',
    types: ['Lifmunk Effigy'],
    enabled: false,
  },
  {
    id: 'home',
    label: '基地推荐',
    icon: '🏠',
    color: '#8b5cf6',
    types: ['Home'],
    enabled: false,
  },
  {
    id: 'eggs',
    label: '帕鲁蛋',
    icon: '🥚',
    color: '#d97706',
    types: ['Feybreak Egg'],
    enabled: false,
  },
])

// ── 搜索关键词 ────────────────────────────────────────────
export const searchKeyword = ref('')

// ── 筛选后的标记列表 ─────────────────────────────────────
export const filteredMarkers = computed<MapMarkerData[]>(() => {
  const enabledTypes = new Set<string>()
  for (const cat of filterCategories) {
    if (cat.enabled) {
      for (const t of cat.types) enabledTypes.add(t)
    }
  }

  return allMarkers.filter((m) => {
    if (!enabledTypes.has(m.type)) return false
    if (searchKeyword.value) {
      const kw = searchKeyword.value.toLowerCase()
      return m.item.toLowerCase().includes(kw) || m.type.toLowerCase().includes(kw)
    }
    return true
  })
})

// ── 选中标记 ──────────────────────────────────────────────
export const selectedMarker = ref<MapMarkerData | null>(null)

export function selectMarker(marker: MapMarkerData | null) {
  selectedMarker.value = marker
}

// ── 地图视图状态 ──────────────────────────────────────────
export const viewZoom = ref(2)           // 显示缩放倍率（1~4倍）
export const viewOffsetX = ref(0)        // 视图偏移（像素）
export const viewOffsetY = ref(0)

export function zoomIn() {
  viewZoom.value = Math.min(4, +(viewZoom.value + 0.25).toFixed(2))
}

export function zoomOut() {
  viewZoom.value = Math.max(0.5, +(viewZoom.value - 0.25).toFixed(2))
}

export function resetView() {
  viewZoom.value = 1
  viewOffsetX.value = 0
  viewOffsetY.value = 0
}

/** 获取某类型对应的颜色 */
export function getTypeColor(type: string): string {
  for (const cat of filterCategories) {
    if (cat.types.includes(type)) return cat.color
  }
  return '#94a3b8'
}

/** 获取某标记的图标URL */
export function getMarkerIcon(marker: MapMarkerData): string | null {
  if (marker.fixed_icon) return marker.fixed_icon
  const entry = iconLookup[marker.type]
  return entry?.fixed_icon ?? null
}
