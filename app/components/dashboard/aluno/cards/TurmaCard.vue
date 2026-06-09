<script setup lang="ts">
defineProps<{
  turma: string
}>()
</script>

<template>
  <DashboardSharedDashboardCard>
    <p class="text-sm text-gray-500">
      Turma
    </p>

    <h3 class="text-2xl font-bold mt-2">
      {{ turma }}
    </h3>
  </DashboardSharedDashboardCard>
</template>