<template>
  <div class="relative min-h-screen text-white">
    <!-- Ambient background particles / grid overlay -->
    <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <!-- Moving grid overlay -->
      <div class="grid-overlay" />
      <!-- Corner HUD markers -->
      <div class="absolute top-20 left-6 h-16 w-16 opacity-20">
        <div class="h-4 w-4 border-t border-l border-cyan-400" />
      </div>
      <div class="absolute top-20 right-6 h-16 w-16 opacity-20">
        <div class="ml-auto h-4 w-4 border-t border-r border-cyan-400" />
      </div>
      <div class="absolute bottom-8 left-6 opacity-20">
        <div class="h-4 w-4 border-b border-l border-cyan-400" />
      </div>
      <div class="absolute bottom-8 right-6 opacity-20">
        <div class="h-4 w-4 border-b border-r border-cyan-400" />
      </div>
    </div>

    <AppHeader />

    <main class="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <slot />
    </main>

    <!-- Bottom neon line -->
    <div class="pointer-events-none fixed inset-x-0 bottom-0 z-50 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/common/AppHeader.vue'
</script>

<style scoped>
.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 229, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 229, 255, 0.025) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: grid-scroll 20s linear infinite;
}

@keyframes grid-scroll {
  0% { background-position: 0 0; }
  100% { background-position: 60px 60px; }
}
</style>
