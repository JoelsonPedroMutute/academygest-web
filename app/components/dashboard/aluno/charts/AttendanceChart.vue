<script setup lang="ts">
defineProps<{
  data: number[]
}>()
</script>

<template>
  <DashboardSharedDashboardCard title="Frequência">
    <div
      class="h-80 flex items-center justify-center text-gray-400"
    >
      Gráfico de Frequência
    </div>
  </DashboardSharedDashboardCard>
</template>