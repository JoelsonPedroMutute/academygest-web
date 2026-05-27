<script setup lang="ts">
interface Attendance {
  id: number | string
  turma: string
  faltas: number
}

defineProps<{
  attendances: Attendance[]
}>()
</script>

<template>
  <DashboardSharedDashboardSection
    title="Frequências"
    description="Controle de presenças"
  >
    <DashboardSharedDashboardCard>
      <div
        v-if="attendances.length"
        class="space-y-4"
      >
        <DashboardDocenteItemsAttendanceItem
          v-for="attendance in attendances"
          :key="attendance.id"
          :turma="attendance.turma"
          :faltas="attendance.faltas"
        />
      </div>

      <DashboardSharedEmptyDashboard
        v-else
        title="Sem frequências"
        message="Nenhuma frequência registada."
      />
    </DashboardSharedDashboardCard>
  </DashboardSharedDashboardSection>
</template>