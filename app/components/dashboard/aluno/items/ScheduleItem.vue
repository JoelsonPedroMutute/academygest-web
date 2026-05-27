<script setup lang="ts">
defineProps<{
  disciplina: string
  horario: string
  sala?: string
}>()
</script>

<template>
  <div
    class="border border-gray-200 rounded-xl p-4"
  >
    <h4 class="font-semibold">
      {{ disciplina }}
    </h4>

    <p class="text-sm text-gray-500 mt-1">
      {{ horario }}
    </p>

    <p class="text-xs text-gray-400 mt-1">
      {{ sala }}
    </p>
  </div>
</template>