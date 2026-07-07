<template>
  <AppShell v-if="pal">
    <BreadcrumbBar :items="breadcrumbs" />

    <!-- 主体两栏：左侧英雄卡 + 右侧详情面板 -->
    <section class="grid gap-5 xl:grid-cols-[420px_1fr]">
      <!-- 左侧：帕鲁英雄卡 -->
      <PalHeroCard :pal="pal" />

      <!-- 右侧：Tab 详情面板 -->
      <div class="rounded-3xl overflow-hidden" style="background: rgba(10, 22, 48, 0.85); border: 1px solid rgba(255,255,255,0.07);">
        <!-- Tab 导航栏 -->
        <div class="flex border-b" style="border-color: rgba(255,255,255,0.07);">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="flex items-center gap-2 px-5 py-4 text-sm font-medium transition-colors relative"
            :class="activeTab === tab.key
              ? 'text-sky-400'
              : 'text-slate-400 hover:text-slate-200'"
            @click="activeTab = tab.key"
          >
            <component :is="tab.icon" :size="16" />
            <span>{{ tab.label }}</span>
            <!-- 激活下划线 -->
            <span
              v-if="activeTab === tab.key"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 rounded-t"
            ></span>
          </button>
        </div>

        <!-- Tab 内容区 -->
        <div class="p-6">

          <!-- ===== 属性 Tab ===== -->
          <div v-if="activeTab === 'stats'">
            <div class="grid gap-6 lg:grid-cols-2">
              <!-- 左：基础属性 -->
              <div>
                <h3 class="text-sm font-semibold text-sky-400 mb-4">Basic Stats</h3>
                <div class="space-y-4">
                  <div v-for="stat in pal.statsPanel" :key="stat.label" class="flex items-center gap-3">
                    <!-- 图标 -->
                    <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                         style="background: rgba(255,255,255,0.05);">
                      <component :is="statIconMap[stat.label] ?? ShieldIcon" :size="14" class="text-slate-300" />
                    </div>
                    <!-- 标签 -->
                    <span class="w-8 text-sm text-slate-300 shrink-0">{{ stat.label }}</span>
                    <!-- 进度条 -->
                    <div class="flex-1 h-2 rounded-full" style="background: rgba(255,255,255,0.08);">
                      <div
                        class="h-2 rounded-full transition-all"
                        style="background: linear-gradient(90deg, #38bdf8, #818cf8);"
                        :style="{ width: `${Math.min(stat.value, 100)}%` }"
                      ></div>
                    </div>
                    <!-- 数值 -->
                    <span class="w-8 text-right text-sm font-semibold text-white shrink-0">{{ stat.value }}</span>
                  </div>
                </div>
              </div>

              <!-- 右：工作适应性 -->
              <div>
                <h3 class="text-sm font-semibold text-sky-400 mb-4">Work Suitability</h3>
                <div class="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
                  <div
                    v-for="item in pal.workSuitability"
                    :key="item.label"
                    class="flex flex-col items-center gap-1.5 rounded-xl py-3 px-2"
                    style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);"
                  >
                    <div class="w-9 h-9 rounded-lg flex items-center justify-center"
                         style="background: rgba(56, 189, 248, 0.12);">
                      <component :is="workIconMap[item.key] ?? HammerIcon" :size="18" class="text-sky-300" />
                    </div>
                    <span class="text-xs text-slate-300 text-center leading-tight">{{ item.label }}</span>
                    <span class="text-xs font-bold text-sky-400">Lv {{ item.level }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 被动技能 + 主动技能 -->
            <div class="mt-6 grid gap-4 md:grid-cols-2">
              <!-- 被动技能 -->
              <div class="rounded-2xl p-4" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);">
                <p class="text-xs font-semibold text-slate-400 mb-3">Passive Skill</p>
                <div class="flex items-start gap-3">
                  <div class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                       style="background: rgba(139, 92, 246, 0.2); border: 1px solid rgba(139, 92, 246, 0.3);">
                    <WindIcon :size="20" class="text-purple-300" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-white text-sm">{{ pal.passiveSkill.name }}</h4>
                    <p class="mt-1 text-xs text-slate-300 leading-relaxed">{{ pal.passiveSkill.description }}</p>
                  </div>
                </div>
              </div>

              <!-- 主动技能 -->
              <div class="rounded-2xl p-4" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);">
                <div class="flex items-start justify-between gap-2 mb-3">
                  <p class="text-xs font-semibold text-slate-400">Active Skill</p>
                  <span v-if="pal.activeSkills.length" class="text-xs px-2 py-0.5 rounded-full"
                        style="background: rgba(56,189,248,0.12); color: #38bdf8; border: 1px solid rgba(56,189,248,0.25);">
                    View Details
                  </span>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                       style="background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56,189,248,0.3);">
                    <ZapIcon :size="20" class="text-sky-300" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-white text-sm">{{ pal.activeSkill.name }}</h4>
                    <p class="mt-1 text-xs text-slate-300 leading-relaxed line-clamp-2">{{ pal.activeSkill.description }}</p>
                    <p v-if="pal.activeSkill.power" class="mt-1.5 text-xs text-sky-300">{{ pal.activeSkill.power }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 掉落物 -->
            <div class="mt-6">
              <h3 class="text-sm font-semibold text-sky-400 mb-4">Drops</h3>
              <div class="grid gap-3 grid-cols-2 md:grid-cols-3">
                <div
                  v-for="drop in pal.drops"
                  :key="drop.name"
                  class="flex items-center gap-3 rounded-xl px-4 py-3"
                  style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);"
                >
                  <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                       style="background: rgba(139,92,246,0.15);">
                    <PackageIcon :size="16" class="text-purple-300" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-white truncate">{{ drop.name }}</p>
                    <p class="text-xs text-slate-400">Drop Rate: {{ drop.rate }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== 技能 Tab ===== -->
          <div v-else-if="activeTab === 'skills'" class="grid gap-3 md:grid-cols-2">
            <div
              v-for="skill in pal.activeSkills"
              :key="`${skill.name}-${skill.level}`"
              class="rounded-2xl p-4"
              style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);"
            >
              <div class="flex items-center justify-between gap-2 mb-2">
                <h4 class="text-sm font-semibold text-white">{{ skill.name }}</h4>
                <span class="text-xs px-2 py-0.5 rounded-full shrink-0"
                      style="background: rgba(56,189,248,0.12); color: #38bdf8; border: 1px solid rgba(56,189,248,0.25);">
                  {{ skill.element }} Lv{{ skill.level }}
                </span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">{{ skill.description }}</p>
              <p class="mt-2 text-xs text-sky-300">Power {{ skill.power }} · Cooldown {{ skill.cooltime }}s</p>
            </div>
          </div>

          <!-- ===== 工作 Tab ===== -->
          <div v-else-if="activeTab === 'work'">
            <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <div
                v-for="item in pal.workSuitability"
                :key="item.label"
                class="flex items-center gap-4 rounded-2xl p-4"
                style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);"
              >
                <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                     style="background: rgba(56, 189, 248, 0.12);">
                  <component :is="workIconMap[item.key] ?? HammerIcon" :size="22" class="text-sky-300" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-white">{{ item.label }}</p>
                  <p class="mt-0.5 text-xs text-sky-400 font-bold">Lv {{ item.level }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== 掉落 Tab ===== -->
          <div v-else-if="activeTab === 'drops'" class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            <div
              v-for="drop in pal.drops"
              :key="drop.name"
              class="flex items-center gap-3 rounded-2xl px-4 py-4"
              style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);"
            >
              <div class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                   style="background: rgba(139,92,246,0.15);">
                <PackageIcon :size="18" class="text-purple-300" />
              </div>
              <div>
                <p class="font-medium text-white text-sm">{{ drop.name }}</p>
                <p class="mt-1 text-xs text-slate-400">{{ drop.rate }}</p>
              </div>
            </div>
          </div>

          <!-- ===== 配种 Tab ===== -->
          <div v-else-if="activeTab === 'breeding'" class="space-y-3">
            <RouterLink
              v-for="item in pal.breedingRelations"
              :key="item.formula"
              :to="item.route"
              class="flex items-center gap-3 rounded-2xl px-5 py-4 transition hover:border-sky-400/40 group"
              style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);"
            >
              <!-- parentA -->
              <div class="flex flex-col items-center gap-1 w-16 shrink-0">
                <img v-if="item.parentA.avatar" :src="item.parentA.avatar" :alt="item.parentA.name"
                     class="w-12 h-12 object-contain" />
                <div v-else class="w-12 h-12 rounded-xl flex items-center justify-center"
                     style="background: rgba(255,255,255,0.05);">
                  <HelpCircleIcon :size="20" class="text-slate-500" />
                </div>
                <span class="text-xs text-slate-400 text-center truncate w-full">{{ item.parentA.name }}</span>
              </div>
              <span class="text-slate-500 font-bold text-lg">=</span>
              <!-- parentB -->
              <div class="flex flex-col items-center gap-1 w-16 shrink-0">
                <img v-if="item.parentB.avatar" :src="item.parentB.avatar" :alt="item.parentB.name"
                     class="w-12 h-12 object-contain" />
                <div v-else class="w-12 h-12 rounded-xl flex items-center justify-center"
                     style="background: rgba(255,255,255,0.05);">
                  <HelpCircleIcon :size="20" class="text-slate-500" />
                </div>
                <span class="text-xs text-slate-400 text-center truncate w-full">{{ item.parentB.name }}</span>
              </div>
              <span class="text-slate-500 font-bold text-lg">×</span>
              <!-- child -->
              <div class="flex flex-col items-center gap-1 w-16 shrink-0">
                <img v-if="item.child.avatar" :src="item.child.avatar" :alt="item.child.name"
                     class="w-12 h-12 object-contain" />
                <div v-else class="w-12 h-12 rounded-xl flex items-center justify-center"
                     style="background: rgba(255,255,255,0.05);">
                  <HelpCircleIcon :size="20" class="text-slate-500" />
                </div>
                <span class="text-xs text-slate-400 text-center truncate w-full">{{ item.child.name }}</span>
              </div>
              <div class="ml-auto flex items-center gap-1.5 text-sky-400 group-hover:text-sky-300 text-sm font-medium shrink-0">
                View
                <ChevronRightIcon :size="16" />
              </div>
            </RouterLink>
          </div>

          <div v-else class="rounded-2xl p-8 text-sm text-slate-400 text-center"
               style="background: rgba(255,255,255,0.03); border: 1px dashed rgba(255,255,255,0.1);">
            No Data
          </div>
        </div>
      </div>
    </section>

    <!-- 相关配种 -->
    <section class="mt-6 space-y-5">
      <div class="flex items-center gap-3">
        <HeartIcon :size="18" class="text-sky-400" />
        <h2 class="text-lg font-semibold text-white">Related Breeding</h2>
      </div>
      <div class="flex flex-wrap gap-4">
        <RouterLink
          v-for="item in pal.breedingRelations.slice(0, 4)"
          :key="item.formula"
          :to="item.route"
          class="flex items-center gap-3 rounded-2xl px-5 py-4 transition hover:border-sky-400/40 group"
          style="background: rgba(10,22,48,0.7); border: 1px solid rgba(255,255,255,0.08); min-width: 320px;"
        >
          <!-- parentA -->
          <div class="flex flex-col items-center gap-1 w-14 shrink-0">
            <img v-if="item.parentA.avatar" :src="item.parentA.avatar" :alt="item.parentA.name"
                 class="w-11 h-11 object-contain" />
            <div v-else class="w-11 h-11 rounded-xl flex items-center justify-center"
                 style="background: rgba(255,255,255,0.05);">
              <HelpCircleIcon :size="18" class="text-slate-500" />
            </div>
            <span class="text-xs text-slate-400 text-center truncate w-full">{{ item.parentA.name }}</span>
          </div>
          <span class="text-slate-500 font-bold">=</span>
          <!-- parentB -->
          <div class="flex flex-col items-center gap-1 w-14 shrink-0">
            <img v-if="item.parentB.avatar" :src="item.parentB.avatar" :alt="item.parentB.name"
                 class="w-11 h-11 object-contain" />
            <div v-else class="w-11 h-11 rounded-xl flex items-center justify-center"
                 style="background: rgba(255,255,255,0.05);">
              <HelpCircleIcon :size="18" class="text-slate-500" />
            </div>
            <span class="text-xs text-slate-400 text-center truncate w-full">{{ item.parentB.name }}</span>
          </div>
          <span class="text-slate-500 font-bold">×</span>
          <!-- child -->
          <div class="flex flex-col items-center gap-1 w-14 shrink-0">
            <img v-if="item.child.avatar" :src="item.child.avatar" :alt="item.child.name"
                 class="w-11 h-11 object-contain" />
            <div v-else class="w-11 h-11 rounded-xl flex items-center justify-center"
                 style="background: rgba(255,255,255,0.05);">
              <span class="text-xs text-slate-500 font-bold">???</span>
            </div>
            <span class="text-xs text-slate-400 text-center truncate w-full">{{ item.child.name }}</span>
          </div>
          <div class="ml-auto flex items-center gap-1 text-sky-400 group-hover:text-sky-300 text-sm font-medium shrink-0">
            View <ChevronRightIcon :size="15" />
          </div>
        </RouterLink>
      </div>
    </section>
  </AppShell>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  BarChart2 as BarChart2Icon,
  Swords as SwordsIcon,
  Briefcase as BriefcaseIcon,
  ShoppingBag as ShoppingBagIcon,
  Heart as HeartIcon,
  ChevronRight as ChevronRightIcon,
  HelpCircle as HelpCircleIcon,
  Heart,
  Shield as ShieldIcon,
  Zap as ZapIcon,
  Wind as WindIcon,
  Package as PackageIcon,
  Hammer as HammerIcon,
  Flame as FlameIcon,
  Droplets as DropletsIcon,
  Leaf as LeafIcon,
  Sprout as SproutIcon,
  Wrench as WrenchIcon,
  Snowflake as SnowflakeIcon,
  TreeDeciduous as TreeDeciduousIcon,
  Pickaxe as PickaxeIcon,
  FlaskConical as FlaskConicalIcon,
  Home as HomeIcon,
  Activity as ActivityIcon,
  Swords,
} from 'lucide-vue-next'
import BreadcrumbBar from '@/components/common/BreadcrumbBar.vue'
import PalHeroCard from '@/components/pal/PalHeroCard.vue'
import AppShell from '@/layouts/AppShell.vue'
import { palDetails } from '@/data/pals'

