<template>
  <BaseCard :class="toneClass">
    <p class="text-sm text-slate-300">{{ card.title }}</p>
    <h3 class="mt-3 text-2xl font-semibold text-white">{{ card.palName }}</h3>
    <p class="mt-2 text-sm leading-6 text-slate-300">{{ card.note }}</p>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '@/components/common/BaseCard.vue'
import type { ImpactCard } from '@/types/analysis'

const props = defineProps<{
  card: ImpactCard
}>()

const toneClass = computed(() => {
  const map = {
    red: 'border-rose-400/30 bg-rose-400/10',
    green: 'border-emerald-400/30 bg-emerald-400/10',
    blue: 'border-sky-400/30 bg-sky-400/10',
  }

  return map[props.card.tone]
})
</script>
