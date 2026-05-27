<script setup lang="ts">
defineProps<{
  total: number
}>()
</script>

<template>
  <DashboardSharedStatCard
    title="Avaliações"
    :value="total"
    icon="pi pi-file"
    color="orange"
  />
</template>