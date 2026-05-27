<script setup lang="ts">
interface Props {
  title?: string
  message?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Nenhum dado encontrado',
  message: 'Ainda não existem informações disponíveis.'
})
</script>

<template>
  <div
    class="bg-white dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-10 text-center"
  >
    <div class="text-5xl mb-4">
      📭
    </div>

    <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
      {{ title }}
    </h3>

    <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
      {{ message }}
    </p>
  </div>
</template>