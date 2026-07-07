<template>
  <AppShell>
    <!-- Page Header -->
    <section class="space-y-5">
      <div>
        <span class="inline-block rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-400 ring-1 ring-indigo-500/30 mb-3">
          Community Hub
        </span>
        <h1 class="text-4xl font-bold text-white sm:text-5xl leading-tight">
          News, Multiplayer &amp; Servers<br />
          <span class="text-indigo-400">— All in One Place</span>
        </h1>
      </div>
      <!-- Search -->
      <div class="relative max-w-xl">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search guides, rooms or server keywords..."
          class="w-full rounded-2xl border border-white/10 bg-slate-800/60 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-colors"
        />
      </div>
    </section>

    <!-- Tabs -->
    <section class="space-y-6">
      <div class="flex gap-2 rounded-2xl bg-white/5 p-1.5 w-fit">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          class="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200"
          :class="activeTab === tab.key
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
            : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'"
        >
          <component :is="tab.icon" class="h-4 w-4" />
          {{ tab.label }}
        </button>
      </div>

      <!-- Home Tab -->
      <div v-if="activeTab === 'home'" class="space-y-4">
        <div class="grid gap-4">
          <RouterLink
            v-for="post in visiblePosts"
            :key="post.id"
            :to="post.route"
            class="block group"
          >
            <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition-all duration-200 hover:border-indigo-500/30 hover:bg-slate-800/70 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]">
              <!-- Top row -->
              <div class="flex items-center justify-between gap-3 mb-3">
                <div class="flex items-center gap-2">
                  <span class="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[11px] font-medium text-indigo-400 ring-1 ring-indigo-500/30">
                    {{ post.category }}
                  </span>
                </div>
                <span class="text-xs text-slate-500">{{ post.readCount }} reads</span>
              </div>
              <!-- Title & Summary -->
              <h3 class="text-base font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors leading-snug">
                {{ post.title }}
              </h3>
              <p class="text-sm text-slate-400 leading-relaxed line-clamp-2">{{ post.summary }}</p>
              <!-- Footer -->
              <div class="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                <div class="h-6 w-6 rounded-full bg-indigo-500/30 flex items-center justify-center text-[10px] font-bold text-indigo-300">
                  {{ post.author.charAt(0) }}
                </div>
                <span class="text-xs font-medium text-slate-300">{{ post.author }}</span>
                <span class="text-xs text-slate-600">·</span>
                <span class="text-xs text-slate-500">{{ post.timeAgo }}</span>
                <ArrowRight class="h-3.5 w-3.5 text-indigo-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </RouterLink>
        </div>

        <!-- Show More / No More -->
        <div class="text-center pt-2">
          <button
            v-if="canShowMorePosts"
            @click="showMorePosts"
            class="rounded-2xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/10 transition-colors"
          >
            Show More
          </button>
          <p v-else-if="filteredPosts.length > 3" class="text-xs text-slate-600">No more content</p>
        </div>
      </div>

      <!-- Multiplayer Lobby Tab -->
      <div v-else-if="activeTab === 'lobby'" class="space-y-4">
        <div class="grid gap-4">
          <RouterLink
            v-for="room in visibleRooms"
            :key="room.id"
            :to="room.route"
            class="block group"
          >
            <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition-all duration-200 hover:border-indigo-500/30 hover:bg-slate-800/70 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]">
              <div class="flex items-start gap-4">
                <!-- Left: Info -->
                <div class="flex-1 min-w-0 space-y-2">
                  <p class="text-xs text-slate-500">Host: <span class="text-slate-300 font-medium">{{ room.hostName }}</span></p>
                  <h3 class="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {{ room.title }}
                  </h3>
                  <p class="text-sm text-slate-400 leading-relaxed line-clamp-2">{{ room.description }}</p>
                  <!-- Tags -->
                  <div class="flex flex-wrap gap-1.5 pt-1">
                    <span
                      v-for="tag in room.tags"
                      :key="tag"
                      class="rounded-lg bg-white/5 px-2 py-0.5 text-[11px] text-slate-400 ring-1 ring-white/10"
                    >{{ tag }}</span>
                  </div>
                </div>
                <!-- Right: Player Slots -->
                <div class="shrink-0 flex flex-col items-end gap-1.5">
                  <div class="flex gap-1">
                    <div
                      v-for="(slot, i) in room.slots"
                      :key="i"
                      class="relative group/slot"
                    >
                      <div
                        class="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white transition-transform group-hover/slot:scale-110 cursor-pointer ring-2"
                        :class="[slot.color, slot.status === 'open' ? 'opacity-40 ring-white/10' : 'ring-white/20']"
                      >
                        {{ slot.initial }}
                      </div>
                      <!-- Tooltip -->
                      <div class="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-800 px-2 py-1 text-[10px] text-slate-300 opacity-0 group-hover/slot:opacity-100 transition-opacity pointer-events-none z-10 border border-white/10">
                        {{ slot.label }}
                      </div>
                    </div>
                  </div>
                  <span class="text-[11px] text-slate-500">
                    {{ room.slots.filter(s => s.status !== 'open').length }}/{{ room.slots.length }} filled
                  </span>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
        <!-- Show More -->
        <div class="text-center pt-2">
          <button
            v-if="canShowMoreRooms"
            @click="showMoreRooms"
            class="rounded-2xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/10 transition-colors"
          >
            Show More
          </button>
          <p v-else-if="filteredRooms.length > 3" class="text-xs text-slate-600">No more content</p>
        </div>
      </div>

      <!-- Servers Tab -->
      <div v-else-if="activeTab === 'servers'" class="space-y-4">
        <div class="grid gap-4">
          <RouterLink
            v-for="server in visibleServers"
            :key="server.id"
            :to="server.route"
            class="block group"
          >
            <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition-all duration-200 hover:border-indigo-500/30 hover:bg-slate-800/70 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]">
              <div class="flex items-start gap-5">
                <!-- Left -->
                <div class="flex-1 min-w-0 space-y-2">
                  <div class="flex items-center gap-2">
                    <div class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <h3 class="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors truncate">
                      {{ server.name }}
                    </h3>
                  </div>
                  <p class="text-sm text-slate-400 leading-relaxed line-clamp-2">{{ server.description }}</p>
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="tag in server.tags"
                      :key="tag"
                      class="rounded-lg bg-white/5 px-2 py-0.5 text-[11px] text-slate-400 ring-1 ring-white/10"
                    >{{ tag }}</span>
                  </div>
                </div>
                <!-- Right: Stats -->
                <div class="shrink-0 flex flex-col items-end gap-3 text-right">
                  <!-- Players -->
                  <div>
                    <p class="text-base font-bold text-white">
                      {{ server.playerCount }}<span class="text-slate-500 text-sm font-normal">/{{ server.maxPlayers }}</span>
                    </p>
                    <p class="text-[11px] text-slate-500">Players</p>
                    <div class="mt-1 h-1 w-24 rounded-full bg-white/10 overflow-hidden">
                      <div
                        class="h-full rounded-full bg-indigo-500 transition-all"
                        :style="`width: ${Math.round(server.playerCount / server.maxPlayers * 100)}%`"
                      />
                    </div>
                  </div>
                  <!-- Ping & Region -->
                  <div class="flex items-center gap-3">
                    <div class="text-center">
                      <p class="text-sm font-semibold" :class="server.ping < 50 ? 'text-emerald-400' : server.ping < 100 ? 'text-yellow-400' : 'text-red-400'">
                        {{ server.ping }}ms
                      </p>
                      <p class="text-[11px] text-slate-500">Ping</p>
                    </div>
                    <div class="text-center">
                      <p class="text-xs font-medium text-slate-300">{{ server.region }}</p>
                      <p class="text-[11px] text-slate-500">Region</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
        <!-- Show More -->
        <div class="text-center pt-2">
          <button
            v-if="canShowMoreServers"
            @click="showMoreServers"
            class="rounded-2xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/10 transition-colors"
          >
            Show More
          </button>
          <p v-else-if="filteredServers.length > 3" class="text-xs text-slate-600">No more content</p>
        </div>
      </div>
    </section>
  </AppShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Search, Newspaper, Users, Server, ArrowRight } from 'lucide-vue-next'
