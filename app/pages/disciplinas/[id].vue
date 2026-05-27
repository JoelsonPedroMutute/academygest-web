<script setup lang="ts">
type Disciplina = {
  id: number
  nome: string
  codigo: string
  carga_horaria: number
  curso?: {
    id: number
    nome: string
  }
}

const route = useRoute()
const { $api } = useNuxtApp()

const { data: disciplina } = await useAsyncData<Disciplina>(
  "disciplina",
  () =>
    $api<Disciplina>(`/disciplinas/${route.params.id}`, {
      method: "GET",
    })
)
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold">Detalhes da Disciplina</h1>

    <div class="card mt-4">
      <p><strong>Nome:</strong> {{ disciplina?.nome }}</p>
      <p><strong>Código:</strong> {{ disciplina?.codigo }}</p>
      <p><strong>Carga Horária:</strong> {{ disciplina?.carga_horaria }}</p>
      <p><strong>Curso:</strong> {{ disciplina?.curso?.nome }}</p>
    </div>
  </div>
</template>