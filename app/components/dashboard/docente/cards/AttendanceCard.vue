<script setup lang="ts">
defineProps<{
  percentage: number
}>()
</script>

<template>
  <DashboardSharedDashboardCard>
    <p class="text-sm text-gray-500">
      Presença Média
    </p>

    <h2 class="text-4xl font-bold text-indigo-600 mt-3">
      {{ percentage }}%
    </h2>
  </DashboardSharedDashboardCard>
</template>