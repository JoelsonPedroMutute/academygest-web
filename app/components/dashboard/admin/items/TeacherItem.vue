<script setup lang="ts">
defineProps<{
  nome: string
  especialidade?: string
}>()
</script>

<template>
  <div class="border rounded-xl p-4">
    <h4 class="font-semibold">
      {{ nome }}
    </h4>

    <p class="text-sm text-gray-500">
      {{ especialidade }}
    </p>
  </div>
</template>