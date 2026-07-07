<template>
  <AppShell>
    <BreadcrumbBar :items="breadcrumbs" />

    <div class="flex flex-wrap items-center justify-between gap-4">
      <SectionTitle title="Breeding Calculator" description="Bidirectional Query · 250+ Pals Covered" />
      <label class="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
        <input v-model="onlyNew" type="checkbox" class="accent-teal-300" />
        Show Only New Pals in 1.0
      </label>
    </div>

    <section class="grid gap-5 xl:grid-cols-2">
      <BaseCard>
        <SectionTitle title="Forward Query (Parents → Offspring)" />
        <div class="mt-5 grid gap-4 md:grid-cols-2">
          <PalSelectField v-model="parentA" label="Sire" :options="palOptions" />
          <PalSelectField v-model="parentB" label="Dam" :options="palOptions" />
        </div>
        <BaseButton class="mt-5" tone="teal">Calculate</BaseButton>

        <!-- Result Card: 左图右文布局 -->
        <BaseCard v-if="forwardResult" class="mt-5 border-teal-400/20 bg-teal-400/10">
          <p class="mb-3 text-sm text-slate-300">Result</p>
          <div class="flex items-stretch gap-4">
            <!-- 左侧图片区域，固定宽高保证完整显示 -->
            <div class="flex h-48 w-48 shrink-0 items-center justify-center rounded-2xl bg-white/5">
              <img
                v-if="getPal(forwardResult.childId)?.avatar"
                :src="getPal(forwardResult.childId)?.avatar"
                :alt="getPalName(forwardResult.childId)"
                class="h-44 w-44 object-contain drop-shadow-lg"
              />
              <div v-else class="flex h-44 w-44 items-center justify-center text-slate-500 text-4xl">?</div>
            </div>
            <!-- 右侧信息 -->
            <div class="flex flex-1 flex-col justify-between py-1">
              <div>
                <h3 class="text-2xl font-semibold text-white">{{ getPalName(forwardResult.childId) }}</h3>
                <p class="mt-1 text-sm text-slate-300">{{ getPalElements(forwardResult.childId) }}</p>
                <p class="mt-3 text-sm text-slate-200">Materials: {{ forwardResult.materials }}</p>
                <p class="mt-1 text-sm text-slate-200">Time: {{ forwardResult.estimatedTime }} · {{ forwardResult.successRate }}</p>
                <p class="mt-1 text-xs text-teal-100/80">{{ forwardResult.source === 'forward' ? 'breeding_table.json' : 'breeding_reverse.json' }}</p>
              </div>
              <RouterLink :to="`/pals/${forwardResult.childId}`" class="mt-2 inline-block text-sm text-teal-200 hover:underline">
                View Details →
              </RouterLink>
            </div>
          </div>
        </BaseCard>

        <BaseCard v-else class="mt-5 border border-dashed border-white/10 bg-white/5 text-sm text-slate-300">
          No results found for this parent combination. Please try different parent Pals.
        </BaseCard>
      </BaseCard>

      <BaseCard>
        <SectionTitle title="Reverse Query (Offspring → Parents)" />
        <div class="mt-5">
          <PalSelectField v-model="targetPal" label="Target Pal" :options="palOptions" />
        </div>
        <BaseButton class="mt-5" tone="ghost">Find Breeding Path</BaseButton>

        <div class="mt-5 space-y-3">
          <div v-if="!reverseResults.length" class="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            No reverse breeding results available for this target Pal.
          </div>
          <div v-for="recipe in reverseResults" :key="recipe.id" class="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p class="text-sm text-white">
                {{ getPalName(recipe.parentAId) }} × {{ getPalName(recipe.parentBId) }} = {{ getPalName(recipe.childId) }}
                </p>
                <p class="mt-2 text-xs text-slate-400">Source: {{ recipe.source === 'reverse' ? 'breeding_reverse.json' : 'breeding_table.json' }}</p>
              </div>
              <RouterLink :to="`/pals/${recipe.childId}`" class="text-sm text-teal-200">View Path</RouterLink>
            </div>
          </div>
        </div>
      </BaseCard>
    </section>

    <!-- Popular Recipes: 卡片改为左图右文布局 -->
    <section class="space-y-6">
      <SectionTitle title="Popular Recipes" eyebrow="Popular Recipes" />
      <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hidden">
        <BaseCard v-for="recipe in featuredRecipes" :key="recipe.id" class="min-w-[340px]">
          <!-- 父代信息 -->
          <p class="text-xs text-slate-400">{{ getPalName(recipe.parentAId) }} × {{ getPalName(recipe.parentBId) }}</p>
          <!-- 左图右文 -->
          <div class="mt-3 flex items-center gap-3">
            <div class="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-white/5">
              <img
                v-if="getPal(recipe.childId)?.avatar"
                :src="getPal(recipe.childId)?.avatar"
                :alt="getPalName(recipe.childId)"
                class="h-24 w-24 object-contain drop-shadow-md"
              />
              <div v-else class="text-3xl text-slate-500">?</div>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white">{{ getPalName(recipe.childId) }}</h3>
              <p class="mt-1 text-sm text-slate-300">{{ recipe.materials }}</p>
              <p class="mt-1 text-sm text-slate-400">{{ recipe.successRate }}</p>
              <p class="mt-1 text-xs text-slate-500">{{ recipe.source === 'reverse' ? 'Reverse Result' : 'Forward Result' }}</p>
            </div>
          </div>
          <BaseButton class="mt-4 w-full" tone="ghost" @click="fillRecipe(recipe.parentAId, recipe.parentBId)">Try It</BaseButton>
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
  { label: 'Home', route: '/' },
  { label: 'Breeding Calculator' },
]

const { parentA, parentB, targetPal, onlyNew, forwardResult, reverseResults, featuredRecipes, getPal } = useBreedingCalculator()

const getPalName = (id: string) => getPal(id)?.name ?? id

const getPalElements = (id: string) => getPal(id)?.elements?.join(' / ') ?? 'Unknown Elements'

const fillRecipe = (a: string, b: string) => {
  parentA.value = a
  parentB.value = b
}
</script>
