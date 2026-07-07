<template>
  <AppShell>
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Back Button -->
      <div>
        <RouterLink
          to="/community"
          class="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft class="h-4 w-4" />
          Back to Community Hub
        </RouterLink>
      </div>

      <!-- Not Found -->
      <div v-if="!content" class="text-center py-24">
        <div class="text-6xl mb-4">🔍</div>
        <h2 class="text-2xl font-semibold text-white mb-2">Content Not Found</h2>
        <p class="text-slate-400">The requested content could not be found.</p>
      </div>

      <!-- Home Post Detail -->
      <template v-else-if="type === 'home'">
        <article class="space-y-6">
          <!-- Header -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <span class="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-400 ring-1 ring-indigo-500/30">
                {{ (content as CommunityPost).category }}
              </span>
              <span class="text-sm text-slate-500">{{ (content as CommunityPost).readCount }} reads</span>
            </div>
            <h1 class="text-3xl font-bold text-white leading-tight">{{ (content as CommunityPost).title }}</h1>
            <div class="flex items-center gap-3 text-sm text-slate-400">
              <span class="font-medium text-slate-300">{{ (content as CommunityPost).author }}</span>
              <span>·</span>
              <span>{{ (content as CommunityPost).timeAgo }}</span>
            </div>
          </div>

          <!-- Summary Card -->
          <div class="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5">
            <p class="text-slate-300 leading-relaxed text-base">{{ (content as CommunityPost).summary }}</p>
          </div>

          <!-- Article Body -->
          <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-6 space-y-6">
            <template v-if="postDetail">
              <section v-for="(section, i) in postDetail.sections" :key="i" class="space-y-3">
                <h2 class="text-xl font-semibold text-white flex items-center gap-2">
                  <span class="text-indigo-400 text-lg">{{ section.icon }}</span>
                  {{ section.heading }}
                </h2>
                <p class="text-slate-300 leading-relaxed">{{ section.body }}</p>
                <ul v-if="section.tips" class="space-y-2 pl-4">
                  <li v-for="(tip, j) in section.tips" :key="j" class="flex items-start gap-2 text-slate-300 text-sm">
                    <span class="text-teal-400 mt-0.5">▸</span>
                    <span>{{ tip }}</span>
                  </li>
                </ul>
              </section>
            </template>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in postDetail?.tags"
              :key="tag"
              class="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-400 ring-1 ring-white/10"
            >{{ tag }}</span>
          </div>
        </article>
      </template>

      <!-- Lobby Room Detail -->
      <template v-else-if="type === 'lobby'">
        <div class="space-y-6">
          <!-- Header -->
          <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <div class="flex items-start justify-between gap-4">
              <div class="space-y-2">
                <p class="text-xs text-slate-500">Host: <span class="text-slate-300 font-medium">{{ (content as LobbyRoom).hostName }}</span></p>
                <h1 class="text-2xl font-bold text-white">{{ (content as LobbyRoom).title }}</h1>
                <p class="text-slate-400">{{ (content as LobbyRoom).description }}</p>
                <div class="flex flex-wrap gap-2 pt-1">
                  <span
                    v-for="tag in (content as LobbyRoom).tags"
                    :key="tag"
                    class="rounded-lg bg-white/5 px-2 py-1 text-xs text-slate-400 ring-1 ring-white/10"
                  >{{ tag }}</span>
                </div>
              </div>
              <div class="shrink-0">
                <button class="rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-colors px-5 py-2.5 text-sm font-semibold text-white">
                  Request to Join
                </button>
              </div>
            </div>
          </div>

          <!-- Players -->
          <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-6 space-y-4">
            <h2 class="text-lg font-semibold text-white">Players ({{ (content as LobbyRoom).slots.filter(s => s.status !== 'open').length }}/{{ (content as LobbyRoom).slots.length }})</h2>
            <div class="grid gap-3 sm:grid-cols-2">
              <div
                v-for="(slot, i) in (content as LobbyRoom).slots"
                :key="i"
                class="flex items-center gap-3 rounded-xl border p-3 transition-colors"
                :class="slot.status === 'open' ? 'border-white/5 bg-white/2' : 'border-white/10 bg-slate-800/50'"
              >
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  :class="slot.color"
                >
                  {{ slot.initial }}
                </div>
                <div>
                  <p class="text-sm font-medium" :class="slot.status === 'open' ? 'text-slate-500' : 'text-white'">
                    {{ slot.status === 'open' ? 'Waiting for player...' : slot.status === 'host' ? 'Host' : 'Member' }}
                  </p>
                  <p class="text-xs text-slate-500">{{ slot.label }}</p>
                </div>
                <span v-if="slot.status === 'host'" class="ml-auto rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] text-indigo-400 ring-1 ring-indigo-500/30">HOST</span>
              </div>
            </div>
          </div>

          <!-- Room Info -->
          <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-6 space-y-4">
            <h2 class="text-lg font-semibold text-white">Room Details</h2>
            <div class="grid gap-4 sm:grid-cols-2">
              <div v-for="info in lobbyDetail?.info" :key="info.label" class="space-y-1">
                <p class="text-xs text-slate-500 uppercase tracking-wider">{{ info.label }}</p>
                <p class="text-sm text-slate-200">{{ info.value }}</p>
              </div>
            </div>
          </div>

          <!-- Requirements -->
          <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-6 space-y-3">
            <h2 class="text-lg font-semibold text-white">Requirements & Notes</h2>
            <ul class="space-y-2">
              <li
                v-for="(req, i) in lobbyDetail?.requirements"
                :key="i"
                class="flex items-start gap-2 text-sm text-slate-300"
              >
                <span class="text-indigo-400 mt-0.5">▸</span>
                {{ req }}
              </li>
            </ul>
          </div>
        </div>
      </template>

      <!-- Server Detail -->
      <template v-else-if="type === 'server'">
        <div class="space-y-6">
          <!-- Header -->
          <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <div class="flex items-start justify-between gap-4">
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <div class="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span class="text-xs text-slate-400">Online</span>
                  <span class="text-xs text-slate-500">·</span>
                  <span class="text-xs text-slate-400">{{ (content as GameServer).region }}</span>
                </div>
                <h1 class="text-2xl font-bold text-white">{{ (content as GameServer).name }}</h1>
                <p class="text-slate-400">{{ (content as GameServer).description }}</p>
                <div class="flex flex-wrap gap-2 pt-1">
                  <span
                    v-for="tag in (content as GameServer).tags"
                    :key="tag"
                    class="rounded-lg bg-white/5 px-2 py-1 text-xs text-slate-400 ring-1 ring-white/10"
                  >{{ tag }}</span>
                </div>
              </div>
              <div class="shrink-0 text-right space-y-1">
                <p class="text-2xl font-bold text-white">{{ (content as GameServer).playerCount }}<span class="text-slate-400 text-base font-normal">/{{ (content as GameServer).maxPlayers }}</span></p>
                <p class="text-xs text-slate-500">Players Online</p>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid gap-4 sm:grid-cols-3">
            <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-center space-y-1">
              <p class="text-3xl font-bold text-white">{{ (content as GameServer).ping }}<span class="text-sm text-slate-400">ms</span></p>
              <p class="text-xs text-slate-500 uppercase tracking-wider">Ping</p>
              <div class="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div class="h-full rounded-full transition-all" :class="(content as GameServer).ping < 50 ? 'bg-emerald-500' : (content as GameServer).ping < 100 ? 'bg-yellow-500' : 'bg-red-500'" :style="`width: ${Math.min((content as GameServer).ping, 200) / 2}%`" />
              </div>
            </div>
            <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-center space-y-1">
              <p class="text-3xl font-bold text-white">{{ Math.round((content as GameServer).playerCount / (content as GameServer).maxPlayers * 100) }}<span class="text-sm text-slate-400">%</span></p>
              <p class="text-xs text-slate-500 uppercase tracking-wider">Capacity</p>
              <div class="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div class="h-full rounded-full bg-indigo-500 transition-all" :style="`width: ${Math.round((content as GameServer).playerCount / (content as GameServer).maxPlayers * 100)}%`" />
              </div>
            </div>
            <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-center space-y-1">
              <p class="text-3xl font-bold text-white">{{ (content as GameServer).maxPlayers - (content as GameServer).playerCount }}</p>
              <p class="text-xs text-slate-500 uppercase tracking-wider">Open Slots</p>
              <p class="text-xs text-emerald-400">Available Now</p>
            </div>
          </div>

          <!-- Server Info -->
          <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-6 space-y-4">
            <h2 class="text-lg font-semibold text-white">Server Information</h2>
            <div class="grid gap-4 sm:grid-cols-2">
              <div v-for="info in serverDetail?.info" :key="info.label" class="space-y-1">
                <p class="text-xs text-slate-500 uppercase tracking-wider">{{ info.label }}</p>
                <p class="text-sm text-slate-200">{{ info.value }}</p>
              </div>
            </div>
          </div>

          <!-- Rules -->
          <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-6 space-y-3">
            <h2 class="text-lg font-semibold text-white">Server Rules</h2>
            <ul class="space-y-2">
              <li
                v-for="(rule, i) in serverDetail?.rules"
                :key="i"
                class="flex items-start gap-2 text-sm text-slate-300"
              >
                <span class="text-indigo-400 shrink-0 mt-0.5">{{ i + 1 }}.</span>
                {{ rule }}
              </li>
            </ul>
          </div>

          <!-- Events -->
          <div v-if="serverDetail?.events?.length" class="rounded-2xl border border-white/10 bg-slate-900/70 p-6 space-y-4">
            <h2 class="text-lg font-semibold text-white">Upcoming Events</h2>
            <div class="space-y-3">
              <div
                v-for="event in serverDetail.events"
                :key="event.name"
                class="flex items-center gap-4 rounded-xl bg-white/5 p-4"
              >
                <div class="text-2xl">{{ event.icon }}</div>
                <div>
                  <p class="font-medium text-white text-sm">{{ event.name }}</p>
                  <p class="text-xs text-slate-400">{{ event.time }}</p>
                </div>
                <span class="ml-auto rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] text-indigo-400 ring-1 ring-indigo-500/30">{{ event.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import AppShell from '@/layouts/AppShell.vue'
import { homePosts, lobbyRooms, gameServers, type CommunityPost, type LobbyRoom, type GameServer } from '@/data/community'

const route = useRoute()
const type = computed(() => route.params.type as string)
const id = computed(() => route.params.id as string)

const content = computed(() => {
  if (type.value === 'home') return homePosts.find(p => p.id === `post-${id.value}`) ?? null
  if (type.value === 'lobby') return lobbyRooms.find(r => r.id === `lobby-${id.value}`) ?? null
  if (type.value === 'server') return gameServers.find(s => s.id === `server-${id.value}`) ?? null
  return null
})

// ── Post Detail Content ──────────────────────────────────────────────────────
interface PostSection {
  icon: string
  heading: string
  body: string
  tips?: string[]
}
interface PostDetail {
  sections: PostSection[]
  tags: string[]
}

const postDetailMap: Record<string, PostDetail> = {
  '1': {
    sections: [
      {
        icon: '🏕️',
        heading: 'Why Rushing a Big Base Backfires',
        body: 'Many new players spend their first hours gathering wood and stone to build an impressive-looking base. While satisfying visually, a sprawling structure with no workflow logic leads to Pal pathfinding chaos, wasted work cycles, and resource bottlenecks.',
        tips: [
          'Keep your base footprint under 30 tiles until you have at least 6 assigned Pals.',
          'Build structures in workflow order: gather → craft → store → rest.',
          'Always place your bed near the chest for quick respawn-to-loot cycles.',
        ],
      },
      {
        icon: '🔁',
        heading: 'The Minimum Viable Loop',
        body: 'The four-item survival loop — fire starter, sleeping bag, small chest, and stone workbench — covers 80% of your early game needs. Each item feeds into the next, creating a tight dependency chain that minimizes idle time.',
        tips: [
          'Fire Starter: Handles food and warmth. Upgrades to campfire when possible.',
          'Sleeping Bag: Set your spawn point immediately. Never lose 20 minutes of progress.',
          'Chest: Even a 10-slot chest prevents inventory overflow and keeps materials organized.',
          'Workbench: Unlocks crafting tier 2 tools within the first 15 minutes.',
        ],
      },
      {
        icon: '⚡',
        heading: 'Efficiency Over Aesthetics',
        body: 'The game rewards functional design. A well-placed 3x3 production block outperforms a beautiful but poorly routed 10x10 fortress. Once you internalize the loop, expansion becomes natural rather than forced.',
      },
    ],
    tags: ['Early Game', 'Base Building', 'Efficiency', 'Beginner'],
  },
  '2': {
    sections: [
      {
        icon: '⛰️',
        heading: 'Mountain Outposts: High Risk, High Reward',
        body: 'Mountain terrain offers denser ore nodes and less competition from other players on multiplayer servers. However, elevation increases patrol frequency of aggressive Pals and limits fast travel access.',
        tips: [
          'Mountain nodes yield 40% more ore per cluster than valley equivalents.',
          'Recommended for solo players with Lv.20+ combat Pals to handle patrols.',
          'Build a dedicated transport Pal chain from mountain to main base.',
        ],
      },
      {
        icon: '🌄',
        heading: 'Valley Outposts: Stable and Accessible',
        body: 'Valley mining spots offer consistent ore rates with lower enemy density. The terrain is flat, making base construction faster and Pal pathfinding more reliable. Ideal for automated mining setups.',
        tips: [
          'Valley ore respawns 15% faster than mountain nodes.',
          'Flat terrain means fewer Pal stuck events — a major QoL advantage.',
          'Easier to connect to main base via road Pals or conveyor lines.',
        ],
      },
      {
        icon: '📊',
        heading: 'The Verdict',
        body: 'For pure efficiency, a level 3 mountain outpost with two dedicated mining Pals beats a valley setup by about 60% in hourly ore yield. But for consistent automation without micromanagement, valley wins.',
      },
    ],
    tags: ['Mining', 'Outpost', 'Strategy', 'Automation'],
  },
  '3': {
    sections: [
      {
        icon: '🧬',
        heading: 'The Triple-Skill Problem',
        body: 'Random breeding produces unpredictable passive skill combinations. Most players waste 20+ eggs before accidentally getting what they want. A fixed combination strategy eliminates variance by targeting specific genetic paths.',
        tips: [
          'Identify a "carrier pair" that together holds all three desired passives.',
          'The carrier pair should each hold at least 1-2 of the target skills.',
          'Run 3 breeding iterations maximum before resetting if results miss all targets.',
        ],
      },
      {
        icon: '📋',
        heading: 'Recommended Early Combinations',
        body: 'For a work-focused early game Pal, the combination of Work Slave + Artisan + Serious yields the highest production multiplier available before Lv.30. Use Flopie + Lamball as your base carrier pair for these three skills.',
        tips: [
          'Flopie: Carries Work Slave and Artisan naturally.',
          'Lamball: Best early-game carrier for Serious passive.',
          'Third generation egg from this pair has 78% chance of triple-skill.',
        ],
      },
      {
        icon: '🎯',
        heading: 'Locking in Your Result',
        body: 'Once you obtain a triple-skill offspring, immediately use it as a breeder for your entire base worker lineup. Propagate the skillset across 4-6 Pals per work type within 2-3 generations.',
      },
    ],
    tags: ['Breeding', 'Passive Skills', 'Early Game', 'Strategy'],
  },
  '4': {
    sections: [
      {
        icon: '🌋',
        heading: 'New Volcanic Island — Ignis Shelf',
        body: 'The new Ignis Shelf biome introduces a 120-tile volcanic island southeast of the main continent. It features unique lava terrain that damages unprotected players, forcing heat resistance gear or fire-affinity Pals as mounts.',
        tips: [
          'Minimum heat resistance tier 3 armor required to safely explore.',
          'Salamander and Blazehog are the recommended mount Pals for this zone.',
          'Three new Alpha Pal spawn points, including MagmaDrake (Lv.45 recommended).',
        ],
      },
      {
        icon: '🐾',
        heading: '8 New Pals Overview',
        body: 'The update introduces 8 new Pals ranging from Level 12 field creatures to a Level 50 raid boss. Notable additions include CrystalFox (Ice/Neutral hybrid with mining L4), and AshWyvern (combat mount with fire breath AoE).',
        tips: [
          'CrystalFox: Best early mining Pal with highest ore yield multiplier in game.',
          'AshWyvern: Fastest flying mount added so far, 2.4x base movement speed.',
          'GlowSlime: New healing support Pal, essential for long dungeon runs.',
        ],
      },
      {
        icon: '🛡️',
        heading: 'Reworked Base Defense System',
        body: 'The tower defense overhaul adds automated turret placement, Pal patrol AI improvements, and a new raid difficulty scaling system based on your base technology level. Raids now scale from 3-15 enemies depending on your research progress.',
      },
    ],
    tags: ['Patch Notes', 'New Content', 'Official', 'Update 1.4'],
  },
  '5': {
    sections: [
      {
        icon: '📐',
        heading: 'The 64-Grid Constraint',
        body: 'Working within a 64-tile footprint forces brutal prioritization. Every structure must earn its place. This guide uses an 8x8 tile grid as the design canvas, organizing zones by production dependency rather than visual symmetry.',
        tips: [
          'Zone 1 (top-left 4x4): Resource processing — furnace, workbench, assembly table.',
          'Zone 2 (top-right 4x4): Storage — 4-8 chests organized by material type.',
          'Zone 3 (bottom-left 4x4): Agriculture — 2 berry farms + 1 wheat for food automation.',
          'Zone 4 (bottom-right 4x4): Living quarters — beds, feed station, Pal box.',
        ],
      },
      {
        icon: '🔀',
        heading: 'Pal Path Optimization',
        body: 'In a compact base, Pal pathing is the #1 performance bottleneck. Placing incompatible work stations more than 3 tiles apart causes Pals to constantly switch jobs instead of specializing.',
        tips: [
          'Assign each Pal to a single work zone using the Pal assignment override.',
          'Keep furnace and stone pit within 2 tiles of each other for ore Pals.',
          'Feed stations should be central — no Pal should walk more than 4 tiles to eat.',
        ],
      },
      {
        icon: '🏭',
        heading: 'Production Chain Efficiency',
        body: 'The compact layout achieves 92% production uptime in testing — compared to 67% for a sprawling base of the same Pal count. The secret is minimal travel distance between dependent structures.',
      },
    ],
    tags: ['Building', 'Base Layout', 'Optimization', 'Compact'],
  },
  '6': {
    sections: [
      {
        icon: '🌾',
        heading: 'Top Farming Pals Ranked',
        body: 'Automated farming requires Pals with high Planting and Watering work suitability, combined with strong stamina recovery to minimize downtime. The top candidates are Bristla (Planting L3), Petallia (Watering L3), and Mossanda (Planting L4).',
        tips: [
          'Bristla: Best all-round early farming Pal with Planting L3 and decent stamina.',
          'Petallia: Watering specialist, reduces crop growth time by 25% for water-type crops.',
          'Mossanda: Late-game farming powerhouse with Planting L4, but needs Lv.30+ to catch.',
        ],
      },
      {
        icon: '⚗️',
        heading: 'Passive Skills for Farmers',
        body: 'Beyond work suitability, farming efficiency is heavily influenced by passive skills. The optimal farming build prioritizes: Serious, Artisan, and either Positive Thinker or Work Slave depending on the crop type.',
        tips: [
          'Serious: +20% work speed across all tasks.',
          'Artisan: Additional +50% work speed for manual crafting stations (stacks with Serious).',
          'Positive Thinker: Reduces stamina depletion — lets your Pal work longer stretches.',
        ],
      },
      {
        icon: '🔄',
        heading: 'Full Automation Setup',
        body: 'A truly automated farm requires at minimum 2 planters, 1 waterer, and 1 harvester. Pair with a transport Pal to auto-move crops to the feed box and you can go 30+ real-time minutes without touching your base.',
      },
    ],
    tags: ['Farming', 'Automation', 'Work Tips', 'Pals'],
  },
  '7': {
    sections: [
      {
        icon: '🗺️',
        heading: 'Why Hidden Dungeons Matter',
        body: 'Standard dungeons appear on the mini-map and get farmed heavily on public servers. The six hidden dungeons discovered by the community have no map markers, dramatically lower competition, and contain rare drop tables unavailable in standard dungeons.',
        tips: [
          'Dungeon Alpha drops include exclusive passive skill capsules and ancient tech parts.',
          'Hidden dungeons reset every 4 in-game days (approximately 20 real minutes).',
          'No fast travel nearby — build a temporary outpost before attempting.',
        ],
      },
      {
        icon: '📍',
        heading: 'Location Guide: Top 3',
        body: 'The three most rewarding hidden dungeons are: (1) Frostpeak Cavern — northwest snowfield, behind the ice waterfall. (2) Sunken Ruins — southeast coast, access via swimming 80 tiles offshore. (3) Ashfall Chamber — new volcanic biome, inside the central crater.',
        tips: [
          'Frostpeak: Best rare Pal sphere drops. Bring cold resistance gear.',
          'Sunken Ruins: Exclusive ancient weapon blueprints. Aqua mount required.',
          'Ashfall Chamber: Highest XP per minute of any dungeon. Fire resistance essential.',
        ],
      },
      {
        icon: '⚔️',
        heading: 'Preparation Checklist',
        body: 'Each hidden dungeon has unique hazards. Cold resistance, aqua mount access, and fire resistance respectively are non-negotiable. A 3-Pal combat team with at least one healer (GlowSlime recommended post-patch) minimizes run failure rate.',
      },
    ],
    tags: ['Exploration', 'Dungeons', 'Hidden Locations', 'Secrets'],
  },
  '8': {
    sections: [
      {
        icon: '🏆',
        heading: 'S-Tier Work Pals',
        body: 'The absolute best Pals for each work category, factoring in work suitability level, passive skill compatibility, and availability: Mining — Digtoise (Mining L4), Farming — Mossanda (Planting L4), Combat — Jetragon (Combat exclusive), Medicine — Elizabee (Medicine Production L4).',
        tips: [
          'Digtoise: Unmatched mining output. Two Digtoise > four generic mining Pals.',
          'Mossanda: Late unlock but transforms farm automation permanently.',
          'Elizabee: Heals both Pals and bases passively — worth the catching effort.',
        ],
      },
      {
        icon: '📊',
        heading: 'A-Tier Alternatives',
        body: 'A-tier Pals offer 80% of S-tier performance at much earlier game stages: Fuddler (Mining L2, early standout), Bristla (Planting L3), Beakon (Transport+Electric L3 combo), Frostallion Noct (dark-type combat elite).',
        tips: [
          'Always prioritize work suitability level over base stats for production Pals.',
          'Combo Pals (multiple work types) are underrated — one Beakon can replace two specialists.',
          'For base defense, a single S-tier combat Pal outperforms four A-tier defenders.',
        ],
      },
      {
        icon: '🔥',
        heading: 'B-Tier and Below',
        body: 'B-tier Pals are suitable for early game or niche situations. C-tier and below should be released for condensed upgrades rather than base assignment. The full 84-Pal ranking with detailed notes is available in our community wiki.',
      },
    ],
    tags: ['Tier List', 'Breeding', 'Rankings', 'Work Types'],
  },
  '9': {
    sections: [
      {
        icon: '🕳️',
        heading: 'Why Build Underground?',
        body: 'Underground tunnel systems solve the #1 multi-base problem: Pal transport time between floors. A well-designed tunnel can reduce cross-floor travel from 45 seconds to under 10, dramatically improving base throughput for production chains that span multiple levels.',
        tips: [
          'Dig entrance tunnels at least 3 tiles wide to prevent Pal congestion.',
          'Use smooth stone flooring — reduces Pal movement penalty by 15% vs. dirt.',
          'Mark tunnel intersections with colored lights to help Pals navigate predictably.',
        ],
      },
      {
        icon: '🏗️',
        heading: 'Tunnel Architecture Basics',
        body: 'The standard tunnel template is an L-shaped connector between base levels: 6-tile horizontal run, 4-tile vertical drop, 6-tile horizontal run to destination. This minimizes construction materials while maximizing clearance height for flying Pals.',
        tips: [
          'Minimum 2-tile height clearance for standard Pals, 3-tile for large body types.',
          'Place a single torch at every corner — prevents Pal confusion at direction changes.',
          'Build a temporary ladder shaft first, test Pal pathfinding, then build the tunnel.',
        ],
      },
      {
        icon: '🔗',
        heading: 'Multi-Base Connection Network',
        body: 'For players managing 3+ bases, a central hub tunnel system with radial branches dramatically cuts administrative overhead. The hub-and-spoke design keeps maximum tunnel length under 20 tiles, the sweet spot for Pal pathfinding reliability.',
      },
    ],
    tags: ['Building', 'Tunnels', 'Multi-Base', 'Logistics'],
  },
  '10': {
    sections: [
      {
        icon: '🧭',
        heading: 'North Route Analysis',
        body: 'The northern coal circuit covers 4 major nodes in a 180-tile loop from the starting zone. High ore density (avg. 8 coal per node) but heavy enemy presence including two Lv.25+ patrol groups that respawn every 15 minutes.',
        tips: [
          'Best completed with a mounted Pal for fast traversal between nodes.',
          'Avoid the northern patrol path between nodes 2 and 3 — detour adds 30 tiles but saves 5 minutes of combat.',
          'Node 4 (far north) is guarded by an Alpha Pal — worth fighting for the drop bonus.',
        ],
      },
      {
        icon: '🌅',
        heading: 'East Route Analysis',
        body: 'The eastern coal circuit covers 6 smaller nodes in a 240-tile arc. Lower per-node density (avg. 5 coal) but near-zero enemy presence and direct fast travel access makes it ideal for automated transport setups.',
        tips: [
          'All 6 nodes are within range of a single outpost fast travel point.',
          'Enemy density: 1/10 compared to north route — perfect for new characters.',
          'Node respawn time is 10% faster on east route due to lower player traffic.',
        ],
      },
      {
        icon: '🏆',
        heading: 'Recommendation',
        body: 'For solo players or early-game characters: East Route wins by a large margin. For end-game efficiency with strong combat Pals: North Route yields 35% more coal per hour due to larger node sizes. Set up an outpost on both and alternate.',
      },
    ],
    tags: ['Mining', 'Coal', 'Routes', 'Comparison'],
  },
}

const postDetail = computed(() => {
  if (type.value !== 'home') return null
  return postDetailMap[id.value] ?? null
})

// ── Lobby Detail Content ─────────────────────────────────────────────────────
interface LobbyDetail {
  info: Array<{ label: string; value: string }>
  requirements: string[]
}

const lobbyDetailMap: Record<string, LobbyDetail> = {
  '1': {
    info: [
      { label: 'Game Mode', value: 'PVE — Tower Boss Rush' },
      { label: 'Difficulty', value: 'Hard (Recommended Lv.40+)' },
      { label: 'Voice Chat', value: 'Required' },
      { label: 'Session Length', value: '2-3 hours estimated' },
      { label: 'Loot Sharing', value: 'Fair split by contribution' },
      { label: 'Server Region', value: 'Asia-East' },
    ],
    requirements: [
      'Minimum player level 40 to keep up with boss mechanics.',
      'At least one combat-spec Pal with Lv.3+ attack type matching boss weakness.',
      'Voice chat is not optional — coordination is critical for tower boss phases.',
      'Bring your own food supply for at least 3 dungeon runs.',
      'No griefing or stealing loot. Instant removal with one strike.',
    ],
  },
  '2': {
    info: [
      { label: 'Game Mode', value: 'PVE — Base Building' },
      { label: 'Focus', value: 'Mining & Automation Lines' },
      { label: 'Voice Chat', value: 'Optional (text is fine)' },
      { label: 'Session Length', value: 'Open-ended, drop in/out' },
      { label: 'Loot Sharing', value: 'Individual keep what you gather' },
      { label: 'Server Region', value: 'Asia-East' },
    ],
    requirements: [
      'No level requirement — bring whatever you have.',
      'Familiarity with production pipelines or willingness to learn.',
      'At least one mining Pal (any level) in your party.',
      'Read the base layout diagram shared in the room chat before joining.',
    ],
  },
  '3': {
    info: [
      { label: 'Game Mode', value: 'PVE — Casual Farming' },
      { label: 'Target', value: 'Transport & Ore Gathering' },
      { label: 'Voice Chat', value: 'Not required' },
      { label: 'Session Length', value: '1 hour per run' },
      { label: 'Loot Sharing', value: 'All shared equally' },
      { label: 'Server Region', value: 'Asia-East' },
    ],
    requirements: [
      'All levels welcome — this is a newbie-friendly session.',
      'Bring at least one transport Pal for ore relay.',
      'Relaxed pace — no pressure to perform, just have fun.',
    ],
  },
}

const lobbyDetail = computed(() => {
  if (type.value !== 'lobby') return null
  return lobbyDetailMap[id.value] ?? {
    info: [
      { label: 'Game Mode', value: 'Multiplayer' },
      { label: 'Region', value: 'Asia-East' },
      { label: 'Session Length', value: 'TBD' },
      { label: 'Voice Chat', value: 'Optional' },
    ],
    requirements: ['Check with host for specific requirements.'],
  }
})

// ── Server Detail Content ────────────────────────────────────────────────────
interface ServerDetail {
  info: Array<{ label: string; value: string }>
  rules: string[]
  events?: Array<{ icon: string; name: string; time: string; status: string }>
}

const serverDetailMap: Record<string, ServerDetail> = {
  '1': {
    info: [
      { label: 'Server Type', value: 'Official PVE' },
      { label: 'Region', value: 'Asia-East (Tokyo)' },
      { label: 'Version', value: 'v1.4.1 (Latest)' },
      { label: 'Uptime', value: '99.7% last 30 days' },
      { label: 'Wipe Schedule', value: 'Never — persistent world' },
      { label: 'Mods', value: 'None — vanilla only' },
    ],
    rules: [
      'No harassment of any kind toward other players.',
      'Base blocking of resource nodes is prohibited.',
      'Trading is encouraged — set fair prices in the community market.',
      'Report bugs through the official Discord, not in-game chat.',
      'Max 2 bases per player to ensure fair server resource distribution.',
    ],
    events: [
      { icon: '🏆', name: 'Weekly Boss Challenge', time: 'Every Saturday 20:00 JST', status: 'Upcoming' },
      { icon: '🎁', name: 'Login Reward Week', time: 'July 10-17', status: 'Active' },
      { icon: '🌋', name: 'Volcanic Biome Launch', time: 'July 15 18:00 JST', status: 'Scheduled' },
    ],
  },
  '2': {
    info: [
      { label: 'Server Type', value: 'Community PVP' },
      { label: 'Region', value: 'Asia-East (Seoul)' },
      { label: 'Version', value: 'v1.4.1 (Latest)' },
      { label: 'Uptime', value: '98.2% last 30 days' },
      { label: 'Ranked Season', value: 'Season 3 — ends August 1' },
      { label: 'Mods', value: 'Balance patch mod v2.1' },
    ],
    rules: [
      'PVP is opt-in only in starter zones. All other zones are open PVP.',
      'Spawn killing is prohibited — 5 minute grace period after respawn.',
      'Cheating, exploiting, or bug abuse results in permanent ban.',
      'Tournament brackets posted every Wednesday on the Discord.',
      'Respectful trash talk only — hate speech results in immediate removal.',
    ],
    events: [
      { icon: '⚔️', name: 'Ranked Season End Tournament', time: 'August 1 19:00 KST', status: 'Scheduled' },
      { icon: '🎯', name: 'Daily Duel Ladder Reset', time: 'Every day 00:00 KST', status: 'Active' },
    ],
  },
}

const serverDetail = computed(() => {
  if (type.value !== 'server') return null
  return serverDetailMap[id.value] ?? {
    info: [
      { label: 'Server Type', value: 'Community Server' },
      { label: 'Version', value: 'v1.4.1' },
      { label: 'Region', value: (content.value as GameServer)?.region ?? 'Unknown' },
      { label: 'Wipe Schedule', value: 'Check with admin' },
    ],
    rules: [
      'Respect all players and follow standard community guidelines.',
      'No exploiting or cheating of any kind.',
      'Contact server admins via Discord for support.',
    ],
  }
})
</script>
