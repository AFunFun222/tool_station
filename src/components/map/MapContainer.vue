<template>
  <!-- 地图视窗容器 -->
  <div
    ref="viewportRef"
    class="relative flex-1 overflow-hidden bg-slate-950 cursor-grab select-none"
    :class="{ 'cursor-grabbing': isDragging }"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mouseleave="onMouseUp"
    @wheel.prevent="onWheel"
    @click="onViewportClick"
  >
    <!-- 可变换的地图世界 -->
    <div
      ref="worldRef"
      class="absolute top-0 left-0 origin-top-left"
      :style="worldStyle"
    >
      <!-- 瓦片层 -->
      <div
        class="absolute top-0 left-0"
        :style="{ width: MAP_PIXEL_SIZE + 'px', height: MAP_PIXEL_SIZE + 'px' }"
      >
        <img
          v-for="tile in visibleTiles"
          :key="tile.key"
          :src="tile.src"
          :style="{
            position: 'absolute',
            left: tile.x + 'px',
            top: tile.y + 'px',
            width: TILE_DISPLAY_SIZE + 'px',
            height: TILE_DISPLAY_SIZE + 'px',
          }"
          draggable="false"
        />
      </div>

      <!-- 标记层 -->
      <div
        v-for="marker in filteredMarkers"
        :key="`${marker.type}-${marker.ipos.X}-${marker.ipos.Y}`"
        class="absolute z-10 flex items-center justify-center"
        :style="markerStyle(marker)"
        @click.stop="selectMarker(marker)"
      >
        <!-- 标记点 -->
        <div
          class="relative flex items-center justify-center rounded-full transition-transform hover:scale-125 cursor-pointer"
          :class="selectedMarker?.ipos.X === marker.ipos.X && selectedMarker?.ipos.Y === marker.ipos.Y
            ? 'ring-2 ring-white ring-offset-1 ring-offset-transparent scale-125'
            : ''"
          :style="{
            width: markerSize(marker) + 'px',
            height: markerSize(marker) + 'px',
            backgroundColor: getTypeColor(marker.type) + '33',
            border: `2px solid ${getTypeColor(marker.type)}`,
          }"
        >
          <img
            v-if="getMarkerIcon(marker)"
            :src="getMarkerIcon(marker)!"
            class="rounded-full object-contain"
            :style="{ width: (markerSize(marker) - 6) + 'px', height: (markerSize(marker) - 6) + 'px' }"
            draggable="false"
          />
          <span v-else class="text-[10px]">{{ getCategoryIcon(marker.type) }}</span>
        </div>
      </div>
    </div>

    <!-- 缩放控制 -->
    <div class="absolute right-4 top-4 z-20 flex flex-col gap-1">
      <button
        class="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-slate-900/90 text-white backdrop-blur transition hover:bg-white/10"
        @click.stop="zoomIn"
      >
        <Plus class="h-4 w-4" />
      </button>
      <button
        class="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-slate-900/90 text-white backdrop-blur transition hover:bg-white/10"
        @click.stop="zoomOut"
      >
        <Minus class="h-4 w-4" />
      </button>
      <button
        class="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-slate-900/90 text-slate-400 backdrop-blur transition hover:bg-white/10 hover:text-white"
        title="重置视图"
        @click.stop="resetView"
      >
        <RotateCcw class="h-3.5 w-3.5" />
      </button>
    </div>

    <!-- 缩放比例指示 -->
    <div class="absolute left-4 bottom-4 z-20 rounded-lg border border-white/10 bg-slate-900/80 px-2.5 py-1 text-xs text-slate-400 backdrop-blur">
      {{ Math.round(viewZoom * 100) }}%
    </div>

    <!-- 弹出信息 -->
    <MapPopup />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Plus, Minus, RotateCcw } from 'lucide-vue-next'
import {
  filteredMarkers,
  selectedMarker,
  selectMarker,
  getTypeColor,
  getMarkerIcon,
  filterCategories,
  viewZoom,
  viewOffsetX,
  viewOffsetY,
  zoomIn,
  zoomOut,
  resetView,
  iposToPixel,
  MAP_PIXEL_SIZE,
} from '@/composables/useMapState'
import type { MapMarkerData } from '@/types/map'
import MapPopup from './MapPopup.vue'

// ── 视窗 ref ──────────────────────────────────────────────
const viewportRef = ref<HTMLElement | null>(null)
const worldRef = ref<HTMLElement | null>(null)

