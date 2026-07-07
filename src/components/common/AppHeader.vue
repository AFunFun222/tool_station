<template>
  <header class="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
    <div class="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <RouterLink to="/" class="flex items-center gap-3 text-lg font-semibold text-white">
        <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-400/15 text-teal-300">
          <Sparkles class="h-5 w-5" />
        </div>
        帕鲁智库
      </RouterLink>

      <nav class="hidden items-center gap-5 md:flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.route"
          :to="item.route"
          class="text-sm text-slate-300 transition hover:text-white"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="ml-auto hidden min-w-[220px] items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 md:flex">
        <Search class="h-4 w-4 text-slate-400" />
        <input
          class="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          placeholder="搜索帕鲁 / 攻略 / 配种"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Search, Sparkles } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { navItems } from '@/data/site'
</script>
