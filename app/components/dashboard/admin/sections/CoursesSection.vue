<script setup lang="ts">
interface Course {
  id: number | string
  nome: string
  duracao?: string
}

defineProps<{
  courses: Course[]
}>()
</script>

<template>
  <DashboardSharedDashboardSection
    title="Cursos"
    description="Lista de cursos"
  >
    <DashboardSharedDashboardCard>
      <div
        v-if="courses.length"
        class="space-y-4"
      >
        <DashboardAdminItemsCourseItem
          v-for="course in courses"
          :key="course.id"
          :nome="course.nome"
          :duracao="course.duracao"
        />
      </div>

      <DashboardSharedEmptyDashboard
        v-else
        title="Sem cursos"
        message="Nenhum curso encontrado."
      />
    </DashboardSharedDashboardCard>
  </DashboardSharedDashboardSection>
</template>