<script setup lang="ts">
defineProps<{
  disciplina: string
  tipo: string
  data: string
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
      {{ tipo }}
    </p>

    <p class="text-xs text-gray-400 mt-1">
      {{ data }}
    </p>
  </div>
</template>