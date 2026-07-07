<template>
  <div class="flex h-screen flex-col overflow-hidden bg-slate-950 text-white">
    <!-- 顶部导航栏 -->
    <AppHeader />

    <!-- 页面标题栏 -->
    <div class="flex shrink-0 items-center gap-3 border-b border-white/10 bg-slate-900/60 px-6 py-3 backdrop-blur">
      <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
        <Map class="h-4 w-4" />
      </div>
      <div>
        <h1 class="text-sm font-semibold text-white leading-none">Interactive Map</h1>
        <p class="mt-0.5 text-[11px] text-slate-500">Pal World · Boss / NPC / Resources / Fast Travel Points</p>
      </div>
      <div class="ml-auto flex items-center gap-2 text-xs text-slate-500">
        <span>Drag to Move</span>
        <span class="text-slate-700">·</span>
        <span>Scroll to Zoom</span>
        <span class="text-slate-700">·</span>
        <span>Click for Details</span>
      </div>
    </div>

    <!-- 主体区域：左侧筛选 + 右侧地图 -->
    <div class="flex flex-1 overflow-hidden">
      <!-- 左侧筛选面板 -->
      <MapFilterPanel />

      <!-- 右侧地图 -->
      <MapContainer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Map } from 'lucide-vue-next'
import AppHeader from '@/components/common/AppHeader.vue'
import MapFilterPanel from '@/components/map/MapFilterPanel.vue'
import MapContainer from '@/components/map/MapContainer.vue'
</script>
