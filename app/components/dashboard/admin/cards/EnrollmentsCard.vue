<script setup lang="ts">
defineProps<{
  total: number
}>()
</script>

<template>
  <DashboardSharedStatCard
    title="Matrículas"
    :value="total"
    icon="pi pi-id-card"
    color="cyan"
  />
</template>