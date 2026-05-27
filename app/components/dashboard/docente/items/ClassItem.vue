<script setup lang="ts">
defineProps<{
  turma: string
  curso: string
}>()
</script>

<template>
  <div
    class="border border-gray-200 rounded-xl p-4 flex items-center justify-between"
  >
    <div>
      <h4 class="font-semibold">
        {{ turma }}
      </h4>

      <p class="text-sm text-gray-500">
        {{ curso }}
      </p>
    </div>

    <span class="text-2xl">
      🎓
    </span>
  </div>
</template>