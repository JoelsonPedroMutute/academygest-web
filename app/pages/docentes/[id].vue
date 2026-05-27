<script setup lang="ts">
type Docente = {
  id: number
  nome: string
  email: string
  especialidade: string
}

const route = useRoute()
const { $api } = useNuxtApp()

const { data: docente } = await useAsyncData<Docente>(
  "docente",
  () =>
    $api<Docente>(`/docentes/${route.params.id}`, {
      method: "GET",
    })
)
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold">Detalhes do Docente</h1>

    <div class="card mt-4">
      <p><strong>Nome:</strong> {{ docente?.nome }}</p>
      <p><strong>Email:</strong> {{ docente?.email }}</p>
      <p><strong>Especialidade:</strong> {{ docente?.especialidade }}</p>
    </div>
  </div>
</template>