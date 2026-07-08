<template>
  <BaseCard class="relative overflow-hidden border-cyan-400/25 bg-gradient-to-r from-cyan-400/8 via-purple-500/5 to-pink-500/8">
    <!-- Animated scan line -->
    <div class="banner-scan-line" />
    <!-- Circuit dots decoration -->
    <div class="absolute right-4 top-4 opacity-20">
      <div class="grid grid-cols-4 gap-1.5">
        <span v-for="i in 12" :key="i" class="h-1 w-1 rounded-full bg-cyan-400" />
      </div>
    </div>

    <div class="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center gap-4">
        <div class="ai-icon relative flex h-12 w-12 shrink-0 items-center justify-center text-cyan-300"
          style="clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px)); background: rgba(0,229,255,0.1); border: 1px solid rgba(0,229,255,0.35);">
          <Sparkles class="h-5 w-5" />
          <span class="absolute inset-0 animate-ping rounded-sm bg-cyan-400/10" />
        </div>
        <div>
          <p class="text-xs font-mono uppercase tracking-widest text-cyan-400/70 mb-0.5">AI System Online</p>
          <p class="text-sm font-medium text-slate-200">Real-time Guide Crawling · Auto Data Cleaning · Personalized Distribution</p>
        </div>
      </div>
      <StatusBadge label="Real-time Updates" tone="teal" />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'
import BaseCard from '@/components/common/BaseCard.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
</script>

<style scoped>
.banner-scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.5), rgba(168, 85, 247, 0.4), transparent);
  animation: scan-banner 3s ease-in-out infinite;
  top: 0;
}

@keyframes scan-banner {
  0% { top: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
</style>
