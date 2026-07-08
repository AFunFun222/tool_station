<template>
  <header class="sticky top-0 z-30 border-b border-cyan-400/15 bg-[rgba(5,13,26,0.90)] backdrop-blur-2xl">
    <!-- Top accent line -->
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
    <!-- Scan line effect -->
    <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

    <div class="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
      <!-- Logo / Brand -->
      <RouterLink to="/" class="group flex items-center gap-3 text-lg font-bold tracking-wide text-white">
        <div class="logo-box relative flex h-10 w-10 items-center justify-center overflow-hidden border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 transition-all duration-300 group-hover:border-cyan-400/80 group-hover:shadow-[0_0_16px_rgba(0,229,255,0.4)]"
          style="clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));">
          <Sparkles class="h-5 w-5" />
          <!-- sweep -->
          <span class="logo-sweep" />
        </div>
        <span class="hidden sm:block">
          <span class="text-gradient-header">PAL</span>
          <span class="text-slate-300 font-normal ml-1 tracking-widest text-sm">KNOWLEDGE HUB</span>
        </span>
      </RouterLink>

      <!-- Nav -->
      <nav class="hidden items-center gap-1 md:flex ml-2">
        <RouterLink
          v-for="item in navItems"
          :key="item.route"
          :to="item.route"
          class="nav-link px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400 transition-all duration-200 hover:text-cyan-300"
          active-class="nav-link-active"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- Search -->
      <div class="ml-auto hidden min-w-[220px] items-center gap-2 border border-cyan-400/15 bg-cyan-400/5 px-3 py-2 md:flex transition-all duration-200 hover:border-cyan-400/35 hover:bg-cyan-400/8 focus-within:border-cyan-400/50 focus-within:shadow-[0_0_12px_rgba(0,229,255,0.15)]"
        style="clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);">
        <Search class="h-4 w-4 text-cyan-400/60 shrink-0" />
        <input
          class="w-full bg-transparent text-sm text-cyan-100 outline-none placeholder:text-slate-500 font-mono"
          placeholder="Search Pals / Guides..."
        />
        <span class="text-[10px] font-mono text-slate-600 tracking-widest shrink-0">⌘K</span>
      </div>

      <!-- Status indicator -->
      <div class="hidden items-center gap-1.5 md:flex">
        <span class="h-2 w-2 rounded-full bg-cyan-400 animate-pulse-dot" style="box-shadow: 0 0 6px rgba(0,229,255,0.8);" />
        <span class="text-[10px] font-mono uppercase tracking-widest text-cyan-400/70">ONLINE</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Search, Sparkles } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { navItems } from '@/data/site'
</script>

<style scoped>
.text-gradient-header {
  background: linear-gradient(90deg, #00e5ff, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 900;
  font-size: 1.15rem;
  letter-spacing: 0.05em;
}

.logo-sweep {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.3), transparent);
  transform: skewX(-15deg);
  transition: left 0.5s ease;
}

.group:hover .logo-sweep {
  left: 150%;
}

.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00e5ff, transparent);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link-active::after {
  width: 80%;
}

.nav-link-active {
  color: #00e5ff !important;
  text-shadow: 0 0 8px rgba(0, 229, 255, 0.6);
}
</style>
