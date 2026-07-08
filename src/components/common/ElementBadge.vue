<template>
  <!-- 单个属性图标+文字徽章 -->
  <span
    class="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1"
    :style="{
      background: bgColor,
      border: `1px solid ${borderColor}`,
    }"
  >
    <img
      v-if="imgUrl"
      :src="imgUrl"
      :alt="element"
      class="shrink-0"
      :class="iconSizeClass"
    />
    <span v-if="showLabel" class="font-medium" :style="{ color: textColor, fontSize: labelFontSize }">
      {{ element }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getElementImageUrl, elementColorMap, elementTextColorMap } from '@/utils/elementImage'

const props = withDefaults(defineProps<{
  /** 属性名，如 'Fire', 'Water', 'Neutral' */
  element: string
  /** 是否显示文字标签，默认 true */
  showLabel?: boolean
  /** 图标尺寸，sm=14px, md=18px, lg=24px */
  size?: 'sm' | 'md' | 'lg'
}>(), {
  showLabel: true,
  size: 'sm',
})

const key = computed(() => props.element.toLowerCase())
const imgUrl = computed(() => getElementImageUrl(props.element))
const bgColor = computed(() => elementColorMap[key.value] ?? 'rgba(148, 163, 184, 0.15)')
const borderColor = computed(() => (elementTextColorMap[key.value] ?? '#94a3b8') + '66')
const textColor = computed(() => elementTextColorMap[key.value] ?? '#94a3b8')

const iconSizeClass = computed(() => ({
  sm: 'w-3.5 h-3.5',
  md: 'w-4.5 h-4.5',
  lg: 'w-6 h-6',
}[props.size]))

const labelFontSize = computed(() => ({
  sm: '0.7rem',
  md: '0.75rem',
  lg: '0.875rem',
}[props.size]))
</script>
