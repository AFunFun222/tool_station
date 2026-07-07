<template>
  <BaseCard class="overflow-hidden p-0">
    <img :src="pal.avatar" :alt="pal.name" class="h-72 w-full object-cover" />
    <div class="space-y-4 p-6">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-sm text-slate-400">{{ pal.number }}</p>
          <h1 class="mt-2 text-3xl font-semibold text-white">{{ pal.name }}</h1>
        </div>
        <StatusBadge :label="pal.elements.join(' / ')" tone="blue" />
      </div>
      <p class="text-sm text-slate-300">{{ pal.description }}</p>
      <div class="text-amber-300">{{ '★'.repeat(pal.rarity) }}</div>
      <StatusBadge v-if="pal.versionNote" :label="pal.versionNote" tone="orange" />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/common/BaseCard.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import type { PalDetail } from '@/types/pal'

defineProps<{
  pal: PalDetail
}>()
</script>
