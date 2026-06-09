<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  padding?: boolean
  hover?: boolean
}

withDefaults(defineProps<Props>(), {
  padding: true,
  hover: true
})
</script>

<template>
  <div
    class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm transition-all duration-300"
    :class="[
      hover ? 'hover:shadow-lg hover:-translate-y-1' : '',
      padding ? 'p-5' : ''
    ]"
  >
    <div v-if="title || subtitle" class="mb-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
        {{ title }}
      </h3>

      <p
        v-if="subtitle"
        class="text-sm text-gray-500 dark:text-gray-400 mt-1"
      >
        {{ subtitle }}
      </p>
    </div>

    <slot />
  </div>
</template>