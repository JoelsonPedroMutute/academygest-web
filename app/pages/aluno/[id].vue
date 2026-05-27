<script setup lang="ts">
type Aluno = {
  id: number
  nome: string
  email: string
}

const route = useRoute()
const { $api } = useNuxtApp()

const { data: aluno } = await useAsyncData<Aluno>("aluno", () =>
  $api<Aluno>(`/alunos/${route.params.id}`, {
    method: "GET",
  })
)
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold">Detalhes do Aluno</h1>

    <div class="card mt-4">
      <p><strong>Nome:</strong> {{ aluno?.nome }}</p>
      <p><strong>Email:</strong> {{ aluno?.email }}</p>
    </div>
  </div>
</template>