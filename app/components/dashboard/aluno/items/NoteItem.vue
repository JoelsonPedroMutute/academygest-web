<script setup lang="ts">
defineProps<{
  disciplina: string
  nota: number
}>()
</script>

<template>
  <div
    class="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
  >
    <div>
      <h4 class="font-semibold">
        {{ disciplina }}
      </h4>
    </div>

    <div
      class="font-bold"
      :class="nota >= 10 ? 'text-green-500' : 'text-red-500'"
    >
      {{ nota }}
    </div>
  </div>
</template>