<template>
  <BaseCard interactive class="overflow-hidden p-0">
    <RouterLink :to="guide.route" class="grid h-full gap-0 md:grid-cols-[220px_1fr]">
      <img :src="guide.cover" :alt="guide.title" class="h-full min-h-[180px] w-full object-cover" />
      <div class="flex flex-col gap-4 p-5">
        <div class="flex flex-wrap gap-2">
          <TagChip v-for="tag in guide.tags" :key="tag" :label="tag" />
        </div>
        <div>
          <h3 class="text-xl font-semibold text-white">{{ guide.title }}</h3>
          <p class="mt-2 text-sm leading-6 text-slate-300">{{ guide.summary }}</p>
        </div>
        <div class="mt-auto flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span>{{ guide.sourceLabel }}</span>
          <span>·</span>
          <span>{{ guide.viewCount }} 浏览</span>
        </div>
      </div>
    </RouterLink>
  </BaseCard>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseCard from '@/components/common/BaseCard.vue'
import TagChip from '@/components/common/TagChip.vue'
import type { GuideCard } from '@/types/guide'

defineProps<{
  guide: GuideCard
}>()
</script>
