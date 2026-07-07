<template>
  <AppShell>
    <BreadcrumbBar :items="breadcrumbs" />

    <div class="flex flex-wrap items-center justify-between gap-4">
      <SectionTitle title="配种计算器" description="双向查询 · 覆盖250+帕鲁" />
      <label class="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
        <input v-model="onlyNew" type="checkbox" class="accent-teal-300" />
        仅显示1.0新增帕鲁
      </label>
    </div>

    <section class="grid gap-5 xl:grid-cols-2">
      <BaseCard>
        <SectionTitle title="正向查询（父母→后代）" />
        <div class="mt-5 grid gap-4 md:grid-cols-2">
          <PalSelectField v-model="parentA" label="父本" :options="palOptions" />
          <PalSelectField v-model="parentB" label="母本" :options="palOptions" />
        </div>
        <BaseButton class="mt-5" tone="teal">计算</BaseButton>

        <BaseCard v-if="forwardResult" class="mt-5 border-teal-400/20 bg-teal-400/10">
          <p class="text-sm text-slate-300">计算结果</p>
          <h3 class="mt-3 text-2xl font-semibold text-white">{{ getPalName(forwardResult.childId) }}</h3>
          <p class="mt-2 text-sm text-slate-300">{{ getPalElements(forwardResult.childId) }}</p>
          <img
            v-if="getPal(forwardResult.childId)?.avatar"
            :src="getPal(forwardResult.childId)?.avatar"
            :alt="getPalName(forwardResult.childId)"
            class="mt-4 h-40 w-full rounded-2xl object-cover"
          />
          <p class="mt-4 text-sm text-slate-200">所需材料：{{ forwardResult.materials }}</p>
          <p class="mt-2 text-sm text-slate-200">预计时间：{{ forwardResult.estimatedTime }} · 成功率：{{ forwardResult.successRate }}</p>
          <p class="mt-2 text-xs text-teal-100/80">数据来源：{{ forwardResult.source === 'forward' ? 'breeding_table.json' : 'breeding_reverse.json' }}</p>
          <RouterLink :to="`/pals/${forwardResult.childId}`" class="mt-4 inline-block text-sm text-teal-200">查看详情</RouterLink>
        </BaseCard>

        <BaseCard v-else class="mt-5 border border-dashed border-white/10 bg-white/5 text-sm text-slate-300">
          当前父母组合未查到结果，请尝试更换父母帕鲁。
        </BaseCard>
      </BaseCard>

      <BaseCard>
        <SectionTitle title="反向查询（后代→父母）" />
        <div class="mt-5">
          <PalSelectField v-model="targetPal" label="目标帕鲁" :options="palOptions" />
        </div>
        <BaseButton class="mt-5" tone="ghost">查找配种路径</BaseButton>

        <div class="mt-5 space-y-3">
          <div v-if="!reverseResults.length" class="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            当前目标帕鲁暂无反向配种结果。
          </div>
          <div v-for="recipe in reverseResults" :key="recipe.id" class="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p class="text-sm text-white">
                {{ getPalName(recipe.parentAId) }} × {{ getPalName(recipe.parentBId) }} = {{ getPalName(recipe.childId) }}
                </p>
                <p class="mt-2 text-xs text-slate-400">来源：{{ recipe.source === 'reverse' ? 'breeding_reverse.json' : 'breeding_table.json' }}</p>
              </div>
              <RouterLink :to="`/pals/${recipe.childId}`" class="text-sm text-teal-200">查看路径</RouterLink>
            </div>
          </div>
        </div>
      </BaseCard>
    </section>

    <section class="space-y-6">
      <SectionTitle title="热门配种" eyebrow="Popular Recipes" />
      <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hidden">
        <BaseCard v-for="recipe in featuredRecipes" :key="recipe.id" class="min-w-[280px]">
          <p class="text-sm text-slate-300">{{ getPalName(recipe.parentAId) }} × {{ getPalName(recipe.parentBId) }}</p>
          <h3 class="mt-3 text-xl font-semibold text-white">{{ getPalName(recipe.childId) }}</h3>
          <img
            v-if="getPal(recipe.childId)?.avatar"
            :src="getPal(recipe.childId)?.avatar"
            :alt="getPalName(recipe.childId)"
            class="mt-3 h-32 w-full rounded-2xl object-cover"
          />
          <p class="mt-2 text-sm text-slate-300">{{ recipe.materials }} · {{ recipe.successRate }}</p>
          <p class="mt-2 text-xs text-slate-400">{{ recipe.source === 'reverse' ? '反查结果' : '正查结果' }}</p>
          <BaseButton class="mt-4 w-full" tone="ghost" @click="fillRecipe(recipe.parentAId, recipe.parentBId)">试一试</BaseButton>
        </BaseCard>
      </div>
    </section>
  </AppShell>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BreadcrumbBar from '@/components/common/BreadcrumbBar.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import PalSelectField from '@/components/breeding/PalSelectField.vue'
import AppShell from '@/layouts/AppShell.vue'
import { useBreedingCalculator } from '@/composables/useBreedingCalculator'
import { palOptions } from '@/data/pals'

const breadcrumbs = [
  { label: '首页', route: '/' },
  { label: '配种计算器' },
]

const { parentA, parentB, targetPal, onlyNew, forwardResult, reverseResults, featuredRecipes, getPal } = useBreedingCalculator()

const getPalName = (id: string) => getPal(id)?.name ?? id

const getPalElements = (id: string) => getPal(id)?.elements?.join(' / ') ?? '属性未知'

const fillRecipe = (a: string, b: string) => {
  parentA.value = a
  parentB.value = b
}
</script>
