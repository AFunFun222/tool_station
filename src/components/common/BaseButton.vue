<template>
  <button
    class="cyber-btn relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold tracking-widest uppercase transition-all duration-200 active:scale-95 select-none overflow-hidden"
    :class="[buttonClass, disabled ? 'cursor-not-allowed opacity-50' : '']"
    :disabled="disabled"
  >
    <!-- Scan line sweep on hover -->
    <span class="btn-sweep" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    tone?: 'teal' | 'orange' | 'blue' | 'ghost' | 'magenta'
    disabled?: boolean
  }>(),
  {
    tone: 'teal',
    disabled: false,
  },
)

const buttonClass = computed(() => {
  const map = {
    teal: 'border border-cyan-400/60 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(0,229,255,0.4),0_0_40px_rgba(0,229,255,0.15)]',
    orange: 'border border-orange-400/60 bg-orange-400/10 text-orange-300 hover:bg-orange-400/20 hover:border-orange-400 hover:text-white hover:shadow-[0_0_20px_rgba(251,146,60,0.4),0_0_40px_rgba(251,146,60,0.15)]',
    blue: 'border border-sky-400/60 bg-sky-400/10 text-sky-300 hover:bg-sky-400/20 hover:border-sky-400 hover:text-white hover:shadow-[0_0_20px_rgba(56,189,248,0.4),0_0_40px_rgba(56,189,248,0.15)]',
    magenta: 'border border-pink-500/60 bg-pink-500/10 text-pink-300 hover:bg-pink-500/20 hover:border-pink-400 hover:text-white hover:shadow-[0_0_20px_rgba(255,0,128,0.4),0_0_40px_rgba(255,0,128,0.15)]',
    ghost: 'border border-white/15 bg-white/5 text-slate-300 hover:border-cyan-400/30 hover:bg-white/10 hover:text-white',
  }

  return map[props.tone]
})
</script>

<style scoped>
.cyber-btn {
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
  letter-spacing: 0.08em;
}

.btn-sweep {
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.15), transparent);
  transform: skewX(-15deg);
  transition: left 0.4s ease;
  pointer-events: none;
}

.cyber-btn:hover .btn-sweep {
  left: 150%;
}
</style>
