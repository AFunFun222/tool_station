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

      <BaseCard class="flex min-h-[720px] flex-col">
        <div class="flex-1 space-y-4 overflow-y-auto pr-1 scrollbar-hidden">
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
            <input
              v-model="draft"
              class="min-h-[52px] flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-slate-500"
              placeholder="输入你的问题，例如：怎么配出最强战斗帕鲁？"
            />
            <BaseButton tone="teal" @click="sendMessage">发送</BaseButton>
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

const breadcrumbs = [
  { label: '首页', route: '/' },
  { label: 'AI帕鲁顾问' },
]

const draft = ref('')
const messages = ref([...initialMessages])

const sendMessage = () => {
  if (!draft.value.trim()) return

  messages.value.push({
    id: `user-${Date.now()}`,
    role: 'user',
    text: draft.value,
  })

  messages.value.push({
    id: `assistant-${Date.now()}`,
    role: 'assistant',
    text: '为你找到以下配种方案：',
    structured: {
      formula: '疾风隼 × 烽歌龙 = 空涡龙',
      materials: '高级帕鲁球 x5',
      estimatedTime: '~2小时',
      successRate: '85%',
      alternatives: ['替代方案: 疾风隼 × 紫霞鹿', '替代方案: 烽歌龙 × 云海鹿'],
      detailRoute: '/pals/kongwolong',
    },
  })

  draft.value = ''
}
</script>
