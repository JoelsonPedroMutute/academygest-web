<script setup lang="ts">
interface Exam {
  id: number | string
  disciplina: string
  data: string
}

defineProps<{
  exams: Exam[]
}>()
</script>

<template>
  <DashboardSharedDashboardSection
    title="Exames"
    description="Próximos exames agendados"
  >
    <DashboardSharedDashboardCard>
      <div
        v-if="exams.length"
        class="space-y-4"
      >
        <DashboardAlunoItemsExamItem
          v-for="exam in exams"
          :key="exam.id"
          :disciplina="exam.disciplina"
          :data="exam.data"
        />
      </div>

      <DashboardSharedEmptyDashboard
        v-else
        title="Sem exames"
        message="Nenhum exame agendado."
      />
    </DashboardSharedDashboardCard>
  </DashboardSharedDashboardSection>
</template>