<template>
  <span class="cyber-tag inline-flex items-center px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-widest text-cyan-300/80 border border-cyan-400/20 bg-cyan-400/5 transition-all duration-200 hover:border-cyan-400/40 hover:text-cyan-200 hover:bg-cyan-400/10">
    <span class="mr-1 text-cyan-400/50">#</span>{{ label }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<style scoped>
.cyber-tag {
  clip-path: polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px));
}
</style>
