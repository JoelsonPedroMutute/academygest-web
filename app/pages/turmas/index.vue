<script setup lang="ts">
type Turma = {
  id: number
  nome: string
  ano: string
  curso_id: number
}

const { $api } = useNuxtApp()

const { data: turmas } = await useAsyncData<Turma[]>(
  "turmas",
  () => $api("/turmas")
)
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between mb-4">
      <h1 class="text-xl font-bold">
        Turmas
      </h1>

      <NuxtLink
        to="/turmas/create"
        class="btn-primary"
      >
        Nova Turma
      </NuxtLink>
    </div>

    <div class="card">
      <div
        v-for="turma in turmas || []"
        :key="turma.id"
        class="border-b py-2 flex justify-between"
      >
        <NuxtLink :to="`/turmas/${turma.id}`">
          {{ turma.nome }}
        </NuxtLink>

        <NuxtLink
          :to="`/turmas/edit/${turma.id}`"
          class="text-blue-600"
        >
          Editar
        </NuxtLink>
      </div>
    </div>
  </div>
</template>