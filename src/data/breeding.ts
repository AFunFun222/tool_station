import breedingTableRaw from '../../palworld-data/breeding_table.json'
import breedingReverseRaw from '../../palworld-data/breeding_reverse.json'
import type { BreedingRecipe } from '@/types/breeding'

type RawBreedingTable = {
  code_to_name: Record<string, string>
  breeding_table?: Record<string, Record<string, string>>
}

type RawBreedingReverse = {
  code_to_name: Record<string, string>
  child_to_parents?: Record<string, string[][]>
}

const breedingTable = breedingTableRaw as RawBreedingTable

const breedingReverse = breedingReverseRaw as RawBreedingReverse

const normalizeId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

const variantPattern = /noct|cryst|ignis|terra|lux|aqua|gild|botan|libero|ryu/i

const buildRecipeMeta = (childName: string, index: number) => ({
  materials: '配种牧场 + 蛋糕',
  estimatedTime: `${1 + (index % 4)}小时`,
  successRate: `${88 - (index % 9)}%`,
  isNewInV1: variantPattern.test(childName),
})

const forwardRecipes: BreedingRecipe[] = Object.entries(breedingTable.breeding_table ?? {}).flatMap(([parentA, children], parentAIndex) => {
  return Object.entries(children).map(([parentB, child], childIndex) => {
    const parentAName = breedingTable.code_to_name[parentA] ?? parentA
    const parentBName = breedingTable.code_to_name[parentB] ?? parentB
    const childName = breedingTable.code_to_name[child] ?? child
    const index = parentAIndex + childIndex

    return {
      id: `recipe-${index + 1}`,
      parentAId: normalizeId(parentAName),
      parentBId: normalizeId(parentBName),
      childId: normalizeId(childName),
      ...buildRecipeMeta(childName, index),
      source: 'forward',
    }
  })
})
const reverseRecipes: BreedingRecipe[] = Object.entries(breedingReverse.child_to_parents ?? {}).flatMap(([childCode, pairs], childIndex) => {
  const childName = breedingReverse.code_to_name[childCode] ?? childCode

  return pairs.map(([parentA, parentB], pairIndex) => {
    const parentAName = breedingReverse.code_to_name[parentA] ?? parentA
    const parentBName = breedingReverse.code_to_name[parentB] ?? parentB
    const index = childIndex + pairIndex

    return {
      id: `reverse-${childCode}-${pairIndex}`,
      parentAId: normalizeId(parentAName),
      parentBId: normalizeId(parentBName),
      childId: normalizeId(childName),
      ...buildRecipeMeta(childName, index),
      source: 'reverse',
    }
  })
})

const recipeMap = new Map<string, BreedingRecipe>()

;[...forwardRecipes, ...reverseRecipes].forEach((recipe) => {
  const pairKey = [recipe.parentAId, recipe.parentBId].sort().join('|')
  const key = `${pairKey}->${recipe.childId}`

  if (!recipeMap.has(key)) {
    recipeMap.set(key, recipe)
  }
})

export const breedingRecipes: BreedingRecipe[] = [...recipeMap.values()]

export const popularBreedingRecipes = breedingRecipes.slice(0, 24)
