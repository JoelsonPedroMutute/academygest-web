<script setup lang="ts">
type Turma = {
  id: number
  nome: string
  ano: string
  curso_id: number
}

const route = useRoute()
const { $api } = useNuxtApp()

const { data: turma } = await useAsyncData<Turma>("turma", () =>
  $api(`/turmas/${route.params.id}`)
)
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Detalhes da Turma</h1>

    <div class="card">
      <p><strong>Nome:</strong> {{ turma?.nome }}</p>
      <p><strong>Ano:</strong> {{ turma?.ano }}</p>
      <p><strong>ID do Curso:</strong> {{ turma?.curso_id }}</p>
    </div>
  </div>
</template>