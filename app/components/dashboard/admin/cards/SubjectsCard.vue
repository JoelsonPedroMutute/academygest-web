<script setup lang="ts">
defineProps<{
  total: number
}>()
</script>

<template>
  <DashboardSharedStatCard
    title="Disciplinas"
    :value="total"
    icon="pi pi-bookmark"
    color="pink"
  />
</template>