<template>
  <AppShell>
    <BreadcrumbBar :items="breadcrumbs" />

    <div class="flex flex-wrap items-center justify-between gap-4">
      <SectionTitle title="Beginner Home" description="Around the clearing route, recommended Pals and AI suggestions, help you find the next step in 5 seconds." />
      <StatusBadge label="Beginner Mode" tone="teal" />
    </div>

    <section class="space-y-6">
      <SectionTitle title="Clearing Roadmap" eyebrow="Roadmap" />
      <RoadmapStepper :steps="roadmapSteps" />
    </section>

    <section class="space-y-6">
      <SectionTitle title="Today's Recommended Pals" eyebrow="Recommended Pals" />
      <div class="grid gap-5 xl:grid-cols-3">
        <RecommendedPalCard v-for="pal in recommendedPals" :key="pal.id" :pal="pal" />
      </div>
    </section>

    <section class="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <BaseCard class="border-teal-400/20 bg-gradient-to-br from-teal-400/10 to-transparent">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-sm uppercase tracking-[0.3em] text-teal-300">AI Suggestion</p>
            <h3 class="mt-3 text-2xl font-semibold text-white">What You Should Do</h3>
            <p class="mt-4 max-w-2xl text-sm leading-7 text-slate-200">{{ beginnerSuggestion }}</p>
          </div>
          <Sparkles class="h-8 w-8 text-teal-300" />
        </div>
        <BaseButton class="mt-6" tone="teal">Next Step</BaseButton>
      </BaseCard>

      <BaseCard class="overflow-hidden p-0">
        <div class="flex h-full min-h-[280px] w-full items-end justify-center bg-gradient-to-b from-white/5 to-white/10">
          <img
            :src="recommendedPals[0]?.avatar"
            alt="Beginner Mode Visual"
            class="h-[280px] w-full object-contain object-bottom drop-shadow-xl"
          />
        </div>
      </BaseCard>
    </section>

    <section class="space-y-6">
      <SectionTitle title="Essential Beginner Guides" eyebrow="Guides" />
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
  { label: 'Home', route: '/' },
  { label: 'Beginner Guide' },
]
</script>
