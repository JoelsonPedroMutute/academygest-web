<script setup lang="ts">
interface Teacher {
  id: number | string
  nome: string
  especialidade?: string
}

defineProps<{
  teachers: Teacher[]
}>()
</script>

<template>
  <DashboardSharedDashboardSection
    title="Docentes Recentes"
    description="Últimos docentes cadastrados"
  >
    <DashboardSharedDashboardCard>
      <div
        v-if="teachers.length"
        class="space-y-4"
      >
        <DashboardAdminItemsTeacherItem
          v-for="teacher in teachers"
          :key="teacher.id"
          :nome="teacher.nome"
          :especialidade="teacher.especialidade"
        />
      </div>

      <DashboardSharedEmptyDashboard
        v-else
        title="Sem docentes"
        message="Nenhum docente encontrado."
      />
    </DashboardSharedDashboardCard>
  </DashboardSharedDashboardSection>
</template>