<template>
  <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    <BaseCard v-for="tool in tools" :key="tool.id" interactive>
      <RouterLink :to="tool.route" class="flex h-full flex-col gap-4">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl" :class="iconClass(tool.accent)">
          <component :is="resolveIcon(tool.icon)" class="h-6 w-6" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white">{{ tool.title }}</h3>
          <p class="mt-2 text-sm text-slate-300">{{ tool.description }}</p>
        </div>
      </RouterLink>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { BookOpenText, Calculator, Radar, Sparkles } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import BaseCard from '@/components/common/BaseCard.vue'
import type { QuickTool } from '@/types/common'

defineProps<{
  tools: QuickTool[]
}>()

const resolveIcon = (icon: string) => {
  const map = {
    Calculator,
    BookOpenText,
    Sparkles,
    Radar,
  }

  return map[icon as keyof typeof map] ?? Sparkles
}

const iconClass = (accent: QuickTool['accent']) => {
  const map = {
    teal: 'bg-teal-400/15 text-teal-300',
    orange: 'bg-orange-400/15 text-orange-300',
    blue: 'bg-sky-400/15 text-sky-300',
    purple: 'bg-violet-400/15 text-violet-300',
    slate: 'bg-white/10 text-white',
  }

  return map[accent]
}
</script>
