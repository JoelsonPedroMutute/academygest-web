<script setup lang="ts">
defineProps<{ open: boolean }>()
defineEmits(["confirm", "cancel"])
</script>

<template>
  <div v-if="open" class="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div class="bg-white p-6 rounded">
      <p>Tem certeza?</p>

      <div class="flex gap-2 mt-4">
        <button @click="$emit('confirm')" class="bg-red-600 text-white px-3 py-1 rounded">
          Sim
        </button>

        <button @click="$emit('cancel')" class="px-3 py-1">
          Não
        </button>
      </div>
    </div>
  </div>
</template>