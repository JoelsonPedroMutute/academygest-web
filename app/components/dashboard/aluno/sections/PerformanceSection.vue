<script setup lang="ts">
defineProps<{
  average: number
  attendance: number
}>()
</script>

<template>
  <DashboardSharedDashboardSection
    title="Desempenho"
    description="Resumo académico"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <DashboardSharedDashboardCard>
        <div class="text-center">
          <h3 class="text-lg font-semibold">
            Média Geral
          </h3>

          <div class="text-5xl font-bold text-blue-600 mt-4">
            {{ average }}
          </div>
        </div>
      </DashboardSharedDashboardCard>

      <DashboardSharedDashboardCard>
        <div class="text-center">
          <h3 class="text-lg font-semibold">
            Frequência
          </h3>

          <div class="text-5xl font-bold text-green-600 mt-4">
            {{ attendance }}%
          </div>
        </div>
      </DashboardSharedDashboardCard>
    </div>
  </DashboardSharedDashboardSection>
</template>