<template>
  <BaseCard class="border-teal-400/20 bg-gradient-to-r from-teal-400/10 via-white/5 to-orange-400/10">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center gap-3">
        <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-400/15 text-teal-300">
          <Sparkles class="h-5 w-5" />
        </div>
        <p class="text-sm text-slate-100 sm:text-base">AI Real-time Guide Crawling · Auto Data Cleaning · Personalized Distribution</p>
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
