<script setup lang="ts">
interface GradeData {
  label: string
  value: number
}

defineProps<{
  data: GradeData[]
}>()
</script>

<template>
  <DashboardSharedDashboardCard
    title="Distribuição de Notas"
  >
    <div class="space-y-4">
      <div
        v-for="item in data"
        :key="item.label"
      >
        <div class="flex justify-between mb-1">
          <span class="text-sm">
            {{ item.label }}
          </span>

          <span class="font-semibold">
            {{ item.value }}
          </span>
        </div>

        <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-green-500 rounded-full"
            :style="{ width: `${item.value}%` }"
          />
        </div>
      </div>
    </div>
  </DashboardSharedDashboardCard>
</template>