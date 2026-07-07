<template>
  <BaseCard interactive class="p-0">
    <RouterLink :to="guide.route" class="grid items-center gap-4 p-4 md:grid-cols-[120px_1fr_auto]">
      <img :src="guide.cover" :alt="guide.title" class="h-24 w-full rounded-2xl object-cover" />
      <div>
        <h3 class="text-lg font-semibold text-white">{{ guide.title }}</h3>
        <p class="mt-2 text-sm text-slate-300">{{ guide.summary }}</p>
        <p class="mt-3 text-xs text-slate-400">{{ guide.sourceLabel }}</p>
      </div>
      <div class="text-right text-sm text-slate-400">{{ guide.viewCount }}</div>
    </RouterLink>
  </BaseCard>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseCard from '@/components/common/BaseCard.vue'
import type { GuideCard } from '@/types/guide'

defineProps<{
  guide: GuideCard
}>()
</script>
