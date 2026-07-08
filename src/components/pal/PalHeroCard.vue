<template>
  <div class="relative overflow-hidden rounded-3xl flex flex-col" style="background: linear-gradient(160deg, #0f1a35 0%, #0a1628 60%, #070e1f 100%);">
    <!-- 背景光晕 -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full opacity-20"
           :style="{ background: `radial-gradient(circle, ${pal.accent} 0%, transparent 70%)` }"></div>
    </div>

    <!-- 帕鲁图片 -->
    <div class="relative h-72 flex items-center justify-center overflow-hidden shrink-0">
      <img
        :src="pal.avatar"
        :alt="pal.name"
        class="h-full w-full object-contain drop-shadow-2xl"
        style="filter: drop-shadow(0 0 40px rgba(56, 189, 248, 0.3));"
      />
    </div>

    <!-- 信息区 -->
    <div class="relative flex-1 flex flex-col px-6 pb-5 pt-4">
      <!-- 名称 + 编号 -->
      <div class="flex items-end justify-between gap-4">
        <h1 class="text-4xl font-bold text-white tracking-wide">{{ pal.name }}</h1>
        <span class="text-sm text-slate-400 mb-1 shrink-0">Pal No. {{ pal.number }}</span>
      </div>

      <!-- 属性标签 + 稀有度 -->
      <div class="mt-3 flex items-center gap-4">
        <div class="flex items-center gap-2">
          <ElementBadge v-for="el in pal.elements" :key="el" :element="el" size="md" />
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

      <!-- 版本备注 -->
      <div v-if="pal.versionNote"
           class="mt-4 flex items-center gap-2 rounded-xl px-4 py-2.5"
           style="background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.35);">
        <AlertCircleIcon :size="15" class="text-amber-400 shrink-0" />
        <span class="text-xs font-semibold text-amber-400">v1.0 Changes</span>
        <span class="text-xs text-amber-300/80">{{ pal.versionNote }}</span>
      </div>

      <!-- 分割线 -->
      <div class="mt-5 border-t" style="border-color: rgba(255,255,255,0.07);"></div>

      <!-- 基础属性速览 -->
      <div class="mt-4">
        <p class="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Basic Stats</p>
        <div class="space-y-2.5">
          <div v-for="stat in pal.statsPanel?.slice(0, 4)" :key="stat.label" class="flex items-center gap-3">
            <span class="w-6 text-xs text-slate-400 shrink-0">{{ stat.label }}</span>
            <div class="flex-1 h-1.5 rounded-full" style="background: rgba(255,255,255,0.08);">
              <div
                class="h-1.5 rounded-full transition-all"
                style="background: linear-gradient(90deg, #38bdf8, #818cf8);"
                :style="{ width: `${Math.min(stat.value, 100)}%` }"
              ></div>
            </div>
            <span class="w-7 text-right text-xs font-semibold text-white shrink-0">{{ stat.value }}</span>
          </div>
        </div>
      </div>

      <!-- 工作适应性速览 -->
      <div v-if="pal.workSuitability?.length" class="mt-5">
        <p class="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Work Suitability</p>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="item in pal.workSuitability"
            :key="item.key"
            class="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
            style="background: rgba(56,189,248,0.08); border: 1px solid rgba(56,189,248,0.2);"
          >
            <component :is="workIconMap[item.key] ?? HammerIcon" :size="13" class="text-sky-300 shrink-0" />
            <span class="text-xs text-slate-200">{{ item.label }}</span>
            <span class="text-xs font-bold text-sky-400">{{ item.level }}</span>
          </div>
        </div>
      </div>

      <!-- 掉落物速览 -->
      <div v-if="pal.drops?.length" class="mt-5">
        <p class="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Drops</p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="drop in pal.drops.slice(0, 5)"
            :key="drop.name"
            class="rounded-lg px-2.5 py-1 text-xs text-slate-300"
            style="background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.2);"
          >
            {{ drop.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star as StarIcon, AlertCircle as AlertCircleIcon, Hammer as HammerIcon, Flame, Droplets, Leaf, Zap, Wind, Mountain, ShieldHalf, Wrench, Wheat, TreePine, Fish } from 'lucide-vue-next'
import type { PalDetail } from '@/types/pal'
import ElementBadge from '@/components/common/ElementBadge.vue'

defineProps<{
  pal: PalDetail
}>()

const workIconMap: Record<string, any> = {
  kindling: Flame,
  watering: Droplets,
  planting: Leaf,
  generating_electricity: Zap,
  handiwork: Wrench,
  gathering: Mountain,
  lumbering: TreePine,
  mining: ShieldHalf,
  medicine_production: Wind,
  cooling: Wind,
  transporting: Fish,
  farming: Wheat,
}
</script>
