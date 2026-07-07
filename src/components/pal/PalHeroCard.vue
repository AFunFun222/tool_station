<template>
  <div class="relative overflow-hidden rounded-3xl" style="background: linear-gradient(160deg, #0f1a35 0%, #0a1628 60%, #070e1f 100%);">
    <!-- 背景光晕 -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full opacity-20"
           :style="{ background: `radial-gradient(circle, ${pal.accent} 0%, transparent 70%)` }"></div>
    </div>

    <!-- 帕鲁图片 -->
    <div class="relative h-80 flex items-center justify-center overflow-hidden">
      <img
        :src="pal.avatar"
        :alt="pal.name"
        class="h-full w-full object-contain drop-shadow-2xl"
        style="filter: drop-shadow(0 0 40px rgba(56, 189, 248, 0.3));"
      />
    </div>

    <!-- 底部信息覆盖层 -->
    <div class="relative px-6 pb-5 pt-4">
      <!-- 名称 + 编号 -->
      <div class="flex items-end justify-between gap-4">
        <h1 class="text-4xl font-bold text-white tracking-wide">{{ pal.name }}</h1>
        <span class="text-sm text-slate-400 mb-1 shrink-0">Pal No. {{ pal.number }}</span>
      </div>

      <!-- 属性标签 + 稀有度 -->
      <div class="mt-3 flex items-center gap-4">
        <div class="flex items-center gap-1.5 rounded-lg px-3 py-1.5"
             style="background: rgba(139, 92, 246, 0.25); border: 1px solid rgba(139, 92, 246, 0.4);">
          <span class="text-base">🐉</span>
          <span class="text-sm font-medium text-purple-300">{{ pal.elements.join(' / ') }}</span>
        </div>
        <div class="flex items-center gap-0.5">
          <template v-for="i in 5" :key="i">
            <StarIcon
              :size="18"
              :class="i <= pal.rarity ? 'text-amber-400' : 'text-slate-700'"
              :fill="i <= pal.rarity ? 'currentColor' : 'none'"
            />
          </template>
        </div>
      </div>
    </div>

    <!-- 版本备注条幅 -->
    <div v-if="pal.versionNote"
         class="mx-4 mb-4 flex items-center gap-2 rounded-xl px-4 py-2.5"
         style="background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.35);">
      <AlertCircleIcon :size="15" class="text-amber-400 shrink-0" />
      <span class="text-xs font-semibold text-amber-400">1.0变更</span>
      <span class="text-xs text-amber-300/80">{{ pal.versionNote }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star as StarIcon, AlertCircle as AlertCircleIcon } from 'lucide-vue-next'
import type { PalDetail } from '@/types/pal'

defineProps<{
  pal: PalDetail
}>()
</script>
