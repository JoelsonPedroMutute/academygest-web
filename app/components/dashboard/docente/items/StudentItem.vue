<script setup lang="ts">
defineProps<{
  nome: string
  numero: string
}>()
</script>

<template>
  <div
    class="border border-gray-200 rounded-xl p-4 flex justify-between"
  >
    <div>
      <h4 class="font-semibold">
        {{ nome }}
      </h4>

      <p class="text-sm text-gray-500">
        Nº {{ numero }}
      </p>
    </div>

    <span class="text-2xl">
      👨‍🎓
    </span>
  </div>
</template>