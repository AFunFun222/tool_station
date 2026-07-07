<template>
  <AppShell>
    <BreadcrumbBar :items="breadcrumbs" />

    <div class="flex flex-wrap items-center justify-between gap-4">
      <SectionTitle title="智能帕鲁顾问" description="用自然语言提问，获得可执行的养成建议。" />
      <StatusBadge label="AI 顾问在线" tone="teal" />
    </div>

    <section class="grid gap-5 xl:grid-cols-[280px_1fr]">
      <BaseCard>
        <h3 class="text-lg font-semibold text-white">最近对话</h3>
        <div class="mt-4 space-y-3">
          <button
            v-for="item in recentChats"
            :key="item"
            class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/10"
            @click="draft = item"
          >
            {{ item }}
          </button>
        </div>

        <h3 class="mt-8 text-lg font-semibold text-white">热门问题</h3>
        <div class="mt-4 flex flex-wrap gap-2">
          <TagChip v-for="item in hotQuestions" :key="item" :label="item" />
        </div>
      </BaseCard>

      <BaseCard class="flex min-h-[720px] flex-col overflow-hidden">
        <div class="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <div>
            <p class="text-sm font-semibold text-white">对话窗口</p>
            <p class="mt-1 text-xs text-slate-400">支持流式输出，回答会自动分段展示。</p>
          </div>
          <div class="rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-xs text-teal-200">
            {{ isSending ? '机器人思考中' : '可开始提问' }}
          </div>
        </div>

        <div class="flex-1 space-y-4 overflow-y-auto rounded-3xl border border-white/10 bg-slate-950/40 p-4 pr-2 scrollbar-hidden">
          <ChatMessageBubble v-for="message in messages" :key="message.id" :message="message" />
        </div>

        <div class="mt-6 border-t border-white/10 pt-5">
          <div class="mb-4 flex flex-wrap gap-2">
            <button
              v-for="item in hotQuestions"
              :key="item"
              class="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10"
              @click="draft = item"
            >
              {{ item }}
            </button>
          </div>

          <div class="flex flex-col gap-3 md:flex-row">
            <div class="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition focus-within:border-teal-400/60 focus-within:bg-white/8">
              <p class="mb-2 text-xs text-slate-400">输入问题</p>
              <input
                v-model="draft"
                class="min-h-[28px] w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                placeholder="输入你的问题，例如：怎么配出最强战斗帕鲁？"
                :disabled="isSending"
                @keydown.enter="sendMessage"
              />
            </div>
            <BaseButton tone="teal" :disabled="isSending" @click="sendMessage">
              {{ isSending ? '发送中...' : '发送' }}
            </BaseButton>
          </div>
        </div>
      </BaseCard>
    </section>
  </AppShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BreadcrumbBar from '@/components/common/BreadcrumbBar.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import TagChip from '@/components/common/TagChip.vue'
import ChatMessageBubble from '@/components/advisor/ChatMessageBubble.vue'
import AppShell from '@/layouts/AppShell.vue'
import { hotQuestions, initialMessages, recentChats } from '@/data/advisor'
import type { ChatMessage } from '@/types/chat'

const breadcrumbs = [
  { label: '首页', route: '/' },
  { label: 'AI帕鲁顾问' },
]

const draft = ref('')
const messages = ref([...initialMessages])
const isSending = ref(false)

const API_URL = 'https://llm.huya.info/v1/chat-messages'
const API_KEY = 'app-aTzqVVOz4ND9Z62lJLnLiL1q'

interface StreamResponse {
  event?: string
  answer?: string
}

const createMessageId = (role: ChatMessage['role']) => `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

const appendAssistantChunk = (messageId: string, chunk: string) => {
  const target = messages.value.find((message) => message.id === messageId)
  if (!target) return
  target.text += chunk
}

const formatAssistantText = (text: string) => {
  return text
    .replace(/\r/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/([。！？；])(?=\S)/g, '$1\n\n')
    .replace(/(\d+[.、]\s*)/g, '\n$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

const updateAssistantMessage = (messageId: string, patch: Partial<ChatMessage>) => {
  const target = messages.value.find((message) => message.id === messageId)
  if (!target) return
  Object.assign(target, patch)
}

const sendMessage = async () => {
  const question = draft.value.trim()
  if (!question || isSending.value) return

  const userMessage: ChatMessage = {
    id: createMessageId('user'),
    role: 'user',
    text: question,
    status: 'done',
  }

  const assistantMessageId = createMessageId('assistant')

  messages.value.push(userMessage)
  messages.value.push({
    id: assistantMessageId,
    role: 'assistant',
    text: '',
    status: 'streaming',
  })

  draft.value = ''
  isSending.value = true

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {},
        query: question,
        response_mode: 'streaming',
        conversation_id: '',
        user: 'advisor-web',
      }),
    })

    if (!response.ok || !response.body) {
      throw new Error(`请求失败：${response.status}`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const rawLine of lines) {
        const line = rawLine.trim()
        if (!line.startsWith('data: ')) continue

        const data = line.slice(6)
        if (!data || data === '[DONE]') continue

        try {
          const parsed = JSON.parse(data) as StreamResponse
          if (parsed.answer) {
            appendAssistantChunk(assistantMessageId, parsed.answer)
          }
        } catch {
          // 忽略非 JSON 流片段
        }
      }
    }

    const assistantMessage = messages.value.find((message) => message.id === assistantMessageId)
    updateAssistantMessage(assistantMessageId, {
      status: 'done',
      text: assistantMessage?.text?.trim()
        ? formatAssistantText(assistantMessage.text)
        : '暂未获取到有效回答，请稍后重试。',
    })
  } catch (error) {
    updateAssistantMessage(assistantMessageId, {
      status: 'error',
      text: '问答机器人暂时不可用。',
      errorMessage: error instanceof Error ? error.message : '未知错误',
    })
  } finally {
    isSending.value = false
  }
}
</script>
