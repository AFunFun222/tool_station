<template>
  <div class="flex items-start justify-between gap-4">
    <div class="relative">
      <!-- Eyebrow with neon accent -->
      <div v-if="eyebrow" class="mb-3 flex items-center gap-2">
        <span class="h-px w-4 bg-cyan-400 opacity-80" />
        <p class="text-[10px] font-mono uppercase tracking-[0.35em] text-cyan-400/80">{{ eyebrow }}</p>
        <span class="h-px flex-1 bg-gradient-to-r from-cyan-400/30 to-transparent" />
      </div>
      <!-- Title with left accent bar -->
      <div class="flex items-center gap-3">
        <span class="h-7 w-1 shrink-0 rounded-sm" style="background: linear-gradient(180deg, #00e5ff, #a855f7); box-shadow: 0 0 8px rgba(0,229,255,0.6);" />
        <h2 class="text-2xl font-bold tracking-wide text-white" style="text-shadow: 0 0 20px rgba(0,229,255,0.2);">{{ title }}</h2>
      </div>
      <p v-if="description" class="mt-2 max-w-2xl text-sm text-slate-400 leading-relaxed pl-4">{{ description }}</p>
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
