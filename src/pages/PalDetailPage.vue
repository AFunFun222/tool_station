<template>
  <AppShell v-if="pal">
    <BreadcrumbBar :items="breadcrumbs" />

    <section class="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <PalHeroCard :pal="pal" />

      <BaseCard>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="rounded-full px-4 py-2 text-sm transition"
            :class="activeTab === tab ? 'bg-sky-400 text-slate-950' : 'border border-white/10 bg-white/5 text-slate-200'"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <div v-if="activeTab === '属性'" class="mt-6 space-y-6">
          <div v-for="stat in pal.statsPanel" :key="stat.label">
            <div class="mb-2 flex items-center justify-between text-sm text-slate-300">
              <span>{{ stat.label }}</span>
              <span>{{ stat.value }}</span>
            </div>
            <div class="h-3 rounded-full bg-white/10">
              <div class="h-3 rounded-full bg-sky-300" :style="{ width: `${stat.value}%` }"></div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-white">工作适应性</h3>
            <div class="mt-4 flex flex-wrap gap-3">
              <StatusBadge
                v-for="item in pal.workSuitability"
                :key="item.label"
                :label="`${item.label} Lv${item.level}`"
                tone="blue"
              />
            </div>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <BaseCard>
              <p class="text-sm text-slate-400">被动技能</p>
              <h4 class="mt-2 text-lg font-semibold text-white">{{ pal.passiveSkill.name }}</h4>
              <p class="mt-2 text-sm text-slate-300">{{ pal.passiveSkill.description }}</p>
            </BaseCard>
            <BaseCard>
              <p class="text-sm text-slate-400">主动技能</p>
              <h4 class="mt-2 text-lg font-semibold text-white">{{ pal.activeSkill.name }}</h4>
              <p class="mt-2 text-sm text-slate-300">{{ pal.activeSkill.description }}</p>
              <p class="mt-2 text-sm text-sky-200">{{ pal.activeSkill.power }}</p>
            </BaseCard>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-white">掉落物</h3>
            <div class="mt-4 grid gap-3 md:grid-cols-3">
              <BaseCard v-for="drop in pal.drops" :key="drop.name">
                <p class="font-medium text-white">{{ drop.name }}</p>
                <p class="mt-2 text-sm text-slate-300">掉率 {{ drop.rate }}</p>
              </BaseCard>
            </div>
          </div>
        </div>

        <div v-else-if="activeTab === '技能'" class="mt-6 grid gap-4 md:grid-cols-2">
          <BaseCard v-for="skill in pal.activeSkills" :key="`${skill.name}-${skill.level}`">
            <div class="flex items-center justify-between gap-3">
              <h4 class="text-lg font-semibold text-white">{{ skill.name }}</h4>
              <StatusBadge :label="`${skill.element} Lv${skill.level}`" tone="blue" />
            </div>
            <p class="mt-3 text-sm text-slate-300">{{ skill.description }}</p>
            <p class="mt-3 text-sm text-sky-200">威力 {{ skill.power }} · 冷却 {{ skill.cooltime }}s</p>
          </BaseCard>
        </div>

        <div v-else-if="activeTab === '工作'" class="mt-6">
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <BaseCard v-for="item in pal.workSuitability" :key="item.label">
              <p class="text-sm text-slate-400">工作适应性</p>
              <h4 class="mt-2 text-lg font-semibold text-white">{{ item.label }}</h4>
              <p class="mt-2 text-sm text-sky-200">等级 Lv{{ item.level }}</p>
            </BaseCard>
          </div>
        </div>

        <div v-else-if="activeTab === '掉落'" class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <BaseCard v-for="drop in pal.drops" :key="drop.name">
            <p class="font-medium text-white">{{ drop.name }}</p>
            <p class="mt-2 text-sm text-slate-300">{{ drop.rate }}</p>
          </BaseCard>
        </div>

        <div v-else-if="activeTab === '配种'" class="mt-6 grid gap-4 md:grid-cols-2">
          <BaseCard v-for="item in pal.breedingRelations" :key="item.formula" interactive>
            <RouterLink :to="item.route" class="block">
              <h3 class="text-lg font-semibold text-white">{{ item.formula }}</h3>
              <p class="mt-3 text-sm text-sky-200">前往配种计算器</p>
            </RouterLink>
          </BaseCard>
        </div>

        <div v-else class="mt-6 rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-sm text-slate-300">
          {{ activeTab }} 内容在本次 Demo 中以属性页为主，已预留扩展结构。
        </div>
      </BaseCard>
    </section>

    <section class="space-y-6">
      <SectionTitle title="相关配种" eyebrow="Breeding" />
      <div class="grid gap-4 md:grid-cols-2">
        <BaseCard v-for="item in pal.breedingRelations" :key="item.formula" interactive>
          <RouterLink :to="item.route" class="block">
            <h3 class="text-lg font-semibold text-white">{{ item.formula }}</h3>
            <p class="mt-3 text-sm text-sky-200">查看</p>
          </RouterLink>
        </BaseCard>
      </div>
    </section>
  </AppShell>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BaseCard from '@/components/common/BaseCard.vue'
import BreadcrumbBar from '@/components/common/BreadcrumbBar.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import PalHeroCard from '@/components/pal/PalHeroCard.vue'
import AppShell from '@/layouts/AppShell.vue'
import { palDetails } from '@/data/pals'

const route = useRoute()
const activeTab = ref('属性')
const tabs = ['属性', '技能', '工作', '掉落', '配种'] as const

const fallbackPal = Object.values(palDetails)[0]

const pal = computed(() => palDetails[String(route.params.id)] ?? fallbackPal)

const breadcrumbs = computed(() => [
  { label: '首页', route: '/' },
  { label: '图鉴', route: `/pals/${pal.value.id}` },
  { label: pal.value.name },
])
</script>