const route = useRoute()
const activeTab = ref('stats')

const tabs = [
  { key: 'stats', label: 'Stats', icon: BarChart2Icon },
  { key: 'skills', label: 'Skills', icon: SwordsIcon },
  { key: 'work', label: 'Work', icon: BriefcaseIcon },
  { key: 'drops', label: 'Drops', icon: ShoppingBagIcon },
  { key: 'breeding', label: 'Breeding', icon: HeartIcon },
]

const statIconMap: Record<string, unknown> = {
  HP: Heart,
  ATK: Swords,
  DEF: ShieldIcon,
  SPD: ZapIcon,
  Work: WrenchIcon,
}

const workIconMap: Record<string, unknown> = {
  Kindling: FlameIcon,
  Watering: DropletsIcon,
  Planting: SproutIcon,
  GeneratingElectricity: ZapIcon,
  Handiwork: WrenchIcon,
  Gathering: LeafIcon,
  Lumbering: TreeDeciduousIcon,
  Mining: PickaxeIcon,
  MedicineProduction: FlaskConicalIcon,
  Cooling: SnowflakeIcon,
  Transporting: PackageIcon,
  Farming: HomeIcon,
}

const fallbackPal = Object.values(palDetails)[0]
const pal = computed(() => palDetails[String(route.params.id)] ?? fallbackPal)

const breadcrumbs = computed(() => [
  { label: 'Home', route: '/' },
  { label: 'Pal Encyclopedia', route: `/pals` },
  { label: pal.value.name },
])
</script>
