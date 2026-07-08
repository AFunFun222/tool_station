<template>
  <nav class="flex flex-wrap items-center gap-2 font-mono text-xs text-slate-500 uppercase tracking-widest">
    <template v-for="(item, index) in items" :key="`${item.label}-${index}`">
      <RouterLink
        v-if="item.route"
        :to="item.route"
        class="text-cyan-400/60 transition hover:text-cyan-300"
      >{{ item.label }}</RouterLink>
      <span v-else class="text-cyan-300">{{ item.label }}</span>
      <span v-if="index < items.length - 1" class="text-cyan-400/30 mx-1">›</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { BreadcrumbItem } from '@/types/common'

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>
