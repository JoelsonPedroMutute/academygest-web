<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <select
      v-model="model"
      class="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl px-4 py-2 text-sm"
    >
      <option value="">
        Todos
      </option>

      <option value="today">
        Hoje
      </option>

      <option value="week">
        Esta semana
      </option>

      <option value="month">
        Este mês
      </option>
    </select>

    <slot />
  </div>
</template>