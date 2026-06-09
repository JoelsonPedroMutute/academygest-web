<script setup lang="ts">
definePageMeta({ middleware: "aluno" })

type AlunoStats = {
  media_notas: number
  frequencia: number
  disciplinas: number
  notas: { id: number; disciplina: string; valor: number }[]
  frequencias: { id: number; disciplina: string; estado: string }[]
}

const { $api } = useNuxtApp()

const { data: stats } = await useAsyncData<AlunoStats>("aluno-stats", () =>
  $api<AlunoStats>("/aluno/dashboard", {
    method: "GET",
  })
)
</script>

<template>
  <div class="p-6">
    <PageHeader
      title="Meu Painel"
      subtitle="Desempenho académico e frequência"
    />

    <Breadcrumb />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div class="card p-4">
        <p class="text-gray-500">Notas Médias</p>
        <p class="text-2xl font-bold">{{ stats?.media_notas }}</p>
      </div>

      <div class="card p-4">
        <p class="text-gray-500">Frequência</p>
        <p class="text-2xl font-bold">{{ stats?.frequencia }}%</p>
      </div>

      <div class="card p-4">
        <p class="text-gray-500">Disciplinas</p>
        <p class="text-2xl font-bold">{{ stats?.disciplinas }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
      <div class="card p-4">
        <h2 class="font-bold mb-2">Minhas Notas</h2>

        <ul class="text-sm space-y-2">
          <li v-for="nota in stats?.notas ?? []" :key="nota.id">
            {{ nota.disciplina }} → {{ nota.valor }}
          </li>
        </ul>
      </div>

      <div class="card p-4">
        <h2 class="font-bold mb-2">Presenças recentes</h2>

        <ul class="text-sm space-y-2">
          <li v-for="freq in stats?.frequencias ?? []" :key="freq.id">
            {{ freq.disciplina }} → {{ freq.estado }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>