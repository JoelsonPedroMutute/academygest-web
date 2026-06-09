<script setup lang="ts">
const toast = useToast()
</script>

<template>
  <div class="fixed top-4 right-4 z-50 space-y-3">
    <div
      v-for="t in toast.toasts"
      :key="t.id"
      class="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border animate-slide-in"
      :class="{
        'bg-green-50 border-green-200 text-green-800': t.type === 'success',
        'bg-red-50 border-red-200 text-red-800': t.type === 'error',
        'bg-blue-50 border-blue-200 text-blue-800': t.type === 'info',
        'bg-yellow-50 border-yellow-200 text-yellow-800': t.type === 'warning'
      }"
    >
      <!-- Icon -->
      <svg v-if="t.type === 'success'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <svg v-else-if="t.type === 'error'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
      <svg v-else-if="t.type === 'info'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <svg v-else-if="t.type === 'warning'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>

      <!-- Message -->
      <p class="text-sm font-medium">{{ t.message }}</p>

      <!-- Close button -->
      <button
        @click="toast.remove(t.id)"
        class="ml-auto hover:opacity-70"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<style>
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>
