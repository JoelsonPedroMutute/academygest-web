<script setup lang="ts">
defineProps<{
  page: number
  total: number
}>()

defineEmits(["change"])
</script>

<template>
  <div class="flex gap-2 items-center">
    <button @click="$emit('change', page - 1)" :disabled="page <= 1">
      Prev
    </button>

    <span>Página {{ page }} / {{ total }}</span>

    <button @click="$emit('change', page + 1)" :disabled="page >= total">
      Next
    </button>
  </div>
</template>