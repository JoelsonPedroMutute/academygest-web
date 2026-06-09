<script setup lang="ts">
defineProps<{ type?: "success" | "error" | "info" }>()
</script>

<template>
  <div
    class="p-3 rounded"
    :class="{
      'bg-green-100': type === 'success',
      'bg-red-100': type === 'error',
      'bg-blue-100': type === 'info',
    }"
  >
    <slot />
  </div>
</template>