<template>
  <AppShell>
    <BreadcrumbBar :items="breadcrumbs" />

    <div class="flex flex-wrap items-center justify-between gap-4">
      <SectionTitle title="Version 1.0 Return Guide" description="Enter your Pal list to quickly understand the impact of Version 1.0 on your save file and breeding routes." />
      <StatusBadge label="Veteran Mode · Version 1.0 Official Release" tone="orange" />
    </div>

    <BaseCard class="border-orange-400/20 bg-gradient-to-r from-orange-400/10 to-transparent">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <p class="text-lg text-white">Version 1.0 Official Released · 27 Pages of Updates · 50+ New Pals · Map Doubled</p>
        <RouterLink to="/veteran-analysis" class="text-sm text-orange-200 transition hover:text-white">View Full Changelog</RouterLink>
      </div>
    </BaseCard>

    <section class="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <BaseCard>
        <SectionTitle title="Your Save File Impact Analysis" description="Enter your Pal list, AI will generate a personalized report based on Version 1.0 changes." />
        <textarea
          v-model="archiveInput"
          class="mt-5 min-h-[140px] w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none placeholder:text-slate-500"
          placeholder="Enter your Pal list, AI analyzes Version 1.0's impact on you"
        ></textarea>
        <BaseButton class="mt-5" tone="orange" @click="runAnalysis">
          {{ feedback.state.value === 'loading' ? 'Analyzing...' : 'Start Analysis' }}
        </BaseButton>
      </BaseCard>

      <BaseCard class="overflow-hidden p-0">
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&q=80"
          alt="Version 1.0 Return Visual"
          class="h-full min-h-[320px] w-full object-cover"
        />
      </BaseCard>
    </section>

    <section v-if="hasAnalyzed" class="space-y-6">
      <SectionTitle title="Summary Overview" eyebrow="Summary" />
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <BaseCard v-for="item in summaryStats" :key="item.label">
          <p class="text-3xl font-semibold text-white">{{ item.value }}</p>
          <p class="mt-2 text-sm text-slate-300">{{ item.label }}</p>
        </BaseCard>
      </div>
    </section>

    <section v-if="hasAnalyzed" class="space-y-6">
      <SectionTitle title="Analysis Results" eyebrow="Impact Cards" />
      <div class="grid gap-5 xl:grid-cols-3">
        <ImpactSummaryCard v-for="card in visibleImpactCards" :key="card.id" :card="card" />
      </div>
    </section>

    <section class="grid gap-5 xl:grid-cols-2">
      <TransferSuggestionPanel title="Recommend to Transfer to New Save" badge="Global Pal Box Suggestions" tone="green" :items="transferToNewSave" />
      <TransferSuggestionPanel title="Can Keep in Old Save" badge="Old Save Retention" tone="slate" :items="keepInOldSave" />
    </section>

    <section class="space-y-6">
      <SectionTitle title="Version 1.0 New Content Preview" eyebrow="New Content" />
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <BaseCard v-for="item in newContentCards" :key="item.title" interactive>
          <RouterLink :to="item.route" class="block">
            <h3 class="text-lg font-semibold text-white">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-slate-300">{{ item.description }}</p>
            <p class="mt-4 text-sm text-orange-200">View Guide</p>
          </RouterLink>
        </BaseCard>
      </div>
    </section>

    <section v-if="hasAnalyzed" class="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
      <BaseCard>
        <SectionTitle title="Pal Impact Details" eyebrow="Detailed Report" />
        <div class="mt-5 space-y-3">
          <div
            v-for="item in impactDetails"
            :key="item.name"
            class="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-[1fr_auto_2fr_auto] md:items-center"
          >
            <p class="font-medium text-white">{{ item.name }}</p>
            <StatusBadge :label="item.status" :tone="item.status === 'Weakened' ? 'red' : item.status === 'Enhanced' ? 'green' : item.status === 'New Breeding' ? 'blue' : 'slate'" />
            <p class="text-sm text-slate-300">{{ item.description }}</p>
            <BaseButton tone="ghost" @click="goBreeding">{{ item.action }}</BaseButton>
          </div>
        </div>
      </BaseCard>

      <BaseCard>
        <SectionTitle title="New Area Preparation Checklist" eyebrow="Checklist" />
        <div class="mt-5 space-y-3">
          <div v-for="item in worldTreeChecklist" :key="item.label" class="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            {{ item.checked ? '☑' : '☐' }} {{ item.label }}
          </div>
        </div>
        <BaseButton class="mt-6 w-full" tone="orange">Export PDF</BaseButton>
      </BaseCard>
    </section>
  </AppShell>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BreadcrumbBar from '@/components/common/BreadcrumbBar.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import ImpactSummaryCard from '@/components/veteran/ImpactSummaryCard.vue'
import TransferSuggestionPanel from '@/components/veteran/TransferSuggestionPanel.vue'
import AppShell from '@/layouts/AppShell.vue'
import { useButtonFeedback } from '@/composables/useButtonFeedback'
import { useVeteranAnalysis } from '@/composables/useVeteranAnalysis'
import { impactDetails, keepInOldSave, newContentCards, transferToNewSave, worldTreeChecklist } from '@/data/veteran'

const breadcrumbs = [
  { label: 'Home', route: '/' },
  { label: 'Version 1.0 Return Guide' },
]

const { archiveInput, hasAnalyzed, summaryStats, visibleImpactCards, analyze } = useVeteranAnalysis()
const feedback = useButtonFeedback()
const router = useRouter()

const runAnalysis = async () => {
  await feedback.runWithFeedback(analyze)
}

const goBreeding = () => {
  router.push('/breeding')
}
</script>
