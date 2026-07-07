<template>
  <BaseCard interactive class="group h-full overflow-hidden">
    <button class="flex h-full w-full flex-col items-start gap-4 text-left" @click="$emit('select')">
      <div class="flex h-14 w-14 items-center justify-center rounded-2xl" :style="{ backgroundColor: `${accent}22`, color: accent }">
        <component :is="iconComponent" class="h-7 w-7" />
      </div>
      <div>
        <h3 class="text-2xl font-semibold text-white">{{ title }}</h3>
        <p class="mt-2 text-sm text-slate-300">{{ subtitle }}</p>
      </div>
      <div class="mt-auto flex flex-wrap gap-2">
        <TagChip v-for="tag in tags" :key="tag" :label="tag" />
      </div>
    </button>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Leaf, RotateCcw, Trophy } from 'lucide-vue-next'
import BaseCard from '@/components/common/BaseCard.vue'
import TagChip from '@/components/common/TagChip.vue'

const props = defineProps<{
  title: string
  subtitle: string
  tags: string[]
  icon: 'Leaf' | 'RotateCcw' | 'Trophy'
  accent: string
}>()

defineEmits<{
  select: []
}>()

const iconComponent = computed(() => {
  const map = {
    Leaf,
    RotateCcw,
    Trophy,
  }

  return map[props.icon]
})
</script>
