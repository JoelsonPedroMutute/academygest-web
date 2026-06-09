<script setup lang="ts">
interface Props {
  title?: string
  description?: string
}

defineProps<Props>()
</script>

<template>
  <section class="space-y-4">
    <div v-if="title || description">
      <h2 class="text-xl font-bold text-gray-800 dark:text-white">
        {{ title }}
      </h2>

      <p
        v-if="description"
        class="text-sm text-gray-500 dark:text-gray-400"
      >
        {{ description }}
      </p>
    </div>

    <slot />
  </section>
</template>