<template>
  <AppShell>
    <!-- Hero background overlay -->
    <div
      class="absolute inset-0 -z-10"
      style="background-image: linear-gradient(180deg, rgba(5,13,26,0.65) 0%, rgba(5,13,26,0.85) 40%, rgba(5,13,26,0.97) 100%), url('/pic/palworld_guide_bg.png'); background-size: cover; background-position: top center; background-repeat: no-repeat;"
    />

    <!-- Hero Section -->
    <section class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div>
        <!-- Eyebrow label -->
        <div class="mb-5 flex items-center gap-2">
          <span class="h-px w-6 bg-cyan-400" />
          <p class="font-mono text-xs uppercase tracking-[0.35em] text-cyan-400">AI Powered · Personalized · Real-time</p>
          <span class="h-px w-6 bg-cyan-400/40" />
        </div>

        <h1 class="max-w-3xl text-5xl font-black leading-tight sm:text-6xl"
          style="text-shadow: 0 0 40px rgba(0,229,255,0.15);">
          <span style="background: linear-gradient(90deg, #ffffff 0%, #00e5ff 45%, #a855f7 80%, #ff0080 100%); -webkit-background-clip: text; background-clip: text; color: transparent;">
            Your Personal<br />Pal Encyclopedia
          </span>
        </h1>

        <p class="mt-6 max-w-2xl text-base leading-8 text-slate-400">
          AI automatically aggregates guides from across the web, cleanses structured data, and dynamically recommends the most suitable content based on your player type and current needs.
        </p>
      </div>

      <!-- Hero visual card -->
      <BaseCard class="overflow-hidden p-0">
        <img src="/pic/banner.jpg" alt="Pal Encyclopedia Visual Cover" class="h-full min-h-[320px] w-full object-cover" />
        <!-- Overlay HUD elements -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute top-3 left-3 font-mono text-[10px] text-cyan-400/60 uppercase tracking-widest">PAL_WORLD_DB</div>
          <div class="absolute top-3 right-3 flex items-center gap-1">
            <span class="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span class="font-mono text-[10px] text-cyan-400/60">LIVE</span>
          </div>
          <div class="absolute bottom-3 left-3 right-3 h-px bg-gradient-to-r from-cyan-400/40 via-purple-500/30 to-transparent" />
        </div>
      </BaseCard>
    </section>

    <!-- AI Advisor Section -->
    <section class="space-y-6">
      <!-- Tabs -->
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div class="flex gap-2 flex-wrap">
        <button
          v-for="tab in advisorTabs"
          :key="tab.id"
          class="cyber-tab px-4 py-2 text-sm font-mono font-semibold uppercase tracking-widest transition-all duration-200"
          :class="activeTab === tab.id
            ? 'cyber-tab-active'
            : 'text-slate-500 hover:text-slate-300'"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
        </div>

        <button
          class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/8 text-cyan-300 transition hover:border-cyan-300/50 hover:bg-cyan-400/15"
          title="刷新参考问题"
          @click="refreshQuestions"
        >
          <RefreshCw class="h-4 w-4" />
        </button>
      </div>

      <!-- Question chips -->
      <div class="grid gap-3 sm:grid-cols-3">
        <button
          v-for="q in visibleQuestions"
          :key="q"
          class="question-card group relative overflow-hidden border border-white/8 bg-white/3 px-5 py-4 text-left text-sm text-slate-300 transition-all duration-200 hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-white"
          style="clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));"
          @click="goToAdvisor(q)"
        >
          <div class="mb-3 flex h-7 w-7 items-center justify-center text-cyan-400/70 group-hover:text-cyan-300 transition-colors"
            style="clip-path: polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px)); background: rgba(0,229,255,0.08); border: 1px solid rgba(0,229,255,0.2);">
            <MessageCircle class="h-3.5 w-3.5" />
          </div>
          {{ q }}
          <!-- Hover sweep -->
          <span class="question-sweep" />
        </button>
      </div>
    </section>

    <AiCapabilityBanner />

    <!-- Interactive Map -->
    <section class="space-y-6">
      <SectionTitle title="Interactive Map" description="Explore the Pal World · View Boss / NPC / Resource / Fast Travel Point Distribution." />
      <RouterLink to="/map" class="block group">
        <BaseCard class="relative overflow-hidden p-0 hover:border-purple-400/40 hover:shadow-[0_0_32px_rgba(168,85,247,0.15)]">
          <div class="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-indigo-900/20 pointer-events-none" />
          <div class="relative flex items-center gap-6 p-6">
            <div class="flex h-16 w-16 shrink-0 items-center justify-center text-purple-400 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              style="clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px)); background: rgba(168,85,247,0.15); border: 1px solid rgba(168,85,247,0.3);">
              <MapIcon class="h-8 w-8" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 mb-1">
                <h3 class="text-lg font-bold text-white">Pal World Interactive Map</h3>
                <span class="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 text-purple-300"
                  style="background: rgba(168,85,247,0.15); border: 1px solid rgba(168,85,247,0.3); clip-path: polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px));">
                  NEW
                </span>
              </div>
              <p class="text-sm text-slate-400 leading-relaxed">
                Covers Alpha Bosses · Black Market Merchants · Fast Travel Points · Caves · Ore Deposits · Fishing Spots and more.
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span v-for="tag in ['Alpha Pal', 'Boss Tower', 'Black Market NPC', 'Fast Travel', 'Caves', 'Ore Deposits']" :key="tag"
                  class="font-mono text-[10px] uppercase tracking-widest text-slate-500 px-2 py-0.5"
                  style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);">
                  {{ tag }}
                </span>
              </div>
            </div>
            <ArrowRight class="h-5 w-5 shrink-0 text-purple-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
          </div>
        </BaseCard>
      </RouterLink>
    </section>

    <!-- Community Hub -->
    <section class="space-y-6">
      <SectionTitle title="Community Hub" description="News, Multiplayer Lobby, and Server listings — all in one place." />
      <RouterLink to="/community" class="block group">
        <BaseCard class="relative overflow-hidden p-0 hover:border-indigo-400/40 hover:shadow-[0_0_32px_rgba(99,102,241,0.15)]">
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-transparent to-violet-900/20 pointer-events-none" />
          <div class="relative flex items-center gap-6 p-6">
            <div class="flex h-16 w-16 shrink-0 items-center justify-center text-indigo-400 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
              style="clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px)); background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3);">
              <Users class="h-8 w-8" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 mb-1">
                <h3 class="text-lg font-bold text-white">Pal World Community Hub</h3>
                <span class="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 text-indigo-300"
                  style="background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3); clip-path: polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px));">
                  HOT
                </span>
              </div>
              <p class="text-sm text-slate-400 leading-relaxed">
                Browse the latest community guides, find multiplayer lobbies, or discover active servers.
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span v-for="tag in ['Community News', 'Multiplayer', 'Servers', 'Guides', 'Events']" :key="tag"
                  class="font-mono text-[10px] uppercase tracking-widest text-slate-500 px-2 py-0.5"
                  style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);">
                  {{ tag }}
                </span>
              </div>
            </div>
            <ArrowRight class="h-5 w-5 shrink-0 text-indigo-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
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
import { ref, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { Map as MapIcon, ArrowRight, Users, MessageCircle, RefreshCw } from 'lucide-vue-next'
import AiCapabilityBanner from '@/components/home/AiCapabilityBanner.vue'
import HotGuideCard from '@/components/home/HotGuideCard.vue'
import QuickToolGrid from '@/components/home/QuickToolGrid.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import AppShell from '@/layouts/AppShell.vue'
import { hotGuides } from '@/data/guides'
import { quickTools } from '@/data/site'

const router = useRouter()

const advisorTabs = [
  { id: 'beginner', label: '新手' },
  { id: 'returning', label: '回归玩家' },
  { id: 'hardcore', label: '硬核党' },
]

const activeTab = ref('beginner')

const tabQuestions: Record<string, string[]> = {
  beginner: [
    '刚进游戏我应该先做什么？',
    '开局 30 分钟优先做哪些任务最不亏？',
    '新手阶段最适合捕捉哪些帕鲁？',
    '怎么快速搭建第一个稳定的基地？',
    '前期科技点和古代科技点怎么分配更稳？',
    '第一把飞行坐骑多久能拿到，路线怎么走？',
    '前期缺矿、缺球时该优先刷什么资源？',
  ],
  returning: [
    'EA 到 1.0 版本最影响体验的改动有哪些？',
    '回归后第一天的重建优先级应该怎么排？',
    '老档继续玩还是重开更划算？',
    '回归玩家需要优先重做哪些内容？',
    '版本更新后配种、工作适应性有何关键变化？',
    '回归后如何快速补齐落后的科技与装备？',
    '1.0 新增内容里最值得先体验的是哪几项？',
  ],
  hardcore: [
    '高难度据点攻防怎么配队容错率最高？',
    '毕业战斗帕鲁的词条与技能如何做最优组合？',
    '多基地联动下的自动化生产线怎么设计最省人力？',
    'PVE 高压战中骑乘切换与技能循环怎么安排？',
    '后期高效刷稀有素材的路线与时间窗怎么规划？',
    '极限效率流如何平衡发电、运输与制造瓶颈？',
  ],
}

const QUESTIONS_PER_VIEW = 3
const visibleQuestions = ref<string[]>([])

const pickRandomQuestions = (pool: string[], count: number) => {
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, pool.length))
}

const refreshQuestions = () => {
  const pool = tabQuestions[activeTab.value] ?? []
  visibleQuestions.value = pickRandomQuestions(pool, QUESTIONS_PER_VIEW)
}

watch(activeTab, refreshQuestions, { immediate: true })

const goToAdvisor = (question: string) => {
  router.push({ path: '/advisor', query: { q: question, autoSend: '1' } })
}
</script>

<style scoped>
.cyber-tab {
  position: relative;
  clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
  border: 1px solid transparent;
  background: transparent;
}

.cyber-tab-active {
  color: #00e5ff;
  text-shadow: 0 0 10px rgba(0,229,255,0.6);
  border-color: rgba(0,229,255,0.3);
  background: rgba(0,229,255,0.08);
}

.question-sweep {
  position: absolute;
  top: 0;
  left: -100%;
  width: 40%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0,229,255,0.08), transparent);
  transform: skewX(-15deg);
  transition: left 0.5s ease;
  pointer-events: none;
}

.question-card:hover .question-sweep {
  left: 150%;
}
</style>
