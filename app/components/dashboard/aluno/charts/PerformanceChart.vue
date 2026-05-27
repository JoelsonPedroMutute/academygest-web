<script setup lang="ts">
interface PerformanceData {
  label: string
  value: number
}

defineProps<{
  data: PerformanceData[]
}>()
</script>

<template>
  <DashboardSharedDashboardCard
    title="Performance Académica"
    subtitle="Desempenho geral do aluno"
  >
    <div class="space-y-4">
      <div
        v-for="item in data"
        :key="item.label"
      >
        <div class="flex items-center justify-between mb-1">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ item.label }}
          </span>

          <span class="text-sm font-semibold text-blue-600">
            {{ item.value }}%
          </span>
        </div>

        <div
          class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        >
          <div
            class="h-full bg-blue-500 rounded-full transition-all duration-500"
            :style="{ width: `${item.value}%` }"
          />
        </div>
      </div>
    </div>
  </DashboardSharedDashboardCard>
</template>