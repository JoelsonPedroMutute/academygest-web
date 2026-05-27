<script setup lang="ts">
type Disciplina = {
  id: number
  nome: string
  curso?: {
    id: number
    nome: string
  }
}

const { $api } = useNuxtApp()

const { data: disciplinas } = await useAsyncData<Disciplina[]>(
  "disciplinas",
  () =>
    $api<Disciplina[]>("/disciplinas", {
      method: "GET",
    })
)
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between mb-4">
      <h1 class="text-xl font-bold">Disciplinas</h1>

      <NuxtLink to="/disciplinas/create" class="btn-primary">
        Nova Disciplina
      </NuxtLink>
    </div>

    <div class="card">
      <div
        v-for="disciplina in disciplinas ?? []"
        :key="disciplina.id"
        class="border-b py-2 flex justify-between"
      >
        <div>
          <p class="font-medium">
            {{ disciplina.nome }}
          </p>

          <p class="text-sm text-gray-500">
            Curso: {{ disciplina.curso?.nome }}
          </p>
        </div>

        <NuxtLink
          :to="`/disciplinas/edit/${disciplina.id}`"
          class="text-blue-600"
        >
          Editar
        </NuxtLink>
      </div>
    </div>
  </div>
</template>