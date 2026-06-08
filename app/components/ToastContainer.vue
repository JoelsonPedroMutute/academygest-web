<script setup lang="ts">
const { toasts } = useToast();
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="[
        'p-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] animate-pulse',
        toast.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : '',
        toast.type === 'error' ? 'bg-red-100 text-red-800 border border-red-300' : '',
        toast.type === 'info' ? 'bg-blue-100 text-blue-800 border border-blue-300' : '',
        toast.type === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : ''
      ]"
    >
      <div v-if="toast.type === 'success'" class="w-5 h-5 flex-shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <div v-else-if="toast.type === 'error'" class="w-5 h-5 flex-shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </div>
      <div v-else-if="toast.type === 'info'" class="w-5 h-5 flex-shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </div>
      <div v-else class="w-5 h-5 flex-shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <span class="flex-1">{{ toast.message }}</span>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.9; }
}
.animate-pulse {
  animation: pulse 0.3s ease-in-out;
}
</style>
