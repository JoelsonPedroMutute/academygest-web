<script setup lang="ts">
interface Evaluation {
  id: number | string
  disciplina: string
  tipo: string
  data: string
}

defineProps<{
  evaluations: Evaluation[]
}>()
</script>

<template>
  <DashboardSharedDashboardSection
    title="Avaliações"
    description="Avaliações programadas"
  >
    <DashboardSharedDashboardCard>
      <div
        v-if="evaluations.length"
        class="space-y-4"
      >
        <DashboardDocenteItemsEvaluationItem
          v-for="evaluation in evaluations"
          :key="evaluation.id"
          :disciplina="evaluation.disciplina"
          :tipo="evaluation.tipo"
          :data="evaluation.data"
        />
      </div>

      <DashboardSharedEmptyDashboard
        v-else
        title="Sem avaliações"
        message="Nenhuma avaliação encontrada."
      />
    </DashboardSharedDashboardCard>
  </DashboardSharedDashboardSection>
</template>