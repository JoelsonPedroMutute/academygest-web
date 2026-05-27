<script setup lang="ts">
defineProps<{
  total: number
}>()
</script>

<template>
  <DashboardSharedDashboardCard>
    <p class="text-sm text-gray-500">
      Utilizadores Ativos
    </p>

    <h2 class="text-4xl font-bold text-emerald-500 mt-3">
      {{ total }}
    </h2>
  </DashboardSharedDashboardCard>
</template>