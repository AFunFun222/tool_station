<template>
  <component
    :is="tag"
    class="card-glow rounded-3xl border border-white/10 bg-slate-900/70 p-5 transition-all duration-300"
    :class="interactive ? 'hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(78,205,196,0.12)]' : ''"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: string
    interactive?: boolean
  }>(),
  {
    tag: 'div',
    interactive: false,
  },
)
</script>
