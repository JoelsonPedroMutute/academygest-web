<script setup lang="ts">
type Curso = {
  id: number
  nome: string
  descricao: string
  duracao: number | string
}

const route = useRoute()
const { $api } = useNuxtApp()

const { data: curso } = await useAsyncData<Curso>("curso", () =>
  $api<Curso>(`/cursos/${route.params.id}`, {
    method: "GET",
  })
)
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold">Detalhes do Curso</h1>

    <div class="card mt-4">
      <p><strong>Nome:</strong> {{ curso?.nome }}</p>
      <p><strong>Descrição:</strong> {{ curso?.descricao }}</p>
      <p><strong>Duração:</strong> {{ curso?.duracao }}</p>
    </div>
  </div>
</template>