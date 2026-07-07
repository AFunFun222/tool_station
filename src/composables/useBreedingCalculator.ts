import { computed, ref } from 'vue'
import { breedingRecipes, popularBreedingRecipes } from '@/data/breeding'
import { palOptions } from '@/data/pals'

export function useBreedingCalculator() {
  const parentA = ref(palOptions[0]?.id ?? '')
  const parentB = ref(palOptions[1]?.id ?? palOptions[0]?.id ?? '')
  const targetPal = ref(palOptions[2]?.id ?? palOptions[0]?.id ?? '')
  const onlyNew = ref(false)

  const filteredRecipes = computed(() =>
    breedingRecipes.filter((recipe) => (onlyNew.value ? recipe.isNewInV1 : true)),
  )

  const forwardResult = computed(() =>
    filteredRecipes.value.find(
      (recipe) =>
        (recipe.parentAId === parentA.value && recipe.parentBId === parentB.value) ||
        (recipe.parentAId === parentB.value && recipe.parentBId === parentA.value),
    ),
  )

  const reverseResults = computed(() =>
    filteredRecipes.value.filter((recipe) => recipe.childId === targetPal.value),
  )

  const getPal = (id: string) => palOptions.find((pal) => pal.id === id)

  const featuredRecipes = computed(() => (reverseResults.value.length ? reverseResults.value.slice(0, 24) : popularBreedingRecipes))

  return {
    parentA,
    parentB,
    targetPal,
    onlyNew,
    forwardResult,
    reverseResults,
    featuredRecipes,
    getPal,
  }
}
