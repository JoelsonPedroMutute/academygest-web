<script setup lang="ts">
interface Attendance {
  id: number | string
  disciplina: string
  faltas: number
}

defineProps<{
  attendances: Attendance[]
}>()
</script>

<template>
  <DashboardSharedDashboardSection
    title="Frequências"
    description="Controle de faltas"
  >
    <DashboardSharedDashboardCard>
      <div
        v-if="attendances.length"
        class="space-y-4"
      >
        <DashboardAlunoItemsAttendanceItem
          v-for="attendance in attendances"
          :key="attendance.id"
          :disciplina="attendance.disciplina"
          :faltas="attendance.faltas"
        />
      </div>

      <DashboardSharedEmptyDashboard
        v-else
        title="Sem frequências"
        message="Nenhuma frequência encontrada."
      />
    </DashboardSharedDashboardCard>
  </DashboardSharedDashboardSection>
</template>