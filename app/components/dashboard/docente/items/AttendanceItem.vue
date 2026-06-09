<script setup lang="ts">
defineProps<{
  turma: string
  faltas: number
}>()
</script>

<template>
  <div
    class="border border-gray-200 rounded-xl p-4 flex justify-between"
  >
    <div>
      <h4 class="font-semibold">
        {{ turma }}
      </h4>

      <p class="text-sm text-gray-500">
        Faltas registadas
      </p>
    </div>

    <div class="font-bold text-red-500">
      {{ faltas }}
    </div>
  </div>
</template>