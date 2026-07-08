<template>
  <div class="relative min-h-screen text-white">
    <AppHeader />
    <main class="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <!-- 面包屑 -->
      <BreadcrumbBar :items="crumbs" />

      <!-- iframe 容器 -->
      <div class="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e1a] shadow-2xl">
        <iframe
          src="/pic/palworld_tier_list.html"
          class="w-full"
          style="min-height: calc(100vh - 180px); border: none;"
          title="Palworld Team Builds"
        ></iframe>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/common/AppHeader.vue'
import BreadcrumbBar from '@/components/common/BreadcrumbBar.vue'

const crumbs = [
  { label: 'Home', route: '/' },
  { label: 'Team Builds' },
]
</script>
