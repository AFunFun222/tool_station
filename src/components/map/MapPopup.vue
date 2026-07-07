<template>
  <Teleport to="body">
    <Transition name="popup">
      <div
        v-if="selectedMarker"
        class="fixed z-50 flex items-start gap-3 rounded-2xl border border-white/15 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl"
        :style="popupStyle"
        @click.stop
      >
        <!-- 图标 -->
        <div
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
          :style="{ backgroundColor: typeColor + '22', borderColor: typeColor + '44' }"
        >
          <img
            v-if="iconUrl"
            :src="iconUrl"
            class="h-7 w-7 object-contain"
            @error="imgError = true"
          />
          <span v-else class="text-lg">{{ categoryIcon }}</span>
        </div>

        <!-- 内容 -->
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold text-white leading-tight">{{ selectedMarker.item }}</p>
          <p class="mt-0.5 text-xs" :style="{ color: typeColor }">{{ selectedMarker.type }}</p>
          <p v-if="selectedMarker.lv" class="mt-1 text-xs text-slate-400">Lv.{{ selectedMarker.lv }}</p>
          <p v-if="selectedMarker.comment" class="mt-1 text-[11px] text-slate-500 leading-snug">
            {{ selectedMarker.comment }}
          </p>
          <div class="mt-2 flex items-center gap-1.5">
            <span class="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-400">
              X: {{ selectedMarker.ipos.X }}
            </span>
            <span class="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-400">
              Y: {{ selectedMarker.ipos.Y }}
            </span>
          </div>
        </div>

        <!-- 关闭 -->
        <button
          class="shrink-0 rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white transition"
          @click="selectMarker(null)"
        >
          <X class="h-4 w-4" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { X } from 'lucide-vue-next'
import {
  selectedMarker,
  selectMarker,
  getTypeColor,
  getMarkerIcon,
  filterCategories,
} from '@/composables/useMapState'

const imgError = ref(false)

const typeColor = computed(() =>
  selectedMarker.value ? getTypeColor(selectedMarker.value.type) : '#94a3b8'
)

const iconUrl = computed(() => {
  if (!selectedMarker.value || imgError.value) return null
  return getMarkerIcon(selectedMarker.value)
})

const categoryIcon = computed(() => {
  if (!selectedMarker.value) return '📍'
  const type = selectedMarker.value.type
  for (const cat of filterCategories) {
    if (cat.types.includes(type)) return cat.icon
  }
  return '📍'
})

// 弹出框固定在右下角
const popupStyle = computed(() => ({
  bottom: '1.5rem',
  right: '1.5rem',
  width: '280px',
}))
</script>

<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.97);
}
</style>
