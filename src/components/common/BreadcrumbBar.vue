<template>
  <nav class="flex flex-wrap items-center gap-2 text-sm text-slate-400">
    <template v-for="(item, index) in items" :key="`${item.label}-${index}`">
      <RouterLink v-if="item.route" :to="item.route" class="transition hover:text-white">{{ item.label }}</RouterLink>
      <span v-else class="text-white">{{ item.label }}</span>
      <span v-if="index < items.length - 1">&gt;</span>
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
