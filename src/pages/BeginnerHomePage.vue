<template>
  <AppShell>
    <BreadcrumbBar :items="breadcrumbs" />

    <div class="flex flex-wrap items-center justify-between gap-4">
      <SectionTitle title="新手首页" description="围绕开荒路线、推荐帕鲁与 AI 建议，帮助你在 5 秒内找到下一步。" />
      <StatusBadge label="新手模式" tone="teal" />
    </div>

    <section class="space-y-6">
      <SectionTitle title="开荒路线图" eyebrow="Roadmap" />
      <RoadmapStepper :steps="roadmapSteps" />
    </section>

    <section class="space-y-6">
      <SectionTitle title="今日推荐帕鲁" eyebrow="Recommended Pals" />
      <div class="grid gap-5 xl:grid-cols-3">
        <RecommendedPalCard v-for="pal in recommendedPals" :key="pal.id" :pal="pal" />
      </div>
    </section>

    <section class="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <BaseCard class="border-teal-400/20 bg-gradient-to-br from-teal-400/10 to-transparent">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-sm uppercase tracking-[0.3em] text-teal-300">AI Suggestion</p>
            <h3 class="mt-3 text-2xl font-semibold text-white">你应该做什么</h3>
            <p class="mt-4 max-w-2xl text-sm leading-7 text-slate-200">{{ beginnerSuggestion }}</p>
          </div>
          <Sparkles class="h-8 w-8 text-teal-300" />
        </div>
        <BaseButton class="mt-6" tone="teal">下一步</BaseButton>
      </BaseCard>

      <BaseCard class="overflow-hidden p-0">
        <img
          :src="recommendedPals[0]?.avatar"
          alt="新手模式视觉图"
          class="h-full min-h-[280px] w-full object-cover"
        />
      </BaseCard>
    </section>

    <section class="space-y-6">
      <SectionTitle title="新手必看攻略" eyebrow="Guides" />
      <div class="space-y-4">
        <GuideListItem v-for="guide in beginnerGuides" :key="guide.id" :guide="guide" />
      </div>
    </section>
  </AppShell>
</template>

<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BreadcrumbBar from '@/components/common/BreadcrumbBar.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import GuideListItem from '@/components/beginner/GuideListItem.vue'
import RecommendedPalCard from '@/components/beginner/RecommendedPalCard.vue'
import RoadmapStepper from '@/components/beginner/RoadmapStepper.vue'
import AppShell from '@/layouts/AppShell.vue'
import { beginnerGuides, beginnerSuggestion, roadmapSteps } from '@/data/beginner'
import { recommendedPals } from '@/data/pals'

const breadcrumbs = [
  { label: '首页', route: '/' },
  { label: '新手指南' },
]
</script>
