<template>
  <span
    class="cyber-badge inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest"
    :class="badgeClass"
  >
    <span class="badge-dot" :class="dotClass" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    tone?: 'teal' | 'orange' | 'blue' | 'purple' | 'red' | 'green' | 'slate'
  }>(),
  {
    tone: 'slate',
  },
)

const badgeClass = computed(() => {
  const map = {
    teal: 'border border-cyan-400/40 bg-cyan-400/8 text-cyan-300 shadow-[0_0_8px_rgba(0,229,255,0.15)]',
    orange: 'border border-orange-400/40 bg-orange-400/8 text-orange-300 shadow-[0_0_8px_rgba(251,146,60,0.15)]',
    blue: 'border border-sky-400/40 bg-sky-400/8 text-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.15)]',
    purple: 'border border-purple-400/40 bg-purple-400/8 text-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.15)]',
    red: 'border border-rose-400/40 bg-rose-400/8 text-rose-300 shadow-[0_0_8px_rgba(251,113,133,0.15)]',
    green: 'border border-emerald-400/40 bg-emerald-400/8 text-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.15)]',
    slate: 'border border-white/15 bg-white/5 text-slate-300',
  }
  return map[props.tone]
})

const dotClass = computed(() => {
  const map = {
    teal: 'dot-cyan',
    orange: 'dot-orange',
    blue: 'dot-sky',
    purple: 'dot-purple',
    red: 'dot-rose',
    green: 'dot-emerald',
    slate: 'dot-slate',
  }
  return map[props.tone]
})
</script>

<style scoped>
.cyber-badge {
  clip-path: polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px));
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
  flex-shrink: 0;
}

.dot-cyan { background: #00e5ff; box-shadow: 0 0 6px rgba(0,229,255,0.9); }
.dot-orange { background: #fb923c; box-shadow: 0 0 6px rgba(251,146,60,0.9); }
.dot-sky { background: #38bdf8; box-shadow: 0 0 6px rgba(56,189,248,0.9); }
.dot-purple { background: #a855f7; box-shadow: 0 0 6px rgba(168,85,247,0.9); }
.dot-rose { background: #fb7185; box-shadow: 0 0 6px rgba(251,113,133,0.9); }
.dot-emerald { background: #34d399; box-shadow: 0 0 6px rgba(52,211,153,0.9); }
.dot-slate { background: #94a3b8; }

@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.6; }
}
</style>
