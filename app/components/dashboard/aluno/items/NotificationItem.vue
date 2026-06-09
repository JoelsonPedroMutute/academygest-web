<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div
    class="p-4 rounded-xl bg-yellow-50 border border-yellow-200"
  >
    <h4 class="font-semibold text-yellow-700">
      {{ title }}
    </h4>

    <p class="text-sm text-yellow-600 mt-1">
      {{ description }}
    </p>
  </div>
</template>