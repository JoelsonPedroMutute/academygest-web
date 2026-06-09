<script setup lang="ts">
interface ClassItem {
  id: number | string
  turma: string
  curso: string
}

defineProps<{
  classes: ClassItem[]
}>()
</script>

<template>
  <DashboardSharedDashboardSection
    title="Turmas"
    description="Turmas atribuídas ao docente"
  >
    <DashboardSharedDashboardCard>
      <div
        v-if="classes.length"
        class="space-y-4"
      >
        <DashboardDocenteItemsClassItem
          v-for="item in classes"
          :key="item.id"
          :turma="item.turma"
          :curso="item.curso"
        />
      </div>

      <DashboardSharedEmptyDashboard
        v-else
        title="Sem turmas"
        message="Nenhuma turma atribuída."
      />
    </DashboardSharedDashboardCard>
  </DashboardSharedDashboardSection>
</template>