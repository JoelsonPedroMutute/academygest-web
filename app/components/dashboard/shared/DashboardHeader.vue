<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
  >
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        {{ title }}
      </h1>

      <p
        v-if="subtitle"
        class="text-gray-500 dark:text-gray-400 mt-1"
      >
        {{ subtitle }}
      </p>
    </div>

    <slot />
  </div>
</template>