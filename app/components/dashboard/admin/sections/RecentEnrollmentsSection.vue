<script setup lang="ts">
interface Enrollment {
  id: number | string
  aluno: string
  turma: string
}

defineProps<{
  enrollments: Enrollment[]
}>()
</script>

<template>
  <DashboardSharedDashboardSection
    title="Matrículas Recentes"
    description="Últimas matrículas registadas"
  >
    <DashboardSharedDashboardCard>
      <div
        v-if="enrollments.length"
        class="space-y-4"
      >
        <DashboardAdminItemsEnrollmentItem
          v-for="item in enrollments"
          :key="item.id"
          :aluno="item.aluno"
          :turma="item.turma"
        />
      </div>

      <DashboardSharedEmptyDashboard
        v-else
        title="Sem matrículas"
        message="Nenhuma matrícula encontrada."
      />
    </DashboardSharedDashboardCard>
  </DashboardSharedDashboardSection>
</template>