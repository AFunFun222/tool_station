import { ref } from 'vue'

export function useButtonFeedback() {
  const state = ref<'idle' | 'loading' | 'success'>('idle')

  const runWithFeedback = async (action: () => void | Promise<void>) => {
    state.value = 'loading'
    await action()
    state.value = 'success'
    window.setTimeout(() => {
      state.value = 'idle'
    }, 900)
  }

  return {
    state,
    runWithFeedback,
  }
}
