<script setup lang="ts">
defineProps<{
  total: number
}>()
</script>

<template>
  <DashboardSharedStatCard
    title="Alunos"
    :value="total"
    icon="pi pi-users"
    color="blue"
  />
</template>