<template>
  <label class="block space-y-2">
    <span class="text-sm text-slate-300">{{ label }}</span>
    <select
      :value="modelValue"
      class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-teal-300"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-for="pal in options" :key="pal.id" :value="pal.id" class="bg-slate-900">
        {{ pal.name }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
import type { PalSummary } from '@/types/pal'

defineProps<{
  label: string
  modelValue: string
  options: PalSummary[]
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
