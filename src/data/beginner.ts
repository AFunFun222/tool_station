import type { GuideCard } from '@/types/guide'

export const roadmapSteps = [
  {
    title: 'Create Character',
    level: 'Lv1',
    description: 'Complete initial tutorial and collect basic materials.',
    active: false,
    details: {
      goal: 'Complete the opening tutorial and familiarize yourself with basic controls.',
      tasks: [
        'Complete the NPC tutorial dialogue',
        'Collect 20× Wood and 10× Stone from the starting area',
        'Craft your first Pal Sphere at the workbench',
        'Catch 1 Pal to register in your Paldeck',
      ],
      rewards: ['Starter Pal Sphere ×5', 'Basic Workbench Blueprint', 'Copper Pickaxe'],
      tips: 'Lamball and Chikipi are the easiest first catches — both have Work Suitability that helps your early base.',
      recommendedPals: ['Lamball', 'Chikipi', 'Cattiva'],
    },
  },
  {
    title: 'Catch First Pal',
    level: 'Lv5',
    description: 'Prioritize catching work-type Pals to improve gathering efficiency.',
    active: false,
    details: {
      goal: 'Build a small team of 3 work Pals to automate early resource collection.',
      tasks: [
        'Reach Level 5 by defeating wild Pals',
        'Catch at least 3 Pals with different Work Suitability types',
        'Assign Pals to your base workbench',
        'Unlock the Pal Box and store extra Pals',
      ],
      rewards: ['Pal Box Blueprint', 'Feed Box Blueprint', 'Work Suitability Tutorial Unlock'],
      tips: 'Foxparks has Kindling Lv1 for smelting; Fuack has Watering Lv1. Both are common near the starting plateau.',
      recommendedPals: ['Foxparks', 'Fuack', 'Tanzee'],
    },
  },
  {
    title: 'Establish Base',
    level: 'Lv10',
    description: 'Establish first base on initial plateau and set up production line.',
    active: true,
    details: {
      goal: 'Build a fully automated early base with ore smelting and food production.',
      tasks: [
        'Place a Palbox and claim your first base territory',
        'Build Stone Pit, Logging Site, and Berry Plantation',
        'Smelt Copper Ingots with a Primitive Furnace',
        'Set up a Feed Box to keep Pals satisfied',
        'Reach 5 assigned base Pals',
      ],
      rewards: ['Copper Ingot ×30', 'Advanced Workbench Unlock', 'Base Defense Slot ×1'],
      tips: 'Build your base near ore nodes and water. Pals with Planting + Gathering will automate food easily.',
      recommendedPals: ['Dinossom', 'Bristla', 'Robinquill'],
    },
  },
  {
    title: 'Challenge First Boss',
    level: 'Lv15',
    description: 'Prepare copper ore equipment and basic potions.',
    active: false,
    details: {
      goal: 'Defeat the first tower boss and collect exclusive boss-drop materials.',
      tasks: [
        'Craft Copper Helmet, Copper Armor, and Copper Shield',
        'Brew at least 5× Basic Potion',
        'Assemble a combat team with an attack Pal of 500+ combat power',
        'Defeat Zoe & Grizzbolt in the Tower of the Rayne Syndicate',
      ],
      rewards: ['Grizzbolt Pal Soul Fragment', 'Tower Clear Certificate', 'Advanced Sphere Blueprint'],
      tips: 'Bring a Ground-type Pal — Grizzbolt is Electric-type. Digtoise with Defense Lv2 can tank hits effectively.',
      recommendedPals: ['Digtoise', 'Mossanda', 'Relaxaurus'],
    },
  },
  {
    title: 'Unlock Breeding',
    level: 'Lv20',
    description: 'Begin trying the first flying mount breeding path.',
    active: false,
    details: {
      goal: 'Build a Breeding Farm and produce your first bred Pal egg.',
      tasks: [
        'Research and build the Breeding Farm (requires Lv19 Technology)',
        'Collect Cake ingredients: Flour, Red Berries, Milk, Honey, Egg',
        'Pair Nitewing × Vanwyrm for a chance at Beakon offspring',
        'Hatch your first large Egg using an Egg Incubator',
      ],
      rewards: ['Beakon (Flying Mount)', 'Breeding Farm Unlock', 'Incubator Speed Passive Unlock'],
      tips: 'Cake is required for every breed — set up a Wheat Plantation and Ranch early. Honey is collected by Elizabee.',
      recommendedPals: ['Nitewing', 'Vanwyrm', 'Elizabee'],
    },
  },
]

export const beginnerSuggestion = 'Based on your progress (Lv10), we recommend: 1. Establish base on initial plateau 2. Catch 3 work Pals to start automation 3. Prepare copper ore equipment'

export const beginnerGuides: GuideCard[] = [
  {
    id: 'beginner-1',
    title: 'Beginner Base Location Guide',
    summary: 'Ore points, terrain, and defense trinity, quickly find the most stable early exploration base.',
    sourceLabel: 'AI Aggregated · Bilibili · TapTap',
    sourcePlatform: 'Bilibili / TapTap',
    viewCount: '86K',
    cover: './pic/show1.png',
    tags: ['Base Building'],
    route: '/beginner',
  },
  {
    id: 'beginner-2',
    title: 'Early Stage Optimal Pal Lineup',
    summary: 'Around three lines of combat, gathering, and work, recommend three Pals most suitable for early exploration.',
    sourceLabel: 'AI Aggregated · 17173 · Zhihu',
    sourcePlatform: '17173 / Zhihu',
    viewCount: '69K',
    cover: './pic/show2.png',
    tags: ['Lineup Recommendation'],
    route: '/beginner',
  },
  {
    id: 'beginner-3',
    title: 'How to Catch Pals Fastest',
    summary: 'From stealth backstab to Pal sphere selection, improve early-stage catching success rate.',
    sourceLabel: 'AI Aggregated · Official · Community',
    sourcePlatform: 'Official / Community',
    viewCount: '52K',
    cover: './pic/show3.png',
    tags: ['Catching Tips'],
    route: '/beginner',
  },
]
