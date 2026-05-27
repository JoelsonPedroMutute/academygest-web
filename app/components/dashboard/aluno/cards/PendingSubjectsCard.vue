<script setup lang="ts">
defineProps<{
  total: number
}>()
</script>

<template>
  <DashboardSharedDashboardCard>
    <p class="text-sm text-gray-500">
      Disciplinas Pendentes
    </p>

    <h2 class="text-3xl font-bold text-red-500 mt-3">
      {{ total }}
    </h2>
  </DashboardSharedDashboardCard>
</template>