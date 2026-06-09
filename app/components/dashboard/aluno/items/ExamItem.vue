<script setup lang="ts">
defineProps<{
  disciplina: string
  data: string
}>()
</script>

<template>
  <div
    class="p-4 border border-gray-200 rounded-xl flex items-center justify-between"
  >
    <div>
      <h4 class="font-semibold">
        {{ disciplina }}
      </h4>

      <p class="text-sm text-gray-500">
        {{ data }}
      </p>
    </div>

    <span class="text-2xl">
      📝
    </span>
  </div>
</template>