import AppShell from '@/layouts/AppShell.vue'
import { homePosts, lobbyRooms, gameServers } from '@/data/community'

const activeTab = ref<'home' | 'lobby' | 'servers'>('home')
const searchQuery = ref('')

const tabs = [
  { key: 'home' as const, label: 'Home', icon: Newspaper },
  { key: 'lobby' as const, label: 'Multiplayer Lobby', icon: Users },
  { key: 'servers' as const, label: 'Servers', icon: Server },
]

// ── Filters ──────────────────────────────────────────────────────────────────
const filteredPosts = computed(() => {
  if (!searchQuery.value.trim()) return homePosts
  const q = searchQuery.value.toLowerCase()
  return homePosts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.summary.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.author.toLowerCase().includes(q)
  )
})

const filteredRooms = computed(() => {
  if (!searchQuery.value.trim()) return lobbyRooms
  const q = searchQuery.value.toLowerCase()
  return lobbyRooms.filter(r =>
    r.title.toLowerCase().includes(q) ||
    r.description.toLowerCase().includes(q) ||
    r.hostName.toLowerCase().includes(q) ||
    r.tags.some(t => t.toLowerCase().includes(q))
  )
})

const filteredServers = computed(() => {
  if (!searchQuery.value.trim()) return gameServers
  const q = searchQuery.value.toLowerCase()
  return gameServers.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.description.toLowerCase().includes(q) ||
    s.region.toLowerCase().includes(q) ||
    s.tags.some(t => t.toLowerCase().includes(q))
  )
})

// ── Pagination ────────────────────────────────────────────────────────────────
const STEP = 3
const postsVisible = ref(STEP)
const roomsVisible = ref(STEP)
const serversVisible = ref(STEP)

const visiblePosts = computed(() => filteredPosts.value.slice(0, postsVisible.value))
const visibleRooms = computed(() => filteredRooms.value.slice(0, roomsVisible.value))
const visibleServers = computed(() => filteredServers.value.slice(0, serversVisible.value))

const canShowMorePosts = computed(() => postsVisible.value < filteredPosts.value.length)
const canShowMoreRooms = computed(() => roomsVisible.value < filteredRooms.value.length)
const canShowMoreServers = computed(() => serversVisible.value < filteredServers.value.length)

function showMorePosts() {
  postsVisible.value = Math.min(postsVisible.value + STEP, filteredPosts.value.length)
}
function showMoreRooms() {
  roomsVisible.value = Math.min(roomsVisible.value + STEP, filteredRooms.value.length)
}
function showMoreServers() {
  serversVisible.value = Math.min(serversVisible.value + STEP, filteredServers.value.length)
}
</script>
