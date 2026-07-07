<template>
  <button
    class="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 active:scale-95"
    :class="buttonClass"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    tone?: 'teal' | 'orange' | 'blue' | 'ghost'
    disabled?: boolean
  }>(),
  {
    tone: 'teal',
    disabled: false,
  },
)

const buttonClass = computed(() => {
  const map = {
    teal: 'bg-teal-400 text-slate-950 hover:bg-teal-300',
    orange: 'bg-orange-400 text-slate-950 hover:bg-orange-300',
    blue: 'bg-sky-400 text-slate-950 hover:bg-sky-300',
    ghost: 'border border-white/15 bg-white/5 text-white hover:bg-white/10',
  }

  return `${map[props.tone]} ${props.disabled ? 'cursor-not-allowed opacity-60' : 'shadow-lg shadow-black/20'}`
})
</script>
