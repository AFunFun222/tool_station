export interface BreedingRecipe {
  id: string
  parentAId: string
  parentBId: string
  childId: string
  materials: string
  estimatedTime: string
  successRate: string
  isNewInV1?: boolean
  source: 'forward' | 'reverse'
}

export interface BreedingPairRecord {
  parentA: string
  parentB: string
  child: string
}
