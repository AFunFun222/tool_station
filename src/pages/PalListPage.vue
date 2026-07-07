<template>
  <AppShell>
    <BreadcrumbBar :items="breadcrumbs" />

    <section class="space-y-6">
      <SectionTitle
        title="帕鲁图鉴"
        description="展示全部帕鲁条目，可按名称、属性与工作适应性快速浏览，并进入独立详情页。"
      >
        <template #action>
          <div class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            共 {{ filteredPals.length }} / {{ palOptions.length }} 只
          </div>
        </template>
      </SectionTitle>

      <BaseCard>
        <div class="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <label class="space-y-2">
            <span class="text-sm text-slate-300">搜索名称</span>
            <input
              v-model="keyword"
              type="text"
              placeholder="输入帕鲁名称"
              class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
            />
          </label>

          <label class="space-y-2">
            <span class="text-sm text-slate-300">属性筛选</span>
            <select
              v-model="selectedElement"
              class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            >
              <option value="全部" class="bg-slate-900">全部</option>
              <option v-for="element in elementOptions" :key="element" :value="element" class="bg-slate-900">
                {{ element }}
              </option>
            </select>
          </label>

          <label class="space-y-2">
            <span class="text-sm text-slate-300">工作适应性</span>
            <select
              v-model="selectedWork"
              class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            >
              <option value="全部" class="bg-slate-900">全部</option>
              <option v-for="work in workOptions" :key="work" :value="work" class="bg-slate-900">
                {{ work }}
              </option>
            </select>
          </label>
        </div>
      </BaseCard>

      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <RouterLink
          v-for="pal in filteredPals"
          :key="pal.id"
          :to="`/pals/${pal.id}`"
          class="block"
        >
          <BaseCard interactive class="h-full overflow-hidden p-0">
            <img :src="pal.avatar" :alt="pal.name" class="h-48 w-full object-cover" />
            <div class="space-y-4 p-5">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-xs uppercase tracking-[0.25em] text-slate-400">{{ pal.number }}</p>
                  <h3 class="mt-2 text-xl font-semibold text-white">{{ pal.name }}</h3>
                </div>
                <span class="rounded-full bg-sky-400/15 px-3 py-1 text-xs text-sky-200">
                  {{ pal.elements.join(' / ') }}
                </span>
              </div>

              <p class="text-sm leading-6 text-slate-300">{{ pal.recommendation }}</p>

              <div v-if="pal.workSuitability?.length" class="flex flex-wrap gap-2">
                <span
                  v-for="item in pal.workSuitability.slice(0, 4)"
                  :key="item.key"
                  class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                >
                  {{ item.label }} Lv{{ item.level }}
                </span>
              </div>

              <div class="grid grid-cols-3 gap-3 text-center">
                <div class="rounded-2xl bg-white/5 px-3 py-3">
                  <p class="text-xs text-slate-400">战斗</p>
                  <p class="mt-1 text-sm font-semibold text-white">{{ pal.stats?.battle ?? 0 }}</p>
                </div>
                <div class="rounded-2xl bg-white/5 px-3 py-3">
                  <p class="text-xs text-slate-400">采集</p>
                  <p class="mt-1 text-sm font-semibold text-white">{{ pal.stats?.gather ?? 0 }}</p>
                </div>
                <div class="rounded-2xl bg-white/5 px-3 py-3">
                  <p class="text-xs text-slate-400">工作</p>
                  <p class="mt-1 text-sm font-semibold text-white">{{ pal.stats?.work ?? 0 }}</p>
                </div>
              </div>
            </div>
          </BaseCard>
        </RouterLink>
      </div>
    </section>
  </AppShell>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import BaseCard from '@/components/common/BaseCard.vue'
import BreadcrumbBar from '@/components/common/BreadcrumbBar.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import AppShell from '@/layouts/AppShell.vue'
import { palOptions } from '@/data/pals'

const breadcrumbs = [
  { label: '首页', route: '/' },
  { label: '帕鲁图鉴' },
]

const keyword = ref('')
const selectedElement = ref('全部')
const selectedWork = ref('全部')

const elementOptions = [...new Set(palOptions.flatMap((pal) => pal.elements))].sort()
const workOptions = [...new Set(palOptions.flatMap((pal) => pal.workSuitability?.map((item) => item.label) ?? []))].sort()

const filteredPals = computed(() => {
  const normalizedKeyword = keyword.value.trim().toLowerCase()

  return palOptions.filter((pal) => {
    const matchKeyword = normalizedKeyword
      ? pal.name.toLowerCase().includes(normalizedKeyword) || pal.id.includes(normalizedKeyword)
      : true
    const matchElement = selectedElement.value === '全部' ? true : pal.elements.includes(selectedElement.value)
    const matchWork =
      selectedWork.value === '全部'
        ? true
        : (pal.workSuitability ?? []).some((item) => item.label === selectedWork.value)

    return matchKeyword && matchElement && matchWork
  })
})
</script>
