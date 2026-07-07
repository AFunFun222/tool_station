<template>
  <aside class="flex h-full w-64 shrink-0 flex-col gap-3 overflow-y-auto bg-slate-900/80 p-4 backdrop-blur">
    <!-- 标题 -->
    <div class="flex items-center gap-2 pb-1 border-b border-white/10">
      <Map class="h-4 w-4 text-teal-400" />
      <span class="text-sm font-semibold text-white">地图筛选</span>
    </div>

    <!-- 搜索框 -->
    <div class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <Search class="h-3.5 w-3.5 shrink-0 text-slate-400" />
      <input
        v-model="searchKeyword"
        class="w-full bg-transparent text-xs text-white outline-none placeholder:text-slate-500"
        placeholder="搜索标记..."
      />
      <button
        v-if="searchKeyword"
        class="text-slate-400 hover:text-white transition"
        @click="searchKeyword = ''"
      >
        <X class="h-3 w-3" />
      </button>
    </div>

    <!-- 全选 / 全不选 -->
    <div class="flex gap-2">
      <button
        class="flex-1 rounded-lg bg-white/5 border border-white/10 py-1 text-xs text-slate-300 hover:bg-white/10 transition"
        @click="toggleAll(true)"
      >全选</button>
      <button
        class="flex-1 rounded-lg bg-white/5 border border-white/10 py-1 text-xs text-slate-300 hover:bg-white/10 transition"
        @click="toggleAll(false)"
      >清空</button>
    </div>

    <!-- 类别列表 -->
    <div class="space-y-1.5">
      <button
        v-for="cat in filterCategories"
        :key="cat.id"
        class="w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition"
        :class="cat.enabled
          ? 'bg-white/10 border border-white/15'
          : 'bg-white/3 border border-white/5 opacity-60'"
        @click="cat.enabled = !cat.enabled"
      >
        <!-- 色块指示器 -->
        <span
          class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-sm"
          :style="{ backgroundColor: cat.enabled ? cat.color + '33' : 'transparent', borderColor: cat.color + '66', border: '1px solid' }"
        >{{ cat.icon }}</span>

        <div class="min-w-0 flex-1">
          <p class="truncate text-xs font-medium" :class="cat.enabled ? 'text-white' : 'text-slate-400'">
            {{ cat.label }}
          </p>
          <p class="text-[10px] text-slate-500">{{ cat.types.length }} 种类型</p>
        </div>

        <!-- 开关状态 -->
        <div
          class="h-4 w-4 shrink-0 rounded-full border transition"
          :class="cat.enabled
            ? 'border-transparent'
            : 'border-slate-600 bg-transparent'"
          :style="cat.enabled ? { backgroundColor: cat.color } : {}"
        >
          <Check v-if="cat.enabled" class="h-4 w-4 text-white p-0.5" />
        </div>
      </button>
    </div>

    <!-- 统计信息 -->
    <div class="mt-auto rounded-xl border border-white/10 bg-white/5 p-3">
      <p class="text-[11px] text-slate-400">
        当前显示
        <span class="font-semibold text-teal-400">{{ filteredCount }}</span>
        个标记
      </p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Search, Map, X, Check } from 'lucide-vue-next'
import {
  filterCategories,
  searchKeyword,
  filteredMarkers,
} from '@/composables/useMapState'
import { computed } from 'vue'

const filteredCount = computed(() => filteredMarkers.value.length)

function toggleAll(enabled: boolean) {
  for (const cat of filterCategories) {
    cat.enabled = enabled
  }
}
</script>
