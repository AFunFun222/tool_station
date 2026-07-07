<template>
  <div class="space-y-4">
    <!-- 步骤选择器 -->
    <div class="grid gap-4 xl:grid-cols-5">
      <button
        v-for="step in steps"
        :key="`${step.title}-${step.level}`"
        class="text-left transition-all"
        @click="toggleStep(step.level)"
      >
        <BaseCard
          :class="[
            activeLevel === step.level
              ? 'border-teal-300/60 bg-teal-300/15 ring-2 ring-teal-300/40'
              : activeLevel === null && step.active
                ? 'border-teal-400/40 bg-teal-400/10'
                : 'hover:border-white/20',
            'cursor-pointer transition-all'
          ]"
        >
          <div class="flex items-center gap-3">
            <div
              :class="[
                'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold',
                activeLevel === step.level
                  ? 'bg-teal-400 text-slate-900'
                  : 'border border-white/10 bg-white/5 text-white'
              ]"
            >
              {{ step.level }}
            </div>
            <StatusBadge v-if="step.active" label="Current Stage" tone="teal" />
          </div>
          <h3 class="mt-4 text-lg font-semibold text-white">{{ step.title }}</h3>
          <p class="mt-2 text-sm leading-6 text-slate-300">{{ step.description }}</p>
          <div class="mt-3 flex items-center gap-1 text-xs text-teal-300">
            <span>{{ activeLevel === step.level ? 'Hide Details' : 'View Details' }}</span>
            <ChevronDown
              :class="['h-3.5 w-3.5 transition-transform', activeLevel === step.level ? 'rotate-180' : '']"
            />
          </div>
        </BaseCard>
      </button>
    </div>

    <!-- 详情展开面板 -->
    <Transition name="slide-down">
      <BaseCard v-if="activeStep" :key="activeStep.level" class="border-teal-400/20 bg-teal-400/5">
        <div class="mb-4 flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-full bg-teal-400 text-sm font-bold text-slate-900">
            {{ activeStep.level }}
          </div>
          <div>
            <h3 class="text-xl font-semibold text-white">{{ activeStep.title }}</h3>
            <p class="text-sm text-teal-300">{{ activeStep.details.goal }}</p>
          </div>
        </div>

        <div class="grid gap-5 md:grid-cols-3">
          <!-- 任务列表 -->
          <div>
            <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Tasks</p>
            <ul class="space-y-2">
              <li
                v-for="task in activeStep.details.tasks"
                :key="task"
                class="flex items-start gap-2 text-sm text-slate-200"
              >
                <CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                {{ task }}
              </li>
            </ul>
          </div>

          <!-- 奖励 -->
          <div>
            <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Rewards</p>
            <ul class="space-y-2">
              <li
                v-for="reward in activeStep.details.rewards"
                :key="reward"
                class="flex items-center gap-2 text-sm text-slate-200"
              >
                <Gift class="h-4 w-4 shrink-0 text-amber-400" />
                {{ reward }}
              </li>
            </ul>

            <div class="mt-4">
              <p class="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">Recommended Pals</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="pal in activeStep.details.recommendedPals"
                  :key="pal"
                  class="rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-xs text-teal-200"
                >
                  {{ pal }}
                </span>
              </div>
            </div>
          </div>

          <!-- 提示 -->
          <div>
            <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Tips</p>
            <div class="rounded-xl border border-amber-400/20 bg-amber-400/10 p-3">
              <div class="flex items-start gap-2">
                <Lightbulb class="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <p class="text-sm leading-6 text-amber-100">{{ activeStep.details.tips }}</p>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronDown, CheckCircle2, Gift, Lightbulb } from 'lucide-vue-next'
import BaseCard from '@/components/common/BaseCard.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'

const props = defineProps<{
  steps: Array<{
    title: string
    level: string
    description: string
    active: boolean
    details: {
      goal: string
      tasks: string[]
      rewards: string[]
      tips: string
      recommendedPals: string[]
    }
  }>
}>()

// 默认展开 active 的步骤
const activeLevel = ref(props.steps.find(s => s.active)?.level ?? null)

const activeStep = computed(() => props.steps.find(s => s.level === activeLevel.value) ?? null)

function toggleStep(level: string) {
  activeLevel.value = activeLevel.value === level ? null : level
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
