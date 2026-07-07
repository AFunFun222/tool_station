<template>
  <BaseCard>
    <div class="flex items-center justify-between gap-3">
      <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
      <StatusBadge :label="badge" :tone="tone" />
    </div>
    <div class="mt-4 space-y-3">
      <div v-for="item in items" :key="item.name" class="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div class="flex items-center justify-between gap-3">
          <p class="font-medium text-white">{{ item.name }}</p>
          <span v-if="item.priority" class="text-xs text-slate-400">Priority {{ item.priority }}</span>
        </div>
        <p class="mt-2 text-sm leading-6 text-slate-300">{{ item.reason }}</p>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/common/BaseCard.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import type { TransferSuggestion } from '@/types/analysis'

defineProps<{
  title: string
  badge: string
  tone: 'teal' | 'orange' | 'blue' | 'purple' | 'red' | 'green' | 'slate'
  items: TransferSuggestion[]
}>()
</script>
