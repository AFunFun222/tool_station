export interface CommunityPost {
  id: string
  category: string
  readCount: string
  title: string
  summary: string
  author: string
  timeAgo: string
  route: string
}

export interface LobbyRoom {
  id: string
  hostName: string
  title: string
  description: string
  tags: string[]
  slots: Array<{
    initial: string
    color: string
    label: string
    status: 'host' | 'member' | 'open'
  }>
  route: string
}

export interface GameServer {
  id: string
  name: string
  description: string
  tags: string[]
  playerCount: number
  maxPlayers: number
  ping: number
  region: string
  route: string
}

export const homePosts: CommunityPost[] = [
  {
    id: 'post-1',
    category: 'Exploration',
    readCount: '2.8k',
    title: "Don't Rush to Build a Big House on Day 1",
    summary: 'Combine fire starter, bed, chest, and workbench into a minimum loop — efficiency matters more than appearance.',
    author: 'Pal Observer',
    timeAgo: '10 min ago',
    route: '/community/home/1',
  },
  {
    id: 'post-2',
    category: 'Mining',
    readCount: '1.4k',
    title: 'Mountain or Valley? Where to Set Up a Mining Outpost',
    summary: 'Comparing ore density, patrol range, and transfer costs to find the most cost-effective mining spot.',
    author: 'DeepDigger',
    timeAgo: '25 min ago',
    route: '/community/home/2',
  },
  {
    id: 'post-3',
    category: 'Breeding',
    readCount: '3.2k',
    title: 'How to Get a Triple-Work Skill Pal in Early Game',
    summary: 'Skip the random breeding trap — use a fixed combination strategy to guarantee your desired passive skills.',
    author: 'BreedMaster',
    timeAgo: '1 hr ago',
    route: '/community/home/3',
  },
  {
    id: 'post-4',
    category: 'Official News',
    readCount: '15k',
    title: 'Patch 1.4 Full Notes: New Pal & Map Expansion',
    summary: 'Brand new volcanic island, 8 new Pals, and reworked base defense system — all details inside.',
    author: 'Official',
    timeAgo: '2 hr ago',
    route: '/community/home/4',
  },
  {
    id: 'post-5',
    category: 'Building',
    readCount: '980',
    title: 'Compact Multi-Functional Base Layout Under 64 Grid',
    summary: 'Maximize production chains and Pal path efficiency in the smallest footprint possible.',
    author: 'ArchitectPal',
    timeAgo: '3 hr ago',
    route: '/community/home/5',
  },
  {
    id: 'post-6',
    category: 'Work Tips',
    readCount: '1.1k',
    title: 'Which Pals Are Best for Fully Automated Farming?',
    summary: 'Analysis of top farming Pals by work speed, stamina recovery, and crop compatibility.',
    author: 'FarmBot',
    timeAgo: '4 hr ago',
    route: '/community/home/6',
  },
  {
    id: 'post-7',
    category: 'Exploration',
    readCount: '2.0k',
    title: 'Hidden Dungeon Locations You Probably Missed',
    summary: 'Six off-the-beaten-path dungeons with rare drops — marked on our interactive map.',
    author: 'DungeonMapper',
    timeAgo: '5 hr ago',
    route: '/community/home/7',
  },
  {
    id: 'post-8',
    category: 'Breeding',
    readCount: '4.5k',
    title: 'Complete Tier List: Best Pals for Each Work Type',
    summary: 'From mining to medicine, every work role ranked with top 3 recommendations and skill notes.',
    author: 'TierMaker',
    timeAgo: '6 hr ago',
    route: '/community/home/8',
  },
  {
    id: 'post-9',
    category: 'Building',
    readCount: '760',
    title: 'Underground Base Tunnel System Guide',
    summary: 'Connect multi-level bases with tunnel paths to reduce Pal travel time and improve logistics.',
    author: 'TunnelKing',
    timeAgo: '8 hr ago',
    route: '/community/home/9',
  },
  {
    id: 'post-10',
    category: 'Mining',
    readCount: '890',
    title: 'Coal Ore Routes: North Route vs East Route Comparison',
    summary: 'Efficiency analysis across three dimensions: distance, ore density, and enemy density.',
    author: 'OreHunter',
    timeAgo: '10 hr ago',
    route: '/community/home/10',
  },
]

