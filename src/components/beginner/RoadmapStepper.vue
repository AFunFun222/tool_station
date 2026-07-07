<template>
  <div class="grid gap-4 xl:grid-cols-5">
    <BaseCard
      v-for="step in steps"
      :key="`${step.title}-${step.level}`"
      :class="step.active ? 'border-teal-400/40 bg-teal-400/10' : ''"
    >
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white">
          {{ step.level }}
        </div>
        <StatusBadge v-if="step.active" label="当前阶段" tone="teal" />
      </div>
      <h3 class="mt-4 text-lg font-semibold text-white">{{ step.title }}</h3>
      <p class="mt-2 text-sm leading-6 text-slate-300">{{ step.description }}</p>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '@/components/common/BaseCard.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'

defineProps<{
  steps: Array<{
    title: string
    level: string
    description: string
    active: boolean
  }>
}>()
</script>
