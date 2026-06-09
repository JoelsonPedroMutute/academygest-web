<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})
type AdminStats = {
  alunos: number
  docentes: number
  cursos: number
  turmas: number
  matriculas: number
  disciplinas: number
  notas: number
  frequencias: number
  recentes: { id: number; descricao: string }[]
}

const { $api } = useNuxtApp()

const { data: stats } = await useAsyncData<AdminStats>("admin-stats", () =>
  $api<AdminStats>("/admin/dashboard", {
    method: "GET",
  })
)
</script>

<template>
  <div class="p-6">
    <PageHeader
      title="Dashboard Admin"
      subtitle="Visão geral do sistema académico"
    />

    <Breadcrumb />

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      <div class="card p-4">
        <p class="text-gray-500">Alunos</p>
        <p class="text-2xl font-bold">{{ stats?.alunos }}</p>
      </div>

      <div class="card p-4">
        <p class="text-gray-500">Docentes</p>
        <p class="text-2xl font-bold">{{ stats?.docentes }}</p>
      </div>

      <div class="card p-4">
        <p class="text-gray-500">Cursos</p>
        <p class="text-2xl font-bold">{{ stats?.cursos }}</p>
      </div>

      <div class="card p-4">
        <p class="text-gray-500">Turmas</p>
        <p class="text-2xl font-bold">{{ stats?.turmas }}</p>
      </div>

      <div class="card p-4">
        <p class="text-gray-500">Matrículas</p>
        <p class="text-2xl font-bold">{{ stats?.matriculas }}</p>
      </div>

      <div class="card p-4">
        <p class="text-gray-500">Disciplinas</p>
        <p class="text-2xl font-bold">{{ stats?.disciplinas }}</p>
      </div>

      <div class="card p-4">
        <p class="text-gray-500">Notas Registadas</p>
        <p class="text-2xl font-bold">{{ stats?.notas }}</p>
      </div>

      <div class="card p-4">
        <p class="text-gray-500">Frequências</p>
        <p class="text-2xl font-bold">{{ stats?.frequencias }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
      <div class="card p-4">
        <h2 class="font-bold mb-2">Atividade recente</h2>

        <ul class="text-sm space-y-2">
          <li v-for="item in stats?.recentes ?? []" :key="item.id">
            {{ item.descricao }}
          </li>
        </ul>
      </div>

      <div class="card p-4">
        <h2 class="font-bold mb-2">Resumo académico</h2>

        <p class="text-sm text-gray-600">
          Este painel mostra o estado geral do sistema académico,
          incluindo evolução de matrículas, desempenho e carga docente.
        </p>
      </div>
    </div>
  </div>
</template>