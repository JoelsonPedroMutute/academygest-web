<script setup lang="ts">
defineProps<{
  aluno: string
  turma: string
}>()
</script>

<template>
  <div class="border rounded-xl p-4">
    <h4 class="font-semibold">
      {{ aluno }}
    </h4>

    <p class="text-sm text-gray-500 mt-1">
      {{ turma }}
    </p>
  </div>
</template>