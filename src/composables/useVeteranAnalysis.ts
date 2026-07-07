import { computed, ref } from 'vue'
import { impactCards } from '@/data/veteran'

export function useVeteranAnalysis() {
  const archiveInput = ref('空涡龙、杰诺多兰、疾风隼、覆海龙、佩克龙')
  const hasAnalyzed = ref(false)

  const summaryStats = computed(() => [
    { label: '3只被调整', value: '3' },
    { label: '2只仍然T0', value: '2' },
    { label: '4只推荐培养', value: '4' },
    { label: '1.0新增5条配种路径', value: '5' },
  ])

  const visibleImpactCards = computed(() => (hasAnalyzed.value ? impactCards : []))

  const analyze = async () => {
    await new Promise((resolve) => window.setTimeout(resolve, 700))
    hasAnalyzed.value = true
  }

  return {
    archiveInput,
    hasAnalyzed,
    summaryStats,
    visibleImpactCards,
    analyze,
  }
}
