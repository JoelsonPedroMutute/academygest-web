<script setup lang="ts">
type Aluno = {
  id: number
  nome: string
  email: string
}

const { $api } = useNuxtApp()

const { data: alunos, refresh } = await useAsyncData<Aluno[]>("alunos", () =>
  $api<Aluno[]>("/alunos", {
    method: "GET",
  })
)
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between mb-4">
      <h1 class="text-xl font-bold">Alunos</h1>

      <NuxtLink to="/alunos/create" class="btn-primary">
        Novo
      </NuxtLink>
    </div>

    <div class="card">
      <div
        v-for="aluno in alunos ?? []"
        :key="aluno.id"
        class="border-b py-2"
      >
        <NuxtLink :to="`/alunos/${aluno.id}`">
          {{ aluno.nome }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>