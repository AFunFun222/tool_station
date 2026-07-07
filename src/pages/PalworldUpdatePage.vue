<template>
  <div class="relative min-h-screen text-white">
    <AppHeader />
    <main class="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <!-- 面包屑 -->
      <BreadcrumbBar :crumbs="crumbs" />

      <!-- iframe 容器 -->
      <div class="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e1a] shadow-2xl">
        <iframe
          src="/pic/palworld_1.0_update.html"
          class="w-full"
          style="min-height: calc(100vh - 180px); border: none;"
          title="幻兽帕鲁 1.0 正式版更新内容"
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
  { label: '1.0 版本更新' },
]
</script>
