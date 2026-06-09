<script setup lang="ts">
defineProps<{
  nome: string
  docente?: string
}>()
</script>

<template>
  <div
    class="p-4 border border-gray-200 rounded-xl flex justify-between"
  >
    <div>
      <h4 class="font-semibold">
        {{ nome }}
      </h4>

      <p class="text-sm text-gray-500">
        {{ docente }}
      </p>
    </div>

    <span class="text-xl">
      📚
    </span>
  </div>
</template>