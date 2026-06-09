<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-lg font-bold text-gray-800 dark:text-white">
        {{ title }}
      </h2>

      <p
        v-if="subtitle"
        class="text-sm text-gray-500 dark:text-gray-400"
      >
        {{ subtitle }}
      </p>
    </div>

    <slot name="actions" />
  </div>
</template>