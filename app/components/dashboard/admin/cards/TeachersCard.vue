<script setup lang="ts">
defineProps<{
  total: number
}>()
</script>

<template>
  <DashboardSharedStatCard
    title="Docentes"
    :value="total"
    icon="pi pi-user"
    color="green"
  />
</template>