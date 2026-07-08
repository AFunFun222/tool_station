<template>
  <header class="sticky top-0 z-30 border-b border-cyan-400/15 bg-[rgba(5,13,26,0.90)] backdrop-blur-2xl">
    <!-- Top accent line -->
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
    <!-- Scan line effect -->
    <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

    <div class="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
      <!-- Logo / Brand -->
      <RouterLink to="/" class="group flex shrink-0 items-center gap-3 text-lg font-bold tracking-wide text-white">
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
      <nav class="hidden flex-1 items-center md:flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.route"
          :to="item.route"
          class="nav-link flex-1 py-1.5 text-center text-xs font-semibold uppercase tracking-widest text-slate-400 transition-all duration-200 hover:text-cyan-300"
          active-class="nav-link-active"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
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