export const lobbyRooms: LobbyRoom[] = [
  {
    id: 'lobby-1',
    hostName: 'StarStorm',
    title: 'Tower Boss Rush Tonight',
    description: 'Looking for teammates to tackle tower bosses. Voice chat preferred.',
    tags: ['PVE', 'Boss', 'High Difficulty'],
    slots: [
      { initial: '房', color: 'bg-indigo-600', label: 'Platinum III', status: 'host' },
      { initial: '北', color: 'bg-blue-500', label: 'Gold II', status: 'member' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
    ],
    route: '/community/lobby/1',
  },
  {
    id: 'lobby-2',
    hostName: 'DarkMiner',
    title: 'New Save Base Automation',
    description: 'No level limit, just need someone who understands mining lines and production pipelines.',
    tags: ['Exploration', 'Automation', 'Casual'],
    slots: [
      { initial: '房', color: 'bg-purple-600', label: 'Silver I', status: 'host' },
      { initial: '云', color: 'bg-teal-500', label: 'Gold III', status: 'member' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
    ],
    route: '/community/lobby/2',
  },
  {
    id: 'lobby-3',
    hostName: 'VolcanoGuide',
    title: 'Farm Materials and Bring New Players',
    description: 'Relaxed pace, no rush. Looking for transport and ore spots.',
    tags: ['Newbie-friendly', 'Materials', 'Relaxed'],
    slots: [
      { initial: '房', color: 'bg-orange-500', label: 'Gold I', status: 'host' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
    ],
    route: '/community/lobby/3',
  },
  {
    id: 'lobby-4',
    hostName: 'IceBlade',
    title: 'Competitive PVP Arena Matches',
    description: 'Serious PVP only, bring your best combat lineup.',
    tags: ['PVP', 'Competitive', 'Arena'],
    slots: [
      { initial: '房', color: 'bg-cyan-600', label: 'Diamond I', status: 'host' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
    ],
    route: '/community/lobby/4',
  },
  {
    id: 'lobby-5',
    hostName: 'CraftQueen',
    title: 'Mass Crafting Session',
    description: 'Setting up full production line, need helpers for resource gathering.',
    tags: ['Crafting', 'Teamwork', 'Base'],
    slots: [
      { initial: '房', color: 'bg-pink-600', label: 'Platinum I', status: 'host' },
      { initial: '匠', color: 'bg-yellow-500', label: 'Gold II', status: 'member' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
    ],
    route: '/community/lobby/5',
  },
  {
    id: 'lobby-6',
    hostName: 'NightHunter',
    title: 'Rare Pal Hunting Expedition',
    description: 'Tracking legendary Pals across the map. High level required.',
    tags: ['Hunting', 'Rare', 'High Level'],
    slots: [
      { initial: '房', color: 'bg-red-600', label: 'Diamond III', status: 'host' },
      { initial: '猎', color: 'bg-emerald-500', label: 'Platinum II', status: 'member' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
    ],
    route: '/community/lobby/6',
  },
  {
    id: 'lobby-7',
    hostName: 'PeacefulFarmer',
    title: 'Chill Farming Community',
    description: 'Just farming and chatting. All levels welcome.',
    tags: ['Farming', 'Chill', 'Social'],
    slots: [
      { initial: '房', color: 'bg-green-600', label: 'Bronze I', status: 'host' },
      { initial: '田', color: 'bg-lime-500', label: 'Silver III', status: 'member' },
      { initial: '芽', color: 'bg-teal-500', label: 'Bronze II', status: 'member' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
    ],
    route: '/community/lobby/7',
  },
  {
    id: 'lobby-8',
    hostName: 'TechWizard',
    title: 'Advanced Technology Research',
    description: 'Focusing on unlocking all tech tree nodes efficiently.',
    tags: ['Tech Tree', 'Research', 'Efficient'],
    slots: [
      { initial: '房', color: 'bg-violet-600', label: 'Platinum II', status: 'host' },
      { initial: '技', color: 'bg-sky-500', label: 'Gold I', status: 'member' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
    ],
    route: '/community/lobby/8',
  },
  {
    id: 'lobby-9',
    hostName: 'ExplorerX',
    title: 'Map Completion Challenge',
    description: 'Trying to 100% the map. Every landmark and dungeon.',
    tags: ['Exploration', '100%', 'Achievement'],
    slots: [
      { initial: '房', color: 'bg-amber-600', label: 'Gold III', status: 'host' },
      { initial: '探', color: 'bg-orange-500', label: 'Gold I', status: 'member' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
    ],
    route: '/community/lobby/9',
  },
  {
    id: 'lobby-10',
    hostName: 'BossKiller',
    title: 'Daily Alpha Boss Clear',
    description: 'Daily alpha boss farming for rare drops. Experienced players preferred.',
    tags: ['Alpha Boss', 'Farming', 'Daily'],
    slots: [
      { initial: '房', color: 'bg-rose-600', label: 'Diamond II', status: 'host' },
      { initial: '斩', color: 'bg-red-500', label: 'Platinum III', status: 'member' },
      { initial: '魂', color: 'bg-purple-500', label: 'Diamond I', status: 'member' },
      { initial: '+', color: 'bg-slate-600', label: 'Open', status: 'open' },
    ],
    route: '/community/lobby/10',
  },
]

export const gameServers: GameServer[] = [
  {
    id: 'server-1',
    name: 'PalWorld Official Asia #1',
    description: 'Official Asian server with daily events and active moderation.',
    tags: ['Official', 'PVE', 'Active'],
    playerCount: 156,
    maxPlayers: 200,
    ping: 28,
    region: 'Asia-East',
    route: '/community/server/1',
  },
  {
    id: 'server-2',
    name: 'Dragon Nest PVP Arena',
    description: 'Hardcore PVP combat server with weekly ranked tournaments.',
    tags: ['PVP', 'Competitive', 'Ranked'],
    playerCount: 89,
    maxPlayers: 150,
    ping: 35,
    region: 'Asia-East',
    route: '/community/server/2',
  },
  {
    id: 'server-3',
    name: 'Peaceful Pal Sanctuary',
    description: 'PVE-only server focused on farming, building, and community events.',
    tags: ['PVE', 'Casual', 'Community'],
    playerCount: 203,
    maxPlayers: 250,
    ping: 42,
    region: 'Asia-South',
    route: '/community/server/3',
  },
  {
    id: 'server-4',
    name: 'EU Pal Civilization RP',
    description: 'Immersive roleplay server with strict lore rules and custom economy.',
    tags: ['RP', 'Roleplay', 'EU'],
    playerCount: 67,
    maxPlayers: 100,
    ping: 88,
    region: 'EU-West',
    route: '/community/server/4',
  },
  {
    id: 'server-5',
    name: 'NA Modded Madness',
    description: 'Packed with QoL mods, increased drop rates, and custom Pal spawns.',
    tags: ['Modded', 'PVE', 'NA'],
    playerCount: 134,
    maxPlayers: 200,
    ping: 112,
    region: 'NA-East',
    route: '/community/server/5',
  },
  {
    id: 'server-6',
    name: 'Volcanic Island Survival',
    description: 'Brutal survival mode on the volcanic map with no respawn items.',
    tags: ['Hardcore', 'Survival', 'No-Respawn'],
    playerCount: 45,
    maxPlayers: 80,
    ping: 31,
    region: 'Asia-East',
    route: '/community/server/6',
  },
  {
    id: 'server-7',
    name: 'PalWorld EU Coop #2',
    description: 'Cooperative PVE server with boosted XP and resource rates for casual play.',
    tags: ['Co-op', 'Boosted', 'PVE'],
    playerCount: 178,
    maxPlayers: 200,
    ping: 76,
    region: 'EU-West',
    route: '/community/server/7',
  },
  {
    id: 'server-8',
    name: 'SEA Breeding Masters',
    description: 'Server dedicated to breeding research, skill theory, and tier list building.',
    tags: ['Breeding', 'Research', 'Theory'],
    playerCount: 92,
    maxPlayers: 150,
    ping: 55,
    region: 'Asia-South',
    route: '/community/server/8',
  },
  {
    id: 'server-9',
    name: 'NA West Frontier',
    description: 'Fresh wipe every month, race to establish the largest base and dominate.',
    tags: ['PVP', 'Wipe', 'Base War'],
    playerCount: 121,
    maxPlayers: 180,
    ping: 145,
    region: 'NA-West',
    route: '/community/server/9',
  },
  {
    id: 'server-10',
    name: 'Pal Academic Institute',
    description: 'Dedicated to wiki contribution, data mining, and game mechanic research.',
    tags: ['Research', 'Wiki', 'Data'],
    playerCount: 38,
    maxPlayers: 60,
    ping: 29,
    region: 'Asia-East',
    route: '/community/server/10',
  },
]
