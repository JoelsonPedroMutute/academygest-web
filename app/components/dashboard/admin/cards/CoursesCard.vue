<script setup lang="ts">
defineProps<{
  total: number
}>()
</script>

<template>
  <DashboardSharedStatCard
    title="Cursos"
    :value="total"
    icon="pi pi-book"
    color="purple"
  />
</template>