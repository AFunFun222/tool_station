<template>
  <component
    :is="tag"
    class="cyber-card relative overflow-hidden border bg-[rgba(5,13,26,0.80)] p-5 backdrop-blur-xl transition-all duration-300"
    :class="[
      interactive
        ? 'cursor-pointer hover:-translate-y-1 hover:border-cyan-400/40 hover:card-glow-hover'
        : '',
      neon ? 'border-cyan-400/30 card-glow' : 'border-cyan-400/10 card-glow',
    ]"
  >
    <!-- Corner decorations -->
    <span class="corner corner-tl" />
    <span class="corner corner-tr" />
    <span class="corner corner-bl" />
    <span class="corner corner-br" />
    <!-- Inner top line accent -->
    <span class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-60" />
    <slot />
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: string
    interactive?: boolean
    neon?: boolean
  }>(),
  {
    tag: 'div',
    interactive: false,
    neon: false,
  },
)
</script>

<style scoped>
.cyber-card {
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
}

.corner {
  position: absolute;
  width: 10px;
  height: 10px;
  pointer-events: none;
  z-index: 2;
}

.corner-tl {
  top: 0;
  left: 0;
  border-top: 1.5px solid rgba(0, 229, 255, 0.7);
  border-left: 1.5px solid rgba(0, 229, 255, 0.7);
}

.corner-tr {
  top: 0;
  right: 0;
  border-top: 1.5px solid rgba(0, 229, 255, 0.7);
  border-right: 1.5px solid rgba(0, 229, 255, 0.7);
}

.corner-bl {
  bottom: 0;
  left: 0;
  border-bottom: 1.5px solid rgba(0, 229, 255, 0.4);
  border-left: 1.5px solid rgba(0, 229, 255, 0.4);
}

.corner-br {
  bottom: 0;
  right: 0;
  border-bottom: 1.5px solid rgba(0, 229, 255, 0.4);
  border-right: 1.5px solid rgba(0, 229, 255, 0.4);
}
</style>
