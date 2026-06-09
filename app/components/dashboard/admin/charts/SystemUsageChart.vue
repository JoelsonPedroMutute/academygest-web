<script setup lang="ts">
interface ChartData {
  label: string
  value: number
}

defineProps<{
  data: ChartData[]
}>()
</script>

<template>
  <DashboardSharedDashboardCard title="Uso do Sistema">
    <div class="space-y-4">
      <div
        v-for="item in data"
        :key="item.label"
      >
        <div class="flex justify-between mb-1">
          <span>{{ item.label }}</span>

          <span class="font-semibold">
            {{ item.value }}%
          </span>
        </div>

        <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-cyan-500 rounded-full"
            :style="{ width: `${item.value}%` }"
          />
        </div>
      </div>
    </div>
  </DashboardSharedDashboardCard>
</template>