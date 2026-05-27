<script setup lang="ts">
type Nota = {
  id: number
  aluno: { nome: string }
  disciplina: { nome: string }
  valor: number
  semestre: string
}

const route = useRoute()
const { $api } = useNuxtApp()

const { data: nota } = await useAsyncData<Nota>(
  "nota",
  () => $api(`/notas/${route.params.id}`)
)
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold">Detalhes da Nota</h1>

    <div class="card mt-4">
      <p><strong>Aluno:</strong> {{ nota?.aluno?.nome }}</p>
      <p><strong>Disciplina:</strong> {{ nota?.disciplina?.nome }}</p>
      <p><strong>Valor:</strong> {{ nota?.valor }}</p>
      <p><strong>Semestre:</strong> {{ nota?.semestre }}</p>
    </div>
  </div>
</template>