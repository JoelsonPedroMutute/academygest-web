<script setup lang="ts">
interface ClassItem {
  id: number | string
  nome: string
  curso: string
}

defineProps<{
  classes: ClassItem[]
}>()
</script>

<template>
  <DashboardSharedDashboardSection
    title="Turmas"
    description="Turmas disponíveis"
  >
    <DashboardSharedDashboardCard>
      <div
        v-if="classes.length"
        class="space-y-4"
      >
        <DashboardAdminItemsClassItem
          v-for="item in classes"
          :key="item.id"
          :nome="item.nome"
          :curso="item.curso"
        />
      </div>

      <DashboardSharedEmptyDashboard
        v-else
        title="Sem turmas"
        message="Nenhuma turma encontrada."
      />
    </DashboardSharedDashboardCard>
  </DashboardSharedDashboardSection>
</template>