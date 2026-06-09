<script setup lang="ts">
defineProps<{
  total: number
}>()
</script>

<template>
  <DashboardSharedStatCard
    title="Turmas"
    :value="total"
    icon="pi pi-users"
    color="blue"
  />
</template>