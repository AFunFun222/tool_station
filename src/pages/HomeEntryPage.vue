<template>
  <AppShell>
    <div
      class="absolute inset-0 -z-10"
      style="background-image: linear-gradient(180deg, rgba(15, 25, 35, 0.72) 0%, rgba(15, 25, 35, 0.88) 35%, rgba(11, 19, 28, 0.96) 100%), url('/pic/palworld_guide_bg.png'); background-size: cover; background-position: top center; background-repeat: no-repeat;"
    ></div>
    <section class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div>
        <p class="mb-4 text-sm uppercase tracking-[0.35em] text-teal-300">AI Powered · Personalized · Real-time Updates</p>
        <h1 class="max-w-3xl text-5xl font-semibold leading-tight text-white sm:text-6xl">
          <span class="text-gradient">Your Personal Pal Encyclopedia</span>
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          AI automatically aggregates guides from across the web, cleanses structured data, and dynamically recommends the most suitable content based on your player type and current needs.
        </p>
      </div>

      <BaseCard class="overflow-hidden p-0">
        <img src="/pic/banner.jpg" alt="Pal Encyclopedia Visual Cover" class="h-full min-h-[320px] w-full object-cover" />
      </BaseCard>
    </section>

    <section class="space-y-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <SectionTitle title="AI Advisor" eyebrow="Ask Anything" description="Select your player type and pick a question to get personalized AI advice." />
        <div class="rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-xs text-teal-200">AI Online</div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="tab in advisorTabs"
          :key="tab.id"
          class="rounded-full border px-4 py-2 text-sm font-medium transition"
          :class="activeTab === tab.id
            ? 'border-teal-400/60 bg-teal-400/15 text-teal-200'
            : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Question chips -->
      <div class="grid gap-3 sm:grid-cols-3">
        <button
          v-for="q in currentTabQuestions"
          :key="q"
          class="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left text-sm text-slate-200 transition hover:border-teal-400/40 hover:bg-teal-400/10 hover:text-white"
          @click="goToAdvisor(q)"
        >
          <div class="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-teal-400/15 text-teal-300">
            <MessageCircle class="h-4 w-4" />
          </div>
          {{ q }}
        </button>
      </div>
    </section>

    <AiCapabilityBanner />

    <!-- 互动地图入口：位于攻略与 1.0 变更之间 -->
    <section class="space-y-6">
      <SectionTitle title="Interactive Map" description="Explore the Pal World · View Boss / NPC / Resource / Fast Travel Point Distribution." />
      <RouterLink to="/map" class="block group">
        <BaseCard class="relative overflow-hidden p-0 transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_0_32px_rgba(168,85,247,0.15)]">
          <!-- 背景渐变装饰 -->
          <div class="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-slate-900/20 to-indigo-900/30 pointer-events-none" />
          <div class="relative flex items-center gap-6 p-6">
            <!-- 图标区域 -->
            <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400 ring-1 ring-purple-500/30 transition-transform group-hover:scale-110">
              <MapIcon class="h-8 w-8" />
            </div>
            <!-- 文字 -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h3 class="text-lg font-semibold text-white">Pal World Interactive Map</h3>
                <span class="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-medium text-purple-400 ring-1 ring-purple-500/30">NEW</span>
              </div>
              <p class="text-sm text-slate-400 leading-relaxed">
                Covers Alpha Bosses · Black Market Merchants · Fast Travel Points · Caves · Ore Deposits · Fishing Spots and more, with category filtering and detailed location viewing.
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span v-for="tag in ['Alpha Pal', 'Boss Tower', 'Black Market NPC', 'Fast Travel Points', 'Caves', 'Ore Deposits']" :key="tag"
                  class="rounded-lg bg-white/5 px-2 py-1 text-[11px] text-slate-400 ring-1 ring-white/10"
                >{{ tag }}</span>
              </div>
            </div>
            <!-- 箭头 -->
            <ArrowRight class="h-5 w-5 shrink-0 text-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </BaseCard>
      </RouterLink>
    </section>

    <!-- Community Hub 入口 -->
    <section class="space-y-6">
      <SectionTitle title="Community Hub" description="News, Multiplayer Lobby, and Server listings — all in one place." />
      <RouterLink to="/community" class="block group">
        <BaseCard class="relative overflow-hidden p-0 transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_32px_rgba(99,102,241,0.15)]">
          <!-- 背景渐变 -->
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-slate-900/20 to-violet-900/30 pointer-events-none" />
          <div class="relative flex items-center gap-6 p-6">
            <!-- 图标 -->
            <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-500/30 transition-transform group-hover:scale-110">
              <Users class="h-8 w-8" />
            </div>
            <!-- 文字 -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h3 class="text-lg font-semibold text-white">Pal World Community Hub</h3>
                <span class="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-medium text-indigo-400 ring-1 ring-indigo-500/30">HOT</span>
              </div>
              <p class="text-sm text-slate-400 leading-relaxed">
                Browse the latest community guides, find multiplayer lobbies, or discover active servers — everything you need to connect with other Pal trainers.
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span v-for="tag in ['Community News', 'Multiplayer Lobby', 'Server List', 'Guides', 'Events']" :key="tag"
                  class="rounded-lg bg-white/5 px-2 py-1 text-[11px] text-slate-400 ring-1 ring-white/10"
                >{{ tag }}</span>
              </div>
            </div>
            <ArrowRight class="h-5 w-5 shrink-0 text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </BaseCard>
      </RouterLink>
    </section>

    <section class="space-y-6">
      <SectionTitle title="Core Tools" description="Comprehensive tools for Breeding, Pal Encyclopedia, AI Advisor, and Version 1.0 Change Analysis." />
      <QuickToolGrid :tools="quickTools" />
    </section>

    <section class="space-y-6">
      <SectionTitle title="Today's Hot Guides" description="AI aggregated high-quality guides sorted by popularity and timeliness." />
      <div class="grid gap-5">
        <HotGuideCard v-for="guide in hotGuides" :key="guide.id" :guide="guide" />
      </div>
    </section>
  </AppShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { Map as MapIcon, ArrowRight, Users, MessageCircle } from 'lucide-vue-next'
import AiCapabilityBanner from '@/components/home/AiCapabilityBanner.vue'
import HotGuideCard from '@/components/home/HotGuideCard.vue'
import QuickToolGrid from '@/components/home/QuickToolGrid.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import AppShell from '@/layouts/AppShell.vue'
import { hotGuides } from '@/data/guides'
import { quickTools } from '@/data/site'

const router = useRouter()

const advisorTabs = [
  { id: 'beginner', label: '新手' },
  { id: 'veteran', label: '老手' },
  { id: 'crossgame', label: '有其他游戏经验' },
]

const activeTab = ref('beginner')

const tabQuestions: Record<string, string[]> = {
  beginner: [
    '刚进游戏我应该先做什么？',
    '新手阶段最适合捕捉哪些帕鲁？',
    '怎么快速搭建第一个稳定的基地？',
  ],
  veteran: [
    'EA 版到 1.0 最大的变化有哪些？',
    '回归玩家需要优先重做哪些内容？',
    '1.0 版本新增了哪些强力帕鲁？',
  ],
  crossgame: [
    '玩过《幻兽帕鲁》类似游戏，上手需要注意什么？',
    '和宝可梦相比，帕鲁的培育系统有哪些独特之处？',
    '有 ARK 经验的玩家如何快速掌握基地建造？',
  ],
}

const currentTabQuestions = computed(() => tabQuestions[activeTab.value] ?? [])

const goToAdvisor = (question: string) => {
  router.push({ path: '/advisor', query: { q: question } })
}
</script>
