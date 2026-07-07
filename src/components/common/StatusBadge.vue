<template>
  <span class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium" :class="badgeClass">
    <span class="h-2 w-2 rounded-full" :class="dotClass"></span>
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    tone?: 'teal' | 'orange' | 'blue' | 'purple' | 'red' | 'green' | 'slate'
  }>(),
  {
    tone: 'slate',
  },
)

const badgeClass = computed(() => {
  const map = {
    teal: 'border-teal-400/30 bg-teal-400/10 text-teal-200',
    orange: 'border-orange-400/30 bg-orange-400/10 text-orange-200',
    blue: 'border-sky-400/30 bg-sky-400/10 text-sky-200',
    purple: 'border-violet-400/30 bg-violet-400/10 text-violet-200',
    red: 'border-rose-400/30 bg-rose-400/10 text-rose-200',
    green: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
    slate: 'border-white/10 bg-white/5 text-slate-200',
  }

  return map[props.tone]
})

const dotClass = computed(() => {
  const map = {
    teal: 'bg-teal-300',
    orange: 'bg-orange-300',
    blue: 'bg-sky-300',
    purple: 'bg-violet-300',
    red: 'bg-rose-300',
    green: 'bg-emerald-300',
    slate: 'bg-slate-300',
  }

  return map[props.tone]
})
</script>
