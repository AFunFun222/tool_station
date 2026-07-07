<template>
  <div class="flex" :class="message.role === 'user' ? 'justify-end' : 'justify-start'">
    <div
      class="max-w-3xl rounded-3xl px-5 py-4 shadow-lg shadow-black/10"
      :class="message.role === 'user' ? 'bg-teal-400 text-slate-950' : 'border border-white/10 bg-slate-900/80 text-white'"
    >
      <div class="mb-3 flex items-center gap-2 text-xs">
        <span
          class="rounded-full px-2.5 py-1"
          :class="message.role === 'user' ? 'bg-slate-950/10 text-slate-900' : 'bg-white/10 text-slate-300'"
        >
          {{ message.role === 'user' ? '我' : 'AI 顾问' }}
        </span>
        <span v-if="message.status === 'streaming'" class="text-teal-300">正在生成中</span>
        <span v-else-if="message.status === 'error'" class="text-rose-300">生成失败</span>
      </div>

      <div class="space-y-3 text-sm leading-7">
        <template v-for="(block, index) in formattedBlocks" :key="`${message.id}-${index}`">
          <h4
            v-if="block.type === 'heading-2'"
            class="text-base font-semibold text-white"
          >
            {{ block.content }}
          </h4>
          <h5
            v-else-if="block.type === 'heading-3'"
            class="text-sm font-semibold text-teal-200"
          >
            {{ block.content }}
          </h5>
          <ul
            v-else-if="block.type === 'unordered-list'"
            class="space-y-2 pl-5 text-slate-100"
          >
            <li v-for="item in block.items" :key="item" class="list-disc whitespace-pre-wrap">
              {{ item }}
            </li>
          </ul>
          <ol
            v-else-if="block.type === 'ordered-list'"
            class="space-y-2 pl-5 text-slate-100"
          >
            <li v-for="item in block.items" :key="item" class="list-decimal whitespace-pre-wrap">
              {{ item }}
            </li>
          </ol>
          <p v-else class="whitespace-pre-wrap text-sm leading-7 text-slate-100">
            {{ block.content }}
          </p>
        </template>
      </div>
      <p v-if="message.status === 'streaming'" class="mt-3 text-xs text-teal-300">正在生成回答...</p>
      <p v-if="message.status === 'error' && message.errorMessage" class="mt-2 text-xs text-rose-300">
        {{ message.errorMessage }}
      </p>
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
import { computed } from 'vue'
import TagChip from '@/components/common/TagChip.vue'
import type { ChatMessage } from '@/types/chat'

const props = defineProps<{
  message: ChatMessage
}>()

type MessageBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading-2'; content: string }
  | { type: 'heading-3'; content: string }
  | { type: 'unordered-list'; items: string[] }
  | { type: 'ordered-list'; items: string[] }

const formattedBlocks = computed<MessageBlock[]>(() => {
  const text = props.message.text ?? ''

  if (props.message.role === 'user') {
    return [{ type: 'paragraph', content: text }]
  }

  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const blocks: MessageBlock[] = []
  let unorderedItems: string[] = []
  let orderedItems: string[] = []

  const flushLists = () => {
    if (unorderedItems.length) {
      blocks.push({ type: 'unordered-list', items: unorderedItems })
      unorderedItems = []
    }

    if (orderedItems.length) {
      blocks.push({ type: 'ordered-list', items: orderedItems })
      orderedItems = []
    }
  }

  for (const line of lines) {
    if (line.startsWith('## ')) {
      flushLists()
      blocks.push({ type: 'heading-2', content: line.replace(/^##\s+/, '') })
      continue
    }

    if (line.startsWith('### ')) {
      flushLists()
      blocks.push({ type: 'heading-3', content: line.replace(/^###\s+/, '') })
      continue
    }

    if (/^[-*]\s+/.test(line)) {
      orderedItems = []
      unorderedItems.push(line.replace(/^[-*]\s+/, ''))
      continue
    }

    if (/^\d+[.、]\s+/.test(line)) {
      unorderedItems = []
      orderedItems.push(line.replace(/^\d+[.、]\s+/, ''))
      continue
    }

    flushLists()
    blocks.push({ type: 'paragraph', content: line })
  }

  flushLists()

  return blocks.length ? blocks : [{ type: 'paragraph', content: text }]
})
</script>
