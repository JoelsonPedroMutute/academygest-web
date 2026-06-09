<script setup lang="ts">
interface Schedule {
  id: number | string
  disciplina: string
  horario: string
  sala?: string
}

defineProps<{
  schedules: Schedule[]
}>()
</script>

<template>
  <DashboardSharedDashboardSection
    title="Horários"
    description="Horários das aulas"
  >
    <DashboardSharedDashboardCard>
      <div
        v-if="schedules.length"
        class="space-y-4"
      >
        <DashboardAlunoItemsScheduleItem
          v-for="schedule in schedules"
          :key="schedule.id"
          :disciplina="schedule.disciplina"
          :horario="schedule.horario"
          :sala="schedule.sala"
        />
      </div>

      <DashboardSharedEmptyDashboard
        v-else
        title="Sem horários"
        message="Nenhum horário disponível."
      />
    </DashboardSharedDashboardCard>
  </DashboardSharedDashboardSection>
</template>