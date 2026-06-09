<script setup lang="ts">
interface Student {
  id: number | string
  nome: string
  numero: string
}

defineProps<{
  students: Student[]
}>()
</script>

<template>
  <DashboardSharedDashboardSection
    title="Alunos"
    description="Lista de alunos"
  >
    <DashboardSharedDashboardCard>
      <div
        v-if="students.length"
        class="space-y-4"
      >
        <DashboardDocenteItemsStudentItem
          v-for="student in students"
          :key="student.id"
          :nome="student.nome"
          :numero="student.numero"
        />
      </div>

      <DashboardSharedEmptyDashboard
        v-else
        title="Sem alunos"
        message="Nenhum aluno encontrado."
      />
    </DashboardSharedDashboardCard>
  </DashboardSharedDashboardSection>
</template>