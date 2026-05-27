<script setup lang="ts">
interface Props {
  title: string
  value: string | number
  icon?: string
  color?: string
  growth?: string
}

withDefaults(defineProps<Props>(), {
  color: 'blue'
})
</script>

<template>
  <div
    class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm"
  >
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ title }}
        </p>

        <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-2">
          {{ value }}
        </h3>

        <p
          v-if="growth"
          class="text-xs text-green-500 mt-2"
        >
          {{ growth }}
        </p>
      </div>

      <div
        class="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl"
        :class="`bg-${color}-500`"
      >
        <i :class="icon"></i>
      </div>
    </div>
  </div>
</template>