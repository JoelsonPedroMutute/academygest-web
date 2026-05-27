<script setup lang="ts">
defineProps<{
  percentage: number
}>()
</script>

<template>
  <DashboardSharedDashboardCard>
    <p class="text-sm text-gray-500">
      Frequência
    </p>

    <h2 class="text-3xl font-bold mt-3 text-indigo-600">
      {{ percentage }}%
    </h2>
  </DashboardSharedDashboardCard>
</template>