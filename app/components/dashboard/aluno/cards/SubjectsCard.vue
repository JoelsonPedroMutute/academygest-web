<script setup lang="ts">
defineProps<{
  total: number
}>()
</script>

<template>
  <DashboardSharedStatCard
    title="Disciplinas"
    :value="total"
    icon="pi pi-book"
    color="green"
  />
</template>