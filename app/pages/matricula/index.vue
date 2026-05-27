<script setup lang="ts">
const { $api } = useNuxtApp()

type Aluno = {
  id: number
  nome: string
}

type Turma = {
  id: number
  nome: string
}

type Matricula = {
  id: number
  aluno?: Aluno
  turma?: Turma
  ano_letivo?: string
  estado?: string
}

const { data: matriculas } = await useAsyncData<Matricula[]>(
  "matriculas",
  () => $api("/matriculas")
)
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between mb-4">
      <h1 class="text-xl font-bold">Matrículas</h1>

      <NuxtLink to="/matriculas/create" class="btn-primary">
        Nova Matrícula
      </NuxtLink>
    </div>

    <div class="card">
      <div
        v-for="matricula in matriculas"
        :key="matricula.id"
        class="border-b py-2 flex justify-between"
      >
        <div>
          <p class="font-medium">
            {{ matricula.aluno?.nome }}
          </p>

          <p class="text-sm text-gray-500">
            Turma: {{ matricula.turma?.nome }}
          </p>
        </div>

        <NuxtLink
          :to="`/matriculas/edit/${matricula.id}`"
          class="text-blue-600"
        >
          Editar
        </NuxtLink>
      </div>
    </div>
  </div>
</template>