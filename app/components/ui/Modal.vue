<script setup lang="ts">
defineProps<{ open: boolean }>()
defineEmits(["close"])
</script>

<template>
  <div v-if="open" class="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div class="bg-white p-6 rounded w-[500px]">
      <slot />

      <div class="mt-4 text-right">
        <button @click="$emit('close')" class="text-red-600">
          Fechar
        </button>
      </div>
    </div>
  </div>
</template>