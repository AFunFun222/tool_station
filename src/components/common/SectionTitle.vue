<template>
  <div class="flex items-center justify-between gap-4">
    <div>
      <p v-if="eyebrow" class="mb-2 text-xs uppercase tracking-[0.3em] text-slate-400">{{ eyebrow }}</p>
      <h2 class="text-2xl font-semibold text-white">{{ title }}</h2>
      <p v-if="description" class="mt-2 max-w-2xl text-sm text-slate-300">{{ description }}</p>
    </div>
    <slot name="action" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  eyebrow?: string
}>()
</script>
