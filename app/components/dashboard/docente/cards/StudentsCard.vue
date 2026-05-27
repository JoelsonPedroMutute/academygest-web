<script setup lang="ts">
defineProps<{
  total: number
}>()
</script>

<template>
  <DashboardSharedStatCard
    title="Alunos"
    :value="total"
    icon="pi pi-user"
    color="green"
  />
</template>