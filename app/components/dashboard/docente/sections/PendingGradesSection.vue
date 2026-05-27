<script setup lang="ts">
defineProps<{
  total: number
}>()
</script>

<template>
  <DashboardSharedDashboardSection
    title="Notas Pendentes"
    description="Notas ainda por lançar"
  >
    <DashboardSharedDashboardCard>
      <div class="text-center py-8">
        <h2 class="text-5xl font-bold text-red-500">
          {{ total }}
        </h2>

        <p class="text-gray-500 mt-3">
          avaliações pendentes
        </p>
      </div>
    </DashboardSharedDashboardCard>
  </DashboardSharedDashboardSection>
</template>