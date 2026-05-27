<script setup lang="ts">
defineProps<{
  data: number[]
}>()
</script>

<template>
  <DashboardSharedDashboardCard title="Notas">
    <div
      class="h-80 flex items-center justify-center text-gray-400"
    >
      Gráfico de Notas
    </div>
  </DashboardSharedDashboardCard>
</template>