// ── 地图变换样式 ──────────────────────────────────────────
const worldStyle = computed(() => ({
  transform: `translate(${viewOffsetX.value}px, ${viewOffsetY.value}px) scale(${viewZoom.value})`,
  width: MAP_PIXEL_SIZE + 'px',
  height: MAP_PIXEL_SIZE + 'px',
}))

// ── 瓦片层：计算当前缩放级别对应的瓦片 ───────────────────
// 使用z3(8x8)作为主瓦片层，清晰度好且数量合理
const DISPLAY_ZOOM_LEVEL = 3
const TILES_PER_SIDE = Math.pow(2, DISPLAY_ZOOM_LEVEL) // 8
// 每个瓦片在地图像素空间中应占的尺寸（必须与 MAP_PIXEL_SIZE 匹配）
const TILE_DISPLAY_SIZE = MAP_PIXEL_SIZE / TILES_PER_SIDE // 4096 / 8 = 512

const visibleTiles = computed(() => {
  const tiles = []
  for (let tx = 0; tx < TILES_PER_SIDE; tx++) {
    for (let ty = 0; ty < TILES_PER_SIDE; ty++) {
      tiles.push({
        key: `z${DISPLAY_ZOOM_LEVEL}x${tx}y${ty}`,
        src: `/map/tiles/z${DISPLAY_ZOOM_LEVEL}x${tx}y${ty}.webp`,
        x: tx * TILE_DISPLAY_SIZE,
        y: ty * TILE_DISPLAY_SIZE,
      })
    }
  }
  return tiles
})

// ── 标记位置计算 ──────────────────────────────────────────
function markerStyle(marker: MapMarkerData) {
  const { px, py } = iposToPixel(marker.ipos.X, marker.ipos.Y)
  const size = markerSize(marker)
  return {
    left: (px - size / 2) + 'px',
    top: (py - size / 2) + 'px',
    width: size + 'px',
    height: size + 'px',
  }
}

function markerSize(marker: MapMarkerData): number {
  switch (marker.type) {
    case 'Alpha Pal':
    case 'Tower':
      return 32
    case 'Fast Travel':
    case 'Region':
      return 28
    default:
      return 22
  }
}

function getCategoryIcon(type: string): string {
  for (const cat of filterCategories) {
    if (cat.types.includes(type)) return cat.icon
  }
  return '📍'
}

// ── 拖拽逻辑 ──────────────────────────────────────────────
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const offsetStart = ref({ x: 0, y: 0 })

function onMouseDown(e: MouseEvent) {
  if (e.button !== 0) return
  isDragging.value = true
  dragStart.value = { x: e.clientX, y: e.clientY }
  offsetStart.value = { x: viewOffsetX.value, y: viewOffsetY.value }
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return
  viewOffsetX.value = offsetStart.value.x + (e.clientX - dragStart.value.x)
  viewOffsetY.value = offsetStart.value.y + (e.clientY - dragStart.value.y)
}

function onMouseUp() {
  isDragging.value = false
}

// ── 滚轮缩放（以鼠标为中心） ──────────────────────────────
function onWheel(e: WheelEvent) {
  const viewport = viewportRef.value
  if (!viewport) return

  const rect = viewport.getBoundingClientRect()
  const mouseX = e.clientX - rect.left
  const mouseY = e.clientY - rect.top

  const prevZoom = viewZoom.value
  const delta = e.deltaY > 0 ? -0.15 : 0.15
  const newZoom = Math.max(0.3, Math.min(4, +(prevZoom + delta).toFixed(2)))

  // 以鼠标位置为锚点调整偏移
  const scale = newZoom / prevZoom
  viewOffsetX.value = mouseX - scale * (mouseX - viewOffsetX.value)
  viewOffsetY.value = mouseY - scale * (mouseY - viewOffsetY.value)
  viewZoom.value = newZoom
}

// ── 点击空白取消选中 ──────────────────────────────────────
function onViewportClick() {
  if (!isDragging.value) {
    selectMarker(null)
  }
}

// ── 初始化：居中显示地图 ──────────────────────────────────
onMounted(() => {
  const viewport = viewportRef.value
  if (!viewport) return
  const vw = viewport.clientWidth
  const vh = viewport.clientHeight
  const initialZoom = 0.6
  viewZoom.value = initialZoom
  // 居中偏移
  viewOffsetX.value = (vw - MAP_PIXEL_SIZE * initialZoom) / 2
  viewOffsetY.value = (vh - MAP_PIXEL_SIZE * initialZoom) / 2
})
</script>
