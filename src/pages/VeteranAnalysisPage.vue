<template>
  <AppShell>
    <BreadcrumbBar :items="breadcrumbs" />

    <div class="flex flex-wrap items-center justify-between gap-4">
      <SectionTitle title="1.0回坑指南" description="输入你的帕鲁名单，快速了解 1.0 对存档与养成路线的影响。" />
      <StatusBadge label="老手模式 · 1.0正式版" tone="orange" />
    </div>

    <BaseCard class="border-orange-400/20 bg-gradient-to-r from-orange-400/10 to-transparent">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <p class="text-lg text-white">1.0 正式版已上线 · 27页更新 · 50+新帕鲁 · 地图翻倍</p>
        <RouterLink to="/veteran-analysis" class="text-sm text-orange-200 transition hover:text-white">查看完整变更日志</RouterLink>
      </div>
    </BaseCard>

    <section class="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <BaseCard>
        <SectionTitle title="你的存档影响分析" description="输入你的帕鲁名单，AI 将基于 1.0 变更清单生成个性化报告。" />
        <textarea
          v-model="archiveInput"
          class="mt-5 min-h-[140px] w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none placeholder:text-slate-500"
          placeholder="输入你的帕鲁名单，AI 分析 1.0 对你的影响"
        ></textarea>
        <BaseButton class="mt-5" tone="orange" @click="runAnalysis">
          {{ feedback.state.value === 'loading' ? '分析中...' : '开始分析' }}
        </BaseButton>
      </BaseCard>

      <BaseCard class="overflow-hidden p-0">
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&q=80"
          alt="1.0 回坑视觉图"
          class="h-full min-h-[320px] w-full object-cover"
        />
      </BaseCard>
    </section>

    <section v-if="hasAnalyzed" class="space-y-6">
      <SectionTitle title="概况摘要" eyebrow="Summary" />
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <BaseCard v-for="item in summaryStats" :key="item.label">
          <p class="text-3xl font-semibold text-white">{{ item.value }}</p>
          <p class="mt-2 text-sm text-slate-300">{{ item.label }}</p>
        </BaseCard>
      </div>
    </section>

    <section v-if="hasAnalyzed" class="space-y-6">
      <SectionTitle title="分析结果" eyebrow="Impact Cards" />
      <div class="grid gap-5 xl:grid-cols-3">
        <ImpactSummaryCard v-for="card in visibleImpactCards" :key="card.id" :card="card" />
      </div>
    </section>

    <section class="grid gap-5 xl:grid-cols-2">
      <TransferSuggestionPanel title="建议带到新存档" badge="全球帕鲁箱建议" tone="green" :items="transferToNewSave" />
      <TransferSuggestionPanel title="可以留旧档" badge="旧档保留" tone="slate" :items="keepInOldSave" />
    </section>

    <section class="space-y-6">
      <SectionTitle title="1.0 新内容速览" eyebrow="New Content" />
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <BaseCard v-for="item in newContentCards" :key="item.title" interactive>
          <RouterLink :to="item.route" class="block">
            <h3 class="text-lg font-semibold text-white">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-slate-300">{{ item.description }}</p>
            <p class="mt-4 text-sm text-orange-200">查看攻略</p>
          </RouterLink>
        </BaseCard>
      </div>
    </section>

    <section v-if="hasAnalyzed" class="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
      <BaseCard>
        <SectionTitle title="帕鲁影响详情" eyebrow="Detailed Report" />
        <div class="mt-5 space-y-3">
          <div
            v-for="item in impactDetails"
            :key="item.name"
            class="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-[1fr_auto_2fr_auto] md:items-center"
          >
            <p class="font-medium text-white">{{ item.name }}</p>
            <StatusBadge :label="item.status" :tone="item.status === '削弱' ? 'red' : item.status === '增强' ? 'green' : item.status === '新配种' ? 'blue' : 'slate'" />
            <p class="text-sm text-slate-300">{{ item.description }}</p>
            <BaseButton tone="ghost" @click="goBreeding">{{ item.action }}</BaseButton>
          </div>
        </div>
      </BaseCard>

      <BaseCard>
        <SectionTitle title="新区域准备清单" eyebrow="Checklist" />
        <div class="mt-5 space-y-3">
          <div v-for="item in worldTreeChecklist" :key="item.label" class="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            {{ item.checked ? '☑' : '☐' }} {{ item.label }}
          </div>
        </div>
        <BaseButton class="mt-6 w-full" tone="orange">导出PDF</BaseButton>
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
  { label: '首页', route: '/' },
  { label: '1.0回坑指南' },
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
