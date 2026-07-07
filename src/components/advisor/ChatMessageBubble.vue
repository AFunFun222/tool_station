<template>
  <div class="flex" :class="message.role === 'user' ? 'justify-end' : 'justify-start'">
    <div
      class="max-w-3xl rounded-3xl px-5 py-4"
      :class="message.role === 'user' ? 'bg-teal-400 text-slate-950' : 'border border-white/10 bg-slate-900/80 text-white'"
    >
      <p class="text-sm leading-7">{{ message.text }}</p>
      <div v-if="message.structured" class="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-white">
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm font-semibold">
          {{ message.structured.formula }}
        </div>
        <div class="mt-4 grid gap-3 text-sm text-slate-200 md:grid-cols-3">
          <div class="rounded-2xl bg-white/5 p-3">所需材料：{{ message.structured.materials }}</div>
          <div class="rounded-2xl bg-white/5 p-3">预计时间：{{ message.structured.estimatedTime }}</div>
          <div class="rounded-2xl bg-white/5 p-3">成功率：{{ message.structured.successRate }}</div>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          <TagChip v-for="item in message.structured.alternatives" :key="item" :label="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TagChip from '@/components/common/TagChip.vue'
import type { ChatMessage } from '@/types/chat'

defineProps<{
  message: ChatMessage
}>()
</script>
