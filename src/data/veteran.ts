import type { ChecklistItem, ImpactCard, ImpactDetail, NewContentCard, TransferSuggestion } from '@/types/analysis'

export const impactCards: ImpactCard[] = [
  {
    id: 'impact-1',
    title: '⚠️ Nerfed',
    palName: 'Sky Vortex Dragon',
    note: 'Flying speed reduced by 15%, still a T1 mount',
    tone: 'red',
  },
  {
    id: 'impact-2',
    title: '✅ Still T0',
    palName: 'Jeno Dragon',
    note: 'Stats unchanged, new breeding paths unlocked',
    tone: 'green',
  },
  {
    id: 'impact-3',
    title: '🆕 Recommended for Training',
    palName: 'Lotus Dragon (New)',
    note: 'World Tree energy mutation, water-type T0',
    tone: 'blue',
  },
]

export const transferToNewSave: TransferSuggestion[] = [
  { name: 'Jeno Dragon', reason: 'Endgame combat and flying combined, still core strength in 1.0.', priority: 'High' },
  { name: 'Sky Vortex Dragon', reason: 'Although speed is reduced, exploration efficiency remains leading.', priority: 'High' },
  { name: 'Swift Falcon', reason: 'Excellent early-mid transition, suitable for quick map exploration.', priority: 'Medium' },
  { name: 'Holy Light Knight', reason: 'Adapts to new area Boss battles, high error tolerance.', priority: 'Medium' },
]

export const keepInOldSave: TransferSuggestion[] = [
  { name: 'Peck Dragon', reason: 'Replaced by new water-type Pals in 1.0 environment.', priority: 'Low' },
  { name: 'Abyssal Dragon', reason: 'Work suitability benefits decreased, can keep in old save.', priority: 'Low' },
  { name: 'Thunder Hound', reason: 'Insufficient versatility under new mechanics.', priority: 'Low' },
]

export const newContentCards: NewContentCard[] = [
  { title: 'World Tree (New Area)', description: 'Endgame exploration area, recommended Lv55+.', route: '/veteran-analysis' },
  { title: 'Sky Island Cloud Sea (New Area)', description: 'High-altitude vertical exploration, flying mount required.', route: '/veteran-analysis' },
  { title: 'Human-Pal Integration (New Mechanic)', description: 'Some Pals can transform into weapons to participate in combat.', route: '/advisor' },
  { title: '50+ New Pals', description: 'Added many endgame and functional Pals.', route: '/pals/kongwolong' },
  { title: 'Forbidden Hunting Area 2.0', description: 'Added energy barriers and patrol drones.', route: '/veteran-analysis' },
  { title: 'Multiple Ending Stories', description: 'Complete main storyline completion, added story branches.', route: '/veteran-analysis' },
]

export const impactDetails: ImpactDetail[] = [
  { name: 'Sky Vortex Dragon', status: 'Nerfed', description: 'Flying speed -15%, endurance +10%, comprehensive still T1 mount', action: 'View alternatives' },
  { name: 'Jeno Dragon', status: 'Unchanged', description: 'Stats unchanged, new breeding paths unlocked', action: 'Keep training' },
  { name: 'Swift Falcon', status: 'Enhanced', description: 'Early-mid riding experience optimized, more flexible turning', action: 'Keep training' },
  { name: 'Abyssal Dragon', status: 'Nerfed', description: 'Work suitability benefits decreased, recommend transferring to functional position', action: 'View alternatives' },
  { name: 'Peck Dragon', status: 'New Breeding', description: 'Added linkage breeding path with Lotus Dragon', action: 'View alternatives' },
]

export const worldTreeChecklist: ChecklistItem[] = [
  { label: 'Recommended Level: Lv55+', checked: true },
  { label: 'Recommended Mount: Sky Vortex Dragon/Jeno Dragon (Flying)', checked: true },
  { label: 'Recommended Combat Pal: Lotus Dragon (New) + Holy Light Knight', checked: false },
  { label: 'Resources Preparation: Advanced Pal Sphere x20, Healing Potion x10', checked: false },
]
