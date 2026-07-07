<template>
  <AppShell>
    <div
      class="absolute inset-0 -z-10"
      style="background-image: linear-gradient(180deg, rgba(15, 25, 35, 0.72) 0%, rgba(15, 25, 35, 0.88) 35%, rgba(11, 19, 28, 0.96) 100%), url('/pic/gundongchangtu.png'); background-size: cover; background-position: top center; background-repeat: no-repeat;"
    ></div>
    <section class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div>
        <p class="mb-4 text-sm uppercase tracking-[0.35em] text-teal-300">AI 驱动 · 千人千面 · 实时更新</p>
        <h1 class="max-w-3xl text-5xl font-semibold leading-tight text-white sm:text-6xl">
          <span class="text-gradient">你的专属帕鲁百科</span>
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          AI 自动聚合全网攻略、结构化清洗核心数据，并根据你的玩家身份与即时意图，动态推荐最适合当前阶段的内容入口。
        </p>
      </div>

      <BaseCard class="overflow-hidden p-0">
        <img src="/pic/banner.jpg" alt="帕鲁智库视觉封面" class="h-full min-h-[320px] w-full object-cover" />
      </BaseCard>
    </section>

    <section class="space-y-6">
      <SectionTitle title="你是哪种玩家？" description="选择你的身份后，首页内容将立即切换为对应模式。" />
      <div class="grid gap-5 xl:grid-cols-3">
        <IdentityEntryCard
          v-for="entry in identityEntries"
          :key="entry.id"
          :title="entry.title"
          :subtitle="entry.subtitle"
          :tags="entry.tags"
          :icon="entry.icon"
          :accent="entry.accent"
          @select="goTo(entry.route)"
        />
      </div>
    </section>

    <AiCapabilityBanner />

    <!-- 互动地图入口：位于攻略与 1.0 变更之间 -->
    <section class="space-y-6">
      <SectionTitle title="互动地图" description="探索帕鲁世界 · 查看 Boss / NPC / 资源 / 传送点分布。" />
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
                <h3 class="text-lg font-semibold text-white">帕鲁世界互动地图</h3>
                <span class="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-medium text-purple-400 ring-1 ring-purple-500/30">NEW</span>
              </div>
              <p class="text-sm text-slate-400 leading-relaxed">
                涵盖 Alpha Boss · 黑市商人 · 传送点 · 洞穴 · 矿脉 · 钓鱼点等全类别标记，支持分类筛选与位置详情查看。
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span v-for="tag in ['Alpha Pal', 'Boss Tower', '黑市 NPC', '传送点', '洞穴', '矿脉']" :key="tag"
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

    <section class="space-y-6">
      <SectionTitle title="核心工具集" description="围绕配种、图鉴、AI 顾问与 1.0 变更分析，构建一站式工具体验。" />
      <QuickToolGrid :tools="quickTools" />
    </section>

    <section class="space-y-6">
      <SectionTitle title="今日热门" description="AI 聚合高质量攻略，按热度与时效性排序。" />
      <div class="grid gap-5">
        <HotGuideCard v-for="guide in hotGuides" :key="guide.id" :guide="guide" />
      </div>
    </section>
  </AppShell>
</template>

<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router'
import { Map as MapIcon, ArrowRight } from 'lucide-vue-next'
import AiCapabilityBanner from '@/components/home/AiCapabilityBanner.vue'
import HotGuideCard from '@/components/home/HotGuideCard.vue'
import IdentityEntryCard from '@/components/home/IdentityEntryCard.vue'
import QuickToolGrid from '@/components/home/QuickToolGrid.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import AppShell from '@/layouts/AppShell.vue'
import { hotGuides } from '@/data/guides'
import { quickTools } from '@/data/site'

const router = useRouter()

const identityEntries = [
  {
    id: 'beginner',
    title: '刚入坑',
    subtitle: '从零开始，一步步教你上手',
    tags: ['入门路线', '基础捕捉', '早期帕鲁推荐'],
    icon: 'Leaf' as const,
    accent: '#4ECDC4',
    route: '/beginner',
  },
  {
    id: 'veteran',
    title: '玩过EA版',
    subtitle: '1.0变了什么？一键分析你的存档',
    tags: ['变更影响', '回坑指南', '新区域攻略'],
    icon: 'RotateCcw' as const,
    accent: '#FF8C42',
    route: '/veteran-analysis',
  },
  {
    id: 'hardcore',
    title: '硬核效率党',
    subtitle: '最优配种树 · DPS计算 · 基地效率',
    tags: ['Tier List', '词条搭配', '效率对比'],
    icon: 'Trophy' as const,
    accent: '#8B5CF6',
    route: '/breeding?mode=hardcore',
  },
]

const goTo = (route: string) => {
  router.push(route)
}
</script>
