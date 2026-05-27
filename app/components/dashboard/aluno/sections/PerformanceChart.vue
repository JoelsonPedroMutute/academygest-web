<script setup lang="ts">
defineProps<{
  data: number[]
}>()
</script>

<template>
  <DashboardSharedDashboardCard title="Performance">
    <div
      class="h-80 flex items-center justify-center text-gray-400"
    >
      Gráfico de Performance
    </div>
  </DashboardSharedDashboardCard>
</template>