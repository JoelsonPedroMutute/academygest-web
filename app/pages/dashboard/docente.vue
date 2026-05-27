<script setup lang="ts">
type DocenteStats = {
  turmas: number
  disciplinas: number
  alunos: number
  lista_turmas: { id: number; nome: string; curso: string }[]
  recentes: { id: number; descricao: string }[]
}

const { $api } = useNuxtApp()

const { data: stats } = await useAsyncData<DocenteStats>("docente-stats", () =>
  $api<DocenteStats>("/dashboard/docente", {
    method: "GET",
  })
)
</script>

<template>
  <div class="p-6">
    <PageHeader
      title="Dashboard do Docente"
      subtitle="Gestão das suas turmas e atividades"
    />

    <Breadcrumb />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div class="card p-4">
        <p class="text-gray-500">Minhas Turmas</p>
        <p class="text-2xl font-bold">{{ stats?.turmas }}</p>
      </div>

      <div class="card p-4">
        <p class="text-gray-500">Disciplinas Lecionadas</p>
        <p class="text-2xl font-bold">{{ stats?.disciplinas }}</p>
      </div>

      <div class="card p-4">
        <p class="text-gray-500">Alunos Ativos</p>
        <p class="text-2xl font-bold">{{ stats?.alunos }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
      <div class="card p-4">
        <h2 class="font-bold mb-2">Turmas atribuídas</h2>

        <ul class="text-sm space-y-2">
          <li v-for="turma in stats?.lista_turmas ?? []" :key="turma.id">
            {{ turma.nome }} - {{ turma.curso }}
          </li>
        </ul>
      </div>

      <div class="card p-4">
        <h2 class="font-bold mb-2">Atividade recente</h2>

        <ul class="text-sm space-y-2">
          <li v-for="item in stats?.recentes ?? []" :key="item.id">
            {{ item.descricao }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>