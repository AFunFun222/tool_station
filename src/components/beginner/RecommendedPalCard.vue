<template>
  <BaseCard interactive class="overflow-hidden p-0">
    <RouterLink :to="`/pals/${pal.id}`">
      <img :src="pal.avatar" :alt="pal.name" class="h-44 w-full object-cover" />
    </RouterLink>
    <div class="space-y-4 p-5">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-xs uppercase tracking-[0.25em] text-slate-400">{{ pal.number }}</p>
          <h3 class="text-xl font-semibold text-white">{{ pal.name }}</h3>
          <p class="mt-2 text-sm text-slate-300">Recommendation: {{ pal.recommendation }}</p>
        </div>
        <StatusBadge :label="pal.elements.join(' / ')" tone="teal" />
      </div>

      <div v-if="pal.workSuitability?.length" class="flex flex-wrap gap-2">
        <span
          v-for="item in pal.workSuitability.slice(0, 3)"
          :key="item.key"
          class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
        >
          {{ item.label }} Lv{{ item.level }}
        </span>
      </div>

      <div class="space-y-3">
        <div v-for="item in statItems" :key="item.label">
          <div class="mb-1 flex items-center justify-between text-xs text-slate-300">
            <span>{{ item.label }}</span>
            <span>{{ item.value }}</span>
          </div>
          <div class="h-2 rounded-full bg-white/10">
            <div class="h-2 rounded-full bg-teal-300" :style="{ width: `${item.value}%` }"></div>
          </div>
        </div>
      </div>

      <RouterLink :to="`/pals/${pal.id}`" class="block">
        <BaseButton tone="ghost" class="w-full">View Details</BaseButton>
      </RouterLink>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import type { PalSummary } from '@/types/pal'

const props = defineProps<{
  pal: PalSummary
}>()

const statItems = computed(() => [
  { label: 'Battle', value: props.pal.stats?.battle ?? 0 },
  { label: 'Gathering', value: props.pal.stats?.gather ?? 0 },
  { label: 'Work', value: props.pal.stats?.work ?? 0 },
])
</script>
