<script setup lang="ts">
interface Activity {
  id: number | string
  action: string
  date: string
}

defineProps<{
  activities: Activity[]
}>()
</script>

<template>
  <DashboardSharedDashboardSection
    title="Atividade do Sistema"
    description="Últimas atividades"
  >
    <DashboardSharedDashboardCard>
      <div
        v-if="activities.length"
        class="space-y-4"
      >
        <div
          v-for="activity in activities"
          :key="activity.id"
          class="border rounded-xl p-4"
        >
          <h4 class="font-semibold">
            {{ activity.action }}
          </h4>

          <p class="text-sm text-gray-500 mt-1">
            {{ activity.date }}
          </p>
        </div>
      </div>

      <DashboardSharedEmptyDashboard
        v-else
        title="Sem atividades"
        message="Nenhuma atividade encontrada."
      />
    </DashboardSharedDashboardCard>
  </DashboardSharedDashboardSection>
</template>