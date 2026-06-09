<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div
    class="bg-blue-50 border border-blue-200 rounded-xl p-4"
  >
    <h4 class="font-semibold text-blue-700">
      {{ title }}
    </h4>

    <p class="text-sm text-blue-600 mt-1">
      {{ description }}
    </p>
  </div>
</